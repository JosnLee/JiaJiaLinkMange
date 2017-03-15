import {Injectable} from '@angular/core';
import {ConnectionBackend,XHRConnection,XHRBackend,Request} from '@angular/http';
import {HttpInterceptor} from './http-interceptor';

@Injectable()
export class HttpInterceptorBackend implements ConnectionBackend {
  constructor (private _HttpInterceptor:HttpInterceptor,private _xhrBackend:XHRBackend){

  }
  createConnection(request:Request):XHRConnection{
    let interceptor=this._HttpInterceptor;
    let req=interceptor.beforeRequest?interceptor.beforeRequest(request):request;
    let result=this._xhrBackend.createConnection(req);


    result.response=interceptor.afterResponse?interceptor.afterResponse(result.response):result.response;
    return result;
  }
}
