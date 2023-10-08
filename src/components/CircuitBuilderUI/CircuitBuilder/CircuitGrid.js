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
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useCallback } from 'react';

export default function CircuitGrid ({ qubitStates, handleChange, addQubit, handleClick, setDraggingGate, setDraggingGateNode }) {

    return(
        <>
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
                                    return(
                                    <Col
                                    key = { rowIndex + "." + index }
                                    id = { index }
                                    className = { styles.qubitNum }
                                    onClick = { addQubit }
                                    >
                                        +
                                    </Col>)
                                } else {
                                    return (
                                    <Col
                                        key = { rowIndex + "." + index }
                                        id = { index }
                                        className = { styles.col }
                                        onDragEnter = {(e) => { e.preventDefault();}}
                                        onDragOver = {(e) => { e.preventDefault(); }}
                                        onDrop = {(e) => { e.preventDefault(); handleChange(e);  }}
                                        onClick = {(e) => { handleClick(e); }}
                                    >
                                        { row.hasGate &&
                                            <img
                                                className={styles.GateImg}
                                                key={row.gate.qid}
                                                id={row.gate.qid}
                                                gate={JSON.stringify(row.gate)}
                                                src={require(`../../../assets/${row.gate.img}`)}
                                                inqubit = {"true"}
                                                draggable={true}
                                                onDragStart={(e) => { setDraggingGateNode(e); setDraggingGate(row.gate); }}
                                            />}
                                    </Col>
                                    )
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