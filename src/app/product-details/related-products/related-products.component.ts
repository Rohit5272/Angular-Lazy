import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/shared/model/data-type';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit{
  @Input() childProducts:product[] = [];
  
  ngOnInit(): void {
    console.log(this.childProducts);
  }

}
