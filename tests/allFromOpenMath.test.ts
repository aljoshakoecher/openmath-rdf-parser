import { FormulaResult } from "../src/FormulaResult";
import { OmRdfParser } from "../src/OmRdfParser";
const oMParser = new OmRdfParser();

describe('Testing conversion of all applications from OpenMath to plain text', () => {
	xtest('Should return only one result inside the formula result object', async () => {
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

	test('Should get all equations', async () => {
		const ttlInput = ` 
		@prefix m: <http://openmath.org/vocab/math#>.
		@prefix ex: <http://example.org/ontology#>.
		ex:Equation a m:Application ;
										m:arguments (
											[ 	
												a m:Application;
												m:operator <http://www.openmath.org/cd/arith1#plus>;
												m:arguments (
													[a m:Variable; m:name "x"]
													[a m:Literal; m:value 2]
												)
											]
											[ 	
												a m:Application;
												m:operator <http://www.openmath.org/cd/arith1#minus>;
												m:arguments (
													[a m:Variable; m:name "y"]
													[a m:Literal; m:value 1]
												)
											]
										);
										m:operator <http://www.openmath.org/cd/relation1#eq> .
		`;

		const result = await oMParser.allFromOpenMath(ttlInput);
		const expectedResultEntry = new FormulaResult(
			{
				formula:"x + 2 = y - 1",
				context: null
			},
			"http://example.org/ontology#Equation",
		);
		expect(result).toStrictEqual([expectedResultEntry]);
	});
});