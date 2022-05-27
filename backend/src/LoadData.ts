import { DatabaseURI } from "@divine/uri";
import { API } from "@onslip/onslip-360-node-api";
import { categorywithproduct,  DBJointTables, DBproduct, MenuWithCategory } from "./interfaces";

export async function GetProdFromApi(api: API, menuId: number): Promise<MenuWithCategory> {
    const categorybuttonamp = (await api.listButtonMaps()).filter(c => c.type == 'menu-section');
    const menu = (await api.listButtonMaps()).filter(c => c.type == 'menu');
    const getAllProducts = await api.listProducts();
    const GetProducts = (id: number): DBproduct[] => {
        return (
            getAllProducts.filter(p => p.id == id).flatMap(z => {
                return ({
                    id: z.id,
                    name: z.name,
                    description: z.description,
                    price: z.price,
                    productcategory_id: id,
                    position: categorybuttonamp.flatMap(c => c.buttons).find(p => p.product == id)?.y ?? 0
                })
            })
        ).sort((a, b) => a.position - b.position)
    }

    const selectedmenu = menu.find(m => m.id == menuId) ?? null;

    const GetCategories: MenuWithCategory = {
        menu: {
            id: selectedmenu?.id ?? 0,
            name: selectedmenu?.name ?? '',

        },
        categories: selectedmenu?.buttons.flatMap(b => {
            return (
                categorybuttonamp.filter(c => c.id == b['button-map']).flatMap(category => {
                    return ({
                        category: {
                            name: category.name,
                            id: category.id,
                            position: b.x
                        },
                        products: category.buttons.flatMap(x => { return GetProducts(x.product ?? 0) }).sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                    })
                })
            )
        }).sort((a, b) => (a.category.position - b.category.position))
    }

    return GetCategories
}

export async function GetProdByGroup(db: DatabaseURI, menuId: number): Promise<MenuWithCategory> {

    const jointTables = await db.query<DBJointTables[]>`
    SELECT menu.id as menuId, menu.name as menuName, productcategories.id as categoryId, productcategories.name as categoryName, productcategories.position, products.id, products.name, products.description, products.price, grouptoproduct.productposition
    FROM onslip.menu
    LEFT JOIN onslip.productcategories ON onslip.productcategories.menu_id = onslip.menu.id
    LEFT JOIN onslip.grouptoproduct ON onslip.grouptoproduct.category_id = onslip.productcategories.id
    LEFT JOIN onslip.products ON onslip.products.id = onslip.grouptoproduct.product_id WHERE onslip.menu.id = ${menuId}`
  
    const sortedtable: MenuWithCategory = {
        menu: {
            id: Number(jointTables.find(x => x.menuid == menuId)?.menuid) ?? 0,
            name: jointTables.find(x => x.menuid == menuId)?.menuname ?? ''
        },
        categories: jointTables.flatMap(c => {
            return ({
                category: {
                    name: c?.categoryname,
                    id: Number(c?.categoryid),
                    position: Number(c?.position)
                },
                products: jointTables.filter(p => p?.categoryid == c?.categoryid).flatMap(p => {
                    return ({
                        id: Number(p?.id),
                        name: p?.name,
                        description: p?.description,
                        price: Number(p?.price),
                        productcategory_id: Number(c?.id),
                        position: Number(p?.productposition)
                    })
                }).sort((a, b) => (a.position) - (b.position))
            })
        }).sort((a, b) => a.category.position - b.category.position)
    }

    const uniqueChars: categorywithproduct[] = [];
    sortedtable.categories?.forEach((c) => {
        if (!uniqueChars.find(x => x.category.id == c.category.id)) {
            uniqueChars.push(c);
        }
    });

    sortedtable.categories = uniqueChars;
    return sortedtable;
}