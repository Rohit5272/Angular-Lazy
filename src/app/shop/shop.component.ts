import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../shared/model/data-type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  
  shopData:product[] = [];

  constructor(private _route:ActivatedRoute,private _product:ProductService) {}
  
  ngOnInit(): void {
    let productCategory = this._route.snapshot.paramMap.get('category');
    console.log(productCategory);
    productCategory && this._product.shopByCategory(productCategory).subscribe((res) => {
      console.log(res);
      this.shopData = res;
    })
  }

}
