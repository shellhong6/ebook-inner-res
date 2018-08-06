var DM5_YB_ARRAY = [];
var DM5_YB_BODY = "";
var DM5_YB_COMPLETE = true;
var DM5_YB_CURRENT_CONTENT = "";
var index_new = 0;
var asyncList = [];
var isasync=false;
function getjscallback(url, cback, obj) {
    createjsasy(url, obj, cback);
}
function createjsasy(url, obj, cback) {
    var index = DM5_YB_ARRAY.length + 1;
    var jsFile = { url: url, idobj: obj, cback: cback, isfrist: true }
    DM5_YB_ARRAY.push(jsFile);
}
function rewritedcwrite() {
    document.write = function (s) { DM5_YB_BODY += s; }
    document.writeln = function (s) { DM5_YB_BODY += s; }
}
function execute() {
    DM5_YB_CURRENT_CONTENT = "";
    DM5_YB_BODY = "";
    DM5_YB_COMPLETE = false;
    if (DM5_YB_ARRAY.length == 0) {
        DM5_YB_COMPLETE = true;
        return;
    }
    var requestobj = DM5_YB_ARRAY.pop();
    if (requestobj.cback) {
        requestobj.cback();
    }
    var url = requestobj.url;
    var obj = requestobj.idobj;
    var tcclass = requestobj.tc_class;
    var isfrist = requestobj.isfrist;
    if (url && url != '') {
        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; 
        ga.async = true;
        ga.src = url;
        ga.onload = function(){
            var re = /<script.*?>([\s\S]*?)<\/script>/ig;
            var arrMactches = DM5_YB_BODY.match(re);
            DM5_YB_CURRENT_CONTENT = DM5_YB_BODY;
            if (arrMactches != null && arrMactches.length != 0) {
                for (var idx = 0; idx < arrMactches.length; idx++) {
                    var s = $(arrMactches[idx]).attr("src");
                    if (s && s != '' && s.trim() != '') {
                        var as = $(arrMactches[idx]).attr("async");
                        if (as) {
                            isasync=true;
                            asyncList.push(arrMactches[idx]);
                        }
                        else{
                            var tc_class = obj + "tc_" + index_new;
                            index_new++;
                            var jsFile = { url: s, idobj: obj, cback: null, isfrist: false, tc_class: tc_class }
                            DM5_YB_ARRAY.push(jsFile);
                            DM5_YB_CURRENT_CONTENT = DM5_YB_CURRENT_CONTENT.replace(arrMactches[idx], "<div style='display:none' class=\"" + tc_class + "\"></div>");
                        }
                    }
                    else {
                        DM5_YB_BODY = "";
                        var t = $(arrMactches[idx]).text();
                        if (t && t != '' && t.trim() != '') {
                            if(!t.indexOf('Below Article Thumbnails')){
                                eval(t);
                            }
                        }
                        if (DM5_YB_BODY != "") {
                            DM5_YB_CURRENT_CONTENT = DM5_YB_CURRENT_CONTENT.replace(arrMactches[idx], DM5_YB_BODY);
                        }
                    }

                }
            }
            var ob;
            if (obj && $("#" + obj).length > 0) {
                ob = $("#" + obj);
            }
            else {
                ob = $("body");
            }
            if (isfrist) {
                ob.append(DM5_YB_CURRENT_CONTENT);
            }
            else {
                if (tcclass && $("." + tcclass, ob).length > 0) {
                    if (DM5_YB_CURRENT_CONTENT != '') {
                        $("." + tcclass, ob).after(DM5_YB_CURRENT_CONTENT);
                    }
                    $("." + tcclass, ob).remove();
                }

            }
            if (DM5_YB_ARRAY.length > 0) { execute(); } 
            else { 
                DM5_YB_COMPLETE = true; 
                if(isasync)
                {
                    for(var i=0;i<asyncList.length;i++){
                        var ga=document.createElement('script');
                        ga.type = 'text/javascript';
                        ga.async = true;
                        ga.src = $(asyncList[i]).attr("src");
                        var s=document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(ga, s);
                    }
                    asyncList = [];
                    isasync=false;
                }
            }
        }
        var s = $("#"+obj)[0]; 
        s.appendChild(ga);
    }
}
$(function () {
    DM5_YB_ARRAY.reverse();
    rewritedcwrite();
    execute();
}
);