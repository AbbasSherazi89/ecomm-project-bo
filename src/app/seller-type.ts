export interface sellerType {
  name: string;
  email: string;
  password: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface product {
  id: string;
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
  producId: undefined | string;
}

export interface cart {
  id?: string;
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
  producId: string;
  userId: string;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  deliveryCharges: number;
  total: number;
}

export interface orderData{
  email:string,
  address:string,
  contact:number,
  totalPrice:number,
  userId:string
}