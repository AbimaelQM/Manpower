import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule, SocialUser } from "@abacritt/angularx-social-login";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCadastroComponent } from './components/add-cadastro/add-cadastro.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { MenusideComponent } from './components/menuside/menuside.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModalCadastroAreaComponent } from './components/modal-cadastro-area/modal-cadastro-area.component';
import { ModalEditAreaComponent } from './components/modal-edit-area/modal-edit-area.component';
import { ModalDeleteAreaComponent } from "./components/modal-delete-area/modal-delete-area.component";
import { ModalCadastroSkillComponent } from './components/modal-cadastro-skill/modal-cadastro-skill.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxLoadingModule } from "ngx-loading";
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ModalCadastroTeamComponent } from './components/modal-cadastro-team/modal-cadastro-team.component';
import { CardsTeamComponent } from './components/cards-team/cards-team.component';
import { ModalCadastroPersonComponent } from './components/modal-cadastro-person/modal-cadastro-person.component';
import { ListaSkillComponent } from './components/lista-skill/lista-skill.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { CustomPaginator, ListaPersonComponent } from "./components/lista-person/lista-person.component";
import { ModalCadastroJobComponent } from './components/modal-cadastro-job/modal-cadastro-job.component';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { ListaJobsComponent } from './components/lista-jobs/lista-jobs.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgParticlesModule } from "ng-particles";
import { ModalCadastroOthersComponent } from "./components/modal-cadastro-others/modal-cadastro-others.component";
import { TypeFormComponent } from './components/type-form/type-form.component';
import { ModalityFormComponent } from './components/modality-form/modality-form.component';
import { SkillLevelFormComponent } from './components/skill-level-form/skill-level-form.component';
import { StatisticsJobComponent } from './components/statistics-job/statistics-job.component';
import {NgChartsModule} from 'ng2-charts';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ModalJobComponent } from './components/modal-job/modal-job.component';
import {MatChipsModule} from '@angular/material/chips';
import { ListaAddressComponent } from "./components/lista-others/lista-address.component";
import { ListaTypeComponent } from "./components/lista-others/lista-type.component";
import { ListaModalityComponent } from "./components/lista-others/lista-modality.component";
import { ListaAreaComponent } from "./components/lista-others/lista-area.component";
import { ListaSkillLevelComponent } from "./components/lista-others/lista-skillLevel.component";
import { AreaFormComponent } from "./components/area-form/area-form.component";
import { ModalViewTeamComponent } from './components/modal-view-team/modal-view-team.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatListModule} from '@angular/material/list';
import { ModalCadastroSubteamComponent } from './components/modal-cadastro-subteam/modal-cadastro-subteam.component';
import { ModalRegisterUsersComponent } from './components/modal-register-users/modal-register-users.component';
import { ListaUsersComponent } from './components/lista-users/lista-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenusideComponent,
    HomeComponent,
    AddCadastroComponent,
    FiltroComponent,
    ModalConfirmComponent,
    ModalCadastroAreaComponent,
    ModalEditAreaComponent,
    ModalDeleteAreaComponent,
    ModalCadastroSkillComponent,
    LoaderComponent,
    AddressFormComponent,
    ModalCadastroTeamComponent,
    CardsTeamComponent,
    ModalCadastroPersonComponent,
    ListaSkillComponent,
    ListaPersonComponent,
    ModalCadastroJobComponent,
    ListaJobsComponent,
    NotFoundComponent,
    ModalCadastroOthersComponent,
    StatisticsJobComponent,
    GraphicComponent,
    TypeFormComponent,
    ModalityFormComponent,
    SkillLevelFormComponent,
    ModalJobComponent,
    ListaAddressComponent,
    ListaTypeComponent,
    ListaModalityComponent,
    ListaAreaComponent,
    ListaSkillLevelComponent,
    AreaFormComponent,
    ModalViewTeamComponent,
    ModalCadastroSubteamComponent,
    ModalRegisterUsersComponent,
    ListaUsersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SocialLoginModule,
    MatToolbarModule,
    MatDividerModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop:true
    }),
    MatPaginatorModule,
    MatSortModule,
    NgxMatSelectSearchModule,
    NgParticlesModule,
    NgChartsModule,
    MatChipsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      subtitle:"ola mundo"

      
    }),
    MatListModule
  ],
  providers: [
    SocialUser,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "883704034256-len7au3s09t51v40ss4k302m5ja4mjgf.apps.googleusercontent.com"
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,

    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
