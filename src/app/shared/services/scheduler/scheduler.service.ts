/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathConstant } from '../../constants/path.constant';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(
    private http: HttpClient
  ) { }

  getScheduleList(): Observable<any> {
    return this.http.get(PathConstant.SCHEDULES);
  }

  getScheduleDetailsById(scheduleId): Observable<any> {
    return this.http.get(`${PathConstant.SCHEDULES}/${scheduleId}`);
  }

  updateScheduleDetailsById(scheduleId, payload): Observable<any> {
    return this.http.put(`${PathConstant.SCHEDULES}/${scheduleId}`, payload);
  }

  createSchedule(payload): Observable<any> {
    return this.http.post(PathConstant.SCHEDULES, payload);
  }

  runScheduleNowById(scheduleId): Observable<any> {
    return this.http.get(`${PathConstant.RUN_SCHEDULE}/${scheduleId}`);
  }

  deleteSchedules(payload): Observable<any> {
    return this.http.delete(PathConstant.SCHEDULES, { body: payload });
  }

  getTestSuiteEnvList(): Observable<any> {
    return this.http.get(PathConstant.TEST_SUITE_ENV);
  }

  getSchedulerStatus(): Observable<any> {
    return this.http.get(PathConstant.SCHEDULER_STATUS);
  }

  startScheduler(): Observable<any> {
    return this.http.get(PathConstant.SCHEDULER_START);
  }

  stopScheduler(): Observable<any> {
    return this.http.get(PathConstant.SCHEDULER_STOP);
  }

  getAutoStart(): Observable<any> {
    return this.http.get(PathConstant.AUTO_START);
  }

  setAutoStart(payload): Observable<any> {
    return this.http.put(PathConstant.AUTO_START, payload);
  }

  getNotifierDetails(): Observable<any> {
    return this.http.get(PathConstant.NOTIFIER_CONFIGURATION);
  }

  updateNotifierDetails(notifierData) : Observable<any> {
    return this.http.put(PathConstant.NOTIFIER_CONFIGURATION,notifierData);
  }
}
