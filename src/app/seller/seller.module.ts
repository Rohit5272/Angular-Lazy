import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    SellerAddProductComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerUpdateProductComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ]
})
export class SellerModule { }
