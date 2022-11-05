import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modality } from 'src/app/models/modality';
import { ModalityService } from 'src/app/services/modality.service';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modality-form',
  templateUrl: './modality-form.component.html',
  styleUrls: ['./modality-form.component.scss']
})
export class ModalityFormComponent implements OnInit {

  public modalityRegister: Modality = <Modality>{};
  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,
    private modalityService: ModalityService,
    @Inject(MAT_DIALOG_DATA) public data: { modality: Modality },
    ) { }

  ngOnInit(): void {

    if(this.data.modality){
      this.modalityRegister = this.data.modality;
    }

  }


  submit(form:NgForm){
    let modifiedRegister = Object.assign({}, this.modalityRegister);

    if (this.modalityRegister.id) {
      this.modalityService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.modalityService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }


    this.modalOthers.close({ createModality: true })
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to cancel operation?",
        title: "Cancel modality registration"
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
