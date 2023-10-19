/**
 * This component is reponsible for reshaping the area of which the quantum circuit builder takes up within the circuit builder page. Props are passed into this component from the CircuitBuilderPage component.
 * @param {boolean} optionsView - True if options menu is viewable.
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 * @param {boolean} codeView - True if code console is viewable.
 * @param {boolean} outputView - True if output console is viewable.
 * @param {boolean} allGatesView - True if all gates menu is vieable.
 * @param {function} setCBDimensions - Function that updates and sets current dimensions of circuit div.
 * @param {object} dimensions - object that stores the current width and height of the circuit builder {width : number, height : number}
 * @param {array[][]} qubitStates - 2D array used to represent how gates are stored in app. Passed in as a prop to newG component to generate the are of which gates can be placed into.
 * @param {function} handleChange - function is passed as a prop to CircuitGrid and is triggered by onDrop event within the CircuitGrid.
 * @param {function} moveGateFromQubit - function passed in as a prop to CircuitGrid and triggered by onDragStart event when gate is moved from qubit.
 * @param {function} addQubit - function passed in as a prop to CircuitGrid to handle the addition of a qubit.
 * @param {function} handleClick - function passed in as a prop to CircuitGrid to hand the event of when a gate is clicked within the circuit.
 * @param {function} setGateClicked - function passed in as a prop to CircuitGrid to help keep track of current gate being actioned upon.
 */

import React, { useRef, useEffect, useState } from 'react'
import styles from '../css/CircuitBuilder.module.css'
import NewCircuitGrid from './newCircuitGrid'

export default function ReactiveCircuitBuilderUI({ optionsView, faveGatesView, codeView, outputView, allGatesView, currQBState, handleChange, moveGateFromQubit, addQubit, handleClick, setGateClicked, setDraggingGateNode, setDraggingGate, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, draggingGate, startDraggingGate, endDraggingGate, handleDraggingGate, imgRef, qubitCellRef }) {

    let newG = (
        <NewCircuitGrid
            qubitStates = { currQBState }
            handleChange = { handleChange }
            moveGateFromQubit = { moveGateFromQubit }
            addQubit = { addQubit }
            handleClick = { handleClick }
            setGateClicked = { setGateClicked }
            setDraggingGate = { setDraggingGate }
            startDrawRect = { startDrawRect }
            endDrawRect = { endDrawRect }
            drawRect = { drawRect }
            svgRef = { svgRef }
            rectRef = { rectRef }
            draggingGate = {draggingGate}
            startDraggingGate = { startDraggingGate }
            imgRef = { imgRef }
            qubitCellRef={qubitCellRef}
        />
    )

    return (
        <div className = { styles.CircuitBuilder } >
                { newG }
            </div>
    )
}