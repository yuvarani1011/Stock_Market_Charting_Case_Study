import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { IPO } from 'src/app/models/IPO';
import { CompanyService } from 'src/app/services/company.service';
import { IpoService } from 'src/app/services/ipo.service';

@Component({
  selector: 'app-create-ipo',
  templateUrl: './create-ipo.component.html',
  styleUrls: ['./create-ipo.component.css']
})
export class CreateIpoComponent implements OnInit {
  ipoId:string;
  isEdit : boolean;
  isAdmin:boolean;
  ipo : IPO = {
    companyName:'',
    stockExchangeName:'',
    price: 0,
    shares:0
  };

  constructor(private ipoService:IpoService,public auth:AuthService,private companyService:CompanyService) { }

  ngOnInit(): void {
    this.ipoId = window.localStorage.getItem("editIpoId")!
    window.localStorage.removeItem("editIpoId");
    console.log(this.ipoId)
    if(this.ipoId){
      this.isEdit=true;
    this.ipoService.getIpoById(this.ipoId)
    .subscribe(data =>{
      this.ipo = data;
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
    this.ipoService.createIPO(data).subscribe(data=>{
      this.companyService.addIpoToCompany(data.companyName,data)
    })
  }

  onClickUpdate(data){
    this.ipoService.updateIpo(data,this.ipoId)
  //  console.log(data)
    console.log("createipo")
  }

}
