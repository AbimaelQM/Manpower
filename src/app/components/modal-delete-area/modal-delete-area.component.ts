import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { MessagesBarService } from 'src/app/services/messages-bar.service';

@Component({
  selector: 'app-modal-delete-area',
  templateUrl: './modal-delete-area.component.html',
  styleUrls: ['./modal-delete-area.component.scss']
})
export class ModalDeleteAreaComponent implements OnInit {

  public area: Area = <Area>{};
  public areas: Area[] = [];
  public selecionado = false;
  constructor(
    private serviceArea: AreaService,
    private serviceMessageBar: MessagesBarService,
    private refModalDelete: MatDialogRef<ModalDeleteAreaComponent>
  ) { }

  ngOnInit(): void {

    this.get();
  }

  get() {

    this.serviceArea.get().subscribe({

      next: (data) => {
        this.areas = data.sort((a,b)=> a.name.localeCompare(b.name))
      },
      error: (error) => {

        this.serviceMessageBar.sendMessage("Areas cannot be loaded", error.status)
      }
    })
  }

  select(areaSelect: Area) {

    this.area = areaSelect;
  }

  submit(form:NgForm){

    const id = this.area.id;
    this.serviceArea.delete(id).subscribe({

      next: (data)=>{

        this.serviceMessageBar.sendMessage("Successfully deleted area",200);
        this.refModalDelete.close();
      },
      error:(error)=>{
        this.serviceMessageBar.sendMessage("Unable to delete area",error.status);        
      }
    })
    this.get();
    form.resetForm();
  }
}
