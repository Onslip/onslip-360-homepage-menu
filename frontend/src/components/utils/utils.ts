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
  font: string,
  preset: string
}

export enum buttonvalues {
  background = "Ändra bakgrund",
  banner = "Ändra banner",
  logo = "Ändra logga"
}

export const Fonts = ['Arial, Helvetica, sans-serif',
  'Verdana, Geneva, Tahoma, sans-serif',
  `BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
  `'Times New Roman', Times, serif`,
  `Georgia, 'Times New Roman', Times, serif`,
  `'Courier New', Courier, monospace`];

export const Presets = [
  'Preset 1', 'Preset 2', 'Preset 3'
]