import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {url} from './api.url.service';
import {Router} from '@angular/router';
import {parseQuery, extractData} from './queryParse';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiService {
  constructor(private http:Http, private router:Router) {
  }

  login(key, params) {
    return this.http.post(url + `/admin/login/login.do?key=${key}`, params)
        .toPromise()
        .then(extractData)
        .catch(function (err) {
          console.log(err)
        });
  }

}
