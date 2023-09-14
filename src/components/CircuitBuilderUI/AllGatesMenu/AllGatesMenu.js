import React , { useState, useEffect } from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function AllGatesMenu ({optionsView, faveGatesView, setView}) {

    // set to false by default because I believe the intial render calls useEffect function on firt render and flips the actual initial state of true for all
    const [optionsMenuView, setOptionsMenuView] = useState(!optionsView);
    const [faveGatesMenuView, setFaveGatesMenuView] = useState(!faveGatesView);

    useEffect(() => {
        setOptionsMenuView(optionsView);
    }, [optionsView]);

    useEffect(() => {
        setFaveGatesMenuView(faveGatesView);
    }, [faveGatesView]);

    return (
        <div className = {styles.AllGatesMenu}>
            <button onClick = {() => setView()  }> Test Button </button>
            { (optionsMenuView  && faveGatesMenuView) && <div> All Gates Menu with Options and FaveGates Menu ON!</div> }
            { (optionsMenuView === false && faveGatesMenuView === true) && <div> All Gates Menu with Options OFF! and FaveGates Menu ON!</div>}
            { (optionsMenuView === true && faveGatesMenuView === false) && <div> All Gates Menu with Options ON! and FaveGates Menu OFF!</div>}
            { (optionsMenuView === false && faveGatesMenuView === false) && <div>  All Gates Menu with Options and FaveGates Menu OFF!</div>}
        </div>
    )
}