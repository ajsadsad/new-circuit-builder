import React, { useState } from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function OptionsMenu ({setView}) {

    return (
        <div className = {styles.OptionsMenu}>
            Options Menu
            <button onClick = {() => setView()  }> Test Button </button>
        </div>
    )
}