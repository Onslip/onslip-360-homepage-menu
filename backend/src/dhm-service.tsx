import { DatabaseURI, DBQuery, FIELDS, FormData, URI } from '@divine/uri';
import { ContentType } from '@divine/headers'
import { CORSFilter, WebArguments, WebResource, WebService } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Junction, Listener, Menu } from './Listener';
import { writeFileSync, readFileSync } from 'fs';

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
        //const compName = svc.api.getAccount.name;

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
                static path = /location/;
                async GET() {
                    const data = await (await svc.api.getLocation(1))['company-name'];
                    return JSON.stringify(data ?? [0]);
                }
                async POST(args: WebArguments) {
                    const data = await args.body() as FormData;
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.json);
                    return data;
                }
            })


            .addResource(class implements WebResource {
                static path = /config/;
                async GET() {
                    const data = readFileSync('./config.json').toString();
                    return JSON.parse(data);
                }

                async POST(args: WebArguments) {
                    const body = await args.body()
                    console.log(body)
                    writeFileSync('./config.json', JSON.stringify(body));
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
                    const data = await args.body() as FormData;
                    const name = data[FIELDS]?.find(x => x.name == 'id')?.value as string;
                    const prod = await svc.db.query<DBproduct[]>`select * from onslip.products where name = ${name}`;
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const id = prod.map(x => Number(x.id))[0];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    await svc.db.query<DBQuery[]>`upsert into onslip.productimages (product_id , image) values (${id}, ${dataBuffer}) `
                    return data;
                }

                async GET() {
                    const data = await svc.db.query<DBImage[]>`select * from onslip.productimages`;
                    const list: DBImage[] = data.map(x => ({
                        product_id: Number(x.product_id),
                        image: x.image
                    }))
                    return list;
                }
            })
    }

    private async WritetoFile(api: newApi) {
        this.api = new API(api.base, api.realm, api.id, api.key);
        this.db = new URI(api.uri) as DatabaseURI;
        const config: DHMConfig = {
            listen: {
                port: 8080,
                host: 'localhost'
            },
            database: {
                uri: api.uri
            },
            onslip360: {
                base: api.base,
                realm: api.realm,
                id: api.id,
                key: api.key
            }
        }
        await new URI('./test.toml').save(config)
    }

    private async GetProdByGroup(): Promise<MenuWithCategory[]> {
        const categories = await this.db.query<DBcategory[]>`select * from onslip.productcategories`;
        const products = await this.db.query<DBproduct[]>`select * from onslip.products`;
        const junction = await this.db.query<Junction[]>`select * from onslip.grouptoproduct`
        const menu = await this.db.query<Menu[]>`select * from onslip.grouptoproduct`

        return menu.flatMap(m => {
            return (
                {
                    menu: {
                        id: Number(m.id),
                        name: m.name
                    },
                    categories: junction.flatMap(j => {
                        return (
                            {
                                category: {
                                    id: Number(categories.find(c => c.id == j.category_id)?.id),
                                    name: categories.find(c => c.id == j.category_id)?.name
                                },
                                products: products.filter(p => p.id == j.product_id).flatMap(p => {
                                    return (
                                        {
                                            id: Number(p.id),
                                            name: p.name,
                                            description: p.description,
                                            price: Number(p.price),
                                            productcategory_id: Number(p.productcategory_id)
                                        }
                                    )
                                })
                            }
                        )
                    })
                }
            )
        }) as MenuWithCategory[]
    }
    private async rootResponse() {
        this.listener.Listener();
        return await this.GetProdByGroup();
    }
}


export interface DBproduct {
    id?: number
    name?: string
    description?: string
    price?: number
    productcategory_id?: number
}

export interface DBcategory {
    name: string
    id: number
}

interface DBImage {
    image: any
    product_id: number
}

interface MenuWithCategory {
    menu: Menu
    categories: categorywithproduct[]
}

interface categorywithproduct {
    category: DBcategory,
    products: DBproduct[]
}

interface newApi {
    base: string,
    realm: string,
    key: string,
    id: string,
    uri: string
}

interface Styleconfig {
    background: {
        enabled: boolean
        color: string,
    },
    useProductImages: true,
    font: {
        fontFamily: string,
        fontWeight: boolean;
        fontStyle: boolean;
        fontSize: number;
    }
    preset: string,
    menuBackground: string,
}

const a: Styleconfig = JSON.parse(JSON.stringify(readFileSync('./config.json').toString()));
