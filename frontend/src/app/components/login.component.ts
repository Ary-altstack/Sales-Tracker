import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" routerLink="/">
      <img src="/assets/logo/logo.jpg" alt="Logo" width="40" height="40" class="me-2 rounded" />
      <span class="fw-bold fs-4">Sales Tracker</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <!-- <li class="nav-item">
          <a class="nav-link" routerLink="/login" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/register" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Register</a>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" routerLink="/add-form" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Add Car</a>
        </li> -->
      </ul>
    </div>
  </div>
</nav>

    <div class="page-background">
  <div class="auth-box">
    <div class="left-panel">
      
    </div>

   <div class="right-panel">
  <h2>{{ isRegister ? 'Register' : 'Login' }}</h2>
  <form [formGroup]="activeForm" (ngSubmit)="onSubmit()">
    
    <!-- Register fields -->
    <div *ngIf="isRegister">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" formControlName="firstName" placeholder="Enter first name" />
        <small *ngIf="activeForm.get('firstName')?.invalid && activeForm.get('firstName')?.touched">
          First Name is required
        </small>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" formControlName="lastName" placeholder="Enter last name" />
        <small *ngIf="activeForm.get('lastName')?.invalid && activeForm.get('lastName')?.touched">
          Last Name is required
        </small>
      </div>
    </div>

    <!-- Common fields (email and password) -->
    <div class="form-group">
      <label>Email</label>
      <input type="email" formControlName="email" placeholder="Enter email" />
      <small *ngIf="activeForm.get('email')?.invalid && activeForm.get('email')?.touched">
        Valid email is required
      </small>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" formControlName="password" placeholder="Enter password" />
      <small *ngIf="activeForm.get('password')?.invalid && activeForm.get('password')?.touched">
        Password must be at least 10 characters
      </small>
    </div>

    <!-- Register-only contactNo -->
    <div class="form-group" *ngIf="isRegister">
      <label>Contact No</label>
      <input type="text" formControlName="contactNo" placeholder="Enter contact number" />
      <small *ngIf="activeForm.get('contactNo')?.invalid && activeForm.get('contactNo')?.touched">
        Contact number must be 10 digits
      </small>
    </div>

    <button type="submit" [disabled]="activeForm.invalid || isSubmitting">
      {{ isSubmitting ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login') }}
    </button>
  </form>

  <button class="toggle-btn" (click)="toggleForm()" style="margin-top: 1rem; background:none; border:none; color:#007bff; cursor:pointer;">
    {{ isRegister ? 'Already have an account? Login' : "Don't have an account? Register" }}
  </button>
</div>

  </div>
</div>

  `,
  styles: [`
  .navbar-nav .nav-link {
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #ffc107; /* Bootstrap’s warning color (gold/yellow) */
}

.navbar-brand:hover {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

    .page-background {
      background-color: #e0f2ff;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .auth-box {
      display: flex;
      background: white;
      border-radius: 12px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      max-width: 1000px;
      width: 100%;
      height: 700px;
    }

    .left-panel {
      flex: 1.2;
      background-image: url('https://images.pexels.com/photos/17060271/pexels-photo-17060271.jpeg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 2rem;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .left-panel h1 {
      font-size: 2.4rem;
      font-weight: bold;
      margin-bottom: 0.8rem;
    }

    .left-panel p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 250px;
    }

    .left-panel button {
      padding: 0.6rem 1.4rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.8);
      color: #0056b3;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .left-panel button:hover {
      background-color: white;
    }

    .right-panel {
      flex: 1;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .right-panel h2 {
      font-size: 1.8rem;
      color: #0056b3;
      text-align: center;
      margin-bottom: 2rem;
    }

    form {
      width: 100%;
      max-width: 320px;
      margin: auto;
    }

    .form-group {
      margin-bottom: 1.3rem;
    }

    label {
      font-weight: 600;
      display: block;
      margin-bottom: 0.4rem;
      color: #333;
    }

    input {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
    }

    small {
      color: #dc3545;
      font-size: 0.85rem;
    }

    .error-msg {
      color: #dc3545;
      text-align: center;
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      padding: 0.7rem;
      background-color: #007bff;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #a3cfff;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .auth-box {
        flex-direction: column;
        height: auto;
      }

      .left-panel, .right-panel {
        width: 100%;
        height: auto;
      }

      .left-panel {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComp implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegister = false;
  error = '';
  isSubmitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      contactNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  get activeForm(): FormGroup {
    return this.isRegister ? this.registerForm : this.loginForm;
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.activeForm.reset();
  }

  onSubmit() {
    if (this.activeForm.invalid) return;

    this.isSubmitting = true;
    this.error = '';

    if (this.isRegister) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          // Optionally auto-login or redirect after register
          this.isSubmitting = false;
          this.isRegister = false;
          this.loginForm.reset();
        },
        error: (err) => {
          this.error = err.error?.message || 'Registration failed.';
          this.isSubmitting = false;
        },
      });
    } else {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('token', res.token);
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed. Please check your credentials.';
          this.isSubmitting = false;
        },
      });
    }
  }
}
