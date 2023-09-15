import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function FaveGatesMenu ( { faveGatesView } ) {
    if(faveGatesView === true) {
        return <div className = {styles.FaveGatesMenu}>
                Fave Gates
            </div>
    } else {
        return <div style = {{display: "none"}}/>
    }
}