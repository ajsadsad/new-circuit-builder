import React from 'react'
import styles from './CircuitBuilder.module.css';
import AllGatesMenu from './CircuitBuilderUI/AllGatesMenu';
import CircuitBuilder from './CircuitBuilderUI/CircuitBuilder';
import CircuitCode from './CircuitBuilderUI/CircuitCode';
import FaveGatesMenu from './CircuitBuilderUI/FaveGatesMenu';
import OptionsMenu from './CircuitBuilderUI/OptionsMenu';
import Output from './CircuitBuilderUI/Output';
import BottomPageTabs from './CircuitBuilderUI/BottomPageTabs';

export default function CircuitBuilderPage () {

    return (
        <div className = {styles.container}>
            <OptionsMenu/>
            <CircuitBuilder/>
            <Output/>
            <CircuitCode/>
            <FaveGatesMenu/>
            <AllGatesMenu/>
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