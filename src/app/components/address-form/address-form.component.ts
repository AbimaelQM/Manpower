import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  public addressRegister: Address = <Address>{};
  constructor(
    private dialog: MatDialog,
    private modalOthers: MatDialogRef<ModalCadastroOthersComponent>,
    private addressService: AddressService,
    @Inject(MAT_DIALOG_DATA) public data: { address: Address },
    ) { }

  ngOnInit(): void {

    if(this.data.address){
      this.addressRegister = this.data.address;
    }

  }


  submit(form:NgForm){
    let modifiedRegister = Object.assign({}, this.addressRegister);

    if (this.addressRegister.id) {
      this.addressService.update(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    } else {
      this.addressService.insert(modifiedRegister).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }


    this.modalOthers.close({ createAddress: true })
  }

  closeModal() {

    const dialog = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: "Do you want to cancel the operation?",
        title: "Cancel address registration"
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

