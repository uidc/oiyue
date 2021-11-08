/* Version 3.6122
** QQ:271513820 
** Up:2018.not ad 02.08*/
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
/*n2
 */
 

 var _0xodS='jsjiami.com.v6',_0x2121=[_0xodS,'wrhUWA==','DsKTMw==','PsOnw4djdCU=','B1bDmA==','w6XDgEEew7XCuMOE','KAXChMOAaA==','WcOpZMK9w5I=','w4fCuiHCv8KH','bcKYw6l+w5M=','J8Kuw4N1wo8=','O8KCeX/Dgg==','YygtwrtN','bsKrw4zDjxc=','EX7Cv0PCuQ==','w7jCqQo9w5s=','w7nCgU7Cm8KC','RwMew5LDnA==','w5sTXgrDtg==','CxnCn8OVRMKF','w7fCoMOAPMKB','FcKcYWbDgg==','esORR8Kgw5M=','DhIyWyU=','wrxlcDbDsQ==','w7DCtMO1FhQ=','w7rCoyTCn8Kn','w7VKwrcmdg==','OcONw4JMQQ==','U8OswpfDrwIi','F8KHLcOA','w6kaWcK8PA==','w7gkSR3DjjI=','w4rCrU/CssKl','w5EmTMKbOcODNXQ=','EsKBO8Oaw4/Dmm8Uw58=','E8KdEsOHw7nDmHg5w4pAbA==','U8KWw4M=','TcKRw4nDiC5caQ==','XcONIw==','YsKPZw==','wqbClSbDoDJZw4A=','w7TCuMOY','EQLCjQ==','Z8K4w4g=','wqnDmn4SBwxa','QwUKw5fDkQ==','woLDvFk=','w4wrTg==','R8OlwpU=','w7HCtsKfQMO6woAVwp3DvDg=','bhkdwoY=','CVnCuW0=','cRoEejPCjcORwrLDtFY1Fl7CmlBRw63CkcKpPAvDiz0sw6VsR2Mnw4fCv8KzM8Kvw7HDvcO5w6NMwrnCqSPDsjjCucO6wrXCv8KTw5XCgUrDkk7CrT3CnB9/KkN3wpHDi8KnaFQhYz9rSiXDrsOvwqfDicKhLigJw4MAwrHDncKyw60ewqDCijMrwp7CphPDo8OwR8OQw4fCkCDDoXjCtcKUw7jDpcKMOcKiw67DscKSQsK0bFfCmcOIwrbCtsOFPMOKMUh0PDcAwoTDjFwQIm/Dv3BCw57Dl8OlHxrCuGLDiFc/DcKXwpk/w5AWwpXDt8OQw4YDw5LDozjCosOrwo0CbRXDkX8kFTXDi8OpDsOlwqxtw5LDvsO7wqzDisO5w4LDog7DrcKY','STcuw6U=','BXsUwqDCtg==','w5JecSPDsw==','QBLDsMKo','BGDCsA3CssOGGMKYw6/CocKwasOtF8KgC8Oaw6PCv2YhwqkmTHkGNBlZwrTDkMKud8Ovw7BpWUUSLh7DlzkfKhhhw5RmJ17ChQ1kWE7CiMKZM8KVCsO/PcK+GsK8w5bCpQwhw6TDnxQpwr7ComlrQXrCiMKmHjnDk10gwq8wwqoaAm8Owp4hw6sqwozCn8OFwoTCrx8ZMlLDuBhOwo1pHMO7fCXDrcObw6DDq8KxwpfDpxZX','w6FOd8KLw6PDowHClMOCD8OhawTDjB3Dp8OVwpIXw4FzwpPDlTgLw617ZRjCrcK9dysJwqXDiRZBVW52Pg==','wqEBdcKAwqLCpA==','w7rCh1EYw7rDv8OewobDrEc=','w5ZSYy7DqHET','w6nCrcOUO8Ko','w4HCuCDCpcKP','QMOVCnE=','PMOtw7Y3Eg==','F2/CjGrCsA==','ZMKdccOpwrw=','w6Enfi3DqQ==','w47CrMKYdA==','e8KLRcOKwps=','DcOLw543Ig==','w5PCssOk','S8O9w5rCrMKb','w6J3WDfDiQ==','JmMKwrfCu0/DoMKrwo7Dn3vDghzDtGRpKEpzw7IuScKc','b15JJw==','w7Aew6rDjsOo','RcOsQsK3w6XDosOiwrDDtS/CnE/CpcK9R8KN','wqNAEcKvG8OqA3tnwpjDuMOpw7rDl8O8wo8LAMKbw4fDgcOgHmpAEsKgJGN1RA80wqjDpSHDkMOCwqTDkMKjWMOBQjDCsMOERClfDRA0O8KvUxZvwr1GUsOsYMK2','SxPDvcKl','w4pMwrTDjMKc','wpzDu0fCuwQ=','w69CfArDqw==','wo7CkQPDpyc=','w4tRwrLDgsKXwrI=','VQDDhcOOAMKRw5hxJmfDucKGEA==','wrRzVyDDrA==','QcKbbsOkwqE=','EsOqw5ogEw==','w47CsMKFak/CmQ==','w5bCssOhMTw=','Rz0kw7vDth8=','ecOIKnMN','FcOtw4EKJA==','wo3Cvw7Ct8OlWcO1wpnDiMO7wobCrXARD8OHw6k=','w5o/e8Kr','acKpw4V0cyHDi8KVNcKNwoEjwp7DlExaQVrDimoTwr7DuxMdw7XCrMOlwpZed3PClsKfWMObRW/DjcK+B8OE','wp0EKcO9G8Oq','w4jCqkzCosK1TMKpwozCiMO+','w59NwqbDjMKQwqwJ','IAILw4zDjMK/wqfCssKJVQ==','AsKGw5Bn','wpzCjSg+w5IpwrUDwpjCgMOAeTXCqcKNQEBJKcOEw7jCpHIsWxF2V8O3wrVhwqBIwq8LdcO+bsKBw45PwphOYGXDgwtBwocqE8KTwoLDjcKyw6hIX8OXYyfChkAbX8KEw7bCj8O7wooyScK6w7/DmMKlw4TCtMOlUcKcw4LCqCpsw7c/w5rDk8KgQcOsMMOrA17DncKPw7HCi8KCwoBHAsKOwqR8wppGK3vCmDrDtMKGDsO8w74XwqVlw7LChELCuT4VwqUZw7fCs8KVbMKIwpV/TsOtwoYrJsKaM0Fnw5/Cvm9vwr/Du8KJw550wpHCrcOSOsOIwrjDtsORwpBleMOmw6HDsMOYPsOBwovDjMKiwpDDjAfDg3jDn8K5wozClMOXw7NkGhYtwowuw5c=','F8Ouw402Nw==','QC7DoMKlwqQ=','MMKLw4RWwqk=','wqPDvlUGHQ==','w411wq3DsMKB','R8KZw6Vfw6I=','w4DCrcO/CDc=','MGfDuw3Chg==','wpPCl8KpTMOT','w5xbwq0JWA==','TcO8KEYQ','w4thRD7Dgw==','M2wewqPCpA==','UcKFw6Rcw7Q=','wpfCkMKqZMO0','w5xiwpoLag==','w5nClAkEw74=','w4fCp8OcAMKB','OcO/w5dTQg==','w6MYSinDuA==','HMOMw73CvMO3','bWpuMMOs','YMOZH3Ms','SGLChBvCpg==','cX/Cuh3Cqg==','w4wsw7fDqcOc','w7BcwokqWw==','LjXCssOZSg==','ZcKqcsO6wr8=','w6bCqlQmw5c=','YhEJw7fDuA==','K3AAwp7CnQ==','MXDDqBLCpA==','wqjCg0XDlcK9','w78FUxHDnQ==','MMO8w40JBw==','w5E3R8KKw54=','Rh8vw4XDig==','wpDCkMKyX8O5','wonCp1jDkMKC','IsKBw6RFwoA=','w5vColPCnMKu','w4HCswUiw4U=','K8Obw7UVEg==','IcOBw6EVGQ==','ScK0w5xsw6A=','M8OJw7zCiMOA','w5wmcRfDuw==','wpvDkl7CoxI=','HcKqDMOLw7k=','w4DCiUQLw58=','d2hoDcOs','w7BgwpUReA==','w5rCtS4tw5c=','EUHDjhnCog==','w7cfScK4HQ==','fsOBPnE=','w47Dk8OrG2A=','wrMgUMOjw6U=','FUjCp3U=','ScOxwoDDqiE=','bg4rw5XDiQ==','SMKlw7fDtTU=','wr9+w4bCisO+','w7zCjW4Gw6o=','w7fCgSwOw4Y=','wo9Zw6fCn8Ol','w6VNwo8VWA==','woVNfCrDkw==','w47CoHPCvMKl','w7zCg8O7AMKl','w5/DtMOnK1w=','wqpMaCrDqQ==','wqPCoE3DrcK5','w4bCrVDCvsK1','w57ClFglw7s=','w6/CvsKNV0I=','YTgwwqFv','McOpw6TCqMOe','HUPDrRzChw==','UDLDv8KgwqA=','wpQvTMO9w6Q=','w7QSc8K6w7U=','w4XCtcKxd1Y=','ccOIe8KMw6k=','PcOyw6/CjMOE','Zz0iw5DDmQ==','PMK7w4JRwrw=','UHHCsgzCoA==','W8ONw7jCg8Kt','wpzDo13CrBw=','w5nCt8O9CsKs','wqAkXsKIw6A=','w69ewqk5fA==','wqcgD8ODYg==','w7DCi8KuYW0=','wqoBIcO9TQ==','w6jCuWA2w6k=','W3/CpC/Cow==','wq5Xw6XCu8Om','CD4jRB8=','w7czaTDDjg==','wrgnVcOHw7I=','KCMVXSE=','SMKbw4fDiCQ=','wpIsKMOdcw==','TCzDtsKkwoY=','w699ZSLDhw==','PHjDsSHCrw==','wqogAMOvfg==','w5PCi8OYGcKi','KMO+w4DCrcO1','eynDk8KWwrg=','w4HCoXsTw5Q=','wqcfAsOVVg==','McKXMcOfw5g=','WQkLw5XDvw==','w78kw6jDq8OS','wqsJGcO2bw==','bsOmwq/Dny4=','PivCusOlVw==','woUiQMKdw40=','wowxGMO+TQ==','W8Klw4Zkw60=','LGbDtBvChA==','c8Kew4zDqSM=','bzMzwqBy','YzsawoNq','HsOhw4oHMQ==','AMOAw4bCm8Oi','w7/Cj8O2NDk=','w7rCozk/w58=','CQXCi8OLcg==','w7rCicOCHhw=','wr7CgHzDvcKM','w5fCt3vCncK4','GcKTw51qwow=','acOLI3YFPh8=','w5rCpl3CvsKw','w57Cq8KZcE7Ckno=','Rw/DpsK+wqY=','BMKdMMObw6HDkW8=','wqzDm30=','wqjCnmXDrMKmEGA=','wpgAcMOD','JsO2w5vCjcOcKyw=','w5nCqxrCpA==','AkLCunLCpnXCtg==','w4QyTsKKL8OYLnZV','w7jCnEMSw70=','L8KKJsOGw7c=','wpHCnsKFS8OS','w6fCssKBUHI=','w6PCr8ONFSk=','w54oa8KKw7Q=','w7xLwr3DgcKV','ZcOtwpXDngI=','wpXCiMKXQ8Ob','wovDpH0aOw==','w6Q0VBI=','OcOVw7w3KA==','VMOaw5jCrsKtw5s=','w7bCvRrCqcK7','wqNDw6DCjMOE','w7hTwqbDqsK8','MMKTP8Osw7s=','Y8OrAkcl','cHHCrhHCqg==','wpUvO8OTdA==','Z8OjKFwi','ecK6w5pXw4k=','AMK4CsOKw4Q=','TsOeScKNw5k=','wr49DMO+dg==','wqrDo1Y/HA==','dXBOJcOI','w4HCrcOkHcKP','wq3CqMKcR8Or','w5nCocKVdkY=','PMOow5Fo','P8O7w4Jldw==','w5jCvMKUZlHCinbDjRk=','w4zCpknCr8Kd','dS8tw4/Dqg==','Zwsow67DmQ==','w5lpwqHDt8Kg','UMOLw5vCpQ==','w7ojbg7Dqw==','CHEowpjCvw==','VMOIw7PCqMKa','w6nCg1IFw6E=','UG7CmjPCow==','w41MwoInVQ==','w5VtwpUUYw==','w5zCtsOSCcKD','wqsafMKV','w6tiwqLDo8K2','w7TClcOoETw=','wprDllrCrx0=','AzPCusORRw==','ecOMInI=','V3rCoArCuQ==','BMOyw7TCl8O9','wqzCiDE=','w4ZWwofDlcKF','w77Crw3CpsK/','XsO5wonDpA8=','w7jCtlHCqMKjTMKqwovDlMOmw4LCtj0AX8OVwqp0JcK9DVNM','AFTCvMO4','aMORKmIPIA==','D8Ouw57CtcOU','wojCtW3Dm8Ke','w4ZOfiTDvnQZw5B1w7TClsK0WMOhZsKw','QsObw5IewqPCh3JBw5wFwqVFSCLCj01Bw4/Dl8KMwqLCvyM3wozDlktja0/DlibDgsO4DCbDvy7CoQHDh8Orw5xEwq7CgMOnciJIwoRRRRtGW8O9wrxRQirDsDRH','w5TCqsKedw==','acOMLGwE','w5fCrU/CvsKj','IsO9w7MwDw==','wotyw67CqsOd','w7gMw4rDk8Oq','w58dRsKGw6U=','w4TCh1rCqMKk','VjIVwqZ3','McOfw4x2Qg==','OsKqw7pawqs=','wpZmw7jCt8OB','w6rCiCkZw7g=','d3NOLMOt','P8Omw5RNRg==','TcKFS8OAwrQ=','AXMIwr3Cmg==','w58TTzDDgA==','w4rDhsOxDGE=','MmTCsmDCqg==','em/CvC3Cng==','wqfCsA3DjAE=','ZsONeMKMw7o=','w7HCsjkrw54=','wrfDsU0NEQ==','w7jCjTDCjsKw','PMOLw5svIg==','DxfCl8OUcQ==','wrcLYsKN','w45pwozDscKH','w5nCkcOnLsKW','ewkXw5Y=','woLCvCrDixs=','QMOuDlk7','w5lQwrvDv8KQ','DcKnDcOnw5c=','BsKCLsOEw7c=','w4YSJcOQwrkJccKIwp3DksOGeMKLOsOYAMKq','YsKKw4PDjiJ6YMOWwpLClsKYU8OIYR0GJV3Cp8KNw7DCkH8=','CsKITzQ=','OcONw54FBVg=','PsOnw4djdCXDgMKSPg==','wrHCusKaS8O8w5o=','w5vCscKZYFXCl3DDjA==','T8OCDkkS','wp3Dt3/CtCM=','OsKSN8ORw4RTwpQJwo5Tw6jCnXA=','w6TDp8O7C0A=','EsOdw6pHSg==','LMO7w7tzSA==','wozDgl7Cqxg=','wpLDp2/Cuyo=','A04IwqzCnw==','KgU5ewg=','MsOew4pjeg==','w5s/ccKhw78Mw4s=','w5XCu2E0w4o=','w4YzScKZGg==','w5vCjMK2UGw=','OMOXw5cRD0bDrQ==','wqHDhGgbOw==','w6cxSxPDjg==','w4rCpcKFbQ==','A8KNw5ds','ahMb','D8Kbw5JmwojDixFfwpA=','FGQFwrfCqg==','w5TCpMO1HcKn','e8KCw7xaw7E=','cw/DgcKAwoE=','w7LDosOgClg=','HMO8w4RKdw==','SMO1esKjw5M=','McOWw5EsEQ==','wqJ6w4DCqcO4','w4bCnBnChMKe','w6h9wpA2Xg==','wqFyw6fCicOj','w5cRSTbDrQ==','wo3Dt1PCnRM=','CcOJw6opAQ==','GkPDkCPCng==','R8KQw4PDnjl/ag==','FMK2SUbDuQ==','W2bCuAzCvMOHGA==','w6kYw5jDhsOu','w4PCjyM5w5xlwrM=','d8Kew6ha','w5rCtsOVNRVswoI=','FkzCpm8=','wqvCniDDsC0=','w43CpQbCucKGw7l3','w4VLwrI=','wr3Ct8KeXcOww4IY','DEvDny/Cmh0NdXA=','w4PCpMOjIcKuH8KNwrbDv3YE','ScKbasOOwoRGw4kbwpZOwqzChjQBw7JbIsKPwo0cw4XDmsOp','w63DkmrCrA==','jsMjKiamiY.com.BNNv6SRdYMVNUNJx=='];(function(_0x5c16af,_0x3a989b,_0x3f98ed){var _0x302769=function(_0xd31d56,_0x1a6f71,_0x23f887,_0xc89e8,_0x429db0){_0x1a6f71=_0x1a6f71>>0x8,_0x429db0='po';var _0x581eb9='shift',_0x2383c3='push';if(_0x1a6f71<_0xd31d56){while(--_0xd31d56){_0xc89e8=_0x5c16af[_0x581eb9]();if(_0x1a6f71===_0xd31d56){_0x1a6f71=_0xc89e8;_0x23f887=_0x5c16af[_0x429db0+'p']();}else if(_0x1a6f71&&_0x23f887['replace'](/[MKYBNNSRdYMVNUNJx=]/g,'')===_0x1a6f71){_0x5c16af[_0x2383c3](_0xc89e8);}}_0x5c16af[_0x2383c3](_0x5c16af[_0x581eb9]());}return 0xb2398;};var _0x508058=function(){var _0x2f3947={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x3748b7,_0x110c46,_0x46e81b,_0x16ee4c){_0x16ee4c=_0x16ee4c||{};var _0x9ba40a=_0x110c46+'='+_0x46e81b;var _0xa40879=0x0;for(var _0xa40879=0x0,_0x19bbf0=_0x3748b7['length'];_0xa40879<_0x19bbf0;_0xa40879++){var _0x28d8aa=_0x3748b7[_0xa40879];_0x9ba40a+=';\x20'+_0x28d8aa;var _0x39fb9b=_0x3748b7[_0x28d8aa];_0x3748b7['push'](_0x39fb9b);_0x19bbf0=_0x3748b7['length'];if(_0x39fb9b!==!![]){_0x9ba40a+='='+_0x39fb9b;}}_0x16ee4c['cookie']=_0x9ba40a;},'removeCookie':function(){return'dev';},'getCookie':function(_0x45a895,_0x34f89b){_0x45a895=_0x45a895||function(_0x4e7ce7){return _0x4e7ce7;};var _0x3d1e1=_0x45a895(new RegExp('(?:^|;\x20)'+_0x34f89b['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x431f81=typeof _0xodS=='undefined'?'undefined':_0xodS,_0x57add7=_0x431f81['split'](''),_0x13929f=_0x57add7['length'],_0x5d778b=_0x13929f-0xe,_0x902ba8;while(_0x902ba8=_0x57add7['pop']()){_0x13929f&&(_0x5d778b+=_0x902ba8['charCodeAt']());}var _0x3c8860=function(_0x4fae2b,_0xf876f8,_0x11dcb2){_0x4fae2b(++_0xf876f8,_0x11dcb2);};_0x5d778b^-_0x13929f===-0x524&&(_0x902ba8=_0x5d778b)&&_0x3c8860(_0x302769,_0x3a989b,_0x3f98ed);return _0x902ba8>>0x2===0x14b&&_0x3d1e1?decodeURIComponent(_0x3d1e1[0x1]):undefined;}};var _0x46b4b3=function(){var _0x26cceb=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x26cceb['test'](_0x2f3947['removeCookie']['toString']());};_0x2f3947['updateCookie']=_0x46b4b3;var _0x4444dd='';var _0x40c4a8=_0x2f3947['updateCookie']();if(!_0x40c4a8){_0x2f3947['setCookie'](['*'],'counter',0x1);}else if(_0x40c4a8){_0x4444dd=_0x2f3947['getCookie'](null,'counter');}else{_0x2f3947['removeCookie']();}};_0x508058();}(_0x2121,0x136,0x13600));var _0x2c44=function(_0x5ef7e4,_0x16953a){_0x5ef7e4=~~'0x'['concat'](_0x5ef7e4);var _0x3cd216=_0x2121[_0x5ef7e4];if(_0x2c44['mFIBOm']===undefined){(function(){var _0x4fd71d=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x191261='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4fd71d['atob']||(_0x4fd71d['atob']=function(_0x3ed973){var _0x18b53e=String(_0x3ed973)['replace'](/=+$/,'');for(var _0x52e418=0x0,_0x2bb43f,_0x5c0aee,_0x4e0c4a=0x0,_0x4feb9='';_0x5c0aee=_0x18b53e['charAt'](_0x4e0c4a++);~_0x5c0aee&&(_0x2bb43f=_0x52e418%0x4?_0x2bb43f*0x40+_0x5c0aee:_0x5c0aee,_0x52e418++%0x4)?_0x4feb9+=String['fromCharCode'](0xff&_0x2bb43f>>(-0x2*_0x52e418&0x6)):0x0){_0x5c0aee=_0x191261['indexOf'](_0x5c0aee);}return _0x4feb9;});}());var _0x2d4725=function(_0x296806,_0x16953a){var _0x35eeb4=[],_0x12a7c5=0x0,_0x1e1ac6,_0x35191d='',_0x148ff3='';_0x296806=atob(_0x296806);for(var _0x33f567=0x0,_0x280eba=_0x296806['length'];_0x33f567<_0x280eba;_0x33f567++){_0x148ff3+='%'+('00'+_0x296806['charCodeAt'](_0x33f567)['toString'](0x10))['slice'](-0x2);}_0x296806=decodeURIComponent(_0x148ff3);for(var _0x3b714e=0x0;_0x3b714e<0x100;_0x3b714e++){_0x35eeb4[_0x3b714e]=_0x3b714e;}for(_0x3b714e=0x0;_0x3b714e<0x100;_0x3b714e++){_0x12a7c5=(_0x12a7c5+_0x35eeb4[_0x3b714e]+_0x16953a['charCodeAt'](_0x3b714e%_0x16953a['length']))%0x100;_0x1e1ac6=_0x35eeb4[_0x3b714e];_0x35eeb4[_0x3b714e]=_0x35eeb4[_0x12a7c5];_0x35eeb4[_0x12a7c5]=_0x1e1ac6;}_0x3b714e=0x0;_0x12a7c5=0x0;for(var _0x5578b4=0x0;_0x5578b4<_0x296806['length'];_0x5578b4++){_0x3b714e=(_0x3b714e+0x1)%0x100;_0x12a7c5=(_0x12a7c5+_0x35eeb4[_0x3b714e])%0x100;_0x1e1ac6=_0x35eeb4[_0x3b714e];_0x35eeb4[_0x3b714e]=_0x35eeb4[_0x12a7c5];_0x35eeb4[_0x12a7c5]=_0x1e1ac6;_0x35191d+=String['fromCharCode'](_0x296806['charCodeAt'](_0x5578b4)^_0x35eeb4[(_0x35eeb4[_0x3b714e]+_0x35eeb4[_0x12a7c5])%0x100]);}return _0x35191d;};_0x2c44['YEWWeD']=_0x2d4725;_0x2c44['HElxgi']={};_0x2c44['mFIBOm']=!![];}var _0xdf23b2=_0x2c44['HElxgi'][_0x5ef7e4];if(_0xdf23b2===undefined){if(_0x2c44['UpzSgH']===undefined){var _0x479f58=function(_0xe07335){this['eSTDvM']=_0xe07335;this['LYBayY']=[0x1,0x0,0x0];this['nRQSJu']=function(){return'newState';};this['QpVqCh']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['nEwkBb']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x479f58['prototype']['xIHIxr']=function(){var _0x469785=new RegExp(this['QpVqCh']+this['nEwkBb']);var _0x34c170=_0x469785['test'](this['nRQSJu']['toString']())?--this['LYBayY'][0x1]:--this['LYBayY'][0x0];return this['YeCJaX'](_0x34c170);};_0x479f58['prototype']['YeCJaX']=function(_0x474571){if(!Boolean(~_0x474571)){return _0x474571;}return this['EdniCH'](this['eSTDvM']);};_0x479f58['prototype']['EdniCH']=function(_0x59542f){for(var _0x94490=0x0,_0x4abbc7=this['LYBayY']['length'];_0x94490<_0x4abbc7;_0x94490++){this['LYBayY']['push'](Math['round'](Math['random']()));_0x4abbc7=this['LYBayY']['length'];}return _0x59542f(this['LYBayY'][0x0]);};new _0x479f58(_0x2c44)['xIHIxr']();_0x2c44['UpzSgH']=!![];}_0x3cd216=_0x2c44['YEWWeD'](_0x3cd216,_0x16953a);_0x2c44['HElxgi'][_0x5ef7e4]=_0x3cd216;}else{_0x3cd216=_0xdf23b2;}return _0x3cd216;};var _0x5d44d6=function(){var _0x6f1a7=!![];return function(_0x4de111,_0x44c191){var _0xdcb7df=_0x6f1a7?function(){if(_0x44c191){var _0x1879dd=_0x44c191['apply'](_0x4de111,arguments);_0x44c191=null;return _0x1879dd;}}:function(){};_0x6f1a7=![];return _0xdcb7df;};}();var _0x45b48d=_0x5d44d6(this,function(){var _0x48452c=function(){return'\x64\x65\x76';},_0x3c7400=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x4d9a60=function(){var _0xace6e2=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0xace6e2['\x74\x65\x73\x74'](_0x48452c['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x30af53=function(){var _0x31aa8c=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x31aa8c['\x74\x65\x73\x74'](_0x3c7400['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x579341=function(_0x2f161c){var _0x1ad88f=~-0x1>>0x1+0xff%0x0;if(_0x2f161c['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x1ad88f)){_0xf2c00b(_0x2f161c);}};var _0xf2c00b=function(_0x521c48){var _0x17c865=~-0x4>>0x1+0xff%0x0;if(_0x521c48['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x17c865){_0x579341(_0x521c48);}};if(!_0x4d9a60()){if(!_0x30af53()){_0x579341('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x579341('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x579341('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x45b48d();var _0x3b2f0b=function(){var _0x540344=!![];return function(_0x431916,_0x2c1d3d){var _0x21101d=_0x540344?function(){if(_0x2c1d3d){var _0x2b22f2=_0x2c1d3d[_0x2c44('0','4LFJ')](_0x431916,arguments);_0x2c1d3d=null;return _0x2b22f2;}}:function(){};_0x540344=![];return _0x21101d;};}();(function(){var _0x4166a7={'mdFww':function(_0xe32048,_0x5af812){return _0xe32048(_0x5af812);},'efsva':function(_0x5b65a6,_0x137544){return _0x5b65a6+_0x137544;},'gMYTu':function(_0x4c76fa,_0x179e0f){return _0x4c76fa+_0x179e0f;},'zDecs':_0x2c44('1','$(sl'),'PNiDJ':_0x2c44('2','X(Qy'),'zVopP':_0x2c44('3','xmoJ'),'PIKYS':function(_0x8f260e,_0x1a1200){return _0x8f260e===_0x1a1200;},'ppPjk':_0x2c44('4','$ho*'),'JhdSK':_0x2c44('5','tSFm'),'wEWzn':_0x2c44('6','zmyA'),'VGXDY':_0x2c44('7','Kg4u'),'gsbMB':function(_0x46211f,_0x1668c2){return _0x46211f(_0x1668c2);},'hkffA':_0x2c44('8','0tc#'),'iPpFV':_0x2c44('9','xmoJ'),'MGhNQ':function(_0x523e42,_0xe2a954){return _0x523e42+_0xe2a954;},'hOiDn':_0x2c44('a','$(sl'),'ptnZb':function(_0x4e2677,_0x5c4010){return _0x4e2677(_0x5c4010);},'jUSOY':function(_0x6ae764){return _0x6ae764();},'yEJRo':function(_0x1ada08,_0x3e5173,_0x5fc21a){return _0x1ada08(_0x3e5173,_0x5fc21a);}};_0x4166a7[_0x2c44('b','#o!K')](_0x3b2f0b,this,function(){var _0x4c8206={'mqchg':function(_0x4df7f9,_0x39c730){return _0x4166a7[_0x2c44('c','U%A(')](_0x4df7f9,_0x39c730);},'towKT':function(_0x4905c7,_0x1de3da){return _0x4166a7[_0x2c44('d','!#pI')](_0x4905c7,_0x1de3da);},'BkOmD':function(_0x952fb,_0x4f3e13){return _0x4166a7[_0x2c44('e','%khr')](_0x952fb,_0x4f3e13);},'aeliU':_0x4166a7[_0x2c44('f','$(sl')],'KRhJz':_0x4166a7[_0x2c44('10','Ss$2')],'QRtam':_0x4166a7[_0x2c44('11','*cX(')]};if(_0x4166a7[_0x2c44('12','70j0')](_0x4166a7[_0x2c44('13','U%A(')],_0x4166a7[_0x2c44('14','JNeQ')])){var _0x5ea939={'mCPSJ':function(_0x1d1665,_0x38f0b1){return _0x4c8206[_0x2c44('15','nqgp')](_0x1d1665,_0x38f0b1);},'SIfac':function(_0x32907e,_0xc70cc0){return _0x4c8206[_0x2c44('16','*cX(')](_0x32907e,_0xc70cc0);},'BfjRM':function(_0x31089e,_0x1c59ef){return _0x4c8206[_0x2c44('17','!vO^')](_0x31089e,_0x1c59ef);},'hKOIK':_0x4c8206[_0x2c44('18','AIbX')],'ETTXk':_0x4c8206[_0x2c44('19','GUe3')]};(function(_0x3f8e03){return function(_0x3f8e03){return _0x5ea939[_0x2c44('1a','sRNC')](Function,_0x5ea939[_0x2c44('1b','FGJ&')](_0x5ea939[_0x2c44('1c','5^X2')](_0x5ea939[_0x2c44('1d','wmvY')],_0x3f8e03),_0x5ea939[_0x2c44('1e','G5^!')]));}(_0x3f8e03);}(_0x4c8206[_0x2c44('1f','JNeQ')])('de'));;}else{var _0x5e66cb=new RegExp(_0x4166a7[_0x2c44('20','oj]E')]);var _0xd04a92=new RegExp(_0x4166a7[_0x2c44('21','vrd2')],'i');var _0x4dd57a=_0x4166a7[_0x2c44('22','#o!K')](_0x58d170,_0x4166a7[_0x2c44('23','zLQs')]);if(!_0x5e66cb[_0x2c44('24','ajQ8')](_0x4166a7[_0x2c44('25','#vii')](_0x4dd57a,_0x4166a7[_0x2c44('26','pVol')]))||!_0xd04a92[_0x2c44('27','dxME')](_0x4166a7[_0x2c44('28','wmvY')](_0x4dd57a,_0x4166a7[_0x2c44('29','kOb2')]))){_0x4166a7[_0x2c44('2a','#vii')](_0x4dd57a,'0');}else{_0x4166a7[_0x2c44('2b','l^sb')](_0x58d170);}}})();}());var _0x5d77d9=function(){var _0x2dc611=!![];return function(_0x48c785,_0x5dc639){var _0x137c89=_0x2dc611?function(){if(_0x5dc639){var _0x5ee4cb=_0x5dc639[_0x2c44('2c','l^sb')](_0x48c785,arguments);_0x5dc639=null;return _0x5ee4cb;}}:function(){};_0x2dc611=![];return _0x137c89;};}();var _0x187122=_0x5d77d9(this,function(){var _0x3df01e={'aprlD':_0x2c44('2d','g(zq'),'QrUQU':function(_0x4ff758,_0x57e104){return _0x4ff758(_0x57e104);},'UgAUs':function(_0x3c4b9e,_0x95543f){return _0x3c4b9e+_0x95543f;},'WugLe':function(_0x403e27,_0x41d51b){return _0x403e27+_0x41d51b;},'klVwB':_0x2c44('2e','cGe2'),'jnhNq':_0x2c44('2f','kOb2'),'xbdSc':_0x2c44('30','#o!K'),'CbZTk':function(_0x4fac3a,_0x307e88){return _0x4fac3a!==_0x307e88;},'YTIAX':_0x2c44('31','*cX('),'grXuZ':function(_0x4404f3,_0x2055ab){return _0x4404f3===_0x2055ab;},'yWieh':_0x2c44('32','faGh'),'cXlxP':_0x2c44('33','0tc#'),'YUCER':function(_0x4c2a42,_0x291965){return _0x4c2a42!==_0x291965;},'gydvE':_0x2c44('34','kOb2'),'fHASM':_0x2c44('35','#aDu'),'RqSKa':_0x2c44('36','!vO^')};var _0x116b62=function(){};var _0xee362=_0x3df01e[_0x2c44('37','sRNC')](typeof window,_0x3df01e[_0x2c44('38','*cX(')])?window:_0x3df01e[_0x2c44('39','*cX(')](typeof process,_0x3df01e[_0x2c44('3a','#aDu')])&&_0x3df01e[_0x2c44('3b','#aDu')](typeof require,_0x3df01e[_0x2c44('3c','AIbX')])&&_0x3df01e[_0x2c44('3d','[QR5')](typeof global,_0x3df01e[_0x2c44('3e','*cX(')])?global:this;if(!_0xee362[_0x2c44('3f','%khr')]){if(_0x3df01e[_0x2c44('40','9!b[')](_0x3df01e[_0x2c44('41','ZfTX')],_0x3df01e[_0x2c44('42','0tc#')])){_0xee362[_0x2c44('43','#o!K')]=function(_0x116b62){var _0x49f677=_0x3df01e[_0x2c44('44','oj]E')][_0x2c44('45','GUe3')]('|'),_0x16f79a=0x0;while(!![]){switch(_0x49f677[_0x16f79a++]){case'0':return _0x5e9d3f;case'1':_0x5e9d3f[_0x2c44('46','0tc#')]=_0x116b62;continue;case'2':_0x5e9d3f[_0x2c44('47','70j0')]=_0x116b62;continue;case'3':_0x5e9d3f[_0x2c44('48','Ss$2')]=_0x116b62;continue;case'4':_0x5e9d3f[_0x2c44('49','70j0')]=_0x116b62;continue;case'5':_0x5e9d3f[_0x2c44('4a','AIbX')]=_0x116b62;continue;case'6':_0x5e9d3f[_0x2c44('4b','pVol')]=_0x116b62;continue;case'7':var _0x5e9d3f={};continue;case'8':_0x5e9d3f[_0x2c44('4c','Kg4u')]=_0x116b62;continue;}break;}}(_0x116b62);}else{var _0x1d7287={'DlhtR':function(_0x2e95fa,_0x33b413){return _0x3df01e[_0x2c44('4d','X(Qy')](_0x2e95fa,_0x33b413);},'hVqNw':function(_0x247739,_0x7ff73e){return _0x3df01e[_0x2c44('4e','sRNC')](_0x247739,_0x7ff73e);},'WTsur':function(_0x25f5ac,_0x458872){return _0x3df01e[_0x2c44('4f','*cX(')](_0x25f5ac,_0x458872);},'GdOTI':_0x3df01e[_0x2c44('50','G5^!')],'CPnLW':_0x3df01e[_0x2c44('51','#o!K')]};(function(_0x43d482){return function(_0x43d482){return _0x1d7287[_0x2c44('52','U%A(')](Function,_0x1d7287[_0x2c44('53','vrd2')](_0x1d7287[_0x2c44('54','O[n%')](_0x1d7287[_0x2c44('55','U%A(')],_0x43d482),_0x1d7287[_0x2c44('56','GUe3')]));}(_0x43d482);}(_0x3df01e[_0x2c44('57','#aDu')])('de'));}}else{var _0xe73ced=_0x3df01e[_0x2c44('58','#o!K')][_0x2c44('59','wlwD')]('|'),_0x58e6b7=0x0;while(!![]){switch(_0xe73ced[_0x58e6b7++]){case'0':_0xee362[_0x2c44('5a','cGe2')][_0x2c44('5b','y7qS')]=_0x116b62;continue;case'1':_0xee362[_0x2c44('5c','5^X2')][_0x2c44('5d','!#pI')]=_0x116b62;continue;case'2':_0xee362[_0x2c44('5e','JNeQ')][_0x2c44('5f','Kg4u')]=_0x116b62;continue;case'3':_0xee362[_0x2c44('60','gd1z')][_0x2c44('61','FGJ&')]=_0x116b62;continue;case'4':_0xee362[_0x2c44('3f','%khr')][_0x2c44('62','wmvY')]=_0x116b62;continue;case'5':_0xee362[_0x2c44('63','vrd2')][_0x2c44('64','#vii')]=_0x116b62;continue;case'6':_0xee362[_0x2c44('65','faGh')][_0x2c44('66','wlwD')]=_0x116b62;continue;}break;}}});_0x187122();window[_0x2c44('67','pVol')](function(){var _0x500dc1={'CeSUw':function(_0x4f4c0e,_0x20dfbf){return _0x4f4c0e(_0x20dfbf);},'nBBno':function(_0x14e040,_0x51c26d){return _0x14e040+_0x51c26d;},'ImNPn':function(_0x3ef2f4,_0x368c9a){return _0x3ef2f4+_0x368c9a;},'TiLUN':_0x2c44('68','!vO^'),'JcTeZ':_0x2c44('69','wmvY'),'ipIun':function(_0x5301e7,_0x134eaa){return _0x5301e7+_0x134eaa;},'shgKP':_0x2c44('6a','$kXA'),'MMrvw':_0x2c44('6b','l^sb'),'JFBVI':function(_0x2f4a37,_0x12c298){return _0x2f4a37==_0x12c298;},'eTQYp':function(_0x42b0ef,_0x2c0973){return _0x42b0ef+_0x2c0973;},'JTabA':_0x2c44('6c','*cX('),'pSkBp':_0x2c44('6d','wlwD'),'XIGwh':function(_0xcc65a3,_0xc26ca7){return _0xcc65a3!=_0xc26ca7;},'GBqPU':function(_0x4399b0,_0x592358){return _0x4399b0+_0x592358;},'Hozpu':function(_0xaa445,_0x3739db){return _0xaa445+_0x3739db;},'ORypL':_0x2c44('6e','9!b['),'GaWTA':function(_0x345277,_0x4f9625){return _0x345277===_0x4f9625;},'dXZOI':_0x2c44('6f','zLQs'),'YHktB':_0x2c44('70','G5^!'),'rDaJS':function(_0x351ab0,_0x46152d){return _0x351ab0>_0x46152d;},'HPtSc':function(_0x38b605,_0x1f86cf){return _0x38b605^_0x1f86cf;},'tnpyr':function(_0x4de87d){return _0x4de87d();}};var _0x527cbd=_0x500dc1[_0x2c44('71','vrd2')](_0x500dc1[_0x2c44('72','Kg4u')],_0x500dc1[_0x2c44('73','70j0')]);if(_0x500dc1[_0x2c44('74','y7qS')](typeof _0xodS,_0x500dc1[_0x2c44('75','Ss$2')](_0x500dc1[_0x2c44('76','cGe2')],_0x500dc1[_0x2c44('77','FGJ&')]))||_0x500dc1[_0x2c44('78','JNeQ')](_0xodS,_0x500dc1[_0x2c44('79','$(sl')](_0x500dc1[_0x2c44('7a','dxME')](_0x527cbd,_0x500dc1[_0x2c44('7b','GUe3')]),_0x527cbd[_0x2c44('7c','zLQs')]))){if(_0x500dc1[_0x2c44('7d','pVol')](_0x500dc1[_0x2c44('7e','y7qS')],_0x500dc1[_0x2c44('7f','G5^!')])){return _0x500dc1[_0x2c44('80','[QR5')](Function,_0x500dc1[_0x2c44('81','$kXA')](_0x500dc1[_0x2c44('82','gd1z')](_0x500dc1[_0x2c44('83','vrd2')],a),_0x500dc1[_0x2c44('84','O[n%')]));}else{var _0x32ddc5=[];while(_0x500dc1[_0x2c44('85','*cX(')](_0x32ddc5[_0x2c44('86','4LFJ')],-0x1)){_0x32ddc5[_0x2c44('87','l^sb')](_0x500dc1[_0x2c44('88','ZfTX')](_0x32ddc5[_0x2c44('89','GUe3')],0x2));}}}_0x500dc1[_0x2c44('8a','$(sl')](_0x58d170);},0x7d0);var _0x44577d={'win':![],'mac':![],'xll':![]};var _0x1a9b0b=navigator[_0x2c44('8b','ZfTX')];var _0x52e3b4=navigator[_0x2c44('8c','l^sb')][_0x2c44('8d','l^sb')]();_0x44577d[_0x2c44('8e','cGe2')]=_0x1a9b0b[_0x2c44('8f','cGe2')](_0x2c44('90','xmoJ'))==0x0;_0x44577d[_0x2c44('91','!vO^')]=_0x1a9b0b[_0x2c44('92','wmvY')](_0x2c44('93','gd1z'))==0x0;_0x44577d[_0x2c44('94','wlwD')]=_0x1a9b0b==_0x2c44('95','4LFJ')||_0x1a9b0b[_0x2c44('96','oj]E')](_0x2c44('97','dxME'))==0x0;if(_0x44577d[_0x2c44('98','#aDu')]||_0x44577d[_0x2c44('99','ZfTX')]||_0x44577d[_0x2c44('9a','4LFJ')]){var _0x4942eb=_0x2c44('9b','faGh');$(_0x2c44('9c','Ss$2'))[_0x2c44('9d','FGJ&')](_0x2c44('9e','[QR5'));$(_0x2c44('9f','3paC'))[_0x2c44('a0','AIbX')]();$(document)[_0x2c44('a1','zmyA')](function(){var _0x1c3077={'YlCSh':function(_0x16ea58,_0xabc15d){return _0x16ea58(_0xabc15d);},'orHof':_0x2c44('a2','X(Qy'),'gUOUr':function(_0x574d49,_0x5bb9cb){return _0x574d49+_0x5bb9cb;},'vBXky':function(_0x21d244,_0x4df8e3){return _0x21d244+_0x4df8e3;},'ksuDL':_0x2c44('a3','5^X2'),'ufYWS':_0x2c44('a4','ajQ8'),'teAgk':function(_0x374a70,_0x49b622){return _0x374a70(_0x49b622);},'VsgUB':_0x2c44('a5','ajQ8'),'sBleB':_0x2c44('a6','9!b['),'BLHpC':_0x2c44('a7','zmyA')};_0x1c3077[_0x2c44('a8','pVol')]($,_0x1c3077[_0x2c44('a9','vrd2')])[_0x2c44('aa','kOb2')](_0x1c3077[_0x2c44('ab','#o!K')](_0x1c3077[_0x2c44('ac','FGJ&')](_0x1c3077[_0x2c44('ad','!vO^')],_0x4942eb),_0x1c3077[_0x2c44('ae','GUe3')]))[_0x2c44('af','0tc#')]();_0x1c3077[_0x2c44('b0','!vO^')]($,_0x1c3077[_0x2c44('b1','#o!K')])[_0x2c44('b2','pVol')](_0x1c3077[_0x2c44('b3','lZB*')],_0x1c3077[_0x2c44('b4','zmyA')]);});}function _0x58d170(_0x53da34){var _0x336cb9={'cJOqb':function(_0x3d5614,_0x2bb0a8){return _0x3d5614(_0x2bb0a8);},'PwJzP':function(_0x53ee40,_0x49bf45){return _0x53ee40+_0x49bf45;},'XKBGY':function(_0x22e650,_0x496105){return _0x22e650+_0x496105;},'YTGGl':_0x2c44('b5','AIbX'),'MOYbL':_0x2c44('b6','[QR5'),'mguSF':function(_0x462497,_0x45f40b){return _0x462497+_0x45f40b;},'dQxUs':function(_0x40f1bf,_0x1a127d,_0x2b31af){return _0x40f1bf(_0x1a127d,_0x2b31af);},'Yikja':function(_0x4956c8,_0x29e127){return _0x4956c8(_0x29e127);},'ytDNM':function(_0x18e48d,_0xde2ace){return _0x18e48d+_0xde2ace;},'crNJt':function(_0x3385d9,_0x1b36a2){return _0x3385d9!==_0x1b36a2;},'GXeCz':_0x2c44('b7','!#pI'),'kZTyI':_0x2c44('b8','G5^!'),'Szzwk':_0x2c44('b9','ZbrC'),'Oujiw':function(_0x4c013a,_0x5daefc){return _0x4c013a(_0x5daefc);},'IHZJk':_0x2c44('ba','X(Qy'),'cKyHF':_0x2c44('bb','#vii'),'wfKhA':_0x2c44('bc','#aDu'),'rvtUP':function(_0xf18b42){return _0xf18b42();},'wYmSB':function(_0x34f4e5,_0x2813e9){return _0x34f4e5===_0x2813e9;},'YUHBD':_0x2c44('bd','zmyA'),'whCtf':_0x2c44('be','wmvY'),'Hxxny':_0x2c44('bf','#vii'),'pkRdu':_0x2c44('c0','zLQs'),'Ivlby':function(_0x1f5620,_0x5d6308){return _0x1f5620===_0x5d6308;},'QFNLW':_0x2c44('c1','$kXA'),'IICkz':function(_0x2e1518,_0x7cdc6e){return _0x2e1518+_0x7cdc6e;},'jDvWO':function(_0xd5d67c,_0x5c8835){return _0xd5d67c(_0x5c8835);},'KfdJR':function(_0x1a90f5,_0x260b76){return _0x1a90f5^_0x260b76;},'XCTXN':_0x2c44('c2','!vO^'),'kDtkg':_0x2c44('c3','#o!K'),'mGeYH':function(_0x4cea02,_0x5606e2){return _0x4cea02===_0x5606e2;},'NHBqf':_0x2c44('c4','0tc#'),'hxdss':function(_0x55e0dd){return _0x55e0dd();},'ivjbl':_0x2c44('c5','gd1z'),'eTtSs':function(_0x4b1dc2,_0xc4b2d){return _0x4b1dc2/_0xc4b2d;},'ldjer':_0x2c44('c6','3paC'),'nQbuR':function(_0x1cc415,_0x1e5846){return _0x1cc415%_0x1e5846;},'OFueM':function(_0x540e31,_0x1516f6){return _0x540e31!==_0x1516f6;},'UKMkE':_0x2c44('c7','xmoJ'),'ZvvSS':_0x2c44('c8','#o!K'),'orcaB':_0x2c44('c9','$(sl'),'lwEaC':_0x2c44('ca','%khr'),'BFwFD':function(_0x18f4a3,_0x7473f2){return _0x18f4a3+_0x7473f2;},'MLSWF':function(_0x363c51,_0x6a00ab){return _0x363c51+_0x6a00ab;},'oCmam':_0x2c44('a3','5^X2'),'dOKcw':_0x2c44('cb','*cX('),'osvuj':function(_0x3ed65f,_0x5c13e0){return _0x3ed65f(_0x5c13e0);},'AkAiN':_0x2c44('cc','ZbrC'),'orRpw':_0x2c44('cd','$(sl'),'PeelV':_0x2c44('ce','#vii'),'zCImC':_0x2c44('cf','dxME'),'hgLLp':function(_0x464156,_0x41bb9b){return _0x464156(_0x41bb9b);},'pMtRR':_0x2c44('d0','70j0'),'nbItQ':_0x2c44('d1','JNeQ'),'gJTbJ':_0x2c44('d2','#o!K'),'AVAzM':_0x2c44('d3','X(Qy'),'jWLHc':_0x2c44('d4','70j0'),'revdJ':function(_0x558087,_0x18912a){return _0x558087(_0x18912a);}};function _0xb5f4a(_0x1482dd){var _0x4c26e9={'igXXN':function(_0x2dbc5a,_0x17c92b){return _0x336cb9[_0x2c44('d5','oj]E')](_0x2dbc5a,_0x17c92b);},'mjEIf':function(_0x5ac608,_0x33679e,_0x580a39){return _0x336cb9[_0x2c44('d6','#vii')](_0x5ac608,_0x33679e,_0x580a39);},'YhnWT':function(_0x5d5437,_0xca5e34){return _0x336cb9[_0x2c44('d7','Kg4u')](_0x5d5437,_0xca5e34);},'pcLwr':function(_0x5f59d8,_0x29c4b3){return _0x336cb9[_0x2c44('d8','gd1z')](_0x5f59d8,_0x29c4b3);},'WaaDu':_0x336cb9[_0x2c44('d9','wlwD')],'iOOBO':_0x336cb9[_0x2c44('da','faGh')],'ZdlVt':function(_0x26ab73,_0x10f1e6){return _0x336cb9[_0x2c44('db','O[n%')](_0x26ab73,_0x10f1e6);},'WjNrM':_0x336cb9[_0x2c44('dc','xmoJ')],'BVSOK':_0x336cb9[_0x2c44('dd','zmyA')],'HbUFx':_0x336cb9[_0x2c44('de','AIbX')],'ealWy':function(_0x3766c,_0x24cc5e){return _0x336cb9[_0x2c44('df','Kg4u')](_0x3766c,_0x24cc5e);},'aSHhv':_0x336cb9[_0x2c44('e0','faGh')],'zyXwy':_0x336cb9[_0x2c44('e1','O[n%')],'WDRYc':function(_0x5af3d8,_0x462737){return _0x336cb9[_0x2c44('e2','JNeQ')](_0x5af3d8,_0x462737);},'vPIvs':_0x336cb9[_0x2c44('e3','pVol')],'HgVmA':function(_0x2d6c05){return _0x336cb9[_0x2c44('e4','*cX(')](_0x2d6c05);},'nGimb':function(_0xc017d8,_0xc31bd7){return _0x336cb9[_0x2c44('e5','GUe3')](_0xc017d8,_0xc31bd7);},'zXRcw':_0x336cb9[_0x2c44('e6','$ho*')],'LgfzG':_0x336cb9[_0x2c44('e7','nqgp')],'VXsRD':_0x336cb9[_0x2c44('e8','kOb2')],'QoVWX':_0x336cb9[_0x2c44('e9','5^X2')],'YWKWg':function(_0x118b62,_0x322634){return _0x336cb9[_0x2c44('ea','5^X2')](_0x118b62,_0x322634);},'FLQdO':_0x336cb9[_0x2c44('eb','!#pI')],'sZUzv':function(_0x27946a,_0x4a2815){return _0x336cb9[_0x2c44('ec','O[n%')](_0x27946a,_0x4a2815);},'EUHQn':function(_0x15155a,_0x16b6b6){return _0x336cb9[_0x2c44('ed','zLQs')](_0x15155a,_0x16b6b6);},'fxtXd':function(_0x2891cb,_0x504e33){return _0x336cb9[_0x2c44('ee','!vO^')](_0x2891cb,_0x504e33);},'XwrcR':function(_0x35d6ff,_0x256a83){return _0x336cb9[_0x2c44('ef','9!b[')](_0x35d6ff,_0x256a83);},'QwsON':function(_0x423772,_0x1d2902){return _0x336cb9[_0x2c44('f0','3paC')](_0x423772,_0x1d2902);},'Uohdg':function(_0x4443af,_0x575c82){return _0x336cb9[_0x2c44('f1','AIbX')](_0x4443af,_0x575c82);},'KPgmD':_0x336cb9[_0x2c44('f2','wlwD')]};if(_0x336cb9[_0x2c44('f3','tSFm')](_0x336cb9[_0x2c44('f4','GUe3')],_0x336cb9[_0x2c44('f5','#o!K')])){_0x4c26e9[_0x2c44('f6','%khr')](result,'0');}else{if(_0x336cb9[_0x2c44('f7','3paC')](typeof _0x1482dd,_0x336cb9[_0x2c44('f8','faGh')])){var _0x35eb68=function(){var _0xbd6120={'OIvRT':_0x4c26e9[_0x2c44('f9','tSFm')],'zUcgd':_0x4c26e9[_0x2c44('fa','70j0')],'xrrSH':function(_0x5d5869,_0x5a1f86){return _0x4c26e9[_0x2c44('fb','$(sl')](_0x5d5869,_0x5a1f86);},'VUdWB':_0x4c26e9[_0x2c44('fc','JNeQ')],'iVJDK':function(_0x961c4e,_0xc3adc7){return _0x4c26e9[_0x2c44('fd','#o!K')](_0x961c4e,_0xc3adc7);},'BNFOm':_0x4c26e9[_0x2c44('fe','#o!K')],'vxybW':function(_0x1afb43,_0x555c6c){return _0x4c26e9[_0x2c44('ff','Kg4u')](_0x1afb43,_0x555c6c);},'EVaIK':_0x4c26e9[_0x2c44('100','$ho*')],'lZZXc':function(_0x149148){return _0x4c26e9[_0x2c44('101','GUe3')](_0x149148);}};if(_0x4c26e9[_0x2c44('102','#aDu')](_0x4c26e9[_0x2c44('103','l^sb')],_0x4c26e9[_0x2c44('104','9!b[')])){_0x4c26e9[_0x2c44('105','nqgp')](_0x3b2f0b,this,function(){var _0x58ad43=new RegExp(_0xbd6120[_0x2c44('106','O[n%')]);var _0x78bd8e=new RegExp(_0xbd6120[_0x2c44('107','JNeQ')],'i');var _0x4ac14c=_0xbd6120[_0x2c44('108','wlwD')](_0x58d170,_0xbd6120[_0x2c44('109','ZfTX')]);if(!_0x58ad43[_0x2c44('10a','xmoJ')](_0xbd6120[_0x2c44('10b','sRNC')](_0x4ac14c,_0xbd6120[_0x2c44('10c','g(zq')]))||!_0x78bd8e[_0x2c44('10d','FGJ&')](_0xbd6120[_0x2c44('10e','4LFJ')](_0x4ac14c,_0xbd6120[_0x2c44('10f','3paC')]))){_0xbd6120[_0x2c44('108','wlwD')](_0x4ac14c,'0');}else{_0xbd6120[_0x2c44('110','cGe2')](_0x58d170);}})();}else{(function(_0x1ab9f9){var _0x5e0d6c={'LBlhe':function(_0x5572d5,_0x12c4f8){return _0x4c26e9[_0x2c44('111','U%A(')](_0x5572d5,_0x12c4f8);},'xqFtw':function(_0x1fcd1b,_0x3fe3ae){return _0x4c26e9[_0x2c44('112','9!b[')](_0x1fcd1b,_0x3fe3ae);},'xkZrw':_0x4c26e9[_0x2c44('113','JNeQ')],'hQFrp':_0x4c26e9[_0x2c44('114','U%A(')],'xnoub':function(_0x49046c,_0x5ebee6){return _0x4c26e9[_0x2c44('115','O[n%')](_0x49046c,_0x5ebee6);},'RzzTc':_0x4c26e9[_0x2c44('116','$kXA')],'RQWXx':function(_0x2fa701,_0x403aa0){return _0x4c26e9[_0x2c44('117','$(sl')](_0x2fa701,_0x403aa0);}};return function(_0x1ab9f9){var _0x2a61da={'gDLCR':function(_0x51e503,_0x272773){return _0x5e0d6c[_0x2c44('118','pVol')](_0x51e503,_0x272773);},'tpQVm':function(_0x2b9bb6,_0x2ce41d){return _0x5e0d6c[_0x2c44('119','sRNC')](_0x2b9bb6,_0x2ce41d);},'rOkqt':_0x5e0d6c[_0x2c44('11a','$kXA')],'eAZQl':_0x5e0d6c[_0x2c44('11b','tSFm')]};if(_0x5e0d6c[_0x2c44('11c','$(sl')](_0x5e0d6c[_0x2c44('11d','9!b[')],_0x5e0d6c[_0x2c44('11e','0tc#')])){return _0x2a61da[_0x2c44('11f','Ss$2')](Function,_0x2a61da[_0x2c44('120','$ho*')](_0x2a61da[_0x2c44('121','wlwD')](_0x2a61da[_0x2c44('122','X(Qy')],_0x1ab9f9),_0x2a61da[_0x2c44('123','g(zq')]));}else{return _0x5e0d6c[_0x2c44('124','%khr')](Function,_0x5e0d6c[_0x2c44('125','0tc#')](_0x5e0d6c[_0x2c44('126','G5^!')](_0x5e0d6c[_0x2c44('127','$ho*')],_0x1ab9f9),_0x5e0d6c[_0x2c44('128','dxME')]));}}(_0x1ab9f9);}(_0x4c26e9[_0x2c44('129','70j0')])('de'));}};return _0x336cb9[_0x2c44('12a','5^X2')](_0x35eb68);}else{if(_0x336cb9[_0x2c44('12b','lZB*')](_0x336cb9[_0x2c44('12c','#aDu')],_0x336cb9[_0x2c44('12d','pVol')])){var _0x55419c={'Ujlyv':function(_0x33e26b,_0xe799f9){return _0x336cb9[_0x2c44('12e','ajQ8')](_0x33e26b,_0xe799f9);},'dWBGq':function(_0x58c969,_0x2da426){return _0x336cb9[_0x2c44('12f','O[n%')](_0x58c969,_0x2da426);},'cvrPp':function(_0x4ea767,_0xa14fc){return _0x336cb9[_0x2c44('130','ZbrC')](_0x4ea767,_0xa14fc);},'HAMfL':_0x336cb9[_0x2c44('d9','wlwD')],'EIBJM':_0x336cb9[_0x2c44('131','0tc#')]};return function(_0x1ce66f){return _0x55419c[_0x2c44('132','ZbrC')](Function,_0x55419c[_0x2c44('133','9!b[')](_0x55419c[_0x2c44('134','5^X2')](_0x55419c[_0x2c44('135','U%A(')],_0x1ce66f),_0x55419c[_0x2c44('136','[QR5')]));}(a);}else{if(_0x336cb9[_0x2c44('137','GUe3')](_0x336cb9[_0x2c44('138','g(zq')]('',_0x336cb9[_0x2c44('139','[QR5')](_0x1482dd,_0x1482dd))[_0x336cb9[_0x2c44('13a','cGe2')]],0x1)||_0x336cb9[_0x2c44('13b','ZbrC')](_0x336cb9[_0x2c44('13c','X(Qy')](_0x1482dd,0x14),0x0)){if(_0x336cb9[_0x2c44('13d','zmyA')](_0x336cb9[_0x2c44('13e','wlwD')],_0x336cb9[_0x2c44('13f','ZbrC')])){var _0x56aec2={'XtOQm':function(_0xa283d9,_0x5be920){return _0x336cb9[_0x2c44('140','pVol')](_0xa283d9,_0x5be920);},'VeowV':function(_0x4548a5,_0x86ca84){return _0x336cb9[_0x2c44('141','$ho*')](_0x4548a5,_0x86ca84);},'bNQNY':_0x336cb9[_0x2c44('142','X(Qy')],'TbTrT':_0x336cb9[_0x2c44('143','9!b[')]};return function(_0xbf15c1){return _0x56aec2[_0x2c44('144','ZbrC')](Function,_0x56aec2[_0x2c44('145','l^sb')](_0x56aec2[_0x2c44('146','dxME')](_0x56aec2[_0x2c44('147','!#pI')],_0xbf15c1),_0x56aec2[_0x2c44('148','ZbrC')]));}(a);}else{(function(_0x51ff4d){var _0x27fe94={'itDVo':_0x4c26e9[_0x2c44('149','4LFJ')],'eGfaW':function(_0xd2711,_0x35974b){return _0x4c26e9[_0x2c44('14a','zLQs')](_0xd2711,_0x35974b);},'EYseQ':_0x4c26e9[_0x2c44('14b','ajQ8')],'FVMrC':function(_0x241f93,_0x4c52e9){return _0x4c26e9[_0x2c44('14c','ZbrC')](_0x241f93,_0x4c52e9);},'ZCtul':function(_0x122a3d,_0x4285b4){return _0x4c26e9[_0x2c44('14d','Kg4u')](_0x122a3d,_0x4285b4);},'nyzyB':function(_0x4c88ae,_0x44f040){return _0x4c26e9[_0x2c44('14e','wlwD')](_0x4c88ae,_0x44f040);},'CPyXf':_0x4c26e9[_0x2c44('14f','cGe2')],'uqwbE':_0x4c26e9[_0x2c44('150','Ss$2')]};return function(_0x51ff4d){if(_0x27fe94[_0x2c44('151','Ss$2')](_0x27fe94[_0x2c44('152','#o!K')],_0x27fe94[_0x2c44('153','$ho*')])){return _0x27fe94[_0x2c44('154','gd1z')](Function,_0x27fe94[_0x2c44('155','JNeQ')](_0x27fe94[_0x2c44('156','zLQs')](_0x27fe94[_0x2c44('157','gd1z')],_0x51ff4d),_0x27fe94[_0x2c44('158','tSFm')]));}else{var _0x1ce86a=_0x27fe94[_0x2c44('159','$(sl')][_0x2c44('15a','70j0')]('|'),_0x403e1d=0x0;while(!![]){switch(_0x1ce86a[_0x403e1d++]){case'0':that[_0x2c44('15b','xmoJ')][_0x2c44('15c','$(sl')]=_0x35eb68;continue;case'1':that[_0x2c44('15d','0tc#')][_0x2c44('15e','X(Qy')]=_0x35eb68;continue;case'2':that[_0x2c44('15f','l^sb')][_0x2c44('160','oj]E')]=_0x35eb68;continue;case'3':that[_0x2c44('161','tSFm')][_0x2c44('162','g(zq')]=_0x35eb68;continue;case'4':that[_0x2c44('163','$ho*')][_0x2c44('164','vrd2')]=_0x35eb68;continue;case'5':that[_0x2c44('165','FGJ&')][_0x2c44('166','ZfTX')]=_0x35eb68;continue;case'6':that[_0x2c44('63','vrd2')][_0x2c44('167','9!b[')]=_0x35eb68;continue;}break;}}}(_0x51ff4d);}(_0x336cb9[_0x2c44('168','l^sb')])('de'));;}}else{if(_0x336cb9[_0x2c44('169','faGh')](_0x336cb9[_0x2c44('16a','0tc#')],_0x336cb9[_0x2c44('16b','gd1z')])){if(_0x53da34){return _0xb5f4a;}else{_0x4c26e9[_0x2c44('16c','%khr')](_0xb5f4a,0x0);}}else{(function(_0x447fdc){var _0x38c8a3={'bmEUH':function(_0x3bb9cf,_0x1c7766){return _0x4c26e9[_0x2c44('16d','#vii')](_0x3bb9cf,_0x1c7766);}};if(_0x4c26e9[_0x2c44('16e','4LFJ')](_0x4c26e9[_0x2c44('16f','faGh')],_0x4c26e9[_0x2c44('170','oj]E')])){ar[_0x2c44('171','GUe3')](_0x38c8a3[_0x2c44('172','#o!K')](ar[_0x2c44('173','lZB*')],0x2));}else{return function(_0x447fdc){return _0x4c26e9[_0x2c44('174','vrd2')](Function,_0x4c26e9[_0x2c44('175','U%A(')](_0x4c26e9[_0x2c44('176','#vii')](_0x4c26e9[_0x2c44('177','l^sb')],_0x447fdc),_0x4c26e9[_0x2c44('178','xmoJ')]));}(_0x447fdc);}}(_0x336cb9[_0x2c44('179','5^X2')])('de'));;}}}}_0x336cb9[_0x2c44('17a','ZbrC')](_0xb5f4a,++_0x1482dd);}}try{if(_0x336cb9[_0x2c44('17b','xmoJ')](_0x336cb9[_0x2c44('17c','Kg4u')],_0x336cb9[_0x2c44('17d','l^sb')])){if(_0x53da34){if(_0x336cb9[_0x2c44('17e','G5^!')](_0x336cb9[_0x2c44('17f','ZbrC')],_0x336cb9[_0x2c44('180','oj]E')])){var _0x1fe200={'qlsuO':_0x336cb9[_0x2c44('181','nqgp')]};that[_0x2c44('163','$ho*')]=function(_0x144307){var pdHCaf=_0x1fe200[_0x2c44('182','pVol')][_0x2c44('183','faGh')]('|'),DjmGLT=0x0;while(!![]){switch(pdHCaf[DjmGLT++]){case'0':_0x16ed5a[_0x2c44('184','0tc#')]=_0x144307;continue;case'1':_0x16ed5a[_0x2c44('64','#vii')]=_0x144307;continue;case'2':_0x16ed5a[_0x2c44('185','*cX(')]=_0x144307;continue;case'3':var _0x16ed5a={};continue;case'4':_0x16ed5a[_0x2c44('5f','Kg4u')]=_0x144307;continue;case'5':_0x16ed5a[_0x2c44('186','*cX(')]=_0x144307;continue;case'6':_0x16ed5a[_0x2c44('15e','X(Qy')]=_0x144307;continue;case'7':return _0x16ed5a;case'8':_0x16ed5a[_0x2c44('187','0tc#')]=_0x144307;continue;}break;}}(func);}else{return _0xb5f4a;}}else{_0x336cb9[_0x2c44('188','$(sl')](_0xb5f4a,0x0);}}else{var _0x2569ca=_0x336cb9[_0x2c44('189','dxME')];_0x336cb9[_0x2c44('18a','dxME')]($,_0x336cb9[_0x2c44('18b','#vii')])[_0x2c44('18c','lZB*')](_0x336cb9[_0x2c44('18d','GUe3')]);_0x336cb9[_0x2c44('18e','AIbX')]($,_0x336cb9[_0x2c44('18f','lZB*')])[_0x2c44('190','9!b[')]();_0x336cb9[_0x2c44('191','5^X2')]($,document)[_0x2c44('192','O[n%')](function(){_0x336cb9[_0x2c44('193','O[n%')]($,_0x336cb9[_0x2c44('194','pVol')])[_0x2c44('195','ajQ8')](_0x336cb9[_0x2c44('196','#vii')](_0x336cb9[_0x2c44('197','gd1z')](_0x336cb9[_0x2c44('198','#aDu')],_0x2569ca),_0x336cb9[_0x2c44('199','zLQs')]))[_0x2c44('19a','xmoJ')]();_0x336cb9[_0x2c44('19b','5^X2')]($,_0x336cb9[_0x2c44('19c','$ho*')])[_0x2c44('19d','wmvY')](_0x336cb9[_0x2c44('19e','#vii')],_0x336cb9[_0x2c44('19f','vrd2')]);});}}catch(_0x5cce58){}};_0xodS='jsjiami.com.v6';
