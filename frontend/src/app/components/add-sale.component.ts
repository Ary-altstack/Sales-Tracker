import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sale',
  standalone : false,
  template: `
    <div class="card">
  <h3>Add New Car Sale</h3>
  <form [formGroup]="saleForm" (ngSubmit)="onSubmitSaleForm()" enctype="multipart/form-data">
    <label for="customerName">Customer Name</label>
    <input id="customerName" type="text" formControlName="customerName" placeholder="Customer Name" />

    <label for="customerEmail">Customer Email</label>
    <input id="customerEmail" type="email" formControlName="customerEmail" placeholder="Customer Email" />

    <label for="customerContact">Customer Contact</label>
    <input id="customerContact" type="text" formControlName="customerContact" placeholder="Customer Contact" />

    <label for="model">Car Model</label>
    <input id="model" type="text" formControlName="model" placeholder="Car Model" />

    <label for="price">Price</label>
    <input id="price" type="number" formControlName="price" placeholder="Price" />

    <label for="saleDate">Sale Date</label>
    <input id="saleDate" type="date" formControlName="saleDate" />

    <label for="type">Type</label>
    <input id="type" type="text" formControlName="type" placeholder="Type (e.g., Sedan)" />

    <label for="carImage">Car Image</label>
    <input id="carImage" type="file" (change)="onFileSelected($event)" />

    <button type="submit" [disabled]="!saleForm.valid">Submit</button>
  </form>
</div>

  `,
  styles: [`
    /* Container & background */
:host {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #EFF6FF; /* Sky Blue background */
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card style */
.card {
  background-color: #FFFFFF; /* White card */
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15); /* subtle blue shadow */
  box-sizing: border-box;
}

/* Header */
h3 {
  color: #1E40AF; /* Primary Blue */
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form labels */
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1E3A8A; /* Dark Blue */
  font-weight: 600;
  font-size: 0.95rem;
}

/* Input fields */
input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"],
input[type="file"] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1.5px solid #3B82F6; /* Light Blue border */
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #1E3A8A; /* Dark Blue text */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
input[type="file"]:focus {
  border-color: #1E40AF; /* Primary Blue on focus */
  outline: none;
  box-shadow: 0 0 6px #3B82F6;
}

/* Submit button */
button[type="submit"] {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #1E40AF; /* Primary Blue */
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #3B82F6; /* Light Blue hover */
}

button[type="submit"]:disabled {
  background-color: #94a3b8; /* Gray-blue disabled */
  cursor: not-allowed;
}

/* Error message styling (if you want to add) */
.error-msg {
  color: #DC2626; /* Red for errors */
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

/* Responsive */
@media (max-width: 640px) {
  :host {
    padding: 1rem;
  }
  
  .card {
    padding: 1rem;
  }
}

    `],
})
export class AddSaleComponent {
  saleForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSubmitting = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private saleService: AuthService, private router: Router) {
    this.saleForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerContact: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      saleDate: ['', Validators.required],
      type: ['', Validators.required],
      carImage: [null],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmitSaleForm() {
    this.isSubmitted = true;
    if (!this.saleForm.valid || !this.selectedFile) {
      alert('Form not valid or image not selected.');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('customerName', this.saleForm.value.customerName);
    formData.append('customerEmail', this.saleForm.value.customerEmail);
    formData.append('customerContact', this.saleForm.value.customerContact);
    formData.append('model', this.saleForm.value.model);
    formData.append('price', this.saleForm.value.price);
    formData.append('saleDate', this.saleForm.value.saleDate);
    formData.append('type', this.saleForm.value.type);
    formData.append('carImage', this.selectedFile);

    this.saleService.addSale(formData).subscribe({
      next: (res) => {
        alert('Sale successfully added');
        this.saleForm.reset();
        this.selectedFile = null;
        this.imagePreview = null;
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.router.navigate(['/saledetails']);
      },
      error: (err) => {
        alert('Failed to add sale');
        this.isSubmitting = false;
      },
    });
  }
}
