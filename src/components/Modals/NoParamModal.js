/**
 *  Modal to be shown when user clicks on gate within the circuit and no values can be adjusted for the gate.
 *
 *  @param {string} gateClickedName - name of gate that was clicked to display this modal.
 *  @param {string} gateClickedDesc - Description of gate that was clicked to display this modal.
 *  @param {boolean} noParamModal - True if modal is to be shown.
 *  @param {function} showNoParamModal - Set state of noParamModal.
 */
import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function NoParamModal( { gateClickedName, gateClickedDesc, noParamModal, showNoParamModal}) {

    return (
    <>
        <Modal
        size="sm"
        show={noParamModal}
        onHide={() => showNoParamModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    { gateClickedName }
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { gateClickedDesc }
        </Modal.Body>
        </Modal>
    </>
    )
}