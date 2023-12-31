import React from 'react';
import styles from '../css/CircuitBuilder.module.css';
import contextStyles from '../css/ContextMenu.module.css';
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu';
import FaveGatesMenu from '../CircuitBuilderUI/FaveGatesMenu';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu';
import CircuitGridUI from '../CircuitBuilderUI/CircuitGridUI';
import useCircuitBuilderViewModel from './useCircuitBuilderViewModel';
import ThetaModal from '../Modals/ThetaModal'
import NoParamModal from '../Modals/NoParamModal';
import MeasurementModal from '../Modals/MeasurementModal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { clear } from '@testing-library/user-event/dist/clear';
import CompoundGateModal from '../Modals/CompoundGateModal';
import NewCompoundGateModal from '../Modals/NewCompoundGateModal';
import GatesMenu from '../CircuitBuilderUI/GatesMenu';

export default function CircuitBuilderPage () {

    const {
        gates,
        gateFromQubit,
        gateClickedName,
        gateClickedDesc,
        thetaModal,
        noParamModal,
        hasMeasure,
        setGateClicked,
        gateClickedThetaVal,
        gatesSelected,
        favGates,
        deleteGate,
        clearSelectedGates,
        showMeasModal,
        setDraggingGate,
        setDraggingGateNode,
        showNoParamModal,
        updateThetaModal,
        addQubit,
        processCircuit,
        handleChange,
        handleClick,
        circuitCode,
        currQBState, index, lastIndex, undo, redo,
        startDrawRect, endDrawRect, drawRect, isDrawing, svgRef, rectRef, draggingGate,
        Box, Container,
        startDraggingGate, imgRef, qubitCellRef, thetaModalRef,
        clearAllGates,
        weakCompress,
        strongCompress,
        setLastClicked,
        addToFavGates,
        lineRef, circleRef, pathRef, handleOnMouseDown, handleOnMouseUp, handleOnClick,
        makeCompoundGate, compoundGate, showCompoundGateModal, compoundGateModal, handleKeyPress,
        handleHover,
        newCompoundGateModal, showNewCompoundGateModal, newCGNameRef, newCGDescRef, formRef, showCodeView, setCodeView, showOptions, handleCloseOptions, handleShowOptions
    } = useCircuitBuilderViewModel();



    return (
        <div
            onClick={ (e) => { if(!newCompoundGateModal) {clearSelectedGates()}}}
            onKeyDown = { (e) => { handleKeyPress(e) } }
            onKeyUp = { (e) => { handleKeyPress(e) } }
            tabIndex = {-1}
            style={ {"outline" : "none"} }
        >
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

            <div className={styles.optionsBar}>
                    <OptionsMenu
                        processCircuit = { processCircuit }
                        redo = { redo }
                        undo = { undo }
                        index = { index }
                        lastIndex = { lastIndex }
                        clearAllGates={clearAllGates}
                        strongCompress={strongCompress}
                        weakCompress={weakCompress}
                        circuitCode = { circuitCode }
                        showCodeView = { showCodeView }
                        setCodeView = { setCodeView }
                    />
            </div>

            <div class="container text-center" className={styles.middle}>
                <ContextMenuTrigger id="contextmenu">
                    <CircuitGridUI
                            addQubit={addQubit}
                            currQBState={currQBState}
                            gateFromQubit={gateFromQubit}
                            handleChange={handleChange}
                            handleClick={handleClick}
                            setGateClicked={setGateClicked}
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            startDrawRect = { startDrawRect }
                            endDrawRect = { endDrawRect }
                            drawRect = { drawRect }
                            isDrawing = { isDrawing }
                            svgRef = { svgRef }
                            rectRef = { rectRef }
                            draggingGate = {draggingGate}
                            Box = { Box }
                            Container = { Container }
                            startDraggingGate = { startDraggingGate }
                            imgRef = { imgRef }
                            qubitCellRef = { qubitCellRef }
                            lineRef = { lineRef }
                            circleRef = { circleRef }
                            handleOnMouseDown = { handleOnMouseDown }
                            handleOnMouseUp = { handleOnMouseUp }
                            handleOnClick = { handleOnClick }
                            pathRef = { pathRef }
                            handleHover = { handleHover }
                            circuitCode = { circuitCode }
                            handleCloseOptions = { handleCloseOptions }
                            handleShowOptions = { handleShowOptions }
                            showOptions = { showOptions  }
                        />
                </ContextMenuTrigger>
            </div >

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

            <ThetaModal
                thetaModal={thetaModal}
                updateThetaModal={updateThetaModal}
                gateClickedName={gateClickedName}
                gateClickedDesc={gateClickedDesc}
                gateClickedThetaVal={gateClickedThetaVal}
                thetaModalRef = { thetaModalRef }
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
        </div>
    )
}
