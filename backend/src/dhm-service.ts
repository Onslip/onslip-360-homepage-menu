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
    // this.listener.ListenerDelete();
    // this.ListenerUpdate();
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

//   private async ListenerUpdate() {
//     while (true) {
//       try {
//         for (const pg of await this.api.listProductGroups("", "name")) {
//           console.log(`  ${pg.name}, created on ${new Date(pg.created)}`);
//         }

//         for (const product of await this.api.listProducts(
//           `price>20`,
//           "name",
//           0,
//           -1,
//           true,
//           ""
//         )) {
//           console.log(
//             `  ${product.name}: ${product.price} kr ${
//               product.deleted
//                 ? `(deleted on ${new Date(product.deleted as string)})`
//                 : ""
//             }`
//           );
//         }
//         const stream = await this.api.addEventStream({
//           state: "pending",
//           queries: [
//             { resource: "records", query: "usage.type=product-update" },
//             { resource: "records", query: "usage.type=productgroup-update" },
//           ],
//         });
//         const cancel = new AbortController();
//         setTimeout(() => cancel.abort, 60_000);

//         console.log("Product and product group updates:");
//         for await (const event of this.api
//           .signal(cancel.signal)
//           .openEventStream(stream.id)) {
//           const listProduct = this.api.listProducts();
//           const listGroups = this.api.listProductGroups();
//           (await listProduct).forEach(
//             (element) =>
//               this.db.query<DBQuery[]>`update onslip.products SET (name, price, description, productcategory_id) = (${element.name}, ${element.price ?? null}, ${element.description ?? null}, ${element["product-group"]}) where rowid = ${element.id}`
//           );
//           (await listGroups).forEach(
//             (element) =>
//               this.db.query<DBQuery[]>`update onslip.products SET (name) = (${element.name}) where rowid = ${element.id}`
//           );
//           console.log(event);
//         }
//         console.log("All done");
//       } catch (error) {
//         console.log(`OK`);
//         await new Promise((resolve) => setTimeout(resolve));
//       }
//     }
//   }

//   private async ListenerCreate()
//   {
//       while(true)
//       {
//           try{
//             const stream = await this.api.addEventStream({
//                 state: "pending",
//                 queries: [
//                   { resource: "records", query: "usage.type=product-create" },
//                   { resource: "records", query: "usage.type=productgroup-create" },
//                 ],
//               });
//               const cancel = new AbortController();
//               setTimeout(() => cancel.abort, 60_000);
      
//               console.log("Product and product group updates:");
//               for await (const event of this.api.signal(cancel.signal).openEventStream(stream.id)) {
//                 const listProduct = this.api.listProducts();
//                 const listGroups = this.api.listProductGroups();
//                 (await listProduct).forEach(
//                   (element) =>
//                     this.db.query<DBQuery[]>`update onslip.products SET (name, price, description, productcategory_id) = (${element.name}, ${element.price ?? null}, ${element.description ?? null}, ${element["product-group"]}) where rowid = ${element.id}`
//                 );
//                 (await listGroups).forEach(
//                   (element) =>
//                     this.db.query<DBQuery[]>`update onslip.products SET (name) = (${element.name}) where rowid = ${element.id}`
//                 );
//                 console.log(event);
//               }
//               console.log("All done");
//           }
//           catch(error)
//           {
//               console.error(error);
//           }
//       }
//   }

  private async ListenerDelete()
  {
      while(true)
      {
          try{
            const stream = await this.api.addEventStream({
                state: "pending",
                queries: [
                  { resource: "records", query: "usage.type=product-delete" },
                  { resource: "records", query: "usage.type=productgroup-delete" },
                ],
              });
              
              const cancel = new AbortController();
              setTimeout(() => cancel.abort, 60_000);
      
              for await (const event of this.api
                .signal(cancel.signal)
                .openEventStream(stream.id)) {
                // const listProduct = this.api.listProducts();
                // const listGroups = this.api.listProductGroups();
                // (await listProduct).forEach(
                //   (element) =>
                //     this.db.query<DBQuery[]>`DELETE from onslip.products SET (name, price, description, productcategory_id) = (${element.name}, ${element.price ?? null}, ${element.description ?? null}, ${element["product-group"]}) where rowid = ${element.id}`
                // );
                // (await listGroups).forEach(
                //   (element) =>
                //     this.db.query<DBQuery[]>`DELETE onslip.products SET (name) = (${element.name}) where rowid = ${element.id}`
                // );
                event.payload
                console.log(event);
                
              }
              console.log("All done");
          }
          catch(error)
          {
              console.log("error");
          }
      }
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

