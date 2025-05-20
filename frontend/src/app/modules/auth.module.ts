import { NgModule } from '@angular/core';
import { LoginComp } from '../components/login.component';
import { RegisterComp } from '../components/register.component';
import { AddSaleComponent } from '../components/add-sale.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComp, RegisterComp,AddSaleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComp },
      { path: 'register', component: RegisterComp },
      { path: 'addSales', component: AddSaleComponent }
    ]),
  ],
  exports: [LoginComp, RegisterComp, AddSaleComponent],
})
export class AuthModule {}
