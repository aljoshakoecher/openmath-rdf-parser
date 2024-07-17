![Test Status](https://github.com/aljoshakoecher/openmath-rdf-parser/actions/workflows/main.yml/badge.svg)

# OpenMath RDF Parser
A utility tool to convert between string representation and OpenMath RDF representation of mathematical expressions.

## Motivation
Even simple expressions are super cumbersome to model in OpenMath RDF syntax. Consider the following expression:
```
x = y + 5;
```

In OpenMath RDF, this equation looks like that:
```
@prefix m: <http://openmath.org/vocab/math#>.

<http://example.org/ontology#f6c2045d-6053-4167-8da8-81882aa18532_eq> a m:Application;
    m:operator <http://www.openmath.org/cd/relation1#eq>.
_:n3-0 a m:Variable;
    m:name "x".
<http://example.org/ontology#87b80ac1-63c4-4eea-807d-fae477595c80_add> a m:Application;
    m:operator <http://www.openmath.org/cd/arith1#plus>.
_:n3-1 a m:Variable;
    m:name "y".
_:n3-2 a m:Literal;
    m:value 5.
<http://example.org/ontology#87b80ac1-63c4-4eea-807d-fae477595c80_add> m:arguments (_:n3-1 _:n3-2).
<http://example.org/ontology#f6c2045d-6053-4167-8da8-81882aa18532_eq> m:arguments (_:n3-0 <http://example.org/ontology#87b80ac1-63c4-4eea-807d-fae477595c80_add>).
```

The expression is broken down into a tree. On the top level, there is an OpenMath Application with operator "=" and two arguments for the left and right of the equation. The right side is itself an Application with operator "+" and the two arguments "y" and "5".

But everybody will agree that this RDF structure is not easy to create manually. This is where this OpenMathRdfParser comes into play. It automatically generates OpenMath RDF from a string-based formula and vice versa.

## How to use
Install the library into your project using `npm install openmath-rdf-parser` and create an instance of the `OmRdfParser` class:
```
import { OmRdfParser } from "openmath-rdf-parser";
const parser = new OmRdfParser();
```
Use the functions below to convert from Open Math RDF to plain string formulas or from plain string formulas to an Open Math RDF representation.

### Convert Open Math RDF to string formulas
There are two functions to get formulas in RDF and convert them to a string representation. The function `fromOpenMath()` converts a single formula (identified by an IRI of one Open Math application) and returns it as a `FormulaResult` object.
#### allFromOpenMath
The function `allFromOpenMath(rdfString: string)` finds all OpenMath formulas inside `rdfString` and convert them into an array of `FormulaResult` objects, which have the following structure: 
```
class FormulaResult {
	context: string, 
	formula: string,
	rootApplicationIri: string,
}
```

In this object, `formula` stores the actual formula. `context` contains the IRI of the element that the OpenMath application is connected to. And `rootApplicationIri` is the IRI of the root application, i.e., the application acting as the root element of a formula.


#### fromOpenMath
Use `fromOpenMath(rdfString: string, rootApplicationIri: string)` to convert from one particular OpenMath RDF representation to a string representation. The parameters to pass are:
- `rdfString`: RDF dataset that contains an OpenMath application to be converted to its string representation
- `rootApplicationIri`: IRI of the application to be transformed. Your `rdfString` may contain multiple expressions in the form of OpenMath applications. The parameter `rootApplicationIri` refers to the one you want to conver to its string representation.

The function `fromOpenMath()` always returns one individual `FormulaResult` object (structure see above).


### Convert string formulas to Open Math RDF
### toOpenMath
Use `toOpenMath(formula: PrefixedFormula | string)` to convert from a mathematical formula in plain string representation to its OpenMath RDF representation. There is only one parameter to pass, but this parameter allows for multiple options.
- `formula`: In the simplest case, this is a string representation of a formula without any references to ontological entities, e.g., `x + y <= 2`. For such cases, blank nodes are created representing x and y.

At some point, you might want to express a formula containing RDF resources and thus you have to integrate IRIs into your formulas. You can use full IRIs without any issues. As a simple example, consider the following. You can use IRIs like `http://example.org/x#a` and pass the formula as a string.
```ts
const input = "http://example.org/x#a = 5";
const result = await p.toOpenMath(input);
```

If you're feeling lazy and prefer to use prefixes to shorten IRIs, you can do so. But in these cases, you need to provide the prefixes so that the parser can handle them. In such cases, you must pass an object of type `PrefixedFormula` to the `toOpenMath` function. See this examples from the tests:
```ts
const input = 'x:a = y:b + 5';
const prefixes = new Map<string, string>();
prefixes.set('x', 'http://example.org/x#');
prefixes.set('y', 'http://example.org/y#');

const prefixedFormula: PrefixedFormula = {
	prefixes: prefixes, 
	formula: input
};
const result = await p.toOpenMath(prefixedFormula);
```



