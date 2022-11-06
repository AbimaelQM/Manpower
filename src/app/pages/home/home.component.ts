import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { CardsTeamComponent } from 'src/app/components/cards-team/cards-team.component';
import { ListaJobsComponent } from 'src/app/components/lista-jobs/lista-jobs.component';
import { ListaPersonComponent } from 'src/app/components/lista-person/lista-person.component';
import { ListaSkillComponent } from 'src/app/components/lista-skill/lista-skill.component';
import { Skill } from 'src/app/models/skill';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login-service.service';
import { SkillService } from 'src/app/services/skill.service';
import * as ts from 'typescript';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // this._router.routeReuseStrategy.shouldReuseRoute = () => false;

  public showFiller: boolean = true;
  public loggedIn: boolean = false;
  public user: SocialUser | undefined;
  public tabIndex = 2;
  googleLoginProvider = GoogleLoginProvider;

  @Input()
  public menuOpen: boolean = true;

  // Referência do componente filho da lista de skill
  @ViewChild(ListaSkillComponent)
  listaSkill: ListaSkillComponent = <ListaSkillComponent>{};

  @ViewChild(ListaPersonComponent)
  listaPerson: ListaPersonComponent = <ListaPersonComponent>{};

  @ViewChild(ListaJobsComponent)
  listaJob: ListaJobsComponent = <ListaJobsComponent>{};

  @ViewChild(CardsTeamComponent)
  listaTeam: CardsTeamComponent = <CardsTeamComponent>{};

  @ViewChild(MatTabGroup)
  tabs: MatTabGroup = <MatTabGroup>{};

  @ViewChild(ListaJobsComponent)
  listaJobs: ListaJobsComponent = <ListaJobsComponent>{};

  @ViewChild(CardsTeamComponent)
  cardsTeam: CardsTeamComponent = <CardsTeamComponent>{};


  dataSkill: Skill[] = [];
  public usuario: Usuario = <Usuario>{}
  constructor(
    private router: Router,
    private loginService: LoginService,
    private skillService: SkillService
  ) { }


  signOut(): void {

    this.loginService.confirmaLogout()

  }

  ngOnInit() {

    if (!this.loginService.isAutenticado()) {

      this.router.navigate(['/login'])
    }
    //@ts-ignore
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"))
    this.skillService.get().subscribe({
      next: (data) => {
        this.dataSkill = data;
      }
    })

  }

  // Metodo para tratar o evento lançao pelo cadastro de uma nova skill
  public interseptEventNewSkill(data: Event) {
    // Redireciona para tab da skill, fornecendo o indice da tab
    this.tabs.selectedIndex = 1

    // Chama o metodo init do componete lista skill para atualizar dados
    this.listaSkill.ngOnInit();
  }

  public interseptEventNewPerson(data: Event) {

    this.tabIndex = 3;
    this.listaPerson.ngOnInit();
  }

  public interseptEventNewJob(data: Event) {
    this.tabIndex = 0;
    this.listaJob.ngOnInit();
  }

  public interseptEventNewTeam(data: Event) {

 
    this.tabs.selectedIndex = 2

    this.listaTeam.ngOnInit();
  }


  public filtro(value: { value: string }) {

    this.listaSkill.filtrar(value.value);
    this.listaPerson.filtrar(value.value);
    this.listaJobs.filtrar(value.value);
  }

}
