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

export type ItemProfile = {
    item: ItemSummary,
    prices: PricePoint[]
}