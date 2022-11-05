import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { MessagesBarService } from 'src/app/services/messages-bar.service';

@Component({
  selector: 'app-modal-cadastro-area',
  templateUrl: './modal-cadastro-area.component.html',
  styleUrls: ['./modal-cadastro-area.component.scss']
})
export class ModalCadastroAreaComponent implements OnInit {

  
  public area:Area = <Area>{};

  constructor(

    private areaService: AreaService,
    private messageBarService: MessagesBarService,
    private refModal: MatDialogRef<ModalCadastroAreaComponent>
  ) { }

  ngOnInit(): void {
  }

  createArea(form:NgForm){

    this.areaService.insert(this.area).subscribe({
      next:()=>{
        
      }
    })

    form.resetForm()

    this.refModal.close()

  }

}
