import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../shared';


@Component({
    selector: 'myMainApp',
    templateUrl: './main.component.html',
    providers: [ApiService],
})

export class MainComponent implements OnInit {

    product:any = {};
    menus:any = [

    ];
    contentHeight:any;
    side:Object = {};

    constructor(private apiService:ApiService, private router:Router) {

        this.menus=[
            {title: '统计', icon: 'fa fa-area-chart', link: '/log', items: []},
            {title: '产品', icon: 'fa fa-product-hunt', link: '', items: [
                {title: '库存', link: '/log'},
                {title: '在网', link: '/log'},
                {title: '安装', link: '/log'}
            ]
            },
            {title: '用户', icon: 'fa fa-users', link: '/log', items: []},
            {title: '售后', icon: 'fa fa-wrench', link: '', items: [
                {title: '售后人员', link: '/log'},
                {title: '维护记录', link: '/log'}
            ]},
            {title: '活动', icon: 'fa fa-fire', link: '/log', items:[]},
            {title: '合伙人', icon: 'fa fa-handshake-o', link: '/log', items:[]},
            {title: '充值卡', icon: 'fa fa-credit-card', link: '/log', items:[]},
            {title: '员工', icon: 'fa fa-user-circle', link: '/log', items:[]}
        ]
    };

    menuClick(menu){
        console.log(menu)
        if(menu.items.length){
            menu.subShow=!menu.subShow
        }
    }

    ngOnInit() {
        this.contentHeight=document.body.clientHeight-85+'px';

    };

}

