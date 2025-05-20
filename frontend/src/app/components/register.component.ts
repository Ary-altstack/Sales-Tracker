import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  standalone: false,
  template: `
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">Car Sales App</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/register">Register</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/add-form">Add Car</a></li>
        </ul>
      </div>
    </div>
  
    <div class="container mt-5">
      <h2>Register Form</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input id="firstName" class="form-control" formControlName="firstName" />
          <span class="text-danger" *ngIf="userForm.get('firstName')?.invalid && userForm.get('firstName')?.touched">
            First Name is required
          </span>
        </div>

        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input id="lastName" class="form-control" formControlName="lastName" />
          <span class="text-danger" *ngIf="userForm.get('lastName')?.invalid && userForm.get('lastName')?.touched">
            Last Name is required
          </span>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" class="form-control" formControlName="email" />
          <span class="text-danger" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
            Valid email is required
          </span>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control" formControlName="password" />
          <span class="text-danger" *ngIf="userForm.get('password')?.invalid && userForm.get('password')?.touched">
            Password must be at least 10 characters
          </span>
        </div>

        <div class="mb-3">
          <label for="contactNo" class="form-label">Contact No</label>
          <input id="contactNo" class="form-control" formControlName="contactNo" />
          <span class="text-danger" *ngIf="userForm.get('contactNo')?.invalid && userForm.get('contactNo')?.touched">
            Contact number must be 10 digits
          </span>
        </div>

        <!-- Error and Success messages -->
        <div *ngIf="error" class="text-danger mb-3">{{ error }}</div>
        <div *ngIf="success" class="alert alert-success mb-3">{{ success }}</div>

        <!-- Submit button -->
        <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid || isSubmitting">
          {{ isSubmitting ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid.ng-touched {
      border: 2px solid crimson;
    }
    input.ng-valid.ng-touched {
      border: 2px solid darkseagreen;
    }
  `]
})
export class RegisterComp implements OnInit {
  userForm!: FormGroup;
  error: string = '';
  success: string = '';
  isSubmitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', [Validators.required, Validators.pattern('.+@.+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ])
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
       console.log('Submitting:', this.userForm.value);  // Debug
      this.auth.register(this.userForm.value).subscribe({       
        next: (res) => {
           console.log('Response:', res); 
          this.success = res.message || 'Registration successful!';
          this.error = '';
          this.userForm.reset();
          this.isSubmitting = false;
          setTimeout(() => this.router.navigate(['/login']), 2500);
        },
        error: (err) => {
          console.error('Error:', err); 
          this.success = '';
          this.error = err.error?.error || 'Registration failed';
          this.isSubmitting = false;
        },
      });
    }
  }
}
