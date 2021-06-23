import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  profile:any;
  name:any;
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      this.profile=user?.profile
      this.name=user?.nickname
    })
  }

}
