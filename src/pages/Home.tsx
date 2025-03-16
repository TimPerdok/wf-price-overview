import React, { useCallback, useEffect, useState } from 'react';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import WfMarketApi from '../api/WfMarketApi';
import LastUpdatedCard from '../components/LastUpdatedCard';
import { FlexColumn } from '../components/layout/Flex';
import useLocalStorage, { LocalStorageKeys } from '../hooks/useLocalStorage';
import { ItemsResponse } from '../types/Backend';
import { Metadata } from '../types/Metadata';
import ItemGrid from '../components/ItemGrid';

export default function Home() {
    const [localData, setLocalData] = useLocalStorage<ItemsResponse>(LocalStorageKeys.items, { items: [], total: 0 })
    const [metadata, setMetadata] = useLocalStorage<Metadata>(LocalStorageKeys.metadata, {})
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(() => {
        setIsLoading(true)
        return WfMarketApi.getItems()
            .then((data) => data && setLocalData(data))
            .then(() => {
                setMetadata({ last_updated: new Date().toString() })
            })
    }, [localData, setLocalData, setMetadata]);

    useEffect(() => {
        fetchData().finally(() => setIsLoading(false))
    }, [])


    return (
        <FlexColumn $fullWidth $gapY='1rem'>
            <LastUpdatedCard isLoading={isLoading} onClick={fetchData} lastUpdated={metadata.last_updated ? new Date(metadata.last_updated) : undefined} />
            <ItemGrid data={localData} />
        </FlexColumn>
    );
}
