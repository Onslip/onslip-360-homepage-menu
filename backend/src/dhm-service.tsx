/** @jsx     jsx4HTML.element */
/** @jsxFrag jsx4HTML.fragment */

import { DatabaseURI, URI } from '@divine/uri';
import { html, jsx4HTML } from '@divine/uri-x4e-parser';
import { WebArguments, WebResource, WebResponse, WebService, WebStatus } from '@divine/web-service';
import { API } from '@onslip/onslip-360-node-api';
import { readFile } from 'fs/promises';
import { DHMConfig } from './schema';
import { Listener } from './Listener';

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

        return new WebService(this)
            .addResource(class implements WebResource {
                static path = RegExp('');

                async GET(args: WebArguments) {
                    return svc.rootResponse(args.string('?who', undefined));
                }
            })
            .addResource(class implements WebResource {
                static path = /(?<type>literal|tsx)/;


                async GET(args: WebArguments) {
                    const [_hello, name, version] = await svc.rootResponse(args.string('?who', undefined));

                    if (args.string('$type') === 'literal') {
                        return new WebResponse(WebStatus.OK, html`<html>
                            <h1>Hello, ${name}</h1>
                            <p>DB Version: ${version}</p>
                        </html>`, {
                            'content-type': 'text/html',
                        });
                    } else {
                        return new WebResponse(WebStatus.OK, <html>
                            <h1>Hello, {name}</h1>
                            <p>DB Version: {version}</p>
                        </html>, {
                            'content-type': 'text/html',
                        });
                    }
                }
            });
    }

    private async rootResponse(who?: string) {
        const clientInfo = await this.api.getClientInfo()
        const dbVersion = await this.db.query<DBVersion[]>`select version()`;
        this.listener.Listener();
        return ['Hello', who ?? clientInfo.user?.name, dbVersion[0].version];
    }
}

interface DBVersion {
    version: string;
}
