import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cart, order, profile } from '../../includes/model/data-type';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  pId: string =""
  totalPrice: number =0;
  cartData:cart[] | undefined;
  orderMsg:string | undefined;
  orderProduct:cart[] = [];
  profileData:profile | undefined
  length:number=0;

  constructor(private _productService:ProductService,private _router:Router,
  private _userService:UserService,private fb:FormBuilder) {}

  orderForm: FormGroup = this.fb.group({
    name:[''],
    email:[''],
    address:[''],
    contact:['']
  })

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
      // console.log(res);
      if(Array.isArray(res)){
        this.profileData = res[0]
        // console.log(this.profileData);

        this.orderForm.patchValue({
          name:this.profileData?.fname,
          email:this.profileData?.email,
          address:this.profileData?.address1,
          contact:this.profileData?.mobile
        })
      }
    })
  }

  payNow(orderFormData: any){
    console.log('hello');
    const RazorpayOptions = {
      description:'Sample Razorpay demo',
      currency:'INR',
      amount: this.totalPrice * 100,
      name:orderFormData.name,
      key:'rzp_test_9TtROtl0eC1mcM',
      image:'https://yt3.googleusercontent.com/07PIDLZbBZRwRnaNnJBElu1waRQlLDL9k00q8UzYLufRTqDJhIbQzkjP1VR5axyxdz6PEld_Mwk=s900-c-k-c0x00ffffff-no-rj',
      prefill: {
        name:orderFormData.name,
        email:orderFormData.email,
        phone:orderFormData.mobile
      },
      theme:{
        color:'#6466e3'
      },
      modal: {
        condismiss: () => {
          console.log('dismissed');
        }
      }
    }

    const successCallback = (paymentid:any) => {
      console.log(paymentid);
    }

    const failureCallback = (e:any) => {
      console.log(e);
    }

    Razorpay.open(RazorpayOptions,successCallback,failureCallback);
  }

  orderNow() {
    let user = sessionStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice) {
      let orderData:any = {
        ...this.orderForm.value,
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
            this._router.navigate(['user/my-orders']);
            this.orderMsg = undefined;
          }, 3000);
        }
      })
    }
  }
}
