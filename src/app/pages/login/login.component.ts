/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StateNames } from 'src/app/shared/schemas/StateNames';
import { SchemaService } from 'src/app/shared/services/schema-services/schema.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CookiesService } from 'src/app/shared/utils/cookies.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  familyColor: string = '#ba47e2';
  familyName: string = 'Netiq <br> Identity Validator';
  familyIcon: string = 'V';
  formTitle: string = 'Sign in <br> ';
  animated: boolean = false;
  // layout: LoginLayout = LoginLayout.Basic;
  // deviceLayout: LoginDeviceLayout = LoginDeviceLayout.Auto;
  graphicPanelImage: string = (window as any).uxdAssetsUrl + '/img/virtual-reality.png';
  icon: string = './assets/logo.png';
  loginError: boolean = false;
  visible = true;
  loginForm: FormGroup = this.formBuilder.group({
    'username': [''],
    'password': ['']
  });

  

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cookie: CookiesService,
    private schemaService: SchemaService,
    private usersService: UsersService) {
    this.loginForm = formBuilder.group({
      'username': [''],
      'password': ['']
    });
  }


  reload(): void {
    this.visible = false;
    setTimeout(() => {
      this.visible = true;
    });
  }
 

  login() {
    this.loginError = false;
    this.loginService.login("admin", "12345678")
      .subscribe((res) => {
        this.loginError = false;
        this.router.navigate(['']);
        this.getSchemaDetail();
      }, (err) => {
        this.loginError = true;
      });
  }

  ngOnInit(): void {
    this.getSchemaDetail();
  }

  getSchemaDetail() {
    this.schemaService.getValidators().subscribe(
      (schema) => {

        this.router.navigate(['']);
      }
    );
  }

}
