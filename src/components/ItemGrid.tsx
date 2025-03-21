import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React from 'react';

// Import ModuleRegistry and the required module
import { Box, Card, Link } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import { FlexColumn } from '../components/layout/Flex';
import { ALL_ROUTES } from '../main';
import theme from "../Theme";
import { ItemsResponse, ItemSummary } from '../types/Backend';
import InternalLink from './InternalLink';


// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const GridCard = styled(Card)`
    width: 100%;
    flex-grow: 1;
    padding: 1rem;
`

export default function ItemGrid({ data }: { data: ItemsResponse }) {
    return (<>
        <GridCard>
            <AgGridReact<ItemSummary>
                rowData={data?.items}
                theme={themeQuartz
                    .withParams({
                        backgroundColor: theme.palette.background.default,
                        textColor: theme.palette.text.primary,
                        menuTextColor: theme.palette.text.primary,
                        borderColor: theme.palette.grey[800],
                        wrapperBorder: "transparent",
                        borderRadius: theme.shape.borderRadius,
                    })}
                columnDefs={[
                    { field: 'id', flex: 1, hide: true },
                    {
                        field: 'thumb',
                        width: 85,
                        filter: false,
                        headerName: "",
                        cellRenderer: (params) => <FlexColumn $alignHorizontal='center' $alignVertical='center'>
                            <Box
                                component="img"
                                sx={{ height: 41, maxWidth: 85 }}
                                src={`https://warframe.market/static/assets/${params.value}`}
                            />
                        </FlexColumn>
                    },
                    {
                        field: 'urlName', flex: 1, filter: true, cellRenderer: (params) => <InternalLink
                            to={ALL_ROUTES.ITEM.createUrl({
                                urlName: params.value
                            })}>{params.value}</InternalLink>
                    },
                    { field: "itemName", flex: 1, filter: true },
                    { field: 'minPrice', flex: 1, filter: true },
                    { field: "avgPrice", flex: 1, filter: true },
                    { field: "tags", flex: 1, filter: true, valueFormatter: (params) => params.value?.join(", ") },
                    // { field: "timestamp", flex: 1, filter: true, valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString() : "" }
                    { headerName: "Links", cellRenderer: ({ data }) => <Link href={`https://warframe.market/items/${data.urlName}`}>Market</Link> },
                ]}
                defaultColDef={{
                    filter: true,
                    floatingFilter: true,
                }}
            >
            </AgGridReact >
        </GridCard >
    </>)
}