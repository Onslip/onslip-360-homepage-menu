import { API, AbortController } from "@onslip/onslip-360-node-api";
import { DatabaseURI, DBQuery } from "@divine/uri";
import { DBproduct } from "./dhm-service";
import { main } from "./onslip-360-homepage-menu";

export class Listener {
    private api: API;
    private db: DatabaseURI;
    constructor(_api: API, _db: DatabaseURI) {
        this.api = _api;
        this.db = _db;
    }

    ListenerCreate(load: API.ButtonMap) {
        if (load.type == "menu-section") {
            this.db.query<DBQuery[]>`delete from onslip.products where productcategory_id=${load.id ?? null}`
            this.db.query<DBQuery[]>`delete from onslip.productcategories where id=${load.id ?? null}`
        }
        if (load.type == "menu") {
            load.buttons.forEach(b => {
                this.db.query<DBQuery[]>`delete from onslip.products where productcategory_id=${b["button-map"] ?? null}`
                this.db.query<DBQuery[]>`delete from onslip.productcategories where id=${b["button-map"] ?? null}`
            })
            this.db.query<DBQuery[]>`delete from onslip.menu where id=${load.id ?? null}`
        }
        console.log(load)
        this.CreateMenuTable();
        this.CreateGroupTable();
        this.CreateProductTable()
    }


    private async CreateDB() {
        await this.db.query<DBQuery[]>`create schema if not exists onslip`;
        this.CreateMenuTable();
    }
    private async CreateProductImageTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.productimages (image bytea, product_id INT REFERENCES onslip.products(id))`;
        await this.db.query<DBQuery[]>`create table if not exists onslip.categoryimages (image bytea, category_id INT REFERENCES onslip.productcategories(id))`;
        await this.db.query<DBQuery[]>`create table if not exists onslip.images (image bytea, id INT PRIMARY KEY);`
    }

    async Getproducts(): Promise<IProduct[]> {
        const getAllProducts = await this.api.listProducts();
        const buttonmaps = (await this.api.listButtonMaps()).filter(buttonmap => buttonmap.type == "menu-section")
        const products: IProduct[] = buttonmaps.flatMap(category => {
            return (
                category.buttons.flatMap(product => {
                    return {
                        position: product.y,
                        category_id: category.id,
                        product: getAllProducts.find(p => p.id == product.product)
                    }
                })
            )
        })
        return products
    }

    async CreateMenuTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.menu (id INT PRIMARY KEY, name STRING NOT NULL)`
        const menu = (await this.api.listButtonMaps()).filter(x => x.type == 'menu');
        (await menu).forEach(element => {
            this.db.query<DBQuery[]>`upsert into onslip.menu (id, name) values (${element.id}, ${element.name})`;
        })
        this.CreateGroupTable();
    }

    private async CreateGroupTable() {
        const buttonmaps = await this.api.listButtonMaps()
        const getAllProductGroups = buttonmaps.filter(b => b.type == "menu");

        const categories = getAllProductGroups.flatMap(menu => {
            return (
                menu.buttons.flatMap(category => {
                    return {
                        id: category["button-map"],
                        menu_id: menu.id,
                        position: category.x,
                        name: buttonmaps.find(buttonmap => buttonmap.id == category["button-map"])?.name
                    }
                })
            )
        })

        await this.db.query<DBQuery[]>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, position INT NOT NULL, name STRING, menu_id INT REFERENCES onslip.menu(id))`;
        (await categories).forEach((x) => {
            this.db.query<DBQuery[]>`upsert into onslip.productcategories (id, position, name, menu_id) VALUES (${x.id ?? null}, ${x.position}, ${x.name ?? null}, ${x.menu_id})`
        });
        this.CreateProductTable();
    }

    private async CreateProductTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.products (id INT PRIMARY KEY, name STRING NOT NULL, price STRING NOT NULL, description STRING, productcategory_id INT REFERENCES onslip.productcategories(id))`;
        const getAllProducts = await this.api.listProducts();
        const buttonmaps = (await this.api.listButtonMaps()).filter(buttonmap => buttonmap.type == "menu-section")
        const products = await this.Getproducts()
        products.forEach((x) => {
            this.db.query<DBQuery[]>`upsert into onslip.products (id, name, price, description, productcategory_id) VALUES (${x.product?.id ?? null}, ${x.product?.name ?? null}, ${x.product?.price ?? null}, ${x.product?.description ?? null}, ${x.category_id ?? null})`
        });
        await this.CreateProductImageTable();
    }

    async Listener() {
        this.CreateDB();
        while (true) {
            try {
                const stream = await this.api.addEventStream({
                    state: "pending",
                    queries: [
                        { resource: "button-maps", query: `` },
                    ],
                });
                const cancel = new AbortController();
                setTimeout(() => cancel.abort, 60_000);

                console.log("Product and product group updates:");
                for await (const event of this.api
                    .signal(cancel.signal)
                    .openEventStream(stream.id)) {
                    this.ListenerCreate(event.payload as API.ButtonMap);
                }
                console.log("All done");
            } catch (error) {
                console.error(error);
            }
        }
    }
}

interface IPayload {
    id: number;
}

interface IProduct {
    position: number,
    category_id: number,
    product?: DBproduct
}

// interface IGroupPayload {
//     usage: { "product-group": number; type: string };
// }

// interface ILoad {
//     usage: { type: string };
// }