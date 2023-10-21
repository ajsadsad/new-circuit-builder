import Modal from 'react-bootstrap/Modal';
import React, { useRef } from 'react';

export default function ThetaModal( { thetaModal, updateThetaModal, gateClickedName, gateClickedDesc, gateClickedThetaVal, updateSlider, thetaModalRef }) {

    const val = useRef(gateClickedThetaVal);

    return (
    <>
        <Modal
        size="sm"
        show={thetaModal}
        onHide={() => { updateThetaModal(val.current) } }
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
        <p> Theta:
            <input
                type="number"
                name="amountInput"
                ref = { thetaModalRef }
                placeholder={ val.current ? `${val.current}` : "0.35"}
                step="0.01"
                onChange = {(e) => { val.current = e.target.value; }}
            />
        </p>
        </Modal.Body>
        </Modal>
    </>
    )
}