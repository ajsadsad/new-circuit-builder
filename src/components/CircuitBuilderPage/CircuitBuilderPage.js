/**
 *  View of the quantum circuit that is made up of five different components.
 *  Options Menu, All Gates Menu, Circuit Code, Circuit Output, and all Modals required.
 *  Calls useCircuitBuilderViewModel to access and update states.
 */
import React from 'react';
import styles from './CircuitBuilder.module.scss';
import contextStyles from './ContextMenu.module.scss';
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu/AllGatesMenu';
import CircuitCode from '../CircuitBuilderUI/CircuitCode/CircuitCode';
import FaveGatesMenu from '../CircuitBuilderUI/FaveGatesMenu/FaveGatesMenu';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu/OptionsMenu';
import Output from '../CircuitBuilderUI/Output/Output';
import BottomPageTabs from '../CircuitBuilderUI/BottomPageTabs/BottomPageTabs';
import ReactiveCircuitBuilderUI from '../CircuitBuilderUI/CircuitBuilder/ReactiveCircuitBuilderUI';
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
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <OptionsMenu
                            optionsView={optionViewable} />
                    </div>
                    <div class="col-10">
                        <AllGatesMenu
                            optionsView={optionViewable}
                            faveGatesView={faveGatesViewable}
                            allGatesView={allGatesViewable}
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            gates={gates} />
                    </div>

                </div>


            </div>

            <ContextMenuTrigger id="contextmenu">
                <div class="container text-center">
                    <div class="row" draggable = { false }>
                        <div class="col" draggable = { false }>
                            <ReactiveCircuitBuilderUI
                                addQubit={addQubit}
                                setCBDimensions={setCBDimensions}
                                dimensions={circuitBuilderDimensions}
                                optionsView={optionViewable}
                                faveGatesView={faveGatesViewable}
                                codeView={circuitCodeViewable}
                                outputView={outputViewable}
                                allGatesView={allGatesViewable}
                                currQBState = { currQBState }
                                gateFromQubit={gateFromQubit}
                                handleChange={handleChange}
                                handleClick={handleClick}
                                setGateClicked={setGateClicked}
                                setDraggingGate = { setDraggingGate }
                                setDraggingGateNode = { setDraggingGateNode }
                            />

                        </div>
                        {/* <div class="col">
                            <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">

                                </button>
                            </p>
                            <div style={{ minHeight: 120 }}>
                                <div class="collapse collapse-horizontal" id="collapseWidthExample">
                                    <div class="card card-body" style={{ width: 300 }}>
                                        This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </ContextMenuTrigger>

            <ContextMenu id="contextmenu" className = {contextStyles.ContextMenu}>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { console.log("copy") }}>
                    <span>Copy</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { console.log("Undo") }}>
                    <span>Undo</span>
                </MenuItem>
                <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { console.log("Delete") }}>
                    <span>Delete</span>
                </MenuItem>
                {
                    gatesSelected.length > 1 &&
                    <MenuItem className={contextStyles.contextMenu__item} onClick={ () => { console.log("Compound!") }}>
                        <span>Make Compound Gate</span>
                    </MenuItem>
                }
            </ContextMenu>

            <ThetaModal
                thetaModal = { thetaModal }
                updateThetaModal = { updateThetaModal }
                gateClickedName = { gateClickedName }
                gateClickedDesc = { gateClickedDesc }
                updateSlider = { updateSlider }
                gateClickedThetaVal = { gateClickedThetaVal }
            />
            <NoParamModal
                gateClickedName = { gateClickedName }
                gateClickedDesc = { gateClickedDesc }
                noParamModal = { noParamModal }
                showNoParamModal = { showNoParamModal}
            />

            <MeasurementModal
                hasMeasure = { hasMeasure }
                showMeasModal = { showMeasModal}
            />

            <BottomPageTabs
                setOptionMenuView={ updateOptionView }
                optionsView = { optionViewable }
                setFaveGateView={ updateFaveGatesView }
                faveGatesView = { faveGatesViewable }
                setAllGatesView = { updateAllGatesMenuView }
                setCodeView =  { updateCircuitCodeView }
                setOutputView = { updateOutputView }
                processCircuit = { processCircuit }
                undo = { undo }
                redo = { redo }
                index = { index }
                lastIndex = { lastIndex }
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