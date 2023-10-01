import { useState } from 'react'
import useCircuitBuilderModel from './useCircuitBuilderModel'

const useCircuitBuilderViewModel = () => {

    const { gates, sendCircuitData } = useCircuitBuilderModel();

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
    const [thetaModal, showThetaModal] = useState(false);
    const [gateClickedName, setGateClickedName] = useState();
    const [gateClickedDesc, setGateClickedDesc] = useState();
    const [gateClicked, setGateClicked] = useState(undefined);
    const [noParamModal, showNoParamModal] = useState(false);

    function handleClick(e) {
        let gate = JSON.parse(e.target.getAttribute("gate"));
        setGateClickedName(gate.gateName);
        setGateClickedDesc(gate.description);
        setGateClicked(e);
        if(e.target.id === 'xrot' || e.target.id === 'yrot' || e.target.id === 'zrot') {
            showThetaModal(true);
        } else {
            showNoParamModal(true);
        }
    }

    function handleChange(e) {
        //if gate is being dragged from circuit
        if(gateFromQubit) {
            let copy = [...qubitStates];
            copy[draggingGateNode.target.parentElement.parentElement.id][draggingGateNode.target.parentElement.id] = { hasGate : false, gate : null};
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate };
            e.target.appendChild(draggingGateNode.target);
            setGateFromQubit(!gateFromQubit);
        } else {
            let copy = [...qubitStates];
            copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate};
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

    function updateSlider(value) {
        const val = document.querySelector("#theta");
        val.textContent = value;
        let updateGate = JSON.parse(gateClicked.target.getAttribute("gate"));
        updateGate.theta = value;
        let copy = [...qubitStates];
        copy[gateClicked.target.parentNode.parentNode.id][gateClicked.target.parentNode.id] = { hasGate : true, gate : updateGate};
        setQubitOp(copy);
    }

    function updateThetaModal() {
        showThetaModal(false);
    }
    // The docs say that the quokka is fed this with a bunch of JSON files so it might not have to be one big JSON file.
    // Can maybe pass the operation down as a prop into this function instead.
    function processCircuit() {
        let json = [];
        json.push({'operation' : 'create_circuit', 'num_qubits' : qubitStates.length});
        qubitStates.map((row, rowIndex) => row.map((v, i) => {
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
    }

    function addQubit() {
        if(qubitStates.length < 33) {
            let copy = [...qubitStates];
            copy.push(Array(qubitStates[0].length));
            copy[qubitStates.length].fill({hasGate : false, gate : null});
            setQubitOp(copy);
            console.log(qubitStates);
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
        qubitStates,
        gateFromQubit,
        circuitBuilderDimensions,
        thetaModal,
        noParamModal,
        gateClickedName,
        gateClickedDesc,
        gateClicked,
        showThetaModal,
        showNoParamModal,
        updateSlider,
        updateThetaModal,
        handleClick,
        addQubit,
        processCircuit,
        setCBDimensions,
        handleChange,
        moveGateFromQubit,
        setDraggingGate,
        setDraggingGateNode,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView
    }
}
export default useCircuitBuilderViewModel;