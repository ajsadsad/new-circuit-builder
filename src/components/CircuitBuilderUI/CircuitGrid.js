/**
 * This component is responsible for the generation of the circuit grid displayed within the circuit builder component.
 * @param {array[row][col]} qubitStates - 2d array used to represent the circuit grid. Each qubit is made up of a row that holds individual cells that holds an object of format { hasGate : bool, gate : gateObj }.
 *
 * @param {function} handleChange - triggered when gate is dropped within the circuit and called from CircuitBuilderViewModel.
 *
 * @param {function} moveGateFromQubit - triggered when gate is dragged from CircuitGrid and called from CircuitBuilderViewModel.
 *
 * @param {function} addQubit - triggered when cell with '+' is clicked and adds a new qubit to the circuit. Called from CircuitBuidlerViewModel.
 *
 * @param {function} handleClick - triggered when cell in grid is clicked. Called from CircuitBuilderViewModel.
 *
 */
import styles from '../css/CircuitBuilder.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import circle from '../../assets/plus-circle-dotted.svg'
import { useEffect } from 'react'

export default function CircuitGrid ({ qubitStates, handleChange, addQubit, handleClick, setDraggingGate, setDraggingGateNode, canvasRef, contextRef, startDrawRect, endDrawRect, drawRect, draggingGate }) {
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 2000;
        canvas.height = 1000;
        canvas.position = "absolute";
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, [])
    return(

        <>
            <canvas
                ref = { canvasRef }
                style = {  {"position" : "absolute", "left": "0", "right":"0", "z-index" : "1", }}
                onMouseDown = { (e) => { startDrawRect(e); console.log(e.clientX + " " + e.clientY) }}
                onMouseMove = { (e) => { drawRect(e) } }
                onMouseUp = { endDrawRect }
                onMouseLeave = { endDrawRect }
            />
            <Container>
            {
                qubitStates.map((column, rowIndex) =>
                    <Row
                        key = { rowIndex }
                        id = { rowIndex }
                        className = { styles.row }
                    >
                        {
                            column.map((row, index) =>
                            {
                                if(index === 0) {
                                    if(rowIndex === qubitStates.length - 1) {
                                        return(
                                            <Col
                                                key={rowIndex + "." + index}
                                                id={index}
                                                className={styles.qubitNum}
                                                onClick={addQubit}
                                                draggable={false}
                                            >
                                                <img src = {circle}/>
                                            </Col>)
                                    } else {
                                        return (
                                            <Col
                                                key={rowIndex + "." + index}
                                                id={index}
                                                className={styles.qubitNum}
                                                draggable={false}
                                            >
                                                <span> {"q[" + rowIndex + "]"} </span>
                                            </Col>)
                                    }
                                } else {
                                    if(rowIndex === qubitStates.length -1) {
                                        return (<Col id = "spareLine" className = { styles.addQubitBtn}> </Col>)
                                    } else {
                                        if(row.hasGate) {
                                            return (
                                                <Col
                                                    key = { rowIndex + "." + index }
                                                    id = { index }
                                                    className = { styles.col }
                                                    onDragEnter = {(e) => { e.preventDefault();}}
                                                    onDragOver = {(e) => { e.preventDefault(); }}
                                                    onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e);  }}
                                                    style = {{"z-index" : "5", "pointer-events" : "none"}}
                                                >
                                                    { row.hasGate &&
                                                        <img
                                                            className={styles.GateImg}
                                                            key={row.gate.qid}
                                                            id={row.gate.qid}
                                                            gate={JSON.stringify(row.gate)}
                                                            src={require(`../../assets/${row.gate.img}`)}
                                                            inqubit = {"true"}
                                                            draggable ={ true }
                                                            onDragStart={(e) => { setDraggingGateNode(e); setDraggingGate(row.gate); }}
                                                            onClick = {(e) => { handleClick(e); e.stopPropagation();}}
                                                            style = {{"z-index" : "5", "pointer-events" : "none"}}
                                                        />}
                                                </Col>)
                                        } else {
                                            return (
                                                <Col
                                                key = { rowIndex + "." + index }
                                                id = { index }
                                                className = { styles.col }
                                                onDragEnter = {(e) => { e.preventDefault();}}
                                                onDragOver = {(e) => { e.preventDefault(); }}
                                                onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e);  }}
                                                style = {{"z-index" : "5", "pointer-events" : "none"}}
                                                >
                                                </Col>
                                            )
                                        }
                                        }
                                    }
                            })
                        }
                    </Row>
                )
            }
            </Container>
        </>
    )
}