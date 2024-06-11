/**
 * Interface capturing the actual formula together with prefixes that may be used for IRIs in the formula
 */
export interface PrefixedFormula {
	// Key value object of prefixes and their namespaces
	prefixes?: Map<string, string>;
	// The actual formular in plain string
	formula: string
}
