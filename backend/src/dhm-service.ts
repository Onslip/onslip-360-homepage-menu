import { DatabaseURI, FileURI, URI } from '@divine/uri';
import { WebArguments, WebResource, WebResponse, WebService } from '@divine/web-service'
import { API } from '@onslip/onslip-360-node-api';
import { Listener } from './listener';
import { DHMConfig } from './schema';

export class DHMService {
    private api: API;
    private db: DatabaseURI;
    private listener: Listener;
    constructor(private config: DHMConfig) {
        const { base, realm, id, key } = config.onslip360;
        this.api = new API(base, realm, id, key);
        this.db = new URI(config.database.uri) as DatabaseURI;
        this.listener = new Listener(config);
    }

    async initialize(): Promise<this> {
        return this;
    }

    asWebService(): WebService<this> {
        const svc = this;

        return new WebService(this).addResource(
            class implements WebResource {
                static path = RegExp("");

                async GET(args: WebArguments) {
                    return svc.rootResponse(args.string("?who", undefined));
                }
            }
        );
    }

    private async rootResponse(who?: string) {
        this.listener.Listener();
        return ["hej"]
    }
}