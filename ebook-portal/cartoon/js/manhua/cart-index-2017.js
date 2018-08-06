/*
2017/4/26
*/
jQuery(function(){
	/*文档分类*/
    var docList=jQuery("#doc_list"),
		doc_list_show=jQuery(".doc_list_show"),
		//top_nav_items=jQuery("#top_nav_items"),
		top_nav_items_class=jQuery(".top_nav_items"),
		navMenuSkills=jQuery("#navMenuSkills1");

		docList.on("mouseenter",function(){
			docList.addClass("doc_list");
			doc_list_show.show();
		}).on("mouseleave",function(){
			docList.removeClass("doc_list");
			doc_list_show.hide();
		});
	
		doc_list_show.on("mouseenter",function(){
			docList.addClass("doc_list");
			doc_list_show.show();
		}).on("mouseleave",function(){
			docList.removeClass("doc_list");
			doc_list_show.hide(); 
		});

		/*my_docin*/
		top_nav_items_class.on("mouseenter",function(){
			top_nav_items_class.addClass("top_nav_items_high");
			navMenuSkills.show();
		}).on("mouseleave",function(){
			top_nav_items_class.removeClass("top_nav_items_high");
			navMenuSkills.hide();
		});

		navMenuSkills.on("mouseenter",function(){
			top_nav_items_class.addClass("top_nav_items_high");
			navMenuSkills.show();
		}).on("mouseleave",function(){
			top_nav_items_class.removeClass("top_nav_items_high");
			navMenuSkills.hide();
		});

});
var dataStorage = [];
jQuery(function(){
	var oNavHoverBtn = jQuery(".mh-nav-classic"),
	oNavSheet = jQuery(".mh-classic-list");
	if(oNavHoverBtn.size()>0 && oNavSheet.size()>0){
		oNavHoverBtn.on("mouseenter",function(){
			jQuery(".mh-nav-classic .btn-open").addClass("cur");
			oNavSheet.stop();
			oNavSheet.slideDown("fast");
		});
		oNavHoverBtn.on("mouseleave",function(){
			jQuery(".mh-nav-classic .btn-open").removeClass("cur");
			oNavSheet.stop();
			oNavSheet.slideUp("fast");
		});
	}

	var aRankTabs = jQuery(".rank-tab span");
	aRankTabs.bind("mouseenter",function(){
		var iIndex = jQuery(this).data("tabindex");
		jQuery(this).parent().find('span').removeClass("cur");
		jQuery(this).addClass("cur");
		var aRankCons = jQuery(this).parent().parent().next(".bd").find("ul");
		aRankCons.hide();
		aRankCons.eq(iIndex).show();
	});

	function cartSelectShow(){
		var aAjaxCondiType = jQuery("#j_select_show .lasted-tab a"),
			aAjaxCondiLetter = jQuery("#j_select_show .sort-letter a"),
			param1 = 0,param2 = "hot";
			if(aAjaxCondiType.size()>0&&aAjaxCondiLetter.size()>0){
				aAjaxCondiType.bind("click",function(){
					aAjaxCondiType.removeClass("cur");
					jQuery(this).addClass("cur");
					param1 = jQuery(this).data("conditype");
					ajaxHandel(param1,param2);
				});
				aAjaxCondiLetter.bind("click",function(){
					aAjaxCondiLetter.removeClass("cur");
					jQuery(this).addClass("cur");
					param2 = jQuery(this).data("letter");
					ajaxHandel(param1,param2);
				});
			}
			function ajaxHandel(a,b){
				jQuery(".sel-result").html('<p style="color:#999;text-align:center;padding:80px 0 0;">正在加载...</p>');
				jQuery.ajax({
                    type: 'GET',
                    url:"/comic/comicList.do",
                    context:jQuery(".sel-result"),
                    data:"category_id="+a+"&letter="+b,
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                     	jQuery(".sel-result").html('<p style="color:#999;text-align:center;padding:80px 0 0;">网络出现问题，稍后再试...</p>');
                    },
                    success: function(data) {
                    	var iData = eval('(' + data + ')');
                    	if(iData.length == 0){
                    		jQuery(".sel-result").html('<p style="color:#999;text-align:center;padding:80px 0 0;">暂无数据</p>');
                    		return;
                    	}
                    	var str = "";
                    	for(var i = 0;i<iData.length;i++){
                    		var is_new = iData[i].is_new == 0?"":"i-new";
                    		str+='<div class="item '+is_new+'"><a target="_blank" href="/comic-'+iData[i].comic_id+'.html" title="'+iData[i].comic_name+'"&nbsp;"'+iData[i].chapter_name+'" class="title">'+iData[i].comic_name+'</a><span class="c">['+iData[i].chapter_name+']</span></div>';
                    	}
                    	jQuery(this).html(str);

                    }
                });
			}

	}
	function cartDetailShow(){
		var oDetailBox = jQuery("#j_show_detail");
		if(oDetailBox.size() == 0){return;}
		var aOpenShow = oDetailBox.find(".open-show"),
			aFloder = oDetailBox.find(".floder");
			var aLi = oDetailBox.find("li");
			aLi.bind("mouseenter",function(){
				aLi.removeClass("cur");
				jQuery(this).addClass("cur");
		});
	}
	var pendingRequests = {};
	function showCurDetail(){
		var aShowInfoPanel = jQuery(".mh-top-show .show-list .panel"),
			aTopShowBox = jQuery(".mh-top-show");
			if(aTopShowBox.size() == 0||aShowInfoPanel.size() == 0){return;}
			aShowInfoPanel.bind("mouseenter",function(){
				var iIndex = jQuery(this).parent().data("row");
				var iCurPid = jQuery(this).data("pid");
				var curShowBox = aTopShowBox.eq(iIndex);
				curShowBox.find(".panel-sty2 .panel").removeClass("cur");
				jQuery(this).addClass("cur");
				if(dataStorage[iIndex]!=undefined){
					dataHanedl(iIndex,dataStorage[iIndex][iCurPid]);
				}
				else{
					
					jQuery.ajaxPrefilter(function( options, originalOptions, jqXHR ){
				 		var key = options.url;
					     if (!pendingRequests[key]) {
					    	 pendingRequests[key] = jqXHR;
					     }else{
					     //jqXHR.abort(); //放弃后触发的提交
					     	pendingRequests[key].abort(); // 放弃先触发的提交
					 	}
				 		var complete = options.complete;
				 		options.complete = function(jqXHR, textStatus) {
					 	 	pendingRequests[key] = null;
					 	 	if (jQuery.isFunction(complete)) {
					 	 	     complete.apply(this, arguments);
					 	 	  }
					 	};

				 	});
			 	 	
					jQuery.ajax({
	                    type: 'GET',
	                    url:"/comic/getComicInfo.do", 
	                    data:"comic_id="+iIndex,
	                    error:function(XMLHttpRequest, textStatus, errorThrown){
	                     	 if(errorThrown != 'abort'){ 
						     	 //alert('加载失败！'); 
						     }
	                    },
	                    success: function(data) {
	                    	var iData = eval('(' + data + ')');
	                    	dataStorage[iIndex] = iData;
	                    	dataHanedl(iIndex,dataStorage[iIndex][iCurPid]);
	                    }
	                });
				}
			});

			function dataHanedl(iIndex,data) {
				var iData = data;
				var curShowBox = aTopShowBox.eq(iIndex);
				var iLink = curShowBox.find(".show-thumb"),
					iUpdate = curShowBox.find(".show-thumb .panel-info span"),
					iImg = curShowBox.find(".show-thumb img"),
					iTitle = curShowBox.find(".info-title a"),
					iAuthor = curShowBox.find(".show-info .auth"),
					iTag = curShowBox.find(".show-info .tag"),
					iDesc = curShowBox.find(".show-info .info-desc");

					iLink.prop("href","/comic-"+iData.comic_id+".html");
	            	iLink.prop("title",iData.comic_name);
	            	iImg.prop("src",iData.cover_url);
	            	iImg.attr("alt",iData.comic_name);
	            	iTitle.prop("title",iData.comic_name);
	            	iTitle.prop("href","/comic-"+iData.comic_id+".html");
	            	iTitle.html(iData.comic_name);
	            	iAuthor.html(iData.author_name);
	            	var iUpdateStr = iData.is_full == 0?"更新至"+iData.chapter_name:"已完结";
	            	var aTag = iData.keyword.split("-");
	            	var tag_id = iData.keyword_ids.split("-");
	            	iUpdate.html(iUpdateStr);
	            	var str = "";
	            	for(var i = 0;i<tag_id.length;i++){
	            		if(tag_id[i]=='0'){
	            			continue;
	            		}
	            		str+='<a href="/comic/list.do?tag_id='+tag_id[i]+'" title="'+aTag[i]+'" target="_blank">'+aTag[i]+'</a>'; 
	            	}
	            	iTag.html(str);
	            	iDesc.html(iData.comic_desc);
			}

	}
	function showLastedShow(){
		var alastedTab = jQuery("#j_lasted_show .lasted-tab a"),
			aCon = jQuery("#j_lasted_show .lasted-list"),
			iLinkMore = jQuery("#j_lasted_show .mh-more"),
			aLink = ['list.do','list.do?sort=1','list.do?is_full=1'];
			alastedTab.bind("mouseenter",function(){
				alastedTab.removeClass("cur");
				jQuery(this).addClass("cur");
				aCon.hide();
				var iIndex = jQuery(this).data("index");
				aCon.eq(iIndex).show();
				iLinkMore.prop("href","/comic/"+aLink[iIndex]);
			});
	}
	function searchTxtClearCtl(){
		var searchTxt = jQuery(".mh-search-box input[type='text']");
		var aSearchBtns = jQuery(".mh-search-box .mh-search-btn");
		if(searchTxt.length == 0){return;}
		var searchVal = searchTxt.val();
		searchTxt.on('input propertychange', function(){
			var val = jQuery(this).val(),
				clearBtn = jQuery(this).parent().find('.search-txt-clear');
			if (val == '') {
				clearBtn.hide();
			} else {
				clearBtn.show();
			}
		});

		searchTxt.on("keydown",function(event){
			 var key_code = event.keyCode;
			 if (key_code==13){
			 	if(jQuery.trim(jQuery(this).val()) == ""){
					searchTxt.focus();
					return false;
				}
				jQuery(this).parent(".search_form").submit();
			 }
		});
		jQuery('.search-txt-clear').bind("click",function(){
			//var curInput = jQuery(this).siblings('input[type="text"]');
			searchTxt.val("");
			//searchTxt.focus();
			jQuery('.search-txt-clear').hide();
		});
		aSearchBtns.bind("click",function(){
			var curInput = jQuery(this).siblings('input[type="text"]');
			if(jQuery.trim(curInput.val()) == ""){
				curInput.focus();
				return false;
			}
			jQuery(this).parent().submit();
		});
	}
	function fixedNavBar(){//导航悬浮
		var oHoverNav = jQuery(".fenlei-hover"),
			oFixedNav = jQuery(".mh-fixed-bar");
		if(oHoverNav.size() == 1){
			oHoverNav.hover(function(){
				jQuery(this).addClass("cur");
			},function(){
				jQuery(this).removeClass("cur");
			});
		}
		if(oFixedNav.size() == 1){
			jQuery(window).bind("scroll",function(){
				var iScrollTop = jQuery(window).scrollTop(),
					iWh = jQuery(".mh-top-nav").offset().top+50;
				if(iScrollTop>=iWh){
					//oFixedNav.css("visibility","visible");
					oFixedNav.show();
				}
				else{
					//oFixedNav.css("visibility","hidden");
					oFixedNav.hide();
				}
			});
		} 
	}
	cartSelectShow();
	cartDetailShow();
	showLastedShow();
	showCurDetail();
	searchTxtClearCtl();
	fixedNavBar();
});
function openDocinshare(n){//参数n  1：人人 2：QQ空间 3：新浪微博 4：腾讯微博 5：QQ好友 6：开心网
	if(!bdshareconfig){return;}
	switch (n){
		case 1:
			bdshareconfig.to = "renren";
			//renrenBdShare(js_pid,js_cid);
			break;
		case 2:
			bdshareconfig.to = "qzone";
			//qqZoneBdShare(js_pid,js_cid);
			break;
		case 3:
			bdshareconfig.to = "tsina";
			//sinaWbBdShare(js_pid,js_cid);
			break;
		case 4:
			bdshareconfig.to = "tqq";
			//qqWbBdShare(js_pid,js_cid);
			break;
		case 5:
			bdshareconfig.to = "sqq";
			//qqFdBdShare(js_pid,js_cid);
			break;
		case 6:
			bdshareconfig.to = "kaixin001";
			//kaixinBdShare(js_pid,js_cid);
			break;
		default:
			return;
	}
	var shareUrl = 'http://s.share.baidu.com/?click=1&url='+bdshareconfig.url+'&uid=&to='+bdshareconfig.to+'&type=text&pic='+bdshareconfig.pic+'&title='+bdshareconfig.title+' &key=&sign=on&desc='+bdshareconfig.desc+'&comment='+bdshareconfig.desc+'&searchPic=1&l=181b8ivcl181b8j0c5181b8jelv&linkid=hk1wfrmedvq&sloc=674.301.0.28.35.20.28.36.37.0.961&apiType=0&buttonType=0&firstime=1372954734986'
	window.open(shareUrl);
}
(function(a) {
	a.fn.scrollLoading = function(b) {
		var c = {
			attr: "data-style",
			container: a(window),
			callback: a.noop
		};
		var d = a.extend({}, c, b || {});
		d.cache = [];
		a(this).each(function() {
			var h = this.nodeName.toLowerCase(),
				g = a(this).attr(d.attr);
			var i = {
				obj: a(this),
				tag: h,
				url: g
			};
			d.cache.push(i)
		});
		var f = function(g) {
			if (a.isFunction(d.callback)) {
				d.callback.call(g.get(0))
			}
		};
		var e = function() {
			var g = d.container.height();
			if (d.container.get(0) === window) {
				contop = a(window).scrollTop()
			} else {
				contop = d.container.offset().top
			}
			a.each(d.cache, function(m, n) {
				var p = n.obj,
					j = n.tag,
					k = n.url,
					l, h;
				if (p) {
					l = p.offset().top - contop, h = l + p.height();
					if ((l >= 0 && l < g) || (h > 0 && h <= g)) {
						if (k) {
							if (j === "div") {
								f(p.attr("style", k))
							}
							else if (j === "img") {
								//图片，改变src
								p.attr("src", k);	
							}
							 else {
								p.load(k, {}, function() {
									f(p)
								})
							}
						} else {
							f(p)
						}
						n.obj = null
					}
				}
			})
		};
		e();
		d.container.bind("scroll", e)
	}
})(jQuery);