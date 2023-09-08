import { parse as mathParse } from "mathjs";
import { Namespace, graph, blankNode, lit, serialize } from "rdflib";
import { MathJsSymbolInformation, OperatorDictionary } from "./dictionary";
import { ArgumentListStore } from "./argumentListStore";

import { QueryEngine } from "@comunica/query-sparql";
import { Bindings } from "@rdfjs/types";
import { Store, Parser as N3Parser } from "n3";

const queryEngine = new QueryEngine();

/**
 * Converts an OpenMath RDF representation into a textual, human-readable formula
 * @param openMathRdf A string in RDF serialization containing OpenMath
 */
export async function fromOpenMath(openMathRdf: string) {
	// This function is implemented with an N3 store and Comunica's query functionality as rdflib just didn't implement the needed features
	// Get a new store, create a parser and parse the input using a callback
	const store = new Store();
	const parser = new N3Parser();
	parser.parse(openMathRdf, (error, quad, prefixes) => {
		if (error) console.log(`Error while parsing`);
		if (quad) store.add(quad);
		else console.log("Done parsing!", prefixes);
	});

	// Query to get OpenMath applications with operators and variables. Works also for nested applications. Positions stores arguments position, 
	// so that x+y and y+x can be distinguished. Protect this query at all cost...
	const queryString = `
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX OM: <http://openmath.org/vocab/math#>

	SELECT ?application (count(?argumentList)-1 as ?position) ?operator ?argName ?argType ?arg WHERE {
		?application OM:arguments/rdf:rest* ?argumentList;
			OM:operator ?operator.

		?argumentList rdf:rest*/rdf:first ?arg.
		?arg a ?argType.
		OPTIONAL {
			?arg OM:name ?argName.
		}
	}
	GROUP BY ?application ?argName ?operator ?argType ?arg
	`;
	
	// Fire query, get results (from a stream) and print all values for application for testing purposes
	const bindingsStream = await queryEngine.queryBindings(queryString, {sources: [store]});
	const bindings = await bindingsStream.toArray();
	
	
	const rootApplication = getRootApplication(bindings);
	console.log(rootApplication.get("application"));

	const openMathOperator = rootApplication.get("operator").value;
	const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);

	const argumentExpression = getArgumentsOfApplication(rootApplication, bindings);
	const string = createExpression(operator, argumentExpression);
	console.log(string);
}

function createExpression(operator:MathJsSymbolInformation, argumentExpression: string[] |string) {
	const arity = operator.arity;
	const operatorSymbol = operator.symbol;
	let expression = "";
	if (arity == 1) {
		expression = `${operator.symbol}(${argumentExpression})`;
	}
	if (arity == 2) {
		expression = (argumentExpression as string[]).join(operatorSymbol);
	}
	return expression;
}


function getRootApplication(bindings: Bindings[]): Bindings {
	// Get parent application (i.e. entry with a value for ?application that is no argument (?arg) to another parent application)
	return bindings.find(binding => !bindings.some(b => b.get("arg") == binding.get("application")));
}

function getArgumentsOfApplication(parentApplication: Bindings, bindings: Bindings[]): string {
	// Take the arg of the parentApplication and look it up in the list of arguments
	const argumentEntries = bindings.filter(binding => binding.get("application").equals(parentApplication.get("arg")));
	console.log(argumentEntries);
	let string = "";
	if (hasChildArguments(argumentEntries, bindings)) {
		console.log("has child arguments");
		const entry = argumentEntries[0];
		console.log(entry.get("application").value);
		string = getArgumentsOfApplication(entry, bindings);
		console.log("part string");
		console.log(string);
		
		
	} else{
		const allSameOperator = argumentEntries.every(entry => entry.get("operator").equals(argumentEntries[0].get("operator")));
		if (!allSameOperator) {
			const operators = argumentEntries.map(entry => entry.get("operator"));
			throw new Error(`Error trying to obtain the operator of application. Operators found: ${operators.toString()}`);
		}
		const openMathOperator = argumentEntries[0].get("operator").value;
		const operator = OperatorDictionary.getMathJsSymbol(openMathOperator);
		const argumentNames = argumentEntries.map(entry => entry.get("argName").value);
		string = createExpression(operator, argumentNames);
	}
	
	return string;
}

function hasChildArguments(argumentEntries: Bindings[], allBindings: Bindings[]) {
	const noOfEntries = argumentEntries.length;
	// If argumentEntries has further children, then the array can contain only one entry
	// TODO: Check if this is true
	console.log("no of entries for" + argumentEntries[0].get("application").value);
	console.log(noOfEntries);
	
	if (noOfEntries > 1) return false;

	// Otherwise, if there is only one, this one has to point to other entries
	const childElement = argumentEntries.find(argumentEntry => allBindings.some(binding => binding.get("application").equals(argumentEntry.get("arg"))));
	return (noOfEntries == 1) && (childElement != undefined);
}






export function toOpenMath(formula: string) {
	// This function is implemented rdflib.js as it is just easier to use when creating RDF (compared to Comunica)
	// Define needed namespaces
	const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');	// rdf NS
	const OM_MATH = Namespace("http://openmath.org/vocab/math#");			// OpenMath Math NS. Basic concepts, e.g., Application, Variable
	const XSD = Namespace("http://www.w3.org/2001/XMLSchema#");
	const EX = Namespace("http://example.org/ontology#");					// Example NS. //TODO: Change to something useful later

	// Define some shorthands for needed properties and classes
	const rdfType = RDF('type');
	const omApplication = OM_MATH('Application');
	const omArguments = OM_MATH('arguments');
	const omOperator = OM_MATH('operator');
	const omVariable = OM_MATH('Variable');
	const omVariableName = OM_MATH('name');
	const omLiteral = OM_MATH('Literal');
	const omLiteralValue = OM_MATH('value');

	// Parse the textual formula into a math.js representation
	const node = mathParse(formula);
	
	const store = graph();
	const listStore = new ArgumentListStore();

	node.traverse(function (node, path, parent) {
		console.log(node.type);
		console.log(path);
		console.log(parent);
		
		
		if( (node.type == 'FunctionNode')) {
			const castNode = node as math.FunctionNode;
			console.log(`Type: ${castNode.type}. Op/Name: ${castNode.fn}. Path: ${path}. Parent: ${parent}`);   
			
			const functionName = castNode.fn.name;
			const operator = OperatorDictionary.getOpenMathSymbol(functionName);
			
			const application = EX(`myApplication_${functionName}`);
			store.add(application, rdfType, omApplication);
			store.add(application, omOperator, operator);

			// Define a new argument list for this operation's arguments
			const currentArgumentList = listStore.getCurrentArgumentList(node);
			store.add(application, omArguments, currentArgumentList);
		}

		// Catch operators and symbol function nodes as both are translated to operators in OpenMath
		if( (node.type == 'OperatorNode') ) {
			
			const mathJsOperation = (node as math.OperatorNode)?.op ?? (node as math.SymbolNode)?.name;
			console.log(`Type: ${node.type}. Op/Name: ${mathJsOperation}. Path: ${path}. Parent: ${parent}`);   
			
			const operator = OperatorDictionary.getOpenMathSymbol(mathJsOperation);
			
			const operation = blankNode();
			store.add(operation, rdfType, omApplication);
			store.add(operation, omOperator, operator);
			
			// Define a new argument list for this operation's arguments
			const currentArgumentList = listStore.getCurrentArgumentList(node);
			store.add(operation, omArguments, currentArgumentList);

			// Append the node itself to the parent's argument list
			const parentArgumentList = listStore.getCurrentArgumentList(parent);
			parentArgumentList.append(operation);
		}

		if ( ((node.type == 'SymbolNode') && (path != 'fn')) ) {
			
			// For all other symbols that are no functions (e.g., variables): Add as argument to the current context
			const castNode = node as math.SymbolNode;
			console.log(`Type: ${node.type}. Name: ${castNode.name}. Path: ${path}. Parent: ${parent}.`);   
			const constantNode = blankNode();
			store.add(constantNode, rdfType, omVariable);
			store.add(constantNode, omVariableName, castNode.name);
			// TODO: Check current argument list
			// Add to argument list of the parent
			const currentArgumentList = listStore.getCurrentArgumentList(parent);
			currentArgumentList.append(constantNode);
		}

		if (node.type == 'ConstantNode') {
			
			// For constants: Add as argument to the current context
			const castNode = node as math.ConstantNode;
			console.log(`Type: ${node.type}. Name: ${castNode.value}. Path: ${path}. Parent: ${parent}. `);   
			const constantNode = blankNode();
			store.add(constantNode, rdfType, omLiteral);
			store.add(constantNode, omLiteralValue, lit(castNode.value.toString(), undefined, XSD('float')));

			// TODO: Check current argument list
			const currentArgumentList = listStore.getCurrentArgumentList(parent);
			currentArgumentList.append(constantNode);
		}
	});

	// Just print out the store's content for testing purposes
	console.log(serialize(undefined, store, 'http://base.org/', 'text/turtle'));
}

