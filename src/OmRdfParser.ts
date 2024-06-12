import { PrefixedFormula } from "./Formula";
import { fromOpenMath } from "./fromOpenMath";
import { replaceIris, resolvePrefixes, toOpenMath } from "./toOpenMath";

/**
 * A parser that allows converting between string and RDF representation of mathematical formulas
 */
export class OmRdfParser {

	/**
	 * Converts an OpenMath RDF representation to a string representation.
	 * 
	 * @param {string} rdfString - RDF dataset that contains an OpenMath application to be converted to its string representation.
	 * @param {string} rootApplicationIri - IRI of the application to be transformed. Your rdfString may contain multiple expressions in the form of OpenMath applications. The parameter rootApplicationIri refers to the one you want to convert to its string representation.
	 * @returns {Promise<string>} - The formula that was originally represented as OpenMath in plain string syntax.
	 */
	fromOpenMath(rdfString: string, rootApplicationIri: string): Promise<string> {
		return fromOpenMath(rdfString, rootApplicationIri);
	}

	/**
	 * Converts a mathematical formula in plain string representation to its OpenMath RDF representation.
	 * 
	 * @param {PrefixedFormula | string} formula - In the simplest case, this is a string representation of a formula without any references to ontological entities, e.g., `x + y <= 2`. For such cases, blank nodes are created representing x and y. Alternatively, you can provide a PrefixedFormula object to include prefixes for IRIs.
	 * @returns {Promise<string>} - The OpenMath RDF representation of the input formula.
	 */
	toOpenMath(formula: PrefixedFormula | string): Promise<string> {
		return toOpenMath(formula);
	}

	/**
	 * Resolves all prefixes and converts a formula with prefixes to a formula containing only full IRIs
	 * @param {string} formula A formula with prefixes
	 * @returns {string} Prefix-free formula with full IRIs
	 */
	resolvePrefixes(formula: PrefixedFormula): string {
		return resolvePrefixes(formula);
	}

	/**
	 * Utility function to replace IRIs with auto-generated variable names that can be understood by Math.JS
	 * @param {string} formula A formula with IRIs
	 * @returns {string} The same formula but with auto-generated variables instead of IRIs
	 */
	replaceIris(formula: string): string {
		return replaceIris(formula);
	}
}


