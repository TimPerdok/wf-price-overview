import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from 'react';

// Import ModuleRegistry and the required module
import { Card, TextField } from '@mui/material';
import {
    AllCommunityModule,
    ModuleRegistry,
} from 'ag-grid-community';
import styled from 'styled-components';
import { FlexColumn } from '../components/layout/Flex';
import useLocalStorage, { LocalStorageKeys } from '../hooks/useLocalStorage';
import { theme } from '../main';
import { Item, ItemsResponse } from '../types/WfMarket';

// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const GridCard = styled(Card)`
    height: 500px;
    width: 100%;
`

export default function Home() {
    const [marketData, setMarketData] = useLocalStorage<string>(LocalStorageKeys.MARKET_DATA, "");
    const marketDataJSON: ItemsResponse = useMemo(() => {
        try {
            return JSON.parse(marketData);
        } catch (e) {
            return null;
        }
    }, [marketData]);
    console.log("rereneder")
    return (
        <FlexColumn $fullWidth $gapY='1rem'>
            <Card>
                <a href="https://api.warframe.market/v1/items" target="_blank" rel="noopener noreferrer">tet</a>
                <TextField label="Market Data"
                    fullWidth
                    multiline
                    rows={10}
                    variant="filled"
                    defaultValue={marketData}
                    onChange={({ target: { value } }) => setMarketData(value)} />
            </Card>
            <GridCard>
                <AgGridReact<Item>
                    theme={themeQuartz
                        .withParams({
                            backgroundColor: "transparent",
                            textColor: theme.palette.text.primary,
                            borderColor: theme.palette.grey[800]

                        })}
                    columnDefs={[
                        { field: 'id', flex: 1 },
                        { field: 'url_name', flex: 1 },
                    ]}
                    rowData={marketDataJSON?.payload.items}>
                </AgGridReact>
            </GridCard>
        </FlexColumn>
    );
}