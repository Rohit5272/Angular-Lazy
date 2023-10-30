import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cart, order, profile } from '../../includes/model/data-type';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  totalPrice: number | undefined;
  cartData:cart[] | undefined;
  orderMsg:string | undefined;
  orderProduct:cart[] = [];
  profileData:profile | undefined
  length:number=0;

  constructor(private _productService:ProductService,private _router:Router,
    private _userService:UserService) {}

  ngOnInit(): void {
    this._productService.currentCart().subscribe((res)=>{
      let price = 0;
      this.orderProduct = res.filter((item) => item.selected);
      // this.orderProduct = data;
      this.length = this.orderProduct.length;
      res.forEach((item) => {
        if(item.quantity && item.selected) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price/10) + 100-(price/10)
    })
    // ---profile data----
    let user = sessionStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this._userService.getProfiles(userId).subscribe((res) => {
      console.log(res);
      if(Array.isArray(res)){
        this.profileData = res[0]
        console.log(this.profileData);
      }
    })
  }

  orderNow(data:{email:string,address:string,contact:string}) {
    let user = sessionStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice) {
      let orderData:any = {
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        date:new Date,
        products: this.orderProduct,
        id: undefined
      }
      orderData.products?.forEach((item: { id: any; }) => {
        delete item.id
      })

      this._productService.orderNow(orderData).subscribe((res) => {
        if(res) {
          this.orderMsg = 'Your Order has been placed'
          setTimeout(() => {
            this._router.navigate(['my-orders']);
            this.orderMsg = undefined
          }, 4000);
        }
      })
    }
  }
}
