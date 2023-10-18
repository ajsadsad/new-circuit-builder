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
import { useState, useRef, useEffect, createElement } from 'react'
import useCircuitBuilderModel from './useCircuitBuilderModel'
import useUndoRedoCBState from '../Hooks/useUndoRedoCBState'
import styles from '../css/CircuitBuilder.module.css';
import { type } from '@testing-library/user-event/dist/type';

const useCircuitBuilderViewModel = () => {

    const { gates, sendCircuitData } = useCircuitBuilderModel();

    const [optionViewable, setOptionView] = useState(false);
    const [outputViewable, setOutputView] = useState(true);
    const [allGatesViewable, setAllGatesView] = useState(true);
    const [faveGatesViewable, setFaveGatesView] = useState(false);
    const [circuitCodeViewable, setCircuitCodeView] = useState(true);
    const [thetaModal, showThetaModal] = useState(false);
    const [gateClickedName, setGateClickedName] = useState();
    const [gateClickedDesc, setGateClickedDesc] = useState();
    const [gateClickedThetaVal, setGateClickedThetaVal] = useState();
    const [noParamModal, showNoParamModal] = useState(false);
    const [hasMeasure, showMeasModal] = useState(false);
    const [gatesSelected, setGatesSelected] = useState([]);
    const [circuitCode, setCircuitCode] = useState([]);
    const { currQBState, setState, index, lastIndex, undo, redo } = useUndoRedoCBState(Array.from({length: 4},()=> Array.from({length: 18}, () => {return ({ hasGate : false, gate : null})})));
    const draggingGate = useRef(undefined);
    const draggingGateNode = useRef(undefined);
    const gateClicked = useRef({e : undefined, gateRow : undefined, gateCol : undefined});
    const svgRef = useRef(null);
    const rectRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const startPts = useRef({x : 0, y : 0});
    const imgRef = useRef(null);
    const qubitCellRef = useRef(Array.from({length: 4},()=> Array.from({length: 18}, () => {return ("")})));

    function setDraggingGate(gate) {
        draggingGate.current = gate;
    }

    function setDraggingGateNode(e) {
        draggingGateNode.current = e;
    }

    function setGateClicked(e, row, col) {
        gateClicked.current = {e : e, gateRow : row, gateCol : col};
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

    function startDrawRect(e) {
        e.preventDefault();
        e.stopPropagation();
        if(isDragging) {
            return;
        } else {
            startPts.current = ({x : e.clientX - e.currentTarget.getBoundingClientRect().left, y : e.clientY - e.currentTarget.getBoundingClientRect().top});
            // rectRef.current.style.left = "0px";
            // rectRef.current.style.width = "0px";
            // rectRef.current.style.top = "0px";
            // rectRef.current.style.height = "0px";
            // rectRef.current.style.display = "block";
            // rect.current = svgRef.current.createSVGRect();
            // rect.current.x = 0;
            // rect.current.y = 0;
            // rect.current.width = 0;
            // rect.current.height = 0;

            rectRef.current.setAttributeNS(null, 'x', "0");
            rectRef.current.setAttributeNS(null, 'y', "0");
            rectRef.current.setAttributeNS(null, 'width', "0");
            rectRef.current.setAttributeNS(null, 'height', "0");
            rectRef.current.setAttributeNS(null, 'display', "block");
            setIsDrawing(true);
        }
    }

    function endDrawRect(e) {
        if(isDragging) {
            setIsDragging(false);
            handleChange(e);
            imgRef.current.setAttributeNS(null, "display", "none");
        } else {
            // rectRef.current.setAttributeNS(null, 'x', "0");
            // rectRef.current.setAttributeNS(null, 'y', "0");
            // rectRef.current.setAttributeNS(null, 'width', "0");
            // rectRef.current.setAttributeNS(null, 'height', "0");
            qubitCellRef.current.map((qRefRow, rowIndex) => {
                const b = rectRef.current.getBoundingClientRect();
                    qRefRow.map((qRefCol, colIndex) => {
                        if(qRefCol) {
                            let a = qRefCol.getBoundingClientRect();
                            if(!(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width)) {
                                let gateLocation = getGateLocation(qRefCol.id);
                                if((gatesSelected.filter( g => g.row === gateLocation.row && g.col === gateLocation.col)).length > 0) {
                                    qRefCol.setAttributeNS(null, "class", `${styles.GateImg}`);
                                    let copy = gatesSelected.filter(g => g.row !== gateLocation.row || g.col !== gateLocation.col);
                                    setGatesSelected(copy);
                                } else {
                                    let gate = JSON.parse(qRefCol.getAttributeNS(null, "gate"));
                                    let copy = [...gatesSelected];
                                    copy.push({ row : gateLocation.row, col : gateLocation.col, gate : gate, e : qRefCol});
                                    setGatesSelected(copy);
                                }
                            }
                        }
                    })
            })
            rectRef.current.setAttributeNS(null, 'display', "none");
            console.log(gatesSelected);
            setIsDrawing(false);
        }
    }

    function drawRect(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isDrawing) {
            const newMouseY = e.clientY - e.currentTarget.getBoundingClientRect().top
            const newMouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;

            const rectWidth = Math.abs(newMouseX - startPts.current.x);
            const rectHeight = Math.abs(newMouseY - startPts.current.y);

            rectRef.current.setAttributeNS(null, 'x', startPts.current.x);
            rectRef.current.setAttributeNS(null, 'y', startPts.current.y);
            rectRef.current.setAttributeNS(null, 'width', rectWidth);
            rectRef.current.setAttributeNS(null, 'height', rectHeight);


            // rect.current.x = startPts.current.x;
            // rect.current.y = startPts.current.y;
            // rect.current.width = rectWidth;
            // rect.current.height = rectHeight;

            // if(newMouseX > startPts.current.x) {
            //     rectRef.current.style.left = startPts.current.x + "px";
            //     rectRef.current.style.width = newMouseX - startPts.current.x + "px";
            // } else {
            //     rectRef.current.style.left = newMouseX + "px";
            //     rectRef.current.style.width = startPts.current.x  - newMouseX + "px";
            // }

            // if(newMouseY > startPts.current.y) {
            //     rectRef.current.style.top = startPts.current.y + "px";
            //     rectRef.current.style.height = newMouseY - startPts.current.y + "px";
            // } else {
            //     rectRef.current.style.top = newMouseY + "px";
            //     rectRef.current.style.height = startPts.current.y - newMouseY + "px";
            // }

            // const a = qubitCellRef.current.getBoundingClientRect();
            // const b = rectRef.current.getBoundingClientRect();
            // if( !(a.y + a.height < b.y ||
            //     a.y > b.y + b.height ||
            //     a.x + a.width < b.x ||
            //     a.x > b.x + b.width)) {
            //     console.log("Hello")
            //     let rowIndex = qubitCellRef.current.parentNode.parentNode.id
            //     let colIndex = qubitCellRef.current.parentNode.id
            //     if(gatesSelected.filter( g => g.row === rowIndex && g.col === colIndex).length > 0) {
            //         qubitCellRef.current.setAttribute("class", `${styles.GateImg}`);
            //         let copy = gatesSelected.filter(g => g.row !== rowIndex || g.col !== colIndex);
            //         setGatesSelected(copy);
            //     } else {
            //         qubitCellRef.current.setAttribute("class", `${styles.GateImgSelected}`);
            //         let gate = JSON.parse(qubitCellRef.current.getAttribute("gate"));
            //         let copy = [...gatesSelected];
            //         copy.push({ row : rowIndex, col : colIndex, gate : gate, e : qubitCellRef.current });
            //         setGatesSelected(copy);
            //     }
            // }
        } else if (isDragging) {
            const newMouseY = e.clientY - e.currentTarget.getBoundingClientRect().top
            const newMouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;

            imgRef.current.setAttributeNS(null,"x", newMouseX);
            imgRef.current.setAttributeNS(null,"y", newMouseY);
            imgRef.current.setAttributeNS(null, 'width', "38");
            imgRef.current.setAttributeNS(null, 'height', "38");
            imgRef.current.setAttributeNS(null, "href", `${draggingGateNode.current.target.getAttributeNS(null, "href")}`);
            imgRef.current.setAttributeNS(null, "display", "block");
        }
    }

    function deleteGate() {
        console.log(gatesSelected);
        let copy = getQubitStateDeepCopy();
        gatesSelected.map((gate) => {
            copy[gate.row][gate.col] = { hasGate : false , gate : undefined};
        })
        setState(copy);
    }

    // Need to change this as it won't be able to slice rows with 2 digits.
    function getGateLocation(id) {
        return ({ row : id.slice(0, 1), col : id.slice(2) })
    }

    function startDraggingGate(e) {
        setIsDragging(true);
        startPts.current = ({x : e.clientX - e.target.getBoundingClientRect().left, y : e.clientY - e.target.getBoundingClientRect().top});
        setDraggingGateNode(e);
    }

    // function handleClick(e) {
    //     if(e.shiftKey) {
    //         let rowIndex = e.currentTarget.parentNode.parentNode.id
    //         let colIndex = e.currentTarget.parentNode.id
    //         if(gatesSelected.filter( g => g.row === rowIndex && g.col === colIndex).length > 0) {
    //             e.target.setAttribute("class", `${styles.GateImg}`);
    //             let copy = gatesSelected.filter(g => g.row !== rowIndex || g.col !== colIndex);
    //             setGatesSelected(copy);
    //         } else {
    //             e.target.setAttribute("class", `${styles.GateImgSelected}`);
    //             let gate = JSON.parse(e.target.getAttribute("gate"));
    //             let copy = [...gatesSelected];
    //             copy.push({ row : rowIndex, col : colIndex, gate : gate, e : e.target });
    //             setGatesSelected(copy);
    //         }
    //     } else {
    //         let gate = JSON.parse(e.target.getAttribute("gate"));
    //         setGateClickedName(gate.gateName);
    //         setGateClickedDesc(gate.description);
    //         setGateClickedThetaVal(gate.theta);
    //         setGateClicked(e);
    //         if(e.target.id === 'xrot' || e.target.id === 'yrot' || e.target.id === 'zrot') {
    //             showThetaModal(true);
    //         } else {
    //             showNoParamModal(true);
    //         }
    //     }
    // }

    // function handleChange(e) {
    //     //if gate is being dragged from circuit
    //     if(draggingGateNode.current.target.getAttribute("inqubit") === "true") {
    //         let copy = getQubitStateDeepCopy();
    //         copy[draggingGateNode.current.target.parentElement.parentElement.id][draggingGateNode.current.target.parentElement.id] = { hasGate : false, gate : null};
    //         copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate.current };
    //         setState(copy);
    //     } else {
    //         let copy = getQubitStateDeepCopy();
    //         copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate.current};
    //         setState(copy);
    //     }
    // }

    // function updateThetaModal(value) {
    //     showThetaModal(false);
    //     let updatedGate = JSON.parse(gateClicked.current.target.getAttribute("gate"));
    //     updatedGate.theta = value;
    //     let copy = getQubitStateDeepCopy();
    //     copy[gateClicked.current.target.parentNode.parentNode.id][gateClicked.current.target.parentNode.id] = { hasGate : true, gate : updatedGate};
    //     setState(copy);
    // }
    function handleClick(e) {
        if(e.shiftKey) {
            let gateLocation = getGateLocation(e.target.id);
            if(gatesSelected.filter( g => g.row === gateLocation.row && g.col === gateLocation.col).length > 0) {
                e.target.setAttribute("class", `${styles.GateImg}`);
                let copy = gatesSelected.filter(g => g.row !== gateLocation.row || g.col !== gateLocation.col);
                setGatesSelected(copy);
            } else {
                e.target.setAttribute("class", `${styles.GateImgSelected}`);
                let gate = JSON.parse(e.target.getAttributeNS(null, "gate"));
                let copy = [...gatesSelected];
                copy.push({ row : gateLocation.row, col : gateLocation.col, gate : gate, e : e.target });
                setGatesSelected(copy);
            }
        } else {
            let gate = JSON.parse(e.target.getAttribute("gate"));
            let gateLocation = getGateLocation(e.target.id);
            setGateClickedName(gate.gateName);
            setGateClickedDesc(gate.description);
            setGateClickedThetaVal(gate.theta);
            setGateClicked(e, gateLocation.row, gateLocation.col);
            if(gate.qid === 'xrot' || gate.qid === 'yrot' || gate.qid === 'zrot') {
                showThetaModal(true);
            } else {
                showNoParamModal(true);
            }
        }
    }

    //might have to put a useRef for each column to change the qubit inside and not have an extra rectangle element inside or have the img populate outside of the <g> </g> tag.
    function handleChange(e) {
        //if gate is being dragged from circuit
        if(isDragging) {
            let copy = getQubitStateDeepCopy();
            let originalLocation = getGateLocation(draggingGateNode.current.target.id);
            let newLocation = getGateLocation(e.target.id);
            copy[originalLocation.row][originalLocation.col] = { hasGate : false, gate : null};
            copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current };
            setState(copy);
        } else {
            let gateLocation = getGateLocation(e.target.id);
            let copy = getQubitStateDeepCopy();
            copy[gateLocation.row][gateLocation.col] = { hasGate : true, gate : draggingGate.current};
            setState(copy);
        }
        draggingGate.current = null;
        draggingGateNode.current = null;
    }

    function updateThetaModal(value) {
        showThetaModal(false);
        let updatedGate = JSON.parse(gateClicked.current.e.target.getAttribute("gate"));
        updatedGate.theta = value;
        let copy = getQubitStateDeepCopy();
        copy[gateClicked.current.gateRow][gateClicked.current.gateCol] = { hasGate : true, gate : updatedGate};
        setState(copy);
    }

    function updateSlider(value) {
        const val = document.querySelector("#theta");
        val.textContent = value;
    }

    function convertCircuit() {
        let vcode = [];
        let line = 6;
        let cregMeasure = 1;
        vcode.push("1: OPENQASM 2.0;\n", "2: include \"qelibl.inc\";\n", "3: qreg q[" + (currQBState.length-1) + "];\n", "4: creg c[" + (currQBState.length-1) + "];\n" + "5: ")
        currQBState.map((row, rowIndex) => row.map((v, i) => {
            if(v.hasGate) {
                if(v.gate.qid === 'xrot' || v.gate.qid === 'yrot' || v.gate.qid === 'zrot' ) {
                    vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "];\n")
                } else if(v.gate.id === 'cnot') {
                    vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "];\n")
                } else {
                    if(v.gate.qid === 'measure') {
                        vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "] -> c[" + cregMeasure + "];\n")
                        cregMeasure += 1;
                    }
                    else {
                        vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "];\n")
                    }
                }
                line++;
            }
        }));
        return vcode;
    }

    function processCircuit() {
        let json = [];
        if(checkMeasurementGate()) {
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
            }));
            json.push({'operation' : 'destroy_circuit'});
            sendCircuitData(json);
            return json
        } else {showMeasModal(true)};
    }

    function checkMeasurementGate() {
        let hasMeasure = false;
        currQBState.map((row, rowIndex) => row.map((v, i) => {
            if(v.hasGate) {
                if(v.gate.qid === 'measure') {
                    hasMeasure = true;
                }
            }
        }));
        return hasMeasure
    }

    function addQubit() {
        if(currQBState.length < 31) {
            let copy = getQubitStateDeepCopy();
            copy.push(Array(currQBState[0].length));
            copy[currQBState.length].fill({hasGate : false, gate : null});
            setState(copy);

            qubitCellRef.push(Array(currQBState[0].length));
            copy[currQBState.length].fill("");
        } else {
            alert("Cannot add more than 30 qubits");
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
        thetaModal,
        noParamModal,
        hasMeasure,
        gateClickedName,
        gateClickedDesc,
        gateClicked,
        gateClickedThetaVal,
        gatesSelected,
        circuitCode,
        setCircuitCode,
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
        handleChange,
        setDraggingGate,
        setDraggingGateNode,
        updateOptionView,
        updateOutputView,
        updateAllGatesMenuView,
        updateFaveGatesView,
        updateCircuitCodeView,
        convertCircuit,
        currQBState, setState, index, lastIndex, undo, redo,
        startDrawRect, endDrawRect, drawRect, isDrawing, svgRef, rectRef, imgRef,
        startDraggingGate, qubitCellRef,
    }
}
export default useCircuitBuilderViewModel;
