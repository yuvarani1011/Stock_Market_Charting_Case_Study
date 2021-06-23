// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { StockPrice } from '../models/StockPrice';
import { StockPrice } from '../models/StockPrice.ts';
import { StockPriceService } from '../../services/stock-price.service';
@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  file: File;
  arrayBuffer: any;
  numberOfRecords: number;
  stockPrices: StockPrice[] = [];
  stockPrice: StockPrice;
  isUploaded: boolean = false;
  companyCode: string;
  stockExchangeName: string;
  fromDate: string;
  toDate: string;

  constructor(private stockPriceService: StockPriceService) { }

  ngOnInit(): void {
  }

  

  onUpload(event){
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var records = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      this.numberOfRecords = records.length;
   
    
     
      records.filter(record =>{
        this.stockPrice = {
          companyCode : record["Company Code"],
          stockExchangeName : record["Stock Exchange"],
          price : record["Price Per Share(in Rs)"],
          date : record["Date"].trim(),
          time : record["Time"].trim(),
          
        }
        this.stockPrices.push(this.stockPrice);
        this.stockPriceService.createStockPrice(this.stockPrice);

      });
     
      
      this.companyCode = this.stockPrices[0].companyCode;
      this.stockExchangeName = this.stockPrices[0].stockExchangeName;
      this.fromDate = this.stockPrices[0].date;
      this.toDate = this.stockPrices[this.numberOfRecords-1].date;
      this.isUploaded = true;

      for(var i=0;i<this.numberOfRecords;i++){
        this.stockPriceService.createStockPrice(this.stockPrices[i]).subscribe(res=>{
          console.log(res)
         this.companyService.addStockPriceToCompany(this.companyCode,res)
        })
      }
  }
 
}

}



