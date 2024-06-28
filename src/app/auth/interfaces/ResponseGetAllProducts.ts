export interface ResponseGetAllProducts {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  stock: number;
  imageUrl: string;
}
