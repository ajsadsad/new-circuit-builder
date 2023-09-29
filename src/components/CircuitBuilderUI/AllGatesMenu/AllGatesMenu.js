import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss';

export default function AllGatesMenu ( { optionsView, faveGatesView, allGatesView, standardGates }  ) {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    if(allGatesView === true) {
        if(optionsView === false && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionNoFave }` }
                        ref = { refContainer }>
                    {/* All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height} */}
                     {
                        standardGates
                     }
                    </div>
         } else if(optionsView === true && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuWithOptionNoFave }` }
                        ref = { refContainer }>
                    {/* All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height} */}
                     {
                       standardGates
                     }
                    </div>
         } else if(optionsView === false && faveGatesView === true) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionWithFave }` }
                        ref = { refContainer }>
                    {/* All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height} */}
                     {
                       standardGates
                     }
                    </div>
         }
    } else {
        return <div style = {{display: "none"}}/>
    }
}