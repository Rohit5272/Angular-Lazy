import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../includes/model/data-type';

console.log("seller update product...");
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productdata:undefined | product;
  productMessage:undefined | string;
  constructor(private _route: ActivatedRoute,private product:ProductService,private _router:Router) {}
  
  ngOnInit(): void {
    let productId = this._route.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      // console.log(data);
      this.productdata = data;
    })
  }

  submit(data:product) {
    // console.log(data);
    if(this.productdata) {
      let seller = sessionStorage.getItem('seller');
      data.sellerId = seller && JSON.parse(seller).id;
      data.id = this.productdata.id
    }
    this.product.updateProudct(data).subscribe(res=>{
      if(res) {
        this.productMessage = 'Proudct has updated'
      }
    })

    setTimeout(() => {
      this.productMessage = undefined;
      this._router.navigate(['seller-home'])
    }, 3000);
  }

}
