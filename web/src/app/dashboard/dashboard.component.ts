import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Operation } from '../_models/_models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public values: any;
  public data: any;
  public period: String[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => {
        var generalValues = JSON.parse(response["generalValues"]);
        var yearIncomeOutcome = JSON.parse(response["yearIncomeOutcome"]);
        var outcomePerType = JSON.parse(response["outcomePerType"]);
        this.period = [generalValues["firstDate"], generalValues["lastDate"]];
        this.data = {
          "positiveOperations": yearIncomeOutcome["positiveOperations"],
          "negativeOperations": yearIncomeOutcome["negativeOperations"],
          "salaries": response["salaries"],
          "amazonExpenses": response["amazonExpenses"],
          "totAmazonExpenses": generalValues["totAmazonExpenses"],
          "totSalaries": generalValues["totSalaries"],
          "outcomePerType": outcomePerType
        };
        this.values = [{
            "label": "Current Amount",
            "value": generalValues["sum"].toFixed(2),
            "render": true
          },{
            "label": "Average",
            "value": generalValues["mean"].toFixed(2),
            "render": true
          },{
            "label": "Min",
            "value": generalValues["min"].toFixed(2),
            "render": true
          },{
            "label": "Max",
            "value": generalValues["max"].toFixed(2),
            "render": true
          },{
            "label": "Sum Positive Bank Records",
            "value": yearIncomeOutcome["sumPositiveOperations"].toFixed(2),
            "render": true
          },{
            "label": "Sum Negative Bank Records",
            "value": yearIncomeOutcome["sumNegativeOperations"].toFixed(2),
            "render": true
          }
        ];
      }
    );
  }

  isDark():boolean{
    return localStorage.getItem("theme") === "dark";
  }
}
