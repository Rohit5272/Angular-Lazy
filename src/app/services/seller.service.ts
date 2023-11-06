import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SignUp, login } from '../shared/model/data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private _http:HttpClient,private _router:Router) { }

  userSignUp(data:SignUp) {
    return this._http.post('http://localhost:3000/seller',data,
    { observe : 'response'})
    .subscribe(res => {
      this.isSellerLoggedIn.next(true);
      sessionStorage.setItem('seller',JSON.stringify(res.body));
      this._router.navigate(['seller-home']);
      console.log('result',res);
    })
  }

  reloadSeller() {
    if(sessionStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this._router.navigate(['sell/seller-home']);
    }
  }

  userLogin(data:login) {
    console.log(data);
    this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe: 'response'}
    ).subscribe((res:any) => {
      console.log(res);
      if(res && res.body && res.body.length) {
        console.log('User logged In');
        sessionStorage.setItem('seller',JSON.stringify(res.body[0]));
        this._router.navigate(['sell/seller-home']);
      } else {
        console.log('login failed');
        this.isLoginError.emit(true);
      }
    })
  }

}
