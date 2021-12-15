import { DatabaseURI, DBQuery, URI } from '@divine/uri';
import { WebArguments, WebResource, WebService } from '@divine/web-service'
import { API } from '@onslip/onslip-360-node-api';
import { Name } from 'ajv';
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
        const addTable = await this.db.query<DBQuery[]>`CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT)`;
        this.db.query<DBQuery[]>`INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250)`;
        return [ 'Tony', who ?? clientInfo.user?.name, dbVersion[0].version ];
    }
}

interface DBVersion {
    version: string;
}
