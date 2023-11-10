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
    const [compoundGateModal, showCompoundGateModal] = useState(false);
    const [compoundGate, setCompoundGateClicked] = useState();
    const [favGates, setFavGates] = useState([]);
    const [lastClicked, setLastClicked] = useState(null);
    const [newCompoundGateModal, showNewCompoundGateModal] = useState(false);

    const draggingGate = useRef(undefined);
    const draggingGateNode = useRef(undefined);
    const gateClicked = useRef({e : undefined, gateRow : undefined, gateCol : undefined});
    const svgRef = useRef(null);
    const rectRef = useRef(null);
    const startPts = useRef({x : 0, y : 0});
    const imgRef = useRef(null);
    const keysPressed = useRef(new Map());
    const circleRef  = useRef(null);
    const pathRef = useRef(null);
    const qubitCellRef = useRef(Array.from({length: 8},()=> Array.from({length: 50}, () => {return ("")})));
    const timerRef = useRef(null);
    const isMouseDown = useRef(null);
    const newCGNameRef = useRef(null);
    const newCGDescRef = useRef(null);
    const formRef = useRef(null);

    const { gates, sendCircuitData } = useCircuitBuilderModel();
    const { currQBState, setState, index, lastIndex, undo, redo } = useUndoRedoCBState(Array.from({length: 8},()=> Array.from({length: 50}, () => {return ({ hasGate : false, gate : null})})));

    useEffect(()=>{convertCircuit()},[currQBState]);

    function setKeysPressed(e, key) {
        if(e.type === "keydown") {
            keysPressed.current.set(key, true);
        } else if (e.type === "keyup") {
            keysPressed.current.set(key, false);
        }
    }

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
            g.e.setAttributeNS(null, "style", "stroke : none; fill : none");
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

    function handleHover(e) {
        if(e.type === "dragover") {
            if(draggingGate.current.qid === "compound_gate") {
                let compoundGateSize = parseInt(draggingGate.current.location.tail - draggingGate.current.location.head);
                for(var i = 0; i <= compoundGateSize; i++) {
                    let compoundGateArea = svgRef.current.getElementById((parseInt(e.target.getAttributeNS(null, "row")) + i) + "." + e.target.getAttributeNS(null, "col"));
                    compoundGateArea.setAttributeNS(null, "style", "fill : #5aa4ff; opacity : 0.25");
                }
            } else {
                e.target.setAttributeNS(null, "style", "fill : #5aa4ff; opacity : 0.25");
            }
        } else if (e.type === "dragleave") {
            if(draggingGate.current.qid === "compound_gate") {
                let compoundGateSize = parseInt(draggingGate.current.location.tail - draggingGate.current.location.head);
                for(var i = 0; i <= compoundGateSize; i++) {
                    let compoundGateArea = svgRef.current.getElementById((parseInt(e.target.getAttributeNS(null, "row")) + i) + "." + e.target.getAttributeNS(null, "col"));
                    compoundGateArea.setAttributeNS(null, "style", "fill: white; z-index: 1; opacity: 0;");
                }
            } else {
                e.target.setAttributeNS(null, "style", "fill: white; z-index: 1; opacity: 0;");
            }
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
            if(e.target.getAttributeNS(null, "col") !== isDroppingCNOT.col) {
                alert("Target column must be equal to control column");
            } else {
                let updatedGate = currQBState[isDroppingCNOT.row][isDroppingCNOT.col].gate;
                updatedGate.q_target = parseFloat(e.target.getAttributeNS(null, "row"));
                updatedGate.q_control = isDroppingCNOT.row;
                let targetLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
                if(canAddCNot(targetLocation)) {
                    let copy = addCnotPath(targetLocation);
                    copy[targetLocation.row][targetLocation.col] = { hasGate : true, gate : { gateName : "cnot_target", img : "cnot_target.svg", q_control : isDroppingCNOT.row, q_target : targetLocation.row}};
                    setState(copy);
                    setIsDroppingCNOT({ isDropping : false, row : 0, col : 0});
                    pathRef.current.setAttributeNS(null, 'display', "none");
                    circleRef.current.setAttributeNS(null, "display", "none");
                } else {
                    alert("No other gates must be present between control and target");
                    setIsDroppingCNOT({ isDropping : false, row : 0, col : 0});
                }
            }
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
                                    qRefCol.setAttributeNS(null, "style", "stroke : none; fill : none");
                                    highlightedGates = highlightedGates.filter((g) => g.e !== qRefCol);
                                } else {
                                    let gate = JSON.parse(qRefCol.getAttributeNS(null, "gate"));
                                    if(!(gate.gateName === "cnot_target" || gate.gateName === "cnot_path")) {
                                        qRefCol.setAttributeNS(null, "style", "stroke : #5aa4ff; stroke-width : 5; fill : none");
                                        highlightedGates.push({ row : row, col : col, gate : gate, e : qRefCol});
                                    }
                                }
                            }
                        }
                    })
            })
            let compoundGateIndex = -1;
            highlightedGates.forEach((gate, index) => {
                if(gate.gate.qid === "compound_gate") {
                    compoundGateIndex = index;
                }
            })

            if(compoundGateIndex > 0) {
                let compGate = highlightedGates[compoundGateIndex];
                for(let i = compGate.gate.location.head; i <= compGate.gate.location.tail; i++) {
                    qubitCellRef.current[i][compGate.col].setAttributeNS(null, "style", "stroke : #5aa4ff; stroke-width : 5; fill : none");
                    highlightedGates.push({row : i, col : compGate.col, gate : compGate, e : qubitCellRef.current[i][compGate.col]});
                }
            }

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
            rectRef.current.setAttributeNS(null, 'rx', "4");
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
            pathRef.current.setAttributeNS(null, 'display', "block");
            circleRef.current.setAttributeNS(null, "display", "bock");
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
                    for(let i = gate.gate.q_target; i <= gate.row; i++) {
                        copy[i][gate.col] = { hasGate : false, gate : undefined }
                    }
                } else {
                    for(let i = gate.row; i <= gate.gate.q_target; i++) {
                        copy[i][gate.col] = { hasGate : false, gate : undefined }
                    }
                }
            } else if(gate.gate.qid === "measure") {
                removeMeasureGate({row : gate.row, col : gate.col})
            } else {
                copy[gate.row][gate.col] = { hasGate : false , gate : undefined};
            }
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
                                    qRefCol.setAttributeNS(null, "style", "stroke : none; fill : none;")
                                    highlightedGates = highlightedGates.filter((g) => g.e !== qRefCol)
                                } else {
                                    let gate = JSON.parse(qRefCol.getAttributeNS(null, "gate"));
                                    if(gate.gate !== "cnot_target" && gate.gate !== "cnot_path") {
                                        qRefCol.setAttributeNS(null, "style", "stroke : #5aa4ff; stroke-width : 5; fill : none");
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
            } else if(gate.qid === "compound_gate"){
                let compoundGateGates = Array.from({length: Math.floor(gate.gates.length)},()=> Array.from({length: gate.gates.length}, () => {return (undefined)}));
                let currRowIndex = 0;
                let currColIndex = 0;
                let originalRow = gate.gates[0].location.row;
                gate.gates.forEach((g) => {
                    if(originalRow !== g.location.row) {
                        currColIndex = 0;
                        currRowIndex = currRowIndex + 1;
                    }
                    g.location.row = currRowIndex;
                    g.location.col = currColIndex;
                    compoundGateGates[currRowIndex][currColIndex] = g;
                    currColIndex =  currColIndex + 1;
                })
                setCompoundGateClicked(compoundGateGates);
                showCompoundGateModal(true);
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
                    for(let i = parseFloat(gate.q_target); i <= parseFloat(gate.q_control); i++) {
                        copy[i][gateCol] = { hasGate : false, gate : undefined }
                    }
                } else {
                    for(let i = parseFloat(gate.q_control); i <= gate.q_target; i++) {
                        copy[i][gateCol] = { hasGate : false, gate : undefined }
                    }
                }

                let newLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
                copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current };
                let midX = parseFloat(e.target.getAttributeNS(null, "x")) + 30;
                let midY = parseFloat(e.target.getAttributeNS(null, "y")) + 24;
                let row = e.target.getAttributeNS(null, "row");
                let col = e.target.getAttributeNS(null, "col")

                setIsDroppingCNOT({isDropping : true, row : row, col : col});
                createCnotSVGElements(row, col, midX, midY);
                setIsDragging(false);
                setState(copy);
            } else {
                let originalLocation = {row : draggingGateNode.current.target.getAttributeNS(null, "row"), col : draggingGateNode.current.target.getAttributeNS(null, "col")};
                let newLocation = {row : e.target.getAttributeNS(null, "row"), col : e.target.getAttributeNS(null, "col")};
                if(draggingGate.current.qid === "measure") {
                    let copy = getQubitStateDeepCopy();
                    for(var i = originalLocation.col; i < 50; i++) {
                        copy[originalLocation.row].push({ hasGate : false, gate : null});
                    }
                    copy[originalLocation.row][originalLocation.col] = { hasGate : false , gate : undefined};
                    copy[newLocation.row] = copy[newLocation.row].slice(0, parseInt(newLocation.col) + 1);
                    copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current};
                    setIsDragging(false);
                    setState(copy);
                } else {
                    let copy = getQubitStateDeepCopy();
                    copy[originalLocation.row][originalLocation.col] = { hasGate : false, gate : null};
                    copy[newLocation.row][newLocation.col] = { hasGate : true, gate : draggingGate.current };
                    setIsDragging(false);
                    setState(copy);
                }
            }
        } else {
            let gateLocation = {row : parseInt(e.target.getAttributeNS(null, "row")), col : parseInt(e.target.getAttributeNS(null, "col"))};
            if(draggingGate.current.qid === "cnot") {

                let midX = parseFloat(e.target.getAttributeNS(null, "x")) + 30;
                let midY = parseFloat(e.target.getAttributeNS(null, "y")) + 24;
                let row = e.target.getAttributeNS(null, "row");
                let col = e.target.getAttributeNS(null, "col")
                setIsDroppingCNOT({isDropping : true, row : row, col : col});
                createCnotSVGElements(row, col, midX, midY);
            }
            if(isMeasureInQubit(gateLocation)) {
                alert("Cannot place gate in qubit after Measurement");
                e.target.setAttributeNS(null, "style", "fill: white; z-index: 1; opacity: 0;");
            } else {
                if(draggingGate.current.qid === "measure") {
                    addMeasureGate(gateLocation);
                } else if(parseInt(gateLocation.row) === currQBState.length -1) {
                    let copy = getQubitStateDeepCopy();
                    copy.push(Array(currQBState[0].length));
                    copy[currQBState.length].fill({hasGate : false, gate : null});
                    copy[gateLocation.row][gateLocation.col] = { hasGate : true, gate : draggingGate.current};
                    setState(copy);
                    qubitCellRef.current.push(Array(currQBState[0].length));
                } else if(draggingGate.current.qid === "compound_gate") {
                    let copy = getQubitStateDeepCopy();
                    let compoundGateSize = parseInt(draggingGate.current.location.tail - draggingGate.current.location.head);
                    draggingGate.current.location.tail = gateLocation.row + compoundGateSize;
                    draggingGate.current.location.head = gateLocation.row;
                    for(var i = 0; i <= compoundGateSize; i++) {
                        copy[gateLocation.row + i][gateLocation.col] = { hasGate : true, gate : draggingGate.current }
                    }
                    setState(copy);
                } else {
                    let copy = getQubitStateDeepCopy();
                    copy[gateLocation.row][gateLocation.col] = { hasGate : true, gate : draggingGate.current};
                    setState(copy);
                }
            }
        }
        draggingGateNode.current = null;
        draggingGate.current = null;
    }

    function canAddCNot(target) {
        if(target.row > isDroppingCNOT.row ) {
            for(let i = parseFloat(isDroppingCNOT.row) + 1 ; i < parseFloat(target.row) ; ++i) {
                return !currQBState[i][target.col].hasGate
            }
        } else {
            for(let i = parseFloat(target.row) + 1 ; i < parseFloat(isDroppingCNOT.row) ; ++i) {
                return !currQBState[i][target.col].hasGate
            }
        }
        return true;
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

        pathRef.current.setAttributeNS(null,"x1", midX);
        pathRef.current.setAttributeNS(null,"y1", midY);
        pathRef.current.setAttributeNS(null,"x2", midX);
        pathRef.current.setAttributeNS(null,"y2", midY);
        pathRef.current.setAttributeNS(null, "id", "cnotLine:" + row + "." + col);
        pathRef.current.setAttributeNS(null, "pointer-events", "none");
        circleRef.current.setAttributeNS(null, "cx", midX);
        circleRef.current.setAttributeNS(null, "cy", midY);
        circleRef.current.setAttributeNS(null, "id", "cnotCircle:" + row + "." + col);
        circleRef.current.setAttributeNS(null, "pointer-events", "none");

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
            if (columnHasGate === false && lastEmptycolumn === null) {
                lastEmptycolumn = column;
            }

            if (columnHasGate === true && lastEmptycolumn === null) {
                columnHasGate = false;
            }
            //If column has a gate and lastEmptycolumn not null, swap that values of the current column, with that of the lastEmptyColumn
            if (columnHasGate === true && lastEmptycolumn !== null) {
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

        for (let row in copy) {

            for (let column in copy[0]) {
                if (column < 1) continue;
                //Checks if column has a gate in it
                if (copy[row][column].hasGate) {
                    columnHasGate = true;
                }


                  //If column has no gate in it and lastEmpty column is null, make that column last empty column
            if (columnHasGate === false && lastEmptycolumn === null) {
                lastEmptycolumn = column;
            }

            if (columnHasGate === true && lastEmptycolumn === null) {
                columnHasGate = false;
            }
            //If column has a gate and lastEmptycolumn not null, swap that values of the current column, with that of the lastEmptyColumn
            if (columnHasGate === true && lastEmptycolumn !== null) {
                    //If the cell has a gate, change the contents of the cell to match the new location
                        copy[row][lastEmptycolumn] =  copy[row][column];
                        copy[row][column] = {hasGate: false, gate: null}

                lastEmptycolumn++;
                columnHasGate = false;
            }
            }
            lastEmptycolumn = null

        }
        setState(copy);
    }

    function makeCompoundGate() {

        let copy = getQubitStateDeepCopy();
        var lowestQubit = gatesSelected[0].row;
        var highestQubit = 0;
        var lowestQubitCell = gatesSelected[0].col
        gatesSelected.forEach((gate) => {
            if(gate.row < lowestQubit) {
                lowestQubit = gate.row;
            } else if (gate.row > highestQubit) {
                highestQubit = gate.row;
            }
            if(gate.col < lowestQubitCell) {
                lowestQubitCell = gate.col;
            }
            copy[gate.row][gate.col] = { hasGate : false, gate : undefined };
        })

        let stdGates = [];
        gatesSelected.forEach((gate) =>  {
            stdGates.push({ gate : JSON.parse(gate.e.getAttributeNS(null, "gate")), location : { row: gate.row, col : gate.col } });
        })

        let compoundGate = {
            "gateName" : newCGNameRef.current.value,
            "qid" : "compound_gate",
            "qasmid" : "compound_gate",
            "description" : newCGDescRef.current.value,
            "gates" : stdGates,
            "location" : { head : lowestQubit, tail : highestQubit}
        }

        for(let i = lowestQubit; i <= highestQubit; i++) {
            copy[i][lowestQubitCell] = { hasGate : true, gate : compoundGate }
        }

        setFavGates(state => [...state, compoundGate]);
        clearSelectedGates();
        setState(copy);
    }

    function convertCircuit() {
        let copy = getQubitStateDeepCopy();
        let code = [];
        //let cregMeasure = 1;
        code.push("OPENQASM 2.0", "include \"qelibl.inc\";","qreg q[" + (currQBState.length-1) + "]");
        currQBState.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
            if(col.hasGate) {
                let gate = copy[rowIndex][colIndex].gate;
                //if measure gate
                if(gate.qid === "measure"){
                    // code.push(gate.qid + " q[" + row + "] c[" + cregMeasure + "]");
                    // cregMeasure += 1;
                    code.push(gate.qid + " q[" + rowIndex + "]");
                }
                //if rotated gate
                else if(gate.qid === 'xrot' || gate.qid=== 'yrot' || gate.qid === 'zrot' ){
                    code.push(gate.qasmid + "(pi/2) q[" + rowIndex + "]");
                }
                //if cnot gate
                else if(gate.qid === "cnot"){
                    code.push(gate.qasmid + " q[" + gate.q_control + "], q[" +  gate.q_target  + "]");
                }
                //if normal gate
                else if(gate.qid !== undefined){
                    code.push(gate.qid + " q[" + rowIndex + "]");
                }
            }
        }))
        setCircuitCode(code);
    }

    function processCircuit() {
        let json = [];
        if(checkMeasureGateInQubits(currQBState.length - 2)) {
            json.push({'operation' : 'create_circuit', 'num_qubits' : currQBState.length});
            currQBState.forEach((row, rowIndex) => row.forEach((v) => {
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
        } else {
            showMeasModal(true);
        }
    }

    //checks to see if there is a measurement gate in each qubit that has a non-measurement gate.
    function checkMeasureGateInQubits(index) {
        let checkMeasure = false;
        let hasMeasure = false;
        if(index === 0) {
            currQBState[index].forEach((col) => {
                if(col.hasGate) {
                    checkMeasure = true;
                }
                if(col.hasGate && checkMeasure) {
                    if(col.gate.qid === "measure") {
                        hasMeasure = true;
                    }
                }
            })
            if(!checkMeasure) {
                hasMeasure = true;
            }
            return hasMeasure;
        } else {
            currQBState[index].forEach((col) => {
                if(col.hasGate) {
                    checkMeasure = true;
                }
                if(col.hasGate && checkMeasure) {
                    if(col.gate.qid === "measure") {
                        hasMeasure = true;
                    }
                }
            })
            if(!checkMeasure) {
                hasMeasure = true;
            }
            return hasMeasure && checkMeasureGateInQubits(index - 1);
        }
    }

    function isMeasureInQubit(target) {
        let canDrop = false;
        let measureGateCol = 0;
        currQBState[target.row].forEach((cell) => {
            if(cell.hasGate) {
                if(cell.gate.qid === "measure" && target.col > measureGateCol) {
                    canDrop = true;
                }
            }
            measureGateCol = measureGateCol + 1;
        })

        return canDrop;
    }

    function addQubit() {
        if(currQBState.length < 31) {
            let copy = getQubitStateDeepCopy();
            copy.push(Array(currQBState[0].length));
            copy[currQBState.length].fill({hasGate : false, gate : null});
            setState(copy);

            qubitCellRef.current.push(Array(currQBState[0].length));
        } else {
            alert("Cannot add more than 30 qubits");
        }
    }

    function handleKeyPress(e) {
        setKeysPressed(e, e.key);
        if((keysPressed.current.get("Control") || keysPressed.current.get("metaKey")) && (keysPressed.current.get("z") || keysPressed.current.get("Z"))) {
            if(keysPressed.current.get("Shift")) {
                if(!(index < lastIndex)) {
                    alert("Nothing to redo");
                } else {
                    redo();
                }
                keysPressed.current.set("Shift", false);
            } else {
                if(!(index > 0)) {
                    alert("Nothing to undo");
                } else {
                    undo();
                }
            }
            keysPressed.current.set("Control", false);
            keysPressed.current.set("z", false);
            keysPressed.current.set("Z", false);
        }
    }

    function saveCircuit() {

    }

    function removeMeasureGate(pos) {
        let copy = getQubitStateDeepCopy();
        for(var i = pos.col; i < 50; i++) {
            copy[pos.row].push({ hasGate : false, gate : null});
        }
        copy[pos.row][pos.col] = { hasGate : false , gate : undefined};
        setState(copy);
    }

    function addMeasureGate(pos) {
        let copy = getQubitStateDeepCopy();
        copy[pos.row] = copy[pos.row].slice(0, parseInt(pos.col) + 1);
        copy[pos.row][pos.col] = { hasGate : true, gate : draggingGate.current};
        setState(copy);
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
        startDrawRect, endDrawRect, drawRect, isDrawing, svgRef, rectRef, imgRef, circleRef, pathRef,
        startDraggingGate, qubitCellRef, handleOnMouseDown, handleOnMouseUp, handleOnClick,
        setLastClicked,
        addToFavGates,
        makeCompoundGate, showCompoundGateModal, compoundGateModal, compoundGate, handleKeyPress, handleHover,
        newCompoundGateModal, showNewCompoundGateModal, newCGNameRef, newCGDescRef, formRef,
        saveCircuit,
    }

}
export default useCircuitBuilderViewModel;
