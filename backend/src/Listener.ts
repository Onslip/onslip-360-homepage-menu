import { API, AbortController } from "@onslip/onslip-360-node-api";
import { DatabaseURI, DBQuery } from "@divine/uri";
import { DBcategory, DBCatImage, DBImage, DBproduct, ICategory, IProduct } from "./interfaces";

export async function UpdateDb(api: API, db: DatabaseURI) {
    CreateDB(api, db);
    while (true) {
        const cancel = new AbortController();
        try {
            const stream = await api.addEventStream({
                state: "pending",
                queries: [
                    { resource: "button-maps", query: `type=menu-section` },
                    { resource: "button-maps", query: `type=menu` },
                ],
            });
            setTimeout(() => cancel.abort(), 60_000);

            const event = (await api.signal(cancel.signal).openEventStream(stream.id).next());
            if (event != null) {
                console.log('done');
                await CreateDB(api, db);
                cancel.abort()
            }
        } catch (error) {
            console.error(error);
            cancel.abort();
        }
    }
}

async function Getproducts(api: API): Promise<IProduct[]> {
    const getAllProducts = await api.listProducts();
    const buttonmaps = (await api.listButtonMaps()).filter(buttonmap => buttonmap.type == "menu-section")
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

async function GetCategories(api: API): Promise<ICategory[]> {
    const buttonmaps = await api.listButtonMaps()
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

async function CreateDB(api: API, db: DatabaseURI) {
    const products = await Getproducts(api);
    const categories = await GetCategories(api);

    await db.query<DBQuery>`create schema if not exists onslip`
        .then(async () => {
            await db.query<DBQuery>`create table if not exists onslip.menu (id INT PRIMARY KEY, name STRING NOT NULL)`
            await db.query<DBQuery>`truncate onslip.menu cascade`
            const menu = (await api.listButtonMaps()).filter(x => x.type == 'menu');
            (await menu).forEach(async element => {
                await db.query<DBQuery>`insert into onslip.menu (id, name) values (${element.id}, ${element.name}) on conflict do nothing`;
            })
        })
        .then(async () => {
            await db.query<DBQuery>`create table if not exists onslip.products (id INT PRIMARY KEY, name STRING NOT NULL, price DECIMAL NOT NULL, description STRING)`;
            await db.query<DBQuery>`truncate onslip.products cascade`
            products.forEach(async x => {
                await db.query<DBQuery[]>`insert into onslip.products (id, name, price, description) VALUES (${x.product?.id ?? null}, ${x.product?.name ?? null}, ${x.product?.price ?? null} , ${x.product?.description ?? null}) ON Conflict do nothing`
            })
        })
        .then(async () => {
            await db.query<DBQuery>`create table if not exists onslip.productcategories (id INT PRIMARY KEY, position INT NOT NULL, name STRING, menu_id INT REFERENCES onslip.menu(id))`;
            await db.query<DBQuery>`truncate onslip.productcategories cascade`;

            (await categories).forEach(async x => {
                await db.query<DBQuery[]>`insert into onslip.productcategories (id, position, name, menu_id) VALUES (${x.id ?? null}, ${x.position}, ${x.name ?? null}, ${x.menu_id})  ON Conflict do nothing`
            });
        })
        .then(async () => {
            await db.query<DBQuery>`create table if not exists onslip.grouptoproduct (product_id INT REFERENCES onslip.products(id), category_id INT REFERENCES onslip.productcategories(id), productposition INT NOT NULL)`
            await db.query<DBQuery>`truncate onslip.grouptoproduct cascade`;

            products.forEach(async (x) => {
                const list = await db.query<DBQuery[]>`select * from onslip.grouptoproduct where product_id = ${x.product?.id ?? null} and category_id = ${x.category_id}`;
                const itemExists: boolean = list.length != 0
                if (!itemExists) {
                    db.query <DBQuery[]>`insert into onslip.grouptoproduct (product_id, category_id, productposition) VALUES(${x.product?.id ?? null}, ${x.category_id}, ${x.position}) on conflict do nothing`
                }
            });
        })
        .then(async () => {
            await db.query<DBQuery>`create table if not exists onslip.productimages (image bytea, product_id INT)`
            await db.query<DBQuery>`create table if not exists onslip.categoryimages (image bytea, category_id INT)`
            await db.query<DBQuery>`create table if not exists onslip.images (image bytea, id INT PRIMARY KEY);`
        })
        .then(async () => {
            const dbproucts = await db.query<DBproduct[]>`select * from onslip.products`;
            const imagetable = await db.query<DBImage[]>`select * from onslip.productimages`;
            imagetable.forEach(async x => {
                const no = dbproucts.find(c => c.id == x.product_id)
                if (no == undefined) {
                    await db.query<DBQuery>`delete from onslip.productimages where product_id = ${x.product_id ?? null}`
                }
            })
        })
        .then(async () => {
            const categoryList = await db.query<DBcategory[]>`select * from onslip.productcategories`;
            const imagetable = await db.query<DBCatImage[]>`select * from onslip.categoryimages`;
            imagetable.forEach(async x => {
                const no = categoryList.find(c => c.id == x.category_id)
                if (no == undefined) {
                    await db.query<DBQuery>`delete from onslip.categoryimages where category_id = ${x.category_id ?? null}`
                }
            })
        })
}


