import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { filter, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Area } from 'src/app/models/area';
import { Job } from 'src/app/models/job';
import { Modality } from 'src/app/models/modality';
import { Person } from 'src/app/models/person';
import { Skill } from 'src/app/models/skill';
import { SkillLevel } from 'src/app/models/skillLevel';
import { SubTeam } from 'src/app/models/subteam';
import { Teams } from 'src/app/models/team';
import { Type } from 'src/app/models/type';
import { AddressService } from 'src/app/services/address.service';
import { AreaService } from 'src/app/services/area.service';
import { JobService } from 'src/app/services/job.service';
import { ModalityService } from 'src/app/services/modality.service';
import { PersonService } from 'src/app/services/person.service';
import { SkillLevelService } from 'src/app/services/skill-level.service';
import { SkillService } from 'src/app/services/skill.service';
import { SubTeamService } from 'src/app/services/sub-team.service';
import { TeamService } from 'src/app/services/team.service';
import { TypeService } from 'src/app/services/type.service';
import { Utils } from 'src/app/utils/utils';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-cadastro-job',
  templateUrl: './modal-cadastro-job.component.html',
  styleUrls: ['./modal-cadastro-job.component.scss']
})
export class ModalCadastroJobComponent implements OnInit {

  jobRegister: Job = <Job>{};
  jobTeste: Job = <Job>{};
  area: Area = <Area>{};
  areaArray = []
  team: Teams = <Teams>{};
  areas: Array<Area> = []
  expertises: Array<Skill> = []
  levels: Array<SkillLevel> = []
  types: Array<Type> = []
  modalities: Array<Modality> = []
  teams: Array<Teams> = []
  subTeams: Array<SubTeam> = []
  addresses: Array<Address> = []
  people: Array<Person> = []

  compareById = Utils.compareById;
  disableSelectSkill: FormControl = new FormControl(true);
  disableSelectSubTeam: FormControl = new FormControl(true);
  changeValueSkill() {
    this.disableSelectSkill = new FormControl(false);
  }
  changeValueSubTeam() {
    this.disableSelectSubTeam = new FormControl(false);
  }

  public ctrlAreas: FormControl = new FormControl();
  public filterCtrlAreas: FormControl = new FormControl();
  public ctrlTeams: FormControl = new FormControl();
  public filterCtrlTeams: FormControl = new FormControl();
  public ctrlPerson: FormControl = new FormControl();
  public filterCtrlPerson: FormControl = new FormControl();
  public filteredAreas: ReplaySubject<Area[]> = new ReplaySubject(1);
  public filteredPersons: ReplaySubject<Person[]> = new ReplaySubject(1);
  public filteredTeams: ReplaySubject<Teams[]> = new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;

  protected _onDestroy = new Subject();


  constructor(
    private jobService: JobService,
    private areaService: AreaService,
    private expertiseService: SkillService,
    private levelService: SkillLevelService,
    private typeService: TypeService,
    private modalityService: ModalityService,
    private teamService: TeamService,
    private subTeamService: SubTeamService,
    private addressService: AddressService,
    private personService: PersonService,
    private dialog: MatDialog,
    private modalJob: MatDialogRef<ModalCadastroJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: Job },

  ) { }


  ngOnInit(): void {

    if (this.data?.job) {
      this.changeValueSkill()
      this.changeValueSubTeam()
      this.jobRegister = this.data.job;
      this.getSkill(this.data.job.area.id)
      this.getSubTeams(this.data.job.team.id)
    }

    this.modalJob.backdropClick().subscribe(() => {
      this.closeModal();
    })

    this.personService.getPersonFree().subscribe({
      next: (register: Person[]) => {
        this.people = register
        if (this.jobRegister.person) {
          this.people.push(this.jobRegister.person)
          this.filterPerson()
        }
      }
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

    this.teamService.get().subscribe({
      next: (register: Teams[]) => {
        this.teams = register;
        this.filterTeam()

      }
    })

    this.addressService.get().subscribe({
      next: (register: Address[]) => {
        this.addresses = register;
      }
    },

    )

    this.typeService.get().subscribe({
      next: (register: Type[]) => {
        this.types = register;
      }
    })

    this.modalityService.get().subscribe({
      next: (register: Modality[]) => {
        this.modalities = register;
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
  filterPerson() {
    this.ctrlPerson.setValue(this.people[1]);
    this.filteredPersons.next(this.people.slice());

    this.filterCtrlPerson.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPersons();
      });
  }

  protected filterPersons() {
    if (!this.people) {
      return;
    }

    let search = this.filterCtrlPerson.value;
    if (!search) {
      this.filteredPersons.next(this.people.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredPersons.next(
      this.people.filter(person => person.name.toLowerCase().indexOf(search) > -1)
    );
  }

  //filtro Skill----------------------------------------
  filterTeam() {
    this.ctrlTeams.setValue(this.teams[1]);
    this.filteredTeams.next(this.teams.slice());

    this.filterCtrlTeams.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTeams();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }


  protected setInitialValueTeams() {
    this.filteredTeams
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: Teams, b: Teams) => a && b && a.id === b.id;
      });
  }


  protected filterTeams() {
    if (!this.teams) {
      return;
    }

    let search = this.filterCtrlTeams.value;
    if (!search) {
      this.filteredTeams.next(this.teams.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredTeams.next(
      this.teams.filter(team => team.name.toLowerCase().indexOf(search) > -1)
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
  getSubTeams(id: number) {
    this.subTeamService.getSubTeam(id).subscribe({
      next: (register: SubTeam[]) => {
        this.subTeams = register
      }
    })
  }

  removePerson() {
    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to remove person?",
        title: "Remove person"
      }
    })

    dialog.afterClosed().subscribe((
      data => {
        if (data?.resposta) {
          this.jobRegister.person = null
        }
      }
    ))
  }




  submit(form: NgForm) {
    let modifiedRegister = Object.assign({}, this.jobRegister);

    if (this.jobRegister.id) {
      this.jobService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })

    } else {
      this.jobService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })

    }


    this.modalJob.close(
      { createJob: true }
    )


  }


  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Do you want to cancel the operation?",
        title: "Cancel job registration"
      }
    })

    dialog.afterClosed().subscribe((
      data => {
        if (data?.resposta) {
          this.modalJob.close();
        }
      }
    ))
  }
}
