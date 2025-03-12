import EnvConfig from "../EnvConfig";
import { ItemsResponse } from "../types/Backend";

export default class ProxyApi {
    static getItems = new Promise<ItemsResponse>((resolve, reject) => {
        fetch(`${EnvConfig.BACKEND_URL}/items`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
    });
}
