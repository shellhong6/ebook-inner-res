SMK.namespace('SMK.Buy');

(function(){

	var _default = {
		btn: '.sr-js-btn',//弹窗触发请求按钮
		chargeBtn: '.sr-js-charge',//充值按钮
		confirmBtn: '.sr-js-buyConfirm',//购买确认按钮
		conBtn: '.layerBox .sr-js-btn', //不充值返回继续按钮
		tpl:  'dialog2_html',//模板
		timer: null,
		flag: false
	};
	
	function Buy(cfg){
		this.opt = $.extend({}, _default, cfg);
		this.init();
	};

	Buy.prototype = {
		init: function(){
			this.payPopBind();
			this.payBtnBindEvent();
			this._confirm();
		},
		getQueryString: function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if(r!=null) {
		        return  unescape(r[2]);
		    } else {
		        return null;
		    }      
		},
		payTpl: function(data,len){
			//充值金额
			var html = ' ';
			html += '<div class="s-select-pay-type"><div class="pay-list" data-type="wechat"><a href="javascript:;" class="active"><em class="W_WeChat"></em><span class="text">微信支付</span><i></i></a></div><div class="pay-list" data-type="pay"><a href="javascript:;"><em class="W_pay"></em><span class="text">支付宝支付</span><i></i></a></div></div><div class="title-num"><p>选择充值金额</p><div class="close"><a href="javascript:void(0)" dialog_count="0"></a></div></div><div class="sr-charge"><div class="sr-buy-ul sr-charge-cont" type="radio">';
			for( var i = 0; i < data.rechage_config.length;i++){
				html += '<a href="javascript:;" class="sr-buy-li" data-value="'+data.rechage_config[i].price+'"><p class="price">'+data.rechage_config[i].price+'元</p><p class="s-langhua"><span>'+parseInt(data.rechage_config[i].price * 100)+'<b>浪花</b></span><em><i></i>'+data.rechage_config[i].voucher_price+'<b>代金券</b></em></p><em class="s-cur"><b></b></em></a>';
			}
			html += '</div><div class="sr-charge-btn"><a href="javascript:void(0);" class="sr-play-red sr-js-charge"><span><em>确认</em></span></a></div></div><div class="s-huilvwarn"><p>温馨提示：</p><p>1.   即日起，“阅读币”更名为“浪花”</p><p>2.  兑换比例为1元人民币=100浪花，1浪花=1代金券</p><p>3.  充值赠送代金券有效期为半年</p></div>';
			return html;
		},
		weChatCodeTpl: function(num,data){
			//微信支付二维码模板
			var html = '';
			html += '<div class="s-pay-content"><div class="pay-content-left"><div class="pay-title"><i></i>微信扫码支付<em>'+num+'</em>元</div><div class="pay-code"><img src="http://vip.book.sina.com.cn/weibobook/ajax/qrcode.php?url='+data.code_url+'" ></div><div class="pay-copy">北京新浪阅读信息技术有限公司</div></div><div class="pay-content-right"></div></div>'
			return html;
		},
		//充值弹窗金额数据
		getData: function(){
			var that = this;
			$.ajax({
				//url: '../assets/js/recharge_choose.php',
				url: _cfg['rechargeChooseUrl'],
				type: 'post',
				dataType: 'json'
			})
			.done(function(data) {
				if(data.error_code == 0){
					var html = that.payTpl(data.data);
				    SMK.pop.tips('',html,{
						title:'选择充值方式',
						width:700,
					});
					//默认选中第一个金额
					$('body').find('.dialog_content .sr-charge-cont .sr-buy-li').eq(0).addClass('current');
					//充值方式
			       	$('body').on('click','.layerBox .pay-list a',function(){
			        	$(this).addClass('active').closest('.pay-list').siblings().find('a').removeClass('active');
			        });
				}
			})
			.fail(function() {
				SMK.util.globalTips('网络异常，请重试！');
			});
		},
		//充值弹窗
		payPopBind: function(){
			var that = this;
			$('body').on('click',that.opt.btn,function(){
				that.getData();
			});
		},
		//订单查询
		orderMes: function(order_id,num){
			var that = this;
			that.opt.timer = setInterval(function(){
				var ajaxGet = $.ajax({
					url: 'http://vip.book.sina.com.cn/weibobook/ajax/recharge_order.php',
					type: 'post',
					dataType: 'json',
					data: {order_id: order_id,pay_type:"wx_pc"}
				})
				.done(function(data) {
					if(data.error_code == 0){
						//支付成功
						clearInterval(that.opt.timer);  
						var html = '<div class="s-pay-content-success"><div class="pay-pic"><i></i></div><div class="pay-msg">成功充值<em>'+num*100+'</em>浪花</div><div class="pay-msg-btn"><a href="javascript:;">完成</a></div></div>';
						$('.close a').click();
						SMK.pop.tips('',html,{
								title:'微信支付',
								width: 590,
								closeCallback: function(){
									if(that.getQueryString('bid') != null ){
										if(mode == 'default'){
											window.location.href = '/weibobook/vipc.php?bid='+_cfg.book_id+'&cid='+_cfg.chapter;
										}else{
											window.location.href = '/weibobook/vipc.php?bid='+_cfg.book_id+'&cid='+_cfg.chapter+'&m=word';
										}
									}else{
										window.location.reload();
									}
								}
							}
						);
					}else if(data.error_code == 3){
						//二维码已失效
						ajaxGet.abort();
						clearInterval(that.opt.timer); 
						var ajaxParam = {
							amount: that.opt.amount,
							pay_type: "wx_pc"
						}
						$.ajax({
							url: _cfg['rechargeUrl'],
							type: 'post',
							dataType: 'json',
							data: ajaxParam
						})
						.done(function(data) {
							if(data.code == 0){
								var url = "http://vip.book.sina.com.cn/weibobook/ajax/qrcode.php?url="+data.code_url;
								var img = new Image();
								img.src = url;
								img.onload = function () { 
									$('.pay-code img').attr('src',url);
								 };
								var order_id = data.order_id;
								that.orderMes(order_id,that.opt.amount);
							}else{
								SMK.util.globalTips('网络异常！');	
							}
						})
						.fail(function() {
							SMK.util.globalTips('网络异常！');
						});
					}else if(data.error_code == 2){
						//查询失败
						clearInterval(that.opt.timer); 
					}
					//点击完成
					$('body').on('click','.pay-msg-btn a',function(){
						$('.close a').click();
						window.location.reload();
					});
				})
				.fail(function() {
					console.log("error");
				});
			},2000);
		},
		//确认充值
		payBtnBindEvent: function(){
			var that = this;
			$('body').on('click',that.opt.chargeBtn,function(){
				that.opt.amount = $('.sr-buy-ul .sr-buy-li.current').attr('data-value');
				var ajaxParam = {
					amount: that.opt.amount,
					pay_type: "wx_pc"
				}
				if($('.pay-list a.active').closest('.pay-list').attr('data-type') == 'pay'){
					//支付宝
					$('.close a').click();
					var url = _cfg['rechargeUrl']+'?amount='+that.opt.amount+'&backurl='+window.location.href;
					//兼容ie-referrer
					var explorer =navigator.userAgent ;
					if (explorer.indexOf("MSIE") >= 0 || typeof(window.showModalDialog && window.chrome) == 'undefined') {
						var referLink = document.createElement('a');
						referLink.target = '_blank';
				        referLink.href = url;
				        document.body.appendChild(referLink);
				        referLink.click();
					}else{
						window.open(url);
					}
					var html = '<div class="comConfirm"><p>请在新打开的页面上充值后点击继续，<br>完成希望的操作</p></div><div class="btn-Continue"><a href="javascript:;" class="sr-play-black"><span><em>继续</em></span></a></div>';
					SMK.pop.tips('',html,{
						title:'充值中',
						width: 700,
						showClose: false
					});
					//继续
					$('body').on('click','.btn-Continue a',function(){
						$('.close a').click();
						window.location.reload();
					});
				}else{
					$.ajax({
						url: _cfg['rechargeUrl'],
						type: 'post',
						dataType: 'json',
						data: ajaxParam
					})
					.done(function(data) {
						if(data.code == 0){
							var order_id = data.order_id;
							$('.close a').click();
							var html = that.weChatCodeTpl(that.opt.amount,data);
							SMK.pop.tips('',html,{
								title:'微信支付',
								width: 700,
								closeCallback: function(){
									clearInterval(that.opt.timer);
								},
								callback: function(dialog,opt){
									that.orderMes(order_id,that.opt.amount);
								}
							});
						}else{
							SMK.util.globalTips('网络异常！');	
						}
					})
					.fail(function() {
						SMK.util.globalTips('网络异常！');
					});
					
				}
			});
		},
		/*购买确认(参数会变)*/
		_confirm: function(){
	        var opt = this.opt;
	        var flag = false;

			//input
			$('body').on('keyup', '#sr-charge-num', function(){
				var tar = $(this).closest('.sr-buy-li');
				tar.attr('data-value', $(this).val());
			});

			$('body').on('click', opt.confirmBtn, function(){
		      if(!SMK.util.getLoginStatus()){
	        	SMK.util.checkLogin('',{tpl: opt.tpl,isDialog:false});
	          	return false;
		      }

				var tar = $(this);
				var par = tar.closest('.dialog_content') ;

				var autobuy = par.find('.sr-buy-li').hasClass('current') ? 'Y' :'N';
				$('.close a').click();
				if(flag){
					return;
				}
				flag = true;
				var data = {
					book_id: _cfg.book_id,
					chapter_id: _cfg.chapter,
					autobuy: autobuy
				}
				SMK.request.post(_cfg.buyDoneUrl, data,
					function(data){
						flag = false;
						if(data.error_code == 0) {
							SMK.pop.tips('sr-buy-success-tips','<div class="sr-buy-success"><i></i><span>购买成功</span></div>',{
									tpl:  opt.tpl,
									time: 2000,
									width: 350,
									closeCallback: function(){
										if(mode == 'default'){
											window.location.href = '/weibobook/vipc.php?bid='+_cfg.book_id+'&cid='+_cfg.chapter;
										}else{
											window.location.href = '/weibobook/vipc.php?bid='+_cfg.book_id+'&cid='+_cfg.chapter+'&m=word';
										}
									}
								}
							);
						} else{
							SMK.util.globalTips('网络异常！');
						}

					},
					function(){
						flag = false;
					}
				);
			});
		},
	};

	/*单选/复选框
	 * @param elem(jq选择器)               	父容器
	 * @param cell(jq选择器)               	每一个按钮选择器
	 * @param cur(class)                   	当前样式 缺省为current
	 * @param type(radio check)            	判断是单选还是复选 需要在父容器绑定type属性
	 * @param fn(function)				   	点选之后的回调
	 */
	Buy.prototype.select = function(cfg){
		var select = {
		     init: function(cfg){
		        var _default = {
		            elem: '',
		            cell: '',
		            cur: 'current'
		        };
		        var self = this;
		        var opt = this.opt = $.extend({}, _default, cfg);
		        $('body').on('click', opt.elem + ' ' + opt.cell, function(){
		            var tar = $(this).closest(opt.elem);
		            self[tar.attr('type')](this);
		            opt.fn && opt.fn(this);
		        });
		    },
		    //单选
		    radio: function(_this_){
		        var opt = this.opt;
		        $(_this_).addClass(opt.cur).attr('selected', 'selected');
		        $(_this_).siblings().removeClass(opt.cur).removeAttr('selected');
		    },
		    //复选
		    check: function(_this_){
		        var opt = this.opt;
		        var tar = $(_this_);
		        if(tar.hasClass(opt.cur)){
		            tar.removeClass(opt.cur).removeAttr('selected');
		        }
		        else{
		            tar.addClass(opt.cur).attr('selected', 'selected');
		        }
		    }
		};
		return select.init(cfg);
	};


	SMK.Buy = Buy;
	/*调用示例
	SMK.Buy = new Buy({
		btn: '.sr-js-btn',//弹窗触发请求按钮
		chargeBtn: '.sr-js-charge',//充值按钮
		confirmBtn: '.sr-js-buyConfirm'//购买确认按钮
	});

	SMK.Buy.select({
		elem: '.sr-buy-ul',
    	cell: '.sr-buy-li',
    	//this为按钮
    	fn: function(_this_){
    		var par = $(_this_).closest('.dialog_content');
    		var need = parseFloat($(_this_).attr('data-value'));
    		var has = parseFloat(par.find('.sr-myAccount-num em').text());
    		var tips = '<div class="sr-myAccount-tips"><i></i><span>您的余额不足，请您充值</span></div>';
    		par.closest('.dialog_tips').css('height', 'auto');
    		if(need && has && need > has){
    			!par.find('.sr-myAccount-tips').length
    			&& $(tips).insertAfter('.sr-myAccount-num');

    			par.find('.sr-dialog-cont-btn .sr-play-red').addClass('none');
    			par.find('.sr-dialog-cont-btn .sr-play-orange').removeClass('none');
    		}
    		else if(need && has && need <= has){
    			par.find('.sr-myAccount-tips').remove();
    			par.find('.sr-dialog-cont-btn .sr-play-orange').addClass('none');
    			par.find('.sr-dialog-cont-btn .sr-play-red').removeClass('none');
    		}
    	}
	});*/

})();
