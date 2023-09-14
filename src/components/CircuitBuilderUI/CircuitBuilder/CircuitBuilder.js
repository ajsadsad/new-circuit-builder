import React , { useState, useEffect } from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function CircuitBuilder ({optionsView, faveGatesView, codeView, outputView, allGatesMenuView}) {

    // set to false by default because I believe the intial render calls useEffect function on firt render and flips the actual initial state of true for all
    const [optionsMenuView, setOptionsMenuView] = useState(!optionsView);
    const [faveGatesMenuView, setFaveGatesMenuView] = useState(!faveGatesView);
    const [codeConsoleView, setCodeConsoleView] = useState(!codeView);
    const [outputConsoleView, setOutputConsoleView] = useState(!outputView);
    const [allGatesView, setAllGatesView] = useState(!allGatesMenuView);

    useEffect(() => {
        setOptionsMenuView(optionsView);
    }, [optionsView]);

    useEffect(() => {
        setFaveGatesMenuView(faveGatesView);
    }, [faveGatesView]);

    useEffect(() => {
        setCodeConsoleView(codeView);
    }, [codeView]);

    useEffect(() => {
        setOutputConsoleView(outputView);
    }, [outputView]);

    useEffect(() => {
        setAllGatesView(allGatesMenuView);
    }, [allGatesMenuView]);


    return (
        <div className = {styles.CircuitBuilder}>
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === true ) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === false ) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === true ) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
                </div>
            }
            { (allGatesView === true && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === false && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === false && codeConsoleView === true && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === false) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
                </div>
            }
            { (allGatesView === true && codeConsoleView === false && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === false && faveGatesMenuView === true && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
                </div>
            }
            { (allGatesView === false && codeConsoleView === false && optionsMenuView === true && faveGatesMenuView === false && outputConsoleView === true) &&
                <div>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
                </div>
            }
        </div>
    )
}