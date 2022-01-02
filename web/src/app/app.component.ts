import { Component, OnInit } from '@angular/core';
import { ChartService } from './_services/chart.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  public lightIsOn: boolean = true;
  public themeIcon: String;

  constructor(public chartService: ChartService){
    localStorage.setItem('theme', 'light');
  }
  ngOnInit(): void {
    localStorage.setItem('theme', 'light');
    this.themeIcon = "lightbulb";
  }

  changeTheme(){
    this.lightIsOn = !this.lightIsOn;
    if(this.lightIsOn){
      localStorage.setItem('theme', 'light');
      this.themeIcon = "lightbulb";
    } else {
      localStorage.setItem('theme', 'dark');
      this.themeIcon = "lightbulb_outline";
    }
    this.chartService.updateCharts(); 
  }

  getTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
  }
}