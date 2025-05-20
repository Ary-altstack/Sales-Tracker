import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/signup', data, {
      withCredentials: true,
    });
    
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, credentials, {
      withCredentials: true,
    });
  }

    getUserId(): string {
    return sessionStorage.getItem('userId') || '';
  }
  // Add a sale
  addSale(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiURL}/addSales`, formData, { withCredentials: true });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

   // Get all sales
  getAllSales(): Observable<any> {
    return this.http.get(`${this.apiURL}/saledetails`);
  }

  // Get sale by ID (for edit)
  getSaleById(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/sales/${id}/edit`);
  }

  // Update a sale
  updateSale(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiURL}/sales/${id}`, formData, { withCredentials: true });
  }

  // Delete a sale
  deleteSale(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/sales/${id}/delete`);
  }
}
