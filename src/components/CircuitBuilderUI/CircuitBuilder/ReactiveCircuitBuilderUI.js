import React, { useState, useEffect, useRef } from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import CircuitGrid from './CircuitGrid'

export default function ReactiveCircuitBuilderUI({ optionsView, faveGatesView, codeView, outputView, allGatesView, setCBDimensions, dimensions, qubitStates, handleChange, moveGateFromQubit, addQubit, Modal, handleClick, setGateClicked}) {

    const refContainer = useRef();

    useEffect(() => {
        if (refContainer.current) {
            setCBDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [optionsView, faveGatesView, codeView, outputView, allGatesView,]);

    let circuitGrid = (
        <CircuitGrid
            qubitStates = { qubitStates }
            handleChange = { handleChange }
            moveGateFromQubit = { moveGateFromQubit }
            addQubit = { addQubit }
            handleClick = { handleClick }
            setGateClicked = { setGateClicked }
        />
    )

    if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === true) {
       return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 ref = { refContainer }>
                width : {dimensions.width}
                height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if (allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === true ) {
        return <div className = { `${ styles.CircuitBuilder }` }
                ref = { refContainer }>
                width : {dimensions.width}
                height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === false ) {
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === true ){
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        //have to fix fave menu showing and moving everything to the left.
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput  }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        // have to fix this so that everything moves to the left. or everything starts to the right until the menu opens?
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { circuitGrid }
                </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave}` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                 Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionNoCodeWithFave }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsole }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput}` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF */}
                { circuitGrid }
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption}` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON */}
                { circuitGrid }
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }
                 ref = { refContainer }>
                 width : {dimensions.width}
                 height : {dimensions.height}
                {/* Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON */}
                { circuitGrid }
            </div>
    }
}