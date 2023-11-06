import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from 'src/app/shared/model/data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult : product[] = [];
  
  constructor(private _activeRoute:ActivatedRoute,private _productService:ProductService) {}
  
  ngOnInit(): void {
    let query = this._activeRoute.snapshot.paramMap.get('query');
    // console.log(query);
    query && this._productService.searchProducts(query).subscribe(res => {
      this.searchResult = res
    })
  }

}
