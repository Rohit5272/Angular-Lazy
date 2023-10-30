import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../includes/model/data-type';

console.log("seller add product...");
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string | undefined;
  constructor(private _product:ProductService) {}

  submit(data:product) {
    // console.log(data);
    let seller = sessionStorage.getItem('seller');
    data.sellerId = seller && JSON.parse(seller).id;
    this._product.addProduct(data).subscribe(res => {
      // console.log(res);
      if(res) {
        this.addProductMessage="Product added successfully"
      }
      setTimeout(() => {
        this.addProductMessage=undefined
      }, 3000);
    })
  }
}
