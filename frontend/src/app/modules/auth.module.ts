import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LoginComp } from '../components/login.component';
import { RegisterComp } from '../components/register.component';

@NgModule({
  declarations: [
    LoginComp,       
    RegisterComp     
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComp },
      { path: 'register', component: RegisterComp }
    ])
  ],
  exports: [
    LoginComp,       
    RegisterComp     
  ]
})
export class AuthModule {}