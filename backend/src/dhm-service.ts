import { DatabaseURI, DBQuery, DBResult, toObject, URI } from '@divine/uri';
import { WebArguments, WebResource, WebService } from '@divine/web-service'
import { API } from '@onslip/onslip-360-node-api';
import { Name } from 'ajv';
import { profileEnd } from 'console';
import { emitKeypressEvents } from 'readline';
import { createContext } from 'vm';
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
                    return svc.rootResponse(args.string('?who', undefined));
                }
            });
    }

    private async rootResponse(who?: string) {
        const clientInfo = await this.api.getClientInfo();
        // const dbVersion = await this.db.query<DBVersion[]>`select version()`;
        // const dbGetList = await this.db.query<DBQuery[]>`select * from onslip.products `;
        const getGroups = await this.api.listProductGroups();
        // this.db.query<DBQuery[]>`CREATE TABLE onslip.productcategories (id INT PRIMARY KEY, name STRING)`;
        
        const getProducts = await this.api.listProducts();
      
        // this.db.query<DBQuery[]>`CREATE TABLE onslip.products (name STRING, price STRING, description STRING, productcategory_id INT REFERENCES onslip.productcategories(id))`
        // getGroups.forEach(element => 
        //     this.db.query<DBQuery[]>`INSERT INTO onslip.productcategories (id, name) VALUES (${element.id}, ${element.name})`
        //     );
        // getProducts.forEach(element => 
        //     this.db.query<DBQuery[]>`INSERT INTO onslip.products (rowid, name, price, description, productcategory_id) VALUES (${element.id}, ${element.name}, ${element.price ?? null}, ${element.description ?? null}, ${element['product-group']})`
        //     );
        return this.GetProdByGroup();
    }



    private async GetProdByGroup() {
        const catName = await this.db.query<DBCat[]>`select * from onslip.productcategories`;
        // const list = await this.db.query<DBQuery[]>`select onslip.products.name, onslip.productcategory.name from onslip.productcategory join onslip.products on productcategory_id = onslip.productcategory.rowid `;
        // const catId = await this.db.query<DBQuery[]>`select rowid from onslip.productcategories`;
        const prod = await this.db.query<DBProduct[]>`select * from onslip.products`;
        return catName.map(r => [r.name, prod.filter(x => x.productcategory_id == r.id).map(x => x.name)]);
    }
}

interface DBVersion {
    version: string;
}

interface DBCat 
{
    id: number;
    name: string;
}  

interface DBProduct {
    name: string;
    price: string;
    description: string;
    productcategory_id: number;
}
