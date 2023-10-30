import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../includes/model/data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  public displayColumns : string[] = ['image','name','price','color','category','description','action']
  public dataSource : product[] = [];
  productMessage: undefined | string;

  
  constructor(private _product:ProductService) {
  }
  
  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id:number) {
    // console.log('test id :',id);
    this._product.deleteProduct(id).subscribe(res=> {
      if(res) {
        this.productMessage ='Product is deleted';
        this.list()
      }
    })

    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
  }


  list() {
    let seller = sessionStorage.getItem('seller');
    let sellerId = seller && JSON.parse(seller).id;
    this._product.productList(sellerId).subscribe(res => {
      // console.log(res);
      this.productList = res;
      this.dataSource = res;
    })
  }
}
