import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import {
  DashboardDataService,
  DashboardSummary,
  NewCustomers,
  GlobalSalesChartData,
  CoreModel,
  TopSellingModel,
  SalesByRegion,
  ChannelMixItem
} from '../services/data-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HttpClientModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  dashboardSummary: DashboardSummary | null = null;
  newCustomers: NewCustomers | null = null;
  coreModels: CoreModel[] = [];
  topSellingModels: TopSellingModel[] = [];
  salesByRegion: SalesByRegion[] = [];
  channelMix: ChannelMixItem[] = [];

  // Properties for the "Coming Soon" message
  showComingSoonMessage: boolean = false;
  comingSoonText: string = '';

  // Chart.js data and options
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Sales',
        data: [],
        backgroundColor: [],
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            if (value >= 1000) {
              return (value / 1000) + 'k';
            }
            return value;
          },
          stepSize: 15
        },
        min: 0,
        max: 165
      }
    }
  };

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 4,
      }
    ]
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(
    private dashboardDataService: DashboardDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllDashboardData();
  }

 
  fetchAllDashboardData(): void {
   
    this.dashboardDataService.getDashboardSummary().subscribe({
      next: (data) => {
        this.dashboardSummary = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching dashboard summary:', err)
    });

    this.dashboardDataService.getNewCustomers().subscribe({
      next: (data) => {
        this.newCustomers = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching new customers:', err)
    });

    
    this.dashboardDataService.getGlobalSalesChartData().subscribe({
      next: (data) => {
        this.barChartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Sales',
              data: data.salesData,
              backgroundColor: data.salesData.map((_: any, i: number) => i < 6 ? '#6a76ff' : '#d3d3d3'),
            }
          ]
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching global sales chart data:', err)
    });

   
    this.dashboardDataService.getCoreModels().subscribe({
      next: (data) => {
        this.coreModels = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching core models:', err)
    });

  
    this.dashboardDataService.getTopSellingModels().subscribe({
      next: (data) => {
        this.topSellingModels = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching top selling models:', err)
    });

  
    this.dashboardDataService.getSalesByRegion().subscribe({
      next: (data) => {
        this.salesByRegion = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching sales by region:', err)
    });

    
    this.dashboardDataService.getChannelMix().subscribe({
      next: (fetchedChannelMix) => {
        this.channelMix = fetchedChannelMix;
        this.doughnutChartData = {
          labels: fetchedChannelMix.map((item: ChannelMixItem) => item.name),
          datasets: [
            {
              data: fetchedChannelMix.map((item: ChannelMixItem) => parseFloat(item.value.replace('k', '')) * 1000),
              backgroundColor: fetchedChannelMix.map((item: ChannelMixItem) => item.color),
              borderWidth: 4,
            }
          ]
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching channel mix:', err)
    });
  }

 
  navigateToAddSale() {
    this.router.navigate(['/addSales']);
  }

  
  navigateToSalesList() {
    this.router.navigate(['/saledetails']);
  }

  
  showComingSoon(featureName: string) {
    this.comingSoonText = `The '${featureName}' feature is a future enhancement. Coming soon!`;
    this.showComingSoonMessage = true;
    this.cdr.detectChanges();
   
  }

  
  closeComingSoonMessage() {
    this.showComingSoonMessage = false;
    this.comingSoonText = '';
    this.cdr.detectChanges();

  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}