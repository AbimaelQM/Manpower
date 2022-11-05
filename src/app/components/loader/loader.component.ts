import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  template: `<ngx-loading [show]="isShow"></ngx-loading>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {

  public isShow: boolean = false;

  constructor(
    private loadService: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {


  }


  ngOnInit(): void {


    this.loadService.showSpinner
      .pipe(
        tap((value) => {
          this.isShow = value
          this.cdr.detectChanges();
        })
      ).subscribe();

  }

}
