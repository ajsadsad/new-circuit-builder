import React, { useEffect } from 'react';
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