/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app.constants';

@Injectable()
export class CookiesService {

  constructor() { }

  getCookie(name: string): string|null {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  setCookie(name: string, value: string, path: string = '', expireDays: number = 0) {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    let domain = window.location.hostname;
    document.cookie = `${name}=${value}; ${expires}${cpath};domain=${domain}`;
  }

  deleteCookie(name: string = AppConstants.loginCookieName) {
    this.setCookie(name, '', '/validator');
    this.setCookie(name, '', '/');
  }

}