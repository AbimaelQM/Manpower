import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/models/area';
import { Skill } from 'src/app/models/skill';
import { AreaService } from 'src/app/services/area.service';
import { MessagesBarService } from 'src/app/services/messages-bar.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  
  displayedColumns: string[] = ['name'];
  area: Area = <Area>{};
  skill: Skill = <Skill>{};
  areas: Array<Area> = []

  constructor(
    private serviceSkill: SkillService,
    private areaService: AreaService,
    private message_bar: MatSnackBar,
    private messageService: MessagesBarService
  ) { }

  ngOnInit(): void {

    this.getAreas();
  }

  getAreas(termoBusca?: string): void {

    this.areaService.get(termoBusca).subscribe({
      next: (resposta: Area[]) => {
        this.areas = resposta;
        
      }
    });
  }
  
  create(form: NgForm){
    
    this.serviceSkill.insert(this.skill).subscribe({

      next: (resposta: Skill)=>{
   
        this.messageService.sendMessage('Saved successfully!',200);
      },
      error:(error)=>{
        const status  = parseInt(error.status)
        if(status >= 400 && status < 500){

          this.messageService.sendMessage('cannot be saved!',status);

        }else if(status >= 500 && status <= 599){

          this.messageService.sendMessage('Expertise não pode ser salvo!',status);

        }
      }
    })

    form.resetForm();
  }
}
