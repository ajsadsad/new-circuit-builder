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

export default function CircuitBuilderPage () {

    const {
        gates,
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        gateFromQubit,
        circuitBuilderDimensions,
        gateClickedName,
        gateClickedDesc,
        thetaModal,
        noParamModal,
        hasMeasure,
        setGateClicked,
        gateClickedThetaVal,
        gatesSelected,
        deleteGate,
        clearSelectedGates,
        showMeasModal,
        setDraggingGate,
        setDraggingGateNode,
        showNoParamModal,
        updateSlider,
        updateThetaModal,
        addQubit,
        processCircuit,
        setCBDimensions,
        handleChange,
        handleClick,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView, currQBState, setState, index, lastIndex, undo, redo
    } = useCircuitBuilderViewModel();



    return (
        <div onClick={(e) => { clearSelectedGates() }}>
            <div class="container-fluid overflow-hidden mt-4" className={styles.top}>
                <div class="row gx-0 gy-3 ">
                    <div class="col-12">
                        <AllGatesMenu
                            optionsView={optionViewable}
                            faveGatesView={faveGatesViewable}
                            allGatesView={allGatesViewable}
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            gates={gates} />
                    </div>
                    {/* <div class="col-6">
                        <FaveGatesMenu
                            faveGatesView={faveGatesViewable}
                            setFaveGateView={updateFaveGatesView}
                        />
                    </div> */}
                </div>
            </div>

            <div >
                <ContextMenuTrigger id="contextmenu" className={styles.middle}>
                    <div class="container text-center" className={styles.middle}>
                        <div class="row" draggable={false} className = {styles.row}>
                            <div class="col" draggable={false}>
                                <ReactiveCircuitBuilderUI
                                    addQubit={addQubit}
                                    setCBDimensions={setCBDimensions}
                                    dimensions={circuitBuilderDimensions}
                                    optionsView={optionViewable}
                                    faveGatesView={faveGatesViewable}
                                    codeView={circuitCodeViewable}
                                    outputView={outputViewable}
                                    allGatesView={allGatesViewable}
                                    currQBState={currQBState}
                                    gateFromQubit={gateFromQubit}
                                    handleChange={handleChange}
                                    handleClick={handleClick}
                                    setGateClicked={setGateClicked}
                                    setDraggingGate={setDraggingGate}
                                    setDraggingGateNode={setDraggingGateNode}
                                />
                            </div>
                        </div>
                    </div >
                    <div className={styles.optionsBar}>
                        <OptionsMenu
                            processCircuit = { processCircuit }
                            redo = { redo }
                            undo = { undo }
                            index = { index }
                            lastIndex = { lastIndex }
                        />
                    </div>
                </ContextMenuTrigger>
            </div>

            <ContextMenu id="contextmenu" className = {contextStyles.ContextMenu}>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { undo() }} disabled = { !(index > 0)}>
                    <span>Undo</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { redo() }} disabled = {!index < lastIndex}>
                    <span>Redo</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { deleteGate() }}>
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
                updateSlider={updateSlider}
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


            {/*
            // <OptionsMenu
            // optionsView = { optionViewable }
            // />
            //     <Output
            //         outputView = { outputViewable }
            //         codeView = { circuitCodeViewable }
            //         faveGatesView = { faveGatesViewable }
            //         optionsView = { optionViewable }
            //     />
                // <CircuitCode
                //     codeView = { circuitCodeViewable }
                //     faveGatesView = { faveGatesViewable }
                //     allGatesView = { allGatesViewable }
                // />
            //     <FaveGatesMenu
            //         faveGatesView = { faveGatesViewable }
            //         setFaveGateView={ updateFaveGatesView }
            //     />
                //  <AllGatesMenu
                //     optionsView = { optionViewable }
                //     faveGatesView = { faveGatesViewable }
                //     allGatesView = { allGatesViewable }
                //     setDraggingGate = { setDraggingGate }
                //     setDraggingGateNode = { setDraggingGateNode }
                //     gates = { gates }
                // />
            */}

        </div>
    )
}