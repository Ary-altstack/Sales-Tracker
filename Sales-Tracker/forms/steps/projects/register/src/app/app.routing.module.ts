import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/loginForm.component';
import { ReactiveFormComp } from './components/reactive-form.component';
import { AddCarSalesComponent } from './components/addForm.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ReactiveFormComp },
  { path: 'addcar', component: AddCarSalesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
