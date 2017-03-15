import {Response} from '@angular/http';

var parseQuery= function (params) {
  var qString="";
  for(var i in params){
    if(params[i]){
      qString=qString+"&"+i+"="+params[i]
    }
  }
  return qString? "?" + qString.substring(1,qString.length) : "";
}
var extractData =function (res:Response) {
  let body = res.json();
  if(body.c=="u"){
    window.location.href=""
    localStorage.removeItem("userInfo")
  }
  return body || {};
}
export {parseQuery,extractData};
