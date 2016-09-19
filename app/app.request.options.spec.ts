import { inject, TestBed } from '@angular/core/testing';
import { RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';

import { AppRequestOptions } from './app.request.options';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      AppRequestOptions
    ]
  });
});

describe('AppRequestOptions', () => {

  let appRequestOptions: AppRequestOptions;

  beforeEach(inject([AppRequestOptions], (_appRequestOptions: AppRequestOptions) => {
    appRequestOptions = _appRequestOptions;
  }));

  it('should create simple GET request', () => {
    let options: RequestOptionsArgs = { url: '/sites', method: RequestMethod.Get };

    let result: RequestOptions = appRequestOptions.merge(options);

    expect(result.url).toBe(`${appRequestOptions.webApiBaseUrl}/sites`);
    expect(result.method).toBe(RequestMethod.Get);
  });

  it('should create simple POST request', () => {
    let options: RequestOptionsArgs = { url: '/sites/420/instances', method: RequestMethod.Post };

    let result: RequestOptions = appRequestOptions.merge(options);

    expect(result.url).toBe(`${appRequestOptions.webApiBaseUrl}/sites/420/instances`);
    expect(result.method).toBe(RequestMethod.Post);
    expect(result.headers.get('Content-Type')).toBe('application/json');
    expect(result.headers.get('Accept')).toBe('application/json');
  });

  it('should create simple DELETE request', () => {
    let options: RequestOptionsArgs = { url: '/sites/420/instances/322', method: RequestMethod.Delete };

    let result: RequestOptions = appRequestOptions.merge(options);

    expect(result.url).toBe(`${appRequestOptions.webApiBaseUrl}/sites/420/instances/322`);
    expect(result.method).toBe(RequestMethod.Delete);
  });

  it('should create request for i18n files', () => {
    let options: RequestOptionsArgs = { url: '/app/i18n/en.json', method: RequestMethod.Get };

    let result: RequestOptions = appRequestOptions.merge(options);

    expect(result.url).toBe(`/app/i18n/en.json`);
    expect(result.method).toBe(RequestMethod.Get);
  });

});
