import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillLevel } from 'src/app/models/skillLevel';
import { SkillLevelService } from 'src/app/services/skill-level.service';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-skill-level-form',
  templateUrl: './skill-level-form.component.html',
  styleUrls: ['./skill-level-form.component.scss']
})
export class SkillLevelFormComponent implements OnInit {

  public skillLevelRegister: SkillLevel = <SkillLevel>{};
  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,
    private skillLevelService: SkillLevelService,
    @Inject(MAT_DIALOG_DATA) public data: { skillLevel: SkillLevel },
    ) { }

  ngOnInit(): void {

    if(this.data.skillLevel){
      this.skillLevelRegister = this.data.skillLevel;
    }

  }


  submit(form:NgForm){
    let modifiedRegister = Object.assign({}, this.skillLevelRegister);

    if (this.skillLevelRegister.id) {
      this.skillLevelService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.skillLevelService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }


    this.modalOthers.close({ createSkillLevel: true })
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to cancel operation?",
        title: "Cancel skill level registration"
      }
    })

    dialog.afterClosed().subscribe((
      data => {
        if (data?.resposta) {

          this.modalOthers.close();
        }
      }
    ))
  }

}
