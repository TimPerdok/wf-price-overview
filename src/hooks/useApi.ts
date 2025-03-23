import { useEffect, useMemo, useState } from "react";

export default function useApi<ResultType>(apiCall: () => Promise<ResultType>, dependencies: any[]) {   
    const [state, setState] = useState<{
        data: ResultType | null,
        error: any | null,
        isLoading: boolean
    }>({
        data: null,
        error: null,
        isLoading: true
    })

    useEffect(() => {
        apiCall()
            .then((data: ResultType) => {
                setState({ data, error: null, isLoading: false })
            })
            .catch((error) => {
                setState({ data: null, error, isLoading: false })
            })
    }, dependencies)

    return state
}