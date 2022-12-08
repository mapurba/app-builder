/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HeaderConstants } from '../constants/header.constant';
import { CookiesService } from '../utils/cookies.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class InterceptorService implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  replayRequestURL: string | Request | undefined;
  authenticationInProgress: boolean = false;
  cachedRequests: Array<HttpRequest<any>> = [];
  requestBackup: any;
  _next: any;


  constructor(private injector: Injector, private cookiesService: CookiesService, private router: Router) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    let spiffyCookie = this.cookiesService.getCookie('Spiffy_Session');
    if (spiffyCookie != undefined) {
      req = req.clone({ setHeaders: { Authorization: spiffyCookie } });
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this._next = next;
    return next.handle(this.addToken(req))
      .pipe(catchError((error: HttpErrorResponse) => {
        let { status } = error;
        switch (status) {
          case 401: {
            this.router.navigate(['/login'])
            return of(null);
          }
          default: return throwError(error);
        }

      }))
  }

  public collectFailedRequest(request:any): void {
    this.cachedRequests.push(request);
  }

  // handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> | any {
  //   this.collectFailedRequest(req);
  //   return this.authenticatedRequest(req, next);
  // }

  // authenticatedRequest(req: HttpRequest<any>, next: HttpHandler): any {
  //   let emitter;
  //   let loginFinishedObservable: Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> = new Observable(e => {
  //     emitter = e;
  //   });
  //   let loginFinishedCallback = (req) => {
  //     this.replayRequestURL = req.url;
  //     this.requestBackup = req;
  //     this.authenticationInProgress = false;
  //     emitter.next();
  //   }
  //   let loginFrameAddedCallback = (val) => {
  //     this.authenticationInProgress = val;
  //   };
  //   this.injector.get(AppAuthenticationService).startAuthentication(loginFinishedCallback, loginFrameAddedCallback, this.authenticationInProgress, req);
  //   return loginFinishedObservable.pipe(switchMap(() => {
  //     return next.handle(this.addToken(req));
  //   }));
  // }
}