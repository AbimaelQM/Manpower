import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private servico: LoginService){}
  
  canActivate(route: ActivatedRouteSnapshot):boolean{

    const isAutenticado = this.servico.verificaLogin()

    if (isAutenticado) {
      const papelUsuario = this.servico.getPapel();
      const papelExigido = route.data['papel'];
      if (papelExigido && papelUsuario != papelExigido) {
        return false;
      }
      return true;
    }
    return false;
  }
  
}
