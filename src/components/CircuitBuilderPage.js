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
            />
            <CircuitCode
                codeView = { circuitCodeViewable }
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

/* maybe use a switch to add elements to the css to address the UI needs.
   For example:
    IF we hide output we would add elements to Circuit Builder and Code css.
        grid-row: span 2;
    So that it takes up the space that Output took up.
*/

/*
 instead of stuff being made up of divs you can use components and hide and show components.

 Probably would still have to use CSS to show and hide stuff.
*/

/*
    When adding stuff to the circuit it doesn't really matter until you have to export it.
    Maybe just wait to do backend stuff when user wants to run the circuit
*/