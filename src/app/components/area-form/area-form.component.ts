import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {

  public areaRegister: Area = <Area>{};
  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,
    private areaService: AreaService,
    @Inject(MAT_DIALOG_DATA) public data: { area: Area },
    ) { }

  ngOnInit(): void {

    if(this.data.area){
      this.areaRegister = this.data.area;
    }
    
  }


  submit(form:NgForm){
    let modifiedRegister = Object.assign({}, this.areaRegister);

    if (this.areaRegister.id) {
      this.areaService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.areaService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }


    this.modalOthers.close({ createArea: true })
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to cancel operation?",
        title: "Cancel area registration"
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
