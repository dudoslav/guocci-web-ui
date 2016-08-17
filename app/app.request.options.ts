import { Injectable, Inject } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';

@Injectable()
export class AppRequestOptions extends BaseRequestOptions {

  private webApiBaseUrl: string = 'https://guocci-mock-server.herokuapp.com/v1';

  merge(options?: RequestOptionsArgs): RequestOptions {
    options.url = this.webApiBaseUrl + options.url;
    if (options.method === 'put' ||
         options.method === 'post' ||
         options.method === 'patch') {
      let headers = options.headers;
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
      options.headers = headers;
    }
    let result = super.merge(options);
    result.merge = this.merge;
    return result;
  }

}
