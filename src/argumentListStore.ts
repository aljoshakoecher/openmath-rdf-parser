import { Collection } from "rdflib";

export class ArgumentListMap {

	private argumentListMap = new Map<math.MathNode, Collection>;

	public getCurrentArgumentList(node: math.MathNode): Collection {
		// root path is just null, replace by "root"
		if(!this.argumentListMap.has(node)) {
			this.argumentListMap.set(node, new Collection());
		}
		
		const existingList = this.argumentListMap.get(node);
		return existingList;
	}
}