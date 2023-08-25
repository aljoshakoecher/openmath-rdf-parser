export class OperatorDictionary {
	private static mathJsToOpenMathMapping = {
		// Relations
		"=": "http://www.openmath.org/cd/relation1#eq",
		"<": "http://www.openmath.org/cd/relation1#lt", 
		">": "http://www.openmath.org/cd/relation1#gt", 
		"!=": "http://www.openmath.org/cd/relation1#neq",
		"<=": "http://www.openmath.org/cd/relation1#leq",
		">=": "http://www.openmath.org/cd/relation1#geq", 
		// Arithmetic operators
		"+": "http://www.openmath.org/cd/arith1#plus",
		"-": "http://www.openmath.org/cd/arith1#minus",
		"*": "http://www.openmath.org/cd/arith1#times",
		"/": "http://www.openmath.org/cd/arith1#divide",
		"sqrt": "http://www.openmath.org/cd/arith1#root",
		"pow": "http://www.openmath.org/cd/arith1#power",
		"abs": "http://www.openmath.org/cd/arith1#abs",
		// Transcendental functions
		"sin": "http://www.openmath.org/cd/transc1#sin",
		"cos": "http://www.openmath.org/cd/transc1#cos",
		"tan": "http://www.openmath.org/cd/transc1#tan",
	};

	private static openMathToMathJsMapping = {
		// Relations
		"http://www.openmath.org/cd/relation1#eq": "=",
		"http://www.openmath.org/cd/relation1#lt": "<",
		"http://www.openmath.org/cd/relation1#gt": ">",
		"http://www.openmath.org/cd/relation1#neq": "!=",
		"http://www.openmath.org/cd/relation1#leq": "<=",
		"http://www.openmath.org/cd/relation1#geq": ">=",
		// Arithmetic operators
		"http://www.openmath.org/cd/arith1#plus": "+",
		"http://www.openmath.org/cd/arith1#minus": "-",
		"http://www.openmath.org/cd/arith1#times": "*",
		"http://www.openmath.org/cd/arith1#divide": "/",
		"http://www.openmath.org/cd/arith1#root": "sqrt",
		"http://www.openmath.org/cd/arith1#power": "pow",
		"http://www.openmath.org/cd/arith1#abs": "abs",
		// Transcendental functions
		"http://www.openmath.org/cd/transc1#sin": "sin",
		"http://www.openmath.org/cd/transc1#cos": "cos",
		"http://www.openmath.org/cd/transc1#tan": "tan",
	};


	static getOpenMathSymbol(mathJsSymbol: string) {
		try {
			return OperatorDictionary.mathJsToOpenMathMapping[mathJsSymbol];
		} catch (error) {
			return "http://www.openmath.org/cd/error#unhandled_symbol";
		}
	}


	static getMathJsSymbol(openMathSymbol: string) {
		try {
			return OperatorDictionary.openMathToMathJsMapping[openMathSymbol];
		} catch (error) {
			return "err";
		}
	}

}