import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }
  isEmailVerified:any = false;
  ngOnInit(): void {
   // this.auth.loginWithRedirect();
   this.auth.user$.subscribe(user=>{
      this.isEmailVerified=user?.email_verified
   })
   
  }
  
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

}
