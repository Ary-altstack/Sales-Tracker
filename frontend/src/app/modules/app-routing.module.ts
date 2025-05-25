import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { AddSaleComponent } from '../components/add-sale.component';
import { SaleDetailsComponent } from '../components/sale-list.component';
import { LoginComp } from '../components/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../components/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'saledetails',
    component: SaleDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addSales',
    component: AddSaleComponent,
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