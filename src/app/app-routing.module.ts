import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'shop/:category',component:ShopComponent},
  {path:'sell',
  loadChildren: () => import('./seller/seller.module').then(m =>m.SellerModule)
  },
  {path:'user',
  loadChildren: () => import('./user/user.module').then(m =>m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
