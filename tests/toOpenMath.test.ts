import { Parser as N3Parser, Store, DataFactory, Term, BlankNode, NamedNode } from 'n3';
const { namedNode } = DataFactory;
import { OmRdfParser } from '../src/OmRdfParser';
import { Quad } from '@rdfjs/types';
import { PrefixedFormula } from '../src/Formula';

const p = new OmRdfParser();
const n3Parser = new N3Parser();

const rdfType = namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
const omApplication = namedNode('http://openmath.org/vocab/math#Application');
const omArguments = namedNode('http://openmath.org/vocab/math#arguments');
const omOperator = namedNode('http://openmath.org/vocab/math#operator');
const omVariableName = namedNode('http://openmath.org/vocab/math#name');
const omLiteralValue = namedNode('http://openmath.org/vocab/math#value');

describe('Testing conversion from plain text to OpenMath RDF', () => {

	test('Should convert very simple relation', async () => {
		const formula = "x<=10";
		const result = await p.toOpenMath(formula);

		// Put the result in a store to get quads for checking
		const n3Store = new Store();
		n3Store.addQuads(n3Parser.parse(result));

		// Get all applications -> there must be exactly one
		const applications = new Array<Quad>();
		for (const quad of n3Store.match(null, rdfType, omApplication, null))
			applications.push(quad);
		expect(applications.length).toBe(1);

		// extract all lists to handle RDF lists as JS arrays
		const lists = n3Store.extractLists();

		// The application must have an arguments list with two entries (x and 10)
		const application = applications[0].subject as Term;
		const argumentListNode = n3Store.match(application, omArguments, null, null).read()?.object as BlankNode;
		const argumentList = lists[argumentListNode.value];
		expect(argumentList.length).toBe(2);

		// The first argument must have a name of "x"
		const firstArgumentName = n3Store.match(argumentList[0] as BlankNode, omVariableName, null, null).read()?.object as BlankNode;
		expect(firstArgumentName.value).toBe("x");

		// The second argument must have a value of 10
		const secondArgumentValue = n3Store.match(argumentList[1] as BlankNode, omLiteralValue, null, null).read()?.object as BlankNode;
		expect(secondArgumentValue.value).toBe("10");
	});

	test('Should convert a relation between a sum of sin()s and a constant', async () => {
		const formula = "sin(x) + sin(y) <= 2";
		const result = await p.toOpenMath(formula);

		// Put the result in a store to get quads for checking
		const n3Store = new Store();
		n3Store.addQuads(n3Parser.parse(result));

		// Get all applications -> there must be exactly four (one for "=", one for the sum on the left side, and one each for the sin())
		const applications = new Array<Quad>();
		for (const quad of n3Store.match(null, rdfType, omApplication, null))
			applications.push(quad);
		expect(applications.length).toBe(4);

		// extract all lists to handle RDF lists as JS arrays
		const lists = n3Store.extractLists();

		// The first application should have <= as an operator, another application and "2" as its arguments
		const firstApplicationOperator = n3Store.match(applications[0].subject as Term, omOperator, null, null).read();
		expect(firstApplicationOperator?.object.value).toBe("http://www.openmath.org/cd/relation1#leq");

		const firstApplicationArgumentsNode = n3Store.match(applications[0].subject as Term, omArguments, null, null).read()?.object as Term;
		const firstApplicationArguments = lists[firstApplicationArgumentsNode.value];
		firstApplicationArguments.forEach(argument => {
			if (argument.termType == "NamedNode") {
				const argumentType = n3Store.match(argument as NamedNode, rdfType, omApplication, null).read();
				expect(argumentType).toBeTruthy();
			}
			else if (argument.termType == "BlankNode") {
				const argumentValue = n3Store.match(argument as BlankNode, omLiteralValue, null, null).read()?.object;
				expect(argumentValue?.value).toBe("2");
			}
		});

		// TODO: Extend test to test sin mappings
	});


	test('Should convert an equation with a full IRI', async () => {
		const iriVariable = "http://example.org/x#a";
		const input = `${iriVariable} = 5`;
		const result = await p.toOpenMath(input);

		// Put the result in a store to get quads for checking
		const n3Store = new Store();
		n3Store.addQuads(n3Parser.parse(result));
		
		// Get all applications -> there must be exactly one for the "="
		const applications = new Array<Quad>();
		for (const quad of n3Store.match(null, rdfType, omApplication, null))
			applications.push(quad);
		expect(applications.length).toBe(1);
		
		// extract all lists to handle RDF lists as JS arrays
		const lists = n3Store.extractLists();

		// The first application should have <= as an operator, another application and "2" as its arguments
		const firstApplicationArgumentsNode = n3Store.match(applications[0].subject as Term, omArguments, null, null).read()?.object as Term;
		const firstApplicationArguments = lists[firstApplicationArgumentsNode.value];
		const actualLeftSideIri = firstApplicationArguments[0].value;

		expect(actualLeftSideIri).toBe(iriVariable);
	});


	test('Should convert an equation with prefixes', async () => {
		const input = 'x:a = y:b + 5';
		const prefixes = new Map<string, string>();
		prefixes.set('x', 'http://example.org/x#');
		prefixes.set('y', 'http://example.org/y#');
		
		const prefixedFormula: PrefixedFormula = {
			prefixes: prefixes, 
			formula: input
		};
		const result = await p.toOpenMath(prefixedFormula);

		// Put the result in a store to get quads for checking
		const n3Store = new Store();
		n3Store.addQuads(n3Parser.parse(result));

		// Get all applications -> there must be exactly two (one for the =, one for the +)
		const applications = new Array<Quad>();
		for (const quad of n3Store.match(null, rdfType, omApplication, null))
			applications.push(quad);
		expect(applications.length).toBe(2);

		// extract all lists to handle RDF lists as JS arrays
		const lists = n3Store.extractLists();

		// The first applications first argument should be http://example.org/x#a
		const firstApplicationArgumentsNode = n3Store.match(applications[0].subject as Term, omArguments, null, null).read()?.object as Term;
		const firstApplicationArguments = lists[firstApplicationArgumentsNode.value];
		const leftSide = firstApplicationArguments[0].value;

		expect(leftSide).toBe('http://example.org/x#a');

		const rightSide = firstApplicationArguments[1];
		const rightSideApplicationArgumentsNode = n3Store.match(rightSide as Term, omArguments, null, null).read()?.object as Term;
		const rightSideArguments = lists[rightSideApplicationArgumentsNode.value];
		const firstSummand = rightSideArguments[0].value;

		expect(firstSummand).toBe('http://example.org/y#b');
	});

});
