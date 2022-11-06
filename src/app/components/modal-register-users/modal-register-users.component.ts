import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { role } from 'src/app/models/roleEnum';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-register-users',
  templateUrl: './modal-register-users.component.html',
  styleUrls: ['./modal-register-users.component.scss']
})
export class ModalRegisterUsersComponent implements OnInit {

  public hide:boolean = true
  public hide2:boolean = true
  public passwordRepeat: string = '';
  public passwordIsEqual:boolean = false;
  public usuario: Usuario = <Usuario>{};
  public listRole: Array<{role:role,label:string}> = [
    {role:role.ROLE_ADMIN,label:"Admin"},
    {role:role.ROLE_SLT,label:"SLT"},
    {role:role.ROLE_USER,label:"User"},
  ]
  constructor(
    private usuarioservice: UsuarioService,
    private modalRef: MatDialogRef<ModalRegisterUsersComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {usuario:Usuario}
  ) { }

  ngOnInit(): void {

    this.usuario.active = true;

    if(this.data?.usuario){

      this.usuario = this.data.usuario;
    }
  }

  submit(form: NgForm) {
    
    if (this.usuario.id) {
      this.usuarioservice.update(this.usuario).subscribe({
        complete: () =>
        {
          form.resetForm();
        },
      });
    }
    else {
      this.usuarioservice.insert(this.usuario).subscribe({
        complete: () => {
          form.resetForm();
        },
      });
    }

    this.modalRef.close({newJob:true});
  }

  public validaSenha(){

    if(this.usuario.password != this.passwordRepeat)

      this.passwordIsEqual = true
    
    else
      
      this.passwordIsEqual = false

  }
  closeModal(){

    this.modalRef.close();
  }
}
