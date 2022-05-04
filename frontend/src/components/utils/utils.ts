import { GetData } from "./get";

export interface DBImage {
  image?: any
  product_id: number
}

export interface DBproduct {
  id: number,
  name: string
  description: string
  price: string,
  productcategory_id: number,
  position: number,
  image?: string
  imageLoaded?: boolean
}

export interface DBcategory {
  name: string
  id: number,
  position: number,
  image?: string
  imageLoaded?: boolean
}

export interface Styleconfig {
  configId: number;
  background?: {
    enabled?: boolean
    color?: string,
  },
  productImages?: {
    style?: 'Background' | 'Logo' | 'Disabled',
    placement?: 'Left' | 'Right',
  }
  categoryImages?: {
    style?: 'Background' | 'Banner' | 'Disabled'
  }
  Logo?: boolean,
  banner?: boolean,
  font?: font,
  menuBackground?: string,
  connect?: boolean,
  menuInUse?: number;
  columns: 1 | 2,
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

export const DBConnection: newApi = await GetData(`http://localhost:8080/api`).then(response => response).catch(err => err);

export const mainConfig: mainConfigInterface = await GetData(`http://localhost:8080/mainconfig`).then(response => response).catch(err => err);

export const editorvisual: boolean = false;


export const config: Styleconfig = await getConfig();



export async function getConfig(): Promise<Styleconfig> {
  let data: Styleconfig = await GetData(`http://localhost:8080/config`).then(response => response).catch(err => err)
  if (data.categoryImages == undefined)
    return {
      configId: 1,
      background: {
        enabled: false,
        color: null,
      },
      productImages: {
        style: 'Disabled',
        placement: 'Left',
      },
      categoryImages: {
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
      menuInUse: 1,
      columns: 1
    } as Styleconfig
  else return data
}


export interface newApi {
  api?: DHMConfig
  ApiConnected?: boolean,
  DatabaseConnected?: boolean
}

interface DHMConfig {
  database?: {
    uri?: string;
  }

  onslip360?: {
    base?: string;
    realm?: string;
    id?: string;
    key?: string;
  }
}

export interface location {
  name: string
  id: number
}

export interface mainConfigInterface {
  configId: number;
  selectedLocation: location
  selectedMenu: 0;
};