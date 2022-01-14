/** @jsx     jsx4HTML.element */
/** @jsxFrag jsx4HTML.fragment */

import { DatabaseURI, DBQuery, guessContentType, TOMLParser, URI } from '@divine/uri';
import { html, jsx4HTML } from '@divine/uri-x4e-parser';
import { WebArguments, WebResource, WebResponse, WebService, WebStatus } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { readFile } from 'fs/promises';
import { DHMConfig } from './schema';
import { Listener } from './Listener';
import { readFileSync } from 'fs';
import { serialize } from 'v8';



export class DHMService {
    private api: API;
    private db: DatabaseURI;
    private listener: Listener;

    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;

        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
        this.listener = new Listener(config);
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
            })
    }

    private async GetProdByGroup(): Promise<productsWithCategory[]> {
        const catName = await this.db.query<DBcategory[]>`select * from onslip.productcategories`
        const prod = await this.db.query<DBproduct[]>`select * from onslip.products`
        return catName.map(c => ({
            category: {
                name: c.name
            },
            products: prod.filter(p => p.productcategory_id == c.id).map(p => ({
                name: p.name,
                price: p.price,
                description: p.description
            }))
        } as productsWithCategory))
    }

    private async rootResponse(who?: string) {
        const clientInfo = await this.api.getClientInfo()
        const dbVersion = await this.db.query<DBVersion[]>`select version()`;
        //this.listener.Listener();
        console.log(await this.GetProdByGroup())
        return await this.GetProdByGroup();
    }
}

interface DBVersion {
    version: string;
}

export interface DBproduct {
    name: string
    description: string
    price: string
    productcategory_id: number
}

export interface DBcategory {
    name: string
    id: number
}

interface productsWithCategory {
    category: {
        name: string
    }
    products: {
        name: string,
        price: string,
        description: string
    }[]
}
