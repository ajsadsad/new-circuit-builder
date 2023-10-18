import { useEffect } from 'react';

export default function Canvas({canvasRef, contextRef, startDrawRect, endDrawRect, drawRect}) {

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 2000;
        canvas.height = 1000;
        canvas.position = "absolute";
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, [])

    return (
        <canvas
            ref = { canvasRef }
            style = {{"position" : "absolute", "left": "0", "right":"0", "z-index" : "0"}}
            onMouseDown = { (e) => { startDrawRect(e); console.log(e.clientX + " " + e.clientY) }}
            onMouseMove = { (e) => { drawRect(e) } }
            onMouseUp = { endDrawRect }
            onMouseLeave = { endDrawRect }
        >
        </canvas>
    )
}