// src/app/sale-details/sale-details.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  imports : [CommonModule],
  template: `
  <!-- Navbar at the top -->
<nav class="navbar">
     <a class="navbar-brand d-flex align-items-center" routerLink="/">
      <img src="assets/logo/logo.jpg" alt="Logo" width="40" height="40" class="me-2 rounded" />
      <span class="fw-bold fs-4">Sales Dashboard</span>
    </a>
  <ul class="nav-links">
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/addSales">Sales</a></li>
    <li><a href="/logout">Logout</a></li>
  </ul>
</nav>

<!-- Centered Grid Wrapper -->
<div class="grid-wrapper">
  <div class="card-grid">
    <div class="horizontal-sale-card" *ngFor="let sale of sales">
      <img class="card-img" [src]="'http://localhost:3000/' + sale.carImage" alt="Car Image"/>
      <div class="card-title">{{ sale.customerName }}</div>
      <div class="card-sub">{{ sale.customerEmail }}</div>
      <div class="card-sub">Model: {{ sale.model }}</div>
      <div class="card-sub">₹ {{ sale.price }}</div>
      <div class="card-sub">Type: {{ sale.type }}</div>
      <div class="card-sub">Date: {{ sale.saleDate }}</div>
      <div class="d-flex justify-content-between mt-2">
        <button class="btn btn-sm btn-danger" (click)="deleteSale(sale._id)">Delete</button>
      </div>
    </div>
  </div>
</div>

  `,
  styles : [`
  /* Navbar */
.navbar {
  background: linear-gradient(to right, #1e3a8a, #3b82f6);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links li a:hover {
  color: #e0f2fe;
}

/* Add this to your component styles */

:host {
  /* Full viewport height */
  display: block;
  min-height: 100vh;
  background: url('/assets/logo/bg.jpeg') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Overlay to darken the background for readability */
:host::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 0;
}

/* Make sure the navbar stays above the overlay */
.navbar {
  position: relative;
  z-index: 2;
}

/* The grid wrapper and cards above the overlay */
.grid-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Grid wrapper to center content */

/* Card layout */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  height: 350px;
}

.horizontal-sale-card {
  flex: 1 1 calc(30% - 1rem);
  background-color:hsla(0, 0.00%, 100.00%, 0.75);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 0.75rem;
  transition: transform 0.2s ease;
  font-size: 0.9rem;
  min-width: 240px;
  max-width: 300px;
}

.horizontal-sale-card:hover {
  transform: scale(1.02);
}

.card-title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.card-sub {
  margin-bottom: 0.25rem;
  color: #555;
  font-size: 0.85rem;
}

.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;

}

/* Button styles */
.btn-warning {
  background-color: #f59e0b;
  border: none;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc2626;
  border: none;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .horizontal-sale-card {
    flex: 1 1 45%;
  }
}

@media (max-width: 600px) {
  .horizontal-sale-card {
    flex: 1 1 100%;
  }
}
`]
})
export class SaleDetailsComponent implements OnInit {
  sales: any[] = [];
  loading = true;
  error = '';

  constructor(private saleService: AuthService) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales(): void {
    this.saleService.getAllSales().subscribe({
      next: (data) => {
        console.log(data);
        this.sales = data.result;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching sales';
        this.loading = false;
        console.error(err);
      }
    });
  }
deleteSale(saleId: string): void {
  if (confirm('Are you sure you want to delete this sale?')) {
    this.saleService.deleteSale(saleId).subscribe({
      next: (response) => {
        console.log('Sale deleted', response);
        this.fetchSales(); // Refresh the sales list after deletion
      },
      error: (err) => {
        console.error('Error deleting sale', err);
      }
    });
  }
}

}
