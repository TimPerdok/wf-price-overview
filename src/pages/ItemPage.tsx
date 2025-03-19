import { Box, Card, CardContent, CardHeader, CardMedia, Grid2, Link, styled } from '@mui/material';
import React from 'react';
import ProxyApi from '../api/ProxyApi';
import { FlexColumn, FlexRow } from '../components/layout/Flex';
import useApi from '../hooks/useApi';
import useUrlParams from '../hooks/useUrlParams';
import { ALL_ROUTES } from '../main';

export default function ItemPage() {
    const { urlName } = useUrlParams(ALL_ROUTES.ITEM)
    const { data: item, error, isLoading } = useApi(() => ProxyApi.getItem(urlName ?? ""))
    if (isLoading) return <div>Loading...</div>
    if (!item) return <></>
    const { itemName, description } = item;

    return <>
        <FlexColumn>
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
                <Grid2 size={{ xs: 12, sm: "grow"}}>
                    <Card>
                        <CardHeader
                            title={itemName}
                            subheader={description}
                        />
                        <CardContent>
                            <h3>Links</h3>
                            <Link href={`https://warframe.market/items/${item.urlName}`}>Market</Link>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </FlexColumn >
    </>

}
