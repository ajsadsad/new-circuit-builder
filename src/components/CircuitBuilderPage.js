import React, {useState} from 'react';

import styles from './CircuitBuilder.module.css';
import AllGatesMenu from './CircuitBuilderUI/AllGatesMenu/AllGatesMenu';
import CircuitBuilder from './CircuitBuilderUI/CircuitBuilder/CircuitBuilder';
import CircuitCode from './CircuitBuilderUI/CircuitCode/CircuitCode';
import FaveGatesMenu from './CircuitBuilderUI/FaveGatesMenu/FaveGatesMenu';
import OptionsMenu from './CircuitBuilderUI/OptionsMenu/OptionsMenu';
import Output from './CircuitBuilderUI/Output/Output';
import BottomPageTabs from './CircuitBuilderUI/BottomPageTabs/BottomPageTabs';

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

    function updateFaveGatesView() {
        setFaveGatesView(!faveGatesViewable)
        if(!faveGatesViewable) {
            setOptionView(false);
        };
    }

    function updateOutputView() {
        setOutputView(!outputViewable);
    }

    function updateCodeConsoleView() {
        setCircuitCodeView(!circuitCodeViewable);
    }

    function updateAllGatesView() {
        setAllGatesView(!allGatesViewable);
    }

    return (
        <div className = { styles.container }>
            <OptionsMenu
                setView = { updateOptionView }
            />
            <CircuitBuilder
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
                codeView = { circuitCodeViewable }
                outputView = { outputViewable }
                allGatesMenuView = { allGatesViewable }
            />
            <Output
                setView = { updateOutputView }
            />
            <CircuitCode
                setCodeView = { updateCodeConsoleView }
            />
            <FaveGatesMenu
                setFaveView = { updateFaveGatesView }
            />
            <AllGatesMenu
                setView = { updateAllGatesView }
                optionsView = { optionViewable }
                faveGatesView = { faveGatesViewable }
            />
            <BottomPageTabs/>
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