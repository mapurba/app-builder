/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';
import * as moment from 'moment';
import { PathConstant } from './shared/constants/path.constant';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LoginService } from './pages/login/login.service';
import { UsersService } from './shared/services/users/users.service';


@Component({
  selector: 'app-builder',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  autoCollapse: boolean = true;
  expanded: boolean = false;
  aboutDetails: any;
  networkCalling = true;
  licenseInfo: string = '';
  items: PageHeaderNavigationItem[] = [
    {
      title: 'NetIQ Identity Validator',
      children: [
      ]
    }
  ];
  _selectedTest: any;
  selectedTest(val: any) {
    this._selectedTest = val;
  }
  panel: any;

  @ViewChild('init-loader')
  private loader!: ElementRef;
  @ViewChild('init-loader-styles')
  private styleloader!: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loginService: LoginService,
    public userService: UsersService
  ) {

    this.getAboutDetails();

  }
  ngOnInit(): void {

    this.userService.getUserDetail().subscribe((res:any)=>{
      console.log(res);
    });
   
  }

  removeInitLoader() {
    // document.getElementById('init-loader').style.display = 'none';
  }

  enableInitLoader() {
    // document.getElementById('init-loader').style.display = 'flex';
  }
  

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.enableInitLoader();
  }

  openHelpPage() {
    window.open(PathConstant.HELP_LINK, '_blank');
  }

  OnDestory() {
    // this.validatorService.eventEmitter.unsubscribe();
  }

  getAboutDetails() {
    this.http.get(PathConstant.BUILDINFO).subscribe(
      data => {
        this.aboutDetails = data;
        if (this.aboutDetails != undefined && this.aboutDetails != null) {
          const timestamp = moment(this.aboutDetails.date, "YYYY-MMM-DD hh:mm:ss").valueOf();
          // this.aboutDetails.date = VariableService.dateFormatter(timestamp, this.translate.getUserCurrentLocale());
        }
      },
      error => {
      }
    );
  }

  logout() {
    this.loginService.logout();
  }

  getUserName(): string {
    return this.loginService.getUserName();
  }

  getLicenseInfo() {
    this.http.get(PathConstant.licenseInfo, { responseType: 'text' }).subscribe((response) => {
      this.licenseInfo = response;
    })
  }

  goBackToHome() {
    // this.resetLastWorkingTest();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }

  

  openScheduler(){
    this.router.navigate(['/scheduler']);
  }

  openSidePanel() {
    this.panel.panelOpen = true;
  }

}

