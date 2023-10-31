/**
 *  Modal to be shown when user create a new compound gate to input compound gate name.
 */
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NewCompoundGateModal( { newCompoundGateModal, showNewCompoundGateModal, newCGNameRef, newCGDescRef, makeCompoundGate, formRef}) {

    return (
    <>
        <Modal
        size="sm"
        show={newCompoundGateModal}
        onHide={() => showNewCompoundGateModal(false)}
        aria-labelledby="new-compound-gate-modal"
        centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="new-compound-gate-modal">
                    New Compound Gate
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form class = "needs-validation" ref = { formRef }>
                <Form.Label> Compound Gate Name </Form.Label>
                <Form.Control ref =  { newCGNameRef } type = "compound-gate-name" placeholder="Enter Gate Name " />
                <Form.Text className = "text-muted">
                    16 character max
                </Form.Text>.
                <Form.Label> Compound Gate Description </Form.Label>
                <Form.Control ref =  { newCGDescRef } type = "compound-gate-desc" placeholder="Enter Gate Description" as = "textarea" rows = {3}/>
                <Form.Text className = "text-muted">
                    Enter a description for the gate
                </Form.Text>!
            </Form>
        </Modal.Body>
        <Button type = "submit" onClick = {(e) => { e.preventDefault(); e.stopPropagation(); makeCompoundGate(); showNewCompoundGateModal(false); }}>
            Save
        </Button>
        </Modal>
    </>
    )
}