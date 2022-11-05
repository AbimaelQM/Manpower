import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/models/job';
import { Teams } from 'src/app/models/team';
import { JobService } from 'src/app/services/job.service';
import { ModalCadastroJobComponent } from '../modal-cadastro-job/modal-cadastro-job.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalJobComponent } from '../modal-job/modal-job.component';

@Component({
  selector: 'app-lista-jobs',
  templateUrl: './lista-jobs.component.html',
  styleUrls: ['./lista-jobs.component.scss']
})
export class ListaJobsComponent implements OnInit {

  displayedColumns: string[] = ['person', 'type', 'skill', 'skillLevel', 'team', 'subteam', 'operations'];
  data: MatTableDataSource<Job> = new MatTableDataSource();
  totalElements: number = 0;

  @Output()
  public navTabEvent = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private jobService: JobService,
    private modalDelete: MatDialog,
    private modalEdit: MatDialog
  ) { }

  ngOnInit(): void {

    this.data =new MatTableDataSource();
    this.totalElements = 0
    this.getJobs({ page: "0", size: "10" });
  }

  private getJobs(request: any) {
    this.jobService.getAll(request)
      .subscribe({
        next: (page: any) => {
          this.data.data = page['content'];
          this.totalElements = page['totalElements'];
        }
      });
  }
  nextPage(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getJobs(request);
  }
  ngAfterViewInit() {
    this.ngOnInit()
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    
  }

  announceSortChange(sortState: Sort) {


    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public delete(item: Job) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {

      panelClass: ['modal-container'],
      autoFocus: false,
      data: {
        title: "Delete Job",
        message: "Confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.jobService.delete(item.id).subscribe({
          complete: () => {
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item: Job) {


    const modalEditRef = this.modalEdit.open(ModalCadastroJobComponent, {
      panelClass: ['modal-container'],
      disableClose: true,
      data: {
        job: item
      }

    })

    modalEditRef.afterClosed().subscribe(() => {

      this.ngOnInit;
    })
  }

  public open(item: Job) {


    const modalEditRef = this.modalEdit.open(ModalJobComponent, {
      minHeight: '100px',
      minWidth: '600px',
      panelClass: ['modal-container'],
      disableClose: true,
      data: {
        job: item
      }

    })

    modalEditRef.afterClosed().subscribe(() => {

      this.ngOnInit;
    })
  }
  public filtrar(value: string) {
    const filterValue = value;
    this.data.filter = filterValue.trim().toLowerCase();
    
  }

  public filtrarTeam(value:string){

    this.data.filter = value
    this.data.filterPredicate = (data:Job,value:string):boolean=>{
      
      
      return data.team.name == value;
    }


  }


  public navTab(indexTab: number) {

    this.navTabEvent.emit();

  }

}
