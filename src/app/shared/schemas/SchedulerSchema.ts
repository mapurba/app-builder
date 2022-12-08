/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
export class SchedulerSchema {
    id: string;
    name: string;
    recipients: string;
    subject: string;
    body: string;
    attachLog: boolean;
    enabled: boolean;
    testSuites: SchedulerTestSuiteSchema;
    interval: string;

    constructor(inputSchema: SchedulerInternalSchema) {
        this.id = inputSchema.scheduleId;
        this.name = inputSchema.scheduleName;
        this.recipients = inputSchema.recipientMail;
        this.subject = inputSchema.mailSubject;
        this.body = inputSchema.mailBody;
        this.attachLog = inputSchema.enableLog;
        this.enabled = inputSchema.enableSchedule;
        this.testSuites = inputSchema.testSuites;
        this.interval = inputSchema.interval;
    }
}

class SchedulerInternalSchema {
    scheduleId: string;
    scheduleName: string;
    recipientMail: string;
    mailSubject: string;
    mailBody: string;
    enableLog: boolean;
    enableSchedule: boolean;
    testSuites: SchedulerTestSuiteSchema;
    interval: string;
}

export class SchedulerTestSuiteSchema {
    name: string;
    filename: string;
    activeEnvironment: string;
    
    constructor(inputSchema: SchedulerTestSuiteInternalSchema) {
        this.name = inputSchema.displayname;
        this.filename = inputSchema.filename;
        this.activeEnvironment = inputSchema.selectedEnvironment;
    }
}

class SchedulerTestSuiteInternalSchema {
    displayname: string;
    filename: string;
    activeEnvironment: Array<string>;
    selectedEnvironment: string;
    selected: boolean;
}
