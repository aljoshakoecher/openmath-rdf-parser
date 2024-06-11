import { QueryEngine } from "@comunica/query-sparql";
import { MathJsSymbolInformation, OperatorDictionary } from "./OperatorDictionary.js";
import { Bindings } from "@rdfjs/types";

import { Store, Parser as N3Parser} from "n3";

const queryEngine = new QueryEngine();

/**
 * Converts an OpenMath RDF representation into a textual, human-readable formula
 * @param rdfString A string in RDF serialization containing OpenMath
 */
export async function fromOpenMath(rdfString: string, rootApplicationIri: string): Promise<string> {
	
	const store = await parseAsPromise(rdfString);

	// Query to get OpenMath applications with operators and variables. Works also for nested applications. Positions stores arguments position, 
	// so that, e.g.,  "x / y" and "y / x" can be distinguished. Protect this query at all cost...
	const queryString = `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX OM: <http://openmath.org/vocab/math#>

	SELECT ?application (count(?argumentList)-1 as ?position) ?operator ?argName ?argType ?arg WHERE {
		?application OM:arguments/rdf:rest* ?argumentList;
			OM:operator ?operator.

		?argumentList rdf:rest*/rdf:first ?arg.
		?arg a ?argType.
		# ?argType rdfs:subClassOf OM:Object.
		OPTIONAL {
			?arg OM:name ?argName.
		}
	}
	GROUP BY ?application ?argName ?operator ?argType ?arg
	`;
	
	// Fire query and get results as an array
	const bindingsStream = await queryEngine.queryBindings(queryString, {sources: [store]});
	const bindings = await bindingsStream.toArray();
	
	// Get root application to start the whole recursive parsing procedure
	const rootApplication = getRootApplication(bindings, rootApplicationIri);
	const string = getArgumentsOfApplication(rootApplication, bindings);
	
	return string;
}


/**
 * Util function to convert the parsing function into a promise based one
 * @param rdfString RDF string to parse into an N3 store
 * @returns Promise of a store with the RDF string loaded into it
 */
function parseAsPromise(rdfString: string): Promise<Store> {
	const store = new Store();
	const parser = new N3Parser();
	return new Promise(function(resolve, reject) {
		// parse and resolve / reject promise on completion / error
		parser.parse(rdfString, (error, quad) => {
			if (error) {
				console.log(`Error while parsing`);
				reject(error);
			}
			
			if (quad) store.add(quad);

			else {
				console.log("Done parsing!");
				resolve(store);
			}
		});
	});
}


/**
 * Finds the root application element by searching for rootApplicationIri and making sure it is in fact a root application element.
 * @param bindings All results of the parsing query
 * @param rootApplicationIri IRI of the root application to search for
 * @returns The root application entry within the list of all Bindings
 */
function getRootApplication(bindings: Bindings[], rootApplicationIri: string): Bindings {
	// Due to the query structure, finding the parent element is a bit tricky. To understand this function, it's best to execute the query separately and look at the results 
	// First, we filter for the given rootApplicationIri to look only for entries of the OpenMath expression we are interested in (this filters out other possible roots)
	// In addition, we check that these candidates are in fact root applications. Check that the value for ?application is no argument (?arg) to a "higher" parent application
	const rootCandidates = bindings.filter(binding => {
		const matchesRootApplicationIri = binding.get("application").value === rootApplicationIri;
		const hasNoHigherParent = !bindings.some(b => b.get("arg") == binding.get("application"));
		return (matchesRootApplicationIri && hasNoHigherParent);
	});

	// We can then still have multiple rows within the bindings if the root application is a binary relation (e.g. for "y=x+z" and x=y).
	// If there are no sub applications, any line can be returend. If there is a sub application, this one must be returned
	const parentWithSubApplication = rootCandidates.find(rootCandidate => (rootCandidate.get("argType").value == "http://openmath.org/vocab/math#Application"));

	let rootApplication;
	if (parentWithSubApplication) {
		// If there is a parent with a sub application, return this one
		rootApplication = parentWithSubApplication;
	} else {
		// If not, simply return the first one. It doesn't matter as in later stages, all information will be retrieved
		rootApplication =  rootCandidates[0];
	}
	
	// if (!rootApplication) throw new Error(`Error while finding root application with IRI ${rootApplicationIri}`);

	return rootApplication;
}

function getArgumentsOfApplication(parentApplication: Bindings, bindings: Bindings[]): string {
	// Check if there are more entries with arguments under the current element's application. This is the case for non-nested terms like x+y+z...
	const argumentEntries = bindings.filter(binding => binding.get("application").equals(parentApplication.get("application")));
	
	// Check if the entry has children. If it has, we need to recursively go deeper
	const childApplications = bindings.filter(binding => binding.get("application").equals(parentApplication.get("arg")));
	let string = "";

	if (childApplications.length > 0) {
		const entry = childApplications[0];
		const openMathOperator = argumentEntries[0].get("operator").value;
		const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);
		const argumentNames = argumentEntries.flatMap(entry => (entry.get("argName") !== undefined) ? entry.get("argName").value : []);
		string = createExpression(operator, [...argumentNames, getArgumentsOfApplication(entry, bindings)]);
	} else{
		const allSameOperator = argumentEntries.every(entry => entry.get("operator").equals(argumentEntries[0].get("operator")));
		if (!allSameOperator) {
			const operators = argumentEntries.map(entry => entry.get("operator"));
			throw new Error(`Error trying to obtain the operator of application. Multiple operators found: ${operators.toString()}`);
		}
		const openMathOperator = argumentEntries[0].get("operator").value;
		const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);
		const argumentNames = argumentEntries.map(entry => entry.get("argName").value);
		string = createExpression(operator, argumentNames);
	}
	
	return string;
}



/**
 * Creates a string expression for a given operator and arguments. Handles unary and binary functions 
 * @param operator MathJsSymbolInformation of an operator containing operator symbol and arity
 * @param argumentExpression Can be either a single argument (for unary operators) or multiple arguments in an array (for binary /n-ary)
 * @returns 
 */
function createExpression(operator:MathJsSymbolInformation, argumentExpression: string[] |string) {
	const arity = operator.arity;
	const operatorSymbol = operator.symbol;
	let expression = "";
	if (arity == 1) {
		// Unary operators are constructed like <operator>(argument), e.g., sin(x)
		expression = `${operator.symbol}(${argumentExpression})`;
	}
	if (arity == 2) {
		// Binary operators are constructed by concatenating operator and arguments, e.g. x + y + z...
		expression = (argumentExpression as string[]).join(operatorSymbol);
	}
	return expression;
}
