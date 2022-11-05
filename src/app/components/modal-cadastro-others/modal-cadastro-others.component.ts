import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-modal-cadastro-others',
  templateUrl: './modal-cadastro-others.component.html',
  styleUrls: ['./modal-cadastro-others.component.scss']
})
export class ModalCadastroOthersComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,

  ) { }

  public tabIndex = 0;

  ngOnInit(): void {
    this.modalOthers.backdropClick().subscribe(()=>{
      this.closeModal();
    })
  }
  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Want to cancel operation?",
        title: "Cancel registrations"
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
