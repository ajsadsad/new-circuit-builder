import React, { useState, useEffect, useRef } from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function ReactiveCircuitBuilderUI({ optionsView, faveGatesView, codeView, outputView, allGatesView, setDraggingGate, draggingGate }) {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    // const [droppedGates, setDroppedGates] = useState([]); 

    // const onDrop = () => {

    // }

    /*When resizing probably have to check if it is smaller or larger than the current size. 
      IF its bigger then you would have to append more of an empty at the end. 
      If its smaller maybe don't let it resize or compress more or just hide overflow? IDK
      -- Need to store state of grid to ensure that when it is rerendered/resized that the same grid is reproduced. 
        probably have to add elements to it to hold more information on each cell or whatever iDK 
    */

    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [optionsView, faveGatesView, codeView, outputView, allGatesView]);

    let windowHeight = Math.floor(dimensions.height/48); 
    let windowWidth = Math.floor(dimensions.width/48);

    let fullGrid = Array(windowHeight).fill(0).map(row => new Array(windowWidth).fill(false)) 
    
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
                {/* <Row>
                    <Col
                        id = {"1"}
                        onDragEnter = {(e) => { e.preventDefault(); console.log(draggingGate)}}
                        onDrop = {(e) => { e.preventDefault(); console.log("AHAHAHHA")}} 
                    > hehe drop
                    </Col>
                </Row> */}
                <Container>
                {
                    fullGrid.map((column, index) => 
                        <Row
                            key = { index }
                            className = { styles.row }
                            
                        >
                            {
                                column.map((index) => 
                                    <Col
                                        className = { styles.col }
                                        key = { index }
                                    > 
                                        h
                                    </Col>
                                )
                            }
                        </Row>
                    )
                }
                </Container>
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                />*/}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
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
                {/* {/* {/* {/* <NestedGrid
                     circuitBuilderDimensions = { dimensions }
                /> */}
            </div>
    }
}