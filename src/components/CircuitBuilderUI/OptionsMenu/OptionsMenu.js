import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function OptionsMenu ({optionsView}) {
    if(optionsView === true) {
        return <div className = {styles.OptionsMenu}>
                Option
            </div>
    } else {
        return <div style = {{display: "none"}}/>
    }
}