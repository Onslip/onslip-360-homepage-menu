import { DatabaseURI, DBQuery, URI } from '@divine/uri';
import { WebArguments, WebResource, WebResponse, WebService } from '@divine/web-service'
import { API, AbortController } from '@onslip/onslip-360-node-api';
import { debug } from 'console';
import { globalAgent, METHODS } from 'http';
import { resolve } from 'path';
import { post } from 'request';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { DHMConfig } from './schema';

export class DHMService {
    private api: API;
    private db: DatabaseURI;

    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;
        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
    }

    async initialize(): Promise<this> {
        return this;
    }

    asWebService(): WebService<this> {
        const svc = this;

        return new WebService(this)
            .addResource(class implements WebResource {
                static path = RegExp('');

                async GET(args: WebArguments) {
                    return svc.rootResponse(args.string('?who', undefined));
                }

            });
    }


    private async rootResponse(who?: string) {

        const clientInfo = await this.api.getClientInfo()
        const dbVersion = await this.db.query<DBVersion[]>`select version()`;

        const deletedProducts = (await this.api.listProducts(undefined, undefined, undefined, undefined, true))

        //const productsFromDb = await this.db.query<DBProduct[]>`select onslip.products.name, onslip.products.price, onslip.products.productcategory_id from onslip.productcategory join onslip.products on productcategory_id = onslip.productcategory.rowid`
        //const categoriesFromDb = await this.db.query<DBCategory[]>`select * from onslip.productcategory`
        //let list: [DBCategory, DBProduct[]]

        console.log(deletedProducts)
        return ['Hello', who ?? clientInfo.user?.name, dbVersion[0].version];
    }

    private async listener() {
        while (true) {
            try {
                const stream = await this.api.addEventStream({
                    state: 'pending', queries: [{
                        resource: 'records', query: 'usage.type=product-update'
                    }]
                })
                const cancel = new AbortController()
                //setTimeout(() => cancel.abort, 60_000);

                console.log('Product and product group updates:');
                for await (const event of this.api.signal(cancel.signal).openEventStream(stream.id)) {
                    console.log(event)
                }
                console.log('All done');
            } catch (error) {
                console.log(error)
            }
        }
    }
}

interface DBVersion {
    version: string;
}

interface DBProduct {
    name: string
    price: string
    productcategory_id: number
}

interface DBCategory {
    name: string
}