import { API, AbortController, eventStreamType } from "@onslip/onslip-360-node-api";
import { DHMConfig } from "./schema";

export async function Content(config: DHMConfig) {
    const { base, realm, id, key } = config.onslip360;
    const api = new API(base, realm, id, key);
    document.querySelector("product")
    const last_month = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    for (const product of await api.listProducts(`updated>"${last_month.toISOString()}" AND price>20`, 'name', 0, -1, true, '')) {
        document.getElementById('products')!.innerText += `  ${product.name}: ${product.price} kr ${product.deleted ? `(deleted on ${new Date(product.deleted as string)})` : ""}\n`;
    }
}

