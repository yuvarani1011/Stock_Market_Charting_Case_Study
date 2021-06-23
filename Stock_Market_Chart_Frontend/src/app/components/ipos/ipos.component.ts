import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { IPO } from 'src/app/models/IPO';
import { IpoService } from 'src/app/services/ipo.service';

@Component({
  selector: 'app-ipos',
  templateUrl: './ipos.component.html',
  styleUrls: ['./ipos.component.css']
})
export class IposComponent implements OnInit {
  ipos :IPO[];
  isAdmin:boolean;
  constructor(private ipoService : IpoService,private router:Router,public auth: AuthService) { }

  ngOnInit(): void {
    this.getAllIPOs();
    this.auth.user$.subscribe(user=>{
      console.log(user);
      if(user?.profile=="admin"){
        this.isAdmin = true;
      }
      else{
        this.isAdmin=false;
      }
      console.log(this.isAdmin)
    });
  }

  getAllIPOs(){
    this.ipoService.getAllIpos()
      .subscribe(data=>
        this.ipos = data
        )
  }

  onDeleteClick(id : any,idx:any){
    this.ipoService.deleteIpo(id);
    this.ipos.splice(idx,1);
  }
  
  editIpo(ipo :IPO){
    window.localStorage.removeItem("editIpoId");
    window.localStorage.setItem("editIpoId", ipo.id!.toString());
    this.router.navigate(['/create-ipo']);
  }


}
