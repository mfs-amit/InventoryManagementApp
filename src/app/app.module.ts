import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsInterceptorService } from './shared/interceptors/https-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './components/alert/alert.component';
import { UserProductDetailComponent } from './components/user-product-detail/user-product-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { DistributorComponent } from './components/distributor/distributor.component';
import { DistributorListComponent } from './components/distributor-list/distributor-list.component';
import { DistributorDetailsComponent } from './components/distributor-details/distributor-details.component';
import { UserProductViewComponent } from './components/user-product-view/user-product-view.component';
import { ProductAttributesComponent } from './components/product-attributes/product-attributes.component';
import { ProductDistributorsComponent } from './components/product-distributors/product-distributors.component';
import { UserProductOverviewComponent } from './components/user-product-overview/user-product-overview.component';
import { UserProductInformationComponent } from './components/user-product-information/user-product-information.component';
import { UserProductDistributorsComponent } from './components/user-product-distributors/user-product-distributors.component';
import { UserProductRatingComponent } from './components/user-product-rating/user-product-rating.component';

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
    UserProductRatingComponent
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule
  ],
  entryComponents: [AlertComponent, UserProductDetailComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
