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
    this.CreateDB();

    // this.listener.Listener();
    return ["hej"];
  }

  private async CreateDB() {
    await this.db.query<DBQuery[]>`create schema if not exists onslip`;
    this.CreateTable();
  }

  private async CreateTable() {
    const getAllProductGroups = this.api.listProductGroups();
    this.db.query<DBQuery[]>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, name STRING NOT NULL)`;
    (await getAllProductGroups).forEach((x) => {
      this.db.query<DBQuery[]>`upsert into onslip.productcategories (id, name) VALUES (${x.id}, ${x.name})`
    });
    this.CreateNextTable();
  }

  private async CreateNextTable() {
    await this.db.query<DBQuery[]>`create table if not exists onslip.products (name STRING NOT NULL, price STRING NOT NULL, description STRING, productcategory_id INT REFERENCES onslip.productcategories(id))`;
    const getAllProducts = this.api.listProducts();
    (await getAllProducts).forEach((x) => {
      this.db.query<DBQuery[]>`upsert into onslip.products (rowid, name, price, description,productcategory_id) VALUES (${x.id}, ${x.name}, ${x.price ?? null}, ${x.description ?? null}, ${x["product-group"]})`
    });
  }

  //   private async GetProdByGroup() {
  //     const catName = await this.db.query<
  //       DBCat[]
  //       >`select * from onslip.productcategories`;
  //     const prod = await this.db.query<
  //       DBProduct[]
  //       >`select * from onslip.products`;
  //     return catName.map((r) => [
  //       r.name,
  //       prod
  //         .filter((x) => x.productcategory_id == r.id)
  //         .map((x) => [x.name, x.price, x.description]),
  //     ]);
  //   }
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

