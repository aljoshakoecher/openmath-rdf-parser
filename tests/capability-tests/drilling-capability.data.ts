export const drillingData = `
@prefix : <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix VDI3682: <http://www.w3id.org/hsu-aut/VDI3682#> .
@prefix VDI2206: <http://www.w3id.org/hsu-aut/VDI2206#> .
@prefix DINEN61360: <http://www.w3id.org/hsu-aut/DINEN61360#> .
@prefix CSS: <http://www.w3id.org/hsu-aut/css#> .
@prefix CaSk: <http://www.w3id.org/hsu-aut/cask#> .
@prefix openmath: <http://openmath.org/vocab/math#> .
@base <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#> .

<http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule> rdf:type owl:Ontology ;
                                                                 owl:imports <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types> ,
                                                                             <http://www.w3id.org/hsu-aut/caskman/4.6.0> .


#################################################################
#    Individuals
#################################################################

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckAndDrilling
:CheckAndDrilling rdf:type owl:NamedIndividual ,
                           VDI3682:ProcessOperator ;
                  VDI3682:hasInput :ProductAtDrilling ,
                                   :RequiredDrillingDepth ,
                                   :RequiredDrillingDiameter ;
                  VDI3682:hasOutput :DrilledProduct ;
                  VDI3682:isComposedOf :CheckDepth ,
                                       :Drilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckAndDrillingUnit
:CheckAndDrillingUnit rdf:type owl:NamedIndividual ,
							VDI2206:Module,
                            VDI3682:TechnicalResource ,
							CSS:Resource ;
					CSS:providesCapability :CheckAndDrilling ;
					VDI3682:isAssignedTo :CheckAndDrilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckAndDrilling_Process
:CheckAndDrilling_Process rdf:type owl:NamedIndividual ,
                                   VDI3682:Process ;
                          VDI3682:consistsOf :CheckAndDrilling_SL ,
                                             :CheckDepth ,
                                             :Drilling ;
                          VDI3682:hasInput :ProductAtDrilling ,
                                           :RequiredDrillingDepth ,
                                           :RequiredDrillingDiameter ;
                          VDI3682:hasOutput :DrilledProduct .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckAndDrilling_SL
:CheckAndDrilling_SL rdf:type owl:NamedIndividual ,
                              VDI3682:SystemLimit .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckDepth
:CheckDepth rdf:type owl:NamedIndividual ,
                     VDI3682:ProcessOperator ;
            VDI3682:hasInput :ProductAtDrilling ;
            VDI3682:hasOutput :ProductAtDrillingChecked .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CheckDepthModule
:CheckDepthModule rdf:type owl:NamedIndividual ,
							VDI2206:Module,
							VDI3682:TechnicalResource ,
							CSS:Resource ;
					CSS:providesCapability :CheckDepth ;
					VDI3682:isAssignedTo :CheckDepth .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrilling
:CompleteDrilling rdf:type owl:NamedIndividual ,
							CaSk:ProvidedCapability ,
                           	VDI3682:ProcessOperator ;
				CSS:requiresCapability :CompleteDrilling ;
				CSS:isRestrictedBy :CompleteDrilling_ColorConstraint ,
								:CompleteDrilling_LotSizeConstraint ,
								:CompleteDrilling_InnerDiameterConstraint ,
								:CompleteDrilling_OuterDiameterConstraint ,
								:CompleteDrilling_DrillingDepthConstraint ,
								:CompleteDrilling_DrillingDiameterConstraint ,
								:CompleteDrilling_CarrierIdConstraint ;
				VDI3682:hasInput :InputProduct ,
                                   :RequiredCarrierID ,
                                   :RequiredCarrierSlot ,
                                   :RequiredDrillingDepth ,
                                   :RequiredDrillingDiameter ;
                  VDI3682:hasOutput :DrilledProductOnCarrier ;
                  VDI3682:isComposedOf :CheckAndDrilling ,
                                       :MoveToDrilling ,
                                       :PutOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrillingUnit
:CompleteDrillingUnit rdf:type owl:NamedIndividual ,
							VDI3682:TechnicalResource ,
							CSS:Resource ;
					CSS:providesCapability :CompleteDrilling ;
					VDI3682:isAssignedTo :CompleteDrilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrilling_Process
:CompleteDrilling_Process rdf:type owl:NamedIndividual ,
                                   VDI3682:Process ;
                          VDI3682:consistsOf :CompleteDrilling ,
                                             :CompleteDrilling_SL ;
                          VDI3682:hasInput :InputProduct ,
                                           :RequiredCarrierID ,
                                           :RequiredCarrierSlot ,
                                           :RequiredDrillingDepth ,
                                           :RequiredDrillingDiameter ;
                          VDI3682:hasOutput :DrilledProductOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrilling_SL
:CompleteDrilling_SL rdf:type owl:NamedIndividual ,
                              VDI3682:SystemLimit .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrilling_SubProcess
:CompleteDrilling_SubProcess rdf:type owl:NamedIndividual ,
                                      VDI3682:Process ;
                             VDI3682:consistsOf :CheckAndDrilling ,
                                                :CompleteDrilling_SubProcess_SL ,
                                                :MoveToDrilling ,
                                                :PutOnCarrier ;
                             VDI3682:hasInput :InputProduct ,
                                              :RequiredCarrierID ,
                                              :RequiredCarrierSlot ,
                                              :RequiredDrillingDepth ,
                                              :RequiredDrillingDiameter ;
                             VDI3682:hasOutput :DrilledProductOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#CompleteDrilling_SubProcess_SL
:CompleteDrilling_SubProcess_SL rdf:type owl:NamedIndividual ,
                                         VDI3682:SystemLimit .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct
:DrilledProduct rdf:type owl:NamedIndividual ,
                         VDI3682:Product ;
                DINEN61360:has_Data_Element :DrilledProduct_Color_DE ,
                                            :DrilledProduct_DrillingDepth_DE ,
                                            :DrilledProduct_DrillingDiameter_DE ,
                                            :DrilledProduct_InnerDiameter_DE ,
                                            :DrilledProduct_LotSize_DE ,
                                            :DrilledProduct_OuterDiameter_DE ,
											:DrilledProduct_StationID_DE ;
				VDI3682:isCharacterizedBy :DrilledProduct_Color_ID ,
											:DrilledProduct_DrillingDepth_ID ,
											:DrilledProduct_DrillingDiameter_ID ,
											:DrilledProduct_InnerDiameter_ID ,
											:DrilledProduct_LotSize_ID ,
											:DrilledProduct_OuterDiameter_ID ,
											:DrilledProduct_StationID_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier
:DrilledProductOnCarrier rdf:type owl:NamedIndividual ,
                                  VDI3682:Product ;
                         DINEN61360:has_Data_Element :DrilledProductOnCarrier_Color_DE ,
                                                     :DrilledProductOnCarrier_DrillingDepth_DE ,
                                                     :DrilledProductOnCarrier_DrillingDiameter_DE ,
                                                     :DrilledProductOnCarrier_InnerDiameter_DE ,
                                                     :DrilledProductOnCarrier_LotSize_DE ,
													 :DrilledProductOnCarrier_CarrierID_DE ,
                                                     :DrilledProductOnCarrier_OuterDiameter_DE ,
													 :DrilledProductOnCarrier_StationID_DE ;
						VDI3682:isCharacterizedBy :DrilledProductOnCarrier_Color_ID ,
											:DrilledProductOnCarrier_DrillingDepth_ID ,
											:DrilledProductOnCarrier_DrillingDiameter_ID ,
											:DrilledProductOnCarrier_InnerDiameter_ID ,
											:DrilledProductOnCarrier_LotSize_ID ,
											:DrilledProductOnCarrier_CarrierID_ID ,
											:DrilledProductOnCarrier_OuterDiameter_ID ,
											:DrilledProductOnCarrier_StationID_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_Color_DE
:DrilledProductOnCarrier_Color_DE rdf:type owl:NamedIndividual ,
                                           DINEN61360:Data_Element ;
                                  DINEN61360:has_Instance_Description :DrilledProductOnCarrier_Color_ID ;
                                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_Color_ID
:DrilledProductOnCarrier_Color_ID rdf:type owl:NamedIndividual ,
										DINEN61360:Instance_Description ,
										openmath:Variable ,
										DINEN61360:Integer ;
									openmath:name "DrilledProductOnCarrier_Color_ID";
                                  DINEN61360:Expression_Goal "Assurance" ;
                                  DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_DrillingDepth_DE
:DrilledProductOnCarrier_DrillingDepth_DE rdf:type owl:NamedIndividual ,
                                                   DINEN61360:Data_Element ;
                                          DINEN61360:has_Instance_Description :DrilledProductOnCarrier_DrillingDepth_ID ;
                                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Depth_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_DrillingDepth_ID
:DrilledProductOnCarrier_DrillingDepth_ID rdf:type owl:NamedIndividual ,
										DINEN61360:Instance_Description ,
										openmath:Variable ,
										DINEN61360:Integer ;
										openmath:name "DrilledProductOnCarrier_DrillingDepth_ID";
                                          DINEN61360:Expression_Goal "Assurance" ;
                                          DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_DrillingDiameter_DE
:DrilledProductOnCarrier_DrillingDiameter_DE rdf:type owl:NamedIndividual ,
                                                      DINEN61360:Data_Element ;
                                             DINEN61360:has_Instance_Description :DrilledProductOnCarrier_DrillingDiameter_ID ;
                                             DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_DrillingDiameter_ID
:DrilledProductOnCarrier_DrillingDiameter_ID rdf:type owl:NamedIndividual ,
                                                      DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
								openmath:name "DrilledProductOnCarrier_DrillingDiameter_ID";
                                             DINEN61360:Expression_Goal "Assurance" ;
                                             DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_InnerDiameter_DE
:DrilledProductOnCarrier_InnerDiameter_DE rdf:type owl:NamedIndividual ,
                                                   DINEN61360:Data_Element ;
                                          DINEN61360:has_Instance_Description :DrilledProductOnCarrier_InnerDiameter_ID ;
                                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_InnerDiameter_ID
:DrilledProductOnCarrier_InnerDiameter_ID rdf:type owl:NamedIndividual ,
                                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
								openmath:name "DrilledProductOnCarrier_InnerDiameter_ID";
                                          DINEN61360:Expression_Goal "Assurance" ;
                                          DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_LotSize_DE
:DrilledProductOnCarrier_LotSize_DE rdf:type owl:NamedIndividual ,
                                             DINEN61360:Data_Element ;
                                    DINEN61360:has_Instance_Description :DrilledProductOnCarrier_LotSize_ID ;
                                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_LotSize_ID
:DrilledProductOnCarrier_LotSize_ID rdf:type owl:NamedIndividual ,
                                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
								openmath:name "DrilledProductOnCarrier_LotSize_ID";
                                    DINEN61360:Expression_Goal "Assurance" ;
                                    DINEN61360:Logic_Interpretation "=" .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_CarrierID_DE
:DrilledProductOnCarrier_CarrierID_DE rdf:type owl:NamedIndividual ,
                                             DINEN61360:Data_Element ;
                                    DINEN61360:has_Instance_Description :DrilledProductOnCarrier_CarrierID_ID ;
                                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierID> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_CarrierID_ID
:DrilledProductOnCarrier_CarrierID_ID rdf:type owl:NamedIndividual ,
                                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
								openmath:name "DrilledProductOnCarrier_CarrierID_ID";
                                    DINEN61360:Expression_Goal "Assurance" ;
                                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_OuterDiameter_DE
:DrilledProductOnCarrier_OuterDiameter_DE rdf:type owl:NamedIndividual ,
                                                   DINEN61360:Data_Element ;
                                          DINEN61360:has_Instance_Description :DrilledProductOnCarrier_OuterDiameter_ID ;
                                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_OuterDiameter_ID
:DrilledProductOnCarrier_OuterDiameter_ID rdf:type owl:NamedIndividual ,
												DINEN61360:Instance_Description ,
												openmath:Variable ,
												DINEN61360:Integer ;
								openmath:name "DrilledProductOnCarrier_OuterDiameter_ID";
                                          DINEN61360:Expression_Goal "Assurance" ;
                                          DINEN61360:Logic_Interpretation "=" .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_StationID_DE
:DrilledProductOnCarrier_StationID_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :DrilledProductOnCarrier_StationID_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#StationID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProductOnCarrier_StationID_ID
:DrilledProductOnCarrier_StationID_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProductOnCarrier_StationID_ID";
                          DINEN61360:Logic_Interpretation "=" ;
						  DINEN61360:Expression_Goal "Assurance" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_Color_DE
:DrilledProduct_Color_DE rdf:type owl:NamedIndividual ,
                                  DINEN61360:Data_Element ;
                         DINEN61360:has_Instance_Description :DrilledProduct_Color_ID ;
                         DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_Color_ID
:DrilledProduct_Color_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_Color_ID";
                         DINEN61360:Expression_Goal "Actual_Value" ;
                         DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_DrillingDepth_DE
:DrilledProduct_DrillingDepth_DE rdf:type owl:NamedIndividual ,
                                          DINEN61360:Data_Element ;
                                 DINEN61360:has_Instance_Description :DrilledProduct_DrillingDepth_ID ;
                                 DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Depth_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_DrillingDepth_ID
:DrilledProduct_DrillingDepth_ID rdf:type owl:NamedIndividual ,
                                          DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_DrillingDepth_ID";
                                 DINEN61360:Expression_Goal "Actual_Value" ;
                                 DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_DrillingDiameter_DE
:DrilledProduct_DrillingDiameter_DE rdf:type owl:NamedIndividual ,
                                             DINEN61360:Data_Element ;
                                    DINEN61360:has_Instance_Description :DrilledProduct_DrillingDiameter_ID ;
                                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_DrillingDiameter_ID
:DrilledProduct_DrillingDiameter_ID rdf:type owl:NamedIndividual ,
                                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_DrillingDiameter_ID";
                                    DINEN61360:Expression_Goal "Actual_Value" ;
                                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_InnerDiameter_DE
:DrilledProduct_InnerDiameter_DE rdf:type owl:NamedIndividual ,
                                          DINEN61360:Data_Element ;
                                 DINEN61360:has_Instance_Description :DrilledProduct_InnerDiameter_ID ;
                                 DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_InnerDiameter_ID
:DrilledProduct_InnerDiameter_ID rdf:type owl:NamedIndividual ,
                                          DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_InnerDiameter_ID";
                                 DINEN61360:Expression_Goal "Actual_Value" ;
                                 DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_LotSize_DE
:DrilledProduct_LotSize_DE rdf:type owl:NamedIndividual ,
                                    DINEN61360:Data_Element ;
                           DINEN61360:has_Instance_Description :DrilledProduct_LotSize_ID ;
                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_LotSize_ID
:DrilledProduct_LotSize_ID rdf:type owl:NamedIndividual ,
                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_LotSize_ID";
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_OuterDiameter_DE
:DrilledProduct_OuterDiameter_DE rdf:type owl:NamedIndividual ,
                                          DINEN61360:Data_Element ;
                                 DINEN61360:has_Instance_Description :DrilledProduct_OuterDiameter_ID ;
                                 DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_OuterDiameter_ID
:DrilledProduct_OuterDiameter_ID rdf:type owl:NamedIndividual ,
                                          DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_OuterDiameter_ID";
                                 DINEN61360:Expression_Goal "Actual_Value" ;
                                 DINEN61360:Logic_Interpretation "=" .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_StationID_DE
:DrilledProduct_StationID_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :DrilledProduct_StationID_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#StationID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrilledProduct_StationID_ID
:DrilledProduct_StationID_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "DrilledProduct_StationID_ID";
                          DINEN61360:Logic_Interpretation "=" ;
						  DINEN61360:Expression_Goal "Assurance" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#Drilling
:Drilling rdf:type owl:NamedIndividual ,
				VDI3682:ProcessOperator ;
			VDI3682:hasInput :ProductAtDrillingChecked ,
                           :RequiredDrillingDepth ,
                           :RequiredDrillingDiameter ;
          VDI3682:hasOutput :DrilledProduct .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#DrillingModule
:DrillingModule rdf:type owl:NamedIndividual ,
						VDI2206:Module,
                        VDI3682:TechnicalResource ,
						CSS:Resource ;
				CSS:providesCapability :Drilling ;
                VDI3682:isAssignedTo :Drilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct
:InputProduct rdf:type owl:NamedIndividual ,
                       VDI3682:Product ;
			DINEN61360:has_Data_Element :InputProduct_Color_DE ,
										:InputProduct_InnerDiameter_DE ,
										:InputProduct_LotSize_DE ,
										:InputProduct_OuterDiameter_DE ,
										:InputProduct_StationID_DE ;
			VDI3682:isCharacterizedBy :InputProduct_Color_ID ,
									:InputProduct_InnerDiameter_ID ,
									:InputProduct_LotSize_ID ,
									:InputProduct_OuterDiameter_ID ,
									:InputProduct_StationID_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#MoveToDrilling
:MoveToDrilling rdf:type owl:NamedIndividual ;
                VDI3682:hasInput :InputProduct ;
                VDI3682:hasOutput :ProductAtDrilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#MoveToDrillingModule
:MoveToDrillingModule rdf:type owl:NamedIndividual ,
								VDI2206:Module ,
								VDI3682:TechnicalResource ,
								CSS:Resource ;
					CSS:providesCapability :MoveToDrilling ;
                    VDI3682:isAssignedTo :MoveToDrilling .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling
:ProductAtDrilling rdf:type owl:NamedIndividual ,
                            VDI3682:Product ;
				DINEN61360:has_Data_Element :ProductAtDrilling_Color_DE ,
											:ProductAtDrilling_InnerDiameter_DE ,
											:ProductAtDrilling_LotSize_DE ,
											:ProductAtDrilling_OuterDiameter_DE ,
											:ProductAtDrilling_StationID_DE ;
				VDI3682:isCharacterizedBy :ProductAtDrilling_Color_ID ,
								:ProductAtDrilling_InnerDiameter_ID ,
								:ProductAtDrilling_LotSize_ID ,
								:ProductAtDrilling_OuterDiameter_ID ,
								:ProductAtDrilling_StationID_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked
:ProductAtDrillingChecked rdf:type owl:NamedIndividual ,
								VDI3682:Product ;
						DINEN61360:has_Data_Element :ProductAtDrillingChecked_Color_DE ,
													:ProductAtDrillingChecked_DrillingDepth_DE ,
													:ProductAtDrillingChecked_DrillingDiameter_DE ,
													:ProductAtDrillingChecked_InnerDiameter_DE ,
													:ProductAtDrillingChecked_LotSize_DE ,
													:ProductAtDrillingChecked_OuterDiameter_DE ,
													:ProductAtDrillingChecked_StationID_DE ;
						VDI3682:isCharacterizedBy :ProductAtDrillingChecked_Color_ID ,
												:ProductAtDrillingChecked_DrillingDepth_ID ,
												:ProductAtDrillingChecked_DrillingDiameter_ID ,
												:ProductAtDrillingChecked_InnerDiameter_ID ,
												:ProductAtDrillingChecked_LotSize_ID ,
												:ProductAtDrillingChecked_OuterDiameter_ID ,
												:ProductAtDrillingChecked_StationID_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_Color_DE
:ProductAtDrillingChecked_Color_DE rdf:type owl:NamedIndividual ,
                                            DINEN61360:Data_Element ;
                                   DINEN61360:has_Instance_Description :ProductAtDrillingChecked_Color_ID ;
                                   DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_Color_ID
:ProductAtDrillingChecked_Color_ID rdf:type owl:NamedIndividual ,
                                            DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_Color_ID";
                                   DINEN61360:Expression_Goal "Actual_Value" ;
                                   DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_DrillingDepth_DE
:ProductAtDrillingChecked_DrillingDepth_DE rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Data_Element ;
                                           DINEN61360:has_Instance_Description :ProductAtDrillingChecked_DrillingDepth_ID ;
                                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Depth_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_DrillingDepth_ID
:ProductAtDrillingChecked_DrillingDepth_ID rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_DrillingDepth_ID";
                                           DINEN61360:Expression_Goal "Actual_Value" ;
                                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_DrillingDiameter_DE
:ProductAtDrillingChecked_DrillingDiameter_DE rdf:type owl:NamedIndividual ,
                                                       DINEN61360:Data_Element ;
                                              DINEN61360:has_Instance_Description :ProductAtDrillingChecked_DrillingDiameter_ID ;
                                              DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_DrillingDiameter_ID
:ProductAtDrillingChecked_DrillingDiameter_ID rdf:type owl:NamedIndividual ,
                                                       DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_DrillingDiameter_ID";
                                              DINEN61360:Expression_Goal "Actual_Value" ;
                                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_InnerDiameter_DE
:ProductAtDrillingChecked_InnerDiameter_DE rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Data_Element ;
                                           DINEN61360:has_Instance_Description :ProductAtDrillingChecked_InnerDiameter_ID ;
                                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_InnerDiameter_ID
:ProductAtDrillingChecked_InnerDiameter_ID rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_InnerDiameter_ID";
                                           DINEN61360:Expression_Goal "Actual_Value" ;
                                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_LotSize_DE
:ProductAtDrillingChecked_LotSize_DE rdf:type owl:NamedIndividual ,
                                              DINEN61360:Data_Element ;
                                     DINEN61360:has_Instance_Description :ProductAtDrillingChecked_LotSize_ID ;
                                     DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_LotSize_ID
:ProductAtDrillingChecked_LotSize_ID rdf:type owl:NamedIndividual ,
                                              DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_LotSize_ID";
                                     DINEN61360:Expression_Goal "Actual_Value" ;
                                     DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_OuterDiameter_DE
:ProductAtDrillingChecked_OuterDiameter_DE rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Data_Element ;
                                           DINEN61360:has_Instance_Description :ProductAtDrillingChecked_OuterDiameter_ID ;
                                           DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_OuterDiameter_ID
:ProductAtDrillingChecked_OuterDiameter_ID rdf:type owl:NamedIndividual ,
                                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_OuterDiameter_ID";
                                           DINEN61360:Expression_Goal "Actual_Value" ;
                                           DINEN61360:Logic_Interpretation "=" .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_StationID_DE
:ProductAtDrillingChecked_StationID_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :ProductAtDrillingChecked_StationID_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#StationID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrillingChecked_StationID_ID
:ProductAtDrillingChecked_StationID_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrillingChecked_StationID_ID";
                          DINEN61360:Logic_Interpretation "=" ;
						  DINEN61360:Expression_Goal "Assurance" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_Color_DE
:ProductAtDrilling_Color_DE rdf:type owl:NamedIndividual ,
                                     DINEN61360:Data_Element ;
                            DINEN61360:has_Instance_Description :ProductAtDrilling_Color_ID ;
                            DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_Color_ID
:ProductAtDrilling_Color_ID rdf:type owl:NamedIndividual ,
                                     DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrilling_Color_ID";
                            DINEN61360:Expression_Goal "Actual_Value" ;
                            DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_InnerDiameter_DE
:ProductAtDrilling_InnerDiameter_DE rdf:type owl:NamedIndividual ,
                                             DINEN61360:Data_Element ;
                                    DINEN61360:has_Instance_Description :ProductAtDrilling_InnerDiameter_ID ;
                                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_InnerDiameter_ID
:ProductAtDrilling_InnerDiameter_ID rdf:type owl:NamedIndividual ,
                                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrilling_InnerDiameter_ID";
                                    DINEN61360:Expression_Goal "Actual_Value" ;
                                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_LotSize_DE
:ProductAtDrilling_LotSize_DE rdf:type owl:NamedIndividual ,
                                       DINEN61360:Data_Element ;
                              DINEN61360:has_Instance_Description :ProductAtDrilling_LotSize_ID ;
                              DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_LotSize_ID
:ProductAtDrilling_LotSize_ID rdf:type owl:NamedIndividual ,
                                       DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrilling_LotSize_ID";
                              DINEN61360:Expression_Goal "Actual_Value" ;
                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_OuterDiameter_DE
:ProductAtDrilling_OuterDiameter_DE rdf:type owl:NamedIndividual ,
                                             DINEN61360:Data_Element ;
                                    DINEN61360:has_Instance_Description :ProductAtDrilling_OuterDiameter_ID ;
                                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_OuterDiameter_ID
:ProductAtDrilling_OuterDiameter_ID rdf:type owl:NamedIndividual ,
                                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrilling_OuterDiameter_ID";
                                    DINEN61360:Expression_Goal "Actual_Value" ;
                                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_StationID_DE
:ProductAtDrilling_StationID_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :ProductAtDrilling_StationID_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#StationID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#ProductAtDrilling_StationID_ID
:ProductAtDrilling_StationID_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "ProductAtDrilling_StationID_ID";
                          DINEN61360:Logic_Interpretation "=" ;
						  DINEN61360:Expression_Goal "Assurance" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_Color_DE
:InputProduct_Color_DE rdf:type owl:NamedIndividual ,
                           DINEN61360:Data_Element ;
                  DINEN61360:has_Instance_Description :InputProduct_Color_ID ;
                  DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Color_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_Color_ID
:InputProduct_Color_ID rdf:type owl:NamedIndividual ,
                           DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "InputProduct_Color_ID";
                  DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_InnerDiameter_DE
:InputProduct_InnerDiameter_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :InputProduct_InnerDiameter_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_InnerDiameter_ID
:InputProduct_InnerDiameter_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "InputProduct_InnerDiameter_ID";
                          DINEN61360:Expression_Goal "Actual_Value" ;
                          DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_LotSize_DE
:InputProduct_LotSize_DE rdf:type owl:NamedIndividual ,
                             DINEN61360:Data_Element ;
                    DINEN61360:has_Instance_Description :InputProduct_LotSize_ID ;
                    DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#LotSize_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_LotSize_ID
:InputProduct_LotSize_ID rdf:type owl:NamedIndividual ,
                             DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "InputProduct_LotSize_ID";
                    DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_OuterDiameter_DE
:InputProduct_OuterDiameter_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :InputProduct_OuterDiameter_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#OuterDiameter_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_OuterDiameter_ID
:InputProduct_OuterDiameter_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "InputProduct_OuterDiameter_ID";
                          DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_StationID_DE
:InputProduct_StationID_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :InputProduct_StationID_ID ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#StationID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#InputProduct_StationID_ID
:InputProduct_StationID_ID rdf:type owl:NamedIndividual ,
                                   DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "InputProduct_StationID_ID";
                          DINEN61360:Logic_Interpretation "=" ;
						  DINEN61360:Expression_Goal "Actual_Value" .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#PutOnCarrier
:PutOnCarrier rdf:type owl:NamedIndividual ,
						VDI3682:ProcessOperator ;
              VDI3682:hasInput :DrilledProduct ,
                               :RequiredCarrierID ,
                               :RequiredCarrierSlot ;
              VDI3682:hasOutput :DrilledProductOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#PutOnCarrierModule
:PutOnCarrierModule rdf:type owl:NamedIndividual ,
							VDI2206:Module,
                            VDI3682:TechnicalResource ,
							CSS:Resource ;
					CSS:providesCapability :PutOnCarrier ;
                    VDI3682:isAssignedTo :PutOnCarrier .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierID
:RequiredCarrierID rdf:type owl:NamedIndividual ,
                            VDI3682:Information ;
				DINEN61360:has_Data_Element :RequiredCarrierID_DE ;
				VDI3682:isCharacterizedBy :RequiredCarrierID_ID1,
										:RequiredCarrierID_ID2 ,
										:RequiredCarrierID_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierID_ID1
:RequiredCarrierID_ID1 rdf:type owl:NamedIndividual ,
                                DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredCarrierID_ID1";
                       DINEN61360:Expression_Goal "Requirement" ;
                       DINEN61360:Logic_Interpretation ">=" ;
                       DINEN61360:Value 1 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierID_ID2
:RequiredCarrierID_ID2 rdf:type owl:NamedIndividual ,
                                DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredCarrierID_ID2";
                       DINEN61360:Expression_Goal "Requirement" ;
                       DINEN61360:Logic_Interpretation "<=" ;
                       DINEN61360:Value 8 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierID_ID3
:RequiredCarrierID_ID3 rdf:type owl:NamedIndividual ,
                                DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredCarrierID_ID3";
                       DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierID_DE
:RequiredCarrierID_DE rdf:type owl:NamedIndividual ,
                               DINEN61360:Data_Element ;
                      DINEN61360:has_Instance_Description :RequiredCarrierID_ID1 ,
                                                          :RequiredCarrierID_ID2 ,
														  :RequiredCarrierID_ID3 ;
                      DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierID_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierSlot
:RequiredCarrierSlot rdf:type owl:NamedIndividual ,
							VDI3682:Information ;
					DINEN61360:has_Data_Element :RequiredCarrierSlot_DE ;
					VDI3682:isCharacterizedBy :RequiredCarrierSlot1_ID .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierSlot1_ID
:RequiredCarrierSlot1_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredCarrierSlot1_ID";
                         DINEN61360:Expression_Goal "Requirement" ;
                         DINEN61360:Logic_Interpretation ">=" ;
                         DINEN61360:Value 1 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierSlot2_ID
:RequiredCarrierSlot2_ID rdf:type owl:NamedIndividual ,
                                  DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredCarrierSlot2_ID";
                         DINEN61360:Expression_Goal 4 ;
                         DINEN61360:Logic_Interpretation "<=" ;
                         DINEN61360:Value 4 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredCarrierSlot_DE
:RequiredCarrierSlot_DE rdf:type owl:NamedIndividual ,
                                 DINEN61360:Data_Element ;
                        DINEN61360:has_Instance_Description :RequiredCarrierSlot1_ID ,
                                                            :RequiredCarrierSlot2_ID ;
                        DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#CarrierSlot_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDepth
:RequiredDrillingDepth rdf:type owl:NamedIndividual ,
                                VDI3682:Information ;
					DINEN61360:has_Data_Element :RequiredDrillingDepth_DE ;
					VDI3682:isCharacterizedBy :RequiredDrillingDepth_ID1 ,
											:RequiredDrillingDepth_ID2 ,
											:RequiredDrillingDepth_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDepth_ID1
:RequiredDrillingDepth_ID1 rdf:type owl:NamedIndividual ,
                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredDrillingDepth_ID1";
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation ">=" ;
                           DINEN61360:Value 5 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDepth_ID2
:RequiredDrillingDepth_ID2 rdf:type owl:NamedIndividual ,
                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredDrillingDepth_ID2";
                           DINEN61360:Expression_Goal "Requirement" ;
                           DINEN61360:Logic_Interpretation "<=" ;
                           DINEN61360:Value 10 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDepth_ID3
:RequiredDrillingDepth_ID3 rdf:type owl:NamedIndividual ,
                                    DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
openmath:name "RequiredDrillingDepth_ID3";
                           DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDepth_DE
:RequiredDrillingDepth_DE rdf:type owl:NamedIndividual ,
                                   DINEN61360:Data_Element ;
                          DINEN61360:has_Instance_Description :RequiredDrillingDepth_ID1 ,
                                                              :RequiredDrillingDepth_ID2 ,
															  :RequiredDrillingDepth_ID3 ;
                          DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#Depth_TD> .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDiameter
:RequiredDrillingDiameter rdf:type owl:NamedIndividual ,
								VDI3682:Information ;
						DINEN61360:has_Data_Element :RequiredDrillingDiameter_DE ;
						VDI3682:isCharacterizedBy :RequiredDrillingDiameter_ID1 ,
												:RequiredDrillingDiameter_ID2 ,
												:RequiredDrillingDiameter_ID3 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDiameter_ID1
:RequiredDrillingDiameter_ID1 rdf:type owl:NamedIndividual ,
                                       DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
							openmath:name "RequiredDrillingDiameter_ID1";
                              DINEN61360:Expression_Goal "Requirement" ;
                              DINEN61360:Logic_Interpretation ">=" ;
                              DINEN61360:Value 5 .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDiameter_ID2
:RequiredDrillingDiameter_ID2 rdf:type owl:NamedIndividual ,
                                       DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
								openmath:name "RequiredDrillingDiameter_ID2";
                              DINEN61360:Expression_Goal "Requirement" ;
                              DINEN61360:Logic_Interpretation "<=" ;
                              DINEN61360:Value 10 .

###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDiameter_ID3
:RequiredDrillingDiameter_ID3 rdf:type owl:NamedIndividual ,
                                       DINEN61360:Instance_Description ,
								openmath:Variable ,
								DINEN61360:Integer ;
							openmath:name "RequiredDrillingDiameter_ID3";
                              DINEN61360:Logic_Interpretation "=" .


###  http://www.hsu-hh.de/aut/ontologies/lab/MPS500/DrillingModule#RequiredDrillingDiameter_DE
:RequiredDrillingDiameter_DE rdf:type owl:NamedIndividual ,
                                      DINEN61360:Data_Element ;
                             DINEN61360:has_Instance_Description :RequiredDrillingDiameter_ID1 ,
                                                                 :RequiredDrillingDiameter_ID2 ,
																 :RequiredDrillingDiameter_ID3 ;
                             DINEN61360:has_Type_Description <http://www.hsu-hh.de/aut/ontologies/lab/MPS500/property-types#InnerDiameter_TD> .



#################################################################
#    Constraints
#################################################################
###  Color stays the same
:CompleteDrilling_ColorConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:DrilledProductOnCarrier_Color_ID :InputProduct_Color_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :DrilledProductOnCarrier_Color_ID ,
                                                      :InputProduct_Color_ID  .
													  
###  Lot size stays the same
:CompleteDrilling_LotSizeConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:DrilledProductOnCarrier_LotSize_ID :InputProduct_LotSize_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :DrilledProductOnCarrier_LotSize_ID ,
                                                      :InputProduct_LotSize_ID  .

###  Inner diameter stays the same
:CompleteDrilling_InnerDiameterConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:DrilledProductOnCarrier_InnerDiameter_ID :InputProduct_InnerDiameter_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :DrilledProductOnCarrier_InnerDiameter_ID ,
                                                      :InputProduct_InnerDiameter_ID .

###  Outer diameter stays the same
:CompleteDrilling_OuterDiameterConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:DrilledProductOnCarrier_OuterDiameter_ID :InputProduct_OuterDiameter_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :DrilledProductOnCarrier_OuterDiameter_ID ,
                                                      :InputProduct_OuterDiameter_ID .

### Drilling depth is passed to product
:CompleteDrilling_DrillingDepthConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:RequiredDrillingDepth_ID3 :DrilledProductOnCarrier_DrillingDepth_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :RequiredDrillingDepth_ID3 ,
                                                      :DrilledProductOnCarrier_DrillingDepth_ID  .

### Drilling diameter is passed to product
:CompleteDrilling_DrillingDiameterConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:RequiredDrillingDiameter_ID3 :DrilledProductOnCarrier_DrillingDiameter_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :RequiredDrillingDiameter_ID3 ,
                                                      :DrilledProductOnCarrier_DrillingDiameter_ID  .

### CarrierID is passed to product
:CompleteDrilling_CarrierIdConstraint rdf:type owl:NamedIndividual ,
                                                openmath:Application ,
                                                CSS:CapabilityConstraint ;
                                       openmath:arguments (:RequiredCarrierID_ID3 :DrilledProductOnCarrier_CarrierID_ID);
                                       openmath:operator <http://www.openmath.org/cd/relation1#eq> ;
                                       CSS:references :RequiredCarrierID_ID3 ,
                                                      :DrilledProductOnCarrier_CarrierID_ID  .

`;