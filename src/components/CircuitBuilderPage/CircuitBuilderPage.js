import React from 'react';
import styles from './CircuitBuilder.module.scss';
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

export default function CircuitBuilderPage () {

    const {
        standardGates,
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
        showNoParamModal,
        updateSlider,
        showThetaModal,
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
        <div className = { styles.container }>
            <OptionsMenu
            optionsView = { optionViewable }
            />
            <ReactiveCircuitBuilderUI
                addQubit = { addQubit }
                setCBDimensions = { setCBDimensions }
                dimensions = { circuitBuilderDimensions }
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
                codeView = { circuitCodeViewable }
                outputView = { outputViewable }
                allGatesView = { allGatesViewable }
                qubitStates = { qubitStates }
                gateFromQubit = { gateFromQubit }
                handleChange = { handleChange }
                moveGateFromQubit = { moveGateFromQubit }
                handleClick = { handleClick }
                setGateClicked = { setGateClicked }
            />
            <ThetaModal
                    thetaModal = { thetaModal }
                    showThetaModal = { showThetaModal }
                    gateClickedName = { gateClickedName }
                    gateClickedDesc = { gateClickedDesc }
                    updateSlider = { updateSlider }
            />
            <NoParamModal
                    gateClickedName = { gateClickedName }
                    gateClickedDesc = { gateClickedDesc }
                    noParamModal = { noParamModal }
                    showNoParamModal = { showNoParamModal}
            />
            <Output
                outputView = { outputViewable }
                codeView = { circuitCodeViewable }
                faveGatesView = { faveGatesViewable }
                optionsView = { optionViewable }
            />
            <CircuitCode
                codeView = { circuitCodeViewable }
                faveGatesView = { faveGatesViewable }
                allGatesView = { allGatesViewable }
            />
            <FaveGatesMenu
                faveGatesView = { faveGatesViewable }
                setFaveGateView={ updateFaveGatesView }
            />
             <AllGatesMenu
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
                allGatesView = { allGatesViewable }
                standardGates = { standardGates }
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
            />
        </div>
    )
}