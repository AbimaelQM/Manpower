import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { AddressFormComponent } from '../address-form/address-form.component';


@Component({
  selector: 'app-lista-address',
  templateUrl: './lista-address.component.html',
  styleUrls: ['./lista-address.component.scss']
})
export class ListaAddressComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['country', 'state', 'city', 'operations'];
  data: MatTableDataSource<Address> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private addressService: AddressService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog
  ) { }

  ngOnInit(): void {
    this.addressService.get().subscribe({
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

  public delete(item: Address) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {
 
      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete Address",
        message: "Do you want to confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.addressService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:Address){
    
    
    const modalEditRef = this.modalEdit.open(AddressFormComponent,{
      minHeight: "100px",
      minWidth: "600px",
      panelClass:['modal-container'],
      disableClose:true,
      data:{
        address:item
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
