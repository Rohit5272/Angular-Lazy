import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string | undefined;
  constructor(private _product:ProductService,private fb:FormBuilder) {}

  addProductForm:FormGroup = this.fb.group({
    name:[''],
    price:[''],
    color:[''],
    category:[''],
    description:[''],
    image:['']
  })

  submit() {
    // console.log(data);
    let data = this.addProductForm.value;
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
