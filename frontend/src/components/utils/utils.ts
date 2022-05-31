import { GetData } from "./get";
import { paths } from "./urlPaths";

export interface DBImage {
  image?: any
  product_id: number
}

export interface DBCatImage {
  image: any,
  category_id: number
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
  menuType: 'card' | 'inline' | 'paper';
}

interface font {
  customFonts?: {
    names: string[]
    fontUrl: string
  }[];
  fontFamily?: string,
  fontWeight?: boolean;
  fontStyle?: boolean;
  fontSize?: [number, string];
  fontOutline?: boolean;
  colors?: {
    categoryTitle?: string;
    productName?: string;
    productPrice?: string;
    productDesc?: string;
  }
}

export const fontSize: [number, string][] = [
  [1, 'clamp(1rem, 0.8vw, 1vh)'], [2, 'clamp(1.2rem, 1vw, 1.2vh)'], [3, 'clamp(1.4rem, 1.2vw, 1.4vh)'], [4, 'clamp(1.6rem, 1.4vw, 1.6vh)'], [5, 'clamp(1.8rem, 1.6vw, 1.8vh)']
]

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

export const DBConnection: newApi = await GetData(paths.api).then(response => response).catch(err => err);

export const mainConfig: mainConfigInterface = await GetData(paths.mainConfig).then(response => response).catch(err => err);

export const editorvisual: boolean = false;

export const config: Styleconfig = await getConfig();

async function getConfig(): Promise<Styleconfig> {
  return await GetData(paths.config)
    .then(response => response)
    .catch(err => (console.log(err)))
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

export interface locationsAndMenu {
  menu: Menu[]
  location: location[]
}



export interface mainConfigInterface {
  configId: number;
  selectedLocation: location;
  selectedMenu: number;
};

export interface Timetable {
  locationId: number,
  days: days[]
}

export interface days {
  Day: number,
  Times?: times[]
}

export interface times {
  time: number,
  menuid?: number
}