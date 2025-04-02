import EnvConfig from "../EnvConfig";
import { ItemProfile, ItemsResponse } from "../types/Backend";

export default class BackendApi {

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

    static async getItemProfileByUrlName(urlName: string): Promise<ItemProfile> {
        if (!urlName) throw new Error("Item URL name is required")
        const searchParams = new URLSearchParams();
        searchParams.set('urlName', urlName);
        
        const res = await fetch(`${EnvConfig.BACKEND_URL}/item?${searchParams.toString()}`);
        const json = await res.json()   
        return json as ItemProfile
    }

    static async getItemProfileById(id: string): Promise<ItemProfile> {
        if (!id) throw new Error("Item ID is required")
        const searchParams = new URLSearchParams();
        searchParams.set('id', id);

        const res = await fetch(`${EnvConfig.BACKEND_URL}/item?${searchParams.toString()}`);
        const json = await res.json()   
        return json as ItemProfile
    }
}
