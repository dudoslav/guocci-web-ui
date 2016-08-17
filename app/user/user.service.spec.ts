import { describe, expect, beforeEach, it, inject, beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from './user';

import { UserService } from './user.service';

describe('UserService', () => {

  let mockBackend: MockBackend;
  let service: UserService;

  beforeEachProviders(() => [
    provide('webApiBaseUrl', { useValue: 'https://guocci-mock-server.herokuapp.com/v1' }),
    UserService,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
      deps: [ MockBackend, BaseRequestOptions ]
    })
  ]);

  beforeEach(inject([ MockBackend, UserService ], (_mockBackend: MockBackend, _service: UserService) => {
    mockBackend = _mockBackend;
    service = _service;
  }));

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
});
