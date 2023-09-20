import React, { useState, useEffect, useRef } from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
//import useAllGatesMenuViewController from './useAllGatesMenuViewController';
import data from '../../../assets/standardGates.json'

export default function AllGatesMenu ({ optionsView, faveGatesView, allGatesView, setDraggingGate }) {

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

    const gates = data.Gates.map(gate =>
        <img
            id = { gate.ID }
            key = { gate.gateName }
            description = { gate.description }
            src = { require(`../../../assets/${gate.img}`)}
            draggable = { true }
            onDrag = {(e) => { e.preventDefault(); setDraggingGate(e.target.id)}}
        >
        </img>
    );

    if(allGatesView === true) {
        if(optionsView === false && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionNoFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                     {
                       gates
                     }
                    </div>
         } else if(optionsView === true && faveGatesView === false) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuWithOptionNoFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                     {
                       gates
                     }
                    </div>
         } else if(optionsView === false && faveGatesView === true) {
            return <div className = {
                        `${ styles.AllGatesMenu }
                         ${ styles.AllGatesMenuNoOptionWithFave }` }
                        ref = { refContainer }>
                    All Gates Menu
                     width : {dimensions.width}
                     height : {dimensions.height}
                     {
                       gates
                     }
                    </div>
         }
    } else {
        return <div style = {{display: "none"}}/>
    }
}