import React, { useState } from 'react'
import useCircuitBuilderModel from './useCircuitBuilderModel'
import styles from './CircuitBuilder.module.scss'

const useCircuitBuilderViewModel = () => {

    const [optionViewable, setOptionView] = useState(false);
    const [outputViewable, setOutputView] = useState(true);
    const [allGatesViewable, setAllGatesView] = useState(true);
    const [faveGatesViewable, setFaveGatesView] = useState(false);
    const [circuitCodeViewable, setCircuitCodeView] = useState(true);
    const [draggingGate, setDraggingGate] = useState("");

    const { gates } = useCircuitBuilderModel();

    const standardGates = gates.Gates.map(gate =>
            <img
                className = { styles.GateImg }
                key = { gate.qid }
                gate = { gate }
                src = { require(`../../assets/${gate.img}`)}
                draggable = { true }
                onDragStart = {(e) => { setDraggingGate(e.target.cloneNode()); }}
            >
            </img>
    );

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

    return {
        standardGates,
        draggingGate,
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        setDraggingGate,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    }
}

export default useCircuitBuilderViewModel;