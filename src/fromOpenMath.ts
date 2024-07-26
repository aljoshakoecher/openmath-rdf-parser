import { QueryEngine } from "@comunica/query-sparql";
import { MathJsSymbolInformation, OperatorDictionary } from "./OperatorDictionary";
import { Bindings, Term } from "@rdfjs/types";

import { Store, Parser as N3Parser} from "n3";
import { FormulaOfContext, FormulaResult } from "./FormulaResult";
import { Application } from "./Application";


export async function allFromOpenMath(rdfString: string): Promise<Array<FormulaResult>> {
	const bindings = await getOpenMathBindings(rdfString);

	const results = new Array<FormulaResult>();

	// Get all root applications
	const rootApplications = getRootApplications(bindings);
	rootApplications.forEach(rootApplication => {
		const formula = getArgumentsOfApplication(rootApplication, bindings);
		const result = new FormulaResult(formula, rootApplication.application.value as string);
		results.push(result);
	});
	return results;
}

export async function getOpenMathBindings(rdfString: string): Promise<Array<Bindings>>{
	const store = await parseAsPromise(rdfString);

	// Query to get OpenMath applications with operators and variables. Works also for nested applications. Positions stores arguments position, 
	// so that, e.g.,  "x / y" and "y / x" can be distinguished. Protect this query at all cost...
	const queryString = `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX OM: <http://openmath.org/vocab/math#>

	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	SELECT ?context ?application (count(?argumentList)-1 as ?position) ?operator ?argName ?argValue ?argType ?arg WHERE {
		?application OM:arguments/rdf:rest* ?argumentList;
			OM:operator ?operator.

		?argumentList rdf:rest*/rdf:first ?arg.
		?arg a ?argType.
		FILTER(STRSTARTS(STR(?argType), "http://openmath.org"))
		OPTIONAL {
			?context ?x ?application.
		}
		OPTIONAL {
			?arg OM:name ?argName.
		}
		OPTIONAL {
			?arg OM:value ?argValue.
		}
	}
	GROUP BY ?context ?x ?application ?argName ?argValue ?operator ?argType ?arg
	`;
	
	// Fire query and get results as an array
	const queryEngine = new QueryEngine();
	const bindingsStream = await queryEngine.queryBindings(queryString, {sources: [store]});
	const bindings = await bindingsStream.toArray();
	return bindings;
}


/**
 * Converts an OpenMath RDF representation into a textual, human-readable formula
 * @param rdfString A string in RDF serialization containing OpenMath
 */
export async function fromOpenMath(rdfString: string, rootApplicationIri: string): Promise<FormulaResult> {
	const bindings = await getOpenMathBindings(rdfString);
	
	// Get root application to start the whole recursive parsing procedure
	const rootApplications = getRootApplications(bindings, rootApplicationIri);
	const results = new Array<FormulaResult>();
	rootApplications.forEach(rootApplication => {
		const formula = getArgumentsOfApplication(rootApplication, bindings);
		const result = new FormulaResult(formula, rootApplicationIri);
		results.push(result);
	});
	
	return results[0];
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
				resolve(store);
			}
		});
	});
}


// Function to group array with a key function
function groupBy<T, K extends string | number>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
	return array.reduce((result, currentItem) => {
		const groupKey = keyFn(currentItem);
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[groupKey].push(currentItem);
		return result;
	}, {} as Record<K, T[]>);
}

function convertBindingsToApplications(bindings: Bindings[]) {
	if (bindings.length == 0 ) return new Array<Application>();
	
	// There can be multiple entries for each rootApplication (one for each sub application), we need to group rootApplications by application variable
	const groupedBindings = groupBy(bindings, (binding) => binding.get('application')?.value as string);

	// In each group, everything is the same, only args are different. Create a l application object to make it easier to handle
	const applications = Object.keys(groupedBindings).map(groupKey => {
		const group = groupedBindings[groupKey] as Bindings[];
		const firstEntry = group[0]; // Der erste Eintrag in der Gruppe
		const args = group.map(entry => entry.get('arg')) as Term[];

		const application = new Application(firstEntry.get('context') as Term, firstEntry.get('application') as Term, 
			firstEntry.get('position') as Term, firstEntry.get('operator') as Term, firstEntry.get('argName') as Term, firstEntry.get('argValue') as Term
		);
		application.args = args;
		return application;
	});

	return applications;
}


/**
 * Finds the root application element by searching for rootApplicationIri and making sure it is in fact a root application element.
 * @param bindings All results of the parsing query
 * @param rootApplicationIri IRI of the root application to search for
 * @returns The root application entry within the list of all Bindings
 */
function getRootApplications(bindings: Bindings[], rootApplicationIri = ""): Array<Application> {
	// Due to the query structure, finding the parent element is a bit tricky. To understand this function, it's best to execute the query separately and look at the results 
	// In addition, we check that these candidates are in fact root applications. Check that the value for ?application is no argument (?arg) to a "higher" parent application
	const rootBindings = bindings.filter(binding => {
		const hasNoHigherParent = !bindings.some(b => b.get("arg") == binding.get("application"));
		return hasNoHigherParent;
	});

	let rootApplications = convertBindingsToApplications(rootBindings);

	// Additionaly, if a rootApplicationIri is passed, filter only for the corresponding rootApplications bindings that belong to this IRI
	// This effectively filters out all other OpenMath equations that we are not interested in
	if (rootApplicationIri) {
		rootApplications = rootApplications.filter(application => {
			const matchesRootApplicationIri = application.application.value === rootApplicationIri;
			return matchesRootApplicationIri;
		});
	}

	return rootApplications;
}

function getArgumentsOfApplication(parentApplication: Application, bindings: Bindings[]): FormulaOfContext {
	// Check if there are more entries with arguments under the current element's application. This is the case for non-nested terms like x+y+z...
	const argumentEntries = bindings.filter(binding => binding.get("application")!.equals(parentApplication.application));
	
	// Check if the entry has children. If it has, we need to recursively go deeper
	const childBindings: Bindings[] = new Array<Bindings>();
	parentApplication.args.forEach(parentArg => {
		const childBinding = bindings.filter(binding => binding.get("application")!.equals(parentArg));
		childBindings.push(...childBinding);
	});
	const childApplications = convertBindingsToApplications(childBindings);
	
	let formulaString = "";
	if (childApplications.length > 0) {
		// const entry = childApplications[0];
		const openMathOperator = argumentEntries[0].get("operator")!.value;
		const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);
		const argumentNames = new Array<string>();
		argumentEntries.forEach(entry => {
			const argType = entry.get("argType")!.value;
			if( argType == 'http://openmath.org/vocab/math#Variable') {
				argumentNames.push(entry.get("argName")!.value);
			} else if (argType == 'http://openmath.org/vocab/math#Literal') {
				argumentNames.push(entry.get("argValue")!.value);
			}
		});
		const argumentsOfChildApplications = new Array<string>();
		childApplications.forEach(element => {
			const argumentsFormula = getArgumentsOfApplication(element, bindings).formula;
			argumentsOfChildApplications.push(argumentsFormula);
		}); 
		formulaString = createExpression(operator, [...argumentNames, ...argumentsOfChildApplications]);
	} else{
		const allSameOperator = argumentEntries.every(entry => entry.get("operator")!.equals(argumentEntries[0].get("operator")));
		if (!allSameOperator) {
			const operators = argumentEntries.map(entry => entry.get("operator"));
			throw new Error(`Error trying to obtain the operator of application. Multiple operators found: ${operators.toString()}`);
		}
		const openMathOperator = argumentEntries[0].get("operator")!.value;
		const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);
		const argumentNames = argumentEntries.map(entry => {
			const argType = entry.get("argType")!.value;
			// For literals, we need to grab the value, for variables (and others?), we take the name
			if (argType == 'http://openmath.org/vocab/math#Literal') {
				return entry.get("argValue")!.value;
			}
			return entry.get("argName")!.value;
		});

		formulaString = createExpression(operator, argumentNames);
	}

	// get the context (should be the same for every entry)
	const context = parentApplication.context?.value as string ?? null;
	const formula = new FormulaOfContext(context, formulaString);
	
	return formula as FormulaOfContext;
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
		expression = (argumentExpression as string[]).join(` ${operatorSymbol} `);
	}
	return expression;
}
