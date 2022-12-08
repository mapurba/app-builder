/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathConstant } from '../../constants/path.constant';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {


  selectedTestSuite: any

  constructor(private http: HttpClient) { }

  getValidators() {
    return this.http.get(PathConstant.vaidator);
  }



}