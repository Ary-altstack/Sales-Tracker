import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'add-car-sales',
  standalone: false,
  template: `
    <div class="container mt-5">
      <h2>Add Car Sales Form</h2>
      <form [formGroup]="carSalesForm" (ngSubmit)="onSubmit()">

      <div class="mb-3">
          <label for="customerName" class="form-label">Customer Name</label>
          <input id="customerName" class="form-control" formControlName="customerName" />
          <span class="text-danger" *ngIf="carSalesForm.get('customerName')?.invalid && carSalesForm.get('customerName')?.touched">
            Customer name is required
          </span>
        </div>
        
       
        <div class="mb-3">
          <label for="name" class="form-label">Brand Name</label>
          <input id="name" class="form-control" formControlName="name" />
          <span class="text-danger" *ngIf="carSalesForm.get('name')?.invalid && carSalesForm.get('name')?.touched">
            Brand name is required
          </span>
        </div>

       
        <div class="mb-3">
          <label for="model" class="form-label">Car Model</label>
          <input id="model" class="form-control" formControlName="model" />
          <span class="text-danger" *ngIf="carSalesForm.get('model')?.invalid && carSalesForm.get('model')?.touched">
            Car model is required
          </span>
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Car Image</label>
          <input id="image" type="file" class="form-control"  />
          <span class="text-danger" *ngIf="imageError">
            Please upload a valid image.
          </span>
        </div>

       
        <div class="mb-3">
          <label for="year" class="form-label">Car Year</label>
          <input id="year" type="number" class="form-control" formControlName="year" />
          <span class="text-danger" *ngIf="carSalesForm.get('year')?.invalid && carSalesForm.get('year')?.touched">
            Valid car year is required (e.g. 2020)
          </span>
        </div>

       
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input id="price" type="number" class="form-control" formControlName="price" />
          <span class="text-danger" *ngIf="carSalesForm.get('price')?.invalid && carSalesForm.get('price')?.touched">
            Price is required (greater than 0)
          </span>
        </div>
        
        <button type="submit" class="btn btn-primary" [disabled]="carSalesForm.invalid">Add Sales Car</button>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid.ng-touched,
    textarea.ng-invalid.ng-touched {
      border: 2px solid crimson;
    }
    input.ng-valid.ng-touched,
    textarea.ng-valid.ng-touched {
      border: 2px solid darkseagreen;
    }
  `]
})
export class AddCarSalesComponent implements OnInit {
  carSalesForm: any;
  imageError: boolean = false; 

  ngOnInit() {
    this.carSalesForm = new FormGroup({
        customerName: new FormControl('', {validators:Validators.required}),
      name: new FormControl('', {validators:Validators.required}),
      model: new FormControl('', {validators:Validators.required}),
      image: new FormControl(null, {validators:Validators.required}),
      year: new FormControl('', [Validators.required, Validators.min(1995), Validators.max(new Date().getFullYear())]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  

 
  onSubmit() {
    if (this.carSalesForm.valid) {
      console.log("Form Submitted", this.carSalesForm.value);
     
    }
  }
}
