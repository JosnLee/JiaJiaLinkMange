import {Injectable} from '@angular/core';
import {Request, Response} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpInterceptor{


  beforeRequest(request:Request) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      request.headers.append('X-Auth-Token', userInfo.token);
    }
    return request;
  }

  afterResponse(res:any):Observable<any> {
   // setTimeout(function () {
   //   console.log(res,"hhhh")
   // })

    // res.subscribe((data)=> {
    //   console.log(data)
    //
    //   let dataJSON = data.json();
    //   if (dataJSON.hasOwnProperty('c') && dataJSON.c == 'u') {
    //     localStorage.removeItem("userInfo")
    //     console.log(11122)
    //   }
    // })
    return res;
  }
}
