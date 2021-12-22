import { DatabaseURI, DBQuery, DBResult, toObject, URI } from "@divine/uri";
import { WebArguments, WebResource, WebService } from "@divine/web-service";
import { API, AbortController, eventStreamType } from "@onslip/onslip-360-node-api";
import { Name } from "ajv";
import { profileEnd } from "console";
import { type } from "os";
import { listenerCount } from "process";
import { emitKeypressEvents } from "readline";
import { createContext } from "vm";
import { DHMConfig } from "./schema";
import { Listener } from "./listener";


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
    const clientInfo = await this.api.getClientInfo();
    this.listener.Listener();
    return this.GetProdByGroup();
  }

  private async GetProdByGroup() {
    const catName = await this.db.query<
      DBCat[]
      >`select * from onslip.productcategories`;
    const prod = await this.db.query<
      DBProduct[]
      >`select * from onslip.products`;
    return catName.map((r) => [
      r.name,
      prod
        .filter((x) => x.productcategory_id == r.id)
        .map((x) => [x.name, x.price, x.description]),
    ]);
  }
}

interface DBCat {
  id: number;
  name: string;
}

interface DBProduct {
  name: string;
  price: string;
  description: string;
  productcategory_id: number;
}

