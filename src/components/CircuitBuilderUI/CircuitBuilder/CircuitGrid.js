import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

export default function CircuitGrid ({ qubitStates, handleChange, moveGateFromQubit }) {

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
                                draggable = { true }
                                onDragStart = {(e) => { {moveGateFromQubit(e)}; }}
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