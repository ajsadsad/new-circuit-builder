/**
 * @param {boolean} optionsView - True if options menu is viewable.
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 * @param {boolean} allGatesView - True if all gates menu is viewable.
 * @param {array[]} gates - Array of standard gates.
 * @param {function} setDraggingGate - Function used to track state of current gate being dragged from menu.
 * @param {function} setDraggingGateNode - Function used to track state of current gate being dragged from menu as a HTML Node.
 */
import React, {useRef} from 'react';
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss';

export default function AllGatesMenu ( { optionsView, faveGatesView, allGatesView, gates, setDraggingGate, setDraggingGateNode }  ) {

    const refContainer = useRef();

    const standardGates = gates.map((index) => {
        return(JSON.parse([index]));
    })

    const gateImgs = standardGates.map((gate) => {
        if(gate.qid === "xrot") {
            return (
                <img
                className = { styles.GateImg }
                key = { gate.qid }
                id = { gate.qid }
                gate = { JSON.stringify(gate) }
                src = { require(`../../../assets/${gate.img}`)}
                draggable = { true }
                onDragStart = {(e) => { setDraggingGateNode(e); setDraggingGate(gate); }}
                />
            )
        } else {
            return (
                <img
                className = { styles.GateImg }
                key = { gate.qid }
                id = { gate.qid }
                gate = { JSON.stringify(gate) }
                src = { require(`../../../assets/${gate.img}`)}
                draggable = { true }
                onDragStart = {(e) => { setDraggingGateNode(e); setDraggingGate(gate); }}
                />
            )
        }
    });

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
                        gateImgs
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
                       gateImgs
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
                       gateImgs
                     }
                    </div>
         }
    } else {
        return <div style = {{display: "none"}}/>
    }
}