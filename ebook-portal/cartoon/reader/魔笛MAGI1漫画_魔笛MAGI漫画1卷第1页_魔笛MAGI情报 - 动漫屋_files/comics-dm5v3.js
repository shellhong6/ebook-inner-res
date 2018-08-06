/// <reference path="jquery-1.4.1.js" />

var DM5_N = 3;
var DM5_NUM = "num";
var DM5_ISLOGINSHOW = false;
//鼠标在广告区域标识
var DM5_ISINADVERTIS = false;
//鼠标在支付区域标识
var DM5_ISINPAY = false;
//当前广告组ID
var DM5_AdGroupID = 0;
//当前页类型
var DM5_PageType = 0;
//当前广告ID
var DM5_AdID = 0;
var DM5_AID = 0;
var DM5_AdGroupQueue = [];

//广告文件采集队列
var DM5_AdFilesQueue = new Array();
var DM5_ISEMAILSHOW = false;
var DM5_EMAIL_DIAG;
$(function () {
    ifromnew("a");
});

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
}

function SetBookmarker(cid, mid, p, uid) {
    $.ajax({
        url: 'bookmarker.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        data: { cid: cid, mid: mid, page: p, uid: uid, language: 1 },
        type: 'POST',
        success: function (msg) {
            if (msg.Value == "1")
                ShowDialog("操作成功！已添加至书签");
            else if (msg.Value == "2")
                ShowDialog("操作失败！书签重复");
            else
                ShowDialog("操作失败！参数错误");
        }
    });
}
function showNum() {
    var idt = setTimeout(showNum, 1000);
    if (DM5_N < 0) {
        clearTimeout(idt);
        window.location.href = $("#reurl").attr("href");
        return;
    }
    var objTemp = $("#" + DM5_NUM);
    objTemp.text(DM5_N);
    DM5_N = DM5_N - 1;
}

function randomNum(n) {
    var rnd = '';
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
}
function reload() {
    window.location.reload();
}

function savesubscribecontent() {
    var subscribecontent = 0;
    $(".gl_k_nr input[type='checkbox']").each(function () {
        if ($(this).attr('checked')) {
            if (!isNaN($(this).val())) {
                subscribecontent += parseInt($(this).val());
            }
        }
    });

    $.ajax({
        url: 'subscribecontent.ashx',
        type: 'POST',
        async: true,
        data: { 'subscribeUserID': DM5_USERID, 'subscribeContent': subscribecontent },
        dataType: 'json',
        error: function (result) {
            DM5_EMAIL_DIAG.dialog("close");
        },
        success: function (result) {
            DM5_EMAIL_DIAG.dialog("close");
        }
    });
}
function ifromnew(tag) {
    $(tag).each(function () {
        try {
            if ($(this).attr("href").startWith("/t") && !$(this).attr("href").startWith("/ti")) {
                $(this).attr("target", "_blank");
            }
        } catch (err) { }
    });
}

function openDiv(id) {

    var h = $(document).height();
    $('#screen').css({ 'height': h });
    $('#screen').show();
    $('#' + id).center();
    $('#' + id).show();
}

function closeDiv(id) {
    $('#' + id).hide();
    $('#screen').hide();
}

jQuery.fn.center = function (loaded) {
    var obj = this;
    body_width = parseInt($(window).width());
    body_height = parseInt($(window).height());
    block_width = parseInt(obj.width());
    block_height = parseInt(obj.height());

    left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
    if (body_width < block_width) { left_position = 0 + $(window).scrollLeft(); };

    top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
    if (body_height < block_height) { top_position = 0 + $(window).scrollTop(); };

    if (!loaded) {

        obj.css({ 'position': 'absolute' });
        obj.css({ 'top': top_position, 'left': left_position });
        $(window).bind('resize', function () {
            obj.center(!loaded);
        });
        $(window).bind('scroll', function () {
            obj.center(!loaded);
        });

    } else {
        obj.stop();
        obj.css({ 'position': 'absolute' });
        obj.animate({ 'top': top_position }, 200, 'linear');
    }
}

function addBookmark(title, url) {
    if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else if (document.all) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
}

function ShowDialog(title) {
    var d = $("<div><div class='gl_k_nr2'>" + title + "</div></div>");
    d.dialog({
        width: 300,
        resizable: false,
        autoOpen: true,
        modal: true,
        draggable: false,
        title: '提示框'
    });
    $(window).scroll(function () {
        d.dialog("option", "position", 'center');
    })
    setInterval(function () {
        d.dialog("close");
    }, 3000);
}
DM_ISCONTACTUSSHOW = false;
function showContactUs() {
    var dialog = $("#contactusdialog");
    if (!DM_ISCONTACTUSSHOW) {
        $("#contactusdialog").load("/showcontactus/");
        dialog.dialog({
            width: 410,
            resizable: false,
            autoOpen: false,
            modal: true,
            draggable: false,
            title: '联系我们',
            close: function (event, ui) {
                $('#contactus_form').show();
                $('#contactusloading').hide();
            }
        });
        DM_ISCONTACTUSSHOW = true;
    }
    dialog.dialog('open');
}

var DM5_LOGIN_DIAG;
function showlogin() {
    if (!DM5_ISLOGINSHOW) {
        $("#logindialog").load("/showlogin/?language=1");
        DM5_LOGIN_DIAG = $("#logindialog");
        DM5_LOGIN_DIAG.dialog({
            width: 410,
            resizable: false,
            autoOpen: false,
            modal: true,
            draggable: false,
            title: '会员登录',
            close: function (event, ui) {
                if (typeof (vInput) != 'undefined ') {
                    DM5_CURRENTFOCUS = 1;
                }
            }
        });
        DM5_LOGIN_DIAG.dialog("option", "position", 'center');
        DM5_LOGIN_DIAG.dialog("open");
        $(window).scroll(function () {
            if (!browser.versions.iPhone && !browser.versions.iPad && !browser.versions.android) {
                DM5_LOGIN_DIAG.dialog("option", "position", 'center');
            }
        });
        DM5_ISLOGINSHOW = true;
    }
    else {
        DM5_LOGIN_DIAG.dialog("open");
        $("#logimg").attr("src", "/image.ashx?d=" + new Date().getTime());
    }
    if (typeof (vInput) != 'undefined ') {
        DM5_CURRENTFOCUS = 0;
    }
    $(".ui-dialog").css("left", ($("body").width() - 400) / 2 + "px");
}
function ShowHide(id, index, count, did, cl, currentclass) {
    for (var i = 1; i <= count; i++) {
        $("#" + id + "_" + i).hide();
        if (did) {
            $("#" + did + "_" + i).attr("class", cl);
        }
    }
    $("#" + id + "_" + index).show();
    if (did) {
        $("#" + did + "_" + index).attr("class", currentclass);
    }
}
function AddShowHide(id, did, count, cls, currentclass) {

    for (var i = 1; i <= count; i++) {
        SetTimeHide(i, id, did, count, cls, currentclass)
    }
}


function SetTimeHide(i, id, did, count, c, u) {
    var tid;
    $("#" + id + "_" + i).mouseover(
    function () {
        var fn = doSomething(did, i, count, id, c, u);
        var a = i;
        tid = window.setTimeout(fn, 200);
    }
    );
    $("#" + id + "_" + i).mouseout(
    function () {
        window.clearTimeout(tid);

    }
    );
}
function doSomething(did, i, count, id, cl, currentclass) {
    /* 返回一个由函数表达式创建的匿名内部函数的引用:- */
    return (function () {
        /* 这个内部函数将通过 - setInterval- 执行，而且当它执行时它会读取并按照传递给外部函数的参数行事： */
        ShowHide(did, i, count, id, cl, currentclass);
    });
}
function validcode(tid, code, action) {
    var result = false;
    var act = "";
    if (action) {
        act = "bar";
    }

    $.ajax({
        url: '/checkcode.ashx?d=' + new Date().getTime(),
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
                    $(id).attr("src", "/image.ashx?action=bar&d=" + new Date().getTime());
                }
                else {
                    $(id).attr("src", "/image.ashx?d=" + new Date().getTime());
                }
                result = false;
            }
        }
    });
    return result;
}

function getloginstatus() {
    var result;
    $.ajax({
        url: '/showstatus.ashx?d=' + new Date().getTime(),
        async: false,
        error: function (msg) {
            result = "0";
        },
        success: function (json) {
            result = json;
        }
    });
    return result;
}

function addfavorite() {
    if (document.all) {
        window.external.addFavorite("http://www.dm5.com", "动漫屋")
    }
    else if (window.sidebar) {
        window.sidebar.addPanel("动漫屋", "http://www.dm5.com", "");
    }
}

function greetings() {
    var now = new Date();
    var hour = now.getHours();
    if (hour < 6) {
        return "凌晨好";
    }
    else if (hour < 9) {
        return "早上好";
    }
    else if (hour < 12) {
        return "上午好";
    }
    else if (hour < 14) {
        return "中午好";
    }
    else if (hour < 17) {
        return "下午好";
    }
    else if (hour < 19) {
        return "傍晚好";
    }
    else if (hour < 22) {
        return "晚上好";
    }
    else {
        return "夜里好";
    }
}

function imgreload(v, isbar) {
    var id = "#" + v;
    if (isbar) {
        $(id).attr("src", "/image.ashx?action=bar&d=" + new Date().getTime());
    }
    else {
        $(id).attr("src", "/image.ashx?d=" + new Date().getTime());
    }
}
function IsURL(str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
        + "|" // 允许IP和DOMAIN（域名） 
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
        + "[a-z]{2,6})" // first level domain- .com or .museum  
        + "(:[0-9]{1,4})?" // 端口- :80  
        + "((/?)|" // a slash isn't required if there is no file name  
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}
function OnEnter(field) {
    if (field.value == field.defaultValue) {
        field.value = "";
    }
}
function OnExit(field) {
    if (field.value == "") {
        field.value = field.defaultValue;
    }
}
function head_load() {
    $("#clist").hide();
    $("#charid").click(function () {
        if ($("#clist").is(":hidden")) {
            $("#clist").fadeIn("slow");
        }
        else {
            $("#clist").fadeOut("slow");
        }
    });
    //    $(".booksta").click(function () {
    //        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //        ga.src = "http://w.cnzz.com/c.php?id=30071447";
    //        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    ////        var sta = $("<script src='http://w.cnzz.com/c.php?id=30071447' language='JavaScript'></script>");
    ////        var sta1 = $("<div id='mydiv'></div>");
    ////        $("body").append(sta);
    ////        $("body").append(sta1);
    //    });
}
function loaduser() {
    var user = getUserinfo();
    var html = "";
    if (user.ID != "0") {
        html = "<span id=\"greet\" style=\"float:none\">";
        html += greetings();
        html += "</span>,欢迎您<a href=\"#\" style=\"color:#ff4e00;\">";
        html += user.Name;
        html += "<a href=\"/logout/?from=";
        html += DM5_FROM;
        html += "\">退出</a>";
        $("#loginfo").html(html);
        //$("#sos_r").load("/comichistory/?d=" + Math.random());
        gethistorys(4);
        DM5_LOGIN_STATUS = true;
    }
    else {
        html = "<a href=\"/login/?from=";
        html += DM5_FROM;
        html += "\">登录</a> <a href=\"/register/?from=";
        html += DM5_FROM;
        html += "\">注册</a>";
        html += "<div class=\"gl_k mato10\" style=\"width:400px;display:none\" id=\"logindialog\" >";
        html += "<div class=\"gl_k_nr2\" id=\"loginloading\">";
        html += "<p id=\"logstatus\">正在加载,请稍候...</p></div></div>";
        $("#loginfo").html(html);
        html = "<div class=\"sos_r2\"><input type=\"button\" onclick=\"showlogin();\"";
        html += " value=\"登陆帐户\" class=\"sos_an3 login\" /><input type=\"button\" name=\"register\"";
        html += " value=\"免费注册\" onclick=\"javascript:window.open('/register/','_parent')\"  class=\"sos_an3\" /><br />"
        html += " 你可以注册一个帐号，并以此登录<br />与 <span class=\"hz14\">";
        html += usercount + "</span> 位动漫爱好者共同交流！</div>";
        $("#sos_r").html(html);
        DM5_LOGIN_STATUS = false;
    }
}

function loaduser2() {
    var html;
    var user = getUserinfo();
    if (user.ID != "0") {
        html = "<span id=\"greet\" style=\"float:none\">";
        html += greetings();
        html += "</span>,欢迎您<a href=\"#\" style=\"color:#ff4e00;\">";
        html += user.Name;
        html += "<a href=\"/logout/?from=";
        html += DM5_FROM;
        html += "\">退出</a>";
        DM5_LOGIN_STATUS = true;
    }
    else {
        html = "<a href=\"/login/?from=";
        html += DM5_FROM;
        html += "\">登录</a> <a href=\"/register/?from=";
        html += DM5_FROM;
        html += "\">注册</a>";
        html += "<div class=\"gl_k mato10\" style=\"width:400px;display:none\" id=\"logindialog\" >";
        html += "<div class=\"gl_k_nr2\" id=\"loginloading\">";
        html += "<p id=\"logstatus\">正在加载,请稍候...</p></div></div>";
        DM5_LOGIN_STATUS = false;
    }
    $("#loginfo").html(html);
}


function getUserinfo() {
    var result;
    $.ajax({
        url: '/userinfo.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        async: false,
        error: function (msg) {
            result = "{Name:'游客',ID:'0'}";
        },
        success: function (json) {
            result = json;
        }
    });
    return result;
}
function gethistorys(count) {
    var result = "<div class=\"sos_r\">";
    $.ajax({
        url: '/showhistory.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        data: { top: count, language: 1 },
        error: function (msg) {

        },
        success: function (json) {
            var ht = [];
            $.each(json, function (i, n) {
                ht.push("<li class=\"huih4\"><span>" + n.ShowTime + "</span><a href=\"/" + n.ComicUrlkey + "/\" style=\"color:#111;\" title=\"" + n.ComicName + "\">" + n.ComicName + "</a>");
                if (n.ChapterUrlkey) {
                    ht.push("<a href=\"/" + n.ChapterUrlkey + "/\" title=\"" + n.ComicName + n.ChapterName + "\">" + n.ChapterName + "</a><a href=\"/" + n.ChapterUrlkey + "-p" + n.ChapterPage + "/\" title=\"" + n.ShowChapterPage + "\" target=\"_blank\">" + n.ShowChapterPage + "</a>");
                }
                else {
                    ht.push("<span>&nbsp;&nbsp;" + n.ShowChapterPage + "&nbsp;&nbsp;</span><span>&nbsp;&nbsp;" + n.ChapterName +
"&nbsp;&nbsp;</span>");
                }
                ht.push("</li>");
            });
            result += ht.join("");
            result += "</div>";
            $("#sos_r").html(result);
        }
    });

}

function gethistory(comicid) {
    var result = "您是首次观看 <strong>" + DM5_COMIC_MNAME + "漫画</strong>";
    $.ajax({
        url: '/showhistory.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        async: true,
        data: { cid: comicid, language: 1 },
        error: function (msg) {
        },
        success: function (json) {
            if (json && json != "" && json.IsHasChapter) {
                result = "<span class=\"flr\">您上次观看了 <a href=\"/" + json.ChapterUrlkey + "/\" title=\"" + json.ChapterName + "\"><strong>" + json.ChapterName + "</strong></a>";
                if ($("#bt_shownext").length > 0) {
                    if (json.ChapterPage <= 1) {
                        $("#bt_shownext").attr("href", "/" + json.ChapterUrlkey + "/");
                    } else {
                        $("#bt_shownext").attr("href", "/" + json.ChapterUrlkey + "-p" + json.ChapterPage + "/");
                    }
                }
                if (json.NextPartID != 0) {
                    result += "，是否继续观看 <a href=\"/" + json.NextChapterKey + "/\"><strong>" + json.NextPartName + "</strong></a>";
                }
                else {
                    result += "，当前已是最新章节。";
                }
                $("#hy").html(result);
            }
            else {
                $("#hy").html(result);
            }
        }
    });

}

function gethistory2(comicid) {
    var result = "您是首次观看 <strong>" + DM5_COMIC_MNAME + "漫画</strong> ";
    $.ajax({
        url: '/showhistory.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        async: true,
        data: { cid: comicid, language: 1 },
        error: function (msg) {
        },
        success: function (json) {
            if (json && json != "" && json.IsHasChapter) {
                result = "您上次观看了<a href=\"/" + json.ChapterUrlkey + "/\" title=\"" + json.ChapterName + "\"><strong>" + json.ChapterName + "</strong></a>";
                if ($("#bt_shownext").length > 0) {
                    if (json.ChapterPage <= 1) {
                        $("#bt_shownext").attr("href", "/" + json.ChapterUrlkey + "/");
                    } else {
                        $("#bt_shownext").attr("href", "/" + json.ChapterUrlkey + "-p" + json.ChapterPage + "/");
                    }
                }
                if (json.NextPartID != 0) {
                    result += "，是否继续观看 <a href=\"/" + json.NextChapterKey + "/\"><strong>" + json.NextPartName + "</strong></a>";
                }
                else {
                    result += "，当前已是最新章节。";
                }
                $("#hy").html(result);
            }
            else {
                $("#hy").html(result);
            }
        }
    });

}
function showImageDiv(divID, tb, src, isoffset) {
    var myDiv = $("#" + divID);
    var txt = $("#" + tb);
    if (isoffset) {
        var txtTop = txt.offset().top;
        var txtLeft = txt.offset().left + txt.width() + 10;
    }
    else {
        var txtTop = txt.position().top;
        var txtLeft = txt.position().left + txt.width() + 10;
    }
    myDiv.css("top", txtTop);
    myDiv.css("left", txtLeft);
    myDiv.show();
    myDiv.find("img").attr("src", src + "?d=" + new Date().getTime());
}

function hideImageDiv(divID) {
    var myDiv = $("#" + divID);
    myDiv.hide();
}

$(function () {
    showerrorlog();
    $("#btnFavorite").click(function () {
        if (userBrowser() == "Chrome") {
            ShowDialog("加入收藏失败，请使用Ctrl+D进行收藏");
            return;
        }
        try {
            window.external.addFavorite(window.location, document.title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(document.title, window.location, "");
            }
            catch (e) {
                ShowDialog("加入收藏失败，请使用Ctrl+D进行收藏");
            }
        }
    });
    //    alert($("#adjs_id div:first").attr("class"));
    $(window).unbind("blur");

    $(window).blur(function () {
        if (DM5_ISINADVERTIS) {
            DM5_ISINADVERTIS = false;
            if (DM5_AdGroupID > 0 || DM5_AID > 0) {
                $.ajax({
                    url: '/adgroup.ashx?d=' + new Date().getTime(),
                    dataType: 'json',
                    async: false,
                    data: { gid: DM5_AdGroupID, pagetype: DM5_PageType, aid: DM5_AdID, naid: DM5_AID, language: 1 },
                    error: function (msg) {
                    },
                    success: function (json) {
                        if (json.Value == "0") {
                            $(".clDiv").each(function () {
                                var groupid = $(this).attr("AdGroupID");
                                var repTag = $(this).attr("RepTag");
                                var nlid = $(this).attr("aid");
                                var aid = $(this).attr("adid");
                                var t = $(this);
                                if (groupid == DM5_AdGroupID && groupid != 0) {
                                    setTimeout(function () {
                                        if (typeof (json.Items) != 'undefined') {
                                            for (var i = 0; i < json.Items.length; i++) {
                                                if (json.Items[i].Locationid == aid && json.Items[i].Adid != nlid && json.Items[i].Codeid > 0) {
                                                    var classname = "";
                                                    if (typeof (json.Items[i].isrefresh) != 'undefined' && json.Items[i].isrefresh) {
                                                        classname = "fastrefresh";
                                                    }
                                                    var frame = "<iframe frameborder='no' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' width='" + t.width() + "px' height='" + t.height() + "px' id='frame_" + json.Items[i].Codeid + "' src='wxhfm.html?cid=" + json.Items[i].Codeid + "' class='" + classname + "'></iframe>";
                                                    t.html(frame);
                                                    t.attr("AdGroupID", json.Items[i].AdGroupid);
                                                    t.attr("aid", json.Items[i].Adid);
                                                    adjs();
                                                    return;
                                                }
                                            }
                                        }
                                        t.hide();
                                        if ($("#" + repTag).length > 0) {
                                            $("#" + repTag).hide();
                                        }
                                        adjs();
                                    }, 500);
                                }
                                else if (nlid == DM5_AID) {
                                    setTimeout(function () {
                                        if (typeof (json.Items) != 'undefined') {
                                            for (var i = 0; i < json.Items.length; i++) {
                                                if (json.Items[i].Locationid == aid && json.Items[i].Adid != nlid && json.Items[i].Codeid > 0) {
                                                    var classname = "";
                                                    if (typeof (json.Items[i].isrefresh) != 'undefined' && json.Items[i].isrefresh) {
                                                        classname = "fastrefresh";
                                                    }
                                                    var frame = "<iframe frameborder='no' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' width='" + t.width() + "px' height='" + t.height() + "px' id='frame_" + json.Items[i].Codeid + "' src='wxhfm.html?cid=" + json.Items[i].Codeid + "' class='" + classname + "'></iframe>";
                                                    t.html(frame);
                                                    t.attr("AdGroupID", json.Items[i].AdGroupid);
                                                    t.attr("aid", json.Items[i].Adid);
                                                    adjs();
                                                    return;
                                                }
                                            }
                                        }
                                        t.hide();
                                        if ($("#" + repTag).length > 0) {
                                            $("#" + repTag).hide();
                                        }
                                        adjs();
                                    }, 500);
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    //    setTimeout(function(){ AdFileCollect();},2000);
});
function adLimit() {
    $(".clDiv").each(function () {
        //广告点击次数限制
        var left = $(this).offset().left;
        var right = $(this).offset().left + $(this).width();
        var top = $(this).offset().top;
        var bottom = $(this).offset().top + $(this).height();
        $(this).mouseover(function (e) {
            $(window).focus();
            DM5_ISINADVERTIS = !DM5_ISINPAY;
            DM5_AdGroupID = $(this).attr("AdGroupID");
            DM5_AdID = $(this).attr("AdID");
            DM5_AID = $(this).attr("AID");
        }).mouseleave(function (e) {
            if (e.clientX != -1 && (e.clientX <= left || e.clientX >= right || (e.clientY + $(window).scrollTop()) <= top || (e.clientY + $(window).scrollTop()) >= bottom)) {
                DM5_ISINADVERTIS = false;
            }
        });
        var thisHeight = parseInt($(this).css("height").replace("px", ""));
        var thisWidth = parseInt($(this).css("width").replace("px", ""));
        var obj = $(this).children().not("script").each(function () {
            try {
                if (!$(this).is("iframe")) {
                    $(this).width(thisWidth).height(thisHeight).css("float", "left").css("overflow", "hidden");
                }
            }
            catch (err) { }
        });
        try {
            $(this).height(thisHeight).width(thisWidth);
        }
        catch (err)
        { }
        var left = $(this).width() + parseInt($(this).css("padding-right").replace("px", ""))
            + parseInt($(this).css("border-right-width").replace("px", ""));
        var top = parseInt($(this).css("padding-top").replace("px", ""))// + parseInt($(this).css("margin-top").replace("px", ""))
            + parseInt($(this).css("border-top-width").replace("px", ""));
        if (getIEBrowserVer() < 8) {
            top += $(this).height();
        }
        return;
    });
}
function adFileLimit(clDiv, adgroupid, adid) {
    if (adgroupid == 0 && adid == 0) return;
    if (clDiv.html()) {
        if (clDiv.html().toLowerCase().indexOf("<iframe") >= 0) {
            var regIframe = new RegExp("<iframe[\\s\\S]+?id=\"?([\\s\\S]+?)\"? ", "i");
            var iframeId = regIframe.exec(clDiv.html());
            if (iframeId != null) {
                var fid = iframeId[1];
                if (fid) {
                    var iframe = document.getElementById(fid);
                    fn = function () {
                        var contents = $("#" + fid).contents();
                        if (adgroupid > 0) {
                            var content = AdShieldFilter(adgroupid, $($("#" + fid).contents()[0].documentElement).html());
                            if (content != $($("#" + fid).contents()[0].documentElement).html())
                                clDiv.html(content);
                        }
                        if (adid > 0 && $("#" + fid).contents().length > 0)
                            CollectAdShield(adid, $($("#" + fid).contents()[0].documentElement).html());
                    };
                    if (iframe.attachEvent) {
                        try {
                            iframe.attachEvent("onload", fn);
                        } catch (ex) { }
                    } else {
                        iframe.onload = fn;
                    }
                }
            }
        }
        else {
            if (adgroupid > 0) {
                var content = AdShieldFilter(adgroupid, clDiv.html());
                if (content != clDiv.html())
                    clDiv.html(content);
            }
            if (adid > 0)
                CollectAdShield(adid, clDiv.html());
        }
    }
}

function addtogroup(lid, adgroupid, adid, adtag) {
    //    var o = new Object();
    //    o.GroupID = adgroupid;
    //    o.AdId = adid;
    //    o.Tag = adtag;
    //    DM5_AdGroupQueue.push(o);
    var o = $("#" + adtag);
    o.attr("AdGroupID", adgroupid);
    o.attr("AdID", lid);
    o.attr("AID", adid);
    o.addClass("clDiv");
}
function AdShieldFilter(adgroupid, content) {
    if (DM5_ADShields) {
        for (var i = 0; i < DM5_ADShields.length; i++) {
            if (adgroupid == DM5_ADShields[i].ID && DM5_ADShields[i].AdShield != "") {
                var adShields = DM5_ADShields[i].AdShield.split("{换行符}");
                for (var j = 0; j < adShields.length; j++)
                    if (content.indexOf(adShields[j]) >= 0)
                        return DM5_ADShields[i].AdShieldReplace;
            }
        }
    }
    return content;
}
function CollectAdShield(adid, content) {
    if ($.cookie("CollectAdShield") && $.cookie("CollectAdShield").indexOf("," + adid + ",") >= 0) {
        return;
    }
    if (DM5_AdItemCollectFiles.Ids.indexOf("," + adid + ",") >= 0) {
        var collectUrl = "";
        var reEmbed = new RegExp("(<embed[^>]+?>)");
        var emb = reEmbed.exec(content.toLowerCase());
        if (emb == null) {
            var reObject = new RegExp("(<object[^>]+>[\\s\\S]+?</object>)");
            var obj = reObject.exec(content.toLowerCase());
            if (obj) {
                var data = new RegExp("data=(?:'|\")([\\s\\S]+?)(?:'|\")").exec(obj[1])
                if (data)
                    collectUrl = data[1];
            }
        }
        else {
            var src = new RegExp("src=(?:'|\")([\\s\\S]+?)(?:'|\")").exec(emb[1])
            if (src)
                collectUrl = src[1];
        }

        if (collectUrl != "") {
            collectUrl = collectUrl.indexOf("?") > 0 ? collectUrl.substring(0, collectUrl.indexOf("?")) : collectUrl;
            var cadids = "";
            if ($.cookie("CollectAdShield") && collectUrl != "")
                cadids = $.cookie("CollectAdShield") + adid + ",";
            else if (collectUrl != "")
                cadids = "," + adid + ",";
            if (cadids != "")
                $.cookie("CollectAdShield", cadids, { path: "/", expires: "1" });

            var adFileObj = { "adid": adid, "curl": collectUrl };
            DM5_AdFilesQueue[DM5_AdFilesQueue.length] = adFileObj;
        }
    }
}

function AdFileCollect() {
    if (DM5_AdFilesQueue.length > 0) {
        var adids = "";
        var curls = "";
        for (var i = 0; i < DM5_AdFilesQueue.length; i++) {
            adids += (adids == "" ? "" : ",") + DM5_AdFilesQueue[i].adid;
            curls += (curls == "" ? "" : ",") + DM5_AdFilesQueue[i].curl;
        }
        $.ajax({
            type: "POST",
            url: "/AdShieldCollector.ashx",
            data: "adids=" + adids + "&curls=" + escape(curls),
            success: function (msg) {

            }
        });
    }
}

function SetIframeAction(iframeName) {
    //    var iframeWindow = window.frames[iframeName];
    var iframeWindow = document.getElementById(iframeName).contentWindow;
    //内容是否加载完
    if (iframeWindow.document.readyState == "complete") {
        $("a", iframeWindow.document).each(function () {
            alert($(this).attr("href"));
        });
    }
    else {
        setTimeout(function () {
            SetIframeAction(iframeName);
        }, 10);
    }
}
function userBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        return "IE";
    } else if (/firefox/i.test(browserName)) {
        return "Firefox";
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        return "Chrome";
    } else if (/opera/i.test(browserName)) {
        return "Opera";
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        return "Safari";
    } else {
        return "unKnow";
    }
}
function getIEBrowserVer() {
    var ver; //浏览器版本
    var bType; //浏览器类型
    var vNumber; //版本号
    ver = navigator.appVersion;
    bType = navigator.appName;
    if (bType == "Microsoft Internet Explorer") {
        vNumber = parseFloat(ver.substring(ver.indexOf("MSIE") + 5, ver.lastIndexOf("Windows")));
        return vNumber;
    }
    return 9;
}
function addfrom(url, from) {
    window.location.href = url + "?from=" + from;
    return false;
}
function search() {
    $(".comics_sul a").click(function () {
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
                            ht.push("<div class=\"innr72\"><a href=\"/" + n.UrlKey + "/\" title=\"" + n.Title + "\">" + n.Title + "</a> <span class=\"red_lj\"><a href=\"/" + n.LastPartUrl + "/\" title=\"" + n.Title + " " + n.LastPartShowName + "\">[" + n.ShowLastPartName + "]</a></span>" + n.ShowSign + "</div>");
                        }
                        else {
                            ht.push("<div class=\"innr72\"><a href=\"/" + n.UrlKey + "/\" title=\"" + n.Title + "\">" + n.Title + "</a> <span class=\"red_lj\"><a href=\"/" + n.LastPartUrl + "/\" title=\"" + n.Title + " " + n.LastPartShowName + "\">[" + n.ShowLastPartName + "]</a></span>" + n.ShowNew + n.ShowUpdate + "</div>");
                        }
                    });
                    var url = "/manhua-list";
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
var l_select = function (obj, h) {
    var sel = $(obj);
    sel.each(function () {
        if ($(this).css("display") == "none")
            return;
        var jQuerythis = $(this);
        var span = jQuerythis.find("span"), ul = jQuerythis.find("ul"), input = jQuerythis.find("input"), spanIn = $("<span></span>");
        var w = (span.outerWidth() - ul.outerWidth() > 0) ? span.outerWidth() : span.outerWidth(); //应付神奇的IE6
        var ulw = ul.outerWidth();
        w - ulw > 0 ? ul.width(w - 2) : ul.width(ulw - 2);
        if (ul.innerHeight() - h > 0) ul.css({ "height": h + "px", "overflow-y": "scroll", "overflow-x": "hidden" });
        spanIn.css("padding-right", "5px")
        span.css({ "width": w - 32, "padding": "0", "background": "none", "border": "none", "overflow": "hidden" }).wrap(spanIn);
        jQuerythis.find("li").eq(0).addClass("selected");
        jQuerythis.hover(function () {
            ul.css("display", "block");
            ul.find("li[selected=selected]").siblings().removeClass("selected").end().addClass("selected");
        }, function () {
            ul.css("display", "none");
        });
        jQuerythis.find("li").click(function () {
            //            var v = $(this).attr("val");
            //            var language = $.cookie("language");
            //            if (v) v = v.toLocaleLowerCase();
            //            if (language) language = language.toLocaleLowerCase();
            //            var t = $.trim($(this).text());
            //            $(this).siblings().attr("selected", "").end().attr("selected", "selected");
            //            input.val(v);
            //            span.text(t);
            //            ul.css("display", "none");
            //            $.cookie("language", v, { path: "/", expires: 1, domain: cookieDomain });
            //            if ("zh-cn" == v) return;
            //            var home = "http://" + window.location.host + "/";

            //            if (window.location.href == home) {
            //                window.location.reload();
            //            }
            //            else {
            //                window.location.href = "/";
            //            }
            var v = $(this).attr("val");
            if (v) {
                var url = "http://" + v + "/";
                window.location.href = url;
            }
        }).mouseover(function () {
            $(this).siblings().removeClass("selected").end().addClass("selected");
        });
    });
}
var DM5_ERROR_DIAG;
function showerrorlog() {
    $("#posterror").click(function () {
        if (!DM5_ERROR_DIAG) {
            $("#errorlog").load("/showerror/?language=1");
            DM5_ERROR_DIAG = $("#errorlog");
            DM5_ERROR_DIAG.dialog({
                width: 410,
                resizable: false,
                autoOpen: false,
                modal: true,
                draggable: false,
                title: '报告错误'
            });
        }
        else {
            $("#errorform").show();
            $("#posting").hide();
            $("#poststatus").text("");
        }
        DM5_ERROR_DIAG.dialog("open");
    });
}
function showerrorlog2() {
    $("#cp_fun_yj").click(function () {
        if (!DM5_ERROR_DIAG) {
            var tf = "<div id='yj_ct' style='display:none'><iframe id=\"createerror_fm\" width=\"800px\" height=\"574px\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"auto\" frameborder=\"0\"></iframe><div>";
            $("#yj_lg").append(tf);
            $("#createerror_fm").attr("src", "/helppop/");
            $("#createerror_fm").load(function () {
                $("#yjloading").hide();
                $("#yj_ct").show();
                //                $("#createerror_fm").contents().find("#txtHelpTargetUrl").val(window.location.href);
                $("#createerror_fm").contents().find("#hdrepage").val(window.location.href);
            });
            //$("#yj_lg").load("/showerror/?language=1&type=2", function () { LoadErrorForm(); });
            DM5_ERROR_DIAG = $("#yj_lg");
            DM5_ERROR_DIAG.dialog({
                width: 800,
                resizable: false,
                autoOpen: false,
                modal: true,
                draggable: false,
                title: '意见反馈'
            });
        }
        else {
            $("#createerror_fm").contents().find(".helpmain").show();
            $("#createerror_fm").contents().find("#posting").hide();
            $("#createerror_fm").contents().find("#txtErrorMsg").text("");
            $("#createerror_fm").height(574);
            //            $("#createerror_fm").contents().find("#txtHelpTargetUrl").val(window.location.href);
            $("#createerror_fm").contents().find("#hdrepage").val(window.location.href);
        }
        DM5_ERROR_DIAG.dialog("open");
        $(window).scroll(function () {
            DM5_ERROR_DIAG.dialog("option", "position", 'center');
        })
    });
}
function posterrorajax() {
    $("#errorform").hide();
    $("#posting").text("数据正在提交中..");
    $("#posting").show();
    var content = $("#txt_errorcontent").val().trim();
    var email = $("#txt_erroremail").val().trim();
    var browserLanguage = $("#hdnBrowserLanguage").val().trim();
    if (content == "" || content.length == 0) {
        $("#poststatus").text("内容不能为空");
        $("#errorform").show();
        $("#posting").hide();
        return;
    }
    if (email == "" || email.length == 0) {
        $("#poststatus").text("请填写您的Email以便我们给您反馈");
        $("#errorform").show();
        $("#posting").hide();
        return;
    }
    else if (!isemail($("#txt_erroremail").val())) {
        $("#poststatus").text("请输入正确的Email以便我们给您反馈");
        $("#errorform").show();
        $("#posting").hide();
        return;
    }
    $.ajax({
        url: 'usererror.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        data: { content: content, email: email, url: DM5_COMIC_URL, browserLanguage: browserLanguage },
        error: function (msg) {
            $("#poststatus").text("网络异常，请稍后再试");
            $("#errorform").show();
            $("#posting").hide();
        },
        success: function (json) {
            if (json.msg == 'success') {
                $("#errorform").hide();
                $("#posting").text("信息提交成功");
                $("#poststatus").text("");
                $("#posting").show();
            }
            else {
                $("#errorform").show();
                $("#poststatus").text(json.error);
                $("#posting").hide();
            }
        }
    });
    return false;
}

function isemail(strIn) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(strIn);
}
function isqq(strIn) {
    var myreg = /^\d+$/;
    return myreg.test(strIn);
}
function istel(strIn) {
    var myreg = /^((\+\d+ )?\d+-)?\d+$/;
    return myreg.test(strIn);
}
function ValidateForm() {
    var msg = "";
    if ($.trim($("#txtHelpTargetUrl").val()) == "" || $.trim($("#txtHelpTargetUrl").html()) == $("#txtHelpTargetUrl").attr("default")) {
        msg = "请填写标题信息";
        $("#txtHelpTargetUrl").focus();
    }
    if (helptype == 0) {
        if ($.trim($("#txtHelpContent").html()) == "" || $.trim($("#txtHelpContent").html()) == $("#txtHelpContent").attr("default")) {
            msg = "请填写问题描述";
            $("#txtHelpContent").focus();
        }
    }
    else if (helptype == 1) {
        if ($.trim($("#txtHelpContent").html()) == "" || $.trim($("#txtHelpContent").html()) == $("#txtHelpContent").attr("default")) {
            msg = "请填写有效信息";
            $("#txtHelpContent").focus();
        }
    }
    else if (helptype == 2) {
        if ($.trim($("#txtHelpContent").html()) == "" || $.trim($("#txtHelpContent").html()) == $("#txtHelpContent").attr("default")) {
            msg = "请填写您对我们网站的意见或建议";
            $("#txtHelpContent").focus();
        }
    }
    if (msg == "") {
        if ($.trim($("#txtEmail").val()) == "" || $("#txtEmail").val() == $("#txtEmail").attr("default")) {
            msg = "请填写Email";
            $("#txtEmail").focus();
        }
        else if (!isemail($("#txtEmail").val())) {
            msg = "请输入正确的Email以便我们跟您联系";
            $("#txtEmail").focus();
        }
        else if ($.trim($("#txtQQ").val()) != "" && $("#txtQQ").val() != $("#txtQQ").attr("default") && !isqq($("#txtQQ").val())) {
            msg = "请输入正确的QQ号码以便我们跟您联系";
            $("#txtQQ").focus();
        }
        else if ($.trim($("#txtTel").val()) != "" && $("#txtTel").val() != $("#txtTel").attr("default") && !isqq($("#txtTel").val())) {
            msg = "请输入正确的电话号码以便我们跟您联系";
            $("#txtTel").focus();
        }
    }
    return msg;
}
function posterrorajax2() {
    $(".helpmain").hide();
    $("#posting").text("数据正在提交中..");
    $("#posting").show();
    var content = $("#txtHelpContent").html();
    var email = $("#txtEmail").val();
    var url = $("#hdrepage").val();
    var qq = $("#txtQQ").val();
    var tel = $("#txtTel").val();
    var title = $("#txtHelpTargetUrl").val();
    var retype = $('input:radio[name="rdoErrorType"]:checked').val();
    $.ajax({
        url: 'usererror.ashx?d=' + new Date().getTime(),
        dataType: 'json',
        data: { content: content, email: email, title: title, helptype: helptype, tel: tel, url: url, qq: qq, t: 2, retype: retype },
        error: function (msg) {
            $("#txtErrorMsg").text("网络异常，请稍后再试");
            $(".helpmain").show();
            $("#posting").hide();
        },
        success: function (json) {
            if (json.msg == 'success') {
                $(".helpmain").hide();
                $("#posting").text("信息提交成功");
                $("#txtErrorMsg").text("");
                $("#posting").show();
            }
            else {
                $(".helpmain").show();
                $("#txtErrorMsg").text(json.error);
                $("#posting").hide();
            }
        }
    });
    return false;
}
var helptype = 0;
function LoadErrorForm() {
    $(".cbt").click(function () {
        $(".helpmaint .c").removeClass("c");
        $(this).addClass("c");
        $(".view_help_c").hide();
        $("#view_help_" + $(this).attr("val")).show();
        helptype = parseInt($(this).attr("val"));
        if ($.trim($("#txtHelpContent").html()) == $("#txtHelpContent").attr("default")) {
            if (helptype == 0) {
                $("#txtHelpContent").attr("default", "请添加更多问题描述，以便我们准确地了解您的困扰；");
                $("#txtHelpContent").html("请添加更多问题描述，以便我们准确地了解您的困扰；");
            }
            if (helptype == 1) {
                $("#txtHelpContent").attr("default", "请填写有效信息，以便我们进行查看；");
                $("#txtHelpContent").html("请填写有效信息，以便我们进行查看；");
            }
            if (helptype == 2) {
                $("#txtHelpContent").attr("default", "请畅所欲言您对我们网站的意见或建议");
                $("#txtHelpContent").html("请畅所欲言您对我们网站的意见或建议");
            }
        }
    });
    $("#hdrepage").val(window.location.href);
    $(".hmcc3 input[type='text']").focus(function () {
        if ($(this).val() == $(this).attr("default")) {
            $(this).val("");
            $(this).css("color", "black");
        }
    }).blur(function () {
        if ($.trim($(this).val()) == "") {
            $(this).css("color", "#b3b3b3");
            $(this).val($(this).attr("default"));
        }
    });
    $("#txtHelpTargetUrl").focus(function () {
        if ($(this).val() == $(this).attr("default")) {
            $(this).val("");
            $(this).css("color", "black");
        }
    }).blur(function () {
        if ($.trim($(this).val()) == "") {
            $(this).css("color", "#b3b3b3");
            $(this).val($(this).attr("default"));
        }
    });
    $("#txtHelpContent").focus(function () {
        if ($.trim($(this).html()) == $(this).attr("default")) {
            $(this).html("");
            $(this).css("color", "black");
        }
    }).blur(function () {
        if ($.trim($(this).html()) == "") {
            $(this).css("color", "#b3b3b3");
            $(this).html($(this).attr("default"));
        }
    });
    $("#btnSubmit").click(function () {
        var result = true;
        var msg = ValidateForm();
        if (msg != "") {
            result = false;
            $("#txtErrorMsg").show();
            $("#txtErrorMsg").text(msg);
        }
        else {
            posterrorajax2();
        }
    });
    //$('#btnInsertImg').detach().appendTo($('#view_help_ct'));
}
function ajaxresolution() {
    if (!$.cookie("resolutionname")) {
        var v = window.screen.width + "*" + window.screen.height
        $.get("resolution.ashx?v=" + v, null);
    }
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息 
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}