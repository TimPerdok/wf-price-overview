import { ItemsResponse } from "../types/WfMarket";

export default class ProxyApi {

    static port = 3000;

    static BASE_URL = `http://localhost:${ProxyApi.port}`;

    static getItems = new Promise<ItemsResponse>((resolve, reject) => {
        fetch(`${ProxyApi.BASE_URL}/items`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
    });
}
