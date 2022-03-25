import { GetData } from "./get";

export interface DBImage {
  image: any
  product_id: number
}

export interface DBproduct {
  id: number,
  name: string
  description: string
  price: string,
  productcategory_id: number,
}

export interface DBcategory {
  name: string
  id: number,
}

export interface Styleconfig {
  id: number;
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

export interface MenuWithCategory {
  menu: Menu
  categories: categorywithproduct[]
}
export interface Menu {
  id: number;
  name: string;
}

export interface categorywithproduct {
  category: DBcategory,
  products: DBproduct[]
}

export enum buttonvalues {
  background = "Ändra bakgrund",
  banner = "Ändra banner",
  logo = "Ändra logga"
}

export const Fonts = [
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  `Cambria, Cochin, Georgia, Times, 'Times New Roman', serif`,
  `'Courier New', Courier, monospace`,
  'cursive',
  'fantasy',
  `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
  `Georgia, 'Times New Roman', Times, serif`,
  `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`,
  `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
  'monospace',
  'sans-serif',
  `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  `'Times New Roman', Times, serif`,
  `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
  'Verdana, Geneva, Tahoma, sans-serif',
];


export const editorvisual: boolean = false;


export const config: Styleconfig = await getConfig();

export async function getConfig(): Promise<Styleconfig> {
  let data: Styleconfig = await GetData(`http://localhost:8080/config`).then(response => response).catch(err => err)
  if (data.categoryImages == undefined)
    return {
      id: 1,
      background: {
        enabled: false,
        color: null,
      },
      productImages: {
        useProductImages: false,
        style: 'Disabled',
        placement: 'Left',
      },
      categoryImages: {
        useCategoryImages: false,
        style: 'Disabled'
      },
      Logo: false,
      banner: false,
      font: {
        fontFamily: null,
        fontWeight: false,
        fontStyle: false,
        fontSize: null,
        fontColor: null,
        fontTitleColor: null,
        fontOutline: false
      },
      menuBackground: null,
      connect: true,
      menuInUse: 0,
    } as Styleconfig
  else return data
}
