/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { TestBed } from '@angular/core/testing';

import { SchemaService } from './schema.service';

describe('SchemaService', () => {
  let service: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
