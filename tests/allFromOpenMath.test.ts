import { FormulaResult } from "../src/FormulaResult";
import { OmRdfParser } from "../src/OmRdfParser";
const oMParser = new OmRdfParser();

describe('Testing conversion of all applications from OpenMath to plain text', () => {
	test('Should return only one result inside the formula result object', async () => {
		const ttlInput = ` 
		@prefix : </#>.
		@prefix ont: <http://example.org/ontology#>.
		@prefix m: <http://openmath.org/vocab/math#>.

		ont:myApplication_equals
			a m:Application;
			m:arguments
				( [ a m:Variable; m:name "x" ]
				[ a m:Variable; m:name "y" ] );
		m:operator "http://www.openmath.org/cd/relation1#eq".`;

		const result = await oMParser.allFromOpenMath(ttlInput);
		const expectedResultEntry = new FormulaResult(
			{
				formula:"x = y",
				context: null
			},
			"http://example.org/ontology#myApplication_equals",
		);
		expect(result).toStrictEqual([expectedResultEntry]);
	});
});