import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/models/area';
import { Skill } from 'src/app/models/skill';
import { Teams } from 'src/app/models/team';
import { AreaService } from 'src/app/services/area.service';
import { SkillService } from 'src/app/services/skill.service';
import { Utils } from 'src/app/utils/utils';
import { ModalCadastroAreaComponent } from '../modal-cadastro-area/modal-cadastro-area.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-cadastro-skill',
  templateUrl: './modal-cadastro-skill.component.html',
  styleUrls: ['./modal-cadastro-skill.component.scss']
})
export class ModalCadastroSkillComponent {

  displayedColumns: string[] = ['name'];
  skillRegistro: Skill = <Skill>{};
  areasRegistros: Array<Area> = []
  compareById = Utils.compareById;

  constructor(
    private serviceSkill: SkillService,
    private dialog: MatDialog,
    private areaService: AreaService,
    private modalCadastroArea: MatDialog,
    private modalSkill: MatDialogRef<ModalCadastroSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skill: Skill },

  ) { }


  ngOnInit(): void {

    if (this.data?.skill) {

      this.skillRegistro = this.data?.skill;

    }

    this.get();
    this.modalSkill.backdropClick().subscribe(
      () => this.closeModal()
    )
  }

  get(termoBusca?: string): void {

    this.areaService.get(termoBusca).subscribe({
      next: (resposta: Area[]) => {

        this.areasRegistros = resposta.sort((a, b) => a.name.localeCompare(b.name))

      },
    });
  }

  submit(form: NgForm) {

    if (!this.skillRegistro?.id) {

      this.serviceSkill.insert(this.skillRegistro).subscribe({

        complete: () => {

          form.resetForm();

        }
      })
    } else {
      
      this.serviceSkill.update(this.skillRegistro).subscribe({
        complete: () => {

          form.resetForm();

        }
      })

    }

    this.modalSkill.close({ createSkill: true })
    
  }

  newArea() {
    const refModal = this.modalCadastroArea.open(ModalCadastroAreaComponent, {

      width: '400px',
      height: '220px',

    })

    // Quando o modal é fechado os dados são recarregados
    refModal.afterClosed().subscribe(

      data => this.get()
    )
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Do you want to cancel the operation?",
        title: "Cancel skill registration"
      }
    })

    dialog.afterClosed().subscribe((
      data => {
        if (data?.resposta) {

          this.modalSkill.close();
        }
      }
    ))
  }

}
