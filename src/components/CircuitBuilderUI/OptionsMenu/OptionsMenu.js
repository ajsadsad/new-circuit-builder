import React from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Collapse from 'react-bootstrap/Collapse';

export default function OptionsMenu ({ optionsView }) {

    return (
        <Collapse in = { optionsView }  dimension="width">
            <div className = {styles.OptionsMenu} id="optionsMenu">
                <div style = {{width: '300px'}}>
                    Option Menu
                </div>
            </div>
        </Collapse>)
}