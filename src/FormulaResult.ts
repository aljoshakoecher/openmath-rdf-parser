export class FormulaOfContext {
	constructor(
		public context: string | null,
		public formula: string
	) {}
}

export class FormulaResult extends FormulaOfContext {
	constructor(
		formula: FormulaOfContext,
		public rootApplicationIri: string,
	) {
		super(formula.context, formula.formula);
	}
}

