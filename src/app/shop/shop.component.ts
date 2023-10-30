import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../includes/model/data-type';
import { ActivatedRoute } from '@angular/router';

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
