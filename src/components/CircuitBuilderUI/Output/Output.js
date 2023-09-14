import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function Output ({ setView }) {

    return (
        <div className = {styles.Output}>
            Output
            <button onClick = {() => setView()  }> Test Button </button>
        </div>
    )
}