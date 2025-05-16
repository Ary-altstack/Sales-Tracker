import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormComp } from './components/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/loginForm.component';
import { AddCarSalesComponent } from './components/addForm.component'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,ReactiveFormComp,LoginComponent,AddCarSalesComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,RouterModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
