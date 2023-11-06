import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product, cart, order } from '../shared/model/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private _http:HttpClient) { }

  addProduct(data:product) {
    return this._http.post('http://localhost:3000/products',data)
  }
  productList(sellerId:number) {
    return this._http.get<product[]>(`http://localhost:3000/products?sellerId=${sellerId}`)
  }
  deleteProduct(id:number) {
    return this._http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string) {
    return this._http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProudct(product:product) {
    // console.log(product.id);
    return this._http.put(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProudcts() {
    return this._http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  trendyProducts() {
    return this._http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  shopProducts() {
    return this._http.get<product[]>('http://localhost:3000/shop?_limit=3');
  }

  searchProducts(query:string) {
    return this._http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  shopByCategory(category:string) {
    return this._http.get<product[]>(`http://localhost:3000/products?category=${category}`)
  }

  localAddToCart(data:product) {
    let cartData = [];
    let localCart = sessionStorage.getItem('localCart');
    if(!localCart) {
      sessionStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData=JSON.parse(localCart);
      cartData.push(data)
      sessionStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeitemFromCart(productId:number) {
    let cartData = sessionStorage.getItem('localCart');
    if(cartData) {
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product) => productId!==item.id);
      console.log(items);
      sessionStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(carData:cart) {
    return this._http.post('http://localhost:3000/cart',carData);
  }

  getCartList(userId:number) {
    return this._http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'})
    .subscribe((res) => {
      // console.log(res);
      if(res && res.body) {
        this.cartData.emit(res.body);
      }
    })
  }

  removeToCart(cartId:number) {
    return this._http.delete('http://localhost:3000/cart/'+cartId);
  }

  currentCart() {
    let userStore = sessionStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this._http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }

  checkCartProduct(id:number | undefined){
    return this._http.get(`http://localhost:3000/cart/${id}`)
  }

  // ------selected orders------
  selectedOrder(data:any) {
    // console.log(product.id);
    data.date = new Date;
    console.log(data);
    return this._http.put(`http://localhost:3000/cart/${data.id}`,data)
  }

  orderNow(data:order) {
    return this._http.post('http://localhost:3000/orders',data)
  }

  orderList() {
    let userStore = sessionStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this._http.get<order[]>('http://localhost:3000/orders?=userId'+userData.id)
  }

  deleteCartitems(cartId:number) {
    return this._http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'})
    .subscribe((res) => {
      if(res) {
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId:number) {
    return this._http.delete('http://localhost:3000/orders/'+orderId)
  }
}
