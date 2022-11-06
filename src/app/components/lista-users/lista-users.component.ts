import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalRegisterUsersComponent } from '../modal-register-users/modal-register-users.component';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.scss']
})
export class ListaUsersComponent implements OnInit {


  displayedColumns: string[] = ['email','name', 'role', 'status','operations'];
  data: MatTableDataSource<Usuario> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private usuarioService: UsuarioService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog,
    private modalAddUser:MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe({
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

  public delete(item: Usuario) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {
 
      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete Skill",
        message: "Confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.usuarioService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:Usuario){
    
    
    const modalEditRef = this.modalEdit.open(ModalRegisterUsersComponent,{
      panelClass:['modal-container'],
      disableClose:true,
      minWidth:"400px",
      minHeight:"450px",
      data:{
        usuario:item
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

  public addUser(){

    const modal = this.modalAddUser.open(ModalRegisterUsersComponent,{
      minWidth:"400px",
      minHeight:"450px",
      panelClass:['modal-container'],
      disableClose:true,
    })

  }
}
