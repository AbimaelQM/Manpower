import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { MessagesBarService } from '../services/messages-bar.service';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login-service.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private usuario:Usuario=<Usuario>{}
  private user:any
  constructor(
    private messageService: MessagesBarService,
    private loadingService: LoaderService,
    private loginService: LoginService

  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.user = this.loginService.getUsuario;
    console.log(this.user)
    this.usuario = this.user
    console.log(this.usuario)
    const credenciaisCodificadas = btoa(this.usuario.email + ':' + this.usuario.password);

    // const opcoesHttp = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Basic ' + credenciaisCodificadas,
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Headers':
    //       'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    //   })
    // }

    const cloneRequest = request.clone({

      setHeaders: {
        'Authorization': 'Basic'+ credenciaisCodificadas,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '/*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      },
      withCredentials: true,

    });
    console.log(cloneRequest)
    console.log(request.headers)

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
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   console.log("SESSION STORAGE clone");
  //   console.log();
  //   let cloneRequest = request.clone({
      
  //     withCredentials: true,
  //     setHeaders:{
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '/*',
  //       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  //       'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  //     }
    
  //   });

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

    // return next.handle(cloneRequest)
  //   .pipe(
  //     tap({
  //       next: val => {
          
  //         this.loadingService.show()
         
  //       },
  //       error: error => {
  //         this.messageService.sendMessageResponseError(cloneRequest.method,error.status)
  //         this.loadingService.hide()
  //       },
  //       complete: () => {

          
  //         if(cloneRequest.method !== "GET"){

  //           this.messageService.sendMessageResponseSuccess(cloneRequest.method,200)
  //         }
  //         this.loadingService.hide()
  //       }
  //     })
  //   )

  // }

}
