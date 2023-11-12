/**
 * This component is reponsible for reshaping the area of which the quantum circuit builder takes up within the circuit builder page. Props are passed into this component from the CircuitBuilderPage component.
 * The grid where gates are placed upon
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

import React from 'react'
import gridStyle from '../css/Grid.module.css'
import style from '../css/ReactiveCircuitBuilderUI.module.css'
import circle from '../../assets/plus-circle-dotted.svg'
import menu from '../../assets/menu.svg'
import AdaptiveTextBox from '../CompoundGates/AdaptiveTextBox'
import qubitSymbol from '../../assets/qubitSymbol.svg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Collapse from 'react-bootstrap/Collapse';

export default function CircuitGridUI({currQBState, handleChange, addQubit, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, imgRef, qubitCellRef,  handleOnMouseDown, handleOnMouseUp, handleOnClick, pathRef, circleRef, handleHover, circuitBuilderHeight, showCodeView, setCodeView, circuitCode,}) {

    const displayCode = circuitCode.map((line, index) => {
        return (
            <>
                {(index + 1)}. {line} <br/>
            </>
        )
    })

    return (
        <Container fluid = {true} >
            <Row>
                <Col sm={1} style = {{"width" : "3%"}}>
                    {/* options menu */}
                    <img
                        src = {menu}
                    />
                </Col>
                <Col>
                    {/* circuit grid, code console, weak & strong compress */}
                    <Row>
                        {/* circuit grid, code console */}
                        <Col sm={ showCodeView ? 10 : 12 }>
                            {/* circuit grid */}
                            <svg
                                height = { 60 * currQBState.length + 25}
                                width = { "100%" }
                                id = "circuit-grid"
                                ref = { svgRef }
                                className = { gridStyle.grid }
                                onClick = { (e) => { e.stopPropagation() }}
                                onMouseDown = { (e) => { e.stopPropagation(); startDrawRect(e); } }
                                onMouseUp = { (e) => { e.preventDefault(); e.stopPropagation(); endDrawRect(e); } }
                                onMouseMove = { (e) => { drawRect(e); } }
                            >
                                <rect ref = {rectRef} className = {gridStyle.selectionBox} pointerEvents ={ "none" }> </rect>
                                <image ref = {imgRef} pointerEvents={ "none" }> </image>
                                <line ref = { pathRef }></line>
                                <circle ref = { circleRef }> </circle>
                            {
                                currQBState.map((row, rowIndex) => {
                                    return (
                                        <g className = { gridStyle.qubit } key = { rowIndex }>
                                            {
                                                rowIndex === currQBState.length - 1 ?
                                                <line
                                                    x1 = { 58 }
                                                    y1 = { 58 * (rowIndex + 1) }
                                                    x2 = { 58 * row.length}
                                                    y2 = { 58 * (rowIndex + 1) }
                                                    id = { rowIndex }
                                                    style = {{ "stroke": "rgb(192,192,192)", "stroke-width": "2", "z-index": "1", "position": "relative", "stroke-linecap": "square",}}
                                                />
                                                :
                                                <line
                                                    x1 = { 58 }
                                                    y1 = { 58 * (rowIndex + 1) }
                                                    x2 = { 58 * row.length}
                                                    y2 = { 58 * (rowIndex + 1) }
                                                    id = { rowIndex }
                                                />
                                            }
                                        {
                                            row.map((col, colIndex) => {
                                                if(colIndex === 0 && rowIndex === currQBState.length - 1) {
                                                    return (
                                                    <g key = { rowIndex + "." + colIndex }>
                                                        <image
                                                            x = { 58 * colIndex + 12 }
                                                            y = { 58 * rowIndex + 43 }
                                                            id = { rowIndex + "." + colIndex }
                                                            href={circle}
                                                            height = { 30 }
                                                            width = { 30 }
                                                            onClick = { (e) => { e.preventDefault(); e.stopPropagation(); addQubit(); }}
                                                        />
                                                    </g>
                                                    )
                                                } else if(colIndex === 0) {
                                                    return (
                                                        <g key = { "Qubit num: " + rowIndex + "." + colIndex }>
                                                            {/* <text
                                                                x = { 58 * colIndex + 12 }
                                                                y = { 58 * rowIndex + 63 }
                                                                width = { 58 }
                                                                height = { 58 }
                                                                className = {gridStyle.disableTextSelection}
                                                            > */}
                                                                <image
                                                                    href = { qubitSymbol }
                                                                    x = { 58 * colIndex + 11 }
                                                                    y = { 58 * rowIndex + 41 }
                                                                    height = { 33 }
                                                                    width = { 33 }
                                                                />
                                                            {/* </text> */}
                                                        </g>
                                                    )
                                                } else {
                                                    return (
                                                        <g key = { "Qubit Cell: " + rowIndex + "." + colIndex }>
                                                            {
                                                                !col.hasGate ?
                                                                <rect
                                                                    x = { 58 * colIndex }
                                                                    y = { 58 * rowIndex + 28}
                                                                    width = { 58 }
                                                                    height = { 58 }
                                                                    id = { rowIndex + "." + colIndex }
                                                                    row = { rowIndex }
                                                                    col = { colIndex }
                                                                    className = { gridStyle.qubitCell }
                                                                    onDragEnter = {(e) => { e.preventDefault();}}
                                                                    onDragOver = {(e) => { e.preventDefault(); handleHover(e); }}
                                                                    onDragLeave = {(e) => { e.preventDefault(); handleHover(e); }}
                                                                    onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e); }}
                                                                />
                                                                :
                                                                <>
                                                                {
                                                                    col.gate.qid === "compound_gate" ?
                                                                    <>
                                                                        <rect
                                                                            x = { 58 * colIndex }
                                                                            y = { 58 * rowIndex + 24}
                                                                            width = { 58 }
                                                                            height = { 58 }
                                                                            row = { rowIndex }
                                                                            col = { colIndex }
                                                                            style = {{"fill" : "none"}}
                                                                        />
                                                                        <rect
                                                                            x = { 58 * colIndex + 7}
                                                                            y = { 58 * rowIndex + 34.5}
                                                                            ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                                            width = { 45 }
                                                                            height = { 54 }
                                                                            row = { rowIndex }
                                                                            col = { colIndex }
                                                                            style = {{"fill" : "none"}}
                                                                            gate={JSON.stringify(col.gate)}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <rect
                                                                            x = { 58 * colIndex }
                                                                            y = { 58 * rowIndex + 28}
                                                                            width = { 58 }
                                                                            height = { 58 }
                                                                            row = { rowIndex }
                                                                            col = { colIndex }
                                                                            style = {{"fill" : "none"}}
                                                                        />
                                                                        <rect
                                                                            x = { 58 * colIndex + 6.5}
                                                                            y = { 58 * rowIndex + 34.5}
                                                                            ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                                            width = { 45 }
                                                                            height = { 45 }
                                                                            row = { rowIndex }
                                                                            col = { colIndex }
                                                                            style = {{"fill" : "none", }}
                                                                            gate={JSON.stringify(col.gate)}
                                                                        />
                                                                    </>
                                                                }
                                                                {
                                                                    col.gate.qid !== "compound_gate" ?
                                                                    <>
                                                                        {
                                                                            col.gate.gateName === "cnot_target" &&
                                                                            col.gate.q_target > col.gate.q_control ?
                                                                            <line
                                                                                x1 = { 58 * colIndex + 29.5}
                                                                                y1 = { 58 * rowIndex + 50 }
                                                                                x2 = { 58 * colIndex + 29.5}
                                                                                y2 = { 58 * rowIndex + 37 }
                                                                                style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                                            >
                                                                            </line>
                                                                            :
                                                                            col.gate.gateName === "cnot_target" &&
                                                                            <line
                                                                                x1 = { 58 * colIndex + 29.5}
                                                                                y1 = { 58 * rowIndex + 50 }
                                                                                x2 = { 58 * colIndex + 29.5}
                                                                                y2 = { 58 * (rowIndex + 2) }
                                                                                style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                                            >
                                                                            </line>
                                                                        }
                                                                            <>
                                                                            {
                                                                            col.gate.qid === "cnot" &&
                                                                            col.gate.q_target > col.gate.q_control &&
                                                                            <line
                                                                                x1 = { 58 * colIndex + 29.5}
                                                                                y1 = { 58 * rowIndex + 50 }
                                                                                x2 = { 58 * colIndex + 29.5}
                                                                                y2 = { 58 * (rowIndex + 2) }
                                                                                style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                                            >
                                                                            </line>
                                                                            }
                                                                                <image
                                                                                    x = { 58 * colIndex + 9}
                                                                                    y = { 58 * rowIndex + 37}
                                                                                    gate={JSON.stringify(col.gate)}
                                                                                    row = { rowIndex }
                                                                                    col = { colIndex }
                                                                                    inqubit = {"true"}
                                                                                    onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseUp(e)}}
                                                                                    onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseDown(e, col.gate); }}
                                                                                    onClick = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnClick(e); }}
                                                                                    href={require(`../../assets/${col.gate.img}`)}
                                                                                />
                                                                            </>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {
                                                                            parseInt(col.gate.location.tail) === rowIndex &&
                                                                            <AdaptiveTextBox
                                                                                row = { col.gate.location.head}
                                                                                col = { colIndex }
                                                                                width = { 45 }
                                                                                height = { 56 * (col.gate.location.tail - col.gate.location.head + 1)}
                                                                                text = { col.gate.gateName }
                                                                                handleOnMouseDown = { handleOnMouseDown }
                                                                                handleOnMouseUp = { handleOnMouseUp }
                                                                                handleOnClick = { handleOnClick }
                                                                                gate = { JSON.stringify(col.gate) }
                                                                            />
                                                                        }
                                                                    </>
                                                                }
                                                                {
                                                                    col.gate.qid === "xrot" &&
                                                                    <text
                                                                        x = { 58 * colIndex + 17}
                                                                        y = { 58 * rowIndex + 87}
                                                                        fontSize={ "12px"}
                                                                        fontWeight={"bold"}
                                                                    >
                                                                        { col.gate.theta }
                                                                    </text>
                                                                }
                                                                {
                                                                    col.gate.qid === "zrot" &&
                                                                    <text
                                                                        x = { 58 * colIndex + 17}
                                                                        y = { 58 * rowIndex + 87}
                                                                        fontSize={ "12px"}
                                                                        fontWeight={"bold"}
                                                                    >
                                                                        { col.gate.theta }
                                                                    </text>
                                                                }
                                                                {
                                                                    col.gate.qid === "yrot" &&
                                                                    <text
                                                                        x = { 58 * colIndex + 17 }
                                                                        y = { 58 * rowIndex + 87 }
                                                                        fontSize={ "12px"}
                                                                        fontWeight={"bold"}
                                                                    >
                                                                        { col.gate.theta }
                                                                    </text>
                                                                }
                                                            </>
                                                            }
                                                        </g>
                                                    )
                                                }})}
                                            </g>
                                )})}
                            <image ref = {imgRef} pointerEvents={ "none" }> </image>
                            </svg>
                        </Col>
                        {
                            showCodeView &&
                            <Col md={2} className = {style.codeConsole}>
                                {/* code console */}
                                <>
                                    <Collapse in = {showCodeView} timeout = {300} appear = { true }>
                                        <div className = {style.codeLines}>
                                            {displayCode}
                                        </div>
                                    </Collapse>
                                </>
                            </Col>
                        }
                    </Row>
                    {/* Strong & Weak compress */}
                    <Row style = {{"padding-top" : "10px"}}>
                        <Col sm = {{span: 1, offset: 0}}>
                            {/* Strong & Weak compress */}
                            <ButtonGroup size = {"sm"}>
                                <Button variant="secondary" style = {{"font-size" : "9px"}}>Strong Compress </Button>
                                <Button variant="secondary" style = {{"font-size" : "9px"}}>Weak Compress </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )

}