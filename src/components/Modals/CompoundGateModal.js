/**
 *  Modal to be shown when user clicks on a Compund gate within the circuit. Displays the grid view of the compound gates before combination.
 *
 *
 */
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from '../css/Grid.module.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function CompoundGateModal( { compoundGate, showCompoundGateModal, compoundGateModal, gateClickedName, gateClickedDesc } ) {

    return (
    <>
        <Modal
            size="md"
            show={ compoundGateModal }
            onHide={() => showCompoundGateModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    {
                        gateClickedName
                    }
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row xs = {12} md = {12}>
                    <svg
                        height = { compoundGate ? (compoundGate.length ) * 58 + 15 : "500px" }
                        width = { compoundGate ? (compoundGate.length * 2) * 58 : "500px" }
                        id = "circuit-grid"
                        overflow = {"hidden"}
                    >
                        {
                            compoundGate &&
                            <>
                            {
                                compoundGate.map((row, rowIndex) => {
                                    return (
                                        row &&
                                            <g key = { rowIndex } className = { styles.qubit }>
                                            <line
                                                x1 = { 0 }
                                                y1 = { 57 * (rowIndex + 1) }
                                                x2 = { 58 * compoundGate.length}
                                                y2 = { 57 * (rowIndex + 1) }
                                                id = { rowIndex }
                                            />
                                        {
                                            row.map((col, colIndex) => {
                                                return (
                                                    col &&
                                                    <g>
                                                        <image
                                                            x = { 58 * col.location.col + 9.5}
                                                            y = { 58 * col.location.row + 37}
                                                            gate = { JSON.stringify(col.gate) }
                                                            href = { require(`../../assets/${col.gate.img}`) }
                                                        />
                                                    </g>
                                                )
                                            })
                                        }
                                        </g>
                                    )
                                })
                            }
                            </>
                        }
                    </svg>
                </Row>
                <Row xs = {12} md = {12}>
                    <text>
                        { gateClickedDesc }
                    </text>
                </Row>
            </Container>
        </Modal.Body>
        </Modal>
    </>
    )
}