import React, { useCallback, useEffect, useState } from 'react';
import ProxyApi from '../api/ProxyApi';
import ItemGrid from '../components/ItemGrid';
import LastUpdatedCard from '../components/LastUpdatedCard';
import { FlexColumn } from '../components/layout/Flex';
import useLocalStorage, { LocalStorageKeys } from '../hooks/useLocalStorage';
import { ItemsResponse } from '../types/Backend';
import { Metadata } from '../types/Metadata';
import useWindowVar, { WindowVarKey } from '../hooks/useWindowVar';
import { Box } from '@mui/material';

export default function Home() {
    const [localData, setLocalData] = useLocalStorage<ItemsResponse>(LocalStorageKeys.items, { items: [], total: 0 })
    const [metadata, setMetadata] = useLocalStorage<Metadata>(LocalStorageKeys.metadata, {})
    const [hasFetchedItems, setHasFetchedItems] = useWindowVar(WindowVarKey.hasFetchedItems, false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(() => {
        setIsLoading(true)
        return ProxyApi.getItems()
            .then((data) => data && setLocalData(data))
            .then(() => {
                setMetadata({ last_updated: new Date().toString() })
            })
            .finally(() => setIsLoading(false))
    }, [localData, setLocalData, setMetadata]);

    useEffect(() => {
        if (localData.items.length > 0) return;
        if (hasFetchedItems) return;
        setHasFetchedItems(true)
        fetchData()
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)', rowGap: '1rem' }}>
            <LastUpdatedCard
                isLoading={isLoading}
                onClick={fetchData}
                lastUpdated={metadata.last_updated ? new Date(metadata.last_updated) : undefined} />
            <ItemGrid data={localData} />
        </Box>
    );
}
