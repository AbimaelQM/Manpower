import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type.service';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {

  public typeRegister: Type = <Type>{};
  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,
    private typeService: TypeService,
    @Inject(MAT_DIALOG_DATA) public data: { type: Type },
    ) { }

  ngOnInit(): void {

    if(this.data.type){
      this.typeRegister = this.data.type;
    }
    
  }


  submit(form:NgForm){
    let modifiedRegister = Object.assign({}, this.typeRegister);

    if (this.typeRegister.id) {
      this.typeService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.typeService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }


    this.modalOthers.close({ createType: true })
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to cancel operation?",
        title: "Cancel type registration"
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
