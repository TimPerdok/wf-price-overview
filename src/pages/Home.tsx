import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React, { Suspense, use, useMemo } from 'react';

// Import ModuleRegistry and the required module
import { Card, Link, TextField } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import { FlexColumn } from '../components/layout/Flex';
import useLocalStorage, { LocalStorageKeys } from '../hooks/useLocalStorage';
import { theme } from '../main';
import { Item, ItemsResponse } from '../types/WfMarket';
import WfMarketApi from '../api/WfMarketApi';
import { Spinner } from '../components/Spinner';

// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const GridCard = styled(Card)`
    height: 500px;
    width: 100%;
`

export default function Home() {
    return (
        <FlexColumn $fullWidth $gapY='1rem'>
            <Suspense fallback={
                <Card>
                    <Spinner />
                </Card>
            }>
                <Grid />
            </Suspense>
        </FlexColumn>
    );
}

function Grid() {
    const items = use(WfMarketApi.getItems)
    return (<GridCard>
        <AgGridReact<Item>
            theme={themeQuartz
                .withParams({
                    backgroundColor: theme.palette.background.default,
                    textColor: theme.palette.text.primary,
                    menuTextColor: theme.palette.text.primary,
                    borderColor: theme.palette.grey[800]
                })}
            columnDefs={[
                { field: 'id', flex: 1, hide: true },
                { field: 'url_name', flex: 1, filter: true, cellRenderer: (params) => <Link href={`https://warframe.market/items/${params.value}`}>{params.value}</Link> },
                { field: "item_name", flex: 1, filter: true },
                { field: 'min_price', flex: 1, filter: true },
                { field: "average_price", flex: 1, filter: true },
                { field: "detail.tags", flex: 1, filter: true, valueFormatter: (params) => params.value?.join(", ") },
                // { field: "last_update", flex: 1, cellRenderer: (params) => params.value ? new Date(params.value).toLocaleString() : "-" }
            ]}
            defaultColDef={{
                filter: true,
                floatingFilter: true,
            }}
            rowData={items}>
        </AgGridReact>
    </GridCard>)
}