import FormRange from 'react-bootstrap/FormRange'
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';

export default function ThetaModal( { thetaModal, updateThetaModal, gateClickedName, gateClickedDesc, updateSlider }) {

    return (
    <>
        <Modal
        size="sm"
        show={thetaModal}
        onHide={() => updateThetaModal()}
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
        <FormRange
            min = "0"
            max = "3"
            step = "0.01"
            onChange = {(e) => { updateSlider(e.target.value) } }

        />
        <p> Theta: <output type="number" name="amountInput" value = "0" id = "theta" /> </p>
        </Modal.Body>
        </Modal>
    </>
    )
}