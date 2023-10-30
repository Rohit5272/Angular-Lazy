import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../../includes/model/data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  showLogin = true;
  authError:string=''

  constructor(private _seller:SellerService,private _router:Router) {}
  ngOnInit(): void {
    this._seller.reloadSeller();
  }

  signUp(data:SignUp):void {
    this._seller.userSignUp(data)
  }
  login(data:SignUp):void {
    this.authError=""
    // console.log(data);
    this._seller.userLogin(data)
    this._seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError='Email or Password is not correct'
      }
    })
  }

  changeForm() {
    this.showLogin = !this.showLogin;
  }

}
