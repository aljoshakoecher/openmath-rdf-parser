import {fromOpenMath, toOpenMath} from "./index";
const input = "sin(x+y)";
toOpenMath(input);

const ttlInput = ` 
@prefix : </#>.
@prefix ont: <http://example.org/ontology#>.
@prefix m: <http://openmath.org/vocab/math#>.

ont:myApplication_sin
    a m:Application;
    m:arguments
            (
                    [
                        a m:Application;
                        m:arguments
                                ( [ a m:Variable; m:name "x" ]
                                [ a m:Variable; m:name "y" ] );
                        m:operator "http://www.openmath.org/cd/arith1#plus"
                    ]
            );
    m:operator "http://www.openmath.org/cd/transc1#sin".`;

const ttlInput2 = ` 
@prefix : </#>.
@prefix ont: <http://example.org/ontology#>.
@prefix m: <http://openmath.org/vocab/math#>.

ont:myApplication_sinpow
    a m:Application;
    m:arguments
            (
                    [
                        a m:Application;
                        m:arguments
                                (
									[
										a m:Application;
										m:arguments
												( [ a m:Variable; m:name "x" ]
												[ a m:Variable; m:name "y" ] );
										m:operator "http://www.openmath.org/cd/arith1#plus"
									]
								);
                        m:operator "http://www.openmath.org/cd/arith1#power"
                    ]
            );
m:operator "http://www.openmath.org/cd/transc1#sin".`;

fromOpenMath(ttlInput2);
