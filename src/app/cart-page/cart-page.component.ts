import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../includes/model/data-type';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:cart[] | undefined;
  selectItems:boolean=true;
  // selectedArrayItems:any = [];

  priceSummary: priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total: 0
  }

  constructor(private _productService:ProductService,
    private _router:Router,private cd: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.loadDetails()
  }

  removeToCart(cartId:number | undefined) {
      cartId && this.cartData && this._productService.removeToCart(cartId)
      .subscribe((res) => {
        this.loadDetails()
      })
  }

  loadDetails() {
    this._productService.currentCart().subscribe((res)=>{
      console.log(res);
      this.cartData = res;
      let price = 0;
      let delevery = 0
      res.forEach((item) => {
        if(item.quantity && item.selected) {
          price = price + (+item.price * + item.quantity);
          delevery = 100;
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = delevery;
      this.priceSummary.total = price + (price/10) + this.priceSummary.delivery-(price/10)
      // console.log(this.priceSummary);
      if(!this.cartData.length) {
        this._router.navigate(['/'])
      }
    })
  }

  increase(cart:cart){
    cart.quantity && cart.quantity++
    this.checkItem(cart);
  }
  decrease(cart:cart){
    if(cart.quantity && cart.quantity>1){
      cart.quantity--;
      this.checkItem(cart);
    }
  }

  checkItem(item: cart) {
    this._productService.selectedOrder(item).subscribe(res=> {
      this.loadDetails();
    })
  }
  
  checkout() {
    this._router.navigate(['user/checkout']);
  }

}
