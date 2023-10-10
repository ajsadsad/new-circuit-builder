/**
 *  returns the circuit code console component within the circuit builder page.
 *  @param {boolean} codeView - True if code console is viewable.
 *  @param {boolean} faveGatesView - True is fave gates menu is viewable.
 *  @param {boolean} allGatesView - True if all gates menu is viewable.
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/CircuitBuilder.module.css';

export default function CircuitCode({ codeView, faveGatesView, allGatesView }) {
    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [faveGatesView, allGatesView]);

   return(

    <div className = {
        `${ styles.Code }
         ${ styles.CodeNoAllGates }
         ${ styles.CodeNoFaveMenu }` }
        ref = { refContainer }>
    Code Console
     width : {dimensions.width}
     height : {dimensions.height}
    </div>
   )
}