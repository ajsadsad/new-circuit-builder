/**
 * Receives updates from Circuit Builder Page components and updates Circuit Builder Page components based on update.
 * @function handleClick - called when gate is clicked within a qubit. On click it parses the string stored within gate attribute of the image back into a JSON object and gateClickedName and gateClickedDesc is set to gate that was clicked. If gate is a gate that holds a theta value the modal shown is one where theta can be adjusted, otherwise normal modal with gate name and desc is displayed.
 *  @param {event} e - onClick event when gate is clicked within circuit grid.
 *
 * @function handleChange - triggered by onDrop event for when gate is dropped into the circuit. Differentiates if gate is being moved from menu or from circuit based on gateFromQubitState. Location of where gate is dropped is dervied based on event object passed into function. e.target.parentElement.parentElemtn.parentElement.id returns the row of the qubit and e.target.parentElement.id returns the column.
 *  @param {event} e - onDrop event when gate is dropped within the circuit.
 *
 * @function moveGateFromQubit - triggered by on dragStart event that is generated within qubit cell element. Updates gateFromQubit to be tue and updates current object stored in qubitStates to represent that there is no longer a gate.
 *  @param {event} e - onDragStart event when gate is dragged from within the circuit grid.
 *
 * @function updateSlider - triggered by onChange event within ThetaModal when slider is moved to represent theta value of gate. Theta value of gate is then updated within qubitStates array.
 * @param {number} value - value that slider is currently at.
 *
 */
import { useState, useRef, useMemo} from 'react'
import useCircuitBuilderModel from './useCircuitBuilderModel'
import useUndoRedoCBState from '../Hooks/useUndoRedoCBState'
import styles from '../css/CircuitBuilder.module.css';

const useCircuitBuilderViewModel = () => {

    const { gates, sendCircuitData } = useCircuitBuilderModel();

    const [optionViewable, setOptionView] = useState(false);
    const [outputViewable, setOutputView] = useState(true);
    const [allGatesViewable, setAllGatesView] = useState(true);
    const [faveGatesViewable, setFaveGatesView] = useState(false);
    const [circuitCodeViewable, setCircuitCodeView] = useState(true);
    const draggingGate = useRef(undefined);
    const draggingGateNode = useRef(undefined);
    const gateClicked = useRef(undefined);
    const [circuitBuilderDimensions, setCBDimensions] = useState({width : 0, height : 0});
    const [thetaModal, showThetaModal] = useState(false);
    const [gateClickedName, setGateClickedName] = useState();
    const [gateClickedDesc, setGateClickedDesc] = useState();
    const [gateClickedThetaVal, setGateClickedThetaVal] = useState();
    const [noParamModal, showNoParamModal] = useState(false);
    const [hasMeasure, showMeasModal] = useState(false);

    const { currQBState, setState, index, lastIndex, undo, redo } = useUndoRedoCBState(Array.from({length: 4},()=> Array.from({length: 18}, () => {return ({ hasGate : false, gate : null})})));

    const [gatesSelected, setGatesSelected] = useState([]);

    function setDraggingGate(gate) {
        draggingGate.current = gate;
    }

    function setDraggingGateNode(e) {
        draggingGateNode.current = e;
    }

    function setGateClicked(e) {
        gateClicked.current = e;
    }

    function getQubitStateDeepCopy() {
        let copy = JSON.parse(JSON.stringify(currQBState));
        return copy;
    }

    function clearSelectedGates() {
        gatesSelected.map((g) => {
            g.e.setAttribute("class", `${styles.GateImg}`);
        });
        setGatesSelected([]);
    }

    function deleteGate() {
        let copy = getQubitStateDeepCopy();
        gatesSelected.map((gate) => {
            copy[gate.row][gate.col] = { hasGate : false , gate : undefined};
        })
        setState(copy);
    }

    function handleClick(e) {
        if(e.shiftKey) {
            let rowIndex = e.currentTarget.parentNode.parentNode.id
            let colIndex = e.currentTarget.parentNode.id
            if(gatesSelected.filter( g => g.row === rowIndex && g.col === colIndex).length > 0) {
                e.target.setAttribute("class", `${styles.GateImg}`);
                let copy = gatesSelected.filter(g => g.row !== rowIndex || g.col !== colIndex);
                setGatesSelected(copy);
            } else {
                e.target.setAttribute("class", `${styles.GateImgSelected}`);
                let gate = JSON.parse(e.target.getAttribute("gate"));
                let copy = [...gatesSelected];
                copy.push({ row : rowIndex, col : colIndex, gate : gate, e : e.target });
                setGatesSelected(copy);
            }
        } else {
            let gate = JSON.parse(e.target.getAttribute("gate"));
            setGateClickedName(gate.gateName);
            setGateClickedDesc(gate.description);
            setGateClickedThetaVal(gate.theta);
            setGateClicked(e);
            if(e.target.id === 'xrot' || e.target.id === 'yrot' || e.target.id === 'zrot') {
                showThetaModal(true);
            } else {
                showNoParamModal(true);
            }
        }
    }

    function handleChange(e) {
        //if gate is being dragged from circuit
        if(draggingGateNode.current.target.getAttribute("inqubit") === "true") {
            let copy = getQubitStateDeepCopy();
            copy[draggingGateNode.current.target.parentElement.parentElement.id][draggingGateNode.current.target.parentElement.id] = { hasGate : false, gate : null};
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate.current };
            setState(copy);
        } else {
            let copy = getQubitStateDeepCopy();
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate.current};
            setState(copy);
        }
    }

    function updateSlider(value) {
        const val = document.querySelector("#theta");
        val.textContent = value;
    }

    function updateThetaModal(value) {
        showThetaModal(false);
        let updatedGate = JSON.parse(gateClicked.current.target.getAttribute("gate"));
        updatedGate.theta = value;
        let copy = getQubitStateDeepCopy();
        copy[gateClicked.current.target.parentNode.parentNode.id][gateClicked.current.target.parentNode.id] = { hasGate : true, gate : updatedGate};
        setState(copy);
    }

    function processCircuit() {
        if(checkMeasurementGate()) {
            let json = [];
            json.push({'operation' : 'create_circuit', 'num_qubits' : currQBState.length});
            currQBState.map((row, rowIndex) => row.map((v, i) => {
                if(v.hasGate) {
                    if(v.gate.qid === 'xrot' || v.gate.qid === 'yrot' || v.gate.qid === 'zrot' ) {
                        json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex, 'theta' : v.gate.theta })
                    } else if(v.gate.id === 'cnot') {
                        json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex, 'q_control' : v.gate.q_control, 'q_target' : v.gate.q_target})
                    } else {
                        json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex })
                    }
                }
                return json
            }));
            json.push({'operation' : 'destroy_circuit'});
            sendCircuitData(json);
        } else {showMeasModal(true)};
    }

    function checkMeasurementGate() {
        let hasMeasure = false;
        currQBState.map((row, rowIndex) => row.map((v, i) => {
            if(v.hasGate) {
                if(v.gate.qid === 'measure') {
                    console.log("hasGate")
                    hasMeasure = true;
                }
            }
        }));
        return hasMeasure
    }

    function addQubit() {
        if(currQBState.length < 33) {
            let copy = getQubitStateDeepCopy();
            copy.push(Array(currQBState[0].length));
            copy[currQBState.length].fill({hasGate : false, gate : null});
            setState(copy);
            console.log(currQBState);
        } else {
            alert("Cannot add more than 32 qubits");
        }
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
        gates,
        draggingGateNode,
        draggingGate,
        optionViewable,
        outputViewable,
        allGatesViewable,
        faveGatesViewable,
        circuitCodeViewable,
        circuitBuilderDimensions,
        thetaModal,
        noParamModal,
        hasMeasure,
        gateClickedName,
        gateClickedDesc,
        gateClicked,
        gateClickedThetaVal,
        gatesSelected,
        deleteGate,
        clearSelectedGates,
        showMeasModal,
        showThetaModal,
        showNoParamModal,
        updateSlider,
        updateThetaModal,
        handleClick,
        addQubit,
        processCircuit,
        setCBDimensions,
        handleChange,
        setDraggingGate,
        setDraggingGateNode,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView,
        currQBState, setState, index, lastIndex, undo, redo
    }
}
export default useCircuitBuilderViewModel;