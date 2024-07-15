import { getOpenMathBindings } from "../src/fromOpenMath";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testing query functionalities', () => {
	// Give time to any async operation to complete after each test
	afterEach(async () => {
		await sleep(2000);
	});
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


});