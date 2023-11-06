import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs';
import { product } from 'src/app/shared/model/data-type';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit{

  mobileData:product[]=[]

  constructor(private _productService:ProductService) {}
  
  ngOnInit(): void {
    this._productService.shopByCategory('mobiles')
    .subscribe((res)=>{
      console.log(res);
      this.mobileData = res
    })
  }
}
