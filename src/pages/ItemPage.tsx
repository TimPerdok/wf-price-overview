import { Box, Button, Card, CardContent, CardHeader, Grid2, Link } from '@mui/material';
import React from 'react';
import { Line } from 'react-chartjs-2';
import ProxyApi from '../api/ProxyApi';
import ChartWrapper from '../components/ChartJsWrapper';
import { FlexColumn } from '../components/layout/Flex';
import useApi from '../hooks/useApi';
import useUrlParams from '../hooks/useUrlParams';
import { ALL_ROUTES } from '../main';
import { ItemsResponse, ItemSummary, PricePoint } from '../types/Backend';
import useNavigator from '../hooks/useNavigator';

export default function ItemPage() {
    const {navigateTo} = useNavigator()
    const { urlName } = useUrlParams(ALL_ROUTES.ITEM)
    const { data, error, isLoading } = useApi(() => ProxyApi.getItemProfile(urlName ?? ""))
    if (isLoading) return <div>Loading...</div>

    const defaultItemProfile = { item: { itemName: "", description: "" } as Partial<ItemSummary>, prices: [] as PricePoint[] } ;
    const { item, prices } = data || defaultItemProfile
    const { itemName, description } = item;

    return <>
        <FlexColumn>
            <div>
            <Button variant="text" onClick={() => navigateTo(ALL_ROUTES.HOME.path)}>Back</Button>
            
            </div>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }} sx={{ width: { sm: 200 } }}>
                    <Card>
                        <Grid2
                            container
                            alignItems="center"
                            padding={4}
                            justifyContent="center">
                            <Box
                                component="img"
                                sx={{ minWidth: "100px" }}
                                src={`https://warframe.market/static/assets/${item.thumb}`}
                            />
                        </Grid2>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: "grow" }}>
                    <Card>
                        <CardHeader
                            title={itemName}
                            subheader={description} />
                        <CardContent>
                            <ChartWrapper>
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                type: "time",
                                                time: {
                                                    unit: "day"
                                                }
                                            },
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    precision: 0
                                                }
                                            }
                                        }
                                    }}
                                    data={{
                                        labels: prices.map(p => p.timestamp),
                                        datasets: [{
                                            label: 'Minimum Price',
                                            data: prices.map(p => p.minPrice),
                                        }, {
                                            label: 'Average Price (out of 3)',
                                            data: prices.map(p => p.avgPrice),
                                        }]
                                    }}
                                    height={400}
                                ></Line>
                            </ChartWrapper>
                            <h3>Links</h3>
                            <Link href={`https://warframe.market/items/${item.urlName}`}>Market</Link>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </FlexColumn >
    </>

}
