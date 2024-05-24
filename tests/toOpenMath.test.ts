import { toOpenMath } from "../src/parser";

// TODO: The test is currently failing and the parsing function has to be fixed before the test can be fixed
// TODO: toOpenMath should also use N3
describe('Testing conversion from plain text to OpenMath RDF', () => {
	test('Should convert simple equation', () => {
		const input = "x=y";
		
		const expectedResult = ` 
		@prefix : </#>.
		@prefix ont: <http://example.org/ontology#>.
		@prefix m: <http://openmath.org/vocab/math#>.

		ont:myApplication_equals
			a m:Application;
			m:arguments
				( [ a m:Variable; m:name "x" ]
				[ a m:Variable; m:name "y" ] );
		m:operator "http://www.openmath.org/cd/relation1#eq".`;

		const result = toOpenMath(input);
		
		expect(result).toBe(expectedResult);
	});

	
});
