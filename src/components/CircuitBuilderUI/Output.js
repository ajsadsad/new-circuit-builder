import React, { useState, useEffect, useRef } from 'react'
import styles from '../css/CircuitBuilder.module.css';

export default function Output ({ outputView, codeView, faveGatesView, optionsView }) {
    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, [codeView, faveGatesView, optionsView]);

    return(
        <div>
            
        </div>

    )
        


    
}