export interface ResponsePurchaseInfo {//boleta
  Id: number;
  Purchase_Date: Date;
  ProductId: number;
  ProductName: string;
  ProductType: string;
  ProductPrice: number;
  Quantity: number;
  TotalPrice: number;
}