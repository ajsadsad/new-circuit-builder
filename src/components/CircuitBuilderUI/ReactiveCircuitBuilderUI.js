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
import CircuitGrid from './CircuitGrid'

export default function ReactiveCircuitBuilderUI({ optionsView, faveGatesView, codeView, outputView, allGatesView, currQBState, handleChange, moveGateFromQubit, addQubit, handleClick, setGateClicked, setDraggingGateNode, setDraggingGate, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, draggingGate, startDraggingGate, endDraggingGate, handleDraggingGate, imgRef, qubitCellRef }) {

    const [circuitBuilderDimensions, setCBDimensions] = useState({width : 0, height : 0});

    const refContainer = useRef();

    useEffect(() => {
        if (refContainer.current) {
            setCBDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [optionsView, faveGatesView, codeView, outputView, allGatesView,]);

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

        let circuitGrid = (
            <CircuitGrid
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
                setDraggingGateNode = {setDraggingGateNode }
            />
        )



    if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === true) {
       return <div className = { styles.CircuitBuilder }
                 ref = { refContainer } >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if (allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === true ) {
        return <div className = { `${ styles.CircuitBuilder }` }
                >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === false ) {
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === true ){
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        //have to fix fave menu showing and moving everything to the left.
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput  }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        // have to fix this so that everything moves to the left. or everything starts to the right until the menu opens?
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { newG }
                </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave}` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                 Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionNoCodeWithFave }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsole }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput}` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { newG }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption}` }
                 >
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { newG }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }
                 >
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { newG }
            </div>
    }
}