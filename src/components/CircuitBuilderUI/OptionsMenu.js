import React from 'react'
//import '../../CircuitBuilderPage/CircuitBuilder.module.scss';
//import "../css/OptionsMenu.css";
import { Dropdown } from 'react-bootstrap';

export default function OptionsMenu({ optionsView }) {
    return (
            <div class="dropdown d-grid">
                <button class="btn btn-success  dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item">Action</a></li>
                    <li><a class="dropdown-item">Another action</a></li>
                    <li><a class="dropdown-item">Something else here</a></li>
                </ul>
            </div>




    )
}