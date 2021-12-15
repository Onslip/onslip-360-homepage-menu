import { DatabaseURI, URI } from '@divine/uri';
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
        this.db  = new URI(config.database.uri) as DatabaseURI;
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
        const clientInfo = await this.api.getClientInfo()
        
        const dbVersion  = await this.db.query<DBVersion[]>`select version()`;
        const productGet = await this.api.listProducts();


        return [ 'Helo', who ?? clientInfo.user?.name, dbVersion[0].version,productGet.map(x => x.name).toString()];
    }

    
    private async PrintFood() {
        const productsall: number = this.api.getProduct.length;
        let foodname: string = "";
        let foodprice:number| undefined = 0;
        let fooddesc: string | undefined = "";
        //const productGet = await this.api.getProduct(1);
        for (let index = 0; index < productsall; index++) {
            const productGet = this.api.getProduct(index);
            foodname = (await productGet).name;
            foodprice = (await productGet).price;
            fooddesc = (await productGet).description;

        }

        return [ foodname, foodprice, fooddesc];
    }

    
}

interface DBVersion {
    version: string;
}
