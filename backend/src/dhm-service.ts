import { DatabaseURI, DBQuery, DBResult, FIELDS, HEADERS, JSONParser, URI, ZlibEncoder } from '@divine/uri';
//const { DatabaseURI, URI } = require('@divine/uri');

import { WebArguments, WebResource, WebService } from '@divine/web-service'
import { AbortController, API } from '@onslip/onslip-360-node-api';
import { Name } from 'ajv';
import { setPriority } from 'os';
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
                    if(args.has("?who")) {
                        return svc.rootResponse(args.string('?who', undefined));
                    }
                    if (args.has("?group")) {
                        return svc.GetProdByGroup();

                    }
                    if (args.has("?trigg")) {
                        return svc.ProductUpdateTrigger;

                    }
                    // if (args.has("?event")) {
                    //     return svc.Eventstreamer();

                    // }
                    else {
                        return "ERROR NOT FOUND" ;
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
        const dbGetProducts = await this.db.query<DBProduct[]>`SELECT * FROM onslip.products`;
        const dbGetCategory = await this.db.query<DBCategories[]>`SELECT * FROM onslip.productcategories WHERE id=${id?? 0}`;


        const filterProductsByCatID = await dbGetProducts.filter(x => x.productcategory_id == id);

        return [await dbGetCategory.map(x => x.name),await filterProductsByCatID.map(x => [x.name, x.price]),  this.Eventstreamer()];
    }


    private async SelectFoodNameGroup(id?: number) {
        const dbGetCategory = await this.db.query<DBCategories[]>`SELECT * FROM onslip.productcategory`;
        const dbGetProducts = await this.db.query<DBProduct[]>` SELECT * FROM onslip.products,onslip.productcategory WHERE productcategory_id = onslip.productcategory.rowid `;


        const getCatListName=  await dbGetCategory.map(x => x.name);
        const getProdNamePrice = dbGetProducts.map(x=> [x.name,x.price]);
        
        //console.log(dbGetProducts.map(x => [x.price, x.name, x.productcategory_id, x.productcategoryname, x.]));
        console.log(dbGetProducts);


        
        Symbol
        

        const filterProductsByCatID = await dbGetProducts.filter(x => x.productcategory_id == id);

        return [await {getCatListName,}];
    }

    private async GetProdByGroup() {
        const catName = await this.db.query<DBCat[]>`select * from onslip.productcategories`;
        const prod = await this.db.query<DBProduct[]>`select * from onslip.products`;
        return catName.map(r => [r.name, prod.filter(x => x.productcategory_id == r.id).map(x => x.name)]);
    }
    
private async ProductUpdateTrigger() {
    const trigger = await this.api.getTrigger(1,5);
    console.log(trigger.query);
}

private async Eventstreamer(){
    while(true){
    try{
    const stream = await this.api.addEventStream({ state: 'pending', queries: [ { resource: 'records', query: 'usage.type=product-update' } ] });
    const cancelsignal = new AbortController();
    setTimeout(() => cancelsignal.abort, 60_000);
    

    for await (const event of this.api.signal(cancelsignal.signal).openEventStream(stream.id)){
        console.log(event);
    }

    console.log("done");


    }catch(err){

        console.log(`No error`)
    }
}
}





}

interface DBCat 
{
    id: number;
    name: string;
}  

interface DBVersion {
    version: string;
    price: number;
}

interface DBCategories {
    name: string;
}

interface DBProduct {
    name: string;
    price: string;
    productcategory_id: number;
    productcategoryname: string;
}



interface QueryTrigger {
    'resource': string;
    'query': string;
}
