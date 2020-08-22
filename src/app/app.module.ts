import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MoreStuffComponent } from './components/more-stuff/more-stuff.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserLogOrSingComponent } from './user-log-or-sing/user-log-or-sing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BackdropComponent } from './components/UI/backdrop/backdrop.component';
import { ModalComponent } from './components/UI/modal/modal.component';
import { SpinnerComponent } from './components/UI/spinner/spinner.component';
import { AdminPanelShowComponent } from './Admin/admin-panel-show/admin-panel-show.component';
import { AdminPanelAddNewProComponent } from './Admin/admin-panel-add-new-pro/admin-panel-add-new-pro.component';
import { AdminPanelUpdateProdComponent } from './Admin/admin-panel-update-prod/admin-panel-update-prod.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    MoreStuffComponent,
    ProductsComponent,
    ContactUsComponent,
    UserCartComponent,
    UserLogOrSingComponent,
    ProductDetailsComponent,
    PaginationComponent,
    BackdropComponent,
    ModalComponent,
    SpinnerComponent,
    AdminPanelShowComponent,
    AdminPanelAddNewProComponent,
    AdminPanelUpdateProdComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
