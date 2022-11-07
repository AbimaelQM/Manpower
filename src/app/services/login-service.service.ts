import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { Usuario } from '../models/usuario';
import { MessagesBarService } from './messages-bar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario = <Usuario>{};
  private authenticated: boolean = false;
  private header:any

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private serviceMessage: MessagesBarService,

  ) { }

  isAutenticado(): boolean {

    return this.authenticated;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  setUsuario(usuario: Usuario) {

    this.usuario = usuario;

  }

  getPapel(): string {
    return this.usuario.role;
  }

  verificaLogin(): boolean {
    if (!this.isAutenticado()) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
      if (Object.keys(this.usuario).length > 0) {
        this.authenticated = true;
      } else {
        this.router.navigate(['/login']);
      }
    }
    return this.isAutenticado();
  }

  login(usuario: Usuario) {

    this.usuario = usuario;
    const credenciaisCodificadas = btoa(usuario.email + ':' + usuario.password);

    const opcoesHttp = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + credenciaisCodificadas,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }
    let url = environment.apiUrl + '/user_info/';

    this.http.get<Usuario>(url, opcoesHttp).subscribe({
      next: (usuario: Usuario) => {
        if (usuario) {
          this.authenticated = true;
          this.usuario = usuario;
          let authString = credenciaisCodificadas;
          sessionStorage.setItem('basicauth', authString);
          sessionStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['/home']);
        }
      },

      error: (error) => {

        this.serviceMessage.sendMessage("Login or password invalid", 401)

      },


    })

  }

  logout(): void {

    let url = environment.apiUrl + '/logout';
    this.http.get(url).subscribe({
      complete: () => {
        this.authenticated = false;
        this.usuario = <Usuario>{};
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('basicauth');
        this.router.navigate(['/login']);
      }
    })
  }

  confirmaLogout() {

    const dialogRef = this.dialog.open(
      ModalConfirmComponent,
      {
        width: '400px',
        height: '200px',
        panelClass: ['modal-container'],
        data: {
          title: "Logout",
          message: "Confirm the operation?"
        }

      }
    )

    dialogRef.afterClosed().subscribe(

      data => {
        if (data?.resposta) {

          this.logout();
        }
      }
    )
  }


}
