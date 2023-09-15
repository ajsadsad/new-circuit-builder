import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function CircuitCode({ codeView }) {
    if(codeView === true) {
        return <div className = {styles.Code}>
                Code
            </div>
    } else {
        return <div style = {{display: "none"}}/>
    }
}