import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { IposComponent } from './components/ipos/ipos.component';
import { SectorsComponent } from './components/sectors/sectors.component';
import { StockExchangesComponent } from './components/stock-exchanges/stock-exchanges.component';
import { HomeComponent } from './components/home/home.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { ComparisonChartsComponent } from './components/comparison-charts/comparison-charts.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';
import { CreateSectorComponent } from './components/sectors/create-sector/create-sector.component';
import { CreateStockExchangeComponent } from './components/stock-exchanges/create-stock-exchange/create-stock-exchange.component';
import { CreateIpoComponent } from './components/ipos/create-ipo/create-ipo.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';



const routes: Routes = [
  {path:'',component:LoginButtonComponent},
  {path:'home',component:LandingComponent},
  //{path: 'home', component: HomeComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'ipos', component: IposComponent},
  {path: 'sectors', component: SectorsComponent},
  {path: 'stock-exchanges', component: StockExchangesComponent},
  {path: 'import-data', component: ImportDataComponent},
  {path: 'comparison-charts', component: ComparisonChartsComponent},
  {path:'login',component:LoginComponent},
  {path:'create-company',component:CreateCompanyComponent},
  {path:'create-sector', component:CreateSectorComponent},
  {path:'create-stock-exchange', component:CreateStockExchangeComponent},
  {path:'create-ipo', component:CreateIpoComponent}
];


@NgModule({
  declarations: [],
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
