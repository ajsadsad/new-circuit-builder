/**
 *  Modal to be shown when user clicks on a Compund gate within the circuit. Displays the grid view of the compound gates before combination.
 *
 *
 */
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from '../css/Grid.module.css';

export default function CompoundGateModal( { compoundGate, showCompoundGateModal, compoundGateModal } ) {

    return (
    <>
        <Modal
        size="sm"
        show={ compoundGateModal }
        onHide={() => showCompoundGateModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    No Measurement Gate
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <svg
                height = { "500px" }
                width = { "500px" }
                id = "circuit-grid"
                className = { styles.grid }
            >
                {
                    !compoundGate ?
                    <>
                        herro
                    </>
                    :
                    <>
                    {
                        compoundGate.gates.forEach((gate, index) => {
                            for(var i = compoundGate.location.rowStart; i < compoundGate.location.rowEnd; i++) {
                                return (
                                    <g key = { index } className = { styles.qubit }>
                                        <line
                                            x1 = { 58 }
                                            y1 = { 57 * (i + 1) }
                                            x2 = { 58 * compoundGate.gates}
                                            y2 = { 57 * (i + 1) }
                                        />
                                        <image
                                            x = { 58 * index + 9.5}
                                            y = { 58 * i + 37}
                                            gate={JSON.stringify(gate)}
                                            href={require(`../../assets/${gate.img}`)}
                                        />
                                    </g>
                                )
                            }
                        })
                    }
                    </>
                }
            </svg>
        </Modal.Body>
        </Modal>
    </>
    )
}