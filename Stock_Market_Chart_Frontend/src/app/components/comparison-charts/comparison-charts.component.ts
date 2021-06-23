import { Component, OnInit,ElementRef } from '@angular/core';
import { StockPriceService } from 'src/app/services/stock-price.service';
import { Chart, ChartDataSets, ChartHoverOptions, ChartOptions, ChartType } from 'chart.js';
import { Color,Label } from 'ng2-charts';
import { StockPrice } from 'src/app/models/StockPrice';
import { Comparison } from 'src/app/models/Comparison';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';
//import { ChartDataSets } from 'chart.js';
//import * as CanvasJS from 'canvasjs';
@Component({
  selector: 'app-comparison-charts',
  templateUrl: './comparison-charts.component.html',
  styleUrls: ['./comparison-charts.component.css']
})
export class ComparisonChartsComponent implements OnInit {
  stockPrices : StockPrice[];
  lineChartData:ChartDataSets[];
  prices:any=[];
  time:any=[];
  stock:StockPrice ;
  chart:any=[];
  chartData:ChartDataSets[];
  chartLabels:Label[];
  chartOptions:ChartOptions;
  comparison: Comparison = {
    code: '',
    stockExchangeName: '',
    fromPeriod: '',
    toPeriod: '',
    periodicity: ''
  }
  companies:Company[];
  public type:ChartType;
  constructor(private stockPriceService: StockPriceService, private elementRef: ElementRef, private companyService:CompanyService) { }

 
  ngOnInit(): void {
   // this.getAllStockPrices()
    //this.getStock()
   //console.log(this.stockPrices)
  // this.stock=this.stockPrices[0];

 //console.log(this.stockPrices)
    //console.log(prices)
    this.getCompanies()
  }
  getCompanies(){
    this.companyService.getAllCompanies().subscribe(data=>
        this.companies=data
      )
}

    onClickSubmit(data){
      console.log(data.from);
      var fromd = data.from;
      var tod = data.to;
      fromd =fromd.split("-").reverse().join("-");
      tod = tod.split("-").reverse().join("-");
      console.log(data.stockexchangename)
      this.stockPriceService.getCompanyStockPrices(fromd,tod,data.companycode,data.stockexchangename)
      .subscribe(response=>{
        let prices = response.map(res=>res.price);
       this.time = response.map(res=>res.date);
    // console.log(this.prices)
    console.log(response)
      console.log(this.time)
      //loading chart data
      this.chartData = [
        {
          data: prices,
          label: data.companycode+" "+data.stockexchangename
        },
      ]

      this.chartLabels = this.time;

      this.chartOptions = {
        responsive: true
      };

    })
    }

    onClickCompare(data){
      /*
      this.chartData.push({
        data:[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8],
        label:"trial"
      })
      */
     // this.chartLabels=this.time;

     console.log(data.from);
     var fromd = data.from;
     var tod = data.to;
     fromd =fromd.split("-").reverse().join("-");
     tod = tod.split("-").reverse().join("-");
     console.log(data.stockexchangename)
     this.stockPriceService.getCompanyStockPrices(fromd,tod,data.companycode,data.stockexchangename)
     .subscribe(response=>{
       let prices = response.map(res=>res.price);
      this.time = response.map(res=>res.date);
      console.log(this.time)
   // console.log(this.prices)
   console.log(response)
     console.log(this.time)
     //loading chart data
     this.chartData.push({
       data:prices,
       label:data.companycode+" " +data.stockexchangename
     })

     this.chartLabels = this.time;

     this.chartOptions = {
       responsive: true
     };

   })
    }


  getAllStockPrices(){
    this.stockPriceService.getAllStockPrice()
    .subscribe(response=>{
        this.prices = response.map(res=>res.price);
      this.time = response.map(res=>res.date);
    // console.log(this.prices)
      //console.log(time)
      //loading chart data
      this.chartData = [
        {
          data: this.prices,
          label: 'Stock A'
        },
      ]

      this.chartLabels = this.time;

      this.chartOptions = {
        responsive: true
      };

    })
    
   //   )
 // }

  /*
getStock(){
 for(let stocks in this.stockPrices){
   console.log(stocks)
 }
} 
 
lineChartData: ChartDataSets[] = [
  { data: this.prices , label: 'Stock prices' },
];

lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

lineChartOptions = {
  responsive: true,
};

lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

lineChartLegend = true;
lineChartPlugins = [];
lineChartType : ChartType= "line";

  */

  }

}
