import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function FaveGatesMenu ( { setFaveView } ) {

    return (
        <div className = {styles.FaveGatesMenu}>
            Fave Gates Menu
            <button  onClick = {() => setFaveView() }> Test Button </button>
        </div>
    )
}