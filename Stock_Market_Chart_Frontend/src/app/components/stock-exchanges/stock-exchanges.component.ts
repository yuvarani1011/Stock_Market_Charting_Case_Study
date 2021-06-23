import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { StockExchange } from '../../models/StockExchange';
import { StockExchangeService } from '../../services/stock-exchange.service';

@Component({
  selector: 'app-stock-exchanges',
  templateUrl: './stock-exchanges.component.html',
  styleUrls: ['./stock-exchanges.component.css']
})
export class StockExchangesComponent implements OnInit {
  stockExchanges : StockExchange[];
  isAdmin:boolean;
  constructor(private stockExchangeService:StockExchangeService,private router:Router,public auth:AuthService) { }

  ngOnInit(): void {
    this.getAllStockExchanges()
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

  getAllStockExchanges(){
    this.stockExchangeService.getAllStockExchanges()
      .subscribe(data=>
        this.stockExchanges = data  
      )
  }
  onDeleteClick(id : any,idx:any){
    this.stockExchangeService.deleteStockExchange(id);
    this.stockExchanges.splice(idx,1);
  }
  
  editStockExchange(stockExchange :StockExchange){
    window.localStorage.removeItem("editStockExchangeId");
    window.localStorage.setItem("editStockExchangeId", stockExchange.id!.toString());
    this.router.navigate(['/create-stock-exchange']);
  }

}
