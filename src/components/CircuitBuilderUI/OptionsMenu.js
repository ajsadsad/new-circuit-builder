import React from 'react';
import styles from "../css/OptionsMenu.module.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export default function OptionsMenu({ processCircuit, setClearCircuitModal, updateCodeViewRef }) {

    return (
        <Dropdown className="btn btn-dark rounded-0" drop = {"up"} style = {{"background-color": "transparent", "border" : "none", "pointer-events": "auto"}} >
            <Dropdown.Toggle variant="secondary" className="btn btn-dark rounded-0" style = {{"background-color": "rgb(34 43 61)"}}>
                Options
            </Dropdown.Toggle>
            <Dropdown.Menu style = {{"width" : "200px", }}>
                    <Dropdown.Item onClick={processCircuit}> Process Circuit </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={setClearCircuitModal}> Clear Circuit </Dropdown.Item>
                    <Dropdown.Divider />
                    <Form.Check>
                        <Form.Switch
                            id="custom-switch"
                            label="Code Console"
                            style = {{"padding-left" : "3rem"}}
                            onChange = {updateCodeViewRef}
                        />
                    </Form.Check>
            </Dropdown.Menu>
        </Dropdown>
)
}
