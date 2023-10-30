import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { SignUp, cart, login, product } from 'src/app/includes/model/data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  
  showLogin : boolean= true;
  authError:string="";
  constructor(private _userService:UserService,private _productService:ProductService) {}

  ngOnInit(): void {
    this._userService.userAuthReload()
  }

  signUp(data:SignUp) {
    // console.log(data);
    this._userService.userSignUp(data)
  }

  login(data:login) {
    // console.log(data);
    this._userService.userLogin(data);
    this._userService.invalidUserAuth.subscribe((res)=>{
      // console.log('apple',res);
      if(res) {
        this.authError = "Please enter valid user details";
      } else {
        this.localCartToRemoteCart()
      }
    })
  }

  changeForm() {
    this.showLogin = !this.showLogin;
  }

  localCartToRemoteCart() {
    let data = sessionStorage.getItem('localCart');
    let user = sessionStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data)
      cartDataList.forEach((product:product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId,
          selected: undefined,
        };
        console.log(cartData);
        delete cartData.id;
        setTimeout(() => {
          this._productService.addToCart(cartData).subscribe((res) => {
          if(res) {
            console.log('Item stored in DB');
          }
        })
        }, 500);
        if(cartDataList.length === index+1){
          sessionStorage.removeItem('localCart');
        }
      })
    }
    setTimeout(() => {
      this._productService.getCartList(userId);
    }, 2000);
  }

}
