import { describe, expect, beforeEach, it, inject, beforeEachProviders } from '@angular/core/testing';
import {provide} from '@angular/core';
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import { User } from './user';

import { UserService } from './user.service';

describe('UserService', () => {

  beforeEachProviders(() => {
    return [ HTTP_PROVIDERS, provide(XHRBackend, {useClass: MockBackend}), UserService ];
  });

  it('should fetch right data', inject([XHRBackend, UserService], (mockBackend, userService) => {

  }));
});
