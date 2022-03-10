import { API, AbortController } from "@onslip/onslip-360-node-api";
import { DatabaseURI, DBQuery } from "@divine/uri";

export class Listener {
    private api: API;
    private db: DatabaseURI;
    constructor(_api: API, _db: DatabaseURI) {
        this.api = _api;
        this.db = _db;
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


    private async CreateDB() {
        await this.db.query<DBQuery[]>`create schema if not exists onslip`;
        this.CreateGroupTable();
    }
    private async CreateProductImageTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.productimages (image bytea, product_id INT PRIMARY KEY REFERENCES onslip.products(id))`;
        await this.db.query<DBQuery[]>`create table if not exists onslip.categoryimages (image bytea, category_id INT PRIMARY KEY REFERENCES onslip.productcategories(id))`;
        await this.db.query<DBQuery[]>`create table if not exists onslip.images (image bytea, id INT PRIMARY KEY);`
    }

    private async CreateGroupTable() {
        const buttonmaps = await this.api.listButtonMaps()
        const getAllProductGroups = buttonmaps.filter(b => b.type == "menu");
        await this.db.query<DBQuery[]>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, position INT NOT NULL, name STRING NOT NULL)`;
        (await getAllProductGroups[0].buttons).forEach((x) => {
            console.log(buttonmaps[x["button-map"] ?? 0])
            this.db.query<DBQuery[]>`upsert into onslip.productcategories (id, position, name) VALUES (${x["button-map"] ?? null}, ${x.x}, ${x.product ?? null})`
        });
        this.CreateProductTable(getAllProductGroups);
    }

    private async CreateProductTable(buttonmaps: API.Stored_ButtonMap[]) {
        await this.db.query<DBQuery[]>`create table if not exists onslip.products (id INT PRIMARY KEY, name STRING NOT NULL, price STRING NOT NULL, description STRING, productcategory_id INT REFERENCES onslip.productcategories(id))`;
        const getAllProducts = await this.api.listProducts();
        console.log(buttonmaps)
        const products = buttonmaps.flatMap(b => {
            return (
                b.buttons.flatMap(x => {
                    return {
                        product: getAllProducts.filter(z => z.id == x.product),
                        buttonmap: b.id
                    }
                })
            )
        });
        console.log(buttonmaps[0].buttons[1].y)
        products.forEach((x) => {
            this.db.query<DBQuery[]>`upsert into onslip.products (id, name, price, description, productcategory_id) VALUES (${x.product[0].id}, ${x.product[0].name}, ${x.product[0].price ?? null}, ${x.product[0].description ?? null}, ${x.buttonmap ?? null})`
        });
        await this.CreateProductImageTable();
        this.DeleteFromDb();
    }

    async DeleteFromDb() {
        const deletedProducts = (
            await this.api.listProducts(undefined, undefined, undefined, undefined, true)).filter((product) => product.deleted != undefined);
        deletedProducts.forEach((x) => {
            this.db.query<DBQuery[]>`delete from onslip.products where id = ${x.id}`;
        });

        const deletedGroups = (
            await this.api.listProductGroups(undefined, undefined, undefined, undefined, true)).filter((group) => group.deleted != undefined);
        deletedGroups.forEach((x) => {
            this.db.query<DBQuery[]>`delete from onslip.productcategories where id = ${x.id}`;
        });
    }

    async Listener() {
        this.CreateDB();
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