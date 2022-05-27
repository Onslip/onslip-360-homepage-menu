import { GetData } from "./get";

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
  [1, 'clamp(10px, 2vw, 10px)'], [2, 'clamp(10px, 2.5vw, 15px)'], [3, 'clamp(10px, 3vw, 20px)'], [4, 'clamp(10px, 3.5vw, 25px)'], [5, 'clamp(10px, 4vw, 30px)']
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

export const DBConnection: newApi = await GetData(`http://localhost:8080/api`).then(response => response).catch(err => err);

export const mainConfig: mainConfigInterface = await GetData(`http://localhost:8080/mainconfig`).then(response => response).catch(err => err);

export const editorvisual: boolean = false;


export const config: Styleconfig = await getConfig();

async function getConfig(): Promise<Styleconfig> {
  let data: Styleconfig = await GetData(`http://localhost:8080/config`)
    .then(response => response)
    .catch(() => {
      return ({
        configId: 1,
        background: {
          enabled: true,
          color: 'white',
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
          customFonts: [],
          fontFamily: 'sans-serif',
          fontWeight: false,
          fontStyle: false,
          fontSize: [
            3,
            "clamp(10px, 3vw, 20px)"
          ],
          fontOutline: false,
          colors: {
            categoryTitle: 'black',
            productName: 'black',
            productPrice: 'black',
            productDesc: 'black',
          }
        },
        menuBackground: 'white',
        connect: false,
        menuInUse: 1,
        menuType: 'inline'
      })
    })
  return data
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