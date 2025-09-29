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
    name:string;
    price:number;
    category:string;
    color:string;
    description:string;
    image:string;
}