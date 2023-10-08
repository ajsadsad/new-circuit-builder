import { useMemo, useState } from "react";

export default function useUndoRedoCBState(initialCBState, setQubitOp) {

    const [states, setStates] = useState([initialCBState]);
    const [index, setIndex] = useState(0);

    const state = useMemo(() => states[index], [states,index]);

    const setState = (value) => {
        if(state === value) {
            return;
        }
        const copy = states.slice(0, index + 1);
        console.log(copy);
        copy.push(value);
        setStates(copy);
        setIndex(copy.length - 1);
    };

    const undo = (steps = 1) => {
        setIndex(Math.max(0, Number(index) - (Number(steps) || 1)));
        setQubitOp(states[index - 1]);
    }

    const redo = (steps = 1) => {
        setIndex(Math.min(states.length - 1, Number(index) + (Number(steps) || 1)));
        setQubitOp(states[index + 1]);
    };

    return {
        state,
        setState,
        index,
        lastIndex : states.length - 1,
        undo,
        redo,
    }
}