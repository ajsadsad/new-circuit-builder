import styles from '../css/Grid.module.css'
import circle from '../../assets/plus-circle-dotted.svg'

export default function NewCircuitGrid ({ qubitStates, handleChange, addQubit, handleMouseClick, setDraggingGate, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, startDraggingGate, imgRef, qubitCellRef, handleOnMouseDown, handleOnMouseUp, handleOnClick}) {

    return(
        <svg
            height = { "1600" }
            width = { "100%" }
            id = "circuit-grid"
            ref = { svgRef }
            className = { styles.grid }
            onClick = { (e) => { e.stopPropagation() }}
            onMouseDown = { (e) => { e.stopPropagation(); startDrawRect(e); } }
            onMouseUp = { (e) => { e.preventDefault(); e.stopPropagation(); endDrawRect(e); } }
            onMouseMove = { (e) => { drawRect(e); } }
        >
        <rect ref = {rectRef} className = {styles.selectionBox} pointerEvents ={ "none" }> </rect>
        <image ref = {imgRef} pointerEvents={ "none" }> </image>
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
                                            className = {styles.disableTextSelection}
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
                                                key = { "Empty cell: " + rowIndex + "." + colIndex }
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
                                                    ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                    width = { 40 }
                                                    height = { 40 }
                                                    row = { rowIndex }
                                                    col = { colIndex }
                                                    style = {{"fill" : "none", "rx" : "15"}}
                                                    gate={JSON.stringify(col.gate)}
                                                />
                                                {
                                                    col.gate !== "CNOT Target" &&
                                                    <image
                                                        x = { 48 * colIndex }
                                                        y = { 48 * rowIndex + 24}
                                                        key={col.gate.qid}
                                                        gate={JSON.stringify(col.gate)}
                                                        row = { rowIndex }
                                                        col = { colIndex }
                                                        inqubit = {"true"}
                                                        onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseUp()}}
                                                        onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseDown(e, col.gate); }}
                                                        onClick = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnClick(e); }}
                                                        href={require(`../../assets/${col.gate.img}`)}
                                                    />
                                                }
                                                {
                                                    col.gate.qid === "xrot" &&
                                                    <text
                                                        x = { 48 * colIndex }
                                                        y = { 48 * rowIndex }
                                                        fontSize={ "12px"}
                                                        fontWeight={"bold"}
                                                        dx = { 8 }
                                                        dy = { 75 }
                                                    >
                                                        { col.gate.theta }
                                                    </text>
                                                }
                                                {
                                                    col.gate.qid === "zrot" &&
                                                    <text
                                                        x = { 48 * colIndex + 8}
                                                        y = { 48 * rowIndex + 75}
                                                        fontSize={ "12px"}
                                                        fontWeight={"bold"}
                                                    >
                                                        { col.gate.theta }
                                                    </text>
                                                }
                                                {
                                                    col.gate.qid === "yrot" &&
                                                    <text
                                                        x = { 48 * colIndex + 8}
                                                        y = { 48 * rowIndex + 75}
                                                        fontSize={ "12px"}
                                                        fontWeight={"bold"}
                                                    >
                                                        { col.gate.theta }
                                                    </text>
                                                }
                                            </>
                                        }
                                    </g>
                                )
                            }})}
                        </g>
            )})}
    </svg>)
}