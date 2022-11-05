import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  constructor(

    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },

  ) { }

  ngOnInit(): void {
    this.dialogRef.addPanelClass("modal-container");
    this.dialogRef.updateSize("300px", "200px");
  }

  confirm() {

    this.dialogRef.close({ resposta: true });
  }

  cancel() {

    this.dialogRef.close({ resposta: false });
  }

}
