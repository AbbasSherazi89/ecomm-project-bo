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
  producId:undefined | string;
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
