import React, { useState, useEffect, useRef } from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function AllGatesMenu ({ optionsView, faveGatesView, allGatesView }) {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [optionsView, faveGatesView, allGatesView]);

    if(allGatesView === true) {
        if(optionsView === false && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionNoFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(optionsView === true && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuWithOptionNoFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         } else if(optionsView === false && faveGatesView === true) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionWithFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                    </div>
         }
    } else {
        return <div style = {{display: "none"}}/>
    }
}