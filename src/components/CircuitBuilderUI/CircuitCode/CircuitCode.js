import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function CircuitCode({ setCodeView }) {

    return (
        <div className = {styles.Code}>
            Code Console
            <button  onClick = {() => setCodeView() }> Test Button </button>
        </div>
    )
}