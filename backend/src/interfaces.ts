export interface DBproduct {
    id?: number
    name?: string
    description?: string
    price?: number
    productcategory_id?: number;
    position?: number
}

export interface DBcategory {
    name?: string
    id: number,
    menu_id?: number;
    position: number
}

export interface DBImage {
    image: any
    product_id: number,

}

export interface MenuWithCategory {
    menu: Menu
    categories: categorywithproduct[]
}

export interface categorywithproduct {
    category: DBcategory,
    products: DBproduct[],
}

export interface newApi {
    base: string,
    realm: string,
    key: string,
    id: string,
    uri: string
}

export interface IPayload {
    id: number;
}

export interface IProduct {
    category_id: number,
    product?: DBproduct,
    position: number,
}

export interface ICategory {
    id: number,
    position: number;
    menu_id: number;
    name?: string;
}

export interface Junction {
    product_id: number;
    category_id: number;
    productposition: number,
}

export interface Menu {
    id: number;
    name: string;
}