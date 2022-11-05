import { Component, OnInit,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubTeam } from 'src/app/models/subteam';
import { Teams } from 'src/app/models/team';
import { SubTeamService } from 'src/app/services/sub-team.service';

@Component({
  selector: 'app-modal-cadastro-subteam',
  templateUrl: './modal-cadastro-subteam.component.html',
  styleUrls: ['./modal-cadastro-subteam.component.scss']
})
export class ModalCadastroSubteamComponent implements OnInit {

  public subteam: SubTeam = <SubTeam>{};
  public team: Teams = <Teams>{};

  constructor(
    private subteamService: SubTeamService,
    private  refModal: MatDialogRef<ModalCadastroSubteamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {team:Teams,subteam:SubTeam}
  ) { }


  ngOnInit(): void {

    if(this.data != undefined){
      this.team = this.data.team;
      if(this.data.subteam){

        this.subteam = this.data.subteam;
      }
    }
  }

  public submit(form: NgForm) {

    this.subteam.team = this.team;
    
    if(!this.subteam?.id){

      this.subteamService.insert(this.subteam).subscribe({
  
        next:(data)=>{

          this.refModal.close({
            newSubteam:data
          })
        }
      })

    }else{

      this.subteamService.update(this.subteam).subscribe({
  
        next:(data)=>{
          
          this.refModal.close({
            newSubteam:data
          })
        },
        error:(data)=>{

        }
      })
    }


  }

}
