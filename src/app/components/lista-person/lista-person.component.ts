import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/models/person';
import { PersonSkill } from 'src/app/models/personSkill';
import { Skill } from 'src/app/models/skill';
import { PersonSkillService } from 'src/app/services/person-skill.service';
import { PersonService } from 'src/app/services/person.service';
import { ModalCadastroPersonComponent } from '../modal-cadastro-person/modal-cadastro-person.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

export interface personSkillType{
  person:Person,
  skill:PersonSkill
}
@Component({
  selector: 'app-lista-person',
  templateUrl: './lista-person.component.html',
  styleUrls: ['./lista-person.component.scss']
})

export class ListaPersonComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'skill', 'level', 'operations'];
  data: MatTableDataSource<any> = new MatTableDataSource();

  public personSkill:Array<PersonSkill>=[]
  public person:Array<Person>=[]
  public personSkillType:Array<personSkillType>=[]

  public totalElements: number = 0;
  public page:number = 0;
  public size: number = 10
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginador: MatPaginator = <MatPaginator>{};
  public pageEvent: PageEvent = new PageEvent;
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private personService: PersonService,
    private personSkillService: PersonSkillService,
    private modalDelete: MatDialog,
    private modalEdit: MatDialog
  ) { }

  ngAfterViewChecked() {
  }

  ngOnInit(): void {
    this.getPersons(this.page, this.size);
    this.personSkillService.get().subscribe({
      next:(skill:any)=>{
        this.personSkill = skill
      }
    })
  }

  private getPersons(page: number, size:number) {
    this.personService.getAll(page, size)
      .subscribe({
        next: (page: any) => {
          this.person = page['content'];
          this.personSkillType = []
          this.person.forEach((item)=>{
            if(item.id == this.personSkill[item.id-1].person.id){
              this.personSkillType.push({person:item, skill:this.personSkill[item.id-1]})
            }
            console.log(this.personSkill[item.id-1])

          })
          console.log(this.personSkillType)
          this.data.data = this.personSkillType
          this.totalElements = page['totalElements'];
        }
      });
  }
  nextPage(event:PageEvent) {
    this.page = event.pageIndex
    this.size = event.pageSize
    this.getPersons(this.page,this.size);
    return this.pageEvent
  }

  ngAfterViewInit() {
    this.ngOnInit()
    this.getPersons(this.page,this.size);
    this.data.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {


    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public delete(item: Person) {

    const modalDeleteRef = this.modalDelete.open(ModalConfirmComponent, {

      panelClass: ['modal-container'],
      autoFocus: false,
      data: {
        title: "Delete Skill",
        message: "Confirm the operation?"
      }
    })

    modalDeleteRef.afterClosed().subscribe((data) => {

      if (data?.resposta) {

        this.personService.delete(item.id).subscribe({
          complete: () => {
            this.ngOnInit();
          }
        })
      }
    })
  }

  public edit(item: Person) {


    const modalEditRef = this.modalEdit.open(ModalCadastroPersonComponent, {
      panelClass: ['modal-container'],
      disableClose: true,
      data: {
        person: item
      }

    })

    modalEditRef.afterClosed().subscribe((data) => {

      this.ngOnInit();
    })
  }

  public filtrar(value: string) {
    const filterValue = value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

}

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();


  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number,) => {
    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }
    
    page = page+1
    if(length==pageSize){
    length  = Math.floor(length/pageSize)
    }else{
      length  = Math.floor(length/pageSize)+1
    }
    return `Page ${page} of ${length}`;
  }

  return customPaginatorIntl;
}