export interface Products {
    id: number;
    name: string;
    price: number;
    stock: number;
    imgUrl: string;
    productType:ProductType;
}
export interface ProductType{
    id: number;
    type: string;
}
