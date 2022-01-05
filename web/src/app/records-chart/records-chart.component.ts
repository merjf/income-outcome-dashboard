import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Chart, Operation } from '../_models/_models';
import { ChartService } from '../_services/chart.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'records-chart',
  templateUrl: './records-chart.component.html',
  styleUrls: ['./records-chart.component.scss']
})
export class RecordsChartComponent implements OnInit {

  public yearIncomeOutcomeChart: Chart;
  public salaryChart: Chart;
  public amazonChart: Chart;
  public totAmazonExpenses: number = 0;
  public totSalaries: number = 0;

  @Input()
  data: any;

  constructor(public dataService: DataService, public chartService: ChartService) {
    this.initChartData();
  }
  ngOnInit(): void {
    this.initChartData();
  }

  ngOnChanges(): void{
    this.initChartData();
  }

  public initChartData(): void {
    if(this.data){
      let positiveAmounts = this.dataService.adjustValues(JSON.parse(this.data["positiveOperations"]));
      let negativeAmounts = this.dataService.adjustValues(JSON.parse(this.data["negativeOperations"]));
      let salaries = this.dataService.adjustValues(JSON.parse(this.data["salaries"]));
      let amazonOutcome = this.dataService.adjustValues(JSON.parse(this.data["amazonExpenses"]));
      let totSalaries = this.data["totSalaries"];
      let totAmazonExpenses = this.data["totAmazonExpenses"];
      this.chartService.initLineChart([["Income", positiveAmounts], ["Outcome", negativeAmounts]], "#incomeOutcomeChart",
      "Year Income/Outcome", undefined, 1, ["#0db824", "#fc0000"]);
      this.chartService.initLineChart([["Salary", salaries]], "#salariesChart", "Salaries", totSalaries,
      2, ["#0d39d9"]);
      this.chartService.initLineChart([["Outcome", amazonOutcome]], "#amazonOutcomeChart", "Amazon Outcome", totAmazonExpenses,
      3, ["#e79924"]);
      this.chartService.initDoubleLineChart([["Income", positiveAmounts], ["Outcome", negativeAmounts]], "#incomeOutcomeChart1",
      "#incomeOutcomeChart2", "Year Income/Outcome", 1, 4, ["#0db824", "#fc0000"]);
      let outcomePerType = this.data["outcomePerType"];
      let labels = Object.keys(outcomePerType).map(function (key) {
        key = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        key = key.replace(" Costs", "");
        key = key.replace(" Out", "");
        return key[0].toUpperCase() + key.slice(1).toLowerCase();
      });
      let values = Object.keys(outcomePerType).map(function (key) {
        return Math.abs(outcomePerType[key].toFixed(2));
      });
      this.chartService.initPieChart(values, "#outcomePerType", labels, 4, "Outcome Per Type");
    }
  }

  isDark():boolean{
    return localStorage.getItem("theme") === "dark";
  }
}
