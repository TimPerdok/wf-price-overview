import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React, { Suspense } from 'react';

// Import ModuleRegistry and the required module
import { Card, Link } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import WfMarketApi from '../api/WfMarketApi';
import { FlexColumn } from '../components/layout/Flex';
import { Spinner } from '../components/Spinner';
import useApi from '../hooks/useApi';
import { theme } from '../main';
import { ItemProfile, ItemsResponse } from '../types/Backend';

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
    const { data, error } = useApi<ItemsResponse>(WfMarketApi.getItems)

    return (<GridCard>
        <AgGridReact<ItemProfile>
            rowData={data?.items}
            theme={themeQuartz
                .withParams({
                    backgroundColor: theme.palette.background.default,
                    textColor: theme.palette.text.primary,
                    menuTextColor: theme.palette.text.primary,
                    borderColor: theme.palette.grey[800]
                })}
            columnDefs={[
                { field: 'id', flex: 1, hide: true },
                { field: 'urlName', flex: 1, filter: true, cellRenderer: (params) => <Link href={`https://warframe.market/items/${params.value}`}>{params.value}</Link> },
                { field: "itemName", flex: 1, filter: true },
                { field: 'minPrice', flex: 1, filter: true },
                { field: "avgPrice", flex: 1, filter: true },
                { field: "tags", flex: 1, filter: true, valueFormatter: (params) => params.value?.join(", ") },
            ]}
            defaultColDef={{
                filter: true,
                floatingFilter: true,
            }}
        // rowModelType="infinite"
        // datasource={{
        //     getRows: async (params) => {
        //         const filter = params.filterModel as FilterModel;
        //         const res = await WfMarketApi.getItems(params.startRow, params.endRow, filter)
        //         params.successCallback(res.items, res.total)
        //     }
        // }}
        >
        </AgGridReact>
    </GridCard>)
}