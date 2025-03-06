import { ItemsResponse } from "../types/WfMarket";

export default class ProxyApi {
    static BASE_URL = `https://wf-server.onmogeloos.workers.dev`;

    static getItems = new Promise<ItemsResponse>((resolve, reject) => {
        fetch(`${ProxyApi.BASE_URL}/items`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
    });
}
