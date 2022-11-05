import { Component, OnInit, Inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/models/job';
import { SubTeam } from 'src/app/models/subteam';
import { Teams } from 'src/app/models/team';
import { JobService } from 'src/app/services/job.service';
import { SubTeamService } from 'src/app/services/sub-team.service';
import { ListaJobsComponent } from '../lista-jobs/lista-jobs.component';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { ModalCadastroSubteamComponent } from '../modal-cadastro-subteam/modal-cadastro-subteam.component';
import { ModalCadastroTeamComponent } from '../modal-cadastro-team/modal-cadastro-team.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-view-team',
  templateUrl: './modal-view-team.component.html',
  styleUrls: ['./modal-view-team.component.scss']
})
export class ModalViewTeamComponent implements OnInit {
  public team: Teams = <Teams>{};
  public labelSubTitle: string = "Total de jobs ";
  public quantJobOculpadas = 0;
  public porcent: number = 0;
  public labelTitle: string = '';
  public listaJobs: Array<Job> = [];
  public listaSubTeam: Array<SubTeam> = [];

  public colorPrimary: string = '#78C000'
  public colorSecondary: string = '#C7E596';

  @ViewChild(ListaJobsComponent)
  public listaJob: ListaJobsComponent = <ListaJobsComponent>{};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { team: Teams },
    private jobService: JobService,
    private subTeamService: SubTeamService,
    private modaledit: MatDialog,
    private subteamModal: MatDialog,
    private messageBar: MatSnackBar,
    private refConfirm: MatDialog,

  ) { }



  ngOnInit(): void {

    this.labelSubTitle = "Total de jobs "
    this.quantJobOculpadas = 0;
    this.porcent = 0;
    this.labelTitle = '';
    this.listaJobs = [];
    this.listaSubTeam = [];

    if (this.data?.team) {

      this.team = this.data?.team;
      this.labelSubTitle += this.team.job_quantity;
    }

    this.jobService.get().subscribe({
      next: (data) => {

        data.forEach(item => {
          if (item.team.id == this.team.id) {
            this.quantJobOculpadas++;
            this.listaJobs.push(item)
          }
        })

        this.labelTitle += this.quantJobOculpadas;
        this.porcent = Math.trunc(100 * this.quantJobOculpadas / this.team.job_quantity);


        this.listaJob.filtrarTeam(this.team.name)

        this.subTeamService.get().subscribe({
          next: (data: Array<SubTeam>) => {

            this.listaSubTeam = data.filter((subteam) => subteam.team.id == this.team.id);
          }
        })
      }
    })
  }

  public editTeam() {
    const ref = this.modaledit.open(ModalCadastroTeamComponent, {
      panelClass: ['modal-container'],
      disableClose: true,
      data: {
        team: this.team
      }

    })

    ref.afterClosed().subscribe((data) => {

      if (data != undefined)
        this.ngOnInit();
    })
  }

  public newSubteam() {

    const ref = this.subteamModal.open(ModalCadastroSubteamComponent, {
      panelClass: ['modal-container'],
      autoFocus: false,
      width: '20%',
      minHeight: '200px',
      data: {

        team: this.team
      }
    })

    ref.afterClosed().subscribe((data) => {

      if (data?.newSubteam) {

        this.ngOnInit()
      }
    })
  }

  public removeSubteam(subteam: SubTeam) {

    const ref = this.refConfirm.open(ModalConfirmComponent,{

      data:{
        title:"Confirm delete subteam",
        message:`Want to delete subteam ${subteam.name}`
      }
    })

    ref.afterClosed().subscribe((data)=>{

      if(data?.resposta){

        this.subTeamService.delete(subteam.id).subscribe({
          next: () => {
    
            this.ngOnInit();
          },
          error: (data) => {
    
            this.messageBar.openFromComponent(MessageBarComponent, {
    
              duration: 5 * 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              data: {
                message: "Subteam cannot be deleted",
                type: data.status
              }
    
            })
          }
        })

      }
    })
   
  }

  public editSubteam(subteam: SubTeam) {

    const ref = this.subteamModal.open(ModalCadastroSubteamComponent, {
      panelClass: ['modal-container'],
      autoFocus: false,
      width: '20%',
      minHeight: '200px',
      data: {
        subteam:subteam,
        team: this.team
      }
    })

    ref.afterClosed().subscribe((data) => {

      if (data?.newSubteam) {

        this.ngOnInit()
      }
    })

  }
}
