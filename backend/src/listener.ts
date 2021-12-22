import { DHMService } from "./dhm-service";
import {
  API,
  AbortController,
  eventStreamType,
} from "@onslip/onslip-360-node-api";
import {
  DatabaseURI,
  DBQuery,
  DBResult,
  toObject,
  URI,
  ZlibEncoder,
} from "@divine/uri";
import { DHMConfig } from "./schema";

export class Listener {
  private api: API;
  private db: DatabaseURI;

  constructor(private config: DHMConfig) {
    const { base, realm, id, key } = config.onslip360;
    this.api = new API(base, realm, id, key);
    this.db = new URI(config.database.uri) as DatabaseURI;
  }

  async ListenerDelete(load: API.DataObjectOperation) {
    const getId = load.payload as IProductPayload;
    this.db.query<DBQuery[]>`Delete from onslip.products where rowid = ${getId.usage.product}`;
  }

  async ListenerCreate(load: API.DataObjectOperation) {
    const getId = load.payload as IProductPayload;
    const prod = await this.api.getProduct(getId.usage.product);
    this.db.query<DBQuery[]>`upsert into onslip.products (rowid, name, price, productcategory_id) VALUES (${prod.id},${prod.name}, ${prod.price ?? null}, ${prod["product-group"]})`;
  }

  async ListenerGroupDelete(load: API.DataObjectOperation) {
    const getId = load.payload as IGroupPayload;
    this.db.query<DBQuery[]>`Delete from onslip.productcategories where id = ${getId.usage["product-group"]}`;
  }

  async ListenerGroupCreate(load: API.DataObjectOperation) {
    const getId = load.payload as IGroupPayload;
    const prodGroup = await this.api.getProductGroup(getId.usage["product-group"]);
    this.db.query<DBQuery[]>`upsert into onslip.productcategories (id, name) VALUES (${prodGroup.id}, ${prodGroup.name})`;
  }

  async UpdateAll() {
    const getAllProductGroups = this.api.listProductGroups();
    this.db.query<DBQuery[]>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, name STRING NOT NULL`;
    this.db.query<DBQuery[]>`create table if not exists onslip.products (name STRING NOT NULL, price STRING NOT NULL, description STRING, productcategory_id INT REFERENCES onslip.productcategories(id))`;
    (await getAllProductGroups).forEach((x) => {
      this.db.query<DBQuery[]>`upsert into onslip.productcategories (id, name) VALUES (${x.id}, ${x.name})`
    });

    const getAllProducts = this.api.listProducts();
    (await getAllProducts).forEach((x) => {
      this.db.query<DBQuery[]>`upsert into onslip.products (rowid, name, price, description,productcategory_id) VALUES (${x.id}, ${x.name}, ${x.price ?? null}, ${x.description ?? null}, ${x["product-group"]})`
    });
  }

  async DeleteFromDb() {
    const deletedProducts = (
      await this.api.listProducts(undefined, undefined, undefined, undefined, true)).filter((product) => product.deleted != undefined);
    deletedProducts.forEach((x) => {
      this.db.query<
        DBQuery[]
        >`delete from onslip.products where rowid = ${x.id}`;
    });

    const deletedGroups = (
      await this.api.listProductGroups(undefined, undefined, undefined, undefined, true)).filter((group) => group.deleted != undefined);
    deletedGroups.forEach((x) => {
      this.db.query<
        DBQuery[]
        >`delete from onslip.productcategories where id = ${x.id}`;
    });
  }

  async Listener() {
    this.UpdateAll();
    this.DeleteFromDb();
    while (true) {
      try {
        const stream = await this.api.addEventStream({
          state: "pending",
          queries: [
            { resource: "records", query: "usage.type=product-create" },
            { resource: "records", query: "usage.type=product-group-create" },
            { resource: "records", query: `usage.type=product-delete` },
            { resource: "records", query: `usage.type=product-group-delete` },
            { resource: "records", query: `usage.type=product-update` },
            { resource: "records", query: `usage.type=product-group-update` },
          ],
        });
        const cancel = new AbortController();
        setTimeout(() => cancel.abort, 60_000);

        console.log("Product and product group updates:");
        for await (const event of this.api
          .signal(cancel.signal)
          .openEventStream(stream.id)) {
          const load = event.payload as ILoad;
          console.log(event);
          switch (load.usage.type) {
            case "product-create" || "product-update":
              this.ListenerCreate(event);
              break;
            case "product-group-create" || "product-group-update":
              this.ListenerGroupCreate(event);
              break;
            case "product-delete":
              this.ListenerDelete(event);
              break;
            case "product-group-delete":
              this.ListenerGroupDelete(event);
              break;
            default:
              break;
          }
        }
        console.log("All done");
      } catch (error) {
        console.error(error);
      }
    }
  }
}

interface IProductPayload {
  usage: { product: number; type: string };
}

interface IGroupPayload {
  usage: { "product-group": number; type: string };
}

interface ILoad {
  usage: { type: string };
}
