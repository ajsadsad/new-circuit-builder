import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

export default function CircuitGrid ({ draggingGateNode , setDraggingGateNode, dimensions, draggingGate, setDraggingGate,}) {

    let windowWidth = Math.floor(dimensions.width/48) - 1;
    let windowHeight = Math.floor(dimensions.height/48) - 1;

    const [qubitStates, setQubitOp] = useState(Array.from({length: 3},()=> Array.from({length: windowHeight}, () => [{ hasGate : false, gate : null}])))

    const handleChange = (e) => {
        e.preventDefault();
        let copy = [...qubitStates];
        copy[e.currentTarget.parentNode.id][e.target.id] = { hasGate : true, gate : draggingGate }
        setQubitOp(copy);
        console.log(qubitStates);
        console.log("draggingGate: e " + draggingGate);
        console.log("drop: e " + e.target.getAttribute("gooogaaa"));
        e.target.appendChild(draggingGateNode.target.cloneNode());
    }

    return(
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
                                return(<Col
                                key = { rowIndex + "." + index }
                                id = { index }
                                className = { styles.qubitNum }
                                >
                                </Col>)
                            } else {
                                return (<Col
                                key = { rowIndex + "." + index }
                                id = { index }
                                onDragEnter = {(e) => { e.preventDefault();}}
                                onDragOver = {(e) => { e.preventDefault(); }}
                                onDrop = {(e) => { e.preventDefault(); handleChange(e);  }}
                                className = { styles.col }
                                onDragStart = {(e) => { setDraggingGateNode(e.target); handleChange(e); }}
                                gooogaaa = "Gee gee boo"
                                >
                                </Col>)
                            }
                        }
                        )
                    }
                </Row>
            )
        }
        </Container>
    )
}
/*
    - Would probably have to do an ondrag check to see if the gate is currently inside a qubit to remove it from the qubit before moving to another qubit.
    - I thought there was an onLeave listener but maybe I made that up, look it up in the morning.
    - Have to fix the grid moving around when placing a gate inside of it. Might be due to the padding and margins within the image itself forcing the grid to move.
    - Completely verify what data requirements are needed to use the QASM system.
*/