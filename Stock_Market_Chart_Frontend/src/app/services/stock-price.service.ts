import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { StockPrice } from '../models/StockPrice';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comparison } from '../models/Comparison';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class StockPriceService {

  //private baseUrl = 'https://stock-market-backend-app.herokuapp.com/';
  //private baseUrl = 'http://localhost:4200/';
  private baseUrl = 'https://stock-market-charting.herokuapp.com/';
  constructor(private http:HttpClient) {

   }


   getAllStockPrice():Observable<StockPrice[]>{
     return this.http.get<StockPrice[]>(this.baseUrl+'/stock-price/stock-prices')
   }



  
  createStockPrice(stockPrice : StockPrice){
    const headers = { 'content-type' : 'application/json' }
    const body = JSON.stringify(stockPrice);
    return this.http.post<StockPrice>(this.baseUrl + '/stock-price/add',stockPrice)
    .pipe(map((data:any)=>{
      return data;  
    })
    )
  }

  getStock(from:string,to:string){
    return this.http.get<StockPrice[]>(this.baseUrl+'/stock-price/'+from+'/'+to)
  }



  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

getCompanyStockPrices(fromPeriod:string,toPeriod:string,companyCode:string,stockExchangeName:string) {
  return this.http.get<StockPrice[]>(this.baseUrl + "/stock-price/compareCompany/"+fromPeriod+"/"+toPeriod+"/"+companyCode+"/"+stockExchangeName);
}

getSectorStockPrices(fromPeriod:string,toPeriod:string) {
  return this.http.get<StockPrice[]>(this.baseUrl + "/compareSector/"+fromPeriod+"/"+toPeriod);
}

}
