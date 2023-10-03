import React from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Collapse from 'react-bootstrap/Collapse';

export default function OptionsMenu ({ optionsView }) {

    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Options
            </button>
            <ul class="dropdown-menu">
               
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    )
}