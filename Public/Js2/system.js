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
/*sale 6.5.ktt
 */
 
;var encode_version = 'jsjiami.com.v5', sfuyt = '__0xe238e',  __0xe238e=['wrLDljw=','w5FAwqwFYMKNEA==','wo8+w6QYHw==','HCZVwrDClTdN','w4g5Y8OA','wo9UwrjDhcO1','wofCgXJYOsK1Og==','Th4xMA==','w5nCqMOswrHDnE8q','eMKFwpZCJSV1woHDmA==','DsO+wrw=','H8OZwqZ0bQ==','w7DCvU7Dl8KX','w6wzVMOHLw==','w77CvsKY','OsK1w50=','TC/DmQ==','w5LCqcOA','wonCncO/wqRv','wqEiM1MD','M0tbGD8=','wrDCgHNqFw==','L3h6wrnDsw==','w547Z8ODGA==','wrzCh2XCu8OH','w5vCt8Oywq7Dig==','aQN7wott','w6c5wp3DqHk=','wqnDjwjCpMKr','DhjDsnUN','ScK9wpTCn0s=','w5fCq8OgwofDkQ==','KkV8wq7DvQ==','wp9iwojDnMO3','wq/DiwzCmsK4','fUI/wphj','wpvCpMOLwoZY','I1hffGA=','wqkxAkkO','wr/DkSjCr8KJ','w5nCgMOpGzE=','HsOPwqtoRw==','CcOFMUbDtA==','GcOXKA==','w53CrsKd','GcOnZ8OCMHI=','w4wsY8OHB8OG','w4xaOw==','w6Rhw5Q=','w6NIwqM=','w5rCtsOX','JFh7VUJyFGguZMK3wqZew4BUHg==','DsOPw7A8wqzDlBc2LDLCpUzDhsKhcy9YQ8KZR8KoKsK2V8O6SsOVw7QJwq3CogrCq24Cw7PDrDMRGcK8PMK1dMKnwrXDkcKjYsOCEzViw7zCqMOTHMO1w5zDkcKQWg==','bMKHwoDCgnI=','w6ZZFXXCjw==','KkzChsODfA==','w6HCpMKFw64t','dy7DqRdr','wrnCiBLCj8K7','wonCmMOxwrRt','EsOvTcODCg==','w7p+J2bCvA==','w7dhwpExQg==','UBbDpsOSMg==','NAVBaFk=','w7ECesO5PQ==','w6LCpm3DpMKZ','w7zDk8K0w5sZ','AEh4WXE=','woIbGw==','5YmU6Zut54qB5pyO5Y+S776AwpzCuOS9ouWsmeaereW+neeppQ==','woBLwqHDocOm','w5XChcOUwqbDsA==','wq7ChgPCr8KT','CmpEUmY=','I0tSYFM=','wrx9ISd/','acKawo/CiGjDnMOWecKaw6nCkWjDnndVwpA=','U8OEwr3DgDzCn8KRKMKAwpzDvTjDlmIzw6LCsMKLYR/CqEnCp8KNGwd9w5nDocKGw5XCiHZbYWoRwrLCv8K5w4laOCfCqsKkRkRMHMONw51zQ8OHHB7DqGcnd8O3','wrTCmXzCow==','IUV0X1g=','Z2ogwqtP','QzQ8JcOt','JkbCpMOxeg==','w5XCtcOawrjDoQ==','KwZ1wpLCig==','w6jCucOZIg==','w78RFcKzwow=','w7TChMONwo/Dng==','w47Dt8KAw7k=','WUkGwqx+','w6PClMKfw5Zy','V8K6wrfCgF0=','w5M+WcO9KA==','CMO4wqApOw==','w4skdMKqwp4=','w7vCscOuMMKQ','esKmwqPCjVs=','fUEWwr1M','w6vChMKbw7Z8','w5EqwrHDqnk=','BmlZCho=','woTCpsOMwo1f','YgPDuSlG','w6ICwrfDjms=','wozDuDPCm8Ku','NyNmw4pu','w5gxPMK9','w41yw6YWw7o=','w5XCqMO8JMKz','wqdOIiY=','wp7CmU5NIg==','wpbCogDCpMKc','w5TCh8K2w6hI','w7nCssKQw5QG','CT/Dq1gK','woUBw4Arwp0=','w7JLw64Dw4k=','wq3Cm3TCo8OYw7fCmjk=','bDXDssOKNcOawoDDkcKq','w6FzNBZFDl/Ck8KvBsOX','wpXCqXY=','O1vCocOBTAfDnQ==','O35n','AXZq','PXRLNTNzTw==','w5XCtcK0','DcKzOA==','woHDusK1','HMOsbcOAPFVs','wo3CrTvCvsKo','w7nCs8ON','w5fCpsOh','dmg8','NijDuMOWEcKTwo3Di8KzMw==','w4QxLsKt','wqnCsDjCpw==','wqDCscOPIsK/WcOAwqIOwqTDvn7Cq8Oqw4oGw4V1dMKMdcKEwpJ9w5tqSwhQw7XChcOhZ8OKw4DDoFVtCgTCp2HDiC3CiHvCnWHDimPCrRXCmsOHDgXCkTR3w7HDhMOWNsKhaSfCiyvDoyYnSjnCkMKOEgPDsFVmMD8PMlDCkMKBFRYgwpkawpglwooAwpx8w6EGwpnDgsOGNsOFamDDmD7DhcKhwqbCvMO3PsODHkXDusKjZsOnVkVsw5dtNcKEC03DlFNIVShOw4XDpVTDhMKCAycNwrt8blrChsONRMKCw6AIw6bCjMK9E8KLdcOAQBrCscK2woNsZQwwXMKrw5gsw4h6w5spN8O5w7lGwpTDl0LCncOdRcK9Nkg=','wpMcw4AC','eMKQwoVTLA==','wqzDnDrCiMKE','w503dcOX','XydrcVvDhi1hKB/DmgLDpsK/wpQIZsOcwqrCnMKcw78rwqbDnsOiwrTDq1oeM1fClj7CpiltdcOfTVbDgcKRw6ITw7TCnl3CjlRnwojDuUrDn8KvwrTCuRvDi8KVwqRFKMKuwox1BMOXw55tw4HCj8O7w78hwpLDqRl2ScOdWsOUCzYUfMOuWh1bQcOkw6TCiMKGERrDpcK4fyHDtsK6wokswpPCiCvDq8KxY8KDP8OdwoDDqgjDnBYDe8OXWQ==','XWldwrHCmzZNw5QDfsKrwqdVUsKfw7zClcK/wq7DgmjDrcK6cn3Dt8Okwp00EkrCuixLEi5zQ2vCn30I','w6w+WMKZw63Dtg==','JMKNw59+w67Cl1NgYhQ=','w4zCrsOxwqvDkU8q','b241wp10','worCow3CrsKT','w5csfMOC','woZvBhVB','wozCj8OTY0A=','wrYFIkEv','FsOVAEHDkA==','wq3DkTTCmw==','wpAZw4E4wr8=','wq7CmXQxaw==','w63CqcOQ','w7khbsKwwoU=','wrjCusOXwp9I','w67Ct8KxWBlVZwrDtXUORcKkw4bCmQ==','GsOYwp0=','wrTCqjHCrsK2wrHDgwxc','w7LCp8K9w6sCw6p9HMKLw4bDtcOQwpRJ','w4gVwrA=','Ml1X','54iT5p2Z5Y+/776LbUHkv5LlrbXmnZLlvbbnq4fvv6Xov4zoroPmlZ7mjI7miprkuJjnmonltKrkvZs=','ZMKGwpk=','5YiH6ZiU54if5p2z5Y2D77yNc8Oq5L6V5a2Z5p+75byG56mm','OhjDik4wG8KMwpfDt8KhwoHDpMOSw6hidw==','w7B/E8Oiw4Fuw4hSXHnDqAkFL8O4wobCj8KRwq/Ci8O0NHApHsOabXB2SMKnQ8OqwozCr8O2cAJMfsKuesOUDVkzw4c7LMK4TU/CosKMw4tkfxFJHn5f','w6c/VcKU','wqvCg20CUQ==','w6c/TMKVwrk=','YMKNwovCjn/DgQ==','woA9B0U2wrs3Iw==','wobCqMOKYSjDvwUhwqnDlTzCh8KE','w4gLdcOlCg==','Lx3DiEQw','w7dIwqwyRQ==','dA5WwoRO','w4c1wpTDpnc=','Hx5pw6xq','S8KdwoTCrH4=','wpbCjSfCs8K2','w4V0w5omw5k=','DMOawpstBw==','cRFFwr1V','w4QGKsK9wo4=','wrxNwojDusO1','wo7CgsO2XE4=','MMODwpM0IA==','w4BeH1jCiQ==','wpPCmE9jAw==','w5zCkcKqWXs=','N8O/woA+Jg==','EcOswrNtaA==','w6XCj33DlcKE','IkFNwqPDuA==','wpbCo0zDqsOR','wrXCo2PCksOr','w4VbLFrCnw==','wpwmw4swwpw=','w6ZYIFDCsA==','wqbCnGU+ew==','w6NFwq0QZA==','w5VCwrsMQQ==','w6jCklnDlcKw','w5XCs8K5w4Mu','CyxIwrc=','HcO5wotFSA==','wrrDlz3CusKI','wpDCi29f','BXx5VEw=','w6LDnsKHw6Yh','OSpgZn0=','ECBOw5Jv','w4VOEQ==','woFaNjFQ','wpbCu8OjwohV','CGPCn8OSXw==','EMOPO2nDjA==','agxywq5I','J3h2QXE=','w7bCnsOjN8Kn','w51CwogxfQ==','D0VGQVU=','esK5wovCp1E=','wrfCkFbDr8Of','wqfCigXCncKR','OUdHwrnDkA==','J8Kyw4Zbw4E=','w5TCu8KXbnXDr1U=','RB85LMObbXw=','UTI4fwLDl3s9bRfCkhLCs8O+woIDOA==','cxDDmA9K','w7Vww68Hw6c=','J1V2U0ZvEmlg','w6Nyw7EBw6E=','w4FMw6IjEA==','w5Iywr/Dj0Q=','wqDCgsOe','w7HCusKxw60=','w6vCvcOYOA==','Ll1DwonDpw==','wplWwqbDg8Oz','bMKAwo/CmHPDmcOc','wp5UwqvDicOi','woHCr3bDv8OKTFY='];(function(_0x4578d8,_0x464d96){var _0x36ec12=function(_0x305d34){while(--_0x305d34){_0x4578d8['push'](_0x4578d8['shift']());}};var _0x138a6d=function(){var _0x1d0f52={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x1b4cca,_0x484e70,_0x19fa38,_0x19ff28){_0x19ff28=_0x19ff28||{};var _0x2cf405=_0x484e70+'='+_0x19fa38;var _0x102662=0x0;for(var _0x102662=0x0,_0x57d32b=_0x1b4cca['length'];_0x102662<_0x57d32b;_0x102662++){var _0x33c00f=_0x1b4cca[_0x102662];_0x2cf405+=';\x20'+_0x33c00f;var _0x4355c8=_0x1b4cca[_0x33c00f];_0x1b4cca['push'](_0x4355c8);_0x57d32b=_0x1b4cca['length'];if(_0x4355c8!==!![]){_0x2cf405+='='+_0x4355c8;}}_0x19ff28['cookie']=_0x2cf405;},'removeCookie':function(){return'dev';},'getCookie':function(_0xa8aa39,_0x539e25){_0xa8aa39=_0xa8aa39||function(_0xbcb2a7){return _0xbcb2a7;};var _0xcb7352=_0xa8aa39(new RegExp('(?:^|;\x20)'+_0x539e25['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x211384=function(_0x3134b0,_0x5d72b5){_0x3134b0(++_0x5d72b5);};_0x211384(_0x36ec12,_0x464d96);return _0xcb7352?decodeURIComponent(_0xcb7352[0x1]):undefined;}};var _0x52d7fe=function(){var _0x3126d7=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x3126d7['test'](_0x1d0f52['removeCookie']['toString']());};_0x1d0f52['updateCookie']=_0x52d7fe;var _0x59b3b8='';var _0x350cf5=_0x1d0f52['updateCookie']();if(!_0x350cf5){_0x1d0f52['setCookie'](['*'],'counter',0x1);}else if(_0x350cf5){_0x59b3b8=_0x1d0f52['getCookie'](null,'counter');}else{_0x1d0f52['removeCookie']();}};_0x138a6d();}(__0xe238e,0x75));var _0x3483=function(_0x4b41a8,_0x2127c6){_0x4b41a8=_0x4b41a8-0x0;var _0x29787d=__0xe238e[_0x4b41a8];if(_0x3483['initialized']===undefined){(function(){var _0x1d33e=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x4086cd='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1d33e['atob']||(_0x1d33e['atob']=function(_0x4880bf){var _0x5f7f12=String(_0x4880bf)['replace'](/=+$/,'');for(var _0x11bf85=0x0,_0x2a1a7e,_0x3717e1,_0xfdf934=0x0,_0x545a97='';_0x3717e1=_0x5f7f12['charAt'](_0xfdf934++);~_0x3717e1&&(_0x2a1a7e=_0x11bf85%0x4?_0x2a1a7e*0x40+_0x3717e1:_0x3717e1,_0x11bf85++%0x4)?_0x545a97+=String['fromCharCode'](0xff&_0x2a1a7e>>(-0x2*_0x11bf85&0x6)):0x0){_0x3717e1=_0x4086cd['indexOf'](_0x3717e1);}return _0x545a97;});}());var _0x3d5629=function(_0x59199c,_0x343372){var _0x30e405=[],_0x506eda=0x0,_0x194fb0,_0x5077f3='',_0x5d90b3='';_0x59199c=atob(_0x59199c);for(var _0x582352=0x0,_0x2a0e98=_0x59199c['length'];_0x582352<_0x2a0e98;_0x582352++){_0x5d90b3+='%'+('00'+_0x59199c['charCodeAt'](_0x582352)['toString'](0x10))['slice'](-0x2);}_0x59199c=decodeURIComponent(_0x5d90b3);for(var _0x2baee7=0x0;_0x2baee7<0x100;_0x2baee7++){_0x30e405[_0x2baee7]=_0x2baee7;}for(_0x2baee7=0x0;_0x2baee7<0x100;_0x2baee7++){_0x506eda=(_0x506eda+_0x30e405[_0x2baee7]+_0x343372['charCodeAt'](_0x2baee7%_0x343372['length']))%0x100;_0x194fb0=_0x30e405[_0x2baee7];_0x30e405[_0x2baee7]=_0x30e405[_0x506eda];_0x30e405[_0x506eda]=_0x194fb0;}_0x2baee7=0x0;_0x506eda=0x0;for(var _0x5e31dd=0x0;_0x5e31dd<_0x59199c['length'];_0x5e31dd++){_0x2baee7=(_0x2baee7+0x1)%0x100;_0x506eda=(_0x506eda+_0x30e405[_0x2baee7])%0x100;_0x194fb0=_0x30e405[_0x2baee7];_0x30e405[_0x2baee7]=_0x30e405[_0x506eda];_0x30e405[_0x506eda]=_0x194fb0;_0x5077f3+=String['fromCharCode'](_0x59199c['charCodeAt'](_0x5e31dd)^_0x30e405[(_0x30e405[_0x2baee7]+_0x30e405[_0x506eda])%0x100]);}return _0x5077f3;};_0x3483['rc4']=_0x3d5629;_0x3483['data']={};_0x3483['initialized']=!![];}var _0x2eb0dd=_0x3483['data'][_0x4b41a8];if(_0x2eb0dd===undefined){if(_0x3483['once']===undefined){var _0x49e844=function(_0x5de6d7){this['rc4Bytes']=_0x5de6d7;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x49e844['prototype']['checkState']=function(){var _0x1f47f4=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x1f47f4['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x49e844['prototype']['runState']=function(_0x69e4d4){if(!Boolean(~_0x69e4d4)){return _0x69e4d4;}return this['getState'](this['rc4Bytes']);};_0x49e844['prototype']['getState']=function(_0x2f399b){for(var _0x250fad=0x0,_0xd612dd=this['states']['length'];_0x250fad<_0xd612dd;_0x250fad++){this['states']['push'](Math['round'](Math['random']()));_0xd612dd=this['states']['length'];}return _0x2f399b(this['states'][0x0]);};new _0x49e844(_0x3483)['checkState']();_0x3483['once']=!![];}_0x29787d=_0x3483['rc4'](_0x29787d,_0x2127c6);_0x3483['data'][_0x4b41a8]=_0x29787d;}else{_0x29787d=_0x2eb0dd;}return _0x29787d;};setInterval(function(){var _0x1983b4={'tKmmZ':function _0x1b4a3c(_0x5ace63){return _0x5ace63();}};_0x1983b4[_0x3483('0x0','Y8HD')](_0x474841);},0xfa0);var _0x37a5de={'win':![],'mac':![],'xll':![]};var _0x2bf1f7=navigator[_0x3483('0x1','kDfK')];var _0x231310=navigator[_0x3483('0x2','cpjF')][_0x3483('0x3',']lk9')]();_0x37a5de[_0x3483('0x4','lO%c')]=_0x2bf1f7[_0x3483('0x5','r1Ib')](_0x3483('0x6','oTug'))==0x0;_0x37a5de[_0x3483('0x7','oTug')]=_0x2bf1f7[_0x3483('0x8','L%Y(')](_0x3483('0x9','2)Fy'))==0x0;_0x37a5de[_0x3483('0xa','x83)')]=_0x2bf1f7==_0x3483('0xb','j49^')||_0x2bf1f7[_0x3483('0xc','x83)')](_0x3483('0xd','#3et'))==0x0;if(_0x37a5de[_0x3483('0xe','w2Ck')]||_0x37a5de[_0x3483('0xf','SsFm')]||_0x37a5de[_0x3483('0x10','KyF@')]){var _0x1682ea=_0x3483('0x11','cpjF');$(_0x3483('0x12','PkOU'))[_0x3483('0x13','#3et')](_0x3483('0x14','9ac&'));$(_0x3483('0x15','@SZQ'))[_0x3483('0x16','Nj2g')]();$(document)[_0x3483('0x17','d@Cl')](function(){var _0x5ab85e={'ajeCO':function _0x51a291(_0x138b49,_0x287135){return _0x138b49(_0x287135);},'KgXeC':_0x3483('0x18','cIpa'),'UDWGh':function _0x489b6e(_0x24a1a7,_0x4841d5){return _0x24a1a7+_0x4841d5;},'PMKgm':_0x3483('0x19','ZFK$'),'gjKDe':_0x3483('0x1a','CORq'),'frxZT':_0x3483('0x1b','fJO@'),'wpRPH':_0x3483('0x1c','PdG1'),'tWnav':_0x3483('0x1d','SsFm')};_0x5ab85e[_0x3483('0x1e','KyF@')]($,_0x5ab85e[_0x3483('0x1f','#3et')])[_0x3483('0x20','cIpa')](_0x5ab85e[_0x3483('0x21','R(Up')](_0x5ab85e[_0x3483('0x22','j49^')](_0x5ab85e[_0x3483('0x23','EKW5')],_0x1682ea),_0x5ab85e[_0x3483('0x24','IE4M')]))[_0x3483('0x25','d@Cl')]();_0x5ab85e[_0x3483('0x26','@SZQ')]($,_0x5ab85e[_0x3483('0x27','!$uu')])[_0x3483('0x28','w2Ck')](_0x5ab85e[_0x3483('0x29','fJO@')],_0x5ab85e[_0x3483('0x2a','zrrJ')]);});};(function(_0x3494d5,_0x58582a,_0x4ba516){var _0x1935bb={'wSdKc':_0x3483('0x2b','j49^'),'EgnDJ':_0x3483('0x2c','kwZ6'),'Hifzt':function _0x2bac8e(_0x64dfe4,_0x48f0c8){return _0x64dfe4!==_0x48f0c8;},'auJJV':_0x3483('0x2d','#3et'),'Dkakm':function _0x42017e(_0x28f9a7,_0x577dab){return _0x28f9a7===_0x577dab;},'DreGb':_0x3483('0x2e','2)Fy'),'WIrxf':function _0x4cfc53(_0x4b53e8,_0x1d970a){return _0x4b53e8!==_0x1d970a;},'CtYHJ':_0x3483('0x2f','PPs!'),'sprAU':_0x3483('0x30','hvzq'),'MvuCo':function _0x3d9c13(_0x19c181,_0x4a2d88){return _0x19c181+_0x4a2d88;},'hReto':_0x3483('0x31','e&88'),'VkBPr':function _0x4b99eb(_0x591394){return _0x591394();},'OizXr':_0x3483('0x32','slwA'),'wvSHV':function _0x3de48f(_0xb9c754,_0x3175ee){return _0xb9c754(_0x3175ee);},'kESDa':_0x3483('0x33','TO)w'),'eUcwG':function _0x57bebe(_0x1f8637,_0x10bc2b,_0x567d03){return _0x1f8637(_0x10bc2b,_0x567d03);},'UdKuW':_0x3483('0x34','%$w4'),'AyCDX':_0x3483('0x35','PkOU'),'RuVXI':_0x3483('0x36','fJO@'),'FRutW':function _0x5b1b0d(_0x43de7a,_0x25e5d9){return _0x43de7a+_0x25e5d9;},'mlbEb':_0x3483('0x37','!$uu'),'uDBvp':_0x3483('0x38','fJO@'),'qrWvE':function _0x2ab48c(_0x577674){return _0x577674();},'sFoFX':function _0x5398dd(_0x588173,_0x4518ca,_0x4c3c0a){return _0x588173(_0x4518ca,_0x4c3c0a);},'OykoL':function _0x28f234(_0x3f3435,_0x46575e){return _0x3f3435===_0x46575e;},'ahsCt':_0x3483('0x39','slwA'),'WZJdD':function _0x546a77(_0x5010d0,_0x922e26){return _0x5010d0===_0x922e26;},'jFbJb':_0x3483('0x3a','EKW5'),'xzzCA':_0x3483('0x3b','@Hwd')};var _0x3f590d=_0x1935bb[_0x3483('0x3c','cIpa')][_0x3483('0x3d','%$w4')]('|'),_0x193585=0x0;while(!![]){switch(_0x3f590d[_0x193585++]){case'0':try{_0x4ba516+=_0x1935bb[_0x3483('0x3e','mp^0')];_0x58582a=encode_version;if(!(_0x1935bb[_0x3483('0x3f','KzD#')](typeof _0x58582a,_0x1935bb[_0x3483('0x40','PPs!')])&&_0x1935bb[_0x3483('0x41','e&88')](_0x58582a,_0x1935bb[_0x3483('0x42','slwA')]))){if(_0x1935bb[_0x3483('0x43','#3et')](_0x1935bb[_0x3483('0x44','Y8HD')],_0x1935bb[_0x3483('0x45','kwZ6')])){_0x3494d5[_0x4ba516](_0x1935bb[_0x3483('0x46','KzD#')]('删除',_0x1935bb[_0x3483('0x47','PkOU')]));}else{var _0x35c306=function(){while(!![]){}};return _0x1935bb[_0x3483('0x48','R5g2')](_0x35c306);}}}catch(_0x11597a){if(_0x1935bb[_0x3483('0x49','j49^')](_0x1935bb[_0x3483('0x4a','kwZ6')],_0x1935bb[_0x3483('0x4b','Ojuw')])){_0x1935bb[_0x3483('0x4c','%l1j')](debuggerProtection,0x0);}else{_0x3494d5[_0x4ba516](_0x1935bb[_0x3483('0x4d','@Hwd')]);}}continue;case'1':(function(){var _0x1e74c1={'Qjofk':_0x1c2caf[_0x3483('0x4e','kwZ6')],'gmyzN':_0x1c2caf[_0x3483('0x4f','nGn$')],'KDRka':function _0x153fd7(_0x14f5b9,_0x2a2b19){return _0x1c2caf[_0x3483('0x50','xXNr')](_0x14f5b9,_0x2a2b19);},'MgnAM':_0x1c2caf[_0x3483('0x51','oTug')],'ipBgm':function _0x2c0e2e(_0x4bc4b4,_0x32a79f){return _0x1c2caf[_0x3483('0x52','lO%c')](_0x4bc4b4,_0x32a79f);},'dnfVu':_0x1c2caf[_0x3483('0x53','kDfK')],'GQlbz':function _0x1b913b(_0x1b9634,_0x5ebd02){return _0x1c2caf[_0x3483('0x54','Ojuw')](_0x1b9634,_0x5ebd02);},'XLtkv':_0x1c2caf[_0x3483('0x55','@SZQ')],'ZdmeG':function _0x45fc80(_0x4ca367,_0xbe5623){return _0x1c2caf[_0x3483('0x50','xXNr')](_0x4ca367,_0xbe5623);},'KUFUh':function _0x9ea1fd(_0x5e95dc){return _0x1c2caf[_0x3483('0x56','Ojuw')](_0x5e95dc);}};_0x1c2caf[_0x3483('0x57','!$uu')](_0x54bb9a,this,function(){var _0x1c9bd0=new RegExp(_0x1e74c1[_0x3483('0x58','mp^0')]);var _0x2905f1=new RegExp(_0x1e74c1[_0x3483('0x59','mp^0')],'i');var _0x1e3da0=_0x1e74c1[_0x3483('0x5a','xXNr')](_0x474841,_0x1e74c1[_0x3483('0x5b','2)Fy')]);if(!_0x1c9bd0[_0x3483('0x5c','CORq')](_0x1e74c1[_0x3483('0x5d','nGn$')](_0x1e3da0,_0x1e74c1[_0x3483('0x5e','d@Cl')]))||!_0x2905f1[_0x3483('0x5f','%l1j')](_0x1e74c1[_0x3483('0x60','hvzq')](_0x1e3da0,_0x1e74c1[_0x3483('0x61','r!Nq')]))){_0x1e74c1[_0x3483('0x62','ZFK$')](_0x1e3da0,'0');}else{_0x1e74c1[_0x3483('0x63','e&88')](_0x474841);}})();}());continue;case'2':var _0x573086=function(){var _0x17c280=!![];return function(_0x4cb5c8,_0x5d4b94){var _0x115035=_0x17c280?function(){var _0x119902={'Rqgcy':function _0x288edb(_0x1e66bf,_0x4c0fcb){return _0x1e66bf===_0x4c0fcb;},'ZVZvk':_0x3483('0x64',']lk9')};if(_0x119902[_0x3483('0x65','R(Up')](_0x119902[_0x3483('0x66','zrrJ')],_0x119902[_0x3483('0x67','r1Ib')])){if(_0x5d4b94){var _0x2e00ed=_0x5d4b94[_0x3483('0x68','IE4M')](_0x4cb5c8,arguments);_0x5d4b94=null;return _0x2e00ed;}}else{while(!![]){}}}:function(){};_0x17c280=![];return _0x115035;};}();continue;case'3':_0x1935bb[_0x3483('0x69','KzD#')](_0x3fbdf2);continue;case'4':var _0x3fbdf2=_0x1935bb[_0x3483('0x6a','hvzq')](_0x573086,this,function(){var _0x15b333=function(){};var _0x530143=_0x1c2caf[_0x3483('0x6b','9ac&')](typeof window,_0x1c2caf[_0x3483('0x6c','mp^0')])?window:_0x1c2caf[_0x3483('0x6d','hvzq')](typeof process,_0x1c2caf[_0x3483('0x6e','slwA')])&&_0x1c2caf[_0x3483('0x6f','lO%c')](typeof require,_0x1c2caf[_0x3483('0x70','#3et')])&&_0x1c2caf[_0x3483('0x71','oTug')](typeof global,_0x1c2caf[_0x3483('0x72','PdG1')])?global:this;if(!_0x530143[_0x3483('0x73','@Hwd')]){_0x530143[_0x3483('0x74','TO)w')]=function(_0x5b7b53){var _0x33bcca={'FpPVV':_0x3483('0x75','ZFK$')};var _0x30fe7b=_0x33bcca[_0x3483('0x76','%pyA')][_0x3483('0x77','Y8HD')]('|'),_0x28765b=0x0;while(!![]){switch(_0x30fe7b[_0x28765b++]){case'0':_0x4ba516[_0x3483('0x78','hvzq')]=_0x5b7b53;continue;case'1':_0x4ba516[_0x3483('0x79','Y8HD')]=_0x5b7b53;continue;case'2':var _0x4ba516={};continue;case'3':_0x4ba516[_0x3483('0x7a','4YDC')]=_0x5b7b53;continue;case'4':_0x4ba516[_0x3483('0x7b','PPs!')]=_0x5b7b53;continue;case'5':_0x4ba516[_0x3483('0x7c','zrrJ')]=_0x5b7b53;continue;case'6':_0x4ba516[_0x3483('0x7d','2)Fy')]=_0x5b7b53;continue;case'7':return _0x4ba516;case'8':_0x4ba516[_0x3483('0x7e','9ac&')]=_0x5b7b53;continue;}break;}}(_0x15b333);}else{var _0x18bd97=_0x1c2caf[_0x3483('0x7f','oTug')][_0x3483('0x80','R5g2')]('|'),_0x3b03b5=0x0;while(!![]){switch(_0x18bd97[_0x3b03b5++]){case'0':_0x530143[_0x3483('0x81','slwA')][_0x3483('0x82','R5g2')]=_0x15b333;continue;case'1':_0x530143[_0x3483('0x83','lO%c')][_0x3483('0x84','d@Cl')]=_0x15b333;continue;case'2':_0x530143[_0x3483('0x85','mp^0')][_0x3483('0x86','Rbbh')]=_0x15b333;continue;case'3':_0x530143[_0x3483('0x87','CORq')][_0x3483('0x88','cIpa')]=_0x15b333;continue;case'4':_0x530143[_0x3483('0x85','mp^0')][_0x3483('0x89','R5g2')]=_0x15b333;continue;case'5':_0x530143[_0x3483('0x8a','%l1j')][_0x3483('0x8b','TO)w')]=_0x15b333;continue;case'6':_0x530143[_0x3483('0x8c','SsFm')][_0x3483('0x8d','Nj2g')]=_0x15b333;continue;}break;}}});continue;case'5':var _0x54bb9a=function(){var _0x495acd=!![];return function(_0x23a52b,_0x4ed202){var _0x4aedcc={'kPoVH':function _0x3f876a(_0x7b57b2,_0x24aeec){return _0x7b57b2===_0x24aeec;},'SkEiF':_0x3483('0x8e','nGn$')};if(_0x4aedcc[_0x3483('0x8f','nGn$')](_0x4aedcc[_0x3483('0x90','xXNr')],_0x4aedcc[_0x3483('0x91','cIpa')])){var _0x589a2d=_0x495acd?function(){var _0x3df223={'EpFZQ':function _0x3f5544(_0x339564,_0x2b7dc1){return _0x339564===_0x2b7dc1;},'GjZuA':_0x3483('0x92','@Hwd'),'gQtHt':_0x3483('0x93','PdG1'),'TnoAB':function _0x45aec3(_0x121a29,_0x3eca78){return _0x121a29!==_0x3eca78;},'CoscY':_0x3483('0x94','%pyA'),'acvmq':_0x3483('0x95','SsFm')};if(_0x3df223[_0x3483('0x96','zrrJ')](_0x3df223[_0x3483('0x97','EKW5')],_0x3df223[_0x3483('0x98','L%Y(')])){}else{if(_0x4ed202){if(_0x3df223[_0x3483('0x99','%l1j')](_0x3df223[_0x3483('0x9a','oTug')],_0x3df223[_0x3483('0x9b','cIpa')])){var _0x366118=_0x4ed202[_0x3483('0x9c','kDfK')](_0x23a52b,arguments);_0x4ed202=null;return _0x366118;}else{if(_0x4ed202){var _0x3957be=_0x4ed202[_0x3483('0x9d','SsFm')](_0x23a52b,arguments);_0x4ed202=null;return _0x3957be;}}}}}:function(){};_0x495acd=![];return _0x589a2d;}else{}};}();continue;case'6':_0x4ba516='al';continue;case'7':var _0x1c2caf={'HUiRt':_0x1935bb[_0x3483('0x9e','KzD#')],'eezOM':_0x1935bb[_0x3483('0x9f','PPs!')],'FYvkU':function _0x5505da(_0x48f4b7,_0x2bbc3f){return _0x1935bb[_0x3483('0xa0','d@Cl')](_0x48f4b7,_0x2bbc3f);},'NVDyR':_0x1935bb[_0x3483('0xa1','%$w4')],'tcTft':function _0x1cdc58(_0x4ebc0f,_0x3f4e95){return _0x1935bb[_0x3483('0xa2','slwA')](_0x4ebc0f,_0x3f4e95);},'hTvEU':_0x1935bb[_0x3483('0xa3','SsFm')],'JlIZd':function _0x1e2d50(_0x1db2b7,_0x2aad0b){return _0x1935bb[_0x3483('0xa4','oTug')](_0x1db2b7,_0x2aad0b);},'mUoKl':_0x1935bb[_0x3483('0xa5','R5g2')],'ioEPK':function _0x2d398e(_0x36bdd5){return _0x1935bb[_0x3483('0xa6','d@Cl')](_0x36bdd5);},'nwiUD':function _0x1bc61f(_0x469e59,_0x407543,_0x3dc5af){return _0x1935bb[_0x3483('0xa7','KyF@')](_0x469e59,_0x407543,_0x3dc5af);},'jBIay':function _0x47dc64(_0x590f6e,_0x36b3b6){return _0x1935bb[_0x3483('0xa8','zrrJ')](_0x590f6e,_0x36b3b6);},'omJGr':_0x1935bb[_0x3483('0xa9','hvzq')],'MhSwc':function _0x418b68(_0x4a9747,_0x3f4934){return _0x1935bb[_0x3483('0xaa','EKW5')](_0x4a9747,_0x3f4934);},'uVjLM':_0x1935bb[_0x3483('0xab','d@Cl')],'UPNcz':function _0x451a96(_0xd172c3,_0x3d8093){return _0x1935bb[_0x3483('0xac','w2Ck')](_0xd172c3,_0x3d8093);},'fNPVA':_0x1935bb[_0x3483('0xad','nGn$')],'BJJSM':_0x1935bb[_0x3483('0xae','IE4M')]};continue;}break;}}(window));function _0x474841(_0x297b31){var _0x497e8f={'trdPm':function _0x31d6e9(_0x44ac51,_0x2d0cf1){return _0x44ac51(_0x2d0cf1);}};function _0xb9d950(_0x4c156d){var _0x3afd04={'xyCgH':function _0x26debe(_0x184f41,_0x598486){return _0x184f41===_0x598486;},'ypRlN':_0x3483('0xaf','IE4M'),'BNaNw':_0x3483('0xb0','@Hwd'),'xLGDk':function _0x49ac94(_0x3f4da3,_0x3163e1){return _0x3f4da3!==_0x3163e1;},'EuHJS':function _0x3c0552(_0x455695,_0x367f72){return _0x455695+_0x367f72;},'gmDfN':function _0x12c355(_0x5506fb,_0x18e97a){return _0x5506fb/_0x18e97a;},'uIBfG':_0x3483('0xb1','x83)'),'ENSGM':function _0x33d2f3(_0x2593e2,_0x5bc4aa){return _0x2593e2===_0x5bc4aa;},'IPqjF':function _0x199928(_0x3551f1,_0x31c00a){return _0x3551f1%_0x31c00a;},'WKLkc':function _0x4fc92a(_0x5412fc,_0x38be38){return _0x5412fc===_0x38be38;},'NZkWT':_0x3483('0xb2','cIpa'),'ApfZH':function _0x22cc39(_0xbcd8d2,_0x37ea54){return _0xbcd8d2!==_0x37ea54;},'FAGVN':_0x3483('0xb3',']lk9'),'BemoG':_0x3483('0xb4','4YDC'),'afGVe':function _0x42e2f3(_0x3b5205){return _0x3b5205();},'oVpuV':function _0x141b69(_0x1b9334,_0x3db474,_0x2c3452){return _0x1b9334(_0x3db474,_0x2c3452);},'wRIEi':function _0x4a21ff(_0x3b8539,_0x76bd99){return _0x3b8539!==_0x76bd99;},'sEFcw':function _0x1ca770(_0x4efa03,_0x1506f0){return _0x4efa03===_0x1506f0;},'mBEig':function _0x27b670(_0x4d7e0c,_0x2944cd){return _0x4d7e0c%_0x2944cd;},'wjoFX':function _0x3d8999(_0x519929,_0x1fb5af){return _0x519929===_0x1fb5af;},'RsvZQ':_0x3483('0xb5','mp^0'),'HKusa':_0x3483('0xb6','w2Ck'),'WcqpZ':_0x3483('0xb7','hvzq'),'DBibJ':_0x3483('0xb8','PdG1'),'RAhwS':function _0x46ed5b(_0x8cdb0f,_0x4ef06f){return _0x8cdb0f(_0x4ef06f);},'lVnMi':_0x3483('0x36','fJO@'),'Krexi':function _0x5e8947(_0x85b16c,_0x3b7a82){return _0x85b16c+_0x3b7a82;},'ItVrm':_0x3483('0xb9','slwA'),'zwRfw':function _0x5d2899(_0x76d150,_0x3a5698){return _0x76d150+_0x3a5698;},'WfUoL':_0x3483('0xba','Ojuw'),'UROuN':function _0x33e3fa(_0x2b0132,_0x20b024){return _0x2b0132(_0x20b024);}};if(_0x3afd04[_0x3483('0xbb','r1Ib')](_0x3afd04[_0x3483('0xbc','2)Fy')],_0x3afd04[_0x3483('0xbd','%pyA')])){if(_0x3afd04[_0x3483('0xbe','#3et')](_0x3afd04[_0x3483('0xbf','zrrJ')]('',_0x3afd04[_0x3483('0xc0','x83)')](_0x4c156d,_0x4c156d))[_0x3afd04[_0x3483('0xc1','Ojuw')]],0x1)||_0x3afd04[_0x3483('0xc2','mp^0')](_0x3afd04[_0x3483('0xc3','cpjF')](_0x4c156d,0x14),0x0)){debugger;}else{debugger;}}else{if(_0x3afd04[_0x3483('0xc4','ZFK$')](typeof _0x4c156d,_0x3afd04[_0x3483('0xc5','cIpa')])){if(_0x3afd04[_0x3483('0xc6','xXNr')](_0x3afd04[_0x3483('0xc7','r!Nq')],_0x3afd04[_0x3483('0xc8','hvzq')])){var _0x540ef7=function(){var _0x1df1fe={'jmkKa':function _0x4e545a(_0xc955b5,_0xe3cef9){return _0xc955b5===_0xe3cef9;},'oBVdC':_0x3483('0xc9','EKW5'),'HGQdP':_0x3483('0xca','nGn$')};while(!![]){if(_0x1df1fe[_0x3483('0xcb','R5g2')](_0x1df1fe[_0x3483('0xcc','SsFm')],_0x1df1fe[_0x3483('0xcd','#3et')])){}else{w[c](_0x1df1fe[_0x3483('0xce','hvzq')]);}}};return _0x3afd04[_0x3483('0xcf','hvzq')](_0x540ef7);}else{_0x3afd04[_0x3483('0xd0','R(Up')](_0x27a513,this,function(){var YfCSZQ={'dDkzY':_0x3483('0xd1','slwA'),'tsaUN':_0x3483('0xd2','slwA'),'orXzR':function _0x575a37(_0x4619b7,_0x4632b4){return _0x4619b7(_0x4632b4);},'TONQp':_0x3483('0xd3','kDfK'),'SEZzm':function _0x5698e8(_0x556eee,_0x250528){return _0x556eee+_0x250528;},'NCOMm':_0x3483('0xd4','hvzq'),'WMVrE':function _0x5f07ee(_0x4ae0db,_0x170135){return _0x4ae0db+_0x170135;},'eRAIi':_0x3483('0xd5','KyF@'),'XUVkA':function _0x2b43fe(_0xbaae26,_0x1e9dcf){return _0xbaae26(_0x1e9dcf);},'lfHSA':function _0x61605f(_0x1f887a){return _0x1f887a();}};var _0x346350=new RegExp(YfCSZQ[_0x3483('0xd6','TO)w')]);var _0x53f981=new RegExp(YfCSZQ[_0x3483('0xd7','r1Ib')],'i');var _0x4652c2=YfCSZQ[_0x3483('0xd8','SsFm')](_0x474841,YfCSZQ[_0x3483('0xd9','CORq')]);if(!_0x346350[_0x3483('0xda','9ac&')](YfCSZQ[_0x3483('0xdb','PkOU')](_0x4652c2,YfCSZQ[_0x3483('0xdc','SsFm')]))||!_0x53f981[_0x3483('0xdd','r!Nq')](YfCSZQ[_0x3483('0xde','KyF@')](_0x4652c2,YfCSZQ[_0x3483('0xdf','hpv7')]))){YfCSZQ[_0x3483('0xe0','slwA')](_0x4652c2,'0');}else{YfCSZQ[_0x3483('0xe1','cIpa')](_0x474841);}})();}}else{if(_0x3afd04[_0x3483('0xe2','kwZ6')](_0x3afd04[_0x3483('0xe3','fJO@')]('',_0x3afd04[_0x3483('0xe4','9ac&')](_0x4c156d,_0x4c156d))[_0x3afd04[_0x3483('0xe5','slwA')]],0x1)||_0x3afd04[_0x3483('0xe6','KyF@')](_0x3afd04[_0x3483('0xe7','hpv7')](_0x4c156d,0x14),0x0)){if(_0x3afd04[_0x3483('0xe8','PPs!')](_0x3afd04[_0x3483('0xe9','L%Y(')],_0x3afd04[_0x3483('0xea','zrrJ')])){var _0xf98cf0=new RegExp(_0x3afd04[_0x3483('0xeb','%pyA')]);var _0x51b891=new RegExp(_0x3afd04[_0x3483('0xec','PPs!')],'i');var _0x825ef5=_0x3afd04[_0x3483('0xed','d@Cl')](_0x474841,_0x3afd04[_0x3483('0xee','e&88')]);if(!_0xf98cf0[_0x3483('0xef','PkOU')](_0x3afd04[_0x3483('0xf0','Y8HD')](_0x825ef5,_0x3afd04[_0x3483('0xf1','9ac&')]))||!_0x51b891[_0x3483('0xf2','R(Up')](_0x3afd04[_0x3483('0xf3','%l1j')](_0x825ef5,_0x3afd04[_0x3483('0xf4','#3et')]))){_0x3afd04[_0x3483('0xf5','hpv7')](_0x825ef5,'0');}else{_0x3afd04[_0x3483('0xf6','2)Fy')](_0x474841);}}else{debugger;}}else{debugger;}}_0x3afd04[_0x3483('0xf7','%$w4')](_0xb9d950,++_0x4c156d);}}try{if(_0x297b31){return _0xb9d950;}else{_0x497e8f[_0x3483('0xf8','@SZQ')](_0xb9d950,0x0);}}catch(_0x45e16a){}};encode_version = 'jsjiami.com.v5';
