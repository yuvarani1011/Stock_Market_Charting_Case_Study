import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { ajaxGetJSON } from 'rxjs/internal-compatibility';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileJson: string="";
  isAdmin:boolean;
  constructor(public auth: AuthService) { }
  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      console.log(user);
      if(user?.profile=="admin"){
        this.isAdmin = true;
      }
      else{
        this.isAdmin=false;
      }
      console.log(this.isAdmin)
    }
    //  (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
     );
   // console.log(this.profileJson)
  }

 
}
 

