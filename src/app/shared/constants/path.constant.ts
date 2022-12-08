/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { Injectable } from '@angular/core';

@Injectable()
export class PathConstant {


  public static HELP_LINK = 'https://www.netiq.com/documentation/identity-validator-2.0/';

  public static BASE_PATH = '/api/validator/v1';
  public static workspaceList = '/api/v0/workspaces';
  public static login = '/auth/basic/login';
  public static logout = '/api/validator/v1/user/logout';
  public static vaidator = '/api/validator/v1/schema';
  public static test = '/api/validator/v1/tests/tests/SampleHTTPTests.json';
  public static testSuite = '/api/validator/v1/testsuite/';
  public static templateList = '/api/validator/v1/template/';
  public static backupTestSuite = '/api/validator/v1/files/tests/backup/json';
  public static runTestPath = "/api/validator/v1/testsuite/{filePath}/{testId}/status";
  public static logResultPath = "/api/validator/v1/testsuite/{filePath}/log";
  public static testConnection = '/api/validator/v1/testsuite/{id}/testconnection';
  public static getIdmConnection = "/api/validator/v1/testsuite/{filePath}/idmconnections";
  public static dnQueryPath = "/api/validator/v1/testsuite/{filePath}/{connectionId}/query?dn={dn}&filter={filter}&type=children";
  public static dnDetailQueryPath = "/api/validator/v1/testsuite/{filePath}/{connectionId}/query?dn={dn}";
  public static attributeList = "/api/validator/v1/testsuite/{filePath}/{connectionId}/schema/{className}/attributes";
  public static classList = "/api/validator/v1/testsuite/{filePath}/{connectionId}/schema/classes";
  public static licenseInfo = "/api/validator/v1/license/info";
  public static reportUrl = '/api/validator/v1/reports/';
  public static jsRunPath = "/api/validator/v1/testsuite/{filePath}/runJavascript";
  public static encrypt = "/api/validator/v1/data/encrypt";
  public static EditKey = 'aanfj2qr042384';
  public static DBNAME = 'test';
  public static userStore = 'userStore';
  public static NEWCONNECTION = 'New Connection';
  public static CONNECTORALASS = { GenericActions: 'GenericActions' }
  public static BUILDINFO = 'build-info.json';
  public static event = { OPENTEST: 'OpenTest', TESTUPDATED: 'Testpdated', SOFTUPDATESIDEBAR: 'SoftupdateSideBar' };
  public static TESTCATEGORY = { TEST: 'TEST', PRETEST: 'PRETEST', POSTTEST: "POSTTEST" };
  public static LISTUSERS = "api/validator/v1/people";

  public static ws_logPath = `${window?.location?.protocol == 'http:' ? 'ws' : 'wss'}://${window.location.host}/socket/5010`;
  public static ws_logLogPath = '/api/validator/v1/ws/pollLogs';
  public static myProfile = "/api/v0/users/me";

  public static docURl = window.location.origin + window.location.pathname + "/assets/validator-administrator-and-user-guide.pdf";

  // Scheduler API Paths - Start
  public static SCHEDULER_BASE = PathConstant.BASE_PATH + '/scheduler';
  public static SCHEDULES = PathConstant.SCHEDULER_BASE + '/schedules';
  public static RUN_SCHEDULE = PathConstant.SCHEDULER_BASE + '/run';
  public static TEST_SUITE_ENV = PathConstant.testSuite + '?column=activeEnvironment';
  public static SCHEDULER_STATUS = PathConstant.SCHEDULER_BASE + '/status';
  public static SCHEDULER_START = PathConstant.SCHEDULER_BASE + '/start';
  public static SCHEDULER_STOP = PathConstant.SCHEDULER_BASE + '/stop';
  public static AUTO_START = PathConstant.SCHEDULER_BASE + '/autostart';
  // Scheduler API Paths - End

  //Notifier Settings
  public static NOTIFIER_CONFIGURATION = PathConstant.SCHEDULER_BASE + '/notifier';

}
