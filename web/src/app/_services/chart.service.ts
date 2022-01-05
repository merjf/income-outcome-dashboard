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
      series: series,
      chart: {
        type: "line",
        id: id,
        zoom: {
          enabled: false
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
    var lineChart = new ApexCharts(
      document.querySelector(chartId),
      optionsChart
    );
    lineChart.render();
  }

  initDoubleLineChart(data: any[], chartId1: string, chartId2: string, title: string, id1: number, id2: number, colors: string[]){
    var series: any = [];
    data.forEach(item => {
      series.push({
        name: item[0],
        data: item[1]
      });
    });
    console.log(series[0]["data"]);
    var optionsChart1 = {
      series: [{
        name: title,
        data: series[0]["data"]
      }],
      chart: {
        id: id2,
        type: "line",
        height: 230,
        toolbar: {
          autoSelected: "pan",
          show: false
        }
      },
      title: {
        text: title,
        align: "center"
      },
      colors: colors,
      stroke: {
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
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
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      }
    };
    var optionsChart2 = {
      series: [{
        name: title,
        data: series[0]["data"]
      }],
      chart: {
        id: id1,
        height: 130,
        type: "area",
        brush: {
          target: id2,
          enabled: true
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("1 Aug 2021").getTime(),
            max: new Date("1 Dec 2021").getTime()
          }
        }
      },
      title: {
        text: title,
        align: "center"
      },
      colors: colors,
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1
        }
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false
        }
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
    };
    var chart1 = new ApexCharts(
      document.querySelector(chartId1),
      optionsChart1
    );
    chart1.render();
    var chart2 = new ApexCharts(
      document.querySelector(chartId2),
      optionsChart2
    );
    chart2.render();
  }

  initPolarChart(data: any[], chartId: string, labels: string[], id: number, title: string){
    var optionsChart = {
      series: data,
        chart: {
          type: 'polarArea',
          id: id
        },
        labels: labels,
        fill: {
          opacity: 1
        },
        title: {
          text: title,
          align: "center"
        },
        stroke: {
          colors: ["#FFF"]
        },
        colors:['#7eb5f9', '#8bf2f7', '#3dff87', '#eaff08', '#ffb133', '#ff3838',
          '#be4dff', '#97ecbd', '#e48797', '#d39934'],
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          followCursor: true,
          theme: localStorage.getItem("theme"),
          color: "#FFF"
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
    var chartArea = new ApexCharts(
      document.querySelector(chartId),
      optionsChart
    );
    chartArea.render();
  }

  initPieChart(data: any[], chartId: string, labels: string[], id: number, title: string){
    var optionsChart = {
      series: data,
      chart: {
        type: 'pie',
        id: id
      },
      labels: labels,
      legend: {
        position: 'right',
        offsetY: 100
      },
      fill: {
        opacity: 1
      },
      title: {
        text: title,
        align: "center"
      },
      stroke: {
        colors: ["#FFF"]
      },
      colors:['#7eb5f9', '#8bf2f7', '#3dff87', '#eaff08', '#ffb133', '#ff3838',
        '#be4dff', '#97ecbd', '#e48797', '#d39934'],
      yaxis: {
        show: false
      },
      tooltip: {
        followCursor: true,
        theme: localStorage.getItem("theme"),
        color: "#FFF"
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          }
        },
        plotOptions: {
          pie: {
            expandOnClick: false
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