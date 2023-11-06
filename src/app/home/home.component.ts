import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../shared/model/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  popularProduct:undefined | product[];
  trendyProducts:undefined | product[];
  shopProducts:undefined | any;
  num: number | undefined;

  constructor(private _productService:ProductService) {}
  ngOnInit(): void {
    this._productService.popularProudcts().subscribe((data) => {
      // console.log(data);
      this.popularProduct = data
    });
    this._productService.trendyProducts().subscribe(data => {
      this.trendyProducts = data
    });
    this._productService.shopProducts().subscribe(data => {
      this.shopProducts = data;
    });
  }

  searchCategory(category:string) {
    this._productService.shopByCategory(category).subscribe((res) => {
      // console.log(res);
      this.num = res.length;
    })
  }


}
