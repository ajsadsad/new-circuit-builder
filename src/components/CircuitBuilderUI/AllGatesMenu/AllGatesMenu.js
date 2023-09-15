import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function AllGatesMenu ({ allGatesView }) {
    if(allGatesView === true) {
        return <div className = {styles.AllGatesMenu}>
                All Gates
            </div>
    } else {
        return <div style = {{display: "none"}}/>
    }
}