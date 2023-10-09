import React from 'react'
//import '../../CircuitBuilderPage/CircuitBuilder.module.scss';
import Collapse from 'react-bootstrap/Collapse';
import { Button } from 'bootstrap';
import "../css/OptionsMenu.css";

export default function OptionsMenu ({ optionsView }) {

    return (

        <div  class="accordion text-white" id="accordionExample" >
ddd
           <body class="text-danger"> dwaddwd</body> 
            <div class="accordion-item">
                
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button"   type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Options
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button">Button</button>
                            <button class="btn btn-primary" type="button">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}