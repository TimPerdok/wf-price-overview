import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid2, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { Line } from 'react-chartjs-2';
import ProxyApi from '../api/ProxyApi';
// @ts-ignore
import wfMarketIcon from "../assets/images/wf-market-512x512.webp";
// @ts-ignore
import wfWikiIcon from "../assets/images/wf-wiki-78px.webp";
import ChartWrapper from '../components/ChartJsWrapper';
import Image, { ItemImage } from '../components/Image';
import InternalLink from '../components/InternalLink';
import { FlexColumn, FlexRow } from '../components/layout/Flex';
import useApi from '../hooks/useApi';
import useNavigator from '../hooks/useNavigator';
import useUrlParams from '../hooks/useUrlParams';
import { ALL_ROUTES } from '../main';
import theme from '../Theme';
import { Item, PricePoint, SetItemProfile } from '../types/Backend';

export default function ItemPage() {
    const { navigateTo } = useNavigator()
    const { urlName } = useUrlParams(ALL_ROUTES.ITEM)
    const { data, error, isLoading } = useApi(() => ProxyApi.getItemProfile(urlName ?? ""), [urlName])
    if (isLoading) return <div>Loading...</div>

    const defaultItemProfile = {
        item: { itemName: "", description: "", urlName: "" } as Partial<Item>,
        prices: [] as PricePoint[],
        setItemProfiles: [] as SetItemProfile[]
    };
    const { item, prices, setItemProfiles } = data || defaultItemProfile
    const { itemName, description } = item;

    const setItemProfile = setItemProfiles.find(p => p.item.tags.includes("set"))

    const setNameToBaseName = (name: string) => name.replace(/ Set$/, "")
    const itemNameToBaseName = (name: string) => {
        const lastPart = name.split(" ").slice(-1)[0]
        if (["Relic", "Imprint"].includes(lastPart)) name = name.split(" ").slice(0, -1).join(" ")
        return name;
    }
    const wikiUrlName = encodeURIComponent(setItemProfile ? setNameToBaseName(setItemProfile.item.itemName) : itemNameToBaseName(itemName ?? ""))

    return <>
        <FlexColumn $gapY='1rem'>
            <Box>
                <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigateTo(ALL_ROUTES.HOME.path)}>Back</Button>
            </Box>
            <Card>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Button variant="text"
                            startIcon={<Image src={wfMarketIcon} alt="Warframe Market" sx={{ height: "2rem", width: "2rem" }} />}
                            href={`https://warframe.market/items/${item.urlName}`}>
                            Warframe market
                        </Button>
                        {!!item.itemName
                            && <Button variant="text"
                                startIcon={<Image src={wfWikiIcon} alt="Warframe Wiki" sx={{ height: "1.2rem" }} />}
                                href={`https://wiki.warframe.com/?search=${wikiUrlName}`}>
                                Wiki
                            </Button>}
                    </Stack>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FlexRow>
                        <ItemImage
                            sx={{ minWidth: "100px" }}
                            item={item}
                        />
                        <CardHeader
                            title={itemName}
                            subheader={description} />
                    </FlexRow>
                </CardContent>
            </Card>
            <Card>
                <CardHeader title="Price History" />
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
                </CardContent>
            </Card>
            {setItemProfiles.length > 1 && <Card>
                <CardHeader title="Set Items" />
                <CardContent>
                    <SetItemsView setItemProfiles={setItemProfiles} />
                </CardContent>
            </Card>}
        </FlexColumn >
    </>
}

function SetItemsView({ setItemProfiles }: { setItemProfiles: SetItemProfile[] }) {
    const setItemProfile = setItemProfiles.find(p => p.item.tags.includes("set"))
    const sortedItemsInSet = setItemProfiles.sort((a, b) => a.item.itemName.localeCompare(b.item.itemName))
        .filter(p => p.item.id !== setItemProfile?.item.id)
    const separateMinPrice = sortedItemsInSet.reduce((acc, p) => acc + p.latestPrice.minPrice, 0);
    const difference = (setItemProfile?.latestPrice?.minPrice ?? 0) - separateMinPrice;
    return <>
        <FlexColumn $gapY='1rem' $fullWidth>
            <Grid2 container>
                {setItemProfile && <Grid2 size={{ xs: 12, sm: 6 }} alignContent={{ xs: "center" }}>
                    <FlexColumn $alignHorizontal='center'>
                        <Box sx={{ marginBottom: "1rem" }}>
                            <ItemImage
                                item={setItemProfile.item}
                            />
                        </Box>
                        <ItemLink item={setItemProfile?.item} />
                        {setItemProfile.latestPrice.minPrice} platinum
                    </FlexColumn>
                </Grid2>}
                <Grid2>
                    <FlexColumn $gapY='1rem'>
                        {sortedItemsInSet.map(p =>
                            <SetItemView key={p.item.urlName} setItemProfile={p} />
                        )}
                    </FlexColumn>
                </Grid2>
            </Grid2>
            <FlexRow $gapX='1rem'>
                <Box flexGrow={1}>
                    <Divider sx={{ marginBottom: "1rem" }} />
                    <Typography sx={{ marginRight: "0.5rem", display: "inline" }}>
                        {setItemProfile?.latestPrice.minPrice} platinum
                        {" "}
                        <PriceDifference difference={difference} invert />
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Divider sx={{ marginBottom: "1rem" }} />
                    <Typography sx={{ marginRight: "0.5rem", display: "inline" }}>
                        {separateMinPrice} platinum
                        {" "}
                        <PriceDifference difference={difference} />
                    </Typography>
                </Box>
            </FlexRow>
        </FlexColumn >
    </>
}

function PriceDifference({ difference, invert }: { difference: number, invert?: boolean }) {
    const color = difference > 0 && !invert ? theme.palette.success.main : theme.palette.error.main
    const sign = invert ? "+" : "-"
    return <Typography variant="caption" sx={{ color, verticalAlign: "middle" }}>
        {`(${sign}${Math.abs(difference)})`}
    </Typography>
}

function ItemLink({ item }: { item: Item }) {
    return <InternalLink to={ALL_ROUTES.ITEM.createUrl({ urlName: item.urlName })}>{item.itemName}</InternalLink>
}

function SetItemView({ setItemProfile: { item, latestPrice } }: { setItemProfile: SetItemProfile }) {
    return <>
        <FlexRow $alignVertical="center">
            <Box sx={{ marginRight: 2, minWidth: "4rem" }}>
                <ItemImage
                    sx={{ height: "4rem", width: "4rem" }}
                    item={item}
                />
            </Box>
            <FlexColumn>
                <ItemLink item={item} />
                {latestPrice?.minPrice} platinum
            </FlexColumn>
        </FlexRow>
    </>
}
