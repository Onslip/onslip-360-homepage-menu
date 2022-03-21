import { DatabaseURI, DBQuery, FIELDS, FormData, URI } from '@divine/uri';
import { ContentType } from '@divine/headers'
import { CORSFilter, WebArguments, WebResource, WebService } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Listener } from './Listener';
import { DBImage, newApi } from './interfaces';
import { GetProdByGroup, GetProdFromApi } from './LoadData';

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
        if (this.config.database.uri != "") {
            this.listener.Listener();
        }
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
                    const data = await new URI('./config.json').load()
                    return data;
                }

                async POST(args: WebArguments) {
                    const body = await args.body();
                    await new URI('./config.json').save(JSON.stringify(body))
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
                static path = /product-image/;

                async POST(args: WebArguments) {
                    const data = await args.body() as FormData;
                    const id = Number(data[FIELDS]?.find(x => x.name == 'id')?.value);
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    await svc.db.query<DBQuery[]>`upsert into onslip.productimages (product_id , image) values (${id}, ${dataBuffer})`

                    const imageList = await svc.db.query<DBQuery[]>`select * from onslip.productimages where product_id = ${id}`;
                    const imageExists: boolean = imageList.length != 0;
                    if (!imageExists) {
                        await svc.db.query<DBQuery[]>`insert into onslip.productimages (image, product_id) values (${dataBuffer}, ${id})`;
                    }
                    else {
                        await svc.db.query<DBQuery[]>`update onslip.productimages set (image) = (${dataBuffer}) where product_id = ${id}`;
                    }
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

            .addResource(class implements WebResource {
                static path = /category-image/;


                async POST(args: WebArguments) {
                    const data = await args.body() as FormData;
                    const id = Number(data[FIELDS]?.find(x => x.name == 'id')?.value);
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);
                    await svc.db.query<DBQuery[]>`upsert into onslip.categoryimages (category_id , image) values (${id}, ${dataBuffer})`

                    const imageList = await svc.db.query<DBQuery[]>`select * from onslip.categoryimages where category_id = ${id}`;
                    const imageExists: boolean = imageList.length != 0;
                    if (!imageExists) {
                        await svc.db.query<DBQuery[]>`insert into onslip.categoryimages (image, category_id) values (${dataBuffer}, ${id})`;
                    }
                    else {
                        await svc.db.query<DBQuery[]>`update onslip.categoryimages set (image) = (${dataBuffer}) where category_id = ${id}`;
                    }
                    return data;
                }

                async GET() {
                    const data = await svc.db.query<DBImage[]>`select * from onslip.categoryimages`;
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
                uri: api.uri ?? ''
            },
            onslip360: {
                base: api.base ?? '',
                realm: api.realm ?? '',
                id: api.id ?? '',
                key: api.key ?? ''
            }
        }
        await new URI('./test.toml').save(config)
    }

    private async rootResponse() {
        if (this.config.database.uri == "") {
            return await GetProdFromApi(this.api);
        }
        else {
            return await GetProdByGroup(this.db);
        }
    }
}


