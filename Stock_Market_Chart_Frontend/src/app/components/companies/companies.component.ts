import { Component,Input, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { StockPrice } from '../../models/StockPrice';
import { CompanyService } from '../../services/company.service';
import { StockPriceService } from '../../services/stock-price.service';
import{Router} from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { SectorService } from 'src/app/services/sector.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

//single file deployment repo
export class CompaniesComponent implements OnInit {
  stockPrice: StockPrice[];
  companies: Company[];
  isAdmin:boolean;
  constructor(private stockPriceService:StockPriceService,private companyService:CompanyService,private router:Router,public auth:AuthService,private stockExchangeService:StockExchangeService,private sectorService:SectorService) { }

  ngOnInit(): void {
    this.getAllStockPrice();
    this.getAllCompanies();
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

getAllStockPrice(){
  this.stockPriceService.getAllStockPrice()
      .subscribe(data => 
          this.stockPrice = data
        )
}

getAllCompanies(){
  this.companyService.getAllCompanies()
    .subscribe(data =>
        this.companies = data
      )
}

onDeleteClick(id : any,idx:any){
  this.companyService.deleteCompany(id);
  this.companies.splice(idx,1);
}

editCompany(company :Company){
  window.localStorage.removeItem("editCompanyId");
  window.localStorage.setItem("editCompanyId", company.id!.toString());
  this.router.navigate(['/create-company']);
}

}
