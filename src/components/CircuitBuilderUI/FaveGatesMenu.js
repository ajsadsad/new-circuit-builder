/**
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 */
import React from 'react'
import styles from '../css/FavGatesMenu.module.css';

export default function FaveGatesMenu({ faveGatesView }) {
    return (
        <div>
            <div class=" accordion accordion-flush d-grid" id="accordionPanelsStayOpenExample" className={styles.AllGatesMenu} >
                <div class="accordion-item d-grid" >
                    <button class="btn btn-secondary rounded-0 collapsed" className={styles.button} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                        Fav Gates
                    </button>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body" className={styles.accordionContent}>
                            <div class="row">
                              
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           

        </div>

     
    )
}