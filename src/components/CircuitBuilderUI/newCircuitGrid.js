import styles from '../css/Grid.module.css'
import circle from '../../assets/plus-circle-dotted.svg'
import { useEffect } from 'react'

export default function NewCircuitGrid ({ qubitStates, handleChange, addQubit, handleClick, setDraggingGate, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, startDraggingGate, imgRef}) {

    return(
        <svg
            height = { "100%" }
            width = { "100%" }
            id = "circuit-grid"
            ref = { svgRef }
            className = { styles.grid }
            onMouseDown = { (e) => { startDrawRect(e); } }
            onMouseUp = { (e) => { endDrawRect(e); } }
            onMouseMove = { (e) => { drawRect(e); } }
            onMouseLeave = { (e) => { endDrawRect(e) } }
            style = {  {"position" : "absolute", "left": "0", "right":"0"}}
        >
        <rect ref = {rectRef} className = {styles.selectionBox} pointerEvents ={ "none" }> </rect>
        <image ref = {imgRef} pointerEvents={ "none" } zIndex = { "2" }> </image>
        {
            qubitStates.map((row, rowIndex) => {
                return (
                    <g className = { styles.qubit }>
                        <line
                            x1 = { 48 }
                            y1 = { 48 * (rowIndex + 1) }
                            x2 = { 48 * row.length}
                            y2 = { 48 * (rowIndex + 1) }
                            key = { rowIndex }
                            id = { rowIndex }
                        />
                    {
                        row.map((col, colIndex) => {
                            if(colIndex === 0 && rowIndex === qubitStates.length - 1) {
                                return (
                                <g>
                                    <image
                                        x = { 48 * colIndex + 12 }
                                        y = { 48 * rowIndex + 33 }
                                        key = { rowIndex + "." + colIndex }
                                        id = { rowIndex + "." + colIndex }
                                        href={circle}
                                        height = { 30 }
                                        width = { 30 }
                                        onClick = { (e) => { e.preventDefault(); e.stopPropagation(); addQubit(); }}
                                    />
                                </g>
                                )
                            } else if(colIndex === 0) {
                                return (
                                    <g>
                                        <text
                                            x = { 48 * colIndex + 12 }
                                            y = { 48 * rowIndex + 48 }
                                            width = { 48 }
                                            height = { 48 }
                                        >
                                            {"q[" + rowIndex + "]"}
                                        </text>
                                    </g>
                                )
                            } else {
                                return (
                                    <g>
                                        {
                                            !col.hasGate ?
                                            <rect
                                                x = { 48 * colIndex }
                                                y = { 48 * rowIndex + 24}
                                                width = { 48 }
                                                height = { 48 }
                                                key = { rowIndex + "." + colIndex }
                                                id = { rowIndex + "." + colIndex }
                                                className = { styles.qubitCell }
                                                onDragEnter = {(e) => { e.preventDefault();}}
                                                onDragOver = {(e) => { e.preventDefault(); }}
                                                onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e); }}
                                            />
                                            :
                                            <image
                                                x = { 48 * colIndex }
                                                y = { 48 * rowIndex + 24}
                                                key={col.gate.qid}
                                                id={ rowIndex + "." + colIndex }
                                                gate={JSON.stringify(col.gate)}
                                                href={require(`../../assets/${col.gate.img}`)}
                                                inqubit = {"true"}
                                                onClick = {(e) => { handleClick(e); e.stopPropagation();}}
                                                onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); setDraggingGate(col.gate); startDraggingGate(e);}}
                                            />
                                        }
                                    </g>
                                )
                            }})}
                        </g>
            )})}
    </svg>)
}