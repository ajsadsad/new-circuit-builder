import React, { useState } from 'react';

import styles from './CircuitBuilder.module.css';
import AllGatesMenu from './CircuitBuilderUI/AllGatesMenu/AllGatesMenu';
import CircuitCode from './CircuitBuilderUI/CircuitCode/CircuitCode';
import FaveGatesMenu from './CircuitBuilderUI/FaveGatesMenu/FaveGatesMenu';
import OptionsMenu from './CircuitBuilderUI/OptionsMenu/OptionsMenu';
import Output from './CircuitBuilderUI/Output/Output';
import BottomPageTabs from './CircuitBuilderUI/BottomPageTabs/BottomPageTabs';
import ReactiveCircuitBuilderUI from './CircuitBuilderUI/CircuitBuilder/ReactiveCircuitBuilderUI';

export default function CircuitBuilderPage () {

    const [optionViewable, setOptionView] = useState(false);
    const [outputViewable, setOutputView] = useState(true);
    const [allGatesViewable, setAllGatesView] = useState(true);
    const [faveGatesViewable, setFaveGatesView] = useState(false);
    const [circuitCodeViewable, setCircuitCodeView] = useState(true);


    //  If option menu is opened then faveMenu has to be closed. Same way the other way round.
    function updateOptionView() {
        setOptionView(!optionViewable);
        if(!optionViewable) {
            setFaveGatesView(false);
        }
    }

    function updateOutputView() {
        setOutputView(!outputViewable);
    }

    function updateAllGatesMenuView() {
        setAllGatesView(!allGatesViewable);
    }

    function updateFaveGatesView() {
        setFaveGatesView(!faveGatesViewable)
        if(!faveGatesViewable) {
            setOptionView(false);
        };
    }

    function updateCircuitCodeView() {
        setCircuitCodeView(!circuitCodeViewable);
    }

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
            />
            <AllGatesMenu
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
                allGatesView = { allGatesViewable }
            />
            <BottomPageTabs
                setOptionMenuView={ updateOptionView }
                setFaveGateView={ updateFaveGatesView }
                setAllGatesView = { updateAllGatesMenuView }
                setCodeView =  { updateCircuitCodeView }
                setOutputView = { updateOutputView }
            />
        </div>
    )
}