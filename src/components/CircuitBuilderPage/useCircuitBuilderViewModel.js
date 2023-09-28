import React, { useState, useEffect } from 'react'
import useCircuitBuilderModel from './useCircuitBuilderModel'
import styles from './CircuitBuilder.module.scss'
import AllGatesMenu from '../CircuitBuilderUI/AllGatesMenu/AllGatesMenu';

const useCircuitBuilderViewModel = () => {

    const [optionViewable, setOptionView] = useState(false);
    const [outputViewable, setOutputView] = useState(true);
    const [allGatesViewable, setAllGatesView] = useState(true);
    const [faveGatesViewable, setFaveGatesView] = useState(false);
    const [circuitCodeViewable, setCircuitCodeView] = useState(true);
    const [draggingGate, setDraggingGate] = useState(undefined);
    const [draggingGateNode, setDraggingGateNode] = useState("");
    const { gates } = useCircuitBuilderModel();

    const updateDraggingGate = (gate) => {
        setDraggingGate(gate);
    }

    const [standardGates, setStandardGates] = useState(gates.Gates.map((gate) => {
        return(
        <img
            className = { styles.GateImg }
            key = { gate.qid }
            gate = { gate }
            src = { require(`../../assets/${gate.img}`)}
            draggable = { true }
            onDragStart = {(e) => { setDraggingGateNode(e); updateDraggingGate(gate); }}
        />
    )}))

    // const standardGates = gates.Gates.map((gate) => {
    //         <img
    //             className = { styles.GateImg }
    //             key = { gate.qid }
    //             gate = { gate }
    //             src = { require(`../../assets/${gate.img}`)}
    //             draggable = { true }
    //             onDragStart = {(e) => { setDraggingGateNode(e.target.cloneNode()); setDraggingGate(gate)}}
    //         >
    //         </img>
    // });

    // let draggingGate = useRef("");
    // function setDraggingGate(gate) {
    //     draggingGate.current = gate;
    //     console.log("Dragging Gate useRef(): " + draggingGate.current.gateName);
    // }

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
        draggingGateNode,
        draggingGate,
        updateDraggingGate,
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        setDraggingGateNode,
        setDraggingGate,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    }
}

export default useCircuitBuilderViewModel;