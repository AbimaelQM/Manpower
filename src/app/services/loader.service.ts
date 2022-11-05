import { Injectable } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public showSpinner= new Subject<boolean>();

  constructor() { }

  public show(){

    this.showSpinner.next(true)
  }

  public hide(){

    this.showSpinner.next(false);
  }
}
