/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {


  public static ConnectorConfigs = 'connectorConfigs';
  
  public static ConnectorTypes = {
    GenericActions: 'GenericActions',
    ADConnector: 'ADConnector',
    EDirConnector: 'EDirConnector',
    LDAPConnector: 'LDAPConnector'
  };

  public static GroupHeader = 'groupHeader';
  public static loginCookieName = 'Spiffy_Session';
  public static LOGGEDINUSER = 'admin';

  public static iconSuccessColor = 'rgba(0, 192, 62, 1)';
  public static iconFailureColor = 'rgba(255, 57, 62, 1)';
  public static debounceTimePeriod = 1000;
  public static fastDebounceTimePeriod = 200;

}
