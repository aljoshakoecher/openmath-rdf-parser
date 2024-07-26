import { FormulaResult } from "../src/FormulaResult";
import { OmRdfParser } from "../src/OmRdfParser";
const p = new OmRdfParser();

describe('Testing conversion from OpenMath to plain text', () => {
	test('Should convert simple equation', async () => {
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

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#myApplication_equals");
		const expectedResultEntry = new FormulaResult(
			{
				formula:"x = y",
				context: null
			},
			"http://example.org/ontology#myApplication_equals",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});


	test('Should convert a more complex equation', async () => {
		const ttlInput = ` 
		@prefix : </#>.
		@prefix ont: <http://example.org/ontology#>.
		@prefix m: <http://openmath.org/vocab/math#>.

		ont:myApplication_equalsComplex
			a m:Application;
			m:arguments
				( 
					[ a m:Variable; m:name "x" ]
					[
						a m:Application;
						m:arguments
								( [ a m:Variable; m:name "y" ]
								[ a m:Variable; m:name "z" ] );
						m:operator "http://www.openmath.org/cd/arith1#plus"
					] 
				);
		m:operator "http://www.openmath.org/cd/relation1#eq".`;

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#myApplication_equalsComplex");
		const expectedResultEntry = new FormulaResult(
			{
				formula:"x = y + z",
				context: null
			},
			"http://example.org/ontology#myApplication_equalsComplex",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});


	test('Should convert a nested expression with two layers', async () => {
		const ttlInput = ` 
		@prefix : </#>.
		@prefix ont: <http://example.org/ontology#>.
		@prefix m: <http://openmath.org/vocab/math#>.

		ont:myApplication_sin
			a m:Application;
			m:arguments
					(
							[
								a m:Application;
								m:arguments
										( [ a m:Variable; m:name "x" ]
										[ a m:Variable; m:name "y" ] );
								m:operator "http://www.openmath.org/cd/arith1#plus"
							]
					);
			m:operator "http://www.openmath.org/cd/transc1#sin".`;

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#myApplication_sin");
		const expectedResultEntry = new FormulaResult(
			{
				formula:"sin(x + y)",
				context: null
			},
			"http://example.org/ontology#myApplication_sin",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});


	test('Should convert a nested expression with three layers', async () => {
		const ttlInput = ` 
		@prefix : </#>.
		@prefix ont: <http://example.org/ontology#>.
		@prefix m: <http://openmath.org/vocab/math#>.

		ont:myApplication_sinpow
			a m:Application;
			m:arguments
					(
							[
								a m:Application;
								m:arguments
										(
											[
												a m:Application;
												m:arguments
														( [ a m:Variable; m:name "x" ]
														[ a m:Variable; m:name "y" ] );
												m:operator "http://www.openmath.org/cd/arith1#plus"
											]
										);
								m:operator "http://www.openmath.org/cd/arith1#power"
							]
					);
		m:operator "http://www.openmath.org/cd/transc1#sin".`;

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#myApplication_sinpow");
		const expectedResultEntry = new FormulaResult(
			{
				formula:"sin(pow(x + y))",
				context: null
			},
			"http://example.org/ontology#myApplication_sinpow",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});



	test('Should convert simple expression with a constant', async () => {
		const ttlInput = ` 
		@prefix m: <http://openmath.org/vocab/math#>.

		<http://example.org/ontology#123_eq> a m:Application;
			m:operator <http://www.openmath.org/cd/relation1#eq>.
		_:n3-0 a m:Variable;
			m:name "x".
		<http://example.org/ontology#123_add> a m:Application;
			m:operator <http://www.openmath.org/cd/arith1#plus>.
		_:n3-1 a m:Variable;
			m:name "y".
		_:n3-2 a m:Literal;
			m:name "asd";
			m:value 5.
		<http://example.org/ontology#123_add> m:arguments (_:n3-1 _:n3-2).
		<http://example.org/ontology#123_eq> m:arguments (_:n3-0 <http://example.org/ontology#123_add>).`;

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#123_eq");
		const expectedResultEntry = new FormulaResult(
			{
				formula:"x = y + 5",
				context: null
			},
			"http://example.org/ontology#123_eq",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});


	test('Should convert a more complex equation x + 2 = y - 1', async () => {
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

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#Equation");
		const expectedResultEntry = new FormulaResult(
			{
				formula: "x + 2 = y - 1",
				context: null
			},
			"http://example.org/ontology#Equation",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});


	test('Should convert a more complex expression with boolean relations', async () => {
		const ttlInput = `
		@prefix m: <http://openmath.org/vocab/math#>.
		@prefix ex: <http://example.org/ontology#>.
		ex:InnerDiameterStackConstraint a m:Application ;
										m:arguments (
											[ 	
												a m:Application;
												m:operator <http://www.openmath.org/cd/logic1#and>;
												m:arguments (
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack1CurrentInnerDiameter_ID"]
															[a m:Variable; m:name "ex:RequiredInnerDiameter_ID3"]
														)
													]
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack1CurrentColor_ID"]
															[a m:Variable; m:name "ex:RequiredColor_ID"]
														)
													]
												)
											]
											[ 	
												a m:Application;
												m:operator <http://www.openmath.org/cd/logic1#and>;
												m:arguments (
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack2CurrentInnerDiameter_ID"]
															[a m:Variable; m:name "ex:RequiredInnerDiameter_ID3"]
														)
													]
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack2CurrentColor_ID"]
															[a m:Variable; m:name "ex:RequiredColor_ID"]
														)
													]
												)
											]
											[ 	
												a m:Application;
												m:operator <http://www.openmath.org/cd/logic1#and>;
												m:arguments (
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack3CurrentInnerDiameter_ID"]
															[a m:Variable; m:name "ex:RequiredInnerDiameter_ID3"]
														)
													]
													[
														a m:Application;
														m:operator <http://www.openmath.org/cd/relation1#eq>;
														m:arguments (
															[a m:Variable; m:name "ex:ProductStack3CurrentColor_ID"]
															[a m:Variable; m:name "ex:RequiredColor_ID"]
														)
													]
												)
											]
										);
										m:operator <http://www.openmath.org/cd/logic1#or> .
		`;

		const result = await p.fromOpenMath(ttlInput, "http://example.org/ontology#InnerDiameterStackConstraint");
		const expectedResultEntry = new FormulaResult(
			{
				/* eslint-disable max-len */ 
				formula:"ex:ProductStack1CurrentInnerDiameter_ID = ex:RequiredInnerDiameter_ID3 && ex:ProductStack1CurrentColor_ID = ex:RequiredColor_ID || ex:ProductStack2CurrentInnerDiameter_ID = ex:RequiredInnerDiameter_ID3 && ex:ProductStack2CurrentColor_ID = ex:RequiredColor_ID || ex:ProductStack3CurrentInnerDiameter_ID = ex:RequiredInnerDiameter_ID3 && ex:ProductStack3CurrentColor_ID = ex:RequiredColor_ID",
				context: null
			},
			"http://example.org/ontology#InnerDiameterStackConstraint",
		);
		expect(result).toStrictEqual(expectedResultEntry);
	});

	
});
