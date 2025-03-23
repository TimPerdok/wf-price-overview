export type ItemsResponse = {
    items: ItemSummary[],
    total: number
}

export type ItemSummary = {
    id: string,
    itemName: string,
    urlName: string,    
    minPrice: number,
    avgPrice: number,
    timestamp: string,
    tags: string[],
    thumb: string,
    description?: string
}

export type PricePoint = {
    timestamp: string,
    minPrice: number,
    avgPrice: number
}

export type Item = {
    id: string
    ducats: number,
    itemName: string,
    itemsInSet: string[],
    tags: string[],
    thumb: string,
    urlName: string,
    description: string
}

export type SetItemProfile = {
    item: Item,
    latestPrice: PricePoint,
}

export type ItemProfile = {
    item: Item,
    prices: PricePoint[],
    setItemProfiles: SetItemProfile[]
}