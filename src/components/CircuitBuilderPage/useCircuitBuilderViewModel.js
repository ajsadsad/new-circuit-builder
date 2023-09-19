import useCircuitBuilderModel from './useCircuitBuilderModel'

const useCircuitBuilderViewModel = () => {
    const {
        gates,
    } = useCircuitBuilderModel();

    return {
        gates,
    }
}

export default useCircuitBuilderViewModel;