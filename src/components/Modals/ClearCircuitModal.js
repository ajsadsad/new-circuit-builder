import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ClearCircuitModal({clearCircuit, clearAllGates, setClearCircuitModal}) {

    return (
    <>
        <Modal
        size="md"
        show={clearCircuit}
        onHide={() => setClearCircuitModal(!clearCircuit)}
        centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Clear Circuit
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to remove all gates from your circuit?
            <Button variant = "secondary" onClick = {() => {setClearCircuitModal(false)}}> Cancel </Button>
            <Button variant = "danger" onClick = {() => {clearAllGates(); setClearCircuitModal(false)} }> Yes </Button>
        </Modal.Body>
        </Modal>
    </>
    )
}