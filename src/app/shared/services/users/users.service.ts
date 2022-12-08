/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathConstant } from '../../constants/path.constant';
import { CookiesService } from '../../utils/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient,private cookiesService: CookiesService) { }

  getUsersList() {
    return this.http.get(PathConstant.LISTUSERS);
  }

  createUser(profile: { id: any; }) {
    // profile.id = VariableService.randomId();
    // return this.http.post(PathConstant.LISTUSERS, profile);
  }

  getUserDetail() {
    return this.http.get(PathConstant.myProfile);
  }

  updateUserProfile(user: any) {
    return this.http.put(PathConstant.myProfile, user);
  }

  deleteUser(user: any) {
    return this.http.delete(PathConstant.myProfile, { body: user });
  }


  logout() {
    this.cookiesService.deleteCookie();
    return this.http.get(PathConstant.logout).subscribe((res)=>{
    });
  }


}
