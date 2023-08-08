import { Collection } from "rdflib";

export class ArgumentListStore {

	private argumentListStore = new Map<math.MathNode, Collection>;

	public getCurrentArgumentList(node: math.MathNode): Collection {
		// root path is just null, replace by "root"
		if(!this.argumentListStore.has(node)) {
			this.argumentListStore.set(node, new Collection());
		}
		
		const existingList = this.argumentListStore.get(node);
		return existingList;
	}
}