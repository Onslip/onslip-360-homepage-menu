import { DatabaseURI, DBQuery, URI } from '@divine/uri';
import { CORSFilter, WebArguments, WebResource, WebResponse, WebService, WebStatus } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Listener } from './Listener';

// const cors = require('cors');

// cors({
//     origin: 'http://127.0.0.1:3333'
// })

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

    private async GetProdByGroup(): Promise<productsWithCategory[]> {
        const categories = await this.db.query<DBcategory[]>`select * from onslip.productcategories`
        const products = await this.db.query<DBproduct[]>`select * from onslip.products`
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
        //this.listener.Listener();
        console.log(await this.GetProdByGroup())
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
