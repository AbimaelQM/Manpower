import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Type } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { TypeFormComponent } from '../type-form/type-form.component';


@Component({
  selector: 'app-lista-type',
  templateUrl: './lista-type.component.html',
  styleUrls: ['./lista-type.component.scss']
})
export class ListaTypeComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['type', 'operations'];
  data: MatTableDataSource<Type> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private typeService: TypeService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog
  ) { }

  ngOnInit(): void {
    this.typeService.get().subscribe({
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

  public delete(item: Type) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {
 
      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete Type",
        message: "Do you want to confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.typeService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:Type){
    
    
    const modalEditRef = this.modalEdit.open(TypeFormComponent,{
      minHeight: "100px",
      minWidth: "600px",
      panelClass:['modal-container'],
      disableClose:true,
      data:{
        type:item
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
