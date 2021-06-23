import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';

import {Router} from '@angular/router';
import { StockPrice } from '../models/StockPrice';
import { IPO } from '../models/IPO';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CompanyService {
  private baseUrl = 'https://stock-market-charting.herokuapp.com/';
  constructor(private http:HttpClient,private router:Router) { }


  getAllCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(this.baseUrl+'/company/companies')
  }

  createCompany(company :Company){
    const headers = { 'content-type' : 'application/json' }
    const body = JSON.stringify(company);
    return this.http.post<Company>(this.baseUrl + '/company/add',company)
    .pipe(map((data:any)=>{
      return data;  
    })
    )
  }

  deleteCompany(id : any){
    this.http.delete(this.baseUrl+'/company/'+id)
      .subscribe(response=>{
        console.log(response);
      })
  }

  updateCompany(company:Company,id:any){
    company.id=id;
    return this.http.put(this.baseUrl+'/company/update',company)
    .subscribe(response=>response)
  }

  getCompanyById(id : any){
    return this.http.get(this.baseUrl+'/company/'+id)
  }

  getCompanyByName(name:String):Observable<Company[]>{
    return this.http.get<Company[]>(this.baseUrl+'/company/name/'+name)
}

addStockPriceToCompany(companyCode:string,stockPrice:StockPrice){
  return this.http.post(this.baseUrl+'/company/'+companyCode+'/stockPrices',stockPrice)
  .subscribe(response=>response)
}

addIpoToCompany(companyName:string,ipo:IPO){
    return this.http.post(this.baseUrl+'/company/'+companyName+'/ipos',ipo)
    .subscribe(response=>response)
}
}
