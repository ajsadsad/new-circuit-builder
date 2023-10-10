/**
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 */
import React from 'react'
import styles from '../css/FaveGatesMenu.module.css';

export default function FaveGatesMenu({ faveGatesView }) {
    return (
        <div class=" accordion accordion-flush d-grid" id="accordionPanelsStayOpenExample" className={styles.AllGatesMenu} >
        <div class="accordion-item d-grid">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                Fave Gates
            </button>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="row">

                    </div>

                </div>
            </div>
        </div>

    </div>

     
    )
}