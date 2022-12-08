/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { Injectable } from "@angular/core";
import { SchedulerSchema, SchedulerTestSuiteSchema } from "../schemas/SchedulerSchema";
import { TranslateService } from "../services/translate/translate.service";
import { VariableService } from "./Variable.service";

@Injectable({ providedIn: 'root' })
export class SchedulerUtil {

    private timelineOptions = [
        {
            id: 0,
            displayName: this.translate.get('minute')
        },
        {
            id: 1,
            displayName: this.translate.get('hour')
        },
        {
            id: 2,
            displayName: this.translate.get('day')
        },
        {
            id: 3,
            displayName: this.translate.get('week')
        },
        {
            id: 4,
            displayName: this.translate.get('month')
        },
        {
            id: 5,
            displayName: this.translate.get('year')
        }
    ];
    private dayOptions = [
        {
            id: 0,
            displayName: this.translate.get('Sunday')
        },
        {
            id: 1,
            displayName: this.translate.get('Monday')
        },
        {
            id: 2,
            displayName: this.translate.get('Tuesday')
        },
        {
            id: 3,
            displayName: this.translate.get('Wednesday')
        },
        {
            id: 4,
            displayName: this.translate.get('Thursday')
        },
        {
            id: 5,
            displayName: this.translate.get('Friday')
        },
        {
            id: 6,
            displayName: this.translate.get('Saturday')
        }
    ];
    private monthOptions = [
        {
            id: 1,
            displayName: this.translate.get('January')
        },
        {
            id: 2,
            displayName: this.translate.get('February')
        },
        {
            id: 3,
            displayName: this.translate.get('March')
        },
        {
            id: 4,
            displayName: this.translate.get('April')
        },
        {
            id: 5,
            displayName: this.translate.get('May')
        },
        {
            id: 6,
            displayName: this.translate.get('June')
        },
        {
            id: 7,
            displayName: this.translate.get('July')
        },
        {
            id: 8,
            displayName: this.translate.get('August')
        },
        {
            id: 9,
            displayName: this.translate.get('September')
        },
        {
            id: 10,
            displayName: this.translate.get('October')
        },
        {
            id: 11,
            displayName: this.translate.get('November')
        },
        {
            id: 12,
            displayName: this.translate.get('December')
        }
    ];
    private dateOptions = [...Array(31).fill(null).map((val, index) => { return (index + 1).toString() })];
    private hourOptions = [...Array(24).fill(null).map((val, index) => { return (index).toString() })];
    private minutesOptions = [...Array(60).fill(null).map((val, index) => { return (index).toString() })];

    private readonly defaultSubject = "Test run: ${suite.displayname} (${suite.status})";
    private readonly defaultBody = "<h3>${suite.displayname}</h3>\n<ul>\n    <li>Test run: ${suite.filename}</li>\n    <li>Status: ${suite.status}</li>\n    <li>Start: ${suite.start}</li>\n    <li>Finish: ${suite.end}</li>\n    <li>Error: ${suite.error}</li>\n</ul>";

    constructor(private translate: TranslateService) { }

    getDefaultSubject() {
        return this.defaultSubject;
    }

    getDefaultBody() {
        return this.defaultBody;
    }

    getTimelineOptions() {
        return this.timelineOptions;
    }

    getDayOptions() {
        return this.dayOptions;
    }

    getMonthOptions() {
        return this.monthOptions;
    }

    getDateOptions() {
        return this.dateOptions;
    }

    getHourOptions() {
        return this.hourOptions;
    }

    getMinuteOptions() {
        return this.minutesOptions;
    }

    createSchedulePayload(modifiedScheduleDetails): any {
        modifiedScheduleDetails['interval'] = this.encodeInterval(
            modifiedScheduleDetails.timeline?.id,
            modifiedScheduleDetails.day?.id,
            modifiedScheduleDetails.month?.id,
            modifiedScheduleDetails.date,
            modifiedScheduleDetails.hour,
            modifiedScheduleDetails.minutes
        )
        const outputSchema = new SchedulerSchema(modifiedScheduleDetails);
        let payload = { ...outputSchema };
        return payload;
    }

    updateTestSuiteStructure(testSuiteArray: Array<any>) {
        let newTestSuite = [];
        testSuiteArray.forEach(
            (element) => {
                newTestSuite.push(new SchedulerTestSuiteSchema(element));
            }
        );
        return newTestSuite;
    }

    encodeInterval(timeline, day, month, date, hour, minute) {
        let interval: string;
        switch (timeline) {
            case 0:
                // Every Minute
                interval = `* * * * *`;
                break;
            case 1:
                // Every Hour
                interval = `${minute} * * * *`;
                break;
            case 2:
                // Every Day
                interval = `${minute} ${hour} * * *`;
                break;
            case 3:
                // Every Week
                interval = `${minute} ${hour} * * ${day}`;
                break;
            case 4:
                // Every Month
                interval = `${minute} ${hour} ${date} * *`;
                break;
            case 5:
                // Every Year
                interval = `${minute} ${hour} ${date} ${month} *`;
                break;
        }
        return interval;
    }

    decodeInterval(interval: string) {
        let minutes, hour, date, month, day, timeline;
        [minutes, hour, date, month, day] = interval.split(' ');
        if (!VariableService.equals('*', day)) {
            timeline = 3; // Every Week

        } else if (!VariableService.equals('*', month)) {

            timeline = 5; // Every Year
        } else if (!VariableService.equals('*', date)) {

            timeline = 4; // Every Month
        } else if (!VariableService.equals('*', hour)) {

            timeline = 2; // Every Day
        } else if (!VariableService.equals('*', minutes)) {

            timeline = 1; // Every Hour
        } else {
            timeline = 0;
        }
        minutes = this.getIntegerOptionFromString(minutes);
        hour = this.getIntegerOptionFromString(hour);
        date = this.getIntegerOptionFromString(date);
        month = this.getIntegerOptionFromString(month);
        day = this.getIntegerOptionFromString(day);
        return [minutes, hour, date, month, day, timeline];
    }

    getScheduleIntervalString(interval: string) {
        let minutes, hour, date, month, day, timeline, scheduleInterval;
        [minutes, hour, date, month, day, timeline] = this.decodeInterval(interval);
        switch (timeline) {
            case 0:
                scheduleInterval = `${this.translate.get('Every minute')}`;
                break;
            case 1:
                scheduleInterval = `${this.translate.get('Every hour at')} ${minutes} ${this.translate.get('minutes past the hour')}`;
                break;
            case 2:
                scheduleInterval = `${this.translate.get('Every day at')} ${hour} : ${minutes}`;
                break;
            case 3:
                scheduleInterval = `${this.translate.get('Every week on')} ${this.dayOptions[day].displayName} ${this.translate.get('at')} ${hour} : ${minutes}`;
                break;
            case 4:
                scheduleInterval = `${this.translate.get('Every month on')} ${date} ${this.translate.get('at')} ${hour} : ${minutes}`;
                break;
            case 5:
                scheduleInterval = `${this.translate.get('Every year on')} ${date} ${this.translate.get('of')} ${this.monthOptions[(month - 1) > 0 ? month - 1 : 0].displayName} ${this.translate.get('at')} ${hour} : ${minutes}`;
                break;
        }
        return scheduleInterval;
    }


    getIntegerOptionFromString(value) {
        return VariableService.equals('*', value) ? 0 : parseInt(value);
    }

}