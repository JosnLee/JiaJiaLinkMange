/**
 * Created by dfsj16111702 on 2017/2/23.
 */
import {Component, Input, ElementRef, Output, EventEmitter} from '@angular/core';
var eCharts = require('echarts/lib/echarts');
var $ = require('jquery');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
//require('echarts/lib/component');
require('echarts/lib/component/graphic');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/polar');
require('echarts/lib/component/geo');
require('echarts/lib/component/parallel');
require('echarts/lib/component/singleAxis');
require('echarts/lib/component/brush');
require('echarts/lib/component/title');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
require('echarts/lib/component/markArea');
require('echarts/lib/component/timeline');
require('echarts/lib/component/toolbox');
require('zrender/lib/vml/vml');
@Component({
    selector: 'e-chart',
    templateUrl: './eChart.html'
})

export class eChartComponent {
    @Input('option') options:any = {};
    @Input('type') type:any = '';
    @Input('title') title:any = '';
    @Input('xAxisData') xAxisData:any = [];
    eChart:any;
    //timer:any;
    constructor(private div:ElementRef) {
        //console.log(this.div.nativeElement.childNodes);
        //console.log($(this.div.nativeElement).find('div#eChart'));

    }

    ngAfterViewInit() {
        this.eChart = eCharts.init(this.div.nativeElement.children[0].children[0]);
        let timer = setTimeout(data => {
            this.dataChange();
            //noinspection TypeScriptUnresolvedFunction
            clearTimeout(timer);
        }, 200);

    }

    dataChange() {
        if (this.type == 'pie') {
            let data = [];
            let dataName = [];
            this.options.forEach(function (item) {
                data.push({name: item.name, value: item.value});
                dataName.push(item.name);
            });
            this.getPie(data, dataName);
        } else if (this.type == 'line') {
            let data = [];
            let dataName = [];
            let type = this.type;
            this.options.forEach(function (item) {
                data.push({name: item.name, type: type, data: item.data});
                dataName.push(item.name);
            });
            this.getLine(dataName, data);

        }
    }


    ngOnChanges(a) {
        let timer = setTimeout(data => {
            this.dataChange();
            //noinspection TypeScriptUnresolvedVariable
            clearTimeout(timer);
        }, 200);
    }

    getPie(data, dataName) {
        this.eChart.setOption(<echarts.Option>{
            title: {
                text: this.title,
                x: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#000',
                    fontFamily: 'Microsoft Yahei',
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                confine: true,
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: dataName
            },
            series: [
                {
                    name: this.title,
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
                    data: data,
                    hoverAnimation: true,
                    animationType: 'expansion',
                    animation: true,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#4285f4', '#ea4335', '#fbbc05']
                }
            ]
        });
    }

    getLine(dataName, seriesData) {
        this.eChart.setOption(<echarts.Option>{
            title: {
                text: this.title
            },
            tooltip: {
                trigger: 'axis',
                confine: true
            },
            legend: {
                data: dataName,
                bottom: "-5"
            },
            grid: {
                left: '5%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.xAxisData,
                axisLabel: {
                    margin: -20,
                    inside: true
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    margin: -45,
                    inside: true
                }
            },
            series: seriesData
        })
    }

}

