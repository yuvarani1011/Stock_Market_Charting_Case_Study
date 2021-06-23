import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IposComponent } from './components/ipos/ipos.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { SectorsComponent } from './components/sectors/sectors.component';
import { StockExchangesComponent } from './components/stock-exchanges/stock-exchanges.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { ComparisonChartsComponent } from './components/comparison-charts/comparison-charts.component';
import { LoginComponent } from './components/login/login.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';
import { CreateSectorComponent } from './components/sectors/create-sector/create-sector.component';
import { CreateStockExchangeComponent } from './components/stock-exchanges/create-stock-exchange/create-stock-exchange.component';
import { CreateIpoComponent } from './components/ipos/create-ipo/create-ipo.component';
import{StockPriceService} from './services/stock-price.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import{CompanyService} from './services/company.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SectorService} from './services/sector.service';
import {StockExchangeService} from './services/stock-exchange.service';
import { IpoService } from './services/ipo.service';
import { ChartsModule } from 'ng2-charts';
import { LandingComponent } from './components/landing/landing.component';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { Chart } from 'chart.js';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IposComponent,
    CompaniesComponent,
    SectorsComponent,
    StockExchangesComponent,
    ImportDataComponent,
    ComparisonChartsComponent,
    LoginComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent,
    CreateCompanyComponent,
    CreateSectorComponent,
    CreateStockExchangeComponent,
    CreateIpoComponent,
    LandingComponent,
   
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    //Chart,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  //  AngularFontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [StockPriceService,CompanyService,SectorService,StockExchangeService,IpoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
