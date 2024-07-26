import { getOpenMathBindings } from "../src/fromOpenMath";
import { capabilityRdfData } from "./capability-tests/capability.test";

describe('Testing query functionalities', () => {
	test('Should return the correct amount of results', async () => {
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

		const bindings = await getOpenMathBindings(ttlInput);
		expect(bindings.length).toBe(2);
	});

	test('Should return the correct amount of results for the capablity', async () => {
		const ttlInput = capabilityRdfData;
		
		// Capability data should have 4 bindings
		const bindings = await getOpenMathBindings(ttlInput);
		expect(bindings.length).toBe(4);
	});

});