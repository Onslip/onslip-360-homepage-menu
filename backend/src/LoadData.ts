import { DatabaseURI, URI } from "@divine/uri";
import { API } from "@onslip/onslip-360-node-api";
import { categorywithproduct, DBcategory, DBproduct, Junction, Menu, MenuWithCategory } from "./interfaces";

export async function GetProdFromApi(api: API): Promise<MenuWithCategory[]> {
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

    const GetCategories: MenuWithCategory[] = menu.flatMap(m => {
        return (
            {
                menu: {
                    id: m.id,
                    name: m.name
                },
                categories: m.buttons.flatMap(b => {
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
        )
    })
    return GetCategories
}

export async function GetProdByGroup(db: DatabaseURI): Promise<MenuWithCategory[]> {
    const categories = await db.query<DBcategory[]>`select * from onslip.productcategories`;
    const products = await db.query<DBproduct[]>`select * from onslip.products`;
    const junction = await db.query<Junction[]>`select * from onslip.grouptoproduct`
    const menu = await db.query<Menu[]>`select * from onslip.menu`
    const GetProducts = (id: number): DBproduct[] => {
        return (
            products.filter(p => p.id == id).flatMap(p => {
                return (
                    {
                        id: Number(p.id),
                        name: p.name,
                        description: p.description,
                        price: Number(p.price),
                        productcategory_id: Number(junction.find(j => j.product_id == p.id)?.category_id),
                        position: Number(junction.find(j => j.product_id == p.id)?.productposition),
                        imageLoaded: false
                    }
                )
            })
        ).sort((a, b) => a.position - b.position)
    }

    const GetCategories = (categoryId: number): categorywithproduct => {
        return (
            {
                category: {
                    id: Number(categoryId),
                    name: categories.find(c => c.id == categoryId)?.name,
                    position: Number(categories.find(c => c.id == categoryId)?.position),
                    imageLoaded: false
                },
                products: junction.filter(j => j.category_id == categoryId).flatMap(x => GetProducts(x.product_id)).sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            })
    }
    const SelectedMenu = menu.flatMap(m => {
        return (
            {
                menu: {
                    id: Number(m.id),
                    name: m.name,
                },
                categories: categories.filter(c => c.menu_id == m.id).flatMap(c => GetCategories(c.id)).sort((a, b) => a.category.position - b.category.position)
            }
        )
    }) as MenuWithCategory[]
    return SelectedMenu;
}