import { useEffect, useState } from "react";

export default function useApi<ResultType>(api: Function) {
    const [state, setState] = useState<{
        data: ResultType | null,
        error: any | null,
        loading: boolean
    }>({
        data: null,
        error: null,
        loading: true
    })

    useEffect(() => {
        api()
            .then((data: ResultType) => setState({ data, error: null, loading: false }))
            .catch((error) => setState({ data: null, error, loading: false }))
    }, [])

    return state
}