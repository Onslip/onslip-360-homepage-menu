import { API, AbortController } from "@onslip/onslip-360-node-api";
import { DatabaseURI, DBQuery, FIELDS } from "@divine/uri";
import { DBcategory, DBproduct, ICategory, IProduct, Menu } from "./interfaces";

export class Listener {
    private api: API;
    private db: DatabaseURI;
    constructor(_api: API, _db: DatabaseURI) {
        this.api = _api;
        this.db = _db;
    }

    async CreateDB() {
        await this.db.query<DBQuery[]>`create schema if not exists onslip`;
        await this.CreateMenuTable();
        await this.CreateGroupTable();
        await this.CreateProductTable();
        await this.CreateJunction();
        await this.CreateProductImageTable();
        await this.Delete();
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
                        category_id: category.id,
                        product: getAllProducts.find(p => p.id == product.product),
                        position: product.y,
                    }
                })
            )
        })
        return products
    }

    async GetCategories(): Promise<ICategory[]> {
        const buttonmaps = await this.api.listButtonMaps()
        const getAllProductGroups = buttonmaps.filter(b => b.type == "menu");

        const categories: ICategory[] = getAllProductGroups.flatMap(menu => {
            return (
                menu.buttons.flatMap(category => {
                    return {
                        id: category["button-map"] ?? 0,
                        menu_id: menu?.id,
                        position: category?.x,
                        name: buttonmaps?.find(buttonmap => buttonmap.id == category["button-map"])?.name
                    }
                })
            )
        })
        return categories
    }

    async CreateMenuTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.menu (id INT PRIMARY KEY, name STRING NOT NULL)`
        const menu = (await this.api.listButtonMaps()).filter(x => x.type == 'menu');
        (await menu).forEach(async element => {
            const menuList = await this.db.query<DBQuery[]>`select * from onslip.menu where id = ${element.id}`;
            const menuExists: boolean = menuList.length != 0;
            if (!menuExists) {
                await this.db.query<DBQuery[]>`insert into onslip.menu (id, name) values (${element.id}, ${element.name})`;
            }
            else {
                await this.db.query<DBQuery[]>`update onslip.menu set (name) =  (${element.name}) where id = ${element.id}`;
            }
            const checkIfMenuExistsOnApi: boolean = (await menu).find(z => z.id == element.id) == null;
            if (checkIfMenuExistsOnApi) {
                await this.db.query<DBQuery>`delete from onslip.products where id = ${element.id ?? null}`;
            }
        })
    }

    async Delete() {
        const productList = await this.db.query<DBproduct[]>`select * from onslip.products`;
        productList.forEach(async x => {
            const chack = (await this.Getproducts()).find(z => z.product?.id == x.id) == undefined
            if (chack) {
                await this.db.query<DBQuery>`delete from onslip.grouptoproduct where product_id = ${x.id ?? null}`
                await this.db.query<DBQuery>`delete from onslip.productimages where product_id = ${x.id ?? null}`
                await this.db.query<DBQuery>`delete from onslip.products where id = ${x.id ?? null}`;
            }
        })
        const categoryList = await this.db.query<DBcategory[]>`select * from onslip.productcategories`;
        categoryList.forEach(async x => {
            const chack = (await this.GetCategories()).find(z => z.id == x.id) == undefined
            if (chack) {
                await this.db.query<DBQuery>`delete from onslip.grouptoproduct where category_id = ${x.id}`
                await this.db.query<DBQuery>`delete from onslip.categoryimages where category_id = ${x.id}`
                await this.db.query<DBQuery>`delete from onslip.productcategories where id = ${x.id}`;
            }
        })
        const menuList = await this.db.query<Menu[]>`select * from onslip.menu`;
        menuList.forEach(async x => {
            const chack = (await (await this.api.listButtonMaps()).filter(c => c.type == 'menu')).find(z => z.id == x.id) == undefined
            if (chack) {
                await this.db.query<DBQuery>`delete from onslip.menu where id = ${x.id}`;
            }
        })
    }

    private async CreateGroupTable() {

        await this.db.query<DBQuery[]>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, position INT NOT NULL, name STRING, menu_id INT REFERENCES onslip.menu(id))`;
        (await this.GetCategories()).forEach(async x => {

            const categoryList = await this.db.query<DBQuery[]>`select * from onslip.productcategories where id = ${x.id}`;
            const categoryExists: boolean = categoryList.length != 0;
            if (!categoryExists) {
                await this.db.query<DBQuery[]>`insert into onslip.productcategories (id, position, name, menu_id) VALUES (${x.id ?? null}, ${x.position}, ${x.name ?? null}, ${x.menu_id})`
            }
        });
    }

    private async CreateProductTable() {
        await this.db.query<DBQuery[]>`create table if not exists onslip.products (id INT PRIMARY KEY, name STRING NOT NULL, price DECIMAL NOT NULL, description STRING)`;
        const products = await this.Getproducts()
        products.forEach(async x => {
            const productList = await this.db.query<DBQuery[]>`select * from onslip.products where id = ${x.product?.id ?? null}`;
            const productExists: boolean = productList.length != 0

            if (!productExists) {
                await this.db.query<DBQuery[]>`insert into onslip.products (id, name, price, description) VALUES(${x.product?.id ?? null}, ${x.product?.name ?? null}, ${x.product?.price ?? null}, ${x.product?.description ?? null})`
            }
            else {
                await this.db.query<DBQuery[]>`update onslip.products set (name, price, description) = (${x.product?.name ?? null}, ${x.product?.price ?? null}, ${x.product?.description ?? null}) where id = ${x.product?.id ?? null}`
            }
        })
    }

    private async CreateJunction() {
        await this.db.query<DBQuery>`create table if not exists onslip.grouptoproduct (product_id INT REFERENCES onslip.products(id), category_id INT REFERENCES onslip.productcategories(id), productposition INT NOT NULL)`
        const products = await this.Getproducts();
        products.forEach(async (x) => {
            // const list = await this.db.query<DBQuery[]>`select * from onslip.grouptoproduct where `;
            const list = await this.db.query<DBQuery[]>`select * from onslip.grouptoproduct where product_id = ${x.product?.id ?? null} and category_id = ${x.category_id}`;
            const itemExists: boolean = list.length != 0
            if (!itemExists) {
                this.db.query <DBQuery[]>`insert into onslip.grouptoproduct (product_id, category_id, productposition) VALUES(${x.product?.id ?? null}, ${x.category_id}, ${x.position}) `
            }
            else {
                this.db.query<DBQuery[]>`update onslip.grouptoproduct set (product_id, category_id, productposition) = (${x.product?.id ?? null}, ${x.category_id}, ${x.position}) where product_id = ${x.product?.id ?? null} and category_id = ${x.category_id}`
            }
        });
    }

    async Listener() {
        this.CreateDB();
        const cancel = new AbortController();
        while (true) {
            try {
                const stream = await this.api.addEventStream({
                    state: "pending",
                    queries: [
                        { resource: "button-maps", query: `type=menu-section` },
                        { resource: "button-maps", query: `type=menu` },
                    ],
                });
                setTimeout(() => cancel.abort, 60_000);

                const event = (await this.api.signal(cancel.signal).openEventStream(stream.id).next());
                if (event != null) {
                    console.log('done');
                    this.CreateDB();
                }

            } catch (error) {
                console.error(error);
                cancel.abort;
            }
        }
    }


}

