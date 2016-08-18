import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';

@Injectable()
export class AppRequestOptions extends RequestOptions {

  private webApiBaseUrl: string = 'https://guocci-mock-server.herokuapp.com/v1';

  merge(options?: RequestOptionsArgs): RequestOptions {
    let result = new AppRequestOptions(super.merge(options));
    if (options.url.indexOf('i18n') === -1) {
      result.url = this.webApiBaseUrl + result.url;
    }
    if (result.method === RequestMethod.Put ||
         result.method === RequestMethod.Post ||
         result.method === RequestMethod.Patch) {
      if (!result.headers) {
        result.headers = new Headers();
      }
      result.headers.append('Content-Type', 'application/json');
      result.headers.append('Accept', 'application/json');
    }
    return result;
  }

}
