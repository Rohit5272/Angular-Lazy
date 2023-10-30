import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { order } from '../../includes/model/data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  orderData: order[] | undefined;

  constructor(private _productService:ProductService) {}
  
  ngOnInit(): void {
    this.getOrderList()
  }

  getOrderList() {
    this._productService.orderList().subscribe((res) => {
      this.orderData = res
      console.log(res);
    })
  }

  cancelOrder(orderId:number | undefined) {
    orderId && this._productService.cancelOrder(orderId)
    .subscribe((res) => {
      this.getOrderList()
    })
  }

}
