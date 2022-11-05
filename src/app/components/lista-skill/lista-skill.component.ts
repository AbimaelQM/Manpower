import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalCadastroSkillComponent } from '../modal-cadastro-skill/modal-cadastro-skill.component';


@Component({
  selector: 'app-lista-skill',
  templateUrl: './lista-skill.component.html',
  styleUrls: ['./lista-skill.component.scss']
})
export class ListaSkillComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['area', 'name', 'operations'];
  data: MatTableDataSource<Skill> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private skillService: SkillService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog
  ) { }

  ngOnInit(): void {
    this.skillService.get().subscribe({
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

  public delete(item: Skill) {

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

        this.skillService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:Skill){
    
    
    const modalEditRef = this.modalEdit.open(ModalCadastroSkillComponent,{
      panelClass:['modal-container'],
      disableClose:true,
      data:{
        skill:item
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
