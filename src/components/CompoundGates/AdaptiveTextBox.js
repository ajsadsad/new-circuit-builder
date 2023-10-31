import React from 'react';
import styles from '../sass/AdaptiveTextbox.module.scss';

// this was taken from original Quokka project and refactored to suit this iteration of the project

export default function AdaptiveTextBox({ width, height, text, col, row, handleOnMouseDown, handleOnMouseUp, gate, handleOnClick}) {

    var orientation = {type: "horizontal", value: `rotate(0)`}
    var padding = {
        left: 0.1 * width,
        top: 0.6 * height,
        right: 0.1 * width,
        bottom: 0.1 * height
         }
    var textWidth = width - padding.left - padding.right;
    var textFontSize = 0.4 * width;
    var offset = {dx: 0, dy: padding.top}
    if (width < height) {
        orientation = {type: "vertical", value: `rotate(90)`}
        padding = {
            left: -col * 58 - 18,
            top:  height,
            right: 0.5 * width,
            bottom: 0.1 * height
            }
        textWidth = 0.5 * height;
        textFontSize = 0.1 * height;
    }

    return (
        <g height = { height } width = { width } className={styles.adaptiveTextbox} fill="transparent">
            <rect
                className={styles.textBoxRect}
                width = { width }
                height = { height }
                x = { 58 * col + 7 }
                y = { (row*58) + 36 }
                rx = { 4 }
                onMouseUp={ (e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseUp(e)}}
                onMouseDown = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnMouseDown(e, col.gate); }}
                onClick = {(e) => { e.preventDefault(); e.stopPropagation(); handleOnClick(e); }}
                gate = {gate}
            />
                <text transform={"rotate(270)"}
                    className={styles.text}
                    fontSize={16}
                    x = {-((row * 58) + 42)}
                    y = {58 * col + 28}
                    textAnchor={"end"}
                    textLength = { height - text.length}
                    lengthAdjust ={ "spacing" }
                    letterSpacing="1"
                >
                    {text}
                </text>
        </g>
    )
}