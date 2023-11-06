import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { profile } from 'src/app/shared/model/data-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  type: string = 'profileDetails'
  profileData: profile | undefined ;
  show= true;
  msg:any

  constructor(private _userService:UserService) {}
  
  ngOnInit(): void {
    this.reload()
  }

  reload(){
    let user = sessionStorage.getItem('user');
    let userData = user && JSON.parse(user).id;
    console.log(userData);
    this._userService.getProfiles(userData).subscribe((res) => {
      console.log(res);
      if (Array.isArray(res) && res.length) {
        this.profileData = res[0]; // Assign the first object to profileData
        this.show = false;
      }
    })
  }
  
  changeToDetails() {
    this.type = 'profileDetails';
  }
  changeToForm() {
    this.type = 'profileForm';
  }

  submitProfile(data:profile){
    console.log(data);
    let user = sessionStorage.getItem('user');
    let userData = user && JSON.parse(user).id;
    data.userId = userData
    this._userService.addProfile(data).subscribe((res) => {
      console.log(res);
    })
  }

  updateUserProfile(data:any){
    let user = sessionStorage.getItem('user');
    let userData = user && JSON.parse(user).id;
    data.userId = userData
    console.log(data);
    this._userService.updateProfile(data).subscribe((res)=>{
      console.log(res);
      this.msg = "updated succesfully"
    })
    setTimeout(() => {
      this.msg = ''
      this.type='profileDetails'
      this.reload()
    }, 3000);
  }

}
