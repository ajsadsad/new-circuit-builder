import React from 'react';
import styles from './CircuitBuilder.module.scss';
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu/AllGatesMenu';
import CircuitCode from '../CircuitBuilderUI/CircuitCode/CircuitCode';
import FaveGatesMenu from '../CircuitBuilderUI/FaveGatesMenu/FaveGatesMenu';
import OptionsMenu from '../CircuitBuilderUI/OptionsMenu/OptionsMenu';
import Output from '../CircuitBuilderUI/Output/Output';
import BottomPageTabs from '../CircuitBuilderUI/BottomPageTabs/BottomPageTabs';
import ReactiveCircuitBuilderUI from '../CircuitBuilderUI/CircuitBuilder/ReactiveCircuitBuilderUI';
import useCircuitBuilderViewController from './useCircuitBuilderViewController';

export default function CircuitBuilderPage () {

    const {
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    } = useCircuitBuilderViewController();

    return (
        <div className = { styles.container }>
            <OptionsMenu
                optionsView = { optionViewable }
            />
            <ReactiveCircuitBuilderUI
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
                codeView = { circuitCodeViewable }
                outputView = { outputViewable }
                allGatesView = { allGatesViewable }
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
            />
            <BottomPageTabs
                setOptionMenuView={ updateOptionView }
                optionsView = { optionViewable }
                setFaveGateView={ updateFaveGatesView }
                faveGatesView = { faveGatesViewable }
                setAllGatesView = { updateAllGatesMenuView }
                setCodeView =  { updateCircuitCodeView }
                setOutputView = { updateOutputView }
            />
        </div>
    )
}