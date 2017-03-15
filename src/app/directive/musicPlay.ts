import {Component, Input, EventEmitter, ElementRef} from '@angular/core';
var $ = require('jquery');
@Component({
    selector: 'music-play',
    templateUrl: './musicPlay.html',
    styleUrls: ['./musicPlay.css']
})

export class musicPlayComponent {
    @Input("musicUrl")musicUrl:any="";
    @Input("musicTime")musicTime:any="";


    constructor(private div:ElementRef) {
        console.log(this.div.nativeElement);
        console.log($(this.div.nativeElement).find('span.musicPlay'));

    }





}