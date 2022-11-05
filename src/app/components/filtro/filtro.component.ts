import { Component, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public value:string = '';

  @Output()
  public eventoFiltro = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public filtroEvent(){

    this.eventoFiltro.emit({value:this.value});
  }


}
