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
                    <g className = { styles.qubit } key = { rowIndex }>
                        <line
                            x1 = { 58 }
                            y1 = { 57 * (rowIndex + 1) }
                            x2 = { 58 * row.length}
                            y2 = { 57 * (rowIndex + 1) }
                            id = { rowIndex }
                        />
                    {
                        row.map((col, colIndex) => {
                            if(colIndex === 0 && rowIndex === qubitStates.length - 1) {
                                return (
                                <g key = { rowIndex + "." + colIndex }>
                                    <image
                                        x = { 58 * colIndex + 12 }
                                        y = { 58 * rowIndex + 43 }
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
                                    <g key = { "Qubit num: " + rowIndex + "." + colIndex }>
                                        <text
                                            x = { 58 * colIndex + 12 }
                                            y = { 58 * rowIndex + 62 }
                                            width = { 58 }
                                            height = { 58 }
                                            className = {styles.disableTextSelection}
                                        >
                                            {"q[" + rowIndex + "]"}
                                        </text>
                                    </g>
                                )
                            } else {
                                return (
                                    <g key = { "Qubit Cell: " + rowIndex + "." + colIndex }>
                                        {
                                            !col.hasGate ?
                                            <rect
                                                x = { 58 * colIndex }
                                                y = { 58 * rowIndex + 28}
                                                width = { 58 }
                                                height = { 58 }
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
                                            {
                                                col.gate.gateName === "Compound Gate" ?
                                                <>
                                                    <rect
                                                        x = { 58 * colIndex }
                                                        y = { 58 * rowIndex + 24}
                                                        width = { 58 }
                                                        height = { 58 }
                                                        row = { rowIndex }
                                                        col = { colIndex }
                                                        style = {{"fill" : "none"}}
                                                    />
                                                    <rect
                                                        x = { 58 * colIndex + 7}
                                                        y = { 58 * rowIndex + 34.5}
                                                        ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                        width = { 45 }
                                                        height = { 54 }
                                                        row = { rowIndex }
                                                        col = { colIndex }
                                                        style = {{"fill" : "none"}}
                                                        gate={JSON.stringify(col.gate)}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <rect
                                                        x = { 58 * colIndex }
                                                        y = { 58 * rowIndex + 28}
                                                        width = { 58 }
                                                        height = { 58 }
                                                        row = { rowIndex }
                                                        col = { colIndex }
                                                        style = {{"fill" : "none"}}
                                                        gate={JSON.stringify(col.gate)}
                                                    />
                                                    <rect
                                                        x = { 58 * colIndex + 7}
                                                        y = { 58 * rowIndex + 34.5}
                                                        ref = { r => (qubitCellRef.current[rowIndex][colIndex] = r) }
                                                        width = { 45 }
                                                        height = { 45 }
                                                        row = { rowIndex }
                                                        col = { colIndex }
                                                        style = {{"fill" : "none", }}
                                                        gate={JSON.stringify(col.gate)}
                                                    />
                                                </>
                                            }
                                            {
                                                col.gate.gateName !== "Compound Gate" ?
                                                <image
                                                    x = { 58 * colIndex + 9.5}
                                                    y = { 58 * rowIndex + 37}
                                                    gate={JSON.stringify(col.gate)}
                                                    row = { rowIndex }
                                                    col = { colIndex }
                                                    inqubit = {"true"}
                                                    onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseUp(e)}}
                                                    onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseDown(e, col.gate); }}
                                                    onClick = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnClick(e); }}
                                                    href={require(`../../assets/${col.gate.img}`)}
                                                />
                                                :
                                                <rect
                                                    x = { 58 * colIndex + 7}
                                                    y = { 58 * rowIndex + 34.5}
                                                    width = { 45 }
                                                    height = { 54 }
                                                    row = { rowIndex }
                                                    col = { colIndex }
                                                    style = {{"fill" : "black"}}
                                                    onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseUp(e)}}
                                                    onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseDown(e, col.gate); }}
                                                    onClick = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnClick(e); }}
                                                    gate={JSON.stringify(col.gate)}
                                                />
                                            }
                                            {
                                                col.gate.qid === "xrot" &&
                                                <text
                                                    x = { 58 * colIndex + 17}
                                                    y = { 58 * rowIndex + 87}
                                                    fontSize={ "12px"}
                                                    fontWeight={"bold"}
                                                >
                                                    { col.gate.theta }
                                                </text>
                                            }
                                            {
                                                col.gate.qid === "zrot" &&
                                                <text
                                                    x = { 58 * colIndex + 17}
                                                    y = { 58 * rowIndex + 87}
                                                    fontSize={ "12px"}
                                                    fontWeight={"bold"}
                                                >
                                                    { col.gate.theta }
                                                </text>
                                            }
                                            {
                                                col.gate.qid === "yrot" &&
                                                <text
                                                    x = { 58 * colIndex + 17 }
                                                    y = { 58 * rowIndex + 87 }
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