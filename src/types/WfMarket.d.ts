export type ItemsResponse = Item[]

export type Item = {
    "id": string,
    "item_name": string,
    "thumb": string,
    "url_name": string,
    "min_price"?: number,
    "average_price"?: number,
    "last_update": string,
    detail: {
        tags: string[],
    }
}