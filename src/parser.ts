import { fromOpenMath } from "./fromOpenMath";
import { toOpenMath } from "./toOpenMath";


export class Parser {
	
	fromOpenMath(rdfString: string, rootApplicationIri: string): Promise<string> {
		return fromOpenMath(rdfString, rootApplicationIri);
	}

	toOpenMath(formula: string): Promise<string> {
		return toOpenMath(formula);
	}
}


