import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { RxServiceService } from './rx-service.service';

describe('RxServiceService', () => {
  let service: RxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RxServiceService
      ]
    });
    service = TestBed.inject(RxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
