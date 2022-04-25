import { DHMConfig } from "./schema";

export interface DBproduct {
    id?: number
    name?: string
    description?: string
    price?: number
    productcategory_id?: number;
    position?: number
    imageLoaded?: boolean
}

export interface DBcategory {
    name?: string
    id: number,
    menu_id?: number;
    position: number
    imageLoaded?: boolean
}

export interface DBImage {
    image: any
    product_id: number,

}

export interface DBCatImage {
    image: any
    category_id: number,

}

export interface DBJointTables {
    menuid: number,
    menuname: string,
    categoryid: number,
    categoryname: string,
    position: number,
    id: number,
    name: string,
    description: string,
    price: string,
    productposition: number
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
    api: DHMConfig;
    ApiConnected?: boolean,
    DatabaseConnected?: boolean
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

export interface Styleconfig {
    configId: number
    background?: {
        enabled?: boolean
        color?: string,
    },
    productImages?: {
        useProductImages?: boolean,
        style?: 'Background' | 'Logo' | 'Disabled',
        placement?: 'Left' | 'Right',
    }
    categoryImages?: {
        useCategoryImages?: boolean,
        style?: 'Background' | 'Banner' | 'Disabled'
    }
    Logo?: boolean,
    banner?: boolean,
    font?: font,
    menuBackground?: string,
    connect?: boolean,
    menuInUse?: number;
}

interface font {
    fontFamily?: string,
    fontWeight?: boolean;
    fontStyle?: boolean;
    fontSize?: string;
    fontColor?: string;
    fontTitleColor?: string;
    fontOutline?: boolean;
}

export interface MainConfig {
    configId?: number;
    selectedLocation?: {
        name: string,
        id: number
    }
    selectedMenu?: 0;
};

export interface ChangePosition {
    menu: number
    categories: { id: number, position: number }[]
}


export interface Timetable {
    locationId: number,
    menus: menu[]

}

export interface days {
    Day: number,
    Times?: times[]
}

export interface times {
    time: number
}

export interface menu {
    MenuId: number
    Days: days[]
}