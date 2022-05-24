import { DatabaseURI, DBQuery, FIELDS, FormData, URI } from '@divine/uri';
import { ContentType } from '@divine/headers'
import { CORSFilter, WebArguments, WebResource, WebService } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { DHMConfig } from './schema';
import { Update } from './Listener';
import { ChangePosition, DBCatImage, DBImage, MainConfig, Menu, newApi, Styleconfig, Timetable, location } from './interfaces';
import { GetProdByGroup, GetProdFromApi } from './LoadData';

export class DHMService {
    private api: API;
    private db: DatabaseURI;
    private dbConnect: boolean = true;

    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;
        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
    }

    async initialize(): Promise<this> {
        try {
            await this.db.query<DBQuery>`select version()`
            this.dbConnect = true;
            Update(this.api, this.db)
            return this;
        }
        catch (error) {
            this.dbConnect = false;
            return this;
        }
    }

    asWebService(): WebService<this> {
        const svc = this;

        return new WebService(this)

            .addFilter(class extends CORSFilter {
                static path = /.*/;
            })


            .addResources([class implements WebResource {
                static path = RegExp('');
                async GET() {
                    return svc.rootResponse();
                }
            },

            class implements WebResource {
                static path = /schedule/;

                async GET() {
                    const schedule: Timetable[] = await new URI('./configs/ScheduleConfig.json').load();
                    return schedule;
                }
                async POST(args: WebArguments) {
                    const scheduleTime: Timetable[] = await args.body();
                    await new URI(`./configs/ScheduleConfig.json`).save(scheduleTime)
                    return args.body();
                }
            },

            class implements WebResource {
                static path = /mainconfig/;
                async GET() {
                    const config: MainConfig = await new URI(`./configs/main.json`).load()
                    return config;
                }
                async POST(args: WebArguments) {
                    const body: MainConfig = await args.body();
                    await new URI(`./configs/main.json`).save(body)
                    return args.body();
                }
            },

            class implements WebResource {
                static path = /config/;
                async GET() {
                    const config: MainConfig = await new URI(`./configs/main.json`).load()
                    const data: Styleconfig = await new URI(`./configs/config${config.configId}.json`).load()
                    return data;
                }

                async POST(args: WebArguments) {
                    const body: Styleconfig = await args.body();
                    await new URI(`./configs/config${body.configId}.json`).save(body)
                    return args.body();
                }
            },

            class implements WebResource {
                static path = /locations/;

                async GET() {
                    const locations: location[] = (await svc.api.listLocations()).map(l => ({ name: l.name, id: l.id }))
                    return locations
                }
            },

            class implements WebResource {
                static path = /updateposition/;

                async POST(args: WebArguments) {
                    const data: ChangePosition = await args.body();
                    let menu: API.Stored_ButtonMap = (await svc.api.getButtonMap(data.menu));
                    let sortedMenu: API.Partial_ButtonMap = { buttons: menu.buttons }

                    sortedMenu.buttons?.forEach(x => {
                        x.x = data.categories.find(c => c.id == x['button-map'])?.position;
                    });

                    (await svc.api.updateButtonMap(data.menu, sortedMenu))
                    return sortedMenu;
                }
            },
            class implements WebResource {
                static path = /api/;

                async GET() {
                    let api: newApi = {
                        api: await new URI('./test.toml').load()
                    }
                    try {
                        (await svc.api.getLocation(1))['company-name'];
                        api.ApiConnected = true;
                    }
                    catch (err) {
                        api.ApiConnected = false;
                    }
                    try {
                        await svc.db.query<DBQuery>`select version()`
                        api.DatabaseConnected = true;
                    }
                    catch (err) {
                        api.DatabaseConnected = false;
                    }

                    return api;
                }

                async POST(args: WebArguments) {
                    const api: newApi = await args.body();
                    svc.WritetoFile(api.api);
                    return args.body()
                }
            },
            class implements WebResource {
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
            },
            class implements WebResource {
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
            },
            class implements WebResource {
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
            },
            class implements WebResource {
                static path = /product-image/;

                async GET() {
                    const data = await svc.db.query<DBImage[]>`select * from onslip.productimages`;
                    const list: DBImage[] = data.map(x => ({
                        product_id: Number(x.product_id),
                        image: x.image
                    }))
                    return list;
                }

                async POST(args: WebArguments) {
                    const data = await args.body() as FormData;
                    const id = Number(data[FIELDS]?.find(x => x.name == 'id')?.value);
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);

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
            },
            class implements WebResource {
                static path = /category-image/;
                async GET() {
                    const data = await svc.db.query<DBCatImage[]>`select * from onslip.categoryimages`;
                    const list: DBCatImage[] = data.map(x => ({

                        image: x.image,
                        category_id: Number(x.category_id)
                    }))
                    return list;
                }
                async POST(args: WebArguments) {
                    const data = await args.body() as FormData;
                    const id = Number(data[FIELDS]?.find(x => x.name == 'id')?.value);
                    const cacheURI = data[FIELDS]?.values().next().value['value']['href'];
                    const dataBuffer = await new URI(cacheURI).load(ContentType.bytes);

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
            }
            ])
    }

    private async WritetoFile(api: DHMConfig) {
        this.api = new API(api.onslip360.base, api.onslip360.realm, api.onslip360.id, api.onslip360.key);
        this.db = new URI(api.database.uri) as DatabaseURI;
        const config: DHMConfig = {
            listen: {
                port: 8080,
                host: 'localhost'
            },
            database: {
                uri: api.database.uri ?? ''
            },
            onslip360: {
                base: api.onslip360.base ?? '',
                realm: api.onslip360.realm ?? '',
                id: api.onslip360.id ?? '',
                key: api.onslip360.key ?? ''
            }
        }
        await new URI('./test.toml').save(config)
    }

    private async rootResponse() {
        if (this.dbConnect == true) {
            return await GetProdByGroup(this.db, this.api);
        }
        else {
            return await GetProdFromApi(this.api);
        }
    }
}
