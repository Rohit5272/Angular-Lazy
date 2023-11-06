import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUp, login, profile } from '../shared/model/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private _http:HttpClient,private _router:Router) { }

  userSignUp(user:SignUp) {
    // console.log(user);
    this._http.post("http://localhost:3000/users",user,{observe: 'response'})
    .subscribe((res) => {
      console.log(res);
      if(res) {
        sessionStorage.setItem('user',JSON.stringify(res.body));
        this._router.navigate(['/']);
      }
    })
  }

  userLogin(data:login){
    this._http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((res) => {
      if(res && res.body?.length) {
        // console.log(res);
        sessionStorage.setItem('user',JSON.stringify(res.body[0]));
        this._router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      } else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload() {
    if(sessionStorage.getItem('user')){
      this._router.navigate(['/']);
    }
  }

  addProfile(data:profile){
    return this._http.post("http://localhost:3000/profile",data)
  }

  getProfiles(id:number){
    return this._http.get(`http://localhost:3000/profile?userId${id}`)
  }

  updateProfile(data:profile){
    return this._http.put(`http://localhost:3000/profile/${data.id}`,data)
  }

}
