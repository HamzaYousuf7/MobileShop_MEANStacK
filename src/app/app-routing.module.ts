import { UserCartComponent } from './user-cart/user-cart.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsComponent } from './products/products.component';
import { MoreStuffComponent } from './components/more-stuff/more-stuff.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Defining all the path
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'userCart', component: UserCartComponent },
  { path: 'userAccount', component: UserAccountComponent },
  { path: 'moreStuff', component: MoreStuffComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
