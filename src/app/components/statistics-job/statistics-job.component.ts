import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subject } from 'rxjs';
import { DataStatics } from 'src/app/models/data-statics';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { StaticsService } from 'src/app/services/statics.service';
import { GraphicComponent } from '../graphic/graphic.component';


@Component({
  selector: 'app-statistics-job',
  templateUrl: './statistics-job.component.html',
  styleUrls: ['./statistics-job.component.scss']
})
export class StatisticsJobComponent implements OnInit {

  public chart: any;
  public dataStatic: DataStatics = <DataStatics>{};
  public propriedades: Array<string> = [];
  public datasetJobActive: ChartData = <ChartData>{};
  public datasetJobTeam: ChartData = <ChartData>{};
  public dataJobTeam = new Subject<ChartData>();
  public dataJobActive = new Subject<ChartData>();



  // public dataJob: Array<Job> = <Array<Job>>{};

  public grapichs: GraphicComponent = <GraphicComponent>{};

  constructor(
    private serviceStatics: StaticsService,
    private serviceJob: JobService
  ) { }



  ngOnInit(): void {

    this.getData();

  }

  getData() {

    this.serviceStatics.get("job").subscribe({
      next: (data: DataStatics) => {
        this.dataStatic = data;
        this.prepareDateGraphic();

      }

    })
  }

  public prepareDateGraphic() {


    let listaQuantidadeTeam: Array<number> = [];
    let listaLabelsTeam: Array<string> = [];
    let listaQuantidadeActive: Array<number> = [];
    let listaLabelsActive: Array<string> = [];

    this.dataStatic.data?.forEach(item => {

      
      // Pega os valores da propriedade active
      if (item.name == 'team') {

        item.itens.forEach(valor => {
        

          listaQuantidadeTeam.push(valor.quantidade);
          listaLabelsTeam.push(valor.label);


        });

      }


      if (item.name == 'active') {


        item.itens.forEach(valor => {
    
          listaQuantidadeActive.push(valor.quantidade);
          listaLabelsActive.push(valor.label=="true" ? "Hired":"TBH");

        });
      }
    })

    this.datasetJobActive.labels = listaLabelsActive;
    this.datasetJobActive.datasets = [{ label: "Number of jobs active", data: listaQuantidadeActive }]
    this.dataJobActive.next(this.datasetJobActive)

    this.datasetJobTeam.labels = listaLabelsTeam,
    this.datasetJobTeam.datasets = [{ label: "Number of jobs", data: listaQuantidadeTeam}]
    this.dataJobTeam.next(this.datasetJobTeam);


  }



}
