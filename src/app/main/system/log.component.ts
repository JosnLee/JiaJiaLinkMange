import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../shared';

let moment =require('moment')
@Component({
  selector: 'mainApp',
  templateUrl: './log.component.html',
  providers: [ApiService],

})
export class LogComponent implements OnInit {
  logList:Array<Object> = [];
  search:any = {pageNo: 1, pageSize: 10,startTime:"",endTime:""};
  params:any = {};
  config   = {
    currentPage: 1,
    itemsPerPage: 10,
    pagesLength: 9,
    search: 0,
    totalItems: 0,
    onChange: function () {

    }
  }
  options:any={
    startDate:moment(),
    endDate:moment(),
    onSelected: function (data, scope) {  //时间选择确认事件

      console.log(data,"select");

    }
  }

  constructor(private apiService:ApiService, private activatedRoute:ActivatedRoute, private router:Router) {
    let parentThis = this;
    this.config.onChange = function () {
      parentThis.search={pageNo:this.currentPage,pageSize:this.itemsPerPage};
      parentThis.router.navigate(['/main/log'],{ queryParams: parentThis.search});
    }
    this.options.onSelected=function (data) {
      parentThis.search.startTime=data.startDate;
      parentThis.search.endTime=data.endDate;
      parentThis.router.navigate(['/main/log'],{ queryParams: parentThis.search});
    }
  }




  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.search.pageNo = this.params.pageNo||1;
      this.search.pageSize = this.params.pageSize||10;
      this.config.currentPage = this.params.pageNo||1;
      this.config.itemsPerPage = this.params.pageSize||10;
      this.options.startDate = this.params.startTime;
      this.options.endDate = this.params.endTime;
    });



  }


}

