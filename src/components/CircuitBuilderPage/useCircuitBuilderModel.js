import { useCallback, useState } from 'react';
import data from '../../assets/standardGates.json'

const useCircuitBuilderModel = () => {

    function sendCircuitData(test) {
        console.log(test);
    }

    const gates = data.Gates.map((gateInfo) => {
        let gateData = JSON.stringify(gateInfo);
        return gateData
    });

    return {
        gates,
        sendCircuitData,
    }
}

export default useCircuitBuilderModel;