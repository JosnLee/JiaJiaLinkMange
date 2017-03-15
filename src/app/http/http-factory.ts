import {RequestOptions,Http} from '@angular/http';
import {HttpInterceptorBackend} from './http-interceptor-backend';

export function HttpFactory(httpInterceptorBackend : HttpInterceptorBackend,requestOptions : RequestOptions) : Http{
  return new Http(httpInterceptorBackend,requestOptions)
}
