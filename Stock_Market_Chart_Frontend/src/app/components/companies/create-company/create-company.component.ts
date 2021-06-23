import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { SectorService } from 'src/app/services/sector.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  //let ompanyId = window.localStorage.getItem("editCompanyId");
  companyId : string;
  isEdit:boolean;
  isAdmin:boolean;
  company: Company = {
    name: '',
    code: '',
    turnover: '',
    ceo: '',
    boardOfDirectors: '',
    stockExchangeNames: '',
    sectorName: '',
    description: ''
  };
  public BSE:String;
  public NSE:String;
  bse:string = "NOT";
  nse:string = "NOT";
  companies:Company[];

  constructor(private companyservice:CompanyService,public auth:AuthService,private stockExchangeService:StockExchangeService,private sectorService:SectorService) { }

  ngOnInit(): void {
    this.companyId = window.localStorage.getItem("editCompanyId")!
    window.localStorage.removeItem("editCompanyId");
    console.log(this.companyId)
    if(this.companyId){
      this.isEdit=true;
    this.companyservice.getCompanyById(this.companyId)
    .subscribe(data =>{
      this.company = data;
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
      if(this.BSE){
        this.bse="BSE"
      }
      if(this.NSE){
        this.nse="NSE"
      }
      this.companyservice.createCompany(data).subscribe(res=>{
        this.stockExchangeService.addCompanyToStockExchange(this.bse,res)
        this.stockExchangeService.addCompanyToStockExchange(this.nse,res)
        this.sectorService.addCompanyToSector(res.sectorName,res)
      })  
    }

    onClickUpdate(data){
      this.companyservice.updateCompany(data,this.companyId)
    }
}
