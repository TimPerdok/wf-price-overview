import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useState } from 'react';

// Import ModuleRegistry and the required module
import { Button, Card, CardContent, CardHeader, Link } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import WfMarketApi from '../api/WfMarketApi';
import { FlexColumn } from '../components/layout/Flex';
import useLocalStorage, { LocalStorageKeys } from '../hooks/useLocalStorage';
import { theme } from '../main';
import { ItemProfile, ItemsResponse } from '../types/Backend';
import { Metadata } from '../types/Metadata';

// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const GridCard = styled(Card)`
    height: 500px;
    width: 100%;
`

export default function Home() {
    const [localData, setLocalData] = useLocalStorage<ItemsResponse>(LocalStorageKeys.items, { items: [], total: 0 })
    const [metadata, setMetadata] = useLocalStorage<Metadata>(LocalStorageKeys.metadata, {})
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(() =>
        WfMarketApi.getItems()
            .then((data) => data && setLocalData(data))
            .then(() => {
                setMetadata({ last_updated: new Date().toString() })
            }), [localData, setLocalData, setMetadata])

    useEffect(() => {
        setIsLoading(true)
        fetchData().finally(() => setIsLoading(false))
    }, [])

    return (
        <FlexColumn $fullWidth $gapY='1rem'>
            <Card>
                <CardContent>
                    <CardHeader
                        action={<Button disabled={isLoading} onClick={fetchData}>Refresh</Button>}
                        title="Last updated: "
                        subheader={metadata?.last_updated}
                    />
                </CardContent>
            </Card>
            <Grid data={localData} />
        </FlexColumn>
    );
}

function Grid({ data }: { data: ItemsResponse }) {
    return (<>
        <GridCard>
            <AgGridReact<ItemProfile>
                rowData={data?.items}
                theme={themeQuartz
                    .withParams({
                        backgroundColor: theme.palette.background.default,
                        textColor: theme.palette.text.primary,
                        menuTextColor: theme.palette.text.primary,
                        borderColor: theme.palette.grey[800],
                        borderRadius: theme.shape.borderRadius
                    })}
                columnDefs={[
                    { field: 'id', flex: 1, hide: true },
                    { field: 'urlName', flex: 1, filter: true, cellRenderer: (params) => <Link href={`https://warframe.market/items/${params.value}`}>{params.value}</Link> },
                    { field: "itemName", flex: 1, filter: true },
                    { field: 'minPrice', flex: 1, filter: true },
                    { field: "avgPrice", flex: 1, filter: true },
                    { field: "tags", flex: 1, filter: true, valueFormatter: (params) => params.value?.join(", ") },
                    { field: "timestamp", flex: 1, filter: true, valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString() : "" }
                ]}
                defaultColDef={{
                    filter: true,
                    floatingFilter: true,
                }}
            >
            </AgGridReact>
        </GridCard>
    </>)
}