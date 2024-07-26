import { Term } from "@rdfjs/types";
import { NamedNode } from "n3";

/**
 * Mimics a query result of an application. Applications may occur multiple times in the results, which each occurence pointing to a different sub equation as its "args" 
 */
export class Application {
	readonly argType = new NamedNode("http://openmath.org/vocab/math#Application");

	constructor(
		public context: Term,
		public application: Term,
		public position: Term,
		public operator: Term,
		public argName: Term,
		public argValue: Term,
		public args = new Array<Term>()
	) { } 

	addArg(arg: Term) {
		this.args.push(arg);
	}
}