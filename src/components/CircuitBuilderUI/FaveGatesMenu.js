/**
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 */
import React from 'react'
import styles from '../CircuitBuilderPage/CircuitBuilder.module.scss'
import Collapse from 'react-bootstrap/Collapse';

export default function FaveGatesMenu ( { faveGatesView } )  {
    return (

            <Collapse in = { faveGatesView } dimension = "width">
                <div className = {styles.FaveGatesMenu} id="faveMenu">
                    <div style = {{width: '300px'}}>
                        Faves Menu
                    </div>
                </div>
            </Collapse>

    )
}