import { useEffect, useMemo, useState } from "react";

type UseApiResponse<ResultType> = {
    data: ResultType,
    error: null,
    isLoading: false
} | {
    data: null,
    error: Error,
    isLoading: false
} | {
    data: null,
    error: null,
    isLoading: true
}

export default function useApi<ResultType>(
    apiCall: () => Promise<ResultType>,
    dependencies: any[]
): UseApiResponse<ResultType> {
    const [state, setState] = useState<UseApiResponse<ResultType>>({
        data: null,
        error: null,
        isLoading: true
    })

    useEffect(() => {
        apiCall()
            .then((data: ResultType) => {
                setState({ data, error: null, isLoading: false })
            })
            .catch(((error: Error) => {
                setState({ data: null, error, isLoading: false })
            }))
    }, dependencies)

    return state
}