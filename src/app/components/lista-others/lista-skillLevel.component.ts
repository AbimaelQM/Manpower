import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SkillLevel } from 'src/app/models/skillLevel';
import { SkillLevelService } from 'src/app/services/skill-level.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { SkillLevelFormComponent } from '../skill-level-form/skill-level-form.component';


@Component({
  selector: 'app-lista-skill-level',
  templateUrl: './lista-skillLevel.component.html',
  styleUrls: ['./lista-skillLevel.component.scss']
})
export class ListaSkillLevelComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['skillLevel', 'operations'];
  data: MatTableDataSource<SkillLevel> = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private skillLevelService: SkillLevelService,
    private modalDelete: MatDialog,
    private modalEdit:MatDialog
  ) { }

  ngOnInit(): void {
    this.skillLevelService.get().subscribe({
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

  public delete(item: SkillLevel) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {
 
      panelClass: ['modal-container'],
      autoFocus:false,
      data: {
        title: "Delete SkillLevel",
        message: "Do you want to confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.skillLevelService.delete(item.id).subscribe({
          complete:()=>{
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item:SkillLevel){
    
    
    const modalEditRef = this.modalEdit.open(SkillLevelFormComponent,{
      minHeight: "100px",
      minWidth: "600px",
      panelClass:['modal-container'],
      disableClose:true,
      data:{
        skillLevel:item
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
