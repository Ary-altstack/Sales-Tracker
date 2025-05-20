// src/app/sale-details/sale-details.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  imports : [CommonModule],
  template: `
  <!-- Navbar at the top -->
<!-- Navbar at the top -->
<nav class="navbar">
  <div class="navbar-brand">Sales Dashboard</div>
  <ul class="nav-links">
    <li><a href="/home">Home</a></li>
    <li><a href="/sales">Sales</a></li>
    <li><a href="/logout">Logout</a></li>
  </ul>
</nav>

<!-- Centered Grid Wrapper -->
<div class="grid-wrapper">
  <div class="card-grid">
    <div class="horizontal-sale-card" *ngFor="let sale of sales">
      <img class="card-img" [src]="'http://localhost:3000/' + sale.carImage" alt="Car Image" />
      <div class="card-title">{{ sale.customerName }}</div>
      <div class="card-sub">{{ sale.customerEmail }}</div>
      <div class="card-sub">Model: {{ sale.model }}</div>
      <div class="card-sub">₹ {{ sale.price }}</div>
      <div class="card-sub">Type: {{ sale.type }}</div>
      <div class="card-sub">Date: {{ sale.saleDate }}</div>
      <div class="d-flex justify-content-between mt-2">
        <a [href]="'/sales/' + sale.userId + '/edit'" class="btn btn-sm btn-warning">Edit</a>
        <button class="btn btn-sm btn-danger" (click)="deleteSale(sale.userId)">Delete</button>
      </div>
    </div>
  </div>
</div>





        <!-- <h2>Sale Details</h2>

        <table *ngIf="!loading && !error" border="1" cellpadding="8">
        <thead>
            <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Model</th>
            <th>Amount</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let sale of sales; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ sale.customerName }}</td>
            <td>{{ sale.model }}</td>
            <td>{{ sale.price }}</td>
            <td>{{ sale.saleDate }}</td>
            </tr>
        </tbody>
        </table> -->
  `,
  styles : [`/* Navbar */
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
  background: url('https://www.dreamstime.com/stunning-d-visualization-modern-luxury-blue-car-black-mirrored-showroom-floor-generated-ai-image370299195') no-repeat center center fixed;
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
}

.horizontal-sale-card {
  flex: 1 1 calc(30% - 1rem);
  background-color: #ffffff;
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
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  max-height: 100px;
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
deleteSale(userId: string): void {
  if (confirm('Are you sure you want to delete this sale?')) {
    this.saleService.deleteSale(userId).subscribe({
      next: (response) => {
        console.log('Sale deleted', response);
        this.fetchSales(); // Refresh list after delete
      },
      error: (err) => {
        console.error('Error deleting sale', err);
      }
    });
  }
}
}
