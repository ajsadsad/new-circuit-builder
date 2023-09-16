import React from 'react'
import styles from '../../CircuitBuilder.module.css'
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

export default function OptionsMenu ({optionsView}) {
    return (
        <Collapse in = { optionsView }  dimension="width" >
            <div className = {styles.OptionsMenu} id="optionsMenu">
                <Card body style = {{ width: '300px'}}>
                    Options Menu
                </Card>
            </div>
        </Collapse>)
}