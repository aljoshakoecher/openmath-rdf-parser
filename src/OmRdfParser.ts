import { PrefixedFormula } from "./Formula.js";
import { fromOpenMath } from "./fromOpenMath.js";
import { replaceIris, resolvePrefixes, toOpenMath } from "./toOpenMath.js";


export class OmRdfParser {
	
	fromOpenMath(rdfString: string, rootApplicationIri: string): Promise<string> {
		return fromOpenMath(rdfString, rootApplicationIri);
	}

	toOpenMath(formula: PrefixedFormula | string): Promise<string> {
		return toOpenMath(formula);
	}

	resolvePrefixes(formula: PrefixedFormula): string {
		return resolvePrefixes(formula);
	}

	replaceIris(formula: string): string {
		return replaceIris(formula);
	}
}


