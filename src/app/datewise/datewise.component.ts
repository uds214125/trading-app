import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  constructor(private tradingService:TradingService) { }

  ngOnInit() {
    this.getDatewiseTrades();
  }
  getDatewiseTrades(){
    this.tradingService.getDaywiseTrades()
    .subscribe((data:any)=> {
      this.data= data;
      // console.log('data : ',this.data);
     
      // var bars = []
      // myNewDataset.data.forEach(function (value, i) {
      //     bars.push(new myBarChart.BarClass({
      //         value: value,
      //         label: myBarChart.datasets[0].bars[i].label,
      //         x: myBarChart.scale.calculateBarX(myBarChart.datasets.length + 1, myBarChart.datasets.length, i),
      //         y: myBarChart.scale.endPoint,
      //         width: myBarChart.scale.calculateBarWidth(myBarChart.datasets.length + 1),
      //         base: myBarChart.scale.endPoint,
      //         strokeColor: myNewDataset.strokeColor,
      //         fillColor: myNewDataset.fillColor
      //     }))
      // })

      // myBarChart.datasets.push({
      //     bars: bars
      // })

      // myBarChart.update();


      this.createChart();
    },(err)=>{

    });
  }
  createChart1 = () => {
    const ctx = this.chart.nativeElement.getContext('2d');
    // console.log('daywise data ', this.daywiseData);
    // var barChartData = {
		// 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		// 	datasets: [{
		// 		label: 'Dataset 1',
		// 		// backgroundColor: window.chartColors.red,
		// 		data: [
		// 		]
		// 	}, {
		// 		label: 'Dataset 2',
		// 		// backgroundColor: window.chartColors.blue,
		// 		data: [
		// 		]
		// 	}]
    // };
    
    
    const barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Date", "Avg", "Max", "Min"]
        // datasets: [{
			  //     backgroundColor: '#00ff00',
        //     label: '# of Votes 2016',
        //     data: [12, 19, 3]
        // }]
		  },
      options: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            offset: true,
            // stacked: true,
          }],
          yAxes: [{
            // stacked: true
          }]
        }
      }
    }); 
      let DateTemp = [];
      let AvgTemp = [];
      let MaxTemp = [];
      let MinTemp = [];
    this.data.map((item)=>{
      DateTemp.push(item.Date);
      AvgTemp.push({
        x:item.Date,
        y:item.avg_turnover
      });
      MaxTemp.push({
        x:item.Date,
        y:item.maximum_turnover
      });
      // this.daywiseData.push(temp);
    });
    barChart.data.datasets.push(
      {
        label: 'Avg',
        backgroundColor: '#ff0000',
        data: AvgTemp
      },{
        label: 'Max',
        backgroundColor: '#00ff00',
        data: MaxTemp
      }
    );
    barChart.update();
  };

  createChart = ()=>{
    let DateTemp = [];
    let AvgTemp = [];
    let MaxTemp = [];
    // let MinTemp = [];
    this.data.map((item)=>{
      DateTemp.push(item.Date);
      AvgTemp.push({
        x: new Date(item.Date),
        y:item.avg_turnover
      });
      MaxTemp.push({
        x: new Date(item.Date),
        y: item.maximum_turnover
      });
    });
    console.log(AvgTemp,' avg temp ')
    // return true;
    var config = {
      type: 'bar',
      data: {
        labels: ["Date", "Avg", "Max", "Min"]
      },
      options: {
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'MMM D'
              }
            },
            offset: true,
            stacked: false,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    const ctx = this.chart.nativeElement.getContext('2d');
    const barChart = new Chart(ctx, config);
    barChart.data.datasets.push(
      {
        label: 'Avg',
        backgroundColor: '#ff0000',
        data: AvgTemp
      },{
        label: 'Max',
        backgroundColor: '#00ff00',
        data: MaxTemp
      }
    );
    barChart.update();
  };

}
