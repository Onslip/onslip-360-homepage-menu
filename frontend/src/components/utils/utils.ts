import { GetData } from "./get";

// export interface productsWithCategory {
//   category: {
//     name: string
//   }
//   products: {
//     id: number,
//     name: string,
//     price: string,
//     description: string
//     image: any
//   }[]
// }
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

export interface DBItems {
  category: DBcategory,
  products: DBproduct[],
}

export interface DBcategory {
  name: string
  id: number,
}

export interface Colorconfig {
  backgroundcolor: string,
}

export interface Banner {
  image: string
}


export interface Styleconfig {
  background?: {
    enabled: boolean
    color?: string,
  },
  useProductImages: boolean,
  useCategoryImages: boolean,
  categoryImages: "disabled" | "background" | "normal",
  Logo: boolean,
  banner: boolean,
  font?: font
  preset?: string,
  menuBackground?: string,
  connect: boolean,
  menuInUse: number;
}

interface font {
  fontFamily: string,
  fontWeight: boolean;
  fontStyle: boolean;
  fontSize: string;
  fontColor: string;
  fontTitleColor: string;
  fontOutline: boolean;
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

export const Presets = [
  'Preset 1', 'Preset 2', 'Preset 3'
]

export const editorvisual: boolean = false;


export const config: Styleconfig = await GetData('http://localhost:8080/config').then(response => response).catch(err => err);
