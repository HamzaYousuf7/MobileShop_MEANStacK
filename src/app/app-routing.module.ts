import { AdminPanelUpdateProdComponent } from './Admin/admin-panel-update-prod/admin-panel-update-prod.component';
import { AdminPanelShowComponent } from './Admin/admin-panel-show/admin-panel-show.component';
import { AdminPanelAddNewProComponent } from './Admin/admin-panel-add-new-pro/admin-panel-add-new-pro.component';
import { UserLogOrSingComponent } from './user-log-or-sing/user-log-or-sing.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsComponent } from './products/products.component';
import { MoreStuffComponent } from './components/more-stuff/more-stuff.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

//Defining all the path
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'productDetails/:productID', component: ProductDetailsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'userCart', component: UserCartComponent },
  { path: 'userLogOrSing', component: UserLogOrSingComponent },
  { path: 'moreStuff', component: MoreStuffComponent },
  { path: 'admin/showAllProducts', component: AdminPanelShowComponent }, //!admin route start
  { path: 'admin/addNewProduct', component: AdminPanelAddNewProComponent },
  { path: 'admin/updateProduct/:productID', component: AdminPanelUpdateProdComponent },
  { path: '**', component: PageNotFoundComponent }, //!404 route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
