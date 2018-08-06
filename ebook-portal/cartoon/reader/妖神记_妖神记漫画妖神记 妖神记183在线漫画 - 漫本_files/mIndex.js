var bannerFormIndex = 0;
var bannerTimer;
$(function() {
    //提示栏隐藏
    if($.cookie('isTipForm')=='0'){
        $(".header_tipForm").remove();
        $(".searchList").css("top","75px");
    }
    else{
        var date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        $.cookie('isTipForm', '0', { expires: date });
        setTimeout(function(){
            $(".header_tipForm").slideUp();
            $(".searchList").css("top","75px");
        },5000);
    }
    search();
    //日历生成
    calendarCreate();
    //分享窗口隐藏事件注册
    shareFormHide();
    //书架窗口隐藏事件注册
    shelfFormHide();
    //搜索列表隐藏事件注册
    searchFormHide();
    //搜索框回车事件
    $("#searchtxt").keypress(function(event){
        var myEvent = event || window.event;
        if (myEvent.keyCode == 13)
        {
            $("#searchbt").click();
        }
    });
    //焦点图轮播事件
    $(".bannerForm ul").css("width",$(".bannerForm ul li").length*940);
    bannerTimer = setInterval(function(){
        bannerFormIndex++;
        if(bannerFormIndex > ($(".bannerForm ul li").length-1)){
            bannerFormIndex = 0;
        }
        $(".bannerForm ul").stop().animate({left:"-" + (bannerFormIndex*940) + "px"}, 500);
        $(".bannerForm .heart span").removeClass("active");
        $(".bannerForm .heart span").eq(bannerFormIndex).addClass("active");
    },3000);
    //右侧悬浮栏显示事件
    $(window).scroll(function () {
        var scrollTop = window.pageYOffset|| document.documentElement.scrollTop|| document.body.scrollTop;
        if(scrollTop > 300){
            $(".header_sider").show();
        }
        else{
            $(".header_sider").hide();
        }
    });
    //加载收藏状态
    if($(".btn_collection img").length > 0 || $(".pageItem .bar img").length > 0){
        $.ajax({
            url: 'userdata.ashx?d=' + new Date(),
            dataType: 'json',
            data: { tp: 7, mid: COMIC_MID },
            type: 'POST',
            success: function (data) {
                if (data && data.msg == "1") {
                    if($(".btn_collection img").length > 0){
                        if($(".btn_collection img").attr("src").indexOf("collection_2")==-1){
                            $(".btn_collection img").attr("src",$(".btn_collection img").attr("src").replace("collection","collection_2"));
                        }
                    }
                    if($(".pageItem .bar img").length > 0){
                        if($(".pageItem .bar img").eq(0).attr("src").indexOf("_2_n")==-1){
                            $(".pageItem .bar img.c_left").attr("src",$(".pageItem .bar img.c_left").eq(0).attr("src").replace("_2","_2_n"));
                            $(".pageItem .bar img.c_right").attr("src",$(".pageItem .bar img.c_right").eq(0).attr("src").replace("_2","_2_n"));
                        }
                    }
                    if($(".read_collection").length > 0){
                        if($(".read_collection").attr("src").indexOf("icon_1")!=-1){
                            $(".read_collection").attr("src",$(".read_collection").attr("src").replace("icon_1","icon_2"));
                        }
                    }
                }
            }
        });
    }
});
//置顶事件
function returnTop(){
    $("html,body").stop().animate({scrollTop:0},500);
}
//焦点图跳转事件
function bannerClick(id){
    bannerFormIndex = id;
    $(".bannerForm ul").stop().animate({left:"-" + (bannerFormIndex*940) + "px"}, 500);
    $(".bannerForm .heart span").removeClass("active");
    $(".bannerForm .heart span").eq(bannerFormIndex).addClass("active");
    clearInterval(bannerTimer);
    bannerTimer = setInterval(function(){
        bannerFormIndex++;
        if(bannerFormIndex > ($(".bannerForm ul li").length-1)){
            bannerFormIndex = 0;
        }
        $(".bannerForm ul").stop().animate({left:"-" + (bannerFormIndex*940) + "px"}, 500);
        $(".bannerForm .heart span").removeClass("active");
        $(".bannerForm .heart span").eq(bannerFormIndex).addClass("active");
    },3000);
}
//跳转事件
function hrefClick(url){
    window.location.href = url;
}
//按钮点击切换事件
function btnClick(item){
	$(item).parent().children().removeClass("active");
	$(item).addClass("active");
}
//首页排行榜切换事件
function rankListClick(item, id) {
    btnClick(item);
    $(".mPage .banner .rank .list").hide();
    $("#rankList_" + id).show();
}
//个人中心姓名编辑事件
function nameEdit(){
    $("#nameEdit_1").toggle();
    $("#nameEdit_2").toggle();
}
//原创精品当前页
var originalIndex = 1;
//首页原创精品切换事件
function originalClick(item, id){
    btnClick(item);
    originalIndex = id+1;
    $(".mPage .original .bookList_1").hide();
    $(".mPage .original .bookList_1").eq(originalIndex-1).show();
}
//首页原创精品换一批按钮事件
function originalChangeClick(){
    originalIndex++;
    if(originalIndex > 3){
        originalIndex = 1;
    }
    //$(".mPage .original .topBar ul li").eq(originalIndex-1).parent().children().removeClass("active");
    //$(".mPage .original .topBar ul li").eq(originalIndex-1).addClass("active");
    $(".mPage .original .bookList_1").hide();
    $(".mPage .original .bookList_1").eq(originalIndex-1).show();
}
//书架切换事件
function bookshelfClick(item, id) {
    btnClick(item);
    $(".mPage .bookshelf .list").hide();
    $("#bookshelf_list_" + id).show();
    if (id == 1) {
        $.ajax({
            url: '/userdata.ashx?d=' + new Date(),
            dataType: 'json',
            data: { top: 3, language: 1, tp:1 },
            error: function (msg) {

            },
            success: function (json) {
                var ht = [];
                if(json.length == 0){
                    $("#shelf_collection_noData").show();
                    $("#shelf_collection_noData p").text("暂无任何收藏");
                    $("#shelf_collection_noData img").show();
                }
                else{
                    $("#shelf_collection_noData").hide();
                }
                $.each(json, function (i, n) {
                    if(i < 3){
                        ht.push("<li onclick=\"hrefClick('/" + n.MangaUrl + "')\">");
                        ht.push("<a class=\"ib img\"><img src=\"" + n.MangaImageUrl + "\" /></a>");
                        ht.push("<div class=\"ib info\">");
                        ht.push("<p><a href=\"/" + n.MangaUrl + "/\" class=\"font_1\">" + n.MangaTitle + "</a>");
                        ht.push("</p>");
                        if(n.NextChapterUrl!=""){
                            ht.push("<p>");
                        }
                        else{
                            ht.push("<p class=\"ll\">");
                        }
                        if(n.ReadChapterName == "" || n.ReadChapterName == null){
                            ht.push("<span class=\"font_2\" style=\"visibility: hidden;\">已看</span>");
                        }
                        else{
                            ht.push("<span class=\"font_2\">已看</span>");
                            ht.push("<a href=\"/" + n.ReadChapterUrl + "/\" class=\"font_3\">" + n.ReadChapterName + "</a>");
                        }
                        ht.push("</p>");
                        if(n.NextChapterUrl!=""){
                            ht.push("<p class=\"l\"><a href=\"/" + n.NextChapterUrl + "/\" class=\"font_4\">看下一话</a></p>");
                        }
                        ht.push("<p>");
                        if (n.IsNewst) {
                            ht.push("<span class=\"new\">NEW</span>");
                        }
                        if (n.ChapterName != "" && n.ChapterName != null) {
                            ht.push("<a href=\"/" + n.ChapterUrl + "/\" class=\"ib font_5\">更新" + n.ChapterName + "");
                        }

                        if (n.NextChapterTitle != "") {
                            ht.push(":");
                            ht.push(n.NextChapterTitle);
                        }
                        ht.push("</a></p>");
                        ht.push("</div>");
                        ht.push("</li>");
                    }
                });
                var result = ht.join("");
                $("#bookshelf_list_1 ul").html(result);
            }
        });
    }
    else if (id == 2) {
        $.ajax({
            url: '/userdata.ashx?d=' + new Date(),
            dataType: 'json',
            data: { top: 3, language: 1,tp:2 },
            error: function (msg) {

            },
            success: function (json) {
                var ht = [];
                if(json.length == 0){
                    $("#shelf_record_noData").show();
                    $("#shelf_record_noData p").text("暂无任何记录");
                    $("#shelf_record_noData img").show();
                }
                else{
                    $("#shelf_record_noData").hide();
                }
                $.each(json, function (i, n) {
                    if(i < 3){
                        ht.push("<li onclick=\"hrefClick('/" + n.MangaUrl + "')\">");
                        ht.push("<a class=\"ib img\"><img src=\"" + n.MangaImageUrl + "\" /></a>");
                        ht.push("<div class=\"ib info\">");
                        ht.push("<p><a href=\"/" + n.MangaUrl + "/\" class=\"font_1\">" + n.MangaTitle + "</a>");
                        ht.push("</p>");
                        if(n.NextChapterUrl!=""){
                            ht.push("<p>");
                        }
                        else{
                            ht.push("<p class=\"ll\">");
                        }
                        if(n.ReadChapterName == "" || n.ReadChapterName == null){
                            ht.push("<span class=\"font_2\" style=\"visibility: hidden;\">已看</span>");
                        }
                        else{
                            ht.push("<span class=\"font_2\">已看</span>");
                            ht.push("<a href=\"/" + n.ReadChapterUrl + "/\" class=\"font_3\">" + n.ReadChapterName + "</a>");
                        }
                        ht.push("</p>");
                        if(n.NextChapterUrl!=""){
                            ht.push("<p class=\"l\"><a href=\"/" + n.NextChapterUrl + "/\" class=\"font_4\">看下一话</a></p>");
                        }
                        ht.push("<p>");
                        if (n.IsNewst) {
                            ht.push("<span class=\"new\">NEW</span>");
                          
                        }
                        if (n.ChapterName != "" && n.ChapterName != null) {
                            ht.push("<a href=\"/" + n.ChapterUrl + "/\" class=\"ib font_5\">更新" + n.ChapterName + "");
                        }
                        if (n.NextChapterTitle != "") {
                            ht.push(":");
                            ht.push(n.NextChapterTitle);
                        }
                        ht.push("</a></p>");
                        ht.push("</div>");
                        ht.push("</li>");
                    }
                });
                var result = ht.join("");
                $("#bookshelf_list_2 ul").html(result);
            }
        });
    }
}
//书架显示事件
function bookshelfToggle() {
    bookshelfClick($(".mPage .bookshelf .selectBar a")[0], 2);
    $(".mPage .bookshelf").toggle();
}
//书架阅读记录删除事件
function shelfRecordDelete(item){
    $(item).parent().parent().parent().hide();
    if($("#bookshelf_list_2 ul li:visible").length == 0){
        $("#bookshelf_list_2 ul").hide();
        $("#shelf_record_refresh").show();
    }
}
//书架窗口失焦隐藏事件
function shelfFormHide(){
    $(document).bind("click",function(e){ 
        var target = $(e.target); 
        if(target.closest("#topShelf").length == 0 && target.closest("#Icon_m_header_btn_2").length == 0){ 
            $("#topShelf").hide(); 
        } 
    });
}
//搜索列表失焦隐藏事件
function searchFormHide(){
    $(document).bind("click",function(e){ 
        var target = $(e.target); 
        if(target.closest(".searchBar").length == 0 && target.closest(".searchList").length == 0){ 
            $(".searchList").hide(); 
        } 
    });
}
//首页右侧栏排行切换事件
function topicRightBarClick(id) {
    switch (id) {
        case 1:
            $(".mPage .topic_1 .rightBar .top img").eq(0).attr("src",cssimgsrc + "m_topic_rightBar_top_2_left.png");
            $(".mPage .topic_1 .rightBar .top img").eq(1).attr("src", cssimgsrc + "m_topic_rightBar_top_2_right.png");
            $(".mPage .topic_1 .rightBar .list").hide();
            $(".mPage .topic_1 .rightBar .list").eq(1).show();
            break;
        case 2:
            $(".mPage .topic_1 .rightBar .top img").eq(0).attr("src", cssimgsrc + "m_topic_rightBar_top_left.png");
            $(".mPage .topic_1 .rightBar .top img").eq(1).attr("src", cssimgsrc + "m_topic_rightBar_top_right.png");
            $(".mPage .topic_1 .rightBar .list").hide();
            $(".mPage .topic_1 .rightBar .list").eq(0).show();
            break;
    }
}
//当前选择事件
var activeDate = new Date();
//当前选择事件
var selectDate = new Date();
//生成日历函数
function calendarCreate() {
    activeDate.setDate(1);
    $("#calendarTitle").text(activeDate.getFullYear() + "年" + (activeDate.getMonth()+1) + "月");
    var myDate = new Date(activeDate.getFullYear() + "-" + (activeDate.getMonth()+1));
    myDate.setDate(1);
    var html_str = "";
    html_str += "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>";
    if(myDate.getDay() != 0){
        html_str += "</tr><tr>";
    }
    for(var i = 0;i < myDate.getDay();i++){
        html_str += "<td></td>";
    }
    while(myDate.getMonth() == activeDate.getMonth()){
        if(myDate.getDay() == 0){
            html_str += "</tr><tr>";
        }
        if(myDate.getDate() == selectDate.getDate() && myDate.getMonth() == selectDate.getMonth() && myDate.getFullYear() == selectDate.getFullYear()){
            html_str += "<td class='active' onclick='calendarSelect(this, " + myDate.getDate() + ")'>";
            html_str += myDate.getDate();
            html_str += "</td>";
        }
        else{
            html_str += "<td onclick='calendarSelect(this, " + myDate.getDate() + ")'>";
            html_str += myDate.getDate();
            html_str += "</td>";
        }
        myDate.setDate(myDate.getDate()+1);
    }
    for(var i = 0;i < ((7-myDate.getDay())%7);i++){
        html_str += "<td></td>";
    }
    html_str += "</tr>";
    $("table#calendar").html(html_str);
}
//日历月份调整事件
function calendarUpdate(type) {
    switch (type) {
        case 1: activeDate.setMonth(activeDate.getMonth() + 1); calendarCreate(); break;
        case 2: activeDate.setMonth(activeDate.getMonth() - 1); calendarCreate(); break;
    }
}
//选择日期函数
function calendarSelect(item, date) {
    $(".mPage .sideBar .calendar table td").removeClass("active");
    $(item).addClass("active");
    activeDate.setDate(date);
    window.location.href = "/mh-updated-date"+activeDate.Format("yyyyMMdd")+ "/";
}
function search() {
    $("#searchcomiclist li").click(function () {
        if (!$(this).hasClass("active")) {
            var cg = $(this).attr("data");
            var tag = $(this).attr("tag");
            $("#searchcomiclist li").removeClass("active");
            $(this).addClass("active");
            $.ajax({
                url: 'searchcomic.ashx',
                dataType: 'json',
                data: { cg: cg, tag: tag, top: 70 },
                error: function (msg) {
                },
                success: function (json) {
                    var ht = [];
                    ht.push("<div class=\"group ib\">");
                    $.each(json, function (i, n) {
                        ht.push("<div class=\"item\">" + "<span class=\"num ib\">" + (i+1) + "</span><a href=\""+n.UrlKey+"\""+" class=\"comic\">"+n.Title+"</a></div>");
                        if ((i+1) % 10 == 0 && (i+1) != 70) {
                            ht.push("</div><div class=\"group ib\">");
                        }
                    });

                    ht.push("</div>");
                    
                    $("#searchcomiccontent").html(ht.join(""));
                }
            });
        }

        if ($(this).parent().attr("class") != "on") {
            $(this).parent().siblings().removeClass("on");
            $(this).parent().addClass("on");
            var nameindex = $(".mainnav2 .on a").attr("data");
            var cg = $(".mainnav .on a").attr("data");
            $(".innr7").html("数据加载中...");
            $.ajax({
                url: 'searchcomic.ashx',
                dataType: 'json',
                data: { cg: cg, nameindex: nameindex, top: 49 },
                error: function (msg) {
                },
                success: function (json) {
                    var ht = [];
                    $.each(json, function (i, n) {
                        if (nameindex != "HOT") {
                            ht.push("<div class=\"innr72\"><a href=\"/" + n.UrlKey + "/\" title=\"" + n.Title + "\">" + n.Title + "</a> <span class=\"red_lj\"><a href=\"/" + n.LastGenuineUrl + "/\" title=\"" + n.Title + " " + n.GenuineShowName + "\">[" + n.GenuineShowName + "]</a></span>" + n.ShowSign + "</div>");
                        }
                        else {
                            ht.push("<div class=\"innr72\"><a href=\"/" + n.UrlKey + "/\" title=\"" + n.Title + "\">" + n.Title + "</a> <span class=\"red_lj\"><a href=\"/" + n.LastGenuineUrl + "/\" title=\"" + n.Title + " " + n.GenuineShowName + "\">[" + n.GenuineShowName + "]</a></span>" + n.ShowNew + n.ShowUpdate + "</div>");
                        }
                    });
                    var url = "/mh-list";
                    if (cg != "") {
                        url += "-cg" + cg;
                    }
                    if (nameindex != "") {
                        url += "-char" + nameindex;
                    }
                    ht.push("<div class=\"innr72\"><a href=\"" + url + "/ \">查看更多...</a></div>  <div class=\"ff\"></div>");

                    $(".innr7").html(ht.join(""));

                }
            });
        }
    });
}

function createSearchTag(stag) {
    
}

function imgreload(v, action) {
    var id = "#" + v;
    var act = "";
    if (action) {
        act = "bar";
    }
    if (act == "bar") {
        $(id).attr("src", "/image.ashx?action=bar&d=" + new Date());
    }
    else {
        $(id).attr("src", "/image.ashx?d=" + new Date());
    }
}

function validcode(tid, code, action) {
    var result = false;
    var act = "";
    if (action) {
        act = "bar";
    }

    $.ajax({
        url: '/checkcode.ashx?d=' + new Date(),
        dataType: 'json',
        data: { code: code, action: act },
        async: false,
        error: function (msg) {
        },
        success: function (json) {
            if (json.result == 'success') {
                result = true;
            }
            else {
                var id = "#" + tid;
                if (act == "bar") {
                    $(id).attr("src", "/image.ashx?action=bar&d=" + new Date());
                }
                else {
                    $(id).attr("src", "/image.ashx?d=" + new Date());
                }
                result = false;
            }
        }
    });
    return result;
}

function loginvaldata() {
    var username = $("#txt_name");
    var pwd = $("#txt_password");
    var rndcode = $("#txt_code");
    if (username.val() == "" || username.val() == username.attr("placeholder")) {
        $("#showerrorct").show();
        $("#showerror").html("请输入用户名/邮箱");
        username.get(0).focus();
        return false;
    }
    if (pwd.val() == "" || pwd.val() == pwd.attr("placeholder")) {
        $("#showerror").html("请输入登录密码");
        pwd.get(0).focus();
        return false;
    }
    if (rndcode.length > 0) {
        if (rndcode.val() == "") {
            $("#showerrorct").show();
            $("#showerror").html("请输入验证码");
            rndcode.get(0).focus();
            return false;
        }
        if (!validcode("imgcode", rndcode.val())) {
            $("#showerrorct").show();
            $("#showerror").html("验证码错误");
            imgreload('code');
            rndcode.get(0).focus();
            return false;
        }
    }
    return true;
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//我的书架编辑按钮事件
function shelfEditClick(){
    $("#tool_noEdit").hide();
    $("#tool_edit").show();
    $(".mPage .bookList_3 .item .book").addClass("s_1");
    isAllSelect();
}
//我的书架完成按钮事件
function shelfFinishClick(){
    $("#tool_noEdit").show();
    $("#tool_edit").hide();
    $(".mPage .bookList_3 .item .book").removeClass("s_1");
    $(".mPage .bookList_3 .item .book").removeClass("s_2");
    $("#selectCount").text(0);
}
//我的书架编辑选择事件
function shelfEditSelect(item){
    $(item).parent().removeClass("s_1");
    $(item).parent().addClass("s_2");
    var nowCount = parseInt($("#selectCount").text());
    $("#selectCount").text(++nowCount);
    isAllSelect();
}
//我的书架编辑取消事件
function shelfEditCancel(item){
    $(item).parent().removeClass("s_2");
    $(item).parent().addClass("s_1");
    var nowCount = parseInt($("#selectCount").text());
    $("#selectCount").text(--nowCount);
    isAllSelect();
}
//阅读记录全部清空事件
function shelfClearAll(){
    if(confirm('确认全部清空吗？')){
        var result = "";
        for(var i = 0;i < $(".mPage .bookList_3 .item .book").length;i++){
            result += $(".mPage .bookList_3 .item .book").eq(i).parent().attr("id");
            result += ",";
        }
        result = result.substring(0, result.length - 1);
        if(result != ""){
            $.ajax({
                url: '/userdata.ashx?d=' + new Date(),
                dataType: 'json',
                data: { tp: 4,ids:result},
                async: false,
                error: function (msg) {
                    alertTopShow("操作异常");
                },
                success: function (mes) {
                    if (mes.msg == "success") {
                       window.location.reload();
                    }
                    else if(mes.msg == "error"){
                        alertTopShow("删除出错");
                    }
                }
            });
        }
    }
}
//我的书架确认按钮事件
function shelfEditConfirm(type){
    var result = "";
    for(var i = 0;i < $(".mPage .bookList_3 .item .book.s_2").length;i++){
        result += $(".mPage .bookList_3 .item .book.s_2").eq(i).parent().attr("id");
        result += ",";
    }
    result = result.substring(0, result.length - 1);
    var tp = 0;
    if (type == 1) {
        tp = 3;
    }
    else if (type == 2) {
        tp = 4;
    }
    if(result != ""){
        $.ajax({
            url: '/userdata.ashx?d=' + new Date(),
            dataType: 'json',
            data: { tp: tp,ids:result},
            async: false,
            error: function (msg) {
                alertTopShow("操作异常");
            },
            success: function (mes) {
                if (mes.msg == "success") {
                   window.location.reload();
                }
                else if(mes.msg == "error"){
                    alertTopShow("删除出错");
                }
            }
        });
    }
}
//我的书架全选事件
function allSelect(){
    if($("#allBtn").text() == "全选"){
        $("#selectCount").text($(".mPage .bookList_3 .item .book").length);
        $(".mPage .bookList_3 .item .book").removeClass("s_1");
        $(".mPage .bookList_3 .item .book").addClass("s_2");
        isAllSelect();
    }
    else if($("#allBtn").text() == "取消全选"){
        $("#selectCount").text(0);
        $(".mPage .bookList_3 .item .book").removeClass("s_2");
        $(".mPage .bookList_3 .item .book").addClass("s_1");
        isAllSelect();
    }
}
//我的书架判断全选状态
function isAllSelect(){
    var nowCount = parseInt($("#selectCount").text());
    if(nowCount == 0){
        $("#delBtn").addClass("g");
    }
    else{
        $("#delBtn").removeClass("g");
    }
    if($(".mPage .bookList_3 .item .book").length == nowCount){
        $("#allBtn").removeClass("n");
        $("#allBtn").text("取消全选");
    }
    else{
        $("#allBtn").addClass("n");
        $("#allBtn").text("全选");
    }
}
//输入框计数函数
function textCount(item, num){
    var result = num - $(item).val().length;
    $("#textarea_count").text(result);
}
//遮罩悬浮层显示
function maskShow(){
    $(".mask").show();
    $(".layer").show();
    imgreload('code');
}
//遮罩悬浮层隐藏
function maskHide(){
    isPublish = false;
    $(".mask").hide();
    $(".layer").hide();
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
//遮罩弹出层显示_1
function alertTopShow_1(str){
    $("#alertTop_1").text(str);
    //$(".mask").show();
    $(".alertTop_1").show();
    setTimeout(function(){
        alertTopHide_1();
    },1000);
}
//遮罩弹出层隐藏_1
function alertTopHide_1(){
    //$(".mask").hide();
    $(".alertTop_1").hide();
}
//详情页面排序切换事件
function sortBtnClick(item){
    $(item).toggleClass("sortBak");
    //$(".mPage .mainForm .chapterList div.sortAlert").toggleClass("sortBak");
    if (COMIC_SORT == 1) {
        COMIC_SORT = 2;
        alertTopShow_1("最新在前");
    }
    else {
        COMIC_SORT = 1;
        alertTopShow_1("最新在后");
    }
    $("#chapterlistload").height($("#chapterlistload").height());
    $("#chapterlistload").load("/comicsort-" + COMIC_MID + "-s" + COMIC_SORT + "/");
    $("#chapterlistload").css("height", "auto");
    //$(".mPage .mainForm .chapterList div.sortAlert").show();
    //setTimeout(function(){
    //    $(".mPage .mainForm .chapterList div.sortAlert").hide();
    //},500);
}
function getcomment(mid,type) {
    var id = "hotcomment";
    switch (type) {
        case 1:
            id = "hotcomment";
            break;
        case 2:
            id = "authorcomment";
            $("#"+id).html("正在加载中...");
            $("#"+id).load("/comment-" + mid + "-t" + type + "/");
            break;
    }
}

//详情页面分享切换事件
function shareBtnClick(){
    $("#shareForm").toggle();
}
//详情页面分享窗口失焦隐藏事件
function shareFormHide(){
    $("body").click(function(event){
        if(event.target.id != "shareForm"){
            $("#shareForm").hide();
        }
    });
}
//邮箱验证事件
function mailVerify(item){
    var mailReg = /^([\w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;
    if(mailReg.test($(item).val())){
        if($(item).val().length < 6 || $(item).val().length > 50){
            showTipContent("邮箱格式错误", 1);
        }
        else{
            $.ajax({
                url: '/checkname.ashx?d=' + new Date(),
                dataType: 'json',
                data: { txt_reg_email: $(item).val() },
                async: false,
                error: function (msg) {
                },
                success: function (json) {
                    if (json.result == 'success') {
                        showTipContent("邮箱可用", 2);
                    }
                    else{
                        showTipContent("邮箱已占用", 1);
                    }
                }
            });
        }
    }
    else{
        if($(item).val() == ""){
            showTipContent("邮箱不填可是不行的哦", 1);
        }
        else{
            showTipContent("邮箱格式错误", 1);
        }
    }
}
//用户名验证事件
function userNameVerify(item){
    if($(item).val() == ""){
        showTipContent("用户名不填可是不行的哦", 1);
    }
    else{
        $.ajax({
            url: '/checkname.ashx?d=' + new Date(),
            dataType: 'json',
            data: { txt_reg_name: $(item).val(), action: "name" },
            async: false,
            error: function (msg) {
            },
            success: function (json) {
                if (json.result == 'success') {
                    showTipContent("用户名可用", 2);
                }
                else{
                    showTipContent("用户名已占用", 1);
                }
            }
        });
    }
}
//密码验证事件
function passwordVerify(item){
    if($(item).val() == ""){
        showTipContent("密码不填可是不行的哦", 1);
    }
    else if($(item).val().length < 6 || $(item).val().length > 50){
        showTipContent("密码格式错误", 1);
    }
    else{
        showTipContent("", 1);
    }
}
//用户名密码为空验证
function nullVerify(item, id){
    if($(item).val() == ""){
        if(id == 1){
            showTipContent("用户名不填可是不行的哦", 1);
        }
        else if(id == 2){
            showTipContent("密码不填可是不行的哦", 1);
        }
    }
    else{
        showTipContent("", 1);
    }
}
// 姓名验证
function xmVerify(item){
    var myReg = /^[\u4e00-\u9fa5]{2,4}$/;
    if(!myReg.test($(item).val())){
        showTipContent("请输入真实姓名", 1);
    }
    else{
        showTipContent("", 1);
    }
}
// 身份证验证
function sfzVerify(item){
    var myReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(!myReg.test($(item).val())){
        showTipContent("身份证号码无效，请重新输入", 1);
    }
    else{
        showTipContent("", 1);
    }
}
// 手机号验证
function sjVerify(item){
    var myReg = /^0{0,1}(13[0-9]|15[1-9]|17[1-9]|18[7-9])[0-9]{8}$/;
    if(!myReg.test($(item).val())){
        showTipContent("请输入正确的手机号", 1);
    }
    else{
        showTipContent("", 1);
    }
}
//验证码验证事件
function codeVerify(item){
    $.ajax({
        url: '/checkcode.ashx?d=' + new Date(),
        dataType: 'json',
        data: { code: $(item).val() },
        async: false,
        error: function (msg) {
        },
        success: function (json) {
            if (json.result == 'success') {
                showTipContent("", 1);
            }
            else{
                showTipContent("啊勒嘞？验证码不对诶!", 1);
                $("#code").attr("src", "/image.ashx?d=" + new Date());
            }
        }
    });
}
//显示错误提示
function showTipContent(str, id){
    if(str == ""){
        $("#tip").html(str);
    }
    else if(id == 1){
        $("#tip").html('<span class="ib i" id="Icon_detailPage_tip_logo"></span><span class="red">' + str + '</span>');
    }
    else if(id == 2){
        $("#tip").html('<span class="ib i" id="Icon_detailPage_tip_logo_1"></span><span class="green">' + str + '</span>');
    }
}
//首页搜索框输入事件
function searchKeydown(item){
    var keyword = $(item).val();
    $.ajax({
        url: '/search.ashx?t=' + keyword + '&isremovehtml=1',
        dataType: 'json',
        error: function (msg) {
        },
        success: function (json) {
            $(".searchList").html("");
            for(var i = 0;i < 10 && i < json.length;i++){
                var title = json[i].Title;
                for(var n = 0;n < title.length;n++){
                    title = title.replace(keyword[n], '♣' + keyword[n] + '♠');
                }
                title = title.replace(/♣/g,'<span class="b">');
                title = title.replace(/♠/g,'</span>');
                $(".searchList").append('<span class="item" onclick="hrefClick(\'/' + json[i].Url + '\')"><span class="fr" onclick="hrefClick(\'' + json[i].LastPartUrl + '\');"><a href="/' + json[i].LastPartUrl + '" target="_blank">' + json[i].LastPartName + '</a></span>' + title + '</span>');
            }
        }
    });
}
function setBookmarker(cid, mid, p) {
    if(($(".btn_collection img").length > 0 && $(".btn_collection img").attr("src").indexOf("collection_2")!=-1) || ($(".pageItem .bar img:visible").length > 0 && $(".pageItem .bar img:visible").eq(0).attr("src").indexOf("_2_n")!=-1) || ($(".read_collection").length > 0 && $(".read_collection").attr("src").indexOf("icon_2")!=-1)){
        $.ajax({
            url: 'bookmarker.ashx?d=' + new Date(),
            dataType: 'json',
            data: { cid: cid, mid: mid, page: p, language:1, cancel:1 },
            type: 'POST',
            success: function (msg) {
                if (msg.Value == "0") {
                    alertTopShow_1("取消收藏失败！参数不正确");
                }
                else if (msg.Value == "1") {
                    if($(".btn_collection img").length > 0){
                        if($(".btn_collection img").attr("src").indexOf("collection_2")!=-1){
                            $(".btn_collection img").attr("src",$(".btn_collection img").attr("src").replace("collection_2","collection"));
                        }
                    }
                    if($(".pageItem .bar img:visible").length > 0){
                        if($(".pageItem .bar img:visible").eq(0).attr("src").indexOf("_2_n")!=-1){
                            $(".pageItem .bar img:visible").eq(0).attr("src",$(".pageItem .bar img:visible").eq(0).attr("src").replace("_2_n","_2"));
                        }
                    }
                    if($(".read_collection").length > 0){
                        if($(".read_collection").attr("src").indexOf("icon_2")!=-1){
                            $(".read_collection").attr("src",$(".read_collection").attr("src").replace("icon_2","icon_1"));
                        }
                    }
                    alertTopShow_1("取消收藏成功！");
                } else if (msg.Value == "3") {
                    alertTopShow_1("取消收藏失败！出现异常");
                } else if (msg.Value == "4") {
                    maskShow();
                }
            }
        });
    }
    else{
        $.ajax({
            url: 'bookmarker.ashx?d=' + new Date(),
            dataType: 'json',
            data: { cid: cid, mid: mid, page: p,language:1 },
            type: 'POST',
            success: function (msg) {
                if (msg.Value == "0") {
                    alertTopShow_1("收藏失败！参数不正确");
                }
                else if (msg.Value == "1") {
                    if($(".btn_collection img").length > 0){
                        if($(".btn_collection img").attr("src").indexOf("collection_2")==-1){
                            $(".btn_collection img").attr("src",$(".btn_collection img").attr("src").replace("collection","collection_2"));
                        }
                    }
                    if($(".pageItem .bar img:visible").length > 0){
                        if($(".pageItem .bar img:visible").eq(0).attr("src").indexOf("_2_n")==-1){
                            $(".pageItem .bar img:visible").eq(0).attr("src",$(".pageItem .bar img:visible").eq(0).attr("src").replace("_2","_2_n"));
                        }
                    }
                    if($(".read_collection").length > 0){
                        if($(".read_collection").attr("src").indexOf("icon_1")!=-1){
                            $(".read_collection").attr("src",$(".read_collection").attr("src").replace("icon_1","icon_2"));
                        }
                    }
                    alertTopShow_1("收藏成功！");
                } else if (msg.Value == "3") {
                    alertTopShow_1("收藏失败！出现异常");
                } else if (msg.Value == "4") {
                    maskShow();
                }
            }
        });
    }
}

function setReadHistory(cid, mid, p, uid) {
    $.ajax({
        url: "userdata.ashx",
        dataType: 'json',
        data: { cid: cid, mid: mid, page: p, uid: uid, language: 1,tp:8 },
        type: 'POST',
        success: function (msg) {

        }
    });
    if(typeof(dd_userid) != 'undefined'){
        dd_ajax(cid, p);
    }
}
//首页登录按钮悬浮事件
function indexTopHover(item){
    $(item).attr("id", $(item).attr("id").replace("btn","btn_a"));
}
//首页登录按钮鼠标离开事件
function indexTopOut(item){
    $(item).attr("id", $(item).attr("id").replace("btn_a","btn"));
}
//章节列表切换事件
function charpterClick(id){
    $(".mPage .mainForm .chapterList .list").hide();
    $(".mPage .mainForm .chapterList .list").eq(id).show();
}
//章节加载更多事件
function charpterMore(item){
    $(item).parent().find("a").show();
    $(item).remove();
}

function login() {
    $.ajax({
        url: 'login.ashx?d=' + new Date(),
        dataType: 'json',
        data: { name: username, password: pwd, code: rndcode, remember: re },
        error: function(msg) {
            alertTopShow(msg);
            $("#code").attr("src", $("#code").attr("src") + '?code=' + randomNum(10));
        },
        success: function(json) {
            if (json.msg == 'success') {
                window.location.reload();
            } else {
                $("#errormsg span").text(json.error);
                $("#code").attr("src", $("#code").attr("src") + '?code=' + randomNum(10));
            }
        }
    });
}
function position(pid, v) {
    $.ajax({
        url: "/position.ashx?d=" + new Date(),
        dataType: "json",
        data: {
            pid: pid,
            v: v
        },
        error: function(meg) {
            console.log(meg);
        },
        success: function (e) {
            if($("#support_" + pid).parent().find("img").eq(0).attr("src").indexOf("star_1") != -1){
                var count = parseInt($("#support_" + pid).text().replace('(','').replace(')',''));
                count++;
                $("#support_" + pid).text('(' + count + ')');
                $("#support_" + pid).parent().find("img").eq(0).attr("src",$("#support_" + pid).parent().find("img").eq(0).attr("src").replace("star_1","star_2"));
            }
        }
    });
}
//评论回复按钮事件
function returnBtnClick(pid){
    var h = $("#commentText").offset().top - 100;
    $("html,body").stop().animate({scrollTop:h},1000);
    $("#commentText").focus();
    commentPID = pid;
    $("#commentText").val("@" + $(".n_" + pid).text() + " ");
    textCount($("#commentText")[0], 180);
}
//修改密码提交验证事件
function userpasswordConfirm(){
    if($("#txtPasswordOld").val() == ""){
        $("#tip_password").show();
        $("#tip_password .red").text("旧密码不填可是不行的哦");
        $("#txtPasswordOld").focus();
        return false;
    }
    else if($("#txtPasswordOld").val().length < 6 || $("#txtPasswordOld").val().length > 50){
        $("#tip_password").show();
        $("#tip_password .red").text("旧密码格式错误");
        $("#txtPasswordOld").focus();
        return false;
    }
    else if($("#txtPasswordNew").val() == ""){
        $("#tip_password").show();
        $("#tip_password .red").text("新密码不填可是不行的哦");
        $("#txtPasswordNew").focus();
        return false;
    }
    else if($("#txtPasswordNew").val().length < 6 || $("#txtPasswordNew").val().length > 50){
        $("#tip_password").show();
        $("#tip_password .red").text("新密码格式错误");
        $("#txtPasswordNew").focus();
        return false;
    }
    else if($("#txtPasswordConfirm").val() == ""){
        $("#tip_password").show();
        $("#tip_password .red").text("确认密码不填可是不行的哦");
        $("#txtPasswordConfirm").focus();
        return false;
    }
    else if($("#txtPasswordConfirm").val() != $("#txtPasswordNew").val()){
        $("#tip_password").show();
        $("#tip_password .red").text("确认密码和新密码不一致");
        $("#txtPasswordConfirm").focus();
        return false;
    }
    else{
        $("#tip_password").hide();
        return true;
    }
}
//评论提交验证事件
function commentVerify(){
    if($("#commentText").val().length < 5){
        $("#myTip .red").text("评论字数不能低于5字");
        $("#myTip").show();
        $("#comment_btn").show();
        $("#comment_loading").hide();
        return false;
    }
    else if($("#commentText").val().length > 180){
        $("#myTip .red").text("评论字数不能高于180字");
        $("#myTip").show();
        $("#comment_btn").show();
        $("#comment_loading").hide();
        return false;
    }
    else if ($("#txt_code").length>0&& !validcode("topicimg", $("#txt_code").val(), 1)) {
        $("#myTip .red").text("啊勒嘞？验证码不对诶!");
        $("#myTip").show();
        $("#comment_btn").show();
        $("#comment_loading").hide();
        return false;
    }
    else{
        $("#myTip .red").text("");
        $("#myTip").hide();
        return true;
    }
}
//评论回复ID
var commentPID = 0;
//评论提交事件
function commentSubmit(pcode){
    if($("#commentText").val().indexOf("@" + $(".n_" + commentPID).text())==-1){
        commentPID = 0;
    }
    if(commentVerify()){
        $.ajax({
            url: '/post.ashx?d=' + new Date(),
            type: 'POST',
            dataType: 'json',
            data: { message: $("#commentText").val(), code : typeof(pcode)=="undefined"?$("#txt_code").val():pcode, mid : COMIC_MID, commentid : commentPID },
            error: function (msg) {
                alertTopShow("评论发生异常，请重试");
                $("#comment_btn").show();
                $("#comment_loading").hide();
            },
            success: function(json) {
                if (json.msg == 'success') {
                    if(window.location.href.indexOf("#topic") == -1){
                        window.location.href = window.location.href + "#topic";
                    }
                    else{
                        window.location.href = window.location.href;
                    }
                    window.location.reload();
                }
                else if(json.msg == 'unlogin'){
                    $("#comment_btn").show();
                    $("#comment_loading").hide();
                    maskShow();
                } 
                else {
                    $("#comment_btn").show();
                    $("#comment_loading").hide();
                    $("#alertTop_1").text(json.msg);
                    $(".mask").show();
                    $(".alertTop_1").show();
                    setTimeout(function(){
                        alertTopHide_1();
                        $(".mask").hide();
                        $(".layer").hide();
                    },2000);
                }
            }
        });
    }
}
//个人信息验证事件
function userInfoVerify(){
    if($("#textArea").val().length > 100){
        alertTopShow("自我介绍字数不能高于100字");
        return false;
    }
    return true;
}
//个人信息保存事件
function userInfoSave(){
    if(userInfoVerify()){

    }
}
//昵称验证事件
function nicknameVerify(){
    var nickReg = /^[a-zA-Z0-9\u4e00-\u9fa5_-]{4,12}$/;
    if(!nickReg.test($("#nickName").val())){

    }
}

function showMsg(mes) {
    alertTopShow(mes);
}
//弹出窗登录事件
function alertLogin(){
    $.ajax({
        url: '/login/',
        type: 'POST',
        dataType: 'json',
        data: { txt_name: $("#lg_username").val(), txt_password : $("#lg_password").val(), txt_code : $("#lgcode").val(), type: "ajax", remember:$("#check").is(':checked')?1:0 , allowcode:typeof(isPublish)!=undefined&&isPublish?1:0 },
        error: function (msg) {
            showTipContent("登录出错，请重试", 1);
        },
        success: function(json) {
            if (json.msg == 'success') {
                if(typeof(isPublish) != undefined && isPublish){
                    commentSubmit(json.pcode);
                }
                else{
                    window.location.reload();
                }
            }
            else {
                showTipContent(json.msg, 1);
                imgreload('code');
                if(json.valcode == "1"){
                    $("#codeForm").show();
                }
            }
        }
    });
}
//登录监听事件
function layerKeyDown(e) {
  var ev= window.event||e;
  if (ev.keyCode == 13) {
      alertLogin();
  }
}
//忘记密码提交验证事件
function forgotVerify(){
    if($("#txt_username").val() == ""){
        $("#tip_forgot").show();
        $("#tip_forgot .red").text("用户名不填可是不行的哦");
        $("#txt_username").focus();
        return false;
    }
    else if($("#txt_code").length != 0 && !validcode("forgotcode", $("#txt_code").val())){
        $("#tip_forgot").show();
        $("#tip_forgot .red").text("啊勒嘞？验证码不对诶!");
        $("#txt_code").focus();
        return false;
    }
    $("#tip_forgot").hide();
    return true;
}
//重置密码提交验证事件
function setpasswordConfirm(){
    if($("#txtPasswordNew").val() == ""){
        $("#tip_set").show();
        $("#tip_set .red").text("新密码不填可是不行的哦");
        $("#txtPasswordNew").focus();
        return false;
    }
    else if($("#txtPasswordNew").val().length < 6 || $("#txtPasswordNew").val().length > 50){
        $("#tip_set").show();
        $("#tip_set .red").text("新密码格式错误");
        $("#txtPasswordNew").focus();
        return false;
    }
    else if($("#txtPasswordConfirm").val() == ""){
        $("#tip_set").show();
        $("#tip_set .red").text("确认密码不填可是不行的哦");
        $("#txtPasswordConfirm").focus();
        return false;
    }
    else if($("#txtPasswordConfirm").val() != $("#txtPasswordNew").val()){
        $("#tip_set").show();
        $("#tip_set .red").text("确认密码和新密码不一致");
        $("#txtPasswordConfirm").focus();
        return false;
    }
    else{
        $("#tip_set").hide();
        return true;
    }
}

function gethistory(comicid) {
    var result = "";
    $.ajax({
        url: '/showhistory.ashx?d=' + new Date(),
        dataType: 'json',
        async: true,
        data: { cid: comicid, language: 1 },
        error: function (msg) {
            $("#shownextchapter img").show();
        },
        success: function (json) {
            if (json && json != "" && json.IsHasChapter) {
                $("#lastshowchapter").show();
                var lastread = "";
                if (json.ChapterPage <= 1) {
                    lastread = "/" + json.ChapterUrlkey + "/";
                } else {
                    lastread = "/" + json.ChapterUrlkey + "/#page_" + json.ChapterPage;
                }
                result = "上次看到：[<a href=\"" + lastread + "\" title=\"" + json.ChapterName + "\">" + json.ComicName + " " + json.ChapterName + "</a>]";
                $("#shownextchapter p").text("续看 " + json.ChapterName);
                if ($("#shownextchapter").length > 0) {
                    if (json.ChapterPage <= 1) {
                        $("#shownextchapter").attr("href", lastread);
                    } else {
                        $("#shownextchapter").attr("href", lastread);
                    }
                }
                $("#lastshowchapter").html(result);
            }
            $("#shownextchapter img").show();
        }
    });

}
//注册验证事件
function regvaldata(){
    if($("#txt_reg_name").val() == ""){
        showTipContent("用户名不填可是不行的哦", 1);
        $("#txt_reg_name").focus();
        return false;
    }
    else if (!$("#txt_reg_name").val().match(/^[a-zA-Z_0-9]*[a-zA-Z_]+[a-zA-Z_0-9]*$/)) {
        showTipContent("用户名仅支持英文,数字和下划线,且不能为纯数字", 1);
        $("#txt_reg_name").focus();
        return false;
    }
    else if (!$("#txt_reg_name").val().match(/^[a-zA-Z_0-9]{4,20}$/)) {
        showTipContent("用户名为4-20个字符", 1);
        $("#txt_reg_name").focus();
        return false;
    }
    else if($("#txt_reg_mail").val() == ""){
        showTipContent("邮箱不填可是不行的哦", 1);
        $("#txt_reg_mail").focus();
        return false;
    }
    else if($("#txt_reg_password").val() == ""){
        showTipContent("密码不填可是不行的哦", 1);
        $("#txt_reg_password").focus();
        return false;
    }
    else if($("#txt_reg_xm").length>0 && !$("#txt_reg_xm").val().match(/^[\u4e00-\u9fa5]{2,4}$/)){
        showTipContent("请输入真实姓名", 1);
        $("#txt_reg_xm").focus();
        return false;
    }
    else if($("#txt_reg_sfz").length>0 && !$("#txt_reg_sfz").val().match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)){
        showTipContent("身份证号码无效，请重新输入", 1);
        $("#txt_reg_sfz").focus();
        return false;
    }
    else if($("#txt_reg_sj").length>0 && !$("#txt_reg_sj").val().match(/^0{0,1}(13[0-9]|15[1-9]|17[1-9]|18[7-9])[0-9]{8}$/)){
        showTipContent("请输入正确的手机号", 1);
        $("#txt_reg_sj").focus();
        return false;
    }
    else if($("#txt_code").val() == ""){
        showTipContent("验证码不填可是不行的哦", 1);
        $("#txt_code").focus();
        return false;
    }
    else if($("#ck_accepted").val() == "0"){
        showTipContent("请先接受服务协议！", 1);
        $("#ck_accepted").focus();
        return false;
    }
    return true;
}