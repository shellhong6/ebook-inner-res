var isLoad = false;
var hideTimer;
// 初始化事件
$(function(){
	setTimeout(function(){
		$(".topToolBar").removeClass("s");
	}, 2000);
	$(".bt").click(function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		if($(this).parents(".sideBar").find(".list_1").length > 0){
			$(this).parents(".sideBar").find(".list").hide();
			$(this).parents(".sideBar").find(".list_" + ($(this).index()+1)).show();
		}
	});
	var leftBarHeight = $(window).height() - 111;
	$(".leftToolBar ul").css("height", leftBarHeight + "px");
	$(".vPage .leftToolBar .ctrl").css("top", (leftBarHeight + 86)/2 + "px");
	
	$(".leftToolBar .ctrl").click(function(){
		$(".leftToolBar").toggleClass("close");
	});
	$(document).bind("click",function(e){ 
        var target = $(e.target); 
        if(target.closest(".bar").length == 0 && target.closest(".arrow_down").length == 0 && target.closest(".list").length == 0){ 
            $(".bar").hide(); 
			clearTimeout(hideTimer);
        } 
    });
    //收藏状态查询
    // $.ajax({
    //     url: 'userdata.ashx?d=' + new Date(),
    //     dataType: 'json',
    //     data: { tp: 7, mid: DM5_MID },
    //     type: 'POST',
    //     success: function (data) {
    //         if (data && data.msg == "1") {
    //             $("#cp_fun_book").addClass("active");
    //         }
    //     }
    // });
	
	$(".vPage .chapterBar .list").scroll(function(){
		clearTimeout(hideTimer);
		setHideTimer();
	});
	$(".vPage .pageBar").scroll(function(){
		clearTimeout(hideTimer);
		setHideTimer();
	});
	$(".vPage .historyBar .list").scroll(function(){
		clearTimeout(hideTimer);
		setHideTimer();
	});
	var iList = $(".iList");
	for(var i = 0;i < iList.length;i++){
		preventScroll(iList[i]);
	}
})
//章节栏点击下
function toolClick_1(){
	clearTimeout(hideTimer);
	if($('.chapterBar.down').css('display')=='none'){
		$('.bar').hide();$('.chapterBar.down').show();
	}else{
		$('.chapterBar.down').hide();
	}
	setHideTimer();
}
//章节栏点击上
function toolClick_2(){
	clearTimeout(hideTimer);
	if($('.chapterBar.up').css('display')=='none'){
		$('.bar').hide();$('.chapterBar.up').show();
	}else{
		$('.chapterBar.up').hide();
	}
	setHideTimer();
}
//历史栏点击
function toolClick_3(){
	clearTimeout(hideTimer);
	if($('.historyBar').css('display')=='none'){
		$('.bar').hide();$('.historyBar').show();
	}else{
		$('.historyBar').hide();
	}
	setHideTimer();
}
//页码栏点击下
function toolClick_4(){
	clearTimeout(hideTimer);
	if($('.pageBar.down').css('display')=='none'){
		$('.bar').hide();$('.pageBar.down').show();
	}else{
		$('.pageBar.down').hide();
	}
	setHideTimer();
}
//页码栏点击上
function toolClick_5(){
	clearTimeout(hideTimer);
	if($('.pageBar.up').css('display')=='none'){
		$('.bar').hide();$('.pageBar.up').show();
	}else{
		$('.pageBar.up').hide();
	}
	setHideTimer();
}
//开关灯事件
function toggleWhite(){
	$('body').toggleClass('white');
	console.log($('body').hasClass('white'));
	if($('body').hasClass('white')){
	    $.cookie("isLight", "off", { path: "/", expires: 365 });
	    $("#lightTip").text("关灯");
	}
	else{
		$.cookie("isLight", "on", { path: "/", expires: 365 });
		$("#lightTip").text("开灯");
	}
}
//开始定时
function setHideTimer(){
	hideTimer = setTimeout(function(){
		$('.bar').hide();
	}, 2000);
}
function getBookmark(){
    $.ajax({
        url: '/userdata.ashx?d=' + new Date(),
        dataType: 'json',
        data: { top: 3, language: 1,tp: 1 },
        success: function (json) {
            var result = '';
            if(json!=null&&json.length > 0){
                for(var i = 0;i < json.length;i++){
                    result += '<div class="item">';
                    result += '<a href="/'+json[i].MangaUrl+'/"><img src="'+json[i].MangaImageUrl+'" style="width:100px;height:140px;" /></a>';
                    result += '<div class="info">';
                    result += '<p class="title"><a href="/'+json[i].MangaUrl+'/">'+json[i].MangaTitle+'</a></p>';
                    if(json[i].ReadChapterName == "" || json[i].ReadChapterName == null){
                        result += '<p class="subtitle">未看</p>';
                    }
                    else{
                        result += '<p class="subtitle">已看<a href="'+json[i].ReadChapterUrl+'">'+json[i].ReadChapterName+'</a></p>';
                    }
                    result += '<p class="bottom"><a href="'+json[i].ChapterUrl+'">更新至'+json[i].ChapterName+'</a></p>';
                    result += '</div></div>';
                }
                $("#historyList_1").html(result);
            }
            else{
                result += '<div style="width: 310px;padding: 50px 0;font-size: 14px;text-align:center;" class="noData">暂无数据</div>';
                $("#historyList_1").html(result);
            }
        }
    });
}
//防止冒泡
function preventScroll(item){  
    var _this = item 
    if(navigator.userAgent.indexOf("Firefox")>0){  
        _this.addEventListener('DOMMouseScroll',function(e){  
            _this.scrollTop += e.detail > 0 ? 60 : -60;     
            e.preventDefault();  
        },false);   
    }else{  
        _this.onmousewheel = function(e){     
            e = e || window.event;     
            _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;     
            return false;  
        };  
    }  
    return this;  
}  
function getHistory(){
	isLoad = true;
	//加载书签历史
	$.ajax({
        url: '/userdata.ashx?d=' + new Date(),
        dataType: 'json',
        data: { top: 3, language: 1,tp: 1 },
        success: function (json) {
        	var result = '';
        	if(json!=null&&json.length > 0){
	        	for(var i = 0;i < json.length;i++){
		            result += '<div class="item">';
		            result += '<a href="/'+json[i].MangaUrl+'/"><img src="'+json[i].MangaImageUrl+'" style="width:100px;height:140px;" /></a>';
		            result += '<div class="info">';
		            result += '<p class="title"><a href="/'+json[i].MangaUrl+'/">'+json[i].MangaTitle+'</a></p>';
		            if(json[i].ReadChapterName == "" || json[i].ReadChapterName == null){
		            	result += '<p class="subtitle">未看</p>';
		            }
		            else{
		            	result += '<p class="subtitle">已看<a href="'+json[i].ReadChapterUrl+'">'+json[i].ReadChapterName+'</a></p>';
		            }
		            result += '<p class="bottom"><a href="'+json[i].ChapterUrl+'">更新至'+json[i].ChapterName+'</a></p>';
		            result += '</div></div>';
	        	}
	        	$("#historyList_1").html(result);
        	}
        	else{
        		result += '<div style="width: 310px;padding: 50px 0;font-size: 14px;text-align:center;" class="noData">暂无数据</div>';
        		$("#historyList_1").html(result);
        	}
        }
    });
	$.ajax({
        url: '/userdata.ashx?d=' + new Date(),
        dataType: 'json',
        data: { top: 3, language: 1,tp: 2 },
        success: function (json) {
        	var result = '';
        	if(json!=null&&json.length > 0){
	        	for(var i = 0;i < json.length;i++){
		            result += '<div class="item">';
		            result += '<a href="/'+json[i].MangaUrl+'/"><img src="'+json[i].MangaImageUrl+'" style="width:100px;height:140px;" /></a>';
		            result += '<div class="info">';
		            result += '<p class="title"><a href="/'+json[i].MangaUrl+'/">'+json[i].MangaTitle+'</a></p>';
		            if(json[i].ReadChapterName == "" || json[i].ReadChapterName == null){
		            	result += '<p class="subtitle">未看</p>';
		            }
		            else{
		            	result += '<p class="subtitle">已看<a href="'+json[i].ReadChapterUrl+'">'+json[i].ReadChapterName+'</a></p>';
		            }
		            result += '<p class="bottom"><a href="'+json[i].ChapterUrl+'">更新至'+json[i].ChapterName+'</a></p>';
		            result += '</div></div>';
	        	}
	        	$("#historyList_2").html(result);
        	}
        	else{
        		result += '<div style="width: 310px;padding: 50px 0;font-size: 14px;text-align:center;" class="noData">暂无数据</div>';
        		$("#historyList_2").html(result);
        	}
        }
    });
}