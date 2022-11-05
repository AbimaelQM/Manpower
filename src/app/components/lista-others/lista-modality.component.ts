import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Modality } from 'src/app/models/modality';
import { ModalityService } from 'src/app/services/modality.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalityFormComponent } from '../modality-form/modality-form.component';


@Component({
  selector: 'app-lista-modality',
  templateUrl: './lista-modality.component.html',
  styleUrls: ['./lista-modality.component.scss']
})
export class ListaModalityComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['modality', 'operations'];
  data: MatTableDataSource<Modality> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private modalityService: ModalityService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog
  ) { }

  ngOnInit(): void {
    this.modalityService.get().subscribe({
      next: (values) => {
        this.data.data = values
      }
    })
  }


  ngAfterViewInit() {
    this.ngOnInit()
    this.data.paginator = this.paginador;
    this.data.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {


    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public delete(item: Modality) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {
 
      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete Modality",
        message: "Do you want to confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.modalityService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:Modality){
    
    
    const modalEditRef = this.modalEdit.open(ModalityFormComponent,{
      minHeight: "100px",
      minWidth: "600px",
      panelClass:['modal-container'],
      disableClose:true,
      data:{
        modality:item
      }

    })

    modalEditRef.afterClosed().subscribe((data)=>{
    
      this.ngOnInit();
    })
  }
  public filtrar(value: string) {
    const filterValue = value;
    this.data.filter = filterValue.trim().toLowerCase();
  }
}
