import { useMemo, useState } from "react";

export default function useUndoRedoCBState(initialCBState) {

    const [states, setStates] = useState([initialCBState]);
    const [index, setIndex] = useState(0);

    const currQBState = useMemo(() => states[index], [states,index]);

    const setState = (value) => {
        if(JSON.stringify(currQBState) === JSON.stringify(value)) {
            return;
        }
        const copy = states.slice(0, index + 1);
        copy.push(value);
        setStates(copy);
        setIndex(copy.length - 1);
    };

    const undo = (steps = 1) => {
        setIndex(Math.max(0, Number(index) - (Number(steps) || 1)));
    }

    const redo = (steps = 1) => {
        console.log("click")
        setIndex(Math.min(states.length - 1, Number(index) + (Number(steps) || 1)));
    };

    return {
        currQBState,
        setState,
        index,
        lastIndex : states.length - 1,
        undo,
        redo,
    }
}