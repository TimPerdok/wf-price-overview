export type ItemsResponse = Item[]

export type Item = {
    id: string,
    url_name: string,
    item_name: string,
    min_price: number,
    avg_price: number,
    tags: string[]
}