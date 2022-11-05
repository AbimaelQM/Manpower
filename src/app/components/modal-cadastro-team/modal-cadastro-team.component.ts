import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Teams } from 'src/app/models/team';
import { Usuario } from 'src/app/models/usuario';
import { MessagesBarService } from 'src/app/services/messages-bar.service';
import { TeamService } from 'src/app/services/team.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from 'src/app/utils/utils';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-cadastro-team',
  templateUrl: './modal-cadastro-team.component.html',
  styleUrls: ['./modal-cadastro-team.component.scss'],
})
export class ModalCadastroTeamComponent implements OnInit {
  register: Teams = <Teams>{};
  user: Usuario = <Usuario>{};
  users: Array<Usuario> = [];
  compareById = Utils.compareById;

  constructor(
    private teamService: TeamService,
    private userService: UsuarioService,
    private dialog: MatDialog,
    private messageService: MessagesBarService,
    private modalTeam: MatDialogRef<ModalCadastroTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public team: { team: Teams }
  ) {}

  ngOnInit(): void {
    if (this.team?.team) {
      this.register = this.team.team;
    }
    this.getUsers();

    this.modalTeam.backdropClick().subscribe(() => this.closeModal());
  }

  getUsers() {
    this.userService.get().subscribe({
      next: (resposta: Usuario[]) => {
        this.users = resposta;
      },
    });
  }

  submit(form: NgForm) {
    let modifiedRegister = Object.assign({}, this.register);

    if (this.register.id) {
      this.teamService.update(modifiedRegister).subscribe({
        complete: () =>
        {
          form.resetForm();
        },
      });
    }
    else {
      this.teamService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        },
      });
    }

    this.modalTeam.close({newJob:true});
  }

  closeModal() {
    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: 'Do you want to cancel the operation?',
        title: 'Cancel team registration',
      },
    });

    dialog.afterClosed().subscribe((data) => {
      if (data?.resposta) {
        this.modalTeam.close();
      }
    });
  }
}
