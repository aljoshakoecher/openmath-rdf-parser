import { OmRdfParser } from "../src/OmRdfParser";


describe('Testing prefix resolving', () => {

	const parser = new OmRdfParser();

	test('Should resolve all prefixes', async () => {
		const input = "x:a = y:5";
		const prefixes = new Map<string, string>();
		prefixes.set('x', 'http://example.org/x#');
		prefixes.set('y', 'http://example.org/y#');

		const actualResult = await parser.resolvePrefixes({ prefixes: prefixes, formula: input });
		const expectedResult = 'http://example.org/x#a = http://example.org/y#5';
		expect(actualResult).toBe(expectedResult);
	});

});