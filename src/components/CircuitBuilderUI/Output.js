import React, { useState, useEffect, useRef } from 'react'
import styles from '../CircuitBuilderPage/CircuitBuilder.module.scss'

export default function Output ({ outputView, codeView, faveGatesView, optionsView }) {
    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [codeView, faveGatesView, optionsView]);

    if(outputView === true) {
        if(faveGatesView === true && optionsView === false && codeView === true) {
            return <div className = {
                        `${ styles.Output }
                         ${ styles.OutputNoOptionWithCode }` }
                        ref = { refContainer }>
                    Output Window
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === true && optionsView === false && codeView === false) {
            return <div className = {
                        `${ styles.Output }
                         ${ styles.OutputNoOptionNoCodeWithFave }` }
                        ref = { refContainer }>
                    Output Window
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && optionsView === false && codeView === true) {
            return <div className = {
                        `${ styles.Output }
                         ${ styles.OutputNoOptionWithCode }` }
                        ref = { refContainer }>
                    Output Window
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && optionsView === false && codeView === false) {
            return <div className = {
                        `${ styles.Output }
                         ${ styles.OutputNoOptionNoCodeNoFave }` }
                        ref = { refContainer }>
                    Output Window
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && optionsView === true && codeView === false) {
            return <div className = {
                        `${ styles.Output }
                         ${ styles.OutputNoCodeWithOption }` }
                        ref = { refContainer }>
                    Output Window
                    width : {dimensions.width}
                    height : {dimensions.height}
                    </div>
         } else if(faveGatesView === false && optionsView === true && codeView === true) {
            return <div className = {
                        `${ styles.Output }` }
                        ref = { refContainer }>
                    Output Window
                    width : {dimensions.width}
                    height : {dimensions.height}
                    </div>
         }
    } else {
        return <div style = { { display: "none" } }/>
    }
}