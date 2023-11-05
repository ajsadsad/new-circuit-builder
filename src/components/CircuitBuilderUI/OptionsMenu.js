import React from 'react';
import styles from "../css/OptionsMenu.module.css";
import { Dropdown } from 'react-bootstrap';

export default function OptionsMenu({ processCircuit, redo, undo, index, lastIndex, clearAllGates, strongCompress, weakCompress, circuitCode }) {

    const canUndo = index > 0;
    const canRedo = index < lastIndex;

    const displayCode = circuitCode.map((line, index) => {
        return (
            <p >{(index + 1)}: {line}</p>
        )
    })

    return (
        <div className={styles.OptionsMenu}>
            <div className="d-flex justify-content-between">
                <div className="dropup">
                    <button className="btn btn-dark rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Settings / View
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li><a className="dropdown-item">All Gates</a></li>
                        <li><a className="dropdown-item">My Gates</a></li>
                        <li><a className="dropdown-item">Code</a></li>
                    </ul>
                </div>
                <div className="dropup" >
                    <button className="btn btn-dark rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Code Ouput
                    </button>
          
                        <ul class="dropdown-menu dropdown-menu-dark" >
                        <p style={{width: "250px"}}/>
                        <div className={styles.CodeOuput}>
                            {displayCode}

                        </div>
                            
                        </ul>
                

                </div>
                <div className="dropup">
                    <button className="btn btn-dark rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li><a className="dropdown-item">Save</a></li>
                        <li><a className="dropdown-item" onClick={weakCompress}>Weak Compress</a></li>
                        <li><a className="dropdown-item" onClick={strongCompress}>Strong Compress</a></li>
                        <li><a className="dropdown-item" onClick={clearAllGates}>Clear All</a></li>
                        <li><a className="dropdown-item" onClick={processCircuit}>Process Circuit</a></li>
                        <li><a className="dropdown-item" onClick={undo} disabled={!canUndo}>Undo</a></li>
                        <li><a className="dropdown-item" onClick={redo} disabled={!canRedo}>Redo</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
