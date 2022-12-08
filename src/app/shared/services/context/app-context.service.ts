/*
 * ========================================================================
 * (c) Copyright 2022 NetIQ Corporation, a Micro Focus company. All Rights Reserved.
 * ========================================================================
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppContextService {

  constructor(private http: HttpClient,
  ) {
  }


  public load() {
    return new Promise((resolve, reject) => {
      // Validator UI is not loading if the browser locale is set to German.
      // Setting the locale to English for Validator 2.0.
      // @TODO: This needs to change when we support other locales
      let locale = "en"; //navigator.language;
      if (locale === 'zh-CN' || locale === 'zh-TW') {
        locale = locale.replace('-', '_');
      } else {
        locale = locale.slice(0, 2);
      }
      
    });
  }


  private getFilePath(filepath:any): Observable<any> {
    return this.http.get(filepath);
  }
}
