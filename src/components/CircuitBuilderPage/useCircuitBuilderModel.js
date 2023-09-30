import data from '../../assets/standardGates.json'

const useCircuitBuilderModel = () => {

    function sendCircuitData(test) {
        console.log(test);
    }

    return {
        gates : data,
        sendCircuitData,
    }
}

export default useCircuitBuilderModel;