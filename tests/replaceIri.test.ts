import { OmRdfParser } from "../src/OmRdfParser";


describe('Testing IRI replacement', () => {

	const parser = new OmRdfParser();

	test('Should replace all IRIs', async () => {
		const input = "http://example.org/x#a = http://example.org/y#b";

		const actualResult = await parser.replaceIris(input);
		const expectedResult = 'omrdf_0 = omrdf_1';
		expect(actualResult).toBe(expectedResult);
	});

	// TODO: Add additional tests with differently shaped IRIs

});