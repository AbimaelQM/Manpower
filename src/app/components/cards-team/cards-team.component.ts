import { ModalCadastroTeamComponent } from './../modal-cadastro-team/modal-cadastro-team.component';
import { Teams } from './../../models/team';
import { TeamService } from './../../services/team.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalViewTeamComponent } from '../modal-view-team/modal-view-team.component';

@Component({
  selector: 'app-cards-team',
  templateUrl: './cards-team.component.html',
  styleUrls: ['./cards-team.component.scss'],
})
export class CardsTeamComponent implements OnInit {
  public teams: Array<Teams> = [];

  constructor(
    private teamService: TeamService,
    private modaledit:MatDialog,
    private modalDelete: MatDialog,
    private modalViewTeam: MatDialog,
    ) {}

  ngOnInit(): void {
  
    
    this.teamService.get().subscribe({
      next: (data) => {
        
        this.teams = data;
      },
    });
  }

 
  public edit(team:Teams){
   const ref = this.modaledit.open(ModalCadastroTeamComponent,{
      panelClass:['modal-container'],
      disableClose: true,
      data:{
        team:team
      }
      
    })
    ref.afterClosed().subscribe((data)=>{
      this.ngOnInit;
    })
  }
  public delete(item: Teams) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {

      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete Team",
        message: "Confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.teamService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public viewTeam(team:Teams){

    this.modalViewTeam.open(ModalViewTeamComponent,{
      panelClass: ['modal-container'],
      autoFocus:false,
      minWidth:"1040px",
      height:"99%",
      data: {
        team:team
      }
    })

  }


}
