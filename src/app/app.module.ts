import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './home/search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ShopComponent } from './shop/shop.component';
import { DiscountComponent } from './home/discount/discount.component';
import { RelatedProductsComponent } from './product-details/related-products/related-products.component';
import { AddedProductComponent } from './product-details/added-product/added-product.component';
import { AddProductSnackComponent } from './cart-page/add-product-snack/add-product-snack.component';
import { MenubarComponent } from './home/menubar/menubar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ProductDetailsComponent,
    ShopComponent,
    DiscountComponent,
    RelatedProductsComponent,
    AddedProductComponent,
    AddProductSnackComponent,
    MenubarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
