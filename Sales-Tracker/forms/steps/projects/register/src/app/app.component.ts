import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}} </h1>

  <router-outlet>  <router-outlet />
  <hr />

  `,
  standalone: false,
  styles: []
})

export class AppComponent{
  title = 'Register Forms'
}