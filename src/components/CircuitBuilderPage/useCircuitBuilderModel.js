import { useState } from 'react'

const useCircuitBuilderModel =  () => {
    const [gates, setGates] = useState(null);

    return {
        gates
    }
}

export default useCircuitBuilderModel;