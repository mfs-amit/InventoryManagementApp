import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsInterceptorService } from './shared/interceptors/https-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { DistributorComponent } from './components/distributor/distributor.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductRatingComponent } from './components/product/product-rating/product-rating.component';
import { UserProductDetailComponent } from './components/user-product-view/user-product-detail/user-product-detail.component';
import { DistributorListComponent } from './components/distributor/distributor-list/distributor-list.component';
import { DistributorDetailsComponent } from './components/distributor/distributor-details/distributor-details.component';
import { UserProductViewComponent } from './components/user-product-view/user-product-view.component';
import { ProductAttributesComponent } from './components/product/product-attributes/product-attributes.component';
import { ProductDistributorsComponent } from './components/product/product-distributors/product-distributors.component';
import { UserProductOverviewComponent } from './components/user-product-view/user-product-overview/user-product-overview.component';
import { UserProductInformationComponent } from './components/user-product-view/user-product-information/user-product-information.component';
import { UserProductDistributorsComponent } from './components/user-product-view/user-product-distributors/user-product-distributors.component';
import { UserProductRatingComponent } from './components/user-product-view/user-product-rating/user-product-rating.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductRatingComponent,
    PageNotFoundComponent,
    AlertComponent,
    UserProductDetailComponent,
    HeaderComponent,
    DistributorComponent,
    DistributorListComponent,
    DistributorDetailsComponent,
    UserProductViewComponent,
    ProductAttributesComponent,
    ProductDistributorsComponent,
    UserProductOverviewComponent,
    UserProductInformationComponent,
    UserProductDistributorsComponent,
    UserProductRatingComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({ maxOpened: 1, autoDismiss: true }),
    AppMaterialModule
  ],
  entryComponents: [AlertComponent, UserProductDetailComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
