import useAllGatesMenuViewModel from "./useAllGatesMenuViewModel";

const useAllGatesMenuViewController = () => {

    const { gates } = useAllGatesMenuViewModel();


    return {
        gates
    }
}

export default useAllGatesMenuViewController;