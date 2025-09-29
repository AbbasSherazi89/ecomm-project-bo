export interface sellerType {
    name: string;
    email: string;
    password: string;
}

export interface loginType {
    email: string;
    password: string;
}

export interface product{
    id:string;
    name:string;
    price:string;
    category:string;
    color:string;
    description:string;
    image:string;
}