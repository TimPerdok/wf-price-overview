import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, Grid2, Stack, Typography } from '@mui/material';
import React from 'react';
import BackendApi from '../../api/ProxyApi';
// @ts-ignore
import wfMarketIcon from "../../assets/images/wf-market-512x512.webp";
// @ts-ignore
import wfWikiIcon from "../../assets/images/wf-wiki-78px.webp";
import Image, { ItemImage } from '../../components/Image';
import InternalLink from '../../components/InternalLink';
import { FlexColumn, FlexRow } from '../../components/layout/Flex';
import useApi from '../../hooks/useApi';
import useNavigator from '../../hooks/useNavigator';
import useUrlParams from '../../hooks/useUrlParams';
import { ALL_ROUTES } from '../../main';
import { Item, ItemProfile, PriceMeasurement, PriceMetadata } from '../../types/Backend';
import PriceChart from './PriceChart';

export default function ItemPage() {
    const { navigateTo } = useNavigator()
    const { urlName } = useUrlParams(ALL_ROUTES.ITEM)
    const thisItemResponse = useApi(() => BackendApi.getItemProfileByUrlName(urlName ?? ""), [urlName])

    const setItemIds = thisItemResponse.data?.item?.itemsInSet ?? []

    const setItemResponse = useApi(() => Promise.all([
        ...setItemIds.map((itemId) => BackendApi.getItemProfileById(itemId)),
    ]), [urlName, setItemIds])

    if (thisItemResponse.isLoading || setItemResponse.isLoading) return <CircularProgress />
    if (thisItemResponse.error || setItemResponse.error) return <div>{thisItemResponse.error?.message ?? setItemResponse.error?.message}</div>;

    const { item: thisItem, prices: thisPrices, metadata: thisMetadata } = thisItemResponse.data
    const setItemProfiles = setItemResponse.data;

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
                            href={`https://warframe.market/items/${thisItem.urlName}`}>
                            Warframe market
                        </Button>
                        {!!thisItem.itemName
                            && <Button variant="text"
                                startIcon={<Image src={wfWikiIcon} alt="Warframe Wiki" sx={{ height: "1.2rem" }} />}
                                href={thisItem.wikiLink ?? `https://wiki.warframe.com/?search=${thisItem.urlName}`}>
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
                            item={thisItem}
                        />
                        <CardHeader
                            title={thisItem.itemName}
                            subheader={thisItem.description} />
                    </FlexRow>
                </CardContent>
            </Card>
            <Card>
                <CardHeader title="Price History" />
                <CardContent>
                    <PriceChart prices={thisPrices} />
                </CardContent>
            </Card>
            {(thisItem.itemsInSet.length ?? 0) > 1 && <Card>
                <CardHeader title="Set Items" />
                <CardContent>
                    <SetItemsView itemProfiles={setItemProfiles} priceMetadata={thisMetadata} />
                </CardContent>
            </Card>}
        </FlexColumn >
    </>
}

function SetItemsView({ itemProfiles, priceMetadata }: { itemProfiles: ItemProfile[], priceMetadata: PriceMetadata }) {
    const rootItemProfile = itemProfiles.find(p => p.item.isRoot)
    const separateItemProfiles = itemProfiles.filter(p => !p.item.isRoot)
    if (!rootItemProfile) return <CircularProgress />
    if (separateItemProfiles.length === 0) return <></>

    return <>
        <FlexColumn $gapY='1rem' $fullWidth>
            <Grid2 container>
                {rootItemProfile && <Grid2 size={{ xs: 12, sm: 6 }} alignContent={{ xs: "center" }}>
                    <FlexColumn $alignHorizontal='center'>
                        <Box sx={{ marginBottom: "1rem" }}>
                            <ItemImage item={rootItemProfile.item} />
                        </Box>
                        <ItemLink item={rootItemProfile.item} />
                        {rootItemProfile.prices?.[0]?.minimum} platinum
                    </FlexColumn>
                </Grid2>}
                <Grid2>
                    <FlexColumn $gapY='1rem'>
                        {separateItemProfiles.map(p =>
                            <SetItemView key={p.item.urlName} setItemProfile={p} />
                        )}
                    </FlexColumn>
                </Grid2>
            </Grid2>
            <FlexRow $gapX='1rem'>
                <Box flexGrow={1}>
                    <Divider sx={{ marginBottom: "1rem" }} />
                    <Typography sx={{ marginRight: "0.5rem", display: "inline" }}>
                        {priceMetadata.rootPrice} platinum
                        {" "}
                        <PriceDifference invert difference={priceMetadata.setPriceDifference} />
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Divider sx={{ marginBottom: "1rem" }} />
                    <Typography sx={{ marginRight: "0.5rem", display: "inline" }}>
                        {priceMetadata.separatePrice} platinum
                        {" "}
                        <PriceDifference difference={priceMetadata.setPriceDifference} />
                    </Typography>
                </Box>
            </FlexRow>
        </FlexColumn >
    </>
}

function ItemLink({ item }: { item: Item }) {
    return <InternalLink to={ALL_ROUTES.ITEM.createUrl({ urlName: item.urlName })}>{item.itemName}</InternalLink>
}

function SetItemView({ setItemProfile: { item, prices } }: { setItemProfile: ItemProfile }) {
    const latestPrice = prices?.[prices.length - 1] ?? { minimum: 0, averageLastThreeSales: 0 }
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
                {(item.quantityForSet ?? 1) * latestPrice.minimum}
                {" "}
                platinum
                {item.quantityForSet > 1 && ` (${latestPrice?.minimum} each)`}
            </FlexColumn>
        </FlexRow>
    </>
}


function PriceDifference({ difference, invert }: { difference: number, invert?: boolean }) {
    const adjustedDifference = invert ? -difference : difference;
    const sign = adjustedDifference > 0 ? "+" : "";
    const color = adjustedDifference > 0 ? "success.main" : adjustedDifference < 0 ? "error.main" : "text.secondary";
    return <Typography variant='caption' color={color}>
       {sign}{adjustedDifference}
    </Typography>
}
