import { Injectable } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { Chart } from '../_models/_models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  initLineChart(data: any[], chartId: string, title: string, titleData: number | undefined, id: number, colors: string[]){
    var series: any = [];
    data.forEach(item => {
      series.push({
        name: item[0],
        data: item[1]
      });
    });
    var optionsChart = {
      chart: {
        type: "line",
        id: id,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      title: {
        text: title + (titleData ? " " + titleData.toFixed(2)+"€" : ""),
        align: "center"
      },
      stroke: {
        curve: 'straight'
      },
      colors: colors,
      series: series,
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        followCursor: true,
        theme: localStorage.getItem("theme")
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        labels: {
          formatter: function(val: any) {
            return val.toFixed(2);
          }
        },
        tickAmount: 2,
        title: {
          text: "Amount"
        }
      }
    }
    var chartArea = new ApexCharts(
      document.querySelector(chartId),
      optionsChart
    );
    chartArea.render();
  }

  initPolarChart(data: any[], chartId: string, labels: string[], id: number, title: string){
    var optionsChart = {
      series: data,
        chart: {
          width: 380,
          type: 'polarArea',
          id: id
        },
        labels: labels,
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          followCursor: true,
          theme: localStorage.getItem("theme")
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
    };
    console.log(document.querySelector(chartId));
    var chartArea = new ApexCharts(
      document.querySelector(chartId),
      optionsChart
    );
    chartArea.render();
  }

  updateCharts(){
    var chartIds : number[] = [1, 2, 3, 4];
    var foreColor = localStorage.getItem("theme") === "dark" ? "#FFFFFF" : "#000000";
    chartIds.forEach(chartId => {
      ApexCharts.exec(chartId + "", 'updateOptions', {
        chart: {
          foreColor: foreColor
        },
        tooltip: {
          theme: localStorage.getItem("theme")
        },
      });
    });
  }
}