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
    const [draggingGateNode, setDraggingGateNode] = useState(undefined);
    const [gateFromQubit, setGateFromQubit] = useState(false);
    const [circuitBuilderDimensions, setCBDimensions] = useState({width : 0, height : 0});
    const [qubitStates, setQubitOp] = useState(Array.from({length: 3},()=> Array.from({length: 18}, () => {return ({ hasGate : false, gate : null})})))

    const { gates, sendCircuitData } = useCircuitBuilderModel();

    function handleChange(e) {
        e.preventDefault();

        //if gate is being dragged from circuit
        if(gateFromQubit) {
            let copy = [...qubitStates];
            copy[draggingGateNode.target.parentElement.parentElement.id][draggingGateNode.target.parentElement.id] = { hasGate : false, gate : null};
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate };
            e.target.appendChild(draggingGateNode.target);
            setGateFromQubit(!gateFromQubit);
        } else {
            let copy = [...qubitStates];
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate };
            setQubitOp(copy);
            e.target.appendChild(draggingGateNode.target.cloneNode());
        }
        console.log(qubitStates);
    }

    function moveGateFromQubit(e) {
        setDraggingGateNode(e);
        setDraggingGate(JSON.parse(e.target.getAttribute("gate")));
        let copy = [...qubitStates];
        copy[e.target.parentNode.parentNode.id][e.target.parentNode.id] = { hasGate : false, gate : null};
        setQubitOp(copy);
        setGateFromQubit(!gateFromQubit);
    }

    function updateDraggingGate(gate) {
        setDraggingGate(gate);
    }

    const standardGates = gates.Gates.map((gate) => {
        return(
        <img
            className = { styles.GateImg }
            key = { gate.qid }
            gate = { JSON.stringify(gate) }
            src = { require(`../../assets/${gate.img}`)}
            draggable = { true }
            onDragStart = {(e) => { setDraggingGateNode(e); updateDraggingGate(gate); }}
        />
    )});

    // The docs say that the quokka is fed this with a bunch of JSON files so it might not have to be one big JSON file.
    function processCircuit() {
        let json = [];
        json.push({'operation' : 'create_circuit', 'num_qubits' : qubitStates.length});
        qubitStates.map((row, rowIndex) => row.map((v, i) => {
            if(v.hasGate) {
                json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex })
            }
        }));
        json.push({'operation' : 'destroy_circuit'});
        sendCircuitData(json);
    }

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
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        qubitStates,
        gateFromQubit,
        circuitBuilderDimensions,
        processCircuit,
        setCBDimensions,
        handleChange,
        moveGateFromQubit,
        updateDraggingGate,
        setDraggingGateNode,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    }
}

export default useCircuitBuilderViewModel;