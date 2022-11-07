import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { MessagesBarService } from '../services/messages-bar.service';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessagesBarService,
    private loadingService: LoaderService

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("SESSION STORAGE clone");
    console.log(request.clone({
      
      withCredentials: true,
      setHeaders:{
        'Content-Type': 'application/json'
      }
    
    }));
    let cloneRequest = request.clone({
      
      withCredentials: true,
      setHeaders:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '/*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      }
    
    });

    // if (sessionStorage.getItem('basicauth')){
    //   cloneRequest = request.clone({
        
    //     setHeaders: {
    //       'Authorization': 'Basic' + sessionStorage.getItem('basicauth'),
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '/*',
    //       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //       'Access-Control-Allow-Headers':
    //       'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    //     }
  
    //   });
    // }    

    return next.handle(cloneRequest).pipe(
      tap({
        next: val => {
          
          this.loadingService.show()
         
        },
        error: error => {
          this.messageService.sendMessageResponseError(cloneRequest.method,error.status)
          this.loadingService.hide()
        },
        complete: () => {

          
          if(cloneRequest.method !== "GET"){

            this.messageService.sendMessageResponseSuccess(cloneRequest.method,200)
          }
          this.loadingService.hide()
        }
      })
    )

  }

}
