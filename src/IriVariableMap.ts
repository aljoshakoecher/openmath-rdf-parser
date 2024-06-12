
/**
 * A map utility to replace IRIs with variable names that OpenMath can understand
 */
export class IriVariableDictionary {
	static base = 'omrdf';
	static counter = 0;

	static iriToVariable = new Map<string, string>();
	static variableToIri = new Map<string, string>();
	
	/**
	 * Creates a new mapping for an IRI
	 * @param iri IRI that needs to be resolved
	 * @returns The variable that replaces the IRI
	 */
	static addNewIri(iri: string): string {
		const newVar = `${this.base}_${this.counter}`;
		this.iriToVariable.set(iri, newVar);
		this.variableToIri.set(newVar, iri);
		this.counter++;
		return newVar;
	}

	/**
	 * Checks whether a given variable is contained in the dictionary
	 * @param variable variable to check
	 * @returns true, if variable is contained in the dictionary
	 */
	static containsVariable(variable: string): boolean {
		return this.variableToIri.has(variable);
	}

	/**
	 * Get a variable for an IRI to replace it in OpenMath expressions
	 * @param iri IRI that is replaced by an OpenMath variable
	 * @returns The valid OpenMath variable name
	 */
	static getVariableForIri(iri: string): string {
		const variable =  this.iriToVariable.get(iri);
		if (variable === undefined) {
			throw new Error(`No entry for IRI ${iri}`);
		}
		return variable;
	}

	/**
	 * Get an IRI for a variable to replace it after OpenMath has been parsed
	 * @param variable A valid OpenMath variable to be used in parsing
	 * @returns An IRI that stands for the variable
	 */
	static getIriForVariable(variable: string): string {
		const iri = this.variableToIri.get(variable);
		if (iri === undefined) {
			throw new Error(`No entry for variable ${variable}`);
		}
		return iri;
	}


	static reset() {
		this.variableToIri.clear();
		this.iriToVariable.clear();
		this.counter = 0;
	}

}