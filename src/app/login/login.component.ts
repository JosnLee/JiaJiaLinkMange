import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared';
import {url} from '../shared/api.url.service';
import {Router} from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [ApiService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:Object = {};
  code:string = '';
  randomCode:string = '';

  constructor(private apiService:ApiService, private router:Router) {

  };


  randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  };

  codeRefresh() {
    this.randomCode = this.randomString(12);
    this.code = url + '/code/kaptcha?key=' + this.randomCode;
  };

  login():void {
    let parentThis = this;
    this.apiService.login(this.randomCode, this.user).then(function (response) {
      if (response.c === 's') {
        localStorage.setItem('userInfo', JSON.stringify(response.userAdminVO));
        parentThis.router.navigate(['/main']);
      } else {
        parentThis.codeRefresh();
      }
    });
  };


  ngOnInit() {
    this.codeRefresh();
  };

}

