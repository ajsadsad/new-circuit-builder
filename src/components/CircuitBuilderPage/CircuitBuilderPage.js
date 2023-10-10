/**
 *  View of the quantum circuit that is made up of five different components.
 *  Options Menu, All Gates Menu, Circuit Code, Circuit Output, and all Modals required.
 *  Calls useCircuitBuilderViewModel to access and update states.
 */
import React from 'react';
import styles from '../css/CircuitBuilder.module.css';
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu';
import CircuitCode from '../CircuitBuilderUI/CircuitCode';
import FaveGatesMenu from '../CircuitBuilderUI/FaveGatesMenu';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu';
import Output from '../CircuitBuilderUI/Output';
import BottomPageTabs from '../CircuitBuilderUI/BottomPageTabs';
import ReactiveCircuitBuilderUI from '../CircuitBuilderUI/ReactiveCircuitBuilderUI';
import useCircuitBuilderViewModel from './useCircuitBuilderViewModel';
import ThetaModal from '../Modals/ThetaModal'
import NoParamModal from '../Modals/NoParamModal';

export default function CircuitBuilderPage () {

    const {
        gates,
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        qubitStates,
        gateFromQubit,
        circuitBuilderDimensions,
        gateClickedName,
        gateClickedDesc,
        thetaModal,
        noParamModal,
        setGateClicked,
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
        moveGateFromQubit,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    } = useCircuitBuilderViewModel();



    return (
        <div  className={styles.main}>
 



            <div class="container-fluid overflow-hidden mt-4">
                <div class="row gx-0 gy-3 ">
                    

                    <div class="col-6">
                        <AllGatesMenu
                            optionsView={optionViewable}
                            faveGatesView={faveGatesViewable}
                            allGatesView={allGatesViewable}
                            setDraggingGate={setDraggingGate}
                            setDraggingGateNode={setDraggingGateNode}
                            gates={gates} />
                    </div>
                    <div class="col-6">
                        <FaveGatesMenu
                            faveGatesView={faveGatesViewable}
                            setFaveGateView={updateFaveGatesView}
                        />
                    </div>




                    <div class="col-12" >

                        <ReactiveCircuitBuilderUI
                            addQubit={addQubit}
                            setCBDimensions={setCBDimensions}
                            dimensions={circuitBuilderDimensions}
                            optionsView={optionViewable}
                            faveGatesView={faveGatesViewable}
                            codeView={circuitCodeViewable}
                            outputView={outputViewable}
                            allGatesView={allGatesViewable}
                            qubitStates={qubitStates}
                            gateFromQubit={gateFromQubit}
                            handleChange={handleChange}
                            moveGateFromQubit={moveGateFromQubit}
                            handleClick={handleClick}
                            setGateClicked={setGateClicked}
                        />
                        <ThetaModal
                            thetaModal={thetaModal}
                            updateThetaModal={updateThetaModal}
                            gateClickedName={gateClickedName}
                            gateClickedDesc={gateClickedDesc}
                            updateSlider={updateSlider}
                        />
                        <NoParamModal
                            gateClickedName={gateClickedName}
                            gateClickedDesc={gateClickedDesc}
                            noParamModal={noParamModal}
                            showNoParamModal={showNoParamModal}
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

        </div>
       

        
        
        // <div className = { styles.container }>
            // <OptionsMenu
            // optionsView = { optionViewable }
            // />
            // <ReactiveCircuitBuilderUI
            //     addQubit = { addQubit }
            //     setCBDimensions = { setCBDimensions }
            //     dimensions = { circuitBuilderDimensions }
            //     optionsView = { optionViewable }
            //     faveGatesView = { faveGatesViewable }
            //     codeView = { circuitCodeViewable }
            //     outputView = { outputViewable }
            //     allGatesView = { allGatesViewable }
            //     qubitStates = { qubitStates }
            //     gateFromQubit = { gateFromQubit }
            //     handleChange = { handleChange }
            //     moveGateFromQubit = { moveGateFromQubit }
            //     handleClick = { handleClick }
            //     setGateClicked = { setGateClicked }
            // />
            // <ThetaModal
            //     thetaModal = { thetaModal }
            //     updateThetaModal = { updateThetaModal }
            //     gateClickedName = { gateClickedName }
            //     gateClickedDesc = { gateClickedDesc }
            //     updateSlider = { updateSlider }
            // />
            // <NoParamModal
            //     gateClickedName = { gateClickedName }
            //     gateClickedDesc = { gateClickedDesc }
            //     noParamModal = { noParamModal }
            //     showNoParamModal = { showNoParamModal}
            // />
            // <Output
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
            // <FaveGatesMenu
            //     faveGatesView = { faveGatesViewable }
            //     setFaveGateView={ updateFaveGatesView }
            // />
            //  <AllGatesMenu
            //     optionsView = { optionViewable }
            //     faveGatesView = { faveGatesViewable }
            //     allGatesView = { allGatesViewable }
            //     setDraggingGate = { setDraggingGate }
            //     setDraggingGateNode = { setDraggingGateNode }
            //     gates = { gates }
            // />
        //     <BottomPageTabs
        //         setOptionMenuView={ updateOptionView }
        //         optionsView = { optionViewable }
        //         setFaveGateView={ updateFaveGatesView }
        //         faveGatesView = { faveGatesViewable }
        //         setAllGatesView = { updateAllGatesMenuView }
        //         setCodeView =  { updateCircuitCodeView }
        //         setOutputView = { updateOutputView }
        //         processCircuit = { processCircuit }
        //     />
        // </div>
    )
}