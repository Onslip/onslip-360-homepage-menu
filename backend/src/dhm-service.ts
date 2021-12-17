import { DatabaseURI, DBQuery, DBResult, HEADERS, URI } from '@divine/uri';
//const { DatabaseURI, URI } = require('@divine/uri');

import { WebArguments, WebResource, WebService } from '@divine/web-service'
import { API } from '@onslip/onslip-360-node-api';
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

                    if (args.has("?food")) {
                        return svc.SelectFoodName(args.number('?food', undefined));

                    }
                    else {
                        return svc.rootResponse(args.string('?who', undefined));
                    }



                    // 


                    ;
                    //svc.rootResponse(args.string('?who', undefined));
                }
            });
    }

    private async rootResponse(who?: string) {
        const clientInfo = await this.api.getClientInfo()

        const dbVersion = await this.db.query<DBVersion[]>`select version()`;
        const productGet = await this.api.listProducts();
        const productcatGet = await this.api.listProductGroups();

        // productcatGet.forEach(cat => {
        //     this.db.query<DBQuery[]>`INSERT INTO  onslip.productcategory  (Name) VALUES (${cat.name}))`

        // })
        // const productName  = productGet.map(x => x);
        // productGet.forEach(element => {


        //     this.db.query<DBQuery[]>`INSERT INTO  onslip.products  (Name, Price, productcategory_id) VALUES (${element.name}, ${element.price ?? 0})
        //      `


        // });
        const lunch = this.api.listButtonMaps();
        const lunchmap = (await this.api.listButtonMaps()).filter(x => x.type === "menu-section");

        //const prodweiq = this.api.syncWEIQMenus(loc)

        //const extractdb = await this.db.query<DBQuery[]>`SELECT name FROM onslip.products`;




        // const selectprod = this.db.query<DBQuery[]>`SELECT name FROM onslip.products`;
        //const selectprod2 = this.db.);
        //const prod2 = (await selectprod2).map(x=> x.name);
        //  const prod = (await selectprod).map(x => x);


        return ['Helo', who ?? clientInfo.user?.name, dbVersion[0].version];
    }


    private async SelectFoodName(id?: number) {
        const dbGetProducts = await this.db.query<DBProducts[]>`SELECT * FROM onslip.products`;
        const dbGetCategory = await this.db.query<DBCategories[]>`SELECT * FROM onslip.productcategory WHERE rowid=${id?? 0}`;
        const filterCategoriesByID = await dbGetCategory.filter(x => x.id == id);
        console.log(filterCategoriesByID.map(x=> x.name));


        const filterProductsByCatID = await dbGetProducts.filter(x => x.productcategory_id == id);
        console.log(filterProductsByCatID.map(x => x.productcategory_id));

        return [await dbGetCategory.map(x => x.name),await filterProductsByCatID.map(x => x.name), await filterProductsByCatID.map(x => x.price)];
    }






}



interface DBVersion {
    version: string;
    price: number;
}

interface DBCategories {
    name: string;
}

interface DBProducts {
    name: string;
    price: string;
    productcategory_id: number;
}
