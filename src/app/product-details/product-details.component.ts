import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../includes/model/data-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddedProductComponent } from './added-product/added-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productData : undefined | product;
  productQuantity:number = 1;
  removeCart=false;
  cartData:product | undefined;
  relatedProducts:product[] = [];
  durationInSeconds = 1;

  constructor(private _snackBar: MatSnackBar,private _activeRoute:ActivatedRoute,private _productService:ProductService,
    private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateProductDetails();
      }
    });
  }
  
  ngOnInit(): void {
    this.updateProductDetails()
  }


  updateProductDetails(){
    let productId = this._activeRoute.snapshot.paramMap.get('productId');
    productId && this._productService.getProduct(productId).subscribe((res) => {
      // console.log(res);
      this.productData = res;
      // console.log(this.productData);

      // checking url product id and localcartid for button remove/add cart
      let cartData = sessionStorage.getItem('localCart');
      if(productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=> productId == item.id.toString())
        if(items.length){
          this.removeCart = true;
        } else {
          this.removeCart=false;
        }
      }

      // -----related products-------
      this._productService.shopByCategory(this.productData.category)
      .subscribe((res)=>{
        this.relatedProducts = res;
        console.log(this.relatedProducts);
      })
      
      let user = sessionStorage.getItem('user');
      if(user) {
        let userId = user && JSON.parse(user).id;
        this._productService.getCartList(userId);
        this._productService.cartData.subscribe((res) => {
          let item = res.filter((item:product)=>productId?.toString()===item.productId?.toString());
          // console.log(item);
          if(item.length) {
            this.cartData=item[0];
            // console.log(this.cartData);
            this.removeCart = true;
          }
        })
      }
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AddedProductComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  AddToCart() {
    if(this.productData) {
      this.openSnackBar()
      this.productData.quantity = this.productQuantity;
      if(!sessionStorage.getItem('user')) {
        // console.log(this.productData);
        this._productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // console.log('user logged in');
        let user = sessionStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData:cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id,
          selected: false
        }
        delete cartData.id;
        // console.log(cartData);
        this._productService.addToCart(cartData).subscribe((res) => {
          if(res) {
            this._productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId:number) {
    if(!sessionStorage.getItem('user')) {
      this._productService.removeitemFromCart(productId);
    } else {
      let user = sessionStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      // console.log(this.cartData);
      this.cartData && this._productService.removeToCart(this.cartData.id)
      .subscribe((res) => {
        this._productService.getCartList(userId);
      })
    }
    this.removeCart = false;
  }
}
