import React from 'react';
import styles from "../css/OptionsMenu.module.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export default function OptionsMenu({ showCodeView, setCodeView }) {

    return (
        <Dropdown className="btn btn-dark rounded-0" drop = {"up"} style = {{"background-color": "transparent", "border" : "none"}} >
            <Dropdown.Toggle variant="secondary" className="btn btn-dark rounded-0" style = {{"background-color": "rgb(34 43 61)"}}>
                View
            </Dropdown.Toggle>
            <Dropdown.Menu style = {{"width" : "200px", }}>
                    <Form.Check>
                        <Form.Switch
                            id="custom-switch"
                            label="Code Console"
                            style = {{"padding-left" : "3rem"}}
                        />
                    </Form.Check>
            </Dropdown.Menu>
        </Dropdown>
)
}
