export type ItemsResponse = {
    items: ItemSummary[],
    total: number
}

export type ItemSummary = Item & {
    price: PriceMeasurement,
    setPriceDifference: number,
}

export type PriceMeasurement = {
    itemId: string,
    minimum: number,
    averageLastThreeSales: number,
    timestamp: string
}

export type Item = {
    id: string
    ducats: number,
    itemName: string,
    itemsInSet: string[],
    tags: string[],
    thumb: string,
    urlName: string,
    description: string,
    isRoot: boolean | null,
    wikiLink: string | null,
    quantityForSet: number
}

export type SetItemProfile = {
    item: Item,
    latestPrice: PriceMeasurement,
}

export type ItemProfile = {
    item: Item,
    prices: PriceMeasurement[],
    setItemProfiles: SetItemProfile[]
}