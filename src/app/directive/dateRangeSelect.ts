
/**
 * 时间区间选择
 * 返回data {startDate:'2011-09-01',endDate:'2022-01-01'}
 * onSelect
 */
import {Component, Input, EventEmitter, ElementRef} from '@angular/core';

declare var $:any;
var $ = require('jquery');
var moment = require('moment');
@Component({
    selector: 'date-range-select',
    templateUrl: './dateRange.html',
    styleUrls: ['./dateRangeSelect.css']
})
export class DateRangeDirective {
    selectTime:any="";
    dateInput:any;
    config : any ={
        startDate: null,
        endDate: null,
        ranges: {
            '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '过去七天': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            '过去30天': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            '这个月': [moment().startOf('month'), moment().endOf('month')],
            '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        "showCustomRangeLabel": false,
        "alwaysShowCalendars": true,
        format: 'YYYY-MM-DD',
        locale: {
            applyLabel: "确定",
            cancelLabel: "清空",
            customRangeLabel: '时间段',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三曰', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1
        }
    }


    @Input('option') options:any = {

    };

    
    constructor(private input: ElementRef) {

    }



    ngAfterViewInit() {
        let _this=this;
        let targetOptions: any = Object.assign({}, this.config, this.options);
        this.dateInput=$(this.input.nativeElement).find('input:first');
        this.dateInput.daterangepicker(targetOptions);



        this.dateInput.on('apply.daterangepicker', function (ev, picker) {
            if (_this.options && _this.options.onSelected) {
                _this.options.onSelected({
                    startDate: picker.startDate.format('YYYY-MM-DD'),
                    endDate: picker.endDate.format('YYYY-MM-DD')
                });
                _this.selectTime= picker.startDate.format('YYYY-MM-DD')+ picker.endDate.format('YYYY-MM-DD')
            }
        });
        this.dateInput.on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
            _this.options.onSelected({
                startDate: null,
                endDate: null
            });
        });
        if(this.options.startDate||this.options.endDate){
            this.dateInput.data('daterangepicker').hideCalendars();
            this.dateInput.data('daterangepicker').setStartDate(this.options.startDate);
            this.dateInput.data('daterangepicker').setEndDate(this.options.endDate);
        }

    }


}
