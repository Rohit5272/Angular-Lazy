import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../../includes/model/data-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  showLogin = true;
  authError:string=''

  constructor(private _seller:SellerService,private _router:Router,
  private fb:FormBuilder) {}

  ngOnInit(): void {
    this._seller.reloadSeller();
  }

  signUpForm:FormGroup = this.fb.group({
    name:['',Validators.required],
    email:['',Validators.required,Validators.email],
    password:['',Validators.required]
  })

  loginForm:FormGroup = this.fb.group({
    email:['',Validators.required,Validators.email],
    password:['',Validators.required]
  })

  signUp():void {
    this._seller.userSignUp(this.signUpForm.value)
  }
  login():void {
    this.authError=""
    // console.log(this.loginForm.value);
    this._seller.userLogin(this.loginForm.value)
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
