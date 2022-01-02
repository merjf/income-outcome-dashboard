import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatIconModule } from '@angular/material/icon'; 

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { RecordsChartComponent } from './records-chart/records-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    RecordsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    NoopAnimationsModule,
    NgApexchartsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
