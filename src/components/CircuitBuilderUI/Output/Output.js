import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function Output ({ outputView }) {
    if(outputView === true) {
        return <div className = {styles.Output}>
                Output
            </div>
    } else {
        return <div style = {{display: "none"}}/>
    }
}