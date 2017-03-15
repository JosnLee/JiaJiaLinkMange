/**
 * Created by dfsj16111702 on 2017/2/27.
 */
import {Component, Input,ElementRef,Output,EventEmitter} from '@angular/core';
import {ApiService} from '../shared';
let $ = require('jquery');

@Component({
    selector: 'upload-cover',
    templateUrl: './uploadCover.html',
    providers: [ApiService]
})


export class UploadCoverComponent {
    @Input('img') img:any = {};
    @Output() imgAfter:any=new EventEmitter<string>();
    @Output() show:any=new EventEmitter<string>();
    _data:any;
    myImage:any;
    isMove:boolean=false;
    X:any;
    Y:any;
    can:any;
    constructor(private upload:ElementRef,private apiService:ApiService) {

    }
    ngAfterViewInit(){
        let div=$('#ctrlX')[0];
        let topLeft=$('#topLeft')[0];
        let topRight=$('#topRight')[0];
        let bottomLeft=$('#bottomLeft')[0];
        let bottomRight=$('#bottomRight')[0];
        this.can=$('#can')[0];
        let reader = new FileReader();
        reader.onload = function (evt) {
            this.myImage = evt.target.result;
            this.canvas();
        }.bind(this);
        reader.readAsDataURL(this.img.url);
       /* $(div).on('mouseenter',(e)=>{
            this.isMove=false;
        });*/
         /*$(div).on('mouseenter',(e)=>{
            div.style.cursor='default';
        });*/
        $(div).on('mousedown',(e) =>{
            this.isMove=true;
            this.X=e.offsetX;
            this.Y=e.offsetY;
        });
        $(div).on('mousemove',(e)=> {
            if(!this.isMove){
                return false;
            }
            if((e.offsetX>0)&&(e.offsetX<parseInt(div.style.width))){
                div.style.left=parseInt(div.style.left)+(e.offsetX-this.X)+'px';
                if(parseInt(div.style.left)<=0){
                    div.style.left=0+'px';
                }else if(((parseInt(div.style.left))+(parseInt(div.style.width)))>=this.can.width){
                    div.style.left=this.can.width-parseInt(div.style.width)+'px';
                }
                topLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
                topRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
                bottomLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
                bottomRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
            }
            if((e.offsetY>0)&&(e.offsetY<parseInt(div.style.height))){
                let top=div.style.top;
                div.style.top=parseInt(div.style.top)+(e.offsetY-this.Y)+'px';
                if(parseInt(div.style.top)<=0){
                    div.style.top=top;
                }else if(((parseInt(div.style.top))+(parseInt(div.style.height)))>=this.can.height){
                    div.style.top=top;
                }
                topLeft.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
                topRight.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
                bottomLeft.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
                bottomRight.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
            }
            if(e.offsetX==0){
                div.style.width='e-resize';
            }
        });
        $('#box').on('mouseup', (e)=> {
            console.log('aaa');
            this.isMove=false;
            this.canvas();
        });
        //放大
        $(topLeft).on('mousedown',(e) =>{
            this.isMove=true;
            this.X=e.offsetX;
            this.Y=e.offsetY;
        }).on('mousemove',(e)=>{
            if(!this.isMove){
                return false;
            }
            console.log(e.offsetX,e.offsetY,this.X,this.Y);
            if(((parseInt(div.style.left)+parseInt(div.style.width))<this.can.width)&&
                ((parseInt(div.style.top)+parseInt(div.style.height))<this.can.height)){
                div.style.width=parseInt(div.style.width)+(this.X-e.offsetX)+'px';
                div.style.height=parseInt(div.style.height)+(this.Y-e.offsetY)+'px';
                div.style.left=parseInt(div.style.left)-(this.X-e.offsetX)+'px';
                div.style.top=parseInt(div.style.top)-(this.Y-e.offsetY)+'px';
            }
            bottomLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topRight.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topLeft.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
        });
        $(topRight).on('mousedown',(e) =>{
            this.isMove=true;
            this.X=e.offsetX;
            this.Y=e.offsetY;
        }).on('mousemove',(e)=>{
            if(!this.isMove){
                return false;
            }
            console.log(e.offsetX,e.offsetY,this.X,this.Y);
            if(((parseInt(div.style.left)+parseInt(div.style.width))<this.can.width)&&
                ((parseInt(div.style.top)+parseInt(div.style.height))<this.can.height)){
                div.style.width=parseInt(div.style.width)+(e.offsetX-this.X)+'px';
                div.style.height=parseInt(div.style.height)+(this.Y-e.offsetY)+'px';
                div.style.top=parseInt(div.style.top)-(this.Y-e.offsetY)+'px';
            }
            bottomRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topLeft.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
            topRight.style.top=parseInt(div.style.top)-parseInt(topLeft.style.borderLeftWidth)+'px';
        });
        $(bottomLeft).on('mousedown',(e) =>{
            this.isMove=true;
            this.X=e.offsetX;
            this.Y=e.offsetY;
        }).on('mousemove',(e)=>{
            if(!this.isMove){
                return false;
            }
            console.log(e.offsetX,e.offsetY,this.X,this.Y);
            if(((parseInt(div.style.left)+parseInt(div.style.width))<this.can.width)&&
                ((parseInt(div.style.top)+parseInt(div.style.height))<this.can.height)){
                div.style.width=parseInt(div.style.width)+(this.X-e.offsetX)+'px';
                div.style.height=parseInt(div.style.height)+(e.offsetY-this.Y)+'px';
                div.style.left=parseInt(div.style.left)-(this.X-e.offsetX)+'px';
            }
            topLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomLeft.style.left=parseInt(div.style.left)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomRight.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomLeft.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
        });
        $(bottomRight).on('mousedown',(e) =>{
            this.isMove=true;
            this.X=e.offsetX;
            this.Y=e.offsetY;
        }).on('mousemove',(e)=>{
            if(!this.isMove){
                return false;
            }
            console.log(e.offsetX,e.offsetY,this.X,this.Y);
            if(((parseInt(div.style.left)+parseInt(div.style.width))<this.can.width)&&
                ((parseInt(div.style.top)+parseInt(div.style.height))<this.can.height)){
                div.style.width=parseInt(div.style.width)+(e.offsetX-this.X)+'px';
                div.style.height=parseInt(div.style.height)+(e.offsetY-this.Y)+'px';
            }
            topRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomRight.style.left=parseInt(div.style.left)+parseInt(div.style.width)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomLeft.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
            bottomRight.style.top=parseInt(div.style.top)+parseInt(div.style.height)-parseInt(topLeft.style.borderLeftWidth)+'px';
        });
    }
    canvas(){
        let img=new Image();
        img.src=this.myImage;
        this.can.width=img.naturalWidth*0.4;
        this.can.height=img.naturalHeight*0.4;
        let ctx=this.can.getContext('2d');
        let div=$('#ctrlX')[0];
        let X=parseInt(div.style.left);
        let Y=parseInt(div.style.top);
        let W=parseInt(div.style.width);
        let H=parseInt(div.style.height);
        ctx.drawImage(img,0,0,this.can.width,this.can.height);
        let data=this.can.toDataURL();
        //第二个canvas
        let canT=$('#canAfter')[0];
        canT.width=W;
        canT.height=H;
        let ctxT=canT.getContext('2d');
        let imgT=new Image();
        imgT.src=data;
        ctxT.drawImage(imgT,-X,-Y);
        this._data=canT.toDataURL();
        // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
        //this._data=this._data.split(',')[1];
         /*_data=window.atob(_data);
         let ia = new Uint8Array(_data.length);
         for (let i = 0; i < _data.length; i++) {
         ia[i] = _data.charCodeAt(i);
         };
         let blob=new Blob([ia], {type:"image/png"});*/
         //console.log(_data);
    }
    cancel(){
        this.show.emit(false);
    }
    ok(){
        this.apiService.imageUpload({'base64':this._data,coverType:this.img.type,cpId:this.img.cpId}).then(result=>{
            if(result.c=='s'){
                this.imgAfter.emit(result.fileVO.webUrl);
                this.show.emit(false);
            }

        });
        //this.show.emit(false);
    }
    ngOnChange(){
        this.canvas();
    }
    ngOnInit(){

    }
    /*allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("Text",ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        let data=ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }*/

}

