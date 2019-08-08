import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { AuthGuardGuard } from './shared/guards/auth-guard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DistributorComponent } from './components/distributor/distributor.component';
import { LoginGuardGuard } from './shared/guards/login-guard.guard';
import { UserProductViewComponent } from './components/user-product-view/user-product-view.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent, canActivate: [LoginGuardGuard] },
  { path: "product", component: ProductComponent, canActivate: [AuthGuardGuard] },
  { path: "distributor", component: DistributorComponent, canActivate: [AuthGuardGuard] },
  { path: "products", component: UserProductViewComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
