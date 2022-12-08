/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { PathConstant } from '../../constants/path.constant';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {


  pollLogs(path): Observable<any> {
    return this.http.post(PathConstant.ws_logLogPath, { "text": path });
  }

  _logs = new BehaviorSubject({ log: '', replace: false });

  _openLogs = new BehaviorSubject({ open: false });

  constructor(private http: HttpClient) { }

  appendTo(log, replace = false) {
    this._logs.next({ log: log, replace });
  }
  get logs() {
    return this._logs;
  }

  set openLogs(open: boolean) {
    this._openLogs.next({ open });
  }
  get openLogs(): any {
    return this._openLogs;
  }
}
