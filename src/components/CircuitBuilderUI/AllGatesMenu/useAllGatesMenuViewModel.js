import useAllGatesMenuModel from './useAllGatesMenuModel'

const useAllGatesMenuViewModel = () => {
    const { gates } = useAllGatesMenuModel()

    return {
        gates
    }
}

export default useAllGatesMenuViewModel