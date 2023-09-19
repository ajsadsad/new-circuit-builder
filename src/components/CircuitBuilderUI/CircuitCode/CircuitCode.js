import React, { useState, useEffect, useRef } from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'

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

    if(codeView === true) {
        if(faveGatesView === true && allGatesView === true ) {
            return <div className = { styles.Code }
                        ref = { refContainer }>
                    Code Console
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === true && allGatesView === false ) {
            return <div className = {
                        `${ styles.Code }
                         ${ styles.CodeNoAllGates }` }
                        ref = { refContainer }>
                    Code Console
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && allGatesView === false ) {
            return <div className = {
                        `${ styles.Code }
                         ${ styles.CodeNoAllGates }
                         ${ styles.CodeNoFaveMenu }` }
                        ref = { refContainer }>
                    Code Console
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && allGatesView === true ) {
            return <div className = {
                        `${ styles.Code }
                         ${ styles.CodeNoFaveMenu }` }
                        ref = { refContainer }>
                    Code Console
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
            }
    } else {
        return <div style = { { display: "none" } }/>
    }
}