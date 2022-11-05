import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss']
})
export class ModalCadastroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalCadastroComponent>) { }

  ngOnInit(): void {
    
    this.dialogRef.addPanelClass(['modal-container','modal-containe'])
  }

  public close(){

    this.dialogRef.close()
  }


}
