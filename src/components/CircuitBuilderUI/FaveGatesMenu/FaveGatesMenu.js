import React from 'react'
import styles from '../../CircuitBuilder.module.css'
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

export default function FaveGatesMenu ( { faveGatesView } )  {
    return (
        <Collapse in = { faveGatesView }  dimension="width" >
            <div className = {styles.FaveGatesMenu} id="faveMenu">
                <Card body style = {{ width: '300px'}}>
                    Fave Menu
                </Card>
            </div>
        </Collapse>)
}