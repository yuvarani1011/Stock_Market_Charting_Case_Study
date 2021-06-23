import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPO } from '../models/IPO';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class IpoService {
  //private baseUrl = 'https://stock-market-backend-app.herokuapp.com/';
  //private baseUrl = 'http://localhost:4200/';
  private baseUrl = 'https://stock-market-charting.herokuapp.com/';
  constructor(private http:HttpClient) { }

  getAllIpos():Observable<IPO[]>{
    return this.http.get<IPO[]>(this.baseUrl+'/ipo/ipos')
  }

  createIPO(ipo :IPO){
    const headers = { 'content-type' : 'application/json' }
    const body = JSON.stringify(ipo);
    return this.http.post<IPO>(this.baseUrl + '/ipo/add',ipo)
    .pipe(map((data:any)=>{
      return data;  
    })
    )
  }

  deleteIpo(id:any){
    this.http.delete(this.baseUrl+'/ipo/'+id)
    .subscribe(response=>{
      console.log(response);
    })
  }

  updateIpo(ipo:IPO,id:any){
    console.log(ipo)
    ipo.id = id;
    console.log(this.baseUrl+'/ipo/'+ipo.id)
    return this.http.put(this.baseUrl+'/ipo/'+ipo.id,ipo)
    .subscribe(response=>response);
  }

  getIpoById(id:any){
    return this.http.get(this.baseUrl+'/ipo/'+id)
  }
}
