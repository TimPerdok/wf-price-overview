import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React from 'react';

// Import ModuleRegistry and the required module
import { Box, Card, Link, Typography } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import { FlexColumn } from '../components/layout/Flex';
import { ALL_ROUTES } from '../main';
import theme from "../Theme";
import { ItemsResponse, ItemSummary } from '../types/Backend';
import ListFilter, { ListFilterLabel } from './aggrid/ListFilter';
import InternalLink from './InternalLink';
import match from '../monads/Match';

// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const GridCard = styled(Card)`
    flex-grow: 1;
    padding: 1rem;
`

export default function ItemGrid({ data }: { data: ItemsResponse }) {

    const tags = React.useMemo(() => {
        const tagSet = new Set<string>();
        data.items.forEach((item) => {
            item.tags.forEach((tag) => {
                tagSet.add(tag);
            });
        });
        return tagSet;
    }, [data.items]);

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
                        field: 'urlName',
                        flex: 1,
                        filter: true,
                        cellRenderer: (params) => <InternalLink
                            to={ALL_ROUTES.ITEM.createUrl({
                                urlName: params.value
                            })}>{params.value}</InternalLink>,
                        sort: 'asc',
                    },
                    { field: "itemName", flex: 1, filter: true },
                    { field: 'minimumPrice', flex: 1, filter: true },
                    { field: "averagePrice", flex: 1, filter: true },
                    {
                        field: "setPriceDifference",
                        flex: 1,
                        filter: true,
                        cellRenderer: ({ data }: { data: ItemSummary }) => <PriceDifference difference={data.setPriceDifference} />,
                    },
                    {
                        field: "tags",
                        flex: 1,
                        filterValueGetter: (params) => params.data?.tags ?? [],
                        valueFormatter: (params) => params.data?.tags?.join(", ") ?? "",
                        floatingFilterComponent: ListFilterLabel,
                        filter: (filterProps) => <ListFilter {...filterProps} tags={tags} />,
                    },
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

function PriceDifference({ difference, invert }: { difference: number, invert?: boolean }) {
    const adjustedDifference = invert ? -difference : difference;

    const color = match(
        () => "text.secondary",
        { condition: (value) => value > 0, action: () => "success.main" },
        { condition: (value) => value < 0, action: () => "error.main" },
    )(adjustedDifference);

    const sign = match(
        () => "",
        { condition: (value) => value > 0, action: () => "+" },
        { condition: (value) => value < 0, action: () => "" },
    )(adjustedDifference);
    
    return <Typography variant='caption' color={color}>
        {sign}{difference}
    </Typography>
}