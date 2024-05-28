# OpenMath RDF Parser
A parser to convert between string representation and OpenMath RDF representation of mathematical expressions.


## How to use
The main entry point is the `OmRdfParser` class. Import that class and use either `fromOpenMath` or `toOpenMath` to perform the corresponding translations.

### fromOpenMath
Use `fromOpenMath(rdfString: string, rootApplicationIri: string)` to convert from an OpenMath RDF representation to a string representation. The parameters to pass are:
- `rdfString`: RDF dataset that contains an OpenMath application to be converted to its string representation
- `rootApplicationIri`: IRI of the application to be transformed. Your `rdfString` may contain multiple expressions in the form of OpenMath applications. The parameter `rootApplicationIri` refers to the one you want to conver to its string representation


### toOpenMath
Use `toOpenMath(formula: string)` to convert from a mathematical formula in plain string representation to its OpenMath RDF representation. There is only one parameter to pass:
- `formula`: A string representation of a formula, e.g., `x + y <= 2`
