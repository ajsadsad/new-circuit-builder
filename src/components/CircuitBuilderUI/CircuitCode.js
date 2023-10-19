/**
 *  returns the circuit code console component within the circuit builder page.
 *  @param {boolean} codeView - True if code console is viewable.
 *  @param {boolean} faveGatesView - True is fave gates menu is viewable.
 *  @param {boolean} allGatesView - True if all gates menu is viewable.
 */
import React, { useEffect } from 'react';
import styles from '../css/CircuitBuilder.module.css';

export default function CircuitCode({ currQBState, convertCircuit, circuitCode, setCircuitCode }) {

    useEffect(() => {
        setCircuitCode(convertCircuit)
        // toString()
    }, [currQBState]);

   return(
    <div class="text-white">
        {circuitCode}
    </div>
   )
}
