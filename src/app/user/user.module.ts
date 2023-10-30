import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { CartPageComponent } from '../cart-page/cart-page.component';


@NgModule({
  declarations: [
    UserAuthComponent,
    CheckoutComponent,
    MyOrdersComponent,
    ProfileComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    GooglePayButtonModule
  ]
})
export class UserModule { }
