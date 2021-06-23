import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Sector } from '../../models/Sector';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  sectors : Sector[];
  isAdmin:boolean;
  constructor(private sectorService:SectorService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.getAllSectors()
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

  getAllSectors(){
    this.sectorService.getAllSectors()
      .subscribe(data=>
        this.sectors = data
      )
  }

  onDeleteClick(id : any,idx:any){
    this.sectorService.deleteSector(id);
    this.sectors.splice(idx,1);
  }
  
  editSector(sector :Sector){
    window.localStorage.removeItem("editSectorId");
    window.localStorage.setItem("editSectorId", sector.id!.toString());
    this.router.navigate(['/create-sector']);
  }
}
