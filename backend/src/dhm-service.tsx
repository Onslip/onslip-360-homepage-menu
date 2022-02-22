import { DatabaseURI, DBQuery, FIELDS, FormData, HEADERS, URI } from '@divine/uri';
import { ContentType } from '@divine/headers'
import { CORSFilter, WebArguments, WebResource, WebService } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Listener } from './Listener';
import { writeFileSync, readFileSync } from 'fs';
import internal from 'stream';

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

            .addFilter(class extends CORSFilter {
                static path = /.*/;
            })

            .addResource(class implements WebResource {
                static path = RegExp('');
                async GET() {
                    return svc.rootResponse();
                }
            })

            .addResource(class implements WebResource {
                static path = /background/;
                async GET() {
                    const data = await svc.db.query<DBQuery[]>`select image from onslip.images where id = 1`;
                    return data[0];
                }
                async POST(args: WebArguments) {
                    const data = await args.body() as FormData
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href']
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    svc.db.query<DBQuery[]>`upsert into onslip.images (image, id) values (${dataBuffer}, 1)`;
                    return data;
                }
            })

            .addResource(class implements WebResource {
                static path = /banner/;
                async GET() {
                    const data = await svc.db.query<DBQuery[]>`select image from onslip.images where id = 2`;
                    return data[0];
                }

                async POST(args: WebArguments) {
                    const data = await args.body() as FormData
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href']
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    svc.db.query<DBQuery[]>`upsert into onslip.images (image, id) values (${dataBuffer}, 2)`;
                    return data;
                }
            })

            .addResource(class implements WebResource {
                static path = /logo/;
                async GET() {
                    const data = await svc.db.query<DBQuery[]>`select image from onslip.images where id = 3`;
                    return data[0];
                }

                async POST(args: WebArguments) {
                    const data = await args.body() as FormData
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href']
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    svc.db.query<DBQuery[]>`upsert into onslip.images (image, id) values (${dataBuffer}, 3)`;
                    return data;
                }
            })


            .addResource(class implements WebResource {
                static path = /backgroundcolor/;
                async GET() {
                    const data = readFileSync('./background.json').toString();
                    return JSON.parse(data);
                }

                async POST(args: WebArguments) {
                    const body = await args.body()
                    writeFileSync('./background.json', JSON.stringify(body));
                    return args.body();
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
                static path = /productimage-upload/;

                async POST(args: WebArguments) {
                    const data = await args.body() as FormData
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href']
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes)

                    svc.db.query<DBQuery[]>`insert into onslip.productimages (image) values (${dataBuffer})`
                    return data
                }
                async GET() {
                    const data = await svc.db.query<DBQuery[]>`select * from onslip.productimages`
                    return data[0]
                }
            })
    }


    private async WritetoFile(api: newApi) {
        this.api = new API(api.base, api.realm, api.id, api.key);
        this.db = new URI(api.uri) as DatabaseURI;
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

interface image {
    image: string;
    id: bigint
}