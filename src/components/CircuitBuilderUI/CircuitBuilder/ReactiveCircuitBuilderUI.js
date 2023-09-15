import React from 'react'
import styles from '../../CircuitBuilder.module.css'

export default function ReactiveCircuitBuilderUI({ optionsView, faveGatesView, codeView, outputView, allGatesView }) {
    if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === true) {
       return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if (allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === true ) {
        return <div className = { `${ styles.CircuitBuilder }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === true && faveGatesView === false && outputView === false ) {
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === true ){
        return <div className = {
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}
                 ${ styles.CircuitBuilderNoOptionWithCode }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        //have to fix fave menu showing and moving everything to the left.
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput  }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === true){
        // have to fix this so that everything moves to the left. or everything starts to the right until the menu opens?
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoFaveMenuNoCodeNoOption }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave}` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionNoCodeNoFave }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu}
                 ${ styles.CircuitBuilderNoOutputConsoleWithAllGates }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionNoCodeWithFave }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
            </div>
    } else if(allGatesView === true && codeView === true && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoOptionWithCode }
                 ${ styles.CircuitBuilderNoOutputConsole }` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - ON
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput}` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === false && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput }
                 ${ styles.CircuitBuilderNoOptionWithCode }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - OFF
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === false && codeView === true && optionsView === true && faveGatesView === false && outputView === false){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuNoOutput}` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - ON
                Options Menu - ON
                Fave menu - OFF
                Output Console - OFF
            </div>
    } else if(allGatesView === true && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption}` }>
                Circuit Builder:
                All Gates Menu - ON
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === false && faveGatesView === true && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoCodeNoOptionWithFaveMenu }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - OFF
                Fave menu - ON
                Output Console - ON
            </div>
    } else if(allGatesView === false && codeView === false && optionsView === true && faveGatesView === false && outputView === true){
        return <div className ={
                `${ styles.CircuitBuilder }
                 ${ styles.CircuitBuilderNoAllGatesMenuWithOutput }
                 ${ styles.CircuitBuilderNoCodeNoFaveMenuWithOption }` }>
                Circuit Builder:
                All Gates Menu - OFF
                Code Console - OFF
                Options Menu - ON
                Fave menu - OFF
                Output Console - ON
            </div>
    }
}