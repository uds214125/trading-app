import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';
import { TradingService } from '../services/trading.service';
@Component({
  selector: 'app-datewise',
  templateUrl: './datewise.component.html',
  styleUrls: ['./datewise.component.scss']
})
export class DatewiseComponent implements OnInit {
  @ViewChild('barChart', { static: true }) chart: ElementRef;
  data: any;
  daywiseData : any= [];
  limit: number;
  constructor(private tradingService:TradingService,
    private location: Location) { }

  ngOnInit() {
    
    this.getDatewiseTrades();
  }
  getDatewiseTrades(limit?){
    this.limit = limit?limit:10;
    this.tradingService.getDatewiseTrades(this.limit).subscribe((data:any)=> {
      this.data= data;
      this.createChart(true);
    });
  }

  createChart = (isStack?) => {
    let dateTrade = [];
    let avgTrade = [];
    let maxTrade = [];
    let minTrade = [];
    this.data.map((item)=>{
      dateTrade.push(item.Date);
      avgTrade.push({ x: new Date(item.Date), y:item.avg_turnover });
      maxTrade.push({ x: new Date(item.Date), y: item.maximum_turnover });
      minTrade.push({ x: new Date(item.Date), y: item.minimum_turnover });
    });
   
    var config = {
      type: 'bar',
      title: {
        display: true,
        text: 'Bar Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      options: {
        scales: {
          xAxes: [{
            type: "time",
            time: {
              // displayFormats: {
              //   'millisecond': 'MMM DD',
              //   'second': 'MMM DD',
              //   'minute': 'MMM DD',
              //   'hour': 'MMM DD',
              //   'day': 'MMM DD',
              //   'week': 'MMM DD',
              //   'month': 'MMM DD',
              //   'quarter': 'MMM DD',
              //   'year': 'MMM DD',
              // }
                // displayFormats: {
                //  quarter: 'MMM YYYY'
                // }
                unit: 'day'
            },
            // time: {
            //   unit: 'day',
            //   unitStepSize: 1,
            //   displayFormats: {
            //     'day': 'MMM DD'
            //   }
            // },
            offset: true,
            stacked: isStack,
          }],
          yAxes: [{
            // type: "time",
            // time: {
            //   unit: 'day',
            //   round: 'day',
            //   displayFormats: {
            //     day: 'MMM D'
            //   }
            // },
            stacked: isStack,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    const ctx = this.chart.nativeElement.getContext('2d');
    const barChart = new Chart(ctx, config);
    // barChart.data.labels.push(DateTemp);
    barChart.data.datasets.push(
      {
        label: 'Maximum',
        backgroundColor: 'red',
        data: maxTrade
      },{
        label: 'Average',
        backgroundColor: 'blue',
        data: avgTrade
      },
      {
        label: 'Minimum',
        backgroundColor: 'green',
        data: minTrade
      }
    );
    barChart.update();
  };

  getMax(e){
    this.limit = e.target.value;
    this.getDatewiseTrades(this.limit);
  }
  isStacked(e){
    if( e.target.value == 1){
      this.createChart(false);
    }else{
      this.createChart(true);
    }
  }
  onBack = () =>{
    this.location.back();
  };
}
