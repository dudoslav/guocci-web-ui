/// <reference path="../../typings/globals/jasmine/index.d.ts" />
import { inject, TestBed } from '@angular/core/testing';
import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from './user';

import { UserService } from './user.service';


beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      UserService,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
        deps: [ MockBackend, BaseRequestOptions ]
      })
    ],
    imports: [
      HttpModule
    ]
  });
});

describe('UserService', () => {

  let mockBackend: MockBackend;
  let service: UserService;

  beforeEach(inject([ MockBackend, UserService ], (_mockBackend: MockBackend, _service: UserService) => {
    mockBackend = _mockBackend;
    service = _service;
  }));

  afterEach(() => mockBackend.verifyNoPendingRequests());

  it('should fetch right mocked user', () => {
    let response = {id: 42, name: 'Chose Rodrigez', email: 'chose.rodrigez@imaginary.cloud.cz'};
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(response)})));
    });
    service.getUser().subscribe(res => {
      let user: User = res;
      expect(user.id).toBe(42);
      expect(user.name).toBe('Chose Rodrigez');
      expect(user.email).toBe('chose.rodrigez@imaginary.cloud.cz');
    });
  });

  it('should receive wrong data', () => {
    let response = {id: 42, name: 'Chose Rodrigez'};
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(response)})));
    });
    service.getUser().subscribe(res => {
      let user: User = res;
      expect(user.id).toBe(42);
      expect(user.name).toBe('Chose Rodrigez');
      expect(user.email).toBe(undefined);
    });
  });
});
