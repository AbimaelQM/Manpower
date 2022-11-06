import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { Area } from 'src/app/models/area';
import { Person } from 'src/app/models/person';
import { PersonSkill } from 'src/app/models/personSkill';
import { Skill } from 'src/app/models/skill';
import { SkillLevel } from 'src/app/models/skillLevel';
import { AreaService } from 'src/app/services/area.service';
import { PersonSkillService } from 'src/app/services/person-skill.service';
import { PersonService } from 'src/app/services/person.service';
import { SkillLevelService } from 'src/app/services/skill-level.service';
import { SkillService } from 'src/app/services/skill.service';
import { Utils } from 'src/app/utils/utils';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-cadastro-person',
  templateUrl: './modal-cadastro-person.component.html',
  styleUrls: ['./modal-cadastro-person.component.scss']
})
export class ModalCadastroPersonComponent implements OnInit {

  areas: Array<Area> = []
  area: Area = <Area>{};

  expertises: Array<Skill> = []
  levels: Array<SkillLevel> = []

  personRegistro: Person = <Person>{};
  personSkillRegistro: PersonSkill = <PersonSkill>{};
  email = new FormControl('', [Validators.required, Validators.email]);
  compareById = Utils.compareById;
  disableSelectSkill: FormControl = new FormControl(true);
  disableSelectSubTeam: FormControl = new FormControl(true);
  changeValueSkill() {
    this.disableSelectSkill = new FormControl(false);
  }
  changeValueSubTeam() {
    this.disableSelectSubTeam = new FormControl(false);
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  public ctrlAreas: FormControl = new FormControl();
  public filterCtrlAreas: FormControl = new FormControl();
  public filteredAreas: ReplaySubject<Area[]> = new ReplaySubject(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;

  protected _onDestroy = new Subject();

  constructor(
    private areaService: AreaService,
    private expertiseService: SkillService,
    private levelService: SkillLevelService,
    private personService: PersonService,
    private personSkillService: PersonSkillService,
    private dialog: MatDialog,
    private modalPerson: MatDialogRef<ModalCadastroPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { person: any },

  ) { }
  divs: number[] = [];

  createDiv(): void {
    this.divs.push(this.divs.length);
  }
  ngOnInit(): void {

    if (this.data.person) {
      this.personRegistro = this.data?.person.person;
      this.personSkillRegistro = this.data?.person.skill;
    }

    this.modalPerson.backdropClick().subscribe(() => {
      this.closeModal();
    })
    this.areaService.get().subscribe({
      next: (register: Area[]) => {
        this.areas = register;
        this.filterArea()
      }
    })

    this.levelService.get().subscribe({
      next: (register: SkillLevel[]) => {
        this.levels = register;
      }
    })


  }

  //filtro Area----------------------------------------
  filterArea() {
    this.ctrlAreas.setValue(this.areas[1]);
    this.filteredAreas.next(this.areas.slice());

    this.filterCtrlAreas.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterAreas();
      });
  }

  //  ngAfterViewInit() {
  //   this.setInitialValue();
  // }

  ngOnDestroy() {
    this._onDestroy.next(0);
    this._onDestroy.complete();
  }


  protected setInitialValue() {
    this.filteredAreas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: Area, b: Area) => a && b && a.id === b.id;
      });
  }


  protected filterAreas() {
    if (!this.areas) {
      return;
    }

    let search = this.filterCtrlAreas.value;
    if (!search) {
      this.filteredAreas.next(this.areas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredAreas.next(
      this.areas.filter(area => area.name.toLowerCase().indexOf(search) > -1)
    );
  }

  //filtro fim -------------------------------
  getSkill(id: number) {
    if (id) {
      this.expertiseService.getSkill(id).subscribe({
        next: (register: Skill[]) => {
          this.expertises = register
        }
      })
    } else {
      return
    }
  }
  submit(form: NgForm) {
    let modifiedRegister = Object.assign({}, this.personRegistro);

    if (this.personRegistro.id) {
      this.personService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.personService.insert(modifiedRegister).subscribe(
        (data: Person) => {
          this.personSkillRegistro.person = data
          this.personSkillService.insert(this.personSkillRegistro)
          form.resetForm();
        }
      )
    }


    this.modalPerson.close({ createPerson: true })

  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Do you want to cancel the operation?",
        title: "Cancel person registration"
      }
    })

    dialog.afterClosed().subscribe((
      data => {
        if (data?.resposta) {

          this.modalPerson.close();
        }
      }
    ))
  }
}
