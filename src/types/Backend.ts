export type ItemsResponse = {
    items: ItemSummary[],
    total: number
}

export type ItemSummary = Item & {
    minimumPrice: number,
    averagePrice: number,
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

export type ItemProfile = {
    item: Item,
    prices: PriceMeasurement[],
    metadata: PriceMetadata
}

export type PriceMetadata = {
    setPriceDifference: number,
    separatePrice: number,
    rootPrice: number
}