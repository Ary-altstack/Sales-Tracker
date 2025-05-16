import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: false,
  template: `
    <div class="container mt-5">
      <h2>Login Form</h2>
      <form [formGroup]="loginForm">

      
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" class="form-control" formControlName="email" />
          <span class="text-danger" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            Valid email is required
          </span>
        </div>

       
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control" formControlName="password" />
          <span class="text-danger" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password is required (min 10 characters)
          </span>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
      </form>
    </div>
  `,
  styles: [`
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1470&q=80') no-repeat center center fixed;
      background-size: cover;
    }
  
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -1;
    }
  
    .container {
      max-width: 420px;
      margin: 5vh auto;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #222;
      font-size: 1.8rem;
    }
  
    .form-label {
      font-weight: 600;
      color: #444;
      margin-bottom: 0.5rem;
      display: block;
    }
  
    .form-control {
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-size: 1rem;
    }
  
    .form-control:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
      outline: none;
    }
  
    .text-danger {
      font-size: 0.85rem;
      color: #dc3545;
      margin-top: 0.25rem;
    }
  
    button.btn {
      width: 100%;
      padding: 0.65rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      background-color: #007bff;
      color: white;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      margin-top: 1rem;
    }
  
    button.btn:hover {
      background-color: #0056b3;
    }
  
    button.btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  
    input.ng-invalid.ng-touched {
      border-color: #dc3545;
    }
  
    input.ng-valid.ng-touched {
      border-color: #28a745;
    }
  `]
  
})
export class LoginComponent implements OnInit {
  loginForm: any;


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('.+@.+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

}
