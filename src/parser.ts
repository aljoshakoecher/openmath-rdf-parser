import { parse } from "mathjs";
import { Namespace, graph, blankNode, lit, serialize } from "rdflib";
import { OperatorDictionary } from "./dictionary";
import { ArgumentListStore } from "./argumentListStore";

export function fromOpenMath(openMathRdf: string) {
	console.log(openMathRdf);
}


export function toOpenMath(formula: string) {
	const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');	// rdf NS
	const OM_MATH = Namespace("http://openmath.org/vocab/math#");			// OpenMath Math NS. Basic concepts, e.g., Application, Variable
	const XSD = Namespace("http://www.w3.org/2001/XMLSchema#");
	const EX = Namespace("http://example.org/ontology#");					// Example NS. //TODO: Change to something useful later

	const rdfType = RDF('type');
	const omApplication = OM_MATH('Application');
	const omArguments = OM_MATH('arguments');
	const omOperator = OM_MATH('operator');
	const omVariable = OM_MATH('Variable');
	const omVariableName = OM_MATH('name');
	const omLiteral = OM_MATH('Literal');
	const omLiteralValue = OM_MATH('value');

	const store = graph();

	const node = parse(formula);
	// const baseApplication = EX('myApplication');
	// store.add(baseApplication, rdfType, omApplication);
	// const currentApplication = baseApplication;
	
	console.log("traverse");
	const listStore = new ArgumentListStore();

	node.traverse(function (node, path, parent) {
		console.log(node.type);
		console.log(path);
		console.log(parent);
		
		// if(parent == null) return;

		// console.log(`Type: ${node.type}. Path: ${path}. Parent: ${parent}. Parent(args): ${node[path]}`);   
		
		// console.log(currentArgumentList);
		
		if( (node.type == 'FunctionNode')) {
			const castNode = node as math.FunctionNode;
			console.log(`Type: ${castNode.type}. Op/Name: ${castNode.fn}. Path: ${path}. Parent: ${parent}`);   
			
			// console.log({mathJsOperation: mathJsOperation});
			const functionName = castNode.fn.name;
			const operator = OperatorDictionary.getOpenMathSymbol(functionName);
			// console.log({operator: operator});
			
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
			
			// console.log({mathJsOperation: mathJsOperation});
			const operator = OperatorDictionary.getOpenMathSymbol(mathJsOperation);
			// console.log({operator: operator});
			
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
		
		// switch (node.type) {
		// case 'OperatorNode' || 'SymbolNode': {
		// 	console.log(`Type: ${node.type}. Op: ${(node as math.OperatorNode).op}. Path: ${path}`);    
		// 	const operatorNode = node as math.OperatorNode;
		// 	const operator = OperatorDictionary.getOpenMathSymbol(operatorNode.op);
		// 	store.add(currentApplication, omOperator, operator);

		// 	const applicationArguments = new Collection();
		// 	store.add(currentApplication, omArguments, applicationArguments);
		// 	break;
		// }
		// case 'SymbolNode':   console.log(`Type: ${node.type}. Name: ${(node as math.SymbolNode).name}. Path: ${path}`);  break;
		// case 'ConstantNode': console.log(`Type: ${node.type}. Value: ${(node as math.ConstantNode).value}. Path: ${path}`); break;
		// default:             console.log(node.type);
		// }
	});

	console.log(serialize(undefined, store, 'http://base.org/', 'text/turtle'));
}

