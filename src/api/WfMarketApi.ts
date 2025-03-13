import { url } from "inspector";
import EnvConfig from "../EnvConfig";
import { ItemsResponse } from "../types/Backend";

export default class ProxyApi {
    static async getItems(begin?: number, end?: number, filter?: object): Promise<ItemsResponse> {
        const searchParams = new URLSearchParams()
        begin && searchParams.set('begin', begin + "")
        end && searchParams.set('end', end + "")
        filter && Object.entries(filter).forEach(([key, value]) => {
            searchParams.set(key, value)
        });
        
        const url = new URL(`${EnvConfig.BACKEND_URL}/items?${searchParams.toString()}`)
        const res = await fetch(url.toString())
        const json = await res.json()
        return json as ItemsResponse
    }
}
