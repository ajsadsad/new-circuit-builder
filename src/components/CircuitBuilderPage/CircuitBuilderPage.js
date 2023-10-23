import React from 'react';
import styles from '../css/CircuitBuilder.module.css';
import contextStyles from '../css/ContextMenu.module.css';
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu';
import CircuitCode from '../CircuitBuilderUI/CircuitCode';
import FaveGatesMenu from '../CircuitBuilderUI/FaveGatesMenu';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu';
import Output from '../CircuitBuilderUI/Output';
import ReactiveCircuitBuilderUI from '../CircuitBuilderUI/ReactiveCircuitBuilderUI';
import useCircuitBuilderViewModel from './useCircuitBuilderViewModel';
import ThetaModal from '../Modals/ThetaModal'
import NoParamModal from '../Modals/NoParamModal';
import MeasurementModal from '../Modals/MeasurementModal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { clear } from '@testing-library/user-event/dist/clear';

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
        setCircuitCode,
        convertCircuit,
        currQBState, index, lastIndex, undo, redo,
        startDrawRect, endDrawRect, drawRect, isDrawing, svgRef, rectRef, draggingGate,
        Box, Container,
        startDraggingGate, imgRef, qubitCellRef, thetaModalRef,
        clearAllGates,
        compress,
        setLastClicked,
        addToFavGates,
        lineRef, circleRef, handleOnMouseDown, handleOnMouseUp, handleOnClick
    } = useCircuitBuilderViewModel();



    return (
        <div onClick={ (e) => { if(e.button === 0) {clearSelectedGates()}}}>
            <div class="container-fluid overflow-hidden mt-4" className={styles.top}>
                <div class="row gx-0 gy-3 ">
                    <div class="col-12">
                        <AllGatesMenu
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            gates={gates}
                            setLastClicked={setLastClicked}
                            addToFavGates={addToFavGates}
                        />
                    </div>
                    <div class="col-12">
                        <FaveGatesMenu
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            gates={favGates}

                        />
                    </div>
                    <CircuitCode
                        currQBState = { currQBState }
                        convertCircuit = { convertCircuit }
                        circuitCode = { circuitCode }
                        setCircuitCode = { setCircuitCode }
                    />
                    {/* <div class="col-6">
                        <FaveGatesMenu
                            faveGatesView={faveGatesViewable}
                            setFaveGateView={updateFaveGatesView}
                        />
                    </div> */}
                </div>
            </div>

            <div class="container text-center" className={styles.middle}>
                <ContextMenuTrigger id="contextmenu" style = {"padding-left : 25%"}>
                    <ReactiveCircuitBuilderUI
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
                        />
                </ContextMenuTrigger>
            </div >

            <div className={styles.optionsBar}>
                    <OptionsMenu
                        processCircuit = { processCircuit }
                        redo = { redo }
                        undo = { undo }
                        index = { index }
                        lastIndex = { lastIndex }
                        clearAllGates={clearAllGates}
                        compress={compress}
                    />
            </div>
            <ContextMenu id="contextmenu" className = {contextStyles.ContextMenu}>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => { e.stopPropagation();  undo() }} disabled = { !(index > 0)}>
                    <span>Undo</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => {e.stopPropagation(); redo() }} disabled = {!index < lastIndex}>
                    <span>Redo</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ (e) => { e.stopPropagation(); deleteGate() }}>
                    <span>Delete</span>
                </MenuItem>
                {
                    gatesSelected.length > 1 &&
                    <MenuItem className={contextStyles.contextMenu__item} onClick={() => { console.log("Compound!") }}>
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
        </div>
    )
}
