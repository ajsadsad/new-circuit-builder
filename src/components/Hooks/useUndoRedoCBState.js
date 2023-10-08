import { useMemo, useState } from "react";

export default function useUndoRedoCBState(initialCBState, setQubitOp) {

    const [states, setStates] = useState([initialCBState]);
    const [index, setIndex] = useState(0);

    const state = useMemo(() => states[index], [states,index]);

    //Weird bug where after undoing an action and placing a new gate, everything afterwards just counts as one big action and not individual.
    const setState = (value) => {
        if(JSON.stringify(state) === JSON.stringify(value)) {
            console.log("HAHA");
            return;
        }
        const copy = states.slice(0, index + 1);
        copy.push(value);
        setStates(copy);
        setIndex(copy.length - 1);
    };

    const undo = (steps = 1) => {
        setQubitOp(states[index-1]);
        setIndex(Math.max(0, Number(index) - (Number(steps) || 1)));
    }

    const redo = (steps = 1) => {
        setQubitOp(states[index+1]);
        setIndex(Math.min(states.length - 1, Number(index) + (Number(steps) || 1)));
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