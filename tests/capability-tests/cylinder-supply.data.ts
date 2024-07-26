export const supplyCapabilityData = `@prefix : <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix VDI2206: <http://www.w3id.org/hsu-aut/VDI2206#> .
@prefix VDI2860: <http://www.w3id.org/hsu-aut/VDI2860#> .
@prefix VDI3682: <http://www.w3id.org/hsu-aut/VDI3682#> .
@prefix DINEN61360: <http://www.w3id.org/hsu-aut/DINEN61360#> .
@prefix CSS: <http://www.w3id.org/hsu-aut/css#> .
@prefix CaSk: <http://www.w3id.org/hsu-aut/cask#> .
@prefix openmath: <http://openmath.org/vocab/math#> .
@base <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#> .

<http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule> rdf:type owl:Ontology ;
                                                                          owl:imports <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types> ,
                                                                                      <http://www.w3id.org/hsu-aut/caskman/4.6.0> .

#################################################################
#    Individuals
#################################################################

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RawCylinderSelector
:RawCylinderSelector rdf:type owl:NamedIndividual ,
							VDI2206:Module,
							CSS:Resource ;
					CSS:providesCapability :PrepareRawPart ;
					VDI3682:isAssignedTo :PrepareRawPart .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PrepareRawPart
:PrepareRawPart rdf:type owl:NamedIndividual ,
                         VDI2860:Abteilen ,
                         VDI3682:ProcessOperator ;
                VDI3682:hasInput :ProductStack1 ,
                                 :ProductStack2 ,
                                 :ProductStack3 ,
                                 :RequiredColor ,
                                 :RequiredInnerDiameter ,
                                 :RequiredLotSize ,
                                 :RequiredOuterDiameter ;
                VDI3682:hasOutput :PreparedRawPart .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPart
:PreparedRawPart rdf:type owl:NamedIndividual ,
                          VDI3682:Product ;
				DINEN61360:has_Data_Element :PreparedRawPartColor_DE ,
											:PreparedRawPartInnerDiameter_DE ,
											:PreparedRawPartLotSize_DE ,
											:PreparedRawPartOuterDiameter_DE ;
				VDI3682:isCharacterizedBy :PreparedRawPartColor_ID ,
											:PreparedRawPartInnerDiameter_ID ,
											:PreparedRawPartLotSize_ID ,
											:PreparedRawPartOuterDiameter_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartColor_DE
:PreparedRawPartColor_DE rdf:type owl:NamedIndividual ,
                                  DINEN61360:Data_Element ;
                         DINEN61360:has_Instance_Description :PreparedRawPartColor_ID ;
                         DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartColor_ID
:PreparedRawPartColor_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "PreparedRawPartColor_ID" ;
                         DINEN61360:Expression_Goal "Actual_Value" ;
                         DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartInnerDiameter_DE
:PreparedRawPartInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                          DINEN61360:Data_Element ;
                                 DINEN61360:has_Instance_Description :PreparedRawPartInnerDiameter_ID ;
                                 DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartInnerDiameter_ID
:PreparedRawPartInnerDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "PreparedRawPartInnerDiameter_ID" ;
                                 DINEN61360:Expression_Goal "Actual_Value" ;
                                 DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartLotSize_DE
:PreparedRawPartLotSize_DE rdf:type owl:NamedIndividual ,
                                    DINEN61360:Data_Element ;
                           DINEN61360:has_Instance_Description :PreparedRawPartLotSize_ID ;
                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartLotSize_ID
:PreparedRawPartLotSize_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "PreparedRawPartLotSize_ID" ;
                           DINEN61360:Expression_Goal "Actual_Value" ;
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartOuterDiameter_DE
:PreparedRawPartOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                          DINEN61360:Data_Element ;
                                 DINEN61360:has_Instance_Description :PreparedRawPartOuterDiameter_ID ;
                                 DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PreparedRawPartOuterDiameter_ID
:PreparedRawPartOuterDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "PreparedRawPartOuterDiameter_ID" ;
                                 DINEN61360:Expression_Goal "Actual_Value" ;
                                 DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1
:ProductStack1 rdf:type owl:NamedIndividual ,
                        VDI3682:Product ;
			DINEN61360:has_Data_Element :ProductStack1CurrentColor_DE ,
										:ProductStack1CurrentInnerDiameter_DE ,
										:ProductStack1CurrentOuterDiameter_DE ,
										:ProductStack1CurrentStackSize_DE ;
			VDI3682:isCharacterizedBy :ProductStack1CurrentColor_ID ,
										:ProductStack1CurrentInnerDiameter_ID ,
										:ProductStack1CurrentOuterDiameter_ID ,
										:ProductStack1CurrentStackSize_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentColor_DE
:ProductStack1CurrentColor_DE rdf:type owl:NamedIndividual ,
                                       DINEN61360:Data_Element ;
                              DINEN61360:has_Instance_Description :ProductStack1CurrentColor_ID ;
                              DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentColor_ID
:ProductStack1CurrentColor_ID rdf:type owl:NamedIndividual ,
                                       DINEN61360:Integer,
                                       DINEN61360:Instance_Description ,
                                  openmath:Variable ;
								  openmath:name "ProductStack1CurrentColor_ID" ;
                              DINEN61360:Expression_Goal "Actual_Value" ;
                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentInnerDiameter_DE
:ProductStack1CurrentInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack1CurrentInnerDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentInnerDiameter_ID
:ProductStack1CurrentInnerDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack1CurrentInnerDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentOuterDiameter_DE
:ProductStack1CurrentOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack1CurrentOuterDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentOuterDiameter_ID
:ProductStack1CurrentOuterDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack1CurrentOuterDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentStackSize_DE
:ProductStack1CurrentStackSize_DE rdf:type owl:NamedIndividual ,
                                           DINEN61360:Data_Element ;
                                  DINEN61360:has_Instance_Description :ProductStack1CurrentStackSize_ID ;
                                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack1CurrentStackSize_ID
:ProductStack1CurrentStackSize_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack1CurrentStackSize_ID" ;
                                  DINEN61360:Expression_Goal "Actual_Value" ;
                                  DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2
:ProductStack2 rdf:type owl:NamedIndividual ,
                        VDI3682:Product ;
			DINEN61360:has_Data_Element :ProductStack2CurrentColor_DE ,
										:ProductStack2CurrentInnerDiameter_DE ,
										:ProductStack2CurrentOuterDiameter_DE ,
										:ProductStack2CurrentStackSize_DE ;
			VDI3682:isCharacterizedBy :ProductStack2CurrentColor_ID ,
										:ProductStack2CurrentInnerDiameter_ID ,
										:ProductStack2CurrentOuterDiameter_ID ,
										:ProductStack2CurrentStackSize_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentColor_DE
:ProductStack2CurrentColor_DE rdf:type owl:NamedIndividual ,
                                       DINEN61360:Data_Element ;
                              DINEN61360:has_Instance_Description :ProductStack2CurrentColor_ID ;
                              DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentColor_ID
:ProductStack2CurrentColor_ID rdf:type owl:NamedIndividual ,
                                       DINEN61360:Integer,
                                       DINEN61360:Instance_Description ,
                                  openmath:Variable ;
								openmath:name "ProductStack2CurrentColor_ID" ;
                              DINEN61360:Expression_Goal "Actual_Value" ;
                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentInnerDiameter_DE
:ProductStack2CurrentInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack2CurrentInnerDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentInnerDiameter_ID
:ProductStack2CurrentInnerDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack2CurrentInnerDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentOuterDiameter_DE
:ProductStack2CurrentOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack2CurrentOuterDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentOuterDiameter_ID
:ProductStack2CurrentOuterDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack2CurrentOuterDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentStackSize_DE
:ProductStack2CurrentStackSize_DE rdf:type owl:NamedIndividual ,
                                           DINEN61360:Data_Element ;
                                  DINEN61360:has_Instance_Description :ProductStack2CurrentStackSize_ID ;
                                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack2CurrentStackSize_ID
:ProductStack2CurrentStackSize_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack2CurrentStackSize_ID" ;
                                  DINEN61360:Expression_Goal "Actual_Value" ;
                                  DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3
:ProductStack3 rdf:type owl:NamedIndividual ,
                        VDI3682:Product ;
			DINEN61360:has_Data_Element :ProductStack3CurrentColor_DE ,
										:ProductStack3CurrentInnerDiameter_DE ,
										:ProductStack3CurrentOuterDiameter_DE ,
										:ProductStack3CurrentStackSize_DE ;
			VDI3682:isCharacterizedBy :ProductStack3CurrentColor_ID ,
										:ProductStack3CurrentInnerDiameter_ID ,
										:ProductStack3CurrentOuterDiameter_ID ,
										:ProductStack3CurrentStackSize_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentColor_DE
:ProductStack3CurrentColor_DE rdf:type owl:NamedIndividual ,
                                       DINEN61360:Data_Element ;
                              DINEN61360:has_Instance_Description :ProductStack3CurrentColor_ID ;
                              DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentColor_ID
:ProductStack3CurrentColor_ID rdf:type owl:NamedIndividual ,
                                       DINEN61360:Integer,
                                       DINEN61360:Instance_Description ,
                                  openmath:Variable ;
								openmath:name "ProductStack3CurrentColor_ID" ;
                              DINEN61360:Expression_Goal "Actual_Value" ;
                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentInnerDiameter_DE
:ProductStack3CurrentInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack3CurrentInnerDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentInnerDiameter_ID
:ProductStack3CurrentInnerDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack3CurrentInnerDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentOuterDiameter_DE
:ProductStack3CurrentOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                               DINEN61360:Data_Element ;
                                      DINEN61360:has_Instance_Description :ProductStack3CurrentInnerDiameter_ID ;
                                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentOuterDiameter_ID
:ProductStack3CurrentOuterDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack3CurrentOuterDiameter_ID" ;
                                      DINEN61360:Expression_Goal "Actual_Value" ;
                                      DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentStackSize_DE
:ProductStack3CurrentStackSize_DE rdf:type owl:NamedIndividual ,
                                           DINEN61360:Data_Element ;
                                  DINEN61360:has_Instance_Description :ProductStack3CurrentStackSize_ID ;
                                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#ProductStack3CurrentStackSize_ID
:ProductStack3CurrentStackSize_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "ProductStack3CurrentStackSize_ID" ;
                                  DINEN61360:Expression_Goal "Actual_Value" ;
                                  DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RawCylinderSlide
:RawCylinderSlide rdf:type owl:NamedIndividual ,
							VDI2206:Module,
							CSS:Resource ;
					CSS:providesCapability :PutOnCarrier ;
					VDI3682:isAssignedTo :PutOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#PutOnCarrier
:PutOnCarrier rdf:type owl:NamedIndividual ,
                       VDI2860:Fuehren ,
                       VDI3682:ProcessOperator;
              VDI3682:hasInput :PreparedRawPart ,
                               :RequiredCarrierId ,
                               :RequiredCarrierSlot ;
              VDI3682:hasOutput :RawCylinder .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinder
:RawCylinder rdf:type owl:NamedIndividual ,
                      VDI3682:Product ;
			DINEN61360:has_Data_Element :RawCylinderCarrierId_DE ,
										:RawCylinderCarrierSlot_DE ,
										:RawCylinderColor_DE ,
										:RawCylinderInnerDiameter_DE ,
										:RawCylinderLotSize_DE ,
										:RawCylinderOuterDiameter_DE ;
			VDI3682:isCharacterizedBy :RawCylinderCarrierId_ID ,
										:RawCylinderCarrierSlot_ID ,
										:RawCylinderColor_ID ,
										:RawCylinderInnerDiameter_ID ,
										:RawCylinderLotSize_ID ,
										:RawCylinderOuterDiameter_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderCarrierId_DE
:RawCylinderCarrierId_DE rdf:type owl:NamedIndividual ,
                                  DINEN61360:Data_Element ;
                         DINEN61360:has_Instance_Description :RawCylinderCarrierId_ID ;
                         DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderCarrierId_ID
:RawCylinderCarrierId_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderCarrierId_ID" ;
                         DINEN61360:Expression_Goal "Assurance" ;
                         DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderCarrierSlot_DE
:RawCylinderCarrierSlot_DE rdf:type owl:NamedIndividual ,
                                    DINEN61360:Data_Element ;
                           DINEN61360:has_Instance_Description :RawCylinderCarrierSlot_ID ;
                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierSlot_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderCarrierSlot_ID
:RawCylinderCarrierSlot_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderCarrierSlot_ID" ;
                           DINEN61360:Expression_Goal "Assurance" ;
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderColor_DE
:RawCylinderColor_DE rdf:type owl:NamedIndividual ,
                              DINEN61360:Data_Element ;
                     DINEN61360:has_Instance_Description :RawCylinderColor_ID ;
                     DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderColor_ID
:RawCylinderColor_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderColor_ID" ;
                     DINEN61360:Expression_Goal "Actual_Value" ;
                     DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderInnerDiameter_DE
:RawCylinderInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                      DINEN61360:Data_Element ;
                             DINEN61360:has_Instance_Description :RawCylinderInnerDiameter_ID ;
                             DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderInnerDiameter_ID
:RawCylinderInnerDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderInnerDiameter_ID" ;
                             DINEN61360:Expression_Goal "Assurance" ;
                             DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderLotSize_DE
:RawCylinderLotSize_DE rdf:type owl:NamedIndividual ,
                                DINEN61360:Data_Element ;
                       DINEN61360:has_Instance_Description :RawCylinderLotSize_ID ;
                       DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderLotSize_ID
:RawCylinderLotSize_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderLotSize_ID" ;
                       DINEN61360:Expression_Goal "Actual_Value" ;
                       DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderOuterDiameter_DE
:RawCylinderOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                      DINEN61360:Data_Element ;
                             DINEN61360:has_Instance_Description :RawCylinderOuterDiameter_ID ;
                             DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderOuterDiameter_ID
:RawCylinderOuterDiameter_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RawCylinderOuterDiameter_ID" ;
                             DINEN61360:Expression_Goal "=" ;
                             DINEN61360:Logic_Interpretation "Assurance" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderSelector
:RawCylinderSelector rdf:type owl:NamedIndividual ,
                              VDI2206:Module ;
                     VDI3682:isAssignedTo :PrepareRawPart .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderSlide
:RawCylinderSlide rdf:type owl:NamedIndividual ,
                           VDI2206:Module ;
                  VDI3682:isAssignedTo :PutOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RawCylinderSupplyUnit
:RawCylinderSupplyUnit rdf:type owl:NamedIndividual ,
                                VDI2206:System ;
                       VDI2206:SystemConsistsOfModule :RawCylinderSelector ,
                                                      :RawCylinderSlide ;
                       VDI3682:isAssignedTo :SupplyRawCylinder .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierId
:RequiredCarrierId rdf:type owl:NamedIndividual ,
                            VDI2206:Information ;
				DINEN61360:has_Data_Element :RequiredCarrierId_DE ;
				VDI3682:isCharacterizedBy :RequiredCarrierId_ID1 ,
										:RequiredCarrierId_ID2 ,
										:RequiredCarrierId_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierId_DE
:RequiredCarrierId_DE rdf:type owl:NamedIndividual ,
                               DINEN61360:Data_Element ;
                      DINEN61360:has_Instance_Description :RequiredCarrierId_ID1 ,
                                                          :RequiredCarrierId_ID2 ,
														  :RequiredCarrierId_ID3 ;
                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierId_ID1
:RequiredCarrierId_ID1 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierId_ID1" ;
                       DINEN61360:Expression_Goal "Requirement" ;
                       DINEN61360:Logic_Interpretation ">=" ;
                       DINEN61360:Value 1 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierId_ID2
:RequiredCarrierId_ID2 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierId_ID2" ;
                       DINEN61360:Expression_Goal "Requirement" ;
                       DINEN61360:Logic_Interpretation "<=" ;
                       DINEN61360:Value 8 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierId_ID3
:RequiredCarrierId_ID3 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierId_ID3" ;
                       DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierSlot
:RequiredCarrierSlot rdf:type owl:NamedIndividual ,
                              VDI2206:Information ;
					DINEN61360:has_Data_Element :RequiredCarrierSlot_DE ;
					VDI3682:isCharacterizedBy :RequiredCarrierSlot_ID1 ,
											:RequiredCarrierSlot_ID2 ,
											:RequiredCarrierSlot_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierSlot_DE
:RequiredCarrierSlot_DE rdf:type owl:NamedIndividual ,
                                 DINEN61360:Data_Element ;
                        DINEN61360:has_Instance_Description :RequiredCarrierSlot_ID1 ,
                                                            :RequiredCarrierSlot_ID2 ,
															:RequiredCarrierSlot_ID3 ;
                        DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierSlot_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierSlot_ID1
:RequiredCarrierSlot_ID1 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierSlot_ID1" ;
                         DINEN61360:Expression_Goal "Requirement" ;
                         DINEN61360:Logic_Interpretation ">=" ;
                         DINEN61360:Value 1 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierSlot_ID2
:RequiredCarrierSlot_ID2 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierSlot_ID2" ;
                         DINEN61360:Expression_Goal "<=" ;
                         DINEN61360:Logic_Interpretation "Requirement" ;
                         DINEN61360:Value 4 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredCarrierSlot_ID3
:RequiredCarrierSlot_ID3 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredCarrierSlot_ID3" ;
                         DINEN61360:Expression_Goal "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredColor
:RequiredColor rdf:type owl:NamedIndividual ,
                        VDI3682:Information ;
			DINEN61360:has_Data_Element :RequiredColor_DE ;
			VDI3682:isCharacterizedBy :RequiredColor_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredColor_DE
:RequiredColor_DE rdf:type owl:NamedIndividual ,
                           DINEN61360:Data_Element ;
                  DINEN61360:has_Instance_Description :RequiredColor_ID ;
                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredColor_ID
:RequiredColor_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredColor_ID" ;
                  DINEN61360:Logic_Interpretation "=" ;
                  DINEN61360:Value "" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredInnerDiameter
:RequiredInnerDiameter rdf:type owl:NamedIndividual ,
                                VDI3682:Information ;
					DINEN61360:has_Data_Element :RequiredInnerDiameter_DE ;
					VDI3682:isCharacterizedBy :RequiredInnerDiameter_ID1 ,
											:RequiredInnerDiameter_ID2 ,
											:RequiredInnerDiameter_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredInnerDiameter_DE
:RequiredInnerDiameter_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :RequiredInnerDiameter_ID1 ,
                                                              :RequiredInnerDiameter_ID2 ,
															  :RequiredInnerDiameter_ID3 ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredInnerDiameter_ID1
:RequiredInnerDiameter_ID1 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredInnerDiameter_ID1" ;
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation ">=" ;
                           DINEN61360:Value 45 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredInnerDiameter_ID2
:RequiredInnerDiameter_ID2 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredInnerDiameter_ID2" ;
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation "<=" ;
                           DINEN61360:Value 55 .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredInnerDiameter_ID3
:RequiredInnerDiameter_ID3 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredInnerDiameter_ID3" ;
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredLotSize
:RequiredLotSize rdf:type owl:NamedIndividual ,
						VDI3682:Information ;
				DINEN61360:has_Data_Element :RequiredLotSize_DE ;
				VDI3682:isCharacterizedBy :RequiredLotSize_ID1 ,
										:RequiredLotSize_ID2 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredLotSize_DE
:RequiredLotSize_DE rdf:type owl:NamedIndividual ,
                             DINEN61360:Data_Element ;
                    DINEN61360:has_Instance_Description :RequiredLotSize_ID1 ,
														:RequiredLotSize_ID2 ;
                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredLotSize_ID1
:RequiredLotSize_ID1 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredLotSize_ID1" ;
                    DINEN61360:Expression_Goal "Requirement" ;
                    DINEN61360:Logic_Interpretation "<=" ;
                    DINEN61360:Value 4 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredLotSize_ID2
:RequiredLotSize_ID2 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredLotSize_ID2" ;
                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredOuterDiameter
:RequiredOuterDiameter rdf:type owl:NamedIndividual ,
                                VDI3682:Information ;
					DINEN61360:has_Data_Element :RequiredOuterDiameter_DE ;
					VDI3682:isCharacterizedBy :RequiredOuterDiameter_ID1 ,
											:RequiredOuterDiameter_ID2 ,
											:RequiredOuterDiameter_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredOuterDiameter_DE
:RequiredOuterDiameter_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :RequiredOuterDiameter_ID1 ,
                                                              :RequiredOuterDiameter_ID2 ,
															  :RequiredOuterDiameter_ID3 ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredOuterDiameter_ID1
:RequiredOuterDiameter_ID1 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredOuterDiameter_ID1" ;
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation ">=" ;
                           DINEN61360:Value 50 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredOuterDiameter_ID2
:RequiredOuterDiameter_ID2 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredOuterDiameter_ID2" ;
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation "<=" ;
                           DINEN61360:Value 60 .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#RequiredOuterDiameter_ID3
:RequiredOuterDiameter_ID3 rdf:type owl:NamedIndividual ,
                                  DINEN61360:Integer,
                                  DINEN61360:Instance_Description ,
                                  openmath:Variable ;
                openmath:name "RequiredOuterDiameter_ID3" ;
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RawCylinderSupplyModule
:RawCylinderSupplyModule rdf:type owl:NamedIndividual ,
							VDI2206:Module,
							CSS:Resource ;
					CSS:providesCapability :SupplyRawCylinder ;
					VDI3682:isAssignedTo :SupplyRawCylinder .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#SupplyRawCylinder
:SupplyRawCylinder rdf:type owl:NamedIndividual ,
                            VDI2860:Zuteilen ,
							VDI3682:ProcessOperator ,
                            CaSk:ProvidedCapability ;
					VDI3682:requiresCapability :SupplyRawCylinder ;
					CSS:isRestrictedBy :ColorConstraint ,
						:ColorStackConstraint ,
						:LotSizeConstraint ,
						:LotSizeConstraint ,
						:LotSizeStackConstraint ,
						:CarrierIdConstraint ,
						:CarrierSlotConstraint ,
						:OuterDiameterConstraint ,
						:OuterDiameterStackConstraint ,
						:InnerDiameterConstraint ,
						:InnerDiameterStackConstraint ;
					VDI3682:hasInput :ProductStack1 ,
                                    :ProductStack2 ,
                                    :ProductStack3 ,
                                    :RequiredCarrierId ,
                                    :RequiredCarrierSlot ,
                                    :RequiredColor ,
                                    :RequiredLotSize ,
                                    :RequiredOuterDiameter ;
					VDI3682:hasOutput :RawCylinder ;
					VDI3682:isComposedOf :PrepareRawPart ,
                                        :PutOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#SupplyRawCylinderProcess
:SupplyRawCylinderProcess rdf:type owl:NamedIndividual ,
                                   VDI3682:Process ;
                          VDI3682:consistsOf :ProductStack1 ,
                                             :ProductStack2 ,
                                             :ProductStack3 ,
                                             :RawCylinder ,
                                             :RequiredCarrierId ,
                                             :RequiredCarrierSlot ,
                                             :RequiredColor ,
                                             :RequiredLotSize ,
                                             :RequiredOuterDiameter ,
                                             :SupplyRawCylinder ,
                                             :SupplyRawCylinderSystemLimit .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/RawCylinderSupplyModule#SupplyRawCylinderSystemLimit
:SupplyRawCylinderSystemLimit rdf:type owl:NamedIndividual ,
                                       VDI3682:SystemLimit .


#################################################################
#    Constraints
#################################################################
###  Color parameter will determine the output product color
:ColorConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:RequiredColor_ID :RawCylinderColor_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :RequiredColor_ID ,
                                                      :RawCylinderColor_ID .


###  Color must be equal to color in stack
:ColorStackConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
										openmath:arguments (
											[ 	
												a openmath:Application;
												openmath:arguments (
													:ProductStack1CurrentColor_ID :RawCylinderColor_ID
												);
												openmath:operator <http://www.openmath.org/cd/relation1#eq>
											]
											[ 	
												a openmath:Application;
												openmath:arguments (
													:ProductStack2CurrentColor_ID :RawCylinderColor_ID
												);
												openmath:operator <http://www.openmath.org/cd/relation1#eq>
											]
											[ 	
												a openmath:Application;
												openmath:arguments (
													:ProductStack3CurrentColor_ID :RawCylinderColor_ID
												);
												openmath:operator <http://www.openmath.org/cd/relation1#eq>
											]
										);
										openmath:operator <http://www.openmath.org/cd/logic1#or> ;
										CSS:references :ProductStack1CurrentColor_ID,
														:ProductStack2CurrentColor_ID,
														:ProductStack3CurrentColor_ID,
														:RawCylinderColor_ID .
													
### Lot size parameter will determine the output lot size
:LotSizeConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:RequiredLotSize_ID2 :RawCylinderLotSize_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :RequiredLotSize_ID2 ,
                                                      :RawCylinderLotSize_ID.


###  Lot size must be less than or equal to number of parts in stack with the same color
:LotSizeStackConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack1CurrentStackSize_ID
															:RequiredLotSize_ID2
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack1CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack2CurrentStackSize_ID
															:RequiredLotSize_ID2
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack2CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack3CurrentStackSize_ID
															:RequiredLotSize_ID2
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack3CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
										);
										openmath:operator <http://www.openmath.org/cd/logic1#or> ;
										CSS:references :ProductStack1CurrentColor_ID,
														:ProductStack2CurrentColor_ID,
														:ProductStack3CurrentColor_ID,
														:ProductStack1CurrentStackSize_ID,
														:ProductStack2CurrentStackSize_ID,
														:ProductStack3CurrentStackSize_ID,
														:RequiredColor_ID,
														:RequiredLotSize_ID2.


###  Chosen carrier ID (information) will determine the output carrier ID
:CarrierIdConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
										openmath:arguments (:RequiredCarrierId_ID3 :RawCylinderCarrierId_ID);
										openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
										CSS:references :RequiredCarrierId_ID3 ,
														:RawCylinderCarrierId_ID.

###  Chosen carrier slot (information) will determine the output carrier slot
:CarrierSlotConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
										openmath:arguments (:RequiredCarrierSlot_ID3 :RawCylinderCarrierSlot_ID);
										openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
										CSS:references :RequiredCarrierSlot_ID3 ,
														:RawCylinderCarrierSlot_ID.


###  Chosen outer diamter will determine the output product outer diameter
:OuterDiameterConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
										openmath:arguments (:RequiredOuterDiameter_ID3 :RawCylinderOuterDiameter_ID);
										openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
										CSS:references :RequiredOuterDiameter_ID3 ,
														:RawCylinderOuterDiameter_ID.


###  Outer diamter of part must be equal to outer diameter of parts in stack with the same color
:OuterDiameterStackConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       	openmath:arguments (
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack1CurrentOuterDiameter_ID
															:RequiredOuterDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack1CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack2CurrentOuterDiameter_ID
															:RequiredOuterDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack2CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack1CurrentOuterDiameter_ID
															:RequiredOuterDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack3CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
										);
										openmath:operator <http://www.openmath.org/cd/logic1#or> ;
										CSS:references :ProductStack1CurrentColor_ID,
														:ProductStack2CurrentColor_ID,
														:ProductStack3CurrentColor_ID,
														:ProductStack1CurrentOuterDiameter_ID,
														:ProductStack2CurrentOuterDiameter_ID,
														:ProductStack3CurrentOuterDiameter_ID,
														:RequiredColor_ID,
														:RequiredOuterDiameter_ID3.

###  Chosen inner diameter will determine the output product inner diameter
:InnerDiameterConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
										openmath:arguments (:RequiredInnerDiameter_ID3 :RawCylinderInnerDiameter_ID);
										openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
										CSS:references :RequiredInnerDiameter_ID3 ,
														:RawCylinderInnerDiameter_ID.


###  Inner diameter of part must be equal to inner diameter of parts in stack with the same color
:InnerDiameterStackConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack1CurrentInnerDiameter_ID
															:RequiredInnerDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack1CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack2CurrentInnerDiameter_ID
															:RequiredInnerDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack2CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
											[ 	
												a openmath:Application;
												openmath:operator <http://www.openmath.org/cd/logic1#and>;
												openmath:arguments (
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#geq>;
														openmath:arguments (
															:ProductStack3CurrentInnerDiameter_ID
															:RequiredInnerDiameter_ID3
														)
													]
													[
														a openmath:Application;
														openmath:operator <http://www.openmath.org/cd/relation1#eq>;
														openmath:arguments (
															:ProductStack3CurrentColor_ID
															:RequiredColor_ID
														)
													]
												)
											]
										);
										openmath:operator <http://www.openmath.org/cd/logic1#or> ;
										CSS:references :ProductStack1CurrentColor_ID,
														:ProductStack2CurrentColor_ID,
														:ProductStack3CurrentColor_ID,
														:ProductStack1CurrentInnerDiameter_ID,
														:ProductStack2CurrentInnerDiameter_ID,
														:ProductStack3CurrentInnerDiameter_ID,
														:RequiredColor_ID,
														:RequiredInnerDiameter_ID3.

`; 