import styles from '../css/Grid.module.css'
import circle from '../../assets/plus-circle-dotted.svg'
import AdaptiveTextBox from '../CompoundGates/AdaptiveTextBox'

export default function NewCircuitGrid ({ qubitStates, handleChange, addQubit, svgRef, rectRef, startDrawRect, endDrawRect, drawRect, imgRef, qubitCellRef, handleOnMouseDown, handleOnMouseUp, handleOnClick, pathRef, circleRef, handleHover}) {

    return(
        <svg
            height = { 70 * (qubitStates.length + 1) }
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
            <line ref = { pathRef }></line>
            <circle ref = { circleRef }> </circle>
        {
            qubitStates.map((row, rowIndex) => {
                return (
                    <g className = { styles.qubit } key = { rowIndex }>
                        {
                            rowIndex === qubitStates.length - 1 ?
                            <line
                                x1 = { 58 }
                                y1 = { 58 * (rowIndex + 1) }
                                x2 = { 58 * row.length}
                                y2 = { 58 * (rowIndex + 1) }
                                id = { rowIndex }
                                style = {{ "stroke": "rgb(192,192,192)", "stroke-width": "2", "z-index": "1", "position": "relative", "stroke-linecap": "square",}}
                            />
                            :
                            <line
                                x1 = { 58 }
                                y1 = { 58 * (rowIndex + 1) }
                                x2 = { 58 * row.length}
                                y2 = { 58 * (rowIndex + 1) }
                                id = { rowIndex }
                            />
                        }
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
                                            {"q[" + (rowIndex + 1) + "]"}
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
                                                onDragOver = {(e) => { e.preventDefault(); handleHover(e); }}
                                                onDragLeave = {(e) => { e.preventDefault(); handleHover(e); }}
                                                onDrop = {(e) => { e.preventDefault(); e.stopPropagation(); handleChange(e); }}
                                            />
                                            :
                                            <>
                                            {
                                                col.gate.qid === "compound_gate" ?
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
                                                    />
                                                    <rect
                                                        x = { 58 * colIndex + 6.5}
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
                                                col.gate.qid !== "compound_gate" ?
                                                <>
                                                    {
                                                        col.gate.gateName === "cnot_target" &&
                                                        col.gate.q_target > col.gate.q_control ?
                                                        <line
                                                            x1 = { 58 * colIndex + 29.5}
                                                            y1 = { 58 * rowIndex + 50 }
                                                            x2 = { 58 * colIndex + 29.5}
                                                            y2 = { 58 * rowIndex + 37 }
                                                            style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                        >
                                                        </line>
                                                        :
                                                        col.gate.gateName === "cnot_target" &&
                                                        <line
                                                            x1 = { 58 * colIndex + 29.5}
                                                            y1 = { 58 * rowIndex + 50 }
                                                            x2 = { 58 * colIndex + 29.5}
                                                            y2 = { 58 * (rowIndex + 2) }
                                                            style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                        >
                                                        </line>
                                                    }
                                                        <>
                                                        {
                                                        col.gate.qid === "cnot" &&
                                                        col.gate.q_target > col.gate.q_control &&
                                                        <line
                                                            x1 = { 58 * colIndex + 29.5}
                                                            y1 = { 58 * rowIndex + 50 }
                                                            x2 = { 58 * colIndex + 29.5}
                                                            y2 = { 58 * (rowIndex + 2) }
                                                            style = {{"stroke-width" : "5px", "stroke" : "black"}}
                                                        >
                                                        </line>
                                                        }
                                                            <image
                                                                x = { 58 * colIndex + 9}
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
                                                        </>
                                                </>
                                                :
                                                <>
                                                    {
                                                        parseInt(col.gate.location.tail) === rowIndex &&
                                                        <AdaptiveTextBox
                                                            row = { col.gate.location.head}
                                                            col = { colIndex }
                                                            width = { 45 }
                                                            height = { 56 * (col.gate.location.tail - col.gate.location.head + 1)}
                                                            text = { col.gate.gateName }
                                                            handleOnMouseDown = { handleOnMouseDown }
                                                            handleOnMouseUp = { handleOnMouseUp }
                                                            handleOnClick = { handleOnClick }
                                                            gate = { JSON.stringify(col.gate) }
                                                        />
                                                    }
                                                </>
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
        <image ref = {imgRef} pointerEvents={ "none" }> </image>
    </svg>)
}