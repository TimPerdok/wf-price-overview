export type ItemsResponse = {
    items: ItemProfile[],
    total: number
}

export type ItemProfile = {
    id: string,
    itemName: string,
    urlName: string,
    minPrice: number,
    avgPrice: number,
    timestamp: string,
}