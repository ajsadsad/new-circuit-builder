import styles from '../css/Grid.module.css'
import circle from '../../assets/plus-circle-dotted.svg'

export default function NewCircuitGrid ({ qubitStates, handleChange, addQubit, handleClick, setDraggingGate, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, startDraggingGate, imgRef, qubitCellRef}) {

    return(
        <svg
            height = { "100%" }
            width = { "100%" }
            id = "circuit-grid"
            ref = { svgRef }
            className = { styles.grid }
            onMouseDown = { (e) => { e.stopPropagation(); startDrawRect(e); } }
            onMouseUp = { (e) => { e.preventDefault(); e.stopPropagation(); endDrawRect(e); } }
            onMouseMove = { (e) => { drawRect(e); } }
            style = {  {"width" : "75vh", "height" : "50vh"}}
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
                                                row = { rowIndex }
                                                col = { colIndex }
                                                className = { styles.qubitCell }
                                                onDragEnter = {(e) => { e.preventDefault();}}
                                                onDragOver = {(e) => { e.preventDefault(); }}
                                                onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e); }}
                                            />
                                            :
                                            <>
                                                <rect
                                                    x = { 48 * colIndex }
                                                    y = { 48 * rowIndex + 24}
                                                    key={rowIndex + "." + colIndex}
                                                    width = { 40 }
                                                    height = { 40 }
                                                    row = { rowIndex }
                                                    col = { colIndex }
                                                    ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                    style = {{"fill" : "none", "rx" : "15"}}
                                                    gate={JSON.stringify(col.gate)}
                                                />
                                                <image
                                                    x = { 48 * colIndex }
                                                    y = { 48 * rowIndex + 24}
                                                    key={col.gate.qid}
                                                    id={ col.gate.id }
                                                    gate={JSON.stringify(col.gate)}
                                                    row = { rowIndex }
                                                    col = { colIndex }
                                                    inqubit = {"true"}
                                                    onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); }}
                                                    onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); if(e.button === 0) {setDraggingGate(col.gate); startDraggingGate(e);} }}
                                                    href={require(`../../assets/${col.gate.img}`)}
                                                />
                                            </>
                                        }
                                    </g>
                                )
                            }})}
                        </g>
            )})}
    </svg>)
}