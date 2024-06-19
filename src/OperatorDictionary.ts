
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
		"nthRoot": "http://www.openmath.org/cd/arith1#root",
		"pow": "http://www.openmath.org/cd/arith1#power",
		"abs": "http://www.openmath.org/cd/arith1#abs",
		// Transcendental functions
		"sin": "http://www.openmath.org/cd/transc1#sin",
		"cos": "http://www.openmath.org/cd/transc1#cos",
		"tan": "http://www.openmath.org/cd/transc1#tan",
	};

	private static openMathToMathJsMapping : { [key: string]: MathJsSymbolInformation} = {
		// Relations
		"http://www.openmath.org/cd/relation1#eq": {
			symbol: "=",
			arity: 2
		},
		"http://www.openmath.org/cd/relation1#lt": {
			symbol: "<",
			arity: 2
		},
		"http://www.openmath.org/cd/relation1#gt": {
			symbol: ">",
			arity: 2
		},
		"http://www.openmath.org/cd/relation1#neq": {
			symbol: "!=",
			arity: 2
		},
		"http://www.openmath.org/cd/relation1#leq": {
			symbol: "<=",
			arity: 2
		},
		"http://www.openmath.org/cd/relation1#geq": {
			symbol: ">=",
			arity: 2
		},
		// Arithmetic operators
		"http://www.openmath.org/cd/arith1#plus": {
			symbol: "+",
			arity: 2
		},
		"http://www.openmath.org/cd/arith1#minus": {
			symbol: "-",
			arity: 2
		},
		"http://www.openmath.org/cd/arith1#times": {
			symbol: "*",
			arity: 2
		},
		"http://www.openmath.org/cd/arith1#divide": {
			symbol: "/",
			arity: 2
		},
		"http://www.openmath.org/cd/arith1#root": {
			symbol: "nthRoot",
			arity: 2
		},
		"http://www.openmath.org/cd/arith1#power": {
			symbol: "pow",
			arity: 1
		},
		"http://www.openmath.org/cd/arith1#abs": {
			symbol: "abs",
			arity: 1
		},
		// Transcendental functions
		"http://www.openmath.org/cd/transc1#sin": {
			symbol: "sin",
			arity: 1
		},
		"http://www.openmath.org/cd/transc1#cos": {
			symbol: "cos",
			arity: 1
		},
		"http://www.openmath.org/cd/transc1#tan": {
			symbol: "tan",
			arity: 1
		},
	};


	static getOpenMathSymbol(mathJsSymbol: string):string {
		try {
			return OperatorDictionary.mathJsToOpenMathMapping[mathJsSymbol as keyof typeof this.mathJsToOpenMathMapping];
		} catch (error) {
			return "http://www.openmath.org/cd/error#unhandled_symbol";
		}
	}


	static getMathJsSymbol(openMathSymbol: string): MathJsSymbolInformation {
		try {
			return OperatorDictionary.openMathToMathJsMapping[openMathSymbol as keyof typeof this.openMathToMathJsMapping];
		} catch (error) {
			throw new Error(`Error while finding the MathJS symbol for the OpenMath symbol ${openMathSymbol}`);
		}
	}

}

export type MathJsSymbolInformation = {
	symbol: string,
	arity: 1 | 2
}