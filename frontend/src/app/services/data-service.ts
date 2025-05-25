import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DashboardSummary {
  ytdValue: string;
  bpValue: string;
  growth: string;
  dateRange: string;
}

export interface NewCustomers {
  customerCount: string;
  target: string;
  growth: string;
}

export interface GlobalSalesChartData {
  labels: string[];
  salesData: number[];
}

export interface CoreModel {
  name: string;
  image: string;
  units: string;
  growth: string;
  colorClass: string; 
}

export interface TopSellingModel {
  name: string;
  image: string;
  sales: string;
  colorClass: string; 
}

export interface SalesByRegion {
  name: string;
  flag: string;
  volume: string;
  bp: string;
  change: string;
  trend: string;
}

export interface ChannelMixItem {
  name: string;
  value: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/dashboard-summary`);
  }

  getNewCustomers(): Observable<NewCustomers> {
    return this.http.get<NewCustomers>(`${this.baseUrl}/new-customers`);
  }

  getGlobalSalesChartData(): Observable<GlobalSalesChartData> {
    return this.http.get<GlobalSalesChartData>(`${this.baseUrl}/global-sales-chart`);
  }

  getCoreModels(): Observable<CoreModel[]> {
    return this.http.get<CoreModel[]>(`${this.baseUrl}/core-models`);
  }

  getTopSellingModels(): Observable<TopSellingModel[]> {
    return this.http.get<TopSellingModel[]>(`${this.baseUrl}/top-selling-models`);
  }

  getSalesByRegion(): Observable<SalesByRegion[]> {
    return this.http.get<SalesByRegion[]>(`${this.baseUrl}/sales-by-region`);
  }

  getChannelMix(): Observable<ChannelMixItem[]> {
    return this.http.get<ChannelMixItem[]>(`${this.baseUrl}/channel-mix`);
  }
}
