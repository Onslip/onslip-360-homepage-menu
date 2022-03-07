import { GetData } from "./get";

export interface productsWithCategory {
  category: {
    name: string
  }
  products: {
    name: string,
    price: string,
    description: string
    image: any
  }[]
}

export interface DBproduct {
  name: string
  description: string
  price: string
  image: any
}

export interface DBcategory {
  name: string
}

export interface Colorconfig {
  backgroundcolor: string,
}

export interface Banner {
  image: string
}

export interface Styleconfig {
  background: {
    enabled: boolean
    color: string,
  },
  useProductImages: true,
  Logo: true,
  banner: true,
  font: {
    fontFamily: string,
    fontWeight: boolean;
    fontStyle: boolean;
    fontSize: string;
    fontColor: string;
    fontTitleColor: string;
    fontOutline: boolean;
  }
  preset: string,
  menuBackground: string,
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

export const config: Styleconfig = await GetData('http://localhost:8080/config').catch(err => err);