import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { LoginComp } from '../components/login.component';
import { SaleDetailsComponent } from '../components/sale-list.component';
import { AddSaleComponent } from '../components/add-sale.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../components/dashboard.component').then((m) => m.DashboardComp),
    canActivate: [AuthGuard],
  },
   {
    path: 'saledetails',
    loadComponent: () =>
     SaleDetailsComponent,
    canActivate: [AuthGuard],
  },
   {
    path: 'addSales',
    loadComponent: () =>
     AddSaleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComp,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
