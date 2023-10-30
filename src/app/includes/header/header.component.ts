import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../model/data-type';
import { style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuType: string = 'default'
  sellerName:string ='';
  searchResult: undefined | product[];
  userName:string="";
  cartItem=0;
  show=false;

  constructor(private _router:Router,private _productService:ProductService) {}

  ngOnInit() {
    this._router.events.subscribe((val:any) => {
      if(val.url) {
        if(sessionStorage.getItem('seller') && val.url.includes('seller')){
          // console.log('in seller area');
          this.menuType = 'seller'
            let sellerStore = sessionStorage.getItem('seller');
            // console.log(sellerStore);
            let sellerData = sellerStore && JSON.parse(sellerStore);
            // console.log(sellerData);
            this.sellerName = sellerData.name;
        }
        else if(sessionStorage.getItem('user')) {
          let userStore = sessionStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this._productService.getCartList(userData.id)
        }
        else {
          // console.log('outside seller');
          this.menuType = 'default'
        }
      }
    })
    let cartData = sessionStorage.getItem('localCart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length
    }

    this._productService.cartData.subscribe((item) => {
      this.cartItem=item.length
    })
  }

  logout() {
    sessionStorage.removeItem('seller');
    this._router.navigate(['/'])
  }

  userLogout() {
    sessionStorage.removeItem('user');
    this._router.navigate(['/user-auth']);
    this._productService.cartData.emit([])
  }

  searchProduct(query:KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      this._productService.searchProducts(element.value).subscribe((res) => {
        // console.log(res);
        if(res.length>5) {
          res.length = 5;
        }
        this.searchResult = res
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val:string) {
    // console.log(val);
    this._router.navigate([`search/${val}`]);
  }

  redirectToDetails(id:number) {
    this._router.navigate(['/details/'+id])
  }

  opentoggle() {
    this.show = !this.show;
  }  
}
