import React from 'react';
import styles from '../css/CircuitBuilder.module.css';
import contextStyles from '../css/ContextMenu.module.css';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu';
import CircuitGridUI from '../CircuitBuilderUI/CircuitGridUI';
import useCircuitBuilderViewModel from './useCircuitBuilderViewModel';
import ThetaModal from '../Modals/ThetaModal'
import NoParamModal from '../Modals/NoParamModal';
import MeasurementModal from '../Modals/MeasurementModal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import CompoundGateModal from '../Modals/CompoundGateModal';
import NewCompoundGateModal from '../Modals/NewCompoundGateModal';
import GatesMenu from '../CircuitBuilderUI/GatesMenu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import menu from '../../assets/menu.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CircuitBuilderPage () {

    const {
        //States
        gates,
        gateClickedName,
        gateClickedDesc,
        thetaModal,
        noParamModal,
        hasMeasure,
        gateClickedThetaVal,
        gatesSelected,
        favGates,
        currQBState, index, lastIndex,
        isDrawing,
        compoundGate,
        compoundGateModal,
        newCompoundGateModal,
        showOptions,
        circuitCode,
        //Functions
        deleteGate,
        clearSelectedGates,
        showMeasModal,
        updateThetaModal,
        addQubit,
        processCircuit,
        handleChange,
        handleClick,
        undo, redo,
        startDrawRect, endDrawRect, drawRect,
        startDraggingGate,
        clearAllGates,
        weakCompress,
        strongCompress,
        setLastClicked,
        addToFavGates,
        handleOnMouseDown, handleOnMouseUp, handleOnClick, handleKeyPress, handleHover,
        makeCompoundGate,
        showCompoundGateModal,
        //Set States & Refs
        setCodeView,
        handleCloseOptions,
        handleShowOptions,
        setGateClicked,
        setDraggingGate,
        setDraggingGateNode,
        showNewCompoundGateModal,
        showNoParamModal,
        //Refs
        svgRef, rectRef, draggingGate,
        imgRef, qubitCellRef, circleRef, pathRef,
        newCGNameRef, newCGDescRef, formRef,
        showCodeView,
    } = useCircuitBuilderViewModel();



    return (
        <div
            onClick={ (e) => { if(!newCompoundGateModal) {clearSelectedGates()}}}
            onKeyDown = { (e) => { handleKeyPress(e) } }
            onKeyUp = { (e) => { handleKeyPress(e) } }
            tabIndex = {-1}
            style={ {"outline" : "none", "overflow" : "scroll"} }
        >
            <Container fluid = {true} >
                <Row>
                    <Col sm ={1} style = {{"width" : "50px"}}>
                        <img
                            src = {menu}
                            onClick = { (e) => { e.stopPropagation(); handleShowOptions(); }}
                        />
                    </Col>
                    <Col>
                        <Row>
                            <div class="container-fluid overflow-hidden mt-4" className={styles.top}>
                                <GatesMenu
                                    setDraggingGate={setDraggingGate}
                                    setDraggingGateNode={setDraggingGateNode}
                                    stdGates = { gates }
                                    faveGates = { favGates }
                                    setLastClicked={setLastClicked}
                                    addToFavGates={addToFavGates}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div class="container text-center" className={styles.middle}>
                                <ContextMenuTrigger id="contextmenu">
                                    <CircuitGridUI
                                        addQubit={addQubit}
                                        currQBState={currQBState}
                                        handleChange={handleChange}
                                        handleClick={handleClick}
                                        setDraggingGate={setDraggingGate}
                                        setDraggingGateNode={setDraggingGateNode}
                                        startDrawRect = { startDrawRect }
                                        endDrawRect = { endDrawRect }
                                        drawRect = { drawRect }
                                        isDrawing = { isDrawing }
                                        svgRef = { svgRef }
                                        rectRef = { rectRef }
                                        draggingGate = {draggingGate}
                                        startDraggingGate = { startDraggingGate }
                                        imgRef = { imgRef }
                                        qubitCellRef = { qubitCellRef }
                                        circleRef = { circleRef }
                                        handleOnMouseDown = { handleOnMouseDown }
                                        handleOnMouseUp = { handleOnMouseUp }
                                        handleOnClick = { handleOnClick }
                                        pathRef = { pathRef }
                                        handleHover = { handleHover }
                                        circuitCode = { circuitCode }
                                        handleCloseOptions = { handleCloseOptions }
                                        showOptions = { showOptions }
                                        strongCompress={strongCompress}
                                        weakCompress={weakCompress}
                                    />
                                </ContextMenuTrigger>
                                <ContextMenu id="contextmenu" className = {contextStyles.ContextMenu}>
                                    {
                                        (index > 0) &&
                                        <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => { e.preventDefault(); e.stopPropagation();  undo() }} disabled = { !(index > 0)}>
                                        <span>Undo</span>
                                    </MenuItem>
                                    }
                                    {
                                        (index < lastIndex) &&
                                        <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => {e.preventDefault(); e.stopPropagation(); redo() }} disabled = {!(index < lastIndex)}>
                                        <span>Redo</span>
                                        </MenuItem>
                                    }
                                    <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => { e.stopPropagation(); deleteGate() }}>
                                        <span>Delete</span>
                                    </MenuItem>
                                    {
                                        gatesSelected.length > 1 &&
                                        <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => { e.preventDefault(); e.stopPropagation(); showNewCompoundGateModal(true)}}>
                                            <span>Make Compound Gate</span>
                                        </MenuItem>
                                    }
                                </ContextMenu>
                            </div >
                        </Row>
                    </Col>
                </Row>
            </Container>

                <Container fluid = { true } className={styles.optionsBar}>
                    <Row>
                        <Col md = {{span: 1, offset: 11}} >
                            <OptionsMenu
                                processCircuit = { processCircuit }
                                redo = { redo }
                                undo = { undo }
                                index = { index }
                                lastIndex = { lastIndex }
                                clearAllGates={clearAllGates}
                                circuitCode = { circuitCode }
                                showCodeView = { showCodeView }
                                setCodeView = { setCodeView }
                            />
                        </Col>

                        <Col>

                        </Col>
                    </Row>
                </Container>

            <ThetaModal
                thetaModal={thetaModal}
                updateThetaModal={updateThetaModal}
                gateClickedName={gateClickedName}
                gateClickedDesc={gateClickedDesc}
                gateClickedThetaVal={gateClickedThetaVal}
            />
            <NoParamModal
                gateClickedName={gateClickedName}
                gateClickedDesc={gateClickedDesc}
                noParamModal={noParamModal}
                showNoParamModal={showNoParamModal}
            />

            <MeasurementModal
                hasMeasure={hasMeasure}
                showMeasModal={showMeasModal}
            />

            <CompoundGateModal
                compoundGate = { compoundGate }
                showCompoundGateModal = { showCompoundGateModal }
                compoundGateModal = { compoundGateModal }
                gateClickedName={gateClickedName}
                gateClickedDesc={gateClickedDesc}
            />

            <NewCompoundGateModal
                newCompoundGateModal = { newCompoundGateModal }
                showNewCompoundGateModal = { showNewCompoundGateModal }
                newCGNameRef = { newCGNameRef }
                newCGDescRef = { newCGDescRef }
                makeCompoundGate = { makeCompoundGate }
                handleOnClick = { (e) => { e.preventDefault(); e.stopPropagation();}}
                formRef = { formRef }
            />

        <Offcanvas show={showOptions} onHide={handleCloseOptions} style = {{"width" : "12%"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>File</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Dropdown.Menu show style = {{"width" : "85%"}}>
                    <Dropdown.Item> Save </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item> Save as </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item> Open </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item> New </Dropdown.Item>
                </Dropdown.Menu>
            </Offcanvas.Body>
        </Offcanvas>
        </div>
    )
}
