import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import ProxyApi from '../api/ProxyApi';
import { ALL_ROUTES } from '../main';
import useUrlParams from '../hooks/useUrlParams';
import { FlexColumn } from '../components/layout/Flex';
import { Card, CardHeader } from '@mui/material';

export default function ItemPage() {
    const { urlName } = useUrlParams(ALL_ROUTES.ITEM)
    const { data, error, isLoading } = useApi(() => ProxyApi.getItem(urlName ?? ""))
    if (isLoading) return <div>Loading...</div>
    if (!data) return <></>
    const { itemName } = data;

    return <>
        <FlexColumn>
            <Card>
                <CardHeader
                    title={itemName}
                />
            </Card>
        </FlexColumn>
    </>

}
