import { DatabaseURI, DBQuery, TOMLParser, URI } from '@divine/uri';
import { CORSFilter, WebArguments, WebResource, WebResponse, WebService, WebStatus } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Listener } from './Listener';
import { writeFileSync } from 'fs';

export class DHMService {
    private api: API;
    private db: DatabaseURI;
    private listener: Listener;
    private service: WebResponse;

    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;
        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
        this.listener = new Listener(this.api, this.db);
        this.service = new WebResponse(WebStatus.ACCEPTED);
    }

    async initialize(): Promise<this> {
        return this;
    }

    asWebService(): WebService<this> {
        const svc = this;

        return new WebService(this)
            .addResource(class implements WebResource {
                static path = RegExp('');

                async GET() {
                    return svc.rootResponse();
                }

            })
    }

    private async WritetoFile(base: string, realm: string, id: string, key: string) {
        this.api = new API(base, realm, id, key);
        writeFileSync('./test.toml', `[listen]
host  = 'localhost'
port  = 8080

[database]
uri   = 'postgresql://user:password@free-tier5.gcp-europe-west1.cockroachlabs.cloud:26257/defaultdb?sslmode=require&options=--cluster%3Donslip-360-dhm-2447'

[onslip360]
base  = 'https://test.onslip360.com/v1/'      # Onslip 360 environment
realm = '${realm}'                          # Onslip 360 account
id    = '${id}' # ID of user's API key
key   = '${key}'                                    # User's Base64-encoded API key
`)
    }


    private async GetProdByGroup(): Promise<productsWithCategory[]> {
        const categories = await this.db.query<DBcategory[]>`select * from onslip.productcategories`
        const products = await this.db.query<DBproduct[]>`select * from onslip.products`
        this.api.listButtonMaps()
        return categories.map(c => ({
            category: {
                name: c.name
            },
            products: products.filter(p => p.productcategory_id == c.id).map(p => ({
                name: p.name,
                price: p.price,
                description: p.description
            }))
        } as productsWithCategory))
    }

    private async rootResponse() {
        this.service.setHeader('origin', 'http://localhost:3333')
        this.service.headers['access-control-allow-origin'] = 'http://localhost:3333'
        this.service.headers['access-control-allow-credentials'] = true;
        this.service.headers.allow
        console.log(this.service.headers['access-control-allow-origin'])
        this.listener.Listener();
        console.log(await this.GetProdByGroup())
        // this.WritetoFile('https://test.onslip360.com/v1/', 'bajs', 'bajs', 'bajs');
        return await this.GetProdByGroup();
    }
}
interface DBproduct {
    name: string
    description: string
    price: string
    productcategory_id: number
}

interface DBcategory {
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
