
import {Component, Input, Output, ElementRef,EventEmitter} from '@angular/core';
import {url} from '../shared';
declare var $:any;
var $ = require('jquery');
var wangEditor = require('wangeditor');
@Component({
    selector: 'kt-editor',
    template: '<textarea style="min-height: 500px">\n    \n</textarea>'

})
export class KtEditorDirective {
    selectTime:any="";
    editorInput:any;



    @Output() htmlTextChange = new EventEmitter<string>();

    constructor(private input: ElementRef) {

    }



    ngAfterViewInit() {
        let _this=this;
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.editorInput=$(this.input.nativeElement).find('textarea:first');
        let editor1 = new wangEditor(this.editorInput);
        
        editor1.config.uploadImgUrl = url + "/admin/notices/uploadImage";
        editor1.config.uploadHeaders = {'X-Auth-Token': userInfo.token};
        editor1.config.uploadImgFileName = "uploadFile";
        editor1.config.printLog = false;


        editor1.config.uploadImgFns.onload = function (resultText, xhr) {
            var urlObj = JSON.parse(JSON.parse(resultText));
            // resultText 服务器端返回的text
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            var originalName = editor1.uploadImgOriginalName || '';

            // 如果 resultText 是图片的url地址，可以这样插入图片：
            editor1.command(null, 'insertHtml', '<img src="' + urlObj.url + '" alt="' + originalName + '" style="max-width:100%;"/>');
            // 如果不想要 img 的 max-width 样式，也可以这样插入：
            // editor.command(null, 'InsertImage', resultText);
        };
        editor1.create();
        editor1.onchange = function () {
            let htmlText=editor1.$txt.html();
            _this.htmlTextChange.emit(htmlText);
        };


    }


}
