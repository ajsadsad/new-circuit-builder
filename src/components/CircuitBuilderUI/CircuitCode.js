/**
 *  returns the circuit code console component within the circuit builder page.
 *  @param {boolean} codeView - True if code console is viewable.
 *  @param {boolean} faveGatesView - True is fave gates menu is viewable.
 *  @param {boolean} allGatesView - True if all gates menu is viewable.
 */
import React, { useState, useEffect, useRef, isValidElement } from 'react';
import styles from '../css/CircuitBuilder.module.css';

export default function CircuitCode({ codeView, faveGatesView, allGatesView, currQBState, convertCircuit, circuitCode, setCircuitCode }) {

    useEffect(() => {
        setCircuitCode(convertCircuit)
        // toString()
    }, [currQBState]);

    // function toString() {
    //     if(isValidElement(circuitCode)) {
    //         let tempArray = circuitCode;
    //         circuitCode = "";
    //         for (var i = 0; i < circuitCode.length(); i++) {
    //             setCircuitCode(circuitCode + (i + 1) + ": " + tempArray[i] + "\n");
    //         }
    //     }
    // }

   return(
    <div class="text-white">
        {circuitCode}
    </div>
   )
}
