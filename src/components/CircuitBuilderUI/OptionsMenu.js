import React, { useState } from 'react'
import styles from "../css/OptionsMenu.module.css";
import { Dropdown } from 'react-bootstrap';

export default function OptionsMenu({ processCircuit, redo, undo, index, lastIndex }) {

    const canUndo = index > 0;
    const canRedo = index < lastIndex;
    const [showCancel, setShowCancel] = useState(false);

    const handleCreateQasmJson = () => {
        setShowCancel(true);
        processCircuit();
    }

    const handleCancel = () => {
        setShowCancel(false);
    }

    return (
        <div className={styles.OptionsMenu}>
            <div style={{ position: 'absolute', top: '83px', right: '10px'}}>
                <Dropdown>
                    <Dropdown.Toggle id="dropdownButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 14 14">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#">Save</Dropdown.Item>
                        <Dropdown.Item href="#">Open</Dropdown.Item>
                        <Dropdown.Item href="#">Compress</Dropdown.Item>
                        <Dropdown.Item href="#">Reset Grid</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            {showCancel && <button onClick={handleCancel}> Cancel </button>}
            <button onClick={handleCreateQasmJson}> Create QASM JSON </button>
            <button onClick={redo} disabled={!canRedo}> redo </button>
            <button onClick={undo} disabled={!canUndo}> undo </button>
        </div>
    )
}