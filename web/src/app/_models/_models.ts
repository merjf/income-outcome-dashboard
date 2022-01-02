import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexFill,
    ApexYAxis,
    ApexMarkers,
    ApexGrid,
    ApexTooltip,
    ApexTheme
  } from "ng-apexcharts";
  
export class Operation{
    constructor(public operation: Number, public description: String, public valueDate: Number) {
        
    }
}

export class Point{
    constructor(public date: Number, public value: Number) {
        
    }
}

export class Chart{
    constructor(  public series: ApexAxisChartSeries,
        public chartStyle: ApexChart,
        public labels: ApexDataLabels,
        public markers: ApexMarkers | undefined,
        public title: ApexTitleSubtitle,
        public fill: ApexFill | undefined,
        public yaxis: ApexYAxis,
        public xaxis: ApexXAxis,
        public stroke: ApexStroke,
        public grid: ApexGrid,
        public tooltip: ApexTooltip | undefined,
        public theme: ApexTheme,
        public colors: string[]) {
    }
}