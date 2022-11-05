import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType } from 'chart.js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit{

  @Input() public type: ChartType = 'bar';
  @Input() public label: string = 'active';
  @Input() public title: string = 'title aqui';
  @Input() public data = new Subject<ChartData>;
  @Input() public idGraphic: string = '';

  // const subject = new Subject<number>();
  public chart: Chart = <Chart>{};

  constructor() { }


  ngOnInit(): void {

    this.data.subscribe({
      next:(data)=>{

        this.drawChart(data);

      }
    })
   
  }



  drawChart(data:ChartData) {

    
    this.chart = new Chart(this.idGraphic, {
      type: this.type,
      data: data,
      options: {
        responsive:true,
        plugins: {
          
          title: {
            display: true,
            text: this.title
          }
        },

      },
      

    });

  }

  
}
