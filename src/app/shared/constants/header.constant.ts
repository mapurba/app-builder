/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { Injectable } from '@angular/core';

@Injectable()
export class HeaderConstants {
  static get contentType(): string {
    return this._contentType;
  }

  static set contentType(value: string) {
    this._contentType = value;
  }

  static get applicationJson(): string {
    return this._applicationJson;
  }

  static set applicationJson(value: string) {
    this._applicationJson = value;
  }
  static get authorization(): string {
    return this._authorization;
  }

  static set authorization(value: string) {
    this._authorization = value;
  }

  static get headerName(): string {
    return this._headerName;
  }

  static set headerName(value: string) {
    this._headerName = value;
  }

  static get zero(): string {
    return this._zero;
  }

  static set zero(value: string) {
    this._zero = value;
  }

  static get noCache(): string {
    return this._noCache;
  }

  static set noCache(value: string) {
    this._noCache = value;
  }

  static get noCacheNoStoreMustRevalidate(): string {
    return this._noCacheNoStoreMustRevalidate;
  }

  static set noCacheNoStoreMustRevalidate(value: string) {
    this._noCacheNoStoreMustRevalidate = value;
  }

  static get expires(): string {
    return this._expires;
  }

  static set expires(value: string) {
    this._expires = value;
  }

  static get pragma(): string {
    return this._pragma;
  }

  static set pragma(value: string) {
    this._pragma = value;
  }

  static get refresh(): string {
    return this._refresh;
  }

  static set refresh(value: string) {
    this._refresh = value;
  }

  static get daySeconds(): string {
    return this._daySeconds;
  }

  static set daySeconds(value: string) {
    this._daySeconds = value;
  }

  static get cacheControl(): string {
    return this._cacheControl;
  }

  static set cacheControl(value: string) {
    this._cacheControl = value;
  }

  static get antiCSRFToken() {
    return this._antiCSRFToken;
  }

  static set antiCSRFTokenValue(value: string) {
    this._antiCSRFTokenValue = value;
  }

  static get antiCSRFTokenValue() {
    return this._antiCSRFTokenValue;
  }

  private static _headerName = 'netiq_idm_rbpm_acsrf';
  private static _zero = '0';
  private static _noCache = 'no-cache';
  private static _noCacheNoStoreMustRevalidate = 'no-cache, no-store, must-revalidate';
  private static _expires = 'expires';
  private static _pragma = 'pragma';
  private static _refresh = 'refresh';
  private static _daySeconds = '86400';
  private static _cacheControl = 'Cache-Control';
  private static _authorization = 'Authorization';
  private static _contentType = 'Content-Type';
  private static _applicationJson = 'application/json';
  private static _antiCSRFToken = 'X-CSRF-Token';
  private static _antiCSRFTokenValue = '';

}
