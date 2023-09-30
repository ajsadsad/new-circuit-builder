import React from 'react'
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss'
import Button from 'react-bootstrap/Button';

export default function BottomPageTabs ({setFaveGateView, setOptionMenuView, setAllGatesView, setCodeView, setOutputView, faveGatesView, optionsView, processCircuit}) {

    return (
        <div className = { styles.BottomPageTabs }>
            <Button onClick = { setOptionMenuView }
            aria-controls="optionMenu"
            aria-expanded={ optionsView }> Options Menu </Button>
            <Button onClick = { setFaveGateView }
            aria-controls="faveMenu"
            aria-expanded={ faveGatesView }> Fave Gates Menu </Button>
            <button onClick = { setAllGatesView }> All Gate Menu </button>
            <button onClick = { setCodeView }> Code Console </button>
            <button onClick = { setOutputView}> Output Console </button>
            <button onClick = { processCircuit }> Create QASM JSON </button>
        </div>
    )
}