import React from 'react'
//import '../../CircuitBuilderPage/CircuitBuilder.module.scss';
import styles from "../css/OptionsMenu.module.css";
import { Dropdown } from 'react-bootstrap';

export default function OptionsMenu({ processCircuit, redo, undo, index, lastIndex, clearAllGates }) {

    const canUndo = index > 0;
    const canRedo = index < lastIndex;

    return (
        <div  className={styles.OptionsMenu}>
            <div class=" dropup d-flex justify-content-end" >
                <button class="btn btn-dark rounded-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark ">
                    <li><a class="dropdown-item">Save</a></li>
                    <li><a class="dropdown-item" onClick={clearAllGates}>Reset Grid</a></li>

                </ul>
            </div>
            <button onClick = { processCircuit }> Create QASM JSON </button>
            <button onClick = { redo } disabled = { !canRedo }> redo </button>
            <button onClick = { undo } disabled = { !canUndo }> undo </button>
        </div>





    )
}