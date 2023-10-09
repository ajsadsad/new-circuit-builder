import { useMemo, useState } from "react";

export default function useUndoRedoCBState(initialCBState, setQubitOp) {

    const [states, setStates] = useState([initialCBState]);
    const [index, setIndex] = useState(0);

    const currQBState = useMemo(() => states[index], [states,index]);

    //Weird bug where after undoing an action and placing a new gate, everything afterwards just counts as one big action and not individual.
    const setState = (value) => {
        console.log(currQBState);
        if(JSON.stringify(currQBState) === JSON.stringify(value)) {
            console.log("HAHA");
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