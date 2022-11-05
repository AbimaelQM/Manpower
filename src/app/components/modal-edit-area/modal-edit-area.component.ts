import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { MessagesBarService } from 'src/app/services/messages-bar.service';

@Component({
  selector: 'app-modal-edit-area',
  templateUrl: './modal-edit-area.component.html',
  styleUrls: ['./modal-edit-area.component.scss']
})
export class ModalEditAreaComponent implements OnInit {

  public area: Area = <Area>{};
  public areas: Area[] = [];
  public selecionado = false;

  constructor(
    private serviceArea: AreaService,
    private serviceMessageBar: MessagesBarService,
    private refModalEdit: MatDialogRef<ModalEditAreaComponent>
  ) { }

  ngOnInit(): void {

    this.get()
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

    this.selecionado = true;
  }

  submit(form: NgForm) {


    this.serviceArea.update(this.area).subscribe({

      next: (res:Area) => {

        this.areas.push(res)

        this.serviceMessageBar.sendMessage("Area edited successfully", 200)
        this.get()
        this.refModalEdit.close();

      },
      error: (error) => {
        this.serviceMessageBar.sendMessage("Area cannot be edited, please check the data provided", error.status)
      },
      complete: () => {
        
      }
    })

    form.resetForm();

  }

}
