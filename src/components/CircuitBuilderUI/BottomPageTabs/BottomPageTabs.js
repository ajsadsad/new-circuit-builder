import React from 'react'
import styles from '../../CircuitBuilder.module.css'
export default function BottomPageTabs ({setFaveGateView, setOptionMenuView, setAllGatesView, setCodeView, setOutputView}) {

    return (
        <div className = { styles.BottomPageTabs }>
            Bottom Page Tabs
            <button onClick = { setOptionMenuView }> Option Menu Switch </button>
            <button onClick = { setFaveGateView }> Fave Gates Menu Switch </button>
            <button onClick = { setAllGatesView }> All Gate Menu Switch </button>
            <button onClick = { setCodeView }> Code Console Switch </button>
            <button onClick = { setOutputView}> Output Console Switch </button>
        </div>
    )
}