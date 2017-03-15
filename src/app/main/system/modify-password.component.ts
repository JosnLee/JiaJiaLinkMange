import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../shared';


@Component({
  selector: 'mainApp',
  templateUrl: './modify-password.html',
  styleUrls: ['./modify.css'],
  providers: [ApiService]

})
export class ModifyPasswordComponent implements OnInit {


  user:any = {};
  msgs:Array<any> = [];
  userInfo:any = JSON.parse(localStorage.getItem("userInfo"))

  constructor(private apiService:ApiService, private activatedRoute:ActivatedRoute, private router:Router) {

  };



  showSuccess() {
    let _this = this;
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: '修改密码', detail: '您的密码修改成功'});
    setTimeout(function () {
      _this.msgs = [];
    }, 3000)
  };

  showError(msg) {
    let _this = this;
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: '修改密码', detail: msg});
    setTimeout(function () {
      _this.msgs = [];
    }, 3000)
  };

  modifyPassword() {
    this.apiService.resetPassword({newpwd: this.user.newpwd, oldpwd: this.user.oldpwd}).then(result => {

      if (result.c === "s") {
        this.showSuccess();

      } else {
        this.showError(result.i)
      }


    })

  };


  ngOnInit() {


  };


}


