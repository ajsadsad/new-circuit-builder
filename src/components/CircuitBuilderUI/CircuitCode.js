/**
 *  returns the circuit code console component within the circuit builder page.
 *  @param {boolean} codeView - True if code console is viewable.
 *  @param {boolean} faveGatesView - True is fave gates menu is viewable.
 *  @param {boolean} allGatesView - True if all gates menu is viewable.
 */
import React, { useEffect } from 'react';
import styles from '../css/OptionsMenu.module.css';

export default function CircuitCode({ currQBState, convertCircuit, circuitCode, setCircuitCode }) {

    const displayCode = circuitCode.map((line, index) => {
        return (
            <p>{(index + 1)}: {line}</p>
        )
    })

    return (

       
            <div className={styles.OptionsMenu}>
                <div className="d-flex justify-content-between">
                    <div className="dropup">
                        <button className="btn btn-dark rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Code Output
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {displayCode}
                        </ul>
                    </div>
                </div>
            </div>
        
       


    )
}
