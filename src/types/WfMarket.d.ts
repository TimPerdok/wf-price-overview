export type ItemsResponse = {
    payload: {
        items: Item[]
    }
}

export type Item = {
    url_name: string,
    id: string,
    item_name: string,
    thumb: string
}