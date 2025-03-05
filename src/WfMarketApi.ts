import { ItemsResponse } from "./types/WfMarket";

export default class WfMarketApi {

    static BASE_URL = 'https://api.warframe.market/v2';

    static getItems = async () => {
        const res = await fetch(`${WfMarketApi.BASE_URL}/items`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaWQiOiI2OThISTlyZHllYjRzZFJmbXVmcUdVY0IzREYwSVZTYyIsImV4cCI6MTc0NjM2MDQ4NywiaWF0IjoxNzQxMTc2NDg3LCJpc3MiOiJqd3QiLCJhdWQiOiJqd3QiLCJhdXRoX3R5cGUiOiJjb29raWUifQ.VT-WV7TB72AOVNX3Tw9IISro3z2K-AgQHGYvvf91KxM; Path=/; Domain=warframe.market; Secure; HttpOnly; Expires=Sun, 04 May 2025 12:08:07 GMT;"
            }
        });
        const json = await res.json();
        return json;
    }

}
