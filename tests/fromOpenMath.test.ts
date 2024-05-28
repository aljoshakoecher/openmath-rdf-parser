import {Parser} from "../src/parser";

const p = new Parser();

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
		expect(result).toBe("x=y");
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
		expect(result).toBe("x=y+z");
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
		expect(result).toBe("sin(x+y)");
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
		expect(result).toBe("sin(pow(x+y))");
	});
});
