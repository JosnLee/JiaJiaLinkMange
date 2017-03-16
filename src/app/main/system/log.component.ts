import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';


let moment =require('moment')
@Component({
  selector: 'mainApp',
  templateUrl: './log.component.html',
  providers: [ConfirmationService]
})
export class LogComponent implements OnInit {
  logList:Array<Object> = [];
  search:any = {pageNo: 1, pageSize: 10,startTime:"",endTime:""};
  params:any = {};
  xAxisData:Array<any>=[];
  logData:Array<any>=[];
  msgs:any=[];
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

  constructor(private confirmationService:ConfirmationService, private activatedRoute:ActivatedRoute, private router:Router) {
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

  delete(){
    this.confirmationService.confirm({
      message: `你确定要删除XX吗?`,
      header: 'CP中心',
      accept: () => {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'删除提示', detail:'删除成功'});

      }
    });
  }



  ngOnInit() {
    this.config.totalItems =100;


    this.xAxisData = ['周一','周二','周三','周四','周五','周六','周日'];
    this.logData =  [
      {
        name:'邮件营销',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'联盟广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'视频广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:'直接访问',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'搜索引擎',
        type:'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {normal: {}},
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
    ];

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

