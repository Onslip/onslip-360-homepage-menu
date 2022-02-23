export interface productsWithCategory {
  category: {
    name: string;
  };
  products: {
    name: string;
    price: string;
    description: string;
    image: any;
  }[];
}
export interface DBproduct {
  name: string;
  description: string;
  price: string;
  image: any;
}
export interface DBcategory {
  name: string;
}
export interface Colorconfig {
  backgroundcolor: string;
}
export interface Banner {
  image: string;
}
