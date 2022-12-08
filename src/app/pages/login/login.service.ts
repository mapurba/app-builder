/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { PathConstant } from 'src/app/shared/constants/path.constant';
import { CookiesService } from 'src/app/shared/utils/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userName: string = AppConstants.LOGGEDINUSER;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookiesService
  ) {
  }



  login(username = '', password = ''): Observable<any> {
    return this.http.post(PathConstant.login, { username, password });
  }

  getUserName() {
    return this.userName;
  }

  logout() {
    this.cookie.deleteCookie('Spiffy_Session');
    this.http.get(PathConstant.logout).subscribe();
  }

}
