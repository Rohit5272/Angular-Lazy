import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './home/search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FooterComponent } from './includes/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ShopComponent } from './shop/shop.component';
import { DiscountComponent } from './home/discount/discount.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { RelatedProductsComponent } from './product-details/related-products/related-products.component';
import { AddedProductComponent } from './product-details/added-product/added-product.component';
import { AddProductSnackComponent } from './cart-page/add-product-snack/add-product-snack.component';
import { NotFoundComponent } from './includes/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    ProductDetailsComponent,
    FooterComponent,
    ShopComponent,
    DiscountComponent,
    RelatedProductsComponent,
    AddedProductComponent,
    AddProductSnackComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    GooglePayButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
