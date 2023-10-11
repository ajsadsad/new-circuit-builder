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
import plusSign from '../../assets/plus.svg';

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
                                    if(rowIndex === qubitStates.length - 1) {
                                        return(
                                            <Col
                                                key={rowIndex + "." + index}
                                                id={index}
                                                className={styles.qubitNum}
                                                onClick={addQubit}
                                                draggable={false}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                                    <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                </svg>
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
                                        return (
                                            <Col
                                                key = { rowIndex + "." + index }
                                                id = { index }
                                                className = { styles.col }
                                                onDragEnter = {(e) => { e.preventDefault();}}
                                                onDragOver = {(e) => { e.preventDefault(); }}
                                                onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e);  }}
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
                                                    />}
                                            </Col>)
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