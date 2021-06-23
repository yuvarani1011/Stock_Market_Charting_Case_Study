import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StockExchange } from 'src/app/models/StockExchange';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';

@Component({
  selector: 'app-create-stock-exchange',
  templateUrl: './create-stock-exchange.component.html',
  styleUrls: ['./create-stock-exchange.component.css']
})
export class CreateStockExchangeComponent implements OnInit {
  stockExchangeId:string;
  isEdit : boolean;
  isAdmin:boolean;
  stockexchange:StockExchange={
    name:'',
    description:'',
    address:'',
    remarks:''
  }
  constructor(private stockExchangeService : StockExchangeService,public auth:AuthService) { }

  ngOnInit(): void {
    this.stockExchangeId = window.localStorage.getItem("editStockExchangeId")!
    window.localStorage.removeItem("editStockExchangeId");
    console.log(this.stockExchangeId)
    if(this.stockExchangeId){
      this.isEdit=true;
    this.stockExchangeService.getStockExchangeById(this.stockExchangeId)
    .subscribe(data =>{
      this.stockexchange = data;
    })
  }

  this.auth.user$.subscribe(user=>{
    if(user?.profile=="admin"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin=false;
    }
  }
  //  (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
   );
  }

  onClickSubmit(data){
    this.stockExchangeService.createStockExchange(data)
  }

  onClickUpdate(data){
    this.stockExchangeService.updateStockExchange(data,this.stockExchangeId)
  }
}
