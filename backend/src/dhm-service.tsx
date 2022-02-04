import { DatabaseURI, DBQuery, JSONParser, TOMLParser, URI } from '@divine/uri';
import { CORSFilter, CORSFilterParams, WebArguments, WebFilter, WebFilterCtor, WebResource, WebResponse, WebResponses, WebService, WebStatus } from '@divine/web-service';
import { API, jsonType } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Listener } from './Listener';
import { writeFileSync } from 'fs';



export class DHMService {
    private api: API;
    private db: DatabaseURI;
    private listener: Listener;

    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;
        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
        this.listener = new Listener(this.api, this.db);
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

            .addResource(class implements WebResource {
                static path = /updateapi/;

                async POST(args: WebArguments) {
                    const api = await args.body() as newApi;
                    console.log(api.base)
                    svc.WritetoFile(api);
                    return args.body()
                }
            })

            .addResource(class implements WebResource {
                static path = /imageupload/;

                async POST(args: WebArguments) {
                    await writeFileSync('./test.txt', JSON.stringify(args.body()));
                    return args.body()
                }
            })

            .addFilter(class extends CORSFilter {
                static path = /.*/;
            })


    }


    private async WritetoFile(api: newApi) {
        this.api = new API(api.base, api.realm, api.id, api.key);
        writeFileSync('./test.toml', `[listen]
host  = 'localhost'
port  = 8080

[database]
uri   = '${api.uri}'

[onslip360]
base  = '${api.base}'      # Onslip 360 environment
realm = '${api.realm}'                          # Onslip 360 account
id = '${api.id}' # ID of user's API key
key = '${api.key}'                                    # User's Base64-encoded API key
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

interface newApi {
    base: string,
    realm: string,
    key: string,
    id: string,
    uri: string
}
