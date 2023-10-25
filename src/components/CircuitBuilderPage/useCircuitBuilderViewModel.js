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
import { type } from '@testing-library/user-event/dist/type';

const useCircuitBuilderViewModel = () => {

    const [thetaModal, showThetaModal] = useState(false);
    const [gateClickedName, setGateClickedName] = useState();
    const [gateClickedDesc, setGateClickedDesc] = useState();
    const [gateClickedThetaVal, setGateClickedThetaVal] = useState();
    const [noParamModal, showNoParamModal] = useState(false);
    const [hasMeasure, showMeasModal] = useState(false);
    const [gatesSelected, setGatesSelected] = useState([]);
    const [circuitCode, setCircuitCode] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isDroppingCNOT, setIsDroppingCNOT] = useState({isDropping : false, row : 0, col : 0});

    const draggingGate = useRef(undefined);
    const draggingGateNode = useRef(undefined);
    const gateClicked = useRef({e : undefined, gateRow : undefined, gateCol : undefined});
    const svgRef = useRef(null);
    const rectRef = useRef(null);
    const startPts = useRef({x : 0, y : 0});
    const imgRef = useRef(null);
    const [favGates, setFavGates] = useState([]);

    const [lastClicked, setLastClicked] = useState(null);
    const qubitCellRef = useRef(Array.from({length: 8},()=> Array.from({length: 50}, () => {return ("")})));
    const timerRef = useRef(null);
    const isMouseDown = useRef(null);

    const { gates, sendCircuitData } = useCircuitBuilderModel();
    const { currQBState, setState, index, lastIndex, undo, redo } = useUndoRedoCBState(Array.from({length: 8},()=> Array.from({length: 50}, () => {return ({ hasGate : false, gate : null})})));


    function startPressTimer(e, gate) {
        isMouseDown.current = false;
        timerRef.current = setTimeout(() => {
            isMouseDown.current = true;
            startDraggingGate(e, gate)
        }, 100)
    }



    function addToFavGates() {
        if (!favGatesContains()) {
            setFavGates(state => [...state, lastClicked]);
        }
    }



    function favGatesContains() {
        for (let favGate of favGates) {
            if (JSON.stringify(favGate) === JSON.stringify(lastClicked)) {
                return true;
            }
        }
        return false;
    }






    function setDraggingGate(gate) {
        draggingGate.current = gate;
    }

    function setDraggingGateNode(e) {
        draggingGateNode.current = e;
    }

    function setGateClicked(e) {
        gateClicked.current = e.target;
    }

    function getQubitStateDeepCopy() {
        let copy = JSON.parse(JSON.stringify(currQBState));
        return copy;
    }

    function clearSelectedGates() {
        gatesSelected.forEach((g) => {
            g.e.setAttributeNS(null, "style", "stroke : none;");
        });
        setGatesSelected([]);
    }

    function handleOnMouseDown(e, gate) {
        startPressTimer(e, gate);
    }

    function handleOnMouseUp() {
        clearTimeout(timerRef.current);
    }

    function handleOnClick(e) {
        if(isMouseDown.current === false) {
            handleClick(e);
        }
    }

    function clearAllGates() {
        setState(Array.from({length: 4},()=> Array.from({length: 50}, () => {return ({ hasGate : false, gate : null})})));
    }

    function startDrawRect(e) {
        if(isDragging) {
            return;
        } else if(isDroppingCNOT.isDropping) {
            return;
        } else {
            startPts.current = ({x : e.clientX - e.currentTarget.getBoundingClientRect().left, y : e.clientY - e.currentTarget.getBoundingClientRect().top});
            rectRef.current.setAttributeNS(null, 'display', "block");
            setIsDrawing(true);
        }
    }

    function endDrawRect(e) {
        if(isDragging) {
            setIsDragging(false);
            handleChange(e);
            imgRef.current.setAttributeNS(null, "display", "none");
        } else if(isDroppingCNOT.isDropping) {
            let updatedGate = currQBState[isDroppingCNOT.row][isDroppingCNOT.col].gate;
            updatedGate.q_target = parseFloat(e.target.getAttributeNS(null, "row"));
            updatedGate.q_control = isDroppingCNOT.row;
            let targetLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
            let copy = addCnotPath(targetLocation);
            copy[targetLocation.row][targetLocation.col] = { hasGate : true, gate : { gateName : "cnot_target", img : "cnot_target.svg"}};
            setState(copy);
            setIsDroppingCNOT({ isDropping : false, row : 0, col : 0});
            let cnotCircle = svgRef.current.getElementById("cnotCircle:" + isDroppingCNOT.row + "." + isDroppingCNOT.col);
            let cnotLine = svgRef.current.getElementById("cnotLine:" + isDroppingCNOT.row + "." + isDroppingCNOT.col);
            svgRef.current.removeChild(cnotCircle);
            svgRef.current.removeChild(cnotLine);
        } else {
            let highlightedGates = [...gatesSelected];
            qubitCellRef.current.forEach((qRefRow) => {
                const b = rectRef.current.getBoundingClientRect();
                    qRefRow.forEach((qRefCol) => {
                        if(qRefCol) {
                            let a = qRefCol.getBoundingClientRect();
                            let row = qRefCol.getAttributeNS(null, "row");
                            let col = qRefCol.getAttributeNS(null, "col");
                            if(!(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width)) {
                                if(gatesSelected.filter( g => g.e === qRefCol).length > 0) {
                                    qRefCol.setAttributeNS(null, "style", "stroke : none;")
                                    highlightedGates = highlightedGates.filter((g) => g.e !== qRefCol)
                                } else {
                                    let gate = JSON.parse(qRefCol.getAttributeNS(null, "gate"));
                                    if(!(gate.gateName === "cnot_target" || gate.gateName === "cnot_path")) {
                                        qRefCol.setAttributeNS(null, "style", "stroke : black; stroke-width : 5");
                                        highlightedGates.push({ row : row, col : col, gate : gate, e : qRefCol});
                                    }
                                }
                            }
                        }
                    })
            })
            rectRef.current.setAttributeNS(null, 'display', "none");
            rectRef.current.setAttributeNS(null, 'x', "0");
            rectRef.current.setAttributeNS(null, 'y', "0");
            rectRef.current.setAttributeNS(null, 'width', "0");
            rectRef.current.setAttributeNS(null, 'height', "0");
            setGatesSelected(highlightedGates);
            setIsDrawing(false);
        }
    }

    function drawRect(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isDrawing) {
            const newMouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;
            const newMouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;

            if(newMouseX > startPts.current.x) {
                rectRef.current.setAttributeNS(null, 'x', startPts.current.x);
                rectRef.current.setAttributeNS(null, 'width', newMouseX - startPts.current.x);
            } else {
                rectRef.current.setAttributeNS(null, 'x', newMouseX);
                rectRef.current.setAttributeNS(null, 'width', startPts.current.x - newMouseX);
            }
            if(newMouseY > startPts.current.y) {
                rectRef.current.setAttributeNS(null, 'y', startPts.current.y);
                rectRef.current.setAttributeNS(null, 'height', newMouseY - startPts.current.y);
            } else {
                rectRef.current.setAttributeNS(null, 'y', newMouseY);
                rectRef.current.setAttributeNS(null, 'height', startPts.current.y - newMouseY);
            }
        } else if (isDragging) {
            const newMouseY = e.clientY - e.currentTarget.getBoundingClientRect().top
            const newMouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;

            imgRef.current.setAttributeNS(null,"x", newMouseX);
            imgRef.current.setAttributeNS(null,"y", newMouseY);
            imgRef.current.setAttributeNS(null, 'width', "38");
            imgRef.current.setAttributeNS(null, 'height', "38");
            imgRef.current.setAttributeNS(null, "href", `${draggingGateNode.current.target.getAttributeNS(null, "href")}`);
            imgRef.current.setAttributeNS(null, "display", "block");
        } else if (isDroppingCNOT.isDropping) {
            const newMouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;
            let cnotLine = svgRef.current.getElementById("cnotLine:" + isDroppingCNOT.row + "." + isDroppingCNOT.col);
            cnotLine.setAttributeNS(null, "y2", newMouseY);
            cnotLine.setAttributeNS(null, "style", "stroke : black; stroke-width : 5px;");

        }
    }

    function deleteGate() {
        let copy = getQubitStateDeepCopy();
        gatesSelected.forEach((gate) => {
            let qRef = qubitCellRef.current[gate.row][gate.col];
            qRef.setAttributeNS(null, "style", "stroke : none;");

            if(gate.gate.qid === "cnot") {
                if(gate.gate.q_target < gate.row) {
                    for(var i = gate.gate.q_target; i <= gate.row; i++) {
                        copy[i][gate.col] = { hasGate : false, gate : undefined }
                    }
                } else {
                    for(var i = gate.row; i <= gate.gate.q_target; i++) {
                        copy[i][gate.col] = { hasGate : false, gate : undefined }
                    }
                }
            }
            copy[gate.row][gate.col] = { hasGate : false , gate : undefined};
        })
        setGatesSelected([]);
        setState(copy);
    }

    function startDraggingGate(e, gate) {
        setIsDragging(true);
        setDraggingGate(gate);
        startPts.current = ({x : e.clientX - e.target.getBoundingClientRect().left, y : e.clientY - e.target.getBoundingClientRect().top});
        setDraggingGateNode(e);
    }

    function handleClick(e) {
        if(e.shiftKey) {
            let highlightedGates = [...gatesSelected];
            qubitCellRef.current.forEach((qRefRow) => {
                const b = e.target.getBoundingClientRect();
                    qRefRow.forEach((qRefCol) => {
                        if(qRefCol) {
                            let a = qRefCol.getBoundingClientRect();
                            let row = qRefCol.getAttributeNS(null, "row");
                            let col = qRefCol.getAttributeNS(null, "col");
                            if(!(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width)) {
                                if(gatesSelected.filter( g => g.e === qRefCol).length > 0) {
                                    qRefCol.setAttributeNS(null, "style", "stroke : none;")
                                    highlightedGates = highlightedGates.filter((g) => g.e !== qRefCol)
                                } else {
                                    let gate = JSON.parse(qRefCol.getAttributeNS(null, "gate"));
                                    if(gate.gate !== "cnot_target" && gate.gate !== "cnot_path") {
                                        qRefCol.setAttributeNS(null, "style", "stroke : black; stroke-width : 5");
                                        highlightedGates.push({ row : row, col : col, gate : gate, e : qRefCol});
                                    }
                                }
                            }
                        }
                    })
            })
            setGatesSelected(highlightedGates);
        } else {
            let gate = JSON.parse(e.target.getAttributeNS(null, "gate"));
            let gateLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
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

    function handleChange(e) {
        //if gate is being dragged from circuit
        if(isDragging) {
            if(draggingGate.current.qid === "cnot") {
                let gate = JSON.parse(draggingGateNode.current.target.getAttributeNS(null, "gate"));
                let gateCol = draggingGateNode.current.target.getAttributeNS(null, "col");
                let copy = getQubitStateDeepCopy();

                if(parseFloat(gate.q_target) < parseFloat(gate.q_control)) {
                    for(var i = parseFloat(gate.q_target); i <= parseFloat(gate.q_control); i++) {
                        console.log("test")
                        copy[i][gateCol] = { hasGate : false, gate : undefined }
                    }
                } else {
                    for(var i = parseFloat(gate.q_control); i <= gate.q_target; i++) {
                        copy[i][gateCol] = { hasGate : false, gate : undefined }
                    }
                }

                let newLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
                copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current };
                let midX = parseFloat(e.target.getAttributeNS(null, "x")) + 20;
                let midY = parseFloat(e.target.getAttributeNS(null, "y")) + 24;
                let row = e.target.getAttributeNS(null, "row");
                let col = e.target.getAttributeNS(null, "col")

                setIsDroppingCNOT({isDropping : true, row : row, col : col});
                createCnotSVGElements(row, col, midX, midY);
                setIsDragging(false);
                setState(copy);
            } else {
                let copy = getQubitStateDeepCopy();
                let originalLocation = {row : draggingGateNode.current.target.getAttributeNS(null, "row"), col : draggingGateNode.current.target.getAttributeNS(null, "col")};
                let newLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
                copy[originalLocation.row][originalLocation.col] = { hasGate : false, gate : null};
                copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current };
                setIsDragging(false);
                setState(copy);
            }
        } else {
            let gateLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
            if(draggingGate.current.qid === "cnot") {

                let midX = parseFloat(e.target.getAttributeNS(null, "x")) + 20;
                let midY = parseFloat(e.target.getAttributeNS(null, "y")) + 24;
                let row = e.target.getAttributeNS(null, "row");
                let col = e.target.getAttributeNS(null, "col")
                setIsDroppingCNOT({isDropping : true, row : row, col : col});
                createCnotSVGElements(row, col, midX, midY);
            }

            let copy = getQubitStateDeepCopy();
            copy[gateLocation.row][gateLocation.col] = { hasGate : true, gate : draggingGate.current};
            setState(copy);
        }
        draggingGateNode.current = null;
        draggingGate.current = null;
    }

    function addCnotPath(target) {
        let copy = getQubitStateDeepCopy();
        if(target.row > isDroppingCNOT.row ) {
            for(let i = parseFloat(isDroppingCNOT.row) + 1 ; i < parseFloat(target.row) ; ++i) {
                copy[i][target.col] =  { hasGate : true, gate : { gateName : "cnot_path", img : "cnot_path.svg"}};
            }
        } else {
            for(let i = parseFloat(target.row) + 1 ; i < parseFloat(isDroppingCNOT.row) ; ++i) {
                copy[i][target.col] =  { hasGate : true, gate : { gateName : "cnot_path", img : "cnot_path.svg"}};
            }
        }
        return copy;
    }


    // Adds SVG elements for the CNOT gate target and path to the SVG DOM
    function createCnotSVGElements(row, col, midX, midY) {

        const cnotLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const cnotCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cnotLine.setAttributeNS(null,"x1", midX);
        cnotLine.setAttributeNS(null,"y1", midY);
        cnotLine.setAttributeNS(null,"x2", midX);
        cnotLine.setAttributeNS(null,"y2", midY);
        cnotLine.setAttributeNS(null, "id", "cnotLine:" + row + "." + col);
        cnotLine.setAttributeNS(null, "pointer-events", "none");
        cnotCircle.setAttributeNS(null, "cx", midX);
        cnotCircle.setAttributeNS(null, "cy", midY);
        cnotCircle.setAttributeNS(null, "id", "cnotCircle:" + row + "." + col);
        cnotCircle.setAttributeNS(null, "pointer-events", "none");

        svgRef.current.appendChild(cnotLine);
        svgRef.current.appendChild(cnotCircle);
    }

    function updateThetaModal(value) {
        showThetaModal(false);
        let updatedGate = JSON.parse(gateClicked.current.getAttributeNS(null, "gate"));
        updatedGate.theta = parseFloat(value).toFixed(2);
        let copy = getQubitStateDeepCopy();
        copy[gateClicked.current.getAttributeNS(null, "row")][gateClicked.current.getAttributeNS(null, "col")] = { hasGate : true, gate : updatedGate};
        setState(copy);
        gateClicked.current = null;
    }

    function weakCompress() {
        let copy = getQubitStateDeepCopy();
        let lastEmptycolumn = null;
        let columnHasGate = false;

        for (let column in copy[0]) {
            if (column < 1) continue;
            for (let row in copy) {
                //Checks if column has a gate in it
                if (copy[row][column].hasGate) {
                    columnHasGate = true;
                }
            }
            //If column has no gate in it and lastEmpty column is null, make that column last empty column
            if (columnHasGate == false && lastEmptycolumn == null) {
                lastEmptycolumn = column;
            }

            if (columnHasGate == true && lastEmptycolumn == null) {
                columnHasGate = false;
            }
            //If column has a gate and lastEmptycolumn not null, swap that values of the current column, with that of the lastEmptyColumn
            if (columnHasGate == true && lastEmptycolumn != null) {
                for (let row in copy) {
                    //If the cell has a gate, change the contents of the cell to match the new location
                    if (copy[row][column].hasGate) {
                        copy[row][lastEmptycolumn] =  copy[row][column];
                        copy[row][column] = {hasGate: false, gate: null}
                    }
                }
                lastEmptycolumn++;
                columnHasGate = false;
            }
        }
        setState(copy);
    }

    function strongCompress() {
        let copy = getQubitStateDeepCopy();
        let lastEmptycolumn = null;
        let columnHasGate = false;

        for (let column in copy[0]) {
            if (column < 1) continue;
            for (let row in copy) {
                //Checks if column has a gate in it
                if (copy[row][column].hasGate) {
                    columnHasGate = true;
                }
            }
            //If column has no gate in it and lastEmpty column is null, make that column last empty column
            if (columnHasGate == false && lastEmptycolumn == null) {
                lastEmptycolumn = column;
            }

            if (columnHasGate == true && lastEmptycolumn == null) {
                columnHasGate = false;
            }
            //If column has a gate and lastEmptycolumn not null, swap that values of the current column, with that of the lastEmptyColumn
            if (columnHasGate == true && lastEmptycolumn != null) {
                for (let row in copy) {
                    //If the cell has a gate, change the contents of the cell to match the new location
                    if (copy[row][column].hasGate) {
                        copy[row][lastEmptycolumn] =  copy[row][column];
                        copy[row][column] = {hasGate: false, gate: null}
                    }
                }
                lastEmptycolumn++;
                columnHasGate = false;
            }
        }
        setState(copy);
    }

    function convertCircuit() {
        let vcode = [];
        let line = 6;
        let cregMeasure = 1;
        vcode.push("1: OPENQASM 2.0;\n", "2: include \"qelibl.inc\";\n", "3: qreg q[" + (currQBState.length-1) + "];\n", "4: creg c[" + (currQBState.length-1) + "];\n" + "5: ")
        currQBState.forEach((row, rowIndex) => row.map((v, i) => {
            if(v.hasGate) {
                if(v.gate.qid === 'xrot' || v.gate.qid === 'yrot' || v.gate.qid === 'zrot' ) {
                    vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "];\n")
                } else if(v.gate.id === 'cnot') {
                    vcode.push(line + ": " + v.gate.qasmid + " q[" + rowIndex + "];\n")
                } else if(v.gate.gateName === "cnot_path" || v.gate.gateNAme === "cnot_target") {
                    return;
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
            currQBState.forEach((row, rowIndex) => row.map((v, i) => {
                if(v.hasGate) {
                    if(v.gate.qid === 'xrot' || v.gate.qid === 'yrot' || v.gate.qid === 'zrot' ) {
                        json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex, 'theta' : v.gate.theta })
                    } else if(v.gate.qid === 'cnot') {
                        json.push({'operation' : 'gate', 'gate' : v.gate.qid, 'q' : rowIndex, 'q_control' : rowIndex, 'q_target' : v.gate.q_target})
                    } else if(v.gate.gateName === "cnot_path" || v.gate.gateNAme === "cnot_target") {
                        return;
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
        currQBState.forEach((row) => row.map((v, i) => {
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

            qubitCellRef.current.push(Array(currQBState[0].length));
            copy[currQBState.length].fill("");
        } else {
            alert("Cannot add more than 30 qubits");
        }
    }

    return {
        gates,
        draggingGateNode,
        draggingGate,
        thetaModal,
        noParamModal,
        hasMeasure,
        gateClickedName,
        gateClickedDesc,
        gateClicked,
        gateClickedThetaVal,
        gatesSelected,
        circuitCode,
        favGates,
        setCircuitCode,
        setGateClicked,
        deleteGate,
        clearSelectedGates,
        showMeasModal,
        showThetaModal,
        showNoParamModal,
        updateThetaModal,
        handleClick,
        addQubit,
        processCircuit,
        handleChange,
        setDraggingGate,
        setDraggingGateNode,
        convertCircuit,
        currQBState, setState, index, lastIndex, undo, redo,
        clearAllGates,
        strongCompress,
        weakCompress,
        startDrawRect, endDrawRect, drawRect, isDrawing, svgRef, rectRef, imgRef,
        startDraggingGate, qubitCellRef, handleOnMouseDown, handleOnMouseUp, handleOnClick,
        setLastClicked,
        addToFavGates,
    }

}
export default useCircuitBuilderViewModel;
