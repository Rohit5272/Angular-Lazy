export interface SignUp {
    name:string,
    password:string,
    email:string,
}

export interface profile {
    fname:string,
    lname:string,
    mobile:number,
    email:string,
    gender:string,
    DOB: Date,
    userId:number,
    address1:string,
    address2:string | undefined,
    city:string,
    state:string,
    id:number
}

export interface login {
    email:string,
    password: string
}
export interface product {
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity: undefined | number,
    productId: undefined | number,
    sellerId:number | undefined,
}
export interface cart {
    selected: any
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number | undefined,
    quantity: undefined | number,
    userId:number,
    productId:number,
    sellerId : number | undefined,
}
export interface priceSummary {
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order {
    name:string
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    products: cart[],
    date:Date,
    id:number
}

export interface address {
    pincode:number,
    state:string,
    address:string,
    locality:string,
    city:string
}
