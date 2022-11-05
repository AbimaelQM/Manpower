import { Component, OnInit } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";
import { LoginService } from 'src/app/services/login-service.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = <Usuario>{};
  
  constructor(
    private loginService: LoginService,
  ) { }

 

  signOut(): void {
    
    this.loginService.logout()
  }

  ngOnInit() {
  
  }
  
  submit(form: NgForm){
    this.loginService.login(this.usuario)
    form.resetForm();
  }
}
