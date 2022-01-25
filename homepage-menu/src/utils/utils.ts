export interface productsWithCategory {
  category: {
    name: string
  }
  products: {
    name: string,
    price: string,
    description: string
  }[]
}
export interface DBproduct {
  name: string
  description: string
  price: string
}

export interface DBcategory {
  name: string
}
