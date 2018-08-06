var indexImg = 0;
//翻页时间标识
var lastTime = new Date();
//连续标识
var combtime = 0;
//双页互换位置
var isDoubleChange = false;
// 是否支持动画
var animation = false;

function theme_control() {
    if ($(".theme-dark").length == 0) {
        $(".theme-white").addClass("theme-dark");
        $(".theme-white").removeClass("theme-white");
        $(".tool_title_lamp").html("开灯");
        $.cookie("isLight", "off", { path: "/", expires: 365 });
        $(".imgFloat_1").attr("src", cssimgsrc + "floatR_1.png");
        $(".imgFloat_1.noC").attr("src", cssimgsrc + "floatR_1_n.png");
        $(".imgFloat_2").attr("src", cssimgsrc + "floatR_2.png");
        $(".imgFloat_2.noC").attr("src", cssimgsrc + "floatR_2_n.png");
        $(".imgFloat_3").attr("src", cssimgsrc + "floatR_3.png");
        if($(".pageItem .bar img:visible").length > 0){
            $(".pageItem .bar img:visible").eq(0).attr("src",$(".pageItem .bar img:visible").eq(0).attr("src").replace("W","R"));
            $(".pageItem .bar img:visible").eq(1).attr("src",$(".pageItem .bar img:visible").eq(1).attr("src").replace("W","R"));
        }
    }
    else {
        $(".theme-dark").addClass("theme-white");
        $(".theme-dark").removeClass("theme-dark");
        $(".tool_title_lamp").html("关灯");
        $.cookie("isLight", "on", { path: "/", expires: 365 });
        $(".imgFloat_1").attr("src", cssimgsrc + "floatW_1.png");
        $(".imgFloat_1.noC").attr("src", cssimgsrc + "floatW_1_n.png");
        $(".imgFloat_2").attr("src", cssimgsrc + "floatW_2.png");
        $(".imgFloat_2.noC").attr("src", cssimgsrc + "floatW_2_n.png");
        $(".imgFloat_3").attr("src", cssimgsrc + "floatW_3.png");
        if($(".pageItem .bar img:visible").length > 0){
            $(".pageItem .bar img:visible").eq(0).attr("src",$(".pageItem .bar img:visible").eq(0).attr("src").replace("R","W"));
            $(".pageItem .bar img:visible").eq(1).attr("src",$(".pageItem .bar img:visible").eq(1).attr("src").replace("R","W"));
        }
    }
}
//正常阅读模式
function change_1(){
    $.cookie("isDoubleChange", "0", { path: "/", expires: 365 });
    window.location.reload();
}
//左右互换阅读模式
function change_2(){
    $.cookie("isDoubleChange", "1", { path: "/", expires: 365 });
    window.location.reload();
}
$(function () {
    isAnimation();
    //左右模式判断
    if(SHOW_READRIGHT){
        if(SHOW_READRIGHT){
            isDoubleChange = true;
            $("#leftPageChange").show();
            $("#rightPageChange").hide();
            /*if($(".read_order").length > 0){
             $(".read_order").text("阅读顺序：从右到左");
             }*/
            if($(".right.bar").length == 0){
                $(".a_1").attr("src",$(".a_1").eq(0).attr("src").replace("left","right"));
                $(".a_2").attr("src",$(".a_2").eq(0).attr("src").replace("left","right"));
                $(".left.bar").addClass("right");
                $(".left.bar").removeClass("left");
            }
            else{
                $(".a_1").attr("src",$(".a_1").eq(0).attr("src").replace("right","left"));
                $(".a_2").attr("src",$(".a_2").eq(0).attr("src").replace("right","left"));
                $(".right.bar").addClass("left");
                $(".right.bar").removeClass("right");
            }
        }
    }
    /*else if($.cookie("isDoubleChange") == "1"){
     isDoubleChange = true;
     $("#leftPageChange").show();
     $("#rightPageChange").hide();
     if($(".read_order").length > 0){
     $(".read_order").text("阅读顺序：从右到左");
     }
     if($(".right.bar").length = 0){
     $(".a_1").attr("src",$(".a_1").eq(0).attr("src").replace("left","right"));
     $(".a_2").attr("src",$(".a_2").eq(1).attr("src").replace("left","right"));
     $(".left.bar").addClass("right");
     $(".left.bar").removeClass("left");
     }
     else{
     $(".a_1").attr("src",$(".a_1").eq(0).attr("src").replace("right","left"));
     $(".a_2").attr("src",$(".a_2").eq(1).attr("src").replace("right","left"));
     $(".right.bar").addClass("left");
     $(".right.bar").removeClass("right");
     }
     }*/
    //目录标题显示
    switch($(".catalog .title .item").length){
        case 1: $(".catalog .title .item").css("width","100%"); break;
        case 2: $(".catalog .title .item").css("width","49.89%"); break;
    }
    $(".catalog .title .item").eq(0).click();
    //工具栏展开
    $("#navWrapTop").mouseover(function () {
        $("body.view").addClass("toolbar");
    })
    //工具栏收起
    $("#navWrapTop").mouseout(function () {
        $("body.view").removeClass("toolbar");
    })
    //注册键盘事件
    document.onkeydown = function (event) {
        var myEvent = event || window.event;
        if (myEvent.keyCode == 38) //up
        {
            pagePrev();
        }
        if (myEvent.keyCode == 40) //down
        {
            pageNext();
        }
        if (myEvent.keyCode == 37) //left
        {
            pagePrev();
        }
        if (myEvent.keyCode == 39) //right
        {
            pageNext();
        }
    }
    //判断地址页码
    var now = window.location.href;
    if(now.indexOf("-p") != -1){
        var now_1 = now.substring(now.indexOf("-p") + 2,now.length);
        if(now_1.indexOf("/") != -1){
            now_1 = now_1.substring(0,now_1.indexOf("/"));
        }
        console.log(now.substring(0,now.indexOf("-p")) + "/#page_" + now_1);
        var go_1 = now.substring(0,now.indexOf("-p")) + "/#page_" + now_1;
        setTimeout(function(){
            window.location.href = go_1;
        },0)
    }
    else if(now.indexOf("#page") != -1){
        var location = window.location.href;
        location = location.substring(location.indexOf("#page"),location.length);
        location = location.replace("#page_","");
        indexImg = $(".pageItem").eq(location-1).parents("li").index();
        //$(".myview ul").css("left", -(indexImg-1) + "00%");
        var w = $(".myview ul li").width();
        pageAnimate($(".myview ul"),indexImg-1,w,0);
    }
    //加载漫画
    pageNext();
    //显示左下页码
    $("#sumPage").text($(".myview ul li").length);
    $("#nowPage").text(indexImg);
    //显示阅读模式
    if(SHOW_READTYPE && $.cookie("recordChapterId") != CHAPTER_ID && false){
        alertTopShow(SHOW_READMESS);
        clearTimeout(timer);
        timer = setTimeout(function(){
            alertTopHide();
        },2000);
    }
    //新阅读顺序
    if(getQueryString("i") != 0 && SHOW_READTYPE){
        addReadTip(SHOW_READRIGHT);
    }
    else if(getQueryString("i") != 0){
        $.cookie("isShowOrder", 1, { path: "/", expires: 365 });
    }
    //保存章节编号
    $.cookie("recordChapterId", CHAPTER_ID, { path: "/", expires: 365 });
    //鼠标滚轮事件
    if (window.addEventListener){
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    //窗口大小改变事件
    $(window).resize(function(){
        $("body.view .main .indexImg").css("max-width",$(".flipForm").width()/2);
        $("body.view .main .maxImg").css("max-width",$(".flipForm").width());
        var w = $(".myview ul li").width();
        pageAnimate($(".myview ul"),indexImg-1,w,0);
    });
    //新手引导显示
    if($.cookie("isTeach") != "1"){
        $('.mask_t').show();
        $("body").addClass("toolbar");
        $.cookie("isTeach", "1", { path: "/", expires: 365 });
    }
})
var mousewheelSign = 0;
//鼠标滚轮事件处理
function handle(delta) {
    var s = delta + ": ";
    if (delta < 0){
        pageNext();
    }
    else{
        pagePrev();
    }
}
function wheel(event){
    if (mousewheelSign == 0&&!$(".catalog").is(":visible")) {
        mousewheelSign = 1;
        setTimeout(function(){
            mousewheelSign = 0;
        },300);
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta/120;
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail/3;
        }
        if (delta){
            handle(delta);
        }
    }
}
//目录显示
function showCatalog() {
    if ($("#ad").length == 0) {
        $(".catalog").toggle();
    }
    else {
        var scrollTop = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop > $("#ad").offset().top) {
            $("#catalog_2").toggle();
        }
        else {
            $("#catalog_1").toggle();
        }
    }
}
function showCatalog_1() {
    if ($("#ad").length == 0) {
        $(".catalog").show();
    }
    else {
        var scrollTop = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop > $("#ad").offset().top) {
            $("#catalog_2").show();
        }
        else {
            $("#catalog_1").show();
        }
    }
}
//目录关闭定时器
var catalogTimer;
//目录关闭时间
function closeCatalog(){
    clearTimeout(catalogTimer);
    catalogTimer = setTimeout(function(){
        $(".catalog").fadeOut();
    },1000);
}
function hideAd() {
    $(".adImg").hide();
    $(".adCross").hide();
    $(".adMask").hide();
}
//提示定时器
var timer;
//上一页
function pagePrev() {
    //判断当前显示状态
    if($(".mask_t").is(":visible")){
        $('body').removeClass('toolbar');
        $('.mask_t').hide();
    }
    else if($(".v_tip").length > 0){
        hideReadTip();
    }
    else if (indexImg > 1) {
        if($(".alertTop").is(":visible")==false){
            indexImg--;
            loadData();
            var w = $(".myview ul li").width();
            pageAnimate($(".myview ul"),indexImg-1,w);
            $("#nowPage").text(indexImg);
        }
    }
    else{
        alertTopShow("已经是第一页");
        clearTimeout(timer);
        timer = setTimeout(function(){
            alertTopHide();
        },1000);
    }
}
//下一页
function pageNext() {
    var l = lastTime;
    lastTime = new Date();
    if(lastTime - l > 2000){
        combtime++;
    }
    else{
        combtime = 0;
    }
    //判断当前显示状态
    if($(".mask_t").is(":visible")){
        $('body').removeClass('toolbar');
        $('.mask_t').hide();
    }
    else if($(".v_tip").length > 0){
        hideReadTip();
    }
    else if (indexImg < $(".myview ul li").length) {
        if($(".alertTop").is(":visible")==false){
            indexImg++;
            loadData();
            var w = $(".myview ul li").width();
            pageAnimate($(".myview ul"),indexImg-1,w);
            $("#nowPage").text(indexImg);
        }
    }
    else{
        alertTopShow("已经是最后一页");
        clearTimeout(timer);
        timer = setTimeout(function(){
            alertTopHide();
        },1000);
    }
}
function pageAnimate(ulObj, index, width, t) {
    if (typeof t != "number") t = 300;
    if ($.browser.msie  || !animation) {
        ulObj.stop().animate({left: "-" + index + "00%"}, t);
    } else {
        ulObj.css({
            left: '0px',
            transform: "translateX(-" + ( index * width ) + "px) translateZ(0px)",
            transition: "all " + (t * 2) + "ms cubic-bezier(0.005, 1.010, 1.000, 1.005)",
            'transform-origin': "50% 50% 0px"
        });
    }
}

function isAnimation() {
        var animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '',
        elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
        for( var i = 0; i < domPrefixes.length; i++ ) {
            if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                pfx = domPrefixes[ i ];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
}


//加载数据
function loadData(){
    var myIspre = 0;
    if(combtime > 1){
        myIspre = 1;
    }
    //左侧上一章跳转
    if(indexImg == 1){
        $(".cross-page .page-arrow-text-left").show();
        if($(".imgFloat_1").parent().attr("href") != "javascript:void(0);"){
            $("#crossLeft").attr("href",$(".imgFloat_1").parent().attr("href") + "?i=0");
        }
    }
    else{
        $(".cross-page .page-arrow-text-left").hide();
        $("#crossLeft").attr("href","javascript:pagePrev();");
    }
    //右侧下一章跳转
    if(indexImg == $(".myview ul li").length){
        $(".cross-page .page-arrow-text-right").show();
        if($(".imgFloat_2").parent().attr("href") != "javascript:void(0);"){
            $("#crossRight").attr("href",$(".imgFloat_2").parent().attr("href") + "?i=0");
        }
    }
    else{
        $(".cross-page .page-arrow-text-right").hide();
        $("#crossRight").attr("href","javascript:pageNext();");
    }
    //判断是否双页交换
    var nowLi = $(".myview ul li").eq(indexImg-1);
    if(!nowLi.hasClass("changed")){
        if(nowLi.find(".pageItem").length>1 && isDoubleChange){
            var form_1 = nowLi.find(".pageItem").eq(0);
            var form_2 = nowLi.find(".pageItem").eq(1);
            form_2.insertBefore(form_1);
            form_2.find("img.loading").css({"right":"2px","left":""});
            form_2.find("img.indexImg").css({"right":"2px","left":"","cursor":"url('" + cssimgsrc + "read_cur_1.png'),url('" + cssimgsrc + "read_cur_1.ico'),pointer"});
            form_1.find("img.loading").css({"left":"2px","right":""});
            form_1.find("img.indexImg").css({"left":"2px","right":"","cursor":"url('" + cssimgsrc + "read_cur_2.png'),url('" + cssimgsrc + "read_cur_2.ico'),pointer"});
            form_2.find(".indexImg").attr("onclick","pagePrev();");
            form_1.find(".indexImg").attr("onclick","pageNext();");
            form_1.css("text-align","left");
            form_2.css("text-align","right");
        }
        else{
            var form_1 = nowLi.find(".pageItem").eq(0);
            var form_2 = nowLi.find(".pageItem").eq(1);
            form_2.find("img.loading").css({"left":"2px","right":""});
            form_2.find("img.indexImg").css({"left":"2px","right":"","cursor":"url('" + cssimgsrc + "read_cur_2.png'),url('" + cssimgsrc + "read_cur_2.ico'),pointer"});
            form_1.find("img.loading").css({"right":"2px","left":""});
            form_1.find("img.indexImg").css({"right":"2px","left":"","cursor":"url('" + cssimgsrc + "read_cur_1.png'),url('" + cssimgsrc + "read_cur_1.ico'),pointer"});
            form_1.find(".indexImg").attr("onclick","pagePrev();");
            form_2.find(".indexImg").attr("onclick","pageNext();");
        }
        nowLi.addClass("changed");
    }
    //请求图片资源
    $.ajax({
        url: '/imageshow.ashx?d=' + new Date(),
        dataType: 'text',
        data: { cid: CHAPTER_ID ,page: indexImg ,showtype: 1 ,ispre: myIspre },
        error: function (msg) {
        },
        success: function (data) {
            //执行返回数据
            eval(data);
            //设置地址页码
            setPageInfo(chapterimage.PageIndex);
            //设置阅读历史
            setReadHistory(CHAPTER_ID,COMIC_MID,chapterimage.PageIndex,USER_ID);
            //设置当前页面窗口
            var nowForm;
            if(chapterimage.Images.length > 1){
                nowForm = $("#mangaImg_" + (chapterimage.PageIndex-1)).parent();
            }
            else{
                nowForm = $("#mangaImg_" + chapterimage.PageIndex).parent();
            }
            //双页第一页图片
            if(!isNaN(eval(chapterimage.ImageSize[0]))){
                nowForm.find(".loading").css("width",$(window).height()*eval(chapterimage.ImageSize[0]) + "px");
                if(chapterimage.Images.length == 1 && nowForm.parent().find(".pageItem_s").length == 0){
                    //nowForm.find(".indexImg").css("max-width","100%");
                    nowForm.css("max-width","100%");
                }
            }
            nowForm.find(".indexImg").attr("src", chapterimage.ImagePix+chapterimage.Images[0]);
            setCallBack(nowForm);
            if(chapterimage.IsEnd && chapterimage.Images.length == 1){
                nowForm.find(".bar").show();
            }
            else{
                nowForm.find(".bar").hide();
            }
            //双页第二页图片
            if(chapterimage.Images.length > 1){
                nowForm = $("#mangaImg_" + chapterimage.PageIndex).parent();
                if(!isNaN(eval(chapterimage.ImageSize[1]))){
                    nowForm.find(".loading").css("width",$(window).height()*eval(chapterimage.ImageSize[1]) + "px");
                }
                nowForm.find(".indexImg").attr("src", chapterimage.ImagePix+chapterimage.Images[1]);
                setCallBack(nowForm);
                if(chapterimage.IsEnd){
                    nowForm.find(".bar").show();
                }
                else{
                    nowForm.find(".bar").hide();
                }
            }
            else{
                if(nowForm.parent().find(".pageItem_s").length == 0){
                    //nowForm.find(".indexImg").css("max-width","100%");
                    nowForm.css("max-width","100%");
                    nowForm.find(".indexImg").attr("onclick","pageNext();");
                    setMouseBack(nowForm);
                }
                else{
                    nowForm.find(".indexImg").css("cursor","url('" + cssimgsrc + "read_cur_2.png'),url('" + cssimgsrc + "read_cur_2.ico'),pointer");
                    nowForm.find(".indexImg").attr("onclick","pageNext();");
                    nowForm.css("text-align","left");
                }
            }
            //循环预读
            for(var i = 0;i < chapterimage.PreloadImages.length;i++){
                //设置预读页面窗口
                var preForm = $("#mangaImg_" + (chapterimage.PageIndex+1+i)).parent();
                //设置页面
                var myIndex = i%2;
                preForm.find(".indexImg").attr("src", chapterimage.ImagePix+chapterimage.PreloadImages[i]);
                setCallBack(preForm);
            }
            //新阅读顺序提示
            if($.cookie("isShowOrder") == 1 && indexImg == 2){
                addReadTip(SHOW_READRIGHT);
            }
        }
    });
}
//设置鼠标移动事件
function setMouseBack(nowForm){
    //鼠标移动事件注册
    nowForm.find(".indexImg").mousemove(function(e){
        //获取鼠标位置
        var xx = e.clientX;
        // 获取窗口宽度
        var winWidth;
        if (window.innerWidth){
            winWidth = window.innerWidth;
        }
        else if ((document.body) && (document.body.clientWidth)){
            winWidth = document.body.clientWidth;
        }
        //判断鼠标位置
        if(xx > winWidth/2){
            nowForm.find(".indexImg").css("cursor","url('" + cssimgsrc + "read_cur_2.png'),url('" + cssimgsrc + "read_cur_2.ico'),pointer");
            nowForm.find(".indexImg").attr("onclick","pageNext();");
        }
        else{
            nowForm.find(".indexImg").css("cursor","url('" + cssimgsrc + "read_cur_1.png'),url('" + cssimgsrc + "read_cur_1.ico'),pointer");
            nowForm.find(".indexImg").attr("onclick","pagePrev();");
        }
    });
    //鼠标进入事件注册
    nowForm.find(".indexImg").hover(function(e){
        //获取鼠标位置
        var xx = e.clientX;
        // 获取窗口宽度
        var winWidth;
        if (window.innerWidth){
            winWidth = window.innerWidth;
        }
        else if ((document.body) && (document.body.clientWidth)){
            winWidth = document.body.clientWidth;
        }
        //判断鼠标位置
        if(xx > winWidth/2){
            nowForm.find(".indexImg").css("cursor","url('" + cssimgsrc + "read_cur_2.png'),url('" + cssimgsrc + "read_cur_2.ico'),pointer");
            nowForm.find(".indexImg").attr("onclick","pageNext();");
        }
        else{
            nowForm.find(".indexImg").css("cursor","url('" + cssimgsrc + "read_cur_1.png'),url('" + cssimgsrc + "read_cur_1.ico'),pointer");
            nowForm.find(".indexImg").attr("onclick","pagePrev();");
        }
    });
}
//设置回调
function setCallBack(nowForm){
    nowForm.find(".indexImg").load(function(){
        nowForm.find(".indexImg").show();
        nowForm.find(".loading").hide();
        nowForm.find(".num").hide();
        nowForm.find(".say").hide();
        //nowForm.removeClass("ib");
    });
}
//遮罩悬浮层显示
function maskShow(){
    $(".mask").show();
    $(".loginForm").show();
}
//遮罩悬浮层隐藏
function maskHide(){
    $(".mask").hide();
    $(".loginForm").hide();
}
//遮罩弹出层显示
function alertTopShow(str){
    $("#alertTop").text(str);
    $(".mask").show();
    $(".alertTop").show();
}
//遮罩弹出层隐藏
function alertTopHide(){
    $(".mask").hide();
    $(".alertTop").hide();
}
//章节按钮事件
function chapterBtnClick(item, id){
    $(item).parent().children().removeClass("active");
    $(item).addClass("active");
    $(".catalog ul").hide();
    $(".catalog ul").eq(id).show();
}
//跳转阅读模式
function isCrossPage(id){
    //document.cookie='crossPage=0';
    $.cookie("showtype", id, { path: "/", expires: 365 });
    window.location.reload();
}
//设置页码信息
function setPageInfo(page){
    if(window.location.href.indexOf("#page") == -1){
        window.location.href = window.location.href + "#page_" + page;
    }
    else{
        window.location.href = window.location.href.replace(/#page_[0-9]+/g,"#page_" + page);
    }
}
//保存cookie数据
function setCookieData(cid, now, pre){
    var newData = cid + ":" + now + ":" + pre;
    var cookieData = $.cookie("showdata");
    var dataArray = "";
    if(cookieData != null){
        dataArray = cookieData.split(",");
    }
    if(dataArray == ""){
        $.cookie("showdata", newData, { path: "/", expires: 365 });
    }
    else{
        var result = "";
        if(dataArray.length >= 10){
            for(var i = (dataArray.length-9);i < dataArray.length;i++){
                var sData = dataArray[i].split(":");
                if(sData[0] != cid){
                    result += dataArray[i];
                    result += ",";
                }
            }
            result += newData;
        }
        else{
            for(var i = 0;i < dataArray.length;i++){
                var sData = dataArray[i].split(":");
                if(sData[0] != cid){
                    result += dataArray[i];
                    result += ",";
                }
            }
            result += newData;
        }
        $.cookie("showdata", result, { path: "/", expires: 365 });
    }
}
//跳转页码页面
function goToPage(id){
    indexImg = id-1;
    //$(".myview ul").css("left", -(indexImg-1) + "00%");
    var w = $(".myview ul li").width();
    pageAnimate($(".myview ul"),indexImg-1,w,0);
    pageNext();
}
//添加阅读提示
function addReadTip(isRightRead){
    if(!isRightRead){
        var nowForm = $(".myview ul li").eq(indexImg-1).find(".pageItem").eq(0);
        nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_left_hover.png" style="position: absolute;top: 0;left: -2px;height: 100%;width: 100%;">'));
        nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_right_tip.png" style="position: absolute;top: 35%;left: 60px;">'));
        if($(".myview ul li").eq(indexImg-1).find(".pageItem").length > 1){
            nowForm = $(".myview ul li").eq(indexImg-1).find(".pageItem").eq(1);
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_hover.png" style="position: absolute;top: 0;left: 2px;height: 100%;width: 100%;">'));
        }
    }
    else{
        var nowForm;
        if($(".myview ul li").eq(indexImg-1).find(".pageItem").length > 1){
            nowForm = $(".myview ul li").eq(indexImg-1).find(".pageItem").eq(0);
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_hover.png" style="position: absolute;top: 0;right: 2px;height: 100%;width: 100%;">'));
            nowForm = $(".myview ul li").eq(indexImg-1).find(".pageItem").eq(1);
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_right_hover.png" style="position: absolute;top: 0;right: -2px;height: 100%;width: 100%;">'));
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_left_tip.png" style="position: absolute;top: 35%;right: 60px;">'));
        }
        else{
            nowForm = $(".myview ul li").eq(indexImg-1).find(".pageItem").eq(0);
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_right_hover.png" style="position: absolute;top: 0;right: 2px;height: 100%;width: 100%;">'));
            nowForm.append($('<img class="v_tip" src="' + cssimgsrc + 'view_left_tip.png" style="position: absolute;top: 35%;right: 60px;">'));
        }
    }
    $("body").append($('<div class="v_tip" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;" onclick="hideReadTip();"></div>'));
}
//隐藏阅读提示
function hideReadTip(){
    $(".v_tip").remove();
    $.cookie("isShowOrder", 0, { path: "/", expires: 365 });
}
//获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}