import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import FormRange from 'react-bootstrap/FormRange'
import Modal from 'react-bootstrap/Modal';

export default function CircuitGrid ({ qubitStates, handleChange, moveGateFromQubit, addQubit, handleClick }) {

    //have to figure out how to keep gates inside of grid on rerender. Probably a turnary operation in this map function.

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
                                    return(<Col
                                    key = { rowIndex + "." + index }
                                    id = { index }
                                    className = { styles.qubitNum }
                                    onClick = { addQubit }
                                    >
                                        +
                                    </Col>)
                                } else {
                                    return (<Col
                                    key = { rowIndex + "." + index }
                                    id = { index }
                                    onDragEnter = {(e) => { e.preventDefault();}}
                                    onDragOver = {(e) => { e.preventDefault(); }}
                                    onDrop = {(e) => { e.preventDefault(); handleChange(e);  }}
                                    className = { styles.col }
                                    draggable = { true }
                                    onDragStart = {(e) => { {moveGateFromQubit(e)}; }}
                                    onClick = {(e) => { e.preventDefault(); handleClick(e); }}
                                    >
                                    </Col>)
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