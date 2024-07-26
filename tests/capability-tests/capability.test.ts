/* eslint-disable max-len */ 
import { FormulaResult } from "../../src/FormulaResult";
import { OmRdfParser } from "../../src/OmRdfParser";
import { supplyCapabilityData } from "./cylinder-supply.data";
import { drillingData } from "./drilling-capability.data";

export const capabilityRdfData = `
@prefix : <http://www.hsu-hh.de/aut/ontologies/llm-capability-generation#> .
@prefix CSS: <http://www.w3id.org/hsu-aut/css#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix VDI3682: <http://www.w3id.org/hsu-aut/VDI3682#> .
@prefix openmath: <http://openmath.org/vocab/math#> .
@prefix Transport: <http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#> .
@prefix DINEN61360: <http://www.hsu-ifa.de/ontologies/DINEN61360#> .
@base <http://www.hsu-hh.de/aut/ontologies/llm-capability-generation#> .

<http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport> rdf:type owl:Ontology ;
                                                                           owl:imports <http://www.w3id.org/hsu-aut/cask/2.5.3> .

#################################################################
#    Individuals
#################################################################

###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV
Transport:AGV rdf:type owl:NamedIndividual ,
                       CSS:Resource ;
              DINEN61360:has_Data_Element Transport:AGV_Pos_DE ;
              CSS:providesCapability Transport:Transport .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_DE
Transport:AGV_Pos_DE rdf:type owl:NamedIndividual ,
                              DINEN61360:Data_Element ;
                     DINEN61360:has_Instance_Description Transport:AGV_Pos_ID ;
                     DINEN61360:has_Type_Description Transport:PositionType .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_ID
Transport:AGV_Pos_ID rdf:type owl:NamedIndividual ,
                              openmath:Variable ,
                              DINEN61360:Instance_Description ,
                              DINEN61360:Real ;
                     openmath:name "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_ID" ;
                     DINEN61360:Expression_Goal "Actual_Value" ;
                     DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#PositionType
Transport:PositionType rdf:type owl:NamedIndividual ,
                                DINEN61360:Type_Description ;
                       DINEN61360:Definition "This type specifies the position of any object in coordinates consisting of longitude and latitude." ;
                       DINEN61360:Unit_of_Measure "decimal degrees" .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport
Transport:Transport rdf:type owl:NamedIndividual ,
                             VDI3682:ProcessOperator ,
                             CSS:Capability ;
                    VDI3682:hasInput Transport:Transport_In_Destination ,
                                     Transport:Transport_In_Product ;
                    VDI3682:hasOutput Transport:Transport_Out_Product ;
                    CSS:isRestrictedBy Transport:Transport_Constraint_Pos_Out ,
                                       Transport:Transport_Constraint_Pos_Req ;
                    CSS:requiresCapability Transport:Transport .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Out
Transport:Transport_Constraint_Pos_Out rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (Transport:Transport_In_Destination_ID Transport:Transport_Out_Product_Pos_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references Transport:Transport_In_Destination_ID ,
                                                      Transport:Transport_Out_Product_Pos_ID .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Req
Transport:Transport_Constraint_Pos_Req rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (Transport:AGV_Pos_ID Transport:Transport_In_Product_Pos_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references Transport:AGV_Pos_ID ,
                                                      Transport:Transport_In_Product_Pos_ID .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination
Transport:Transport_In_Destination rdf:type owl:NamedIndividual ,
                                            VDI3682:Information ;
                                   DINEN61360:has_Data_Element Transport:Transport_In_Destination_DE .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_DE
Transport:Transport_In_Destination_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description Transport:Transport_In_Destination_ID ;
                                      DINEN61360:has_Type_Description Transport:PositionType .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_ID
Transport:Transport_In_Destination_ID rdf:type owl:NamedIndividual ,
                                               openmath:Variable ,
                                               DINEN61360:Instance_Description ,
                                               DINEN61360:Real ;
                                      openmath:name "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_ID" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product
Transport:Transport_In_Product rdf:type owl:NamedIndividual ,
                                        VDI3682:Product ;
                               DINEN61360:has_Data_Element Transport:Transport_In_Product_Pos_DE .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_DE
Transport:Transport_In_Product_Pos_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description Transport:Transport_In_Product_Pos_ID ;
                                      DINEN61360:has_Type_Description Transport:PositionType .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_ID
Transport:Transport_In_Product_Pos_ID rdf:type owl:NamedIndividual ,
                                               openmath:Variable ,
                                               DINEN61360:Instance_Description ,
                                               DINEN61360:Real ;
                                      openmath:name "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product
Transport:Transport_Out_Product rdf:type owl:NamedIndividual ,
                                         VDI3682:Product ;
                                DINEN61360:has_Data_Element Transport:Transport_Out_Product_Pos_DE .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_DE
Transport:Transport_Out_Product_Pos_DE rdf:type owl:NamedIndividual ,
                                                DINEN61360:Data_Element ;
                                       DINEN61360:has_Instance_Description Transport:Transport_Out_Product_Pos_ID ;
                                       DINEN61360:has_Type_Description Transport:PositionType .


###  http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_ID
Transport:Transport_Out_Product_Pos_ID rdf:type owl:NamedIndividual ,
                                                openmath:Variable ,
                                                DINEN61360:Instance_Description ,
                                                DINEN61360:Real ;
                                       openmath:name "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_ID" ;
                                       DINEN61360:Expression_Goal "Assurance" ;
                                       DINEN61360:Logic_Interpretation "=" .

`;

const p = new OmRdfParser();

describe('Testing conversion of capability constraints', () => {
	test('Should convert a simple constraint', async () => {
		const result = await p.allFromOpenMath(capabilityRdfData);
		const firstResultEntry = new FormulaResult({
			context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
			formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_ID = http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_ID", 
		},
		"http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Out"
		);
		const secondResultEntry = new FormulaResult(
			{
				context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
				formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_ID = http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_ID", 
			},
			"http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Req"
		);
		const expectedResult = [firstResultEntry, secondResultEntry];
		expect(result).toStrictEqual(expectedResult);
	});

	test('Should convert drilling constraints', async () => {
		const result = await p.allFromOpenMath(drillingData);
		// const firstResultEntry = new FormulaResult({
		// 	context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
		// 	formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_ID=http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_ID", 
		// },
		// "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Out"
		// );
		// const secondResultEntry = new FormulaResult(
		// 	{
		// 		context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
		// 		formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_ID=http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_ID", 
		// 	},
		// 	"http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Req"
		// );
		// const expectedResult = [firstResultEntry, secondResultEntry];
		expect(result.length).toBe(7);
	});

	test('Should convert constraints of cylinder-supply capability', async () => {
		const result = await p.allFromOpenMath(supplyCapabilityData);
		// const firstResultEntry = new FormulaResult({
		// 	context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
		// 	formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Destination_ID=http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Out_Product_Pos_ID", 
		// },
		// "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Out"
		// );
		// const secondResultEntry = new FormulaResult(
		// 	{
		// 		context: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport", 
		// 		formula: "http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#AGV_Pos_ID=http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_In_Product_Pos_ID", 
		// 	},
		// 	"http://www.hsu-hh.de/aut/ontologies/llm-capability-generation/transport#Transport_Constraint_Pos_Req"
		// );
		// const expectedResult = [firstResultEntry, secondResultEntry];
		expect(result.length).toBe(40);
	});
});