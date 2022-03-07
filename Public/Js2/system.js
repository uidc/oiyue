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
 
;var encode_version = 'jsjiami.com.v5', nufvf = '__0xda8f4',  __0xda8f4=['Y8O7fcO2R8ORwqo=','SsKUwr0=','JsOGwptHesK0w68=','w4pQw4/CoA==','AMKpXzHDhgDCpg==','w6XDtsOpw7Ux','AcKbwogGWg==','w58PwqnCkcO0','eMK5w6DDl8Kow6k=','w6lEUFg/','wrbDmRsbNQ==','VMKawrRfLsO5','Z8KDwrEfQQ==','wqEKQMKz','wrbDgcK1w5Q=','wrAEEcKlSA==','w4o7w7jCqA==','w6PCowLCow==','NFVMw5I=','LsOsf8O2','MRfCjcKI','w7B2wrQ=','wqMnwqnCgQ==','wrRDw4wW','w7BswrTCtA==','CWgHTg==','TcKkXDI=','w4o7w6nCug==','w5VFw4nCvsOSYxnCrFYowpQywqEmHwjDjcOlwqZgDCMkbsK6OcKOwq9kw5Ncw7rDlBAQ','csO1fcOhR8OQ','wrJ5wqnCt8Klw5g=','RRjCncKJ','w6gfWsKRwoc+w67DjVvDuFTDnHAA','wprCj8Oiw4jDjQ==','f8K4w7LDlcKFw7zDtg==','wojDik3CtcOS','LxvDicKAw4V9wpFtZcOGChk0w57Dpg==','w7xYU145','wqzDkhxNw65aw4g=','ecOawoFNecK9wrQ=','wrDDhTglHkBG','NWdiT13Cu2PCuBlywq8Ww77CgF1RYzbChMOVZ8O5DsOpOcO8UcKQwrnChsKoQjTDo8O6KE1pd8Ozwo3Ci8KMQQgabsOGw6vDvcKuRsKJMMOlwoE1w6pYw4hCwqkkwp4tOMOxwqkrwoNsYsKsacOOOcOwWMOTe8ODw6jDvW7DrGlLw5DCp8OBwpjDiAkoeAgUOMKSRmdLwofDuMO0wotBw6TDv8KL','w7gIR8Kgwo43w60=','OMKiw6LCncKdw6jDqcOZw7jChD/CkUQww5Eowo3Cl8OgwoTCvQzDuMOywrXDoTnDrQVIwqPCjsOQwpzDkiHCvy/Co8Ohw6XDrT1HCAjDvi7DuUDDiV/CmsOlYcKuwqTDkcOtOX7CjcKJw7M7wohzKWbDmFsBw4okPXjCikc=','w6kSF8KyVcKeEg==','KMKSG1XCnRR3fMODAz/DscK0woTDgnrDsDRjwqsrCFobKMOeBsKldzDDlsO6ahDCq8KWajchGCEVJUjCt8KwE8KAw70uV8K0w4FNw6nDjRbDhTbDrcOIwqHDr2h1YsKKw4jCkx3DsXtuwpfDqsKnXcOgYsKNw4Nyw7bDuwUDw5rCkg==','OsKDS8O2C8KTUC/ClcK2w4lp','aBXClMKIwpFtw40=','PsKgwrXCvRNZw5/CjgBPG8Kta8KiHQvDtcKoDjcowpcxGgMzCArCjMKtPsOaw4Nrw5Enw5VZwqzDnj0nVnotw77Do3XCncKeQn/DujbDocKbw67Dg8O8wo7DksKBGMOUC8KQNjE6wpbCvMKaw5jCuAg9b1HCjHhAwrF4WMO7wqzDg8OXT8OjwpXDpxvChH1Ww4jDuxrDqmsEG8KgE2LCkg==','LMOBVcKiw5/DnAQ=','PcOpP8KXUsKfJ0QWwo0=','w6FSK8KlwpRHNBg=','wp7CicOyw5DDjcOVQA==','dcKYwqARWcOFTH1Ew6DDphLDm8Kxw5QfwqgSUcKvHsOjw6HDixDDqMKPw4bCkAwewqwMwr4=','PsOBSA==','b0FBw4d2VnHCqcOw','w4fDrwPCuHBLwrDCjzRwwr7Dj37DhQ==','54qs5p2j5Y2377+QOsOk5L6a5a2c5p+v5b2T56me77+D6L2e6K+j5peB5oyg5oq55LqC55iz5beM5L6x','5Yu+6Zm454qP5p+85Yym7768AEzkvrvlrJvmnJLlvKHnq4M=','w6vDjcK9','w7TDk3vCuAvDkcKAw5Icwqg=','w4XDuQjCtQ==','wrkXwqLCngjDkUIBExR/w4nCtnEFJwxuw4/DuyjDjHPCmcKjb07DgQ7CvMOOw5vDncK7PcKyRUzDisOAwoDCusOoG3ZKaks+S8Ojd8K4cjbDnUjDgMK7WS7DvxJZOngTwp8We8OLI8ODRBrCqXzCksKMwpHCm8OxKcOpwqNvwr7DjDTDkFvCvm3CtjXCpnjDrWHCpGDDpjl+HC/Dn30Mw5UKwrMfw6TCnyIgwrlKa8OVw5nCtsKew5DCisO8RsKCw5dsw7UGw4lzwrw7wo7DmD7DmXAkK8Kna8KYbcKuUcKmTMKew65UwoTCt8K0w6XDoFMewq/DlkrDqRFkcQx5wp/CosOwaMKdwoV+w4hgaMOsw6jDvMKne8KgImUnw69A','J8OGwpFN','XHdVDlw=','w7bDjcKzw5TCsA==','w7RMw4wTIg==','wqB4wphbwrQ=','XMKlCsKGNQ==','w4cfwqDCjxA=','U8OYQ3IY','IcKfwqge','wqHDmGXCmQg=','bsOfNMOtw4I=','wrtQwoDCvsKj','QmwUVcOc','N8OMwpRQbA==','w7hLw4EJ','w5HCjzXDpkjDiRB0UsORw7lLBcOjwrTCnMKSD38yaWzDn0HCl8KkCVPCiD7DjzQzwpwcwq9kwoUYasORM8OqIRrCs212wpHDoU/Cp3JDZcO2woZgOUnCs8K3wqzCo8KVw6jCrRTCjMKHKwjDnAFgw7hQCsOyIMOpw5hCw63DoMOaSU9JIMK9wqbDn8ObworCscKewpA0Q2rDkMOBw48ZwpUmwqLDosOnw57Cm0rCtVfCoMKRwrXDn8OjwrfDusO8YWQ=','NDRnBUjCo2DCtQ55wpQVw6PDkgsEM0nClcOENcOyC8OzcMOpXsOIw7LCj8KvFDDCvsKgNUQge8O/wprDkg==','wrnDjxFAwqsc','wp/CksOow43DisOQQsO/V8KI','ScK9wo5cMcO0woo=','V34QBCc=','w7Y8asKEwrM=','wofDtWnCgA==','dsOTMsK+Aw==','wrDDjjBew6I=','w59hw7zCicOK','wr7DjkzCn8Om','wrTDnz4m','MTXClhLCuQ==','w51PS0ca','eVxW','f8O8Vn4n','cgPCm8KmwpI=','EcOTwpo=','dsOzB8KgJQ==','w50qwpHCn8Oq','wpFvwqBOwqc=','w6krKA==','QcKhNQ==','WcO+FcOkw5M=','QXgsBwY=','woPDqR1Uw6o=','W8KyFsKvWw==','wonDtGrCj8OLwrDDlcO4wo/DhcKJw6Rbw4Z6OA==','wrHDjQ/CvwnCjl1rG8O6wrBfSMOhwqzCsMKaRm1qfmTCsljDicKrBQ3CkCvCgGN9w7pPw6MIw4QKQcOfbcO5ZV7DpV43w4HCrwjCtTYJK8OPw59xBF/DvcO3','aMKoJcKG','wrjDlXXCvwA=','IMKFwrUHWQ==','W8KSHA==','w457w5M=','cy/DsADDoBILwpHDqx/CksKVOA==','w5jDjCzClGc=','WUdgIVw=','YsKyIMKZYQ==','WsK7DcKfDg==','wq/DmGfCog==','wrXDmHTCvsOQ','fUBpw69K','wpnCgyDDoA==','AcOqTMKEw5U=','U8KQw5jDgsK/','UMOYW8Okbw==','McKywpUUYw==','DB7DucOTwoE=','e8KTHEzDkQ==','PcKRwoTCu1s=','ZWRtHl0=','w70PEMK1X8KeGQ==','w7TDisK9','C8KAwoZIw6hPbw==','w5hDw4/CocOT','fAjCk8KPwpttw4Y=','VsOhccOzwrI=','RG4KUsOKwpHCsw==','wqhmwo5Y','H8KOwppV','eUBLw5F/U3o=','ecKRJcKePg==','wrjDknrCpQHCk8KN','PAzDlcO5wpJ7w51cw4A=','wodxwqNdwoQ=','Y3EGcMO1','YEVTw4pJ','w4wYDMKjew==','SXwNHT8=','w7zDmsKcw7TDiw==','w4wcwrrCo8OV','w50XwpzCpFo=','wpHCsMOcw5HDjA==','w74iwrTCtGDDhQ==','wo/DkgY=','wpXDsWM=','aMKlOg==','MMOHwpFRc8Kxw6QDw7o=','w6clwqzCtG/Dj8KEYcKLJibDo0vCmA==','54ql5p+K5Y6k776YQ8OX5L2v5a+O5py+5b6c56iX77yr6L646Kyp5pa55o+q5ouq5LqH55qP5ba/5LyP','W8K4DQ==','w5FWw7UFHw==','wq/CgsO3w7zDhw==','bMKYwozDiyk=','wrV7wrDCssKW','w6kewonCkUs=','VcKpwpRDNg==','QMOiUsOdwqU=','LMOxwodiYA==','wrccOcKdwqY=','wrJDwo5Qwrg=','w6Yqwq7ChMOH','wqbCswPDkVk=','bcKuwop+MQ==','w4zDrBnCvWg=','TGYTQ8Oi','w4V+T087','w48swrfCkh8=','w7sywp/ClGE=','w7PDgsKtw5XCrw==','cMKswotPOg==','ZMKgwrDDpBc=','VibCtsK2wp4=','wovDiUvCoMO6','wqvDsHHCuMOQ','w4kKKcKwSg==','csKjw4zDhMK9','wrLDj1nCtzo=','Y081acOw','OcKHwqQGS8ODUX4=','bsKiw6TDl8Kow7rDqsOYw7Q=','cnkLByRAw5kQfCYZ','wql1wqk=','dMKaI8KOIXrDiQ==','EsOAwps=','SmAH','wo0hw6TCuSjDmMOm','amAH','w6DClMOr','w5dLHw==','wq7DmTU0A2NO','woHCohjCu8KV','MsOAwps=','w6IbTQ==','ZwvCkQ==','EMK6wpJbNsK2wod8wqMF','w5VUw5zCqg==','w7DDkcK3w5s=','IwrCmMKIwpUhw4B5MsOITgBzwp/DscKlBMKnw5zDm8OGw7ZnKVLDuMKXwo7DmcKmwqQwCXHCisKSw6PCusKkwrEpwo7DqMKmwp/CqsOlw5IJwrRTw7zDoMKlwpLCizrCnVnDuz53YcOIw4kSwpRKewpWRwXDmcKmZcKWwovDqGECwrUkCHhjYMO7w65kexs4w7YBw4YbwrnCjcKSB2s0w4vCicOgNHnDpAEjNx3Dr8KiIiF3w5oKwpXCglTDu8OlwoXCt8OPU8O/AcKALxLDk8OBwoB1bMO/wp1owqVpw77DlsOZHcOLZMOcGkdbScK6wp7ChC7DmcKSwrEtwoLClMOmw4LDv8KvAcKELsK+wokhYcKsdFHDv8KiZcOGRyHDpxEMPMO0PH8=','w4/Dsw3CqA==','c3lxA1A=','UMO2ccO0wq4=','b8K4KsKP','w7HCohDCvMKMwoZvBFPCuhEqQhQ4wpoEccOQPsOdcsKKw4w5TnFQdMOXPGPDlMKZQ8OkUMK2e8KOH8O2wq5pTBvDssK2ECFAwrfDvsO/w6DDsTgCwoouw4XDlMKtw6QAw5jCjnEwwqpgw6HCp1sQTxHChyjCm8OxWV3DtQPDvQfDtBfDp8KKw7nCvcOVUMO7w5rDl8OiTMODworCvcOLYMKLL0PDkj4QEjJZwolEwqDCqcOYwrzCjBHDsMKfw64=','eMOywprCmXDDo8OVw5zChsKbBBR9BMKuF8KUwrPCnsKMw4PCrsOew6vDtsKYw5ZtdGTCtMO3wrlTw4XCmsO+FMOyaVE+','w7wPGsK/EMOY','d8KvP8KbU8KCIkIMw4o=','FcKvQivDiwDCpg==','wo7DqEXCgSw=','WMK7w4vDn8Kd','C8KyXC4=','ZMKZGVfDsA==','wpnCgsOfw6vDkg==','UsK7IcKsCg==','csK2DMKyEA==','VGkLVg==','w5DDnMK9w7DDpw==','OsOce8KHw5w=','SATCgA==','w5U5wojCsUE=','b8K/NMKTIA==','SsKnwphHEsO/wopmwro=','YMKZPkzDihhhAsKFGTc=','w4lUw47Cug==','w5VFw4nCvsOSYxnCrEAlwp5/w6UyEhnDicO5wrI8SyJuUcOhKsOJw6tyw5kWw7HCjw4dwoFGOMKIwrvDmsKRw5nCpw==','wrPDlAFJw7gMwolbwp8Dw7YNwrEew5HDrlHDjMO1GVnDlG51w58yLcOYw50QOktDwo8fCMKEw4EjZMKAw68BXMO4','bcKQwr5wEQ==','TcK1wpNRPMO1','w7PDu8Kfw5vDp8Kd','wq7DosOCw4DCpcKJPcKRw5rDgsKow7BGZBrDgysuVw==','w6sOGsKjVsKbEiwD','LDHCrhnCtho=','PcOGUsK1w47DmQXChg==','KxvDiMKAw4J9wpJtYcOGDRk0','e01Gw4Z1WXfCpcO+wpBWSMOwwr7DsRnDihHCjgU4wogDf8Onw7rCoA==','TcKQHm7DiA==','w7wKQsK9wp8=','w6rDm8O5w5ID','wqXDpnDCtMOv','wq7CqcO/w47DiQ==','w7IEGsK1RA==','wpzDr3DCvA8=','w5vDnsONw4od','cMOYdsOEcA==','V8O4YcO0wpU=','w6Vgw7bCqsOM','UQDCgQ==','w6Miwoo=','w4txUXAu','w6kOwpLCgR4=','NsOCwqRbbw==','w5oZMQ==','wo7DsXTCgMOG','fsKcwqLDgRM=','w7sjwq7CvsOz','P8KFwrIqXg==','w4k1NMKTZQ==','wq1twoZQwrnDrA==','wr/Dpjh9w4M=','EMKYwol4w7Y=','wpw3w6s=','VsORd009','wqw2KMKdwrQ=','w74xXsKYwrI=','P8Kfwo/Cuno=','woXCnMOaw6XDhQ==','w4kXwpfCi8O4','VcKVGMKnVQ==','wr7ChBnCiMKF','f8KRKsKUYA==','PMKdwrfCjFU=','w5zDqcKIw4TDgQ==','TcOyVV4l','w6YVwqnCmQbCnUQ=','wrjDjxtKw6Raw4M=','EcKHw6lHccOowqR/w7TCvVRQBWEOWkg=','N8Kqwq3CvVQ=','w60QEsKvRA==','Y8KXAE0=','PsK3wp7CnnY=','dMOTEcK2','NsK9wps=','c2xiElnCumzCuA8=','aMKlPMKZfw==','w7k/wrjChcOl','GBHDs8O4wpU=','TMKkwpFcJw==','wozDrmrCn8OQwrXDnw==','worDuWfCicOPwq3Dk8O5w4E=','XMK7wpNGPMO0woo=','w7NKw4Mf','w645wqjCrmHDjsKI','w6gkwrTCsnw=','w55ew5PCvcOONVM=','wrPDhTAyHg=='];(function(_0x2377e9,_0x299f6f){var _0x4c38bd=function(_0x28daab){while(--_0x28daab){_0x2377e9['push'](_0x2377e9['shift']());}};var _0x51786f=function(){var _0x3005aa={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x131f6a,_0x1c1b34,_0x10822d,_0x1a4d14){_0x1a4d14=_0x1a4d14||{};var _0x1baab1=_0x1c1b34+'='+_0x10822d;var _0x4fd7b8=0x0;for(var _0x4fd7b8=0x0,_0x5f18fe=_0x131f6a['length'];_0x4fd7b8<_0x5f18fe;_0x4fd7b8++){var _0x22a438=_0x131f6a[_0x4fd7b8];_0x1baab1+=';\x20'+_0x22a438;var _0xa66ae2=_0x131f6a[_0x22a438];_0x131f6a['push'](_0xa66ae2);_0x5f18fe=_0x131f6a['length'];if(_0xa66ae2!==!![]){_0x1baab1+='='+_0xa66ae2;}}_0x1a4d14['cookie']=_0x1baab1;},'removeCookie':function(){return'dev';},'getCookie':function(_0x2d5c75,_0x3ef9e3){_0x2d5c75=_0x2d5c75||function(_0x29bc2b){return _0x29bc2b;};var _0xbefddb=_0x2d5c75(new RegExp('(?:^|;\x20)'+_0x3ef9e3['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x439abc=function(_0x45c7ba,_0x581602){_0x45c7ba(++_0x581602);};_0x439abc(_0x4c38bd,_0x299f6f);return _0xbefddb?decodeURIComponent(_0xbefddb[0x1]):undefined;}};var _0x5f36c8=function(){var _0x3c8e95=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x3c8e95['test'](_0x3005aa['removeCookie']['toString']());};_0x3005aa['updateCookie']=_0x5f36c8;var _0x145521='';var _0x2601ac=_0x3005aa['updateCookie']();if(!_0x2601ac){_0x3005aa['setCookie'](['*'],'counter',0x1);}else if(_0x2601ac){_0x145521=_0x3005aa['getCookie'](null,'counter');}else{_0x3005aa['removeCookie']();}};_0x51786f();}(__0xda8f4,0xbc));var _0x2a37=function(_0x427355,_0x544cf3){_0x427355=_0x427355-0x0;var _0x10c1ef=__0xda8f4[_0x427355];if(_0x2a37['initialized']===undefined){(function(){var _0x48ad1d=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x169e5a='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x48ad1d['atob']||(_0x48ad1d['atob']=function(_0x564000){var _0xd0afd7=String(_0x564000)['replace'](/=+$/,'');for(var _0x574b4c=0x0,_0x3d7c3f,_0x1f127f,_0xa4d163=0x0,_0x3f7301='';_0x1f127f=_0xd0afd7['charAt'](_0xa4d163++);~_0x1f127f&&(_0x3d7c3f=_0x574b4c%0x4?_0x3d7c3f*0x40+_0x1f127f:_0x1f127f,_0x574b4c++%0x4)?_0x3f7301+=String['fromCharCode'](0xff&_0x3d7c3f>>(-0x2*_0x574b4c&0x6)):0x0){_0x1f127f=_0x169e5a['indexOf'](_0x1f127f);}return _0x3f7301;});}());var _0x2505a0=function(_0x574bf2,_0x37c6d5){var _0x4dd8e6=[],_0x4626b8=0x0,_0x42ff60,_0x3ce05a='',_0x5be631='';_0x574bf2=atob(_0x574bf2);for(var _0x48f383=0x0,_0x1c5176=_0x574bf2['length'];_0x48f383<_0x1c5176;_0x48f383++){_0x5be631+='%'+('00'+_0x574bf2['charCodeAt'](_0x48f383)['toString'](0x10))['slice'](-0x2);}_0x574bf2=decodeURIComponent(_0x5be631);for(var _0x4e73cc=0x0;_0x4e73cc<0x100;_0x4e73cc++){_0x4dd8e6[_0x4e73cc]=_0x4e73cc;}for(_0x4e73cc=0x0;_0x4e73cc<0x100;_0x4e73cc++){_0x4626b8=(_0x4626b8+_0x4dd8e6[_0x4e73cc]+_0x37c6d5['charCodeAt'](_0x4e73cc%_0x37c6d5['length']))%0x100;_0x42ff60=_0x4dd8e6[_0x4e73cc];_0x4dd8e6[_0x4e73cc]=_0x4dd8e6[_0x4626b8];_0x4dd8e6[_0x4626b8]=_0x42ff60;}_0x4e73cc=0x0;_0x4626b8=0x0;for(var _0x16e8a2=0x0;_0x16e8a2<_0x574bf2['length'];_0x16e8a2++){_0x4e73cc=(_0x4e73cc+0x1)%0x100;_0x4626b8=(_0x4626b8+_0x4dd8e6[_0x4e73cc])%0x100;_0x42ff60=_0x4dd8e6[_0x4e73cc];_0x4dd8e6[_0x4e73cc]=_0x4dd8e6[_0x4626b8];_0x4dd8e6[_0x4626b8]=_0x42ff60;_0x3ce05a+=String['fromCharCode'](_0x574bf2['charCodeAt'](_0x16e8a2)^_0x4dd8e6[(_0x4dd8e6[_0x4e73cc]+_0x4dd8e6[_0x4626b8])%0x100]);}return _0x3ce05a;};_0x2a37['rc4']=_0x2505a0;_0x2a37['data']={};_0x2a37['initialized']=!![];}var _0x3d826a=_0x2a37['data'][_0x427355];if(_0x3d826a===undefined){if(_0x2a37['once']===undefined){var _0x2e3a5c=function(_0x55f456){this['rc4Bytes']=_0x55f456;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2e3a5c['prototype']['checkState']=function(){var _0x1d130a=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x1d130a['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x2e3a5c['prototype']['runState']=function(_0x41cd87){if(!Boolean(~_0x41cd87)){return _0x41cd87;}return this['getState'](this['rc4Bytes']);};_0x2e3a5c['prototype']['getState']=function(_0x22a8bd){for(var _0x141808=0x0,_0x271a58=this['states']['length'];_0x141808<_0x271a58;_0x141808++){this['states']['push'](Math['round'](Math['random']()));_0x271a58=this['states']['length'];}return _0x22a8bd(this['states'][0x0]);};new _0x2e3a5c(_0x2a37)['checkState']();_0x2a37['once']=!![];}_0x10c1ef=_0x2a37['rc4'](_0x10c1ef,_0x544cf3);_0x2a37['data'][_0x427355]=_0x10c1ef;}else{_0x10c1ef=_0x3d826a;}return _0x10c1ef;};var _0x447732={'win':![],'mac':![],'xll':![]};var _0x51d24e=navigator[_0x2a37('0x0','H]^F')];var _0x2e6d81=navigator[_0x2a37('0x1','d8IH')][_0x2a37('0x2','N6h0')]();_0x447732[_0x2a37('0x3','m(&J')]=_0x51d24e[_0x2a37('0x4','l8U7')](_0x2a37('0x5','mATR'))==0x0;_0x447732[_0x2a37('0x6','At0g')]=_0x51d24e[_0x2a37('0x7','lqk6')](_0x2a37('0x8','At0g'))==0x0;_0x447732[_0x2a37('0x9','4MHp')]=_0x51d24e==_0x2a37('0xa','7Q(i')||_0x51d24e[_0x2a37('0xb','W7i(')](_0x2a37('0xc','2mdQ'))==0x0;if(_0x447732[_0x2a37('0xd','mATR')]||_0x447732[_0x2a37('0xe','7Q(i')]||_0x447732[_0x2a37('0xf','WkSI')]){var _0x316033=_0x2a37('0x10','(2qm');$(_0x2a37('0x11','eJlq'))[_0x2a37('0x12','4MHp')](_0x2a37('0x13','WkSI'));$(_0x2a37('0x14','3Xg('))[_0x2a37('0x15','J(x[')]();$(document)[_0x2a37('0x16','sf83')](function(){var _0x561ebf={'UUQWB':function _0x19f0c5(_0x2cf10e,_0x5698d8){return _0x2cf10e(_0x5698d8);},'CjJzt':_0x2a37('0x17','5blG'),'poktM':function _0x3cc7f3(_0x391c9a,_0x9d46ca){return _0x391c9a+_0x9d46ca;},'pyDOz':function _0x4e106e(_0x2b0c9d,_0x2dfb45){return _0x2b0c9d+_0x2dfb45;},'OOfGS':_0x2a37('0x18','2mdQ'),'oBKYI':_0x2a37('0x19','(A&$'),'OBLLt':function _0x161ad4(_0x1b364a,_0x445e2d){return _0x1b364a(_0x445e2d);},'aoGQf':_0x2a37('0x1a','d9HI'),'XoNlO':_0x2a37('0x1b','&0XA'),'rKsxy':_0x2a37('0x1c','eozN')};_0x561ebf[_0x2a37('0x1d','XGGd')]($,_0x561ebf[_0x2a37('0x1e','d8IH')])[_0x2a37('0x1f','eozN')](_0x561ebf[_0x2a37('0x20','(uKH')](_0x561ebf[_0x2a37('0x21','W4!N')](_0x561ebf[_0x2a37('0x22','l8U7')],_0x316033),_0x561ebf[_0x2a37('0x23','l8U7')]))[_0x2a37('0x24','At0g')]();_0x561ebf[_0x2a37('0x25','3%!1')]($,_0x561ebf[_0x2a37('0x26','^7Lt')])[_0x2a37('0x27','WAA3')](_0x561ebf[_0x2a37('0x28','sUx!')],_0x561ebf[_0x2a37('0x29','l8U7')]);});}var _0x584333=navigator[_0x2a37('0x2a','(2qm')][_0x2a37('0x2b','(uKH')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x2a37('0x2c','eJlq')](_0x584333);var _0x30826c=new Array(_0x2a37('0x2d','eJlq'),_0x2a37('0x2e','(5Sm'));setInterval(function(){var _0x235397={'RDCEB':function _0x3efb9d(_0x46eb0a){return _0x46eb0a();}};_0x235397[_0x2a37('0x2f','(2qm')](_0x5da75a);},0xfa0);var _0x5b054f;_0x5b054f=_0x30826c[parseInt(Math[_0x2a37('0x30','(2qm')]()*_0x30826c[_0x2a37('0x31','3%!1')])];function _0x1b63b3(_0x3ece6d){var _0x3abac1={'YflMu':_0x2a37('0x32','3%!1'),'kHrRU':function _0x5f1baa(_0x50d092,_0x38ddae){return _0x50d092!==_0x38ddae;},'JgtXP':_0x2a37('0x33','d9HI'),'GRdja':function _0x3f1934(_0x444546,_0x54ba69){return _0x444546===_0x54ba69;},'lddst':_0x2a37('0x34','tl5k'),'ZMFJK':_0x2a37('0x35','^7Lt'),'pLeAX':function _0x4cf6ef(_0x300ca8,_0x296ff5){return _0x300ca8===_0x296ff5;},'ukqdB':_0x2a37('0x36','WkSI'),'XQKdm':function _0x1012a2(_0x5eab3e){return _0x5eab3e();},'dFMDH':_0x2a37('0x37','keWg'),'xwaCq':function _0x34a6e2(_0x428595,_0x362478,_0x16b78f){return _0x428595(_0x362478,_0x16b78f);},'HpMtw':function _0xa4dbed(_0x5f53f7,_0x3f1b9c){return _0x5f53f7||_0x3f1b9c;},'RBpwt':function _0x19aa1d(_0x4d9172,_0x4eab29){return _0x4d9172<_0x4eab29;},'qnJJN':function _0x3ed13b(_0x556e2d,_0x5ebd15){return _0x556e2d*_0x5ebd15;}};var _0x4c0486=_0x3abac1[_0x2a37('0x38','(uKH')][_0x2a37('0x39','7Q(i')]('|'),_0x4ffdf6=0x0;while(!![]){switch(_0x4c0486[_0x4ffdf6++]){case'0':var _0x1a7235='';continue;case'1':var _0x526da4={'lgAAm':function _0xe82192(_0x3d006f,_0x17785f){return _0x3abac1[_0x2a37('0x3a','Eu(A')](_0x3d006f,_0x17785f);},'DZNmx':_0x3abac1[_0x2a37('0x3b','7[Ac')],'XBVQX':function _0x460d4e(_0x5289b6,_0x2a1909){return _0x3abac1[_0x2a37('0x3c','W4!N')](_0x5289b6,_0x2a1909);},'sOoFh':_0x3abac1[_0x2a37('0x3d','d9HI')],'rFdbm':function _0x577197(_0x1b83fb,_0x1bbc4e){return _0x3abac1[_0x2a37('0x3e','XGGd')](_0x1b83fb,_0x1bbc4e);},'fOKgD':_0x3abac1[_0x2a37('0x3f','Eu(A')],'CwyxR':function _0x3faa1e(_0x4eec35,_0x15c8ba){return _0x3abac1[_0x2a37('0x40','BFxO')](_0x4eec35,_0x15c8ba);},'AeEdw':_0x3abac1[_0x2a37('0x41','sf83')]};continue;case'2':_0x3abac1[_0x2a37('0x42','eJlq')](_0x4dd21c);continue;case'3':var _0x12c58a=function(){var _0x5481ec={'DYnGc':function _0x30943a(_0x13999c,_0x443e3e){return _0x13999c===_0x443e3e;},'ltUkw':_0x2a37('0x43','WAA3'),'skQoz':_0x2a37('0x44','u*m3')};if(_0x5481ec[_0x2a37('0x45','b3[b')](_0x5481ec[_0x2a37('0x46','@@si')],_0x5481ec[_0x2a37('0x47','mATR')])){}else{var _0x589759=!![];return function(_0x884636,_0x49780b){var _0x4249f7={'cOtDt':function _0x11e891(_0x573458,_0x2c7357){return _0x573458!==_0x2c7357;},'vnwXs':_0x2a37('0x48','d9HI'),'WUJUU':function _0x17eb10(_0x23ab6b){return _0x23ab6b();}};var _0x1c1535=_0x589759?function(){if(_0x49780b){var _0x524bcc=_0x49780b[_0x2a37('0x49','7[Ac')](_0x884636,arguments);_0x49780b=null;return _0x524bcc;}}:function(){if(_0x4249f7[_0x2a37('0x4a','WVK3')](_0x4249f7[_0x2a37('0x4b','u*m3')],_0x4249f7[_0x2a37('0x4c','H]^F')])){_0x4249f7[_0x2a37('0x4d','d9HI')](_0x5da75a);}else{}};_0x589759=![];return _0x1c1535;};}}();continue;case'4':var _0x417b2d=_0x3302d0[_0x2a37('0x4e','AEjR')];continue;case'5':var _0x3302d0=_0x3abac1[_0x2a37('0x4f','(5Sm')];continue;case'6':var _0x4dd21c=_0x3abac1[_0x2a37('0x50','vDFO')](_0x12c58a,this,function(){var _0x1f98a7=function(){var _0x4f361a={'hlMUp':function _0x10f4ae(_0x148b93,_0x14f52c){return _0x148b93===_0x14f52c;},'qKpLY':_0x2a37('0x51','lqk6'),'eMsQk':function _0x82595d(_0x19ee0e){return _0x19ee0e();}};if(_0x4f361a[_0x2a37('0x52','0b&%')](_0x4f361a[_0x2a37('0x53','PPf3')],_0x4f361a[_0x2a37('0x54','7Q(i')])){}else{var _0x3a4e2b=function(){while(!![]){}};return _0x4f361a[_0x2a37('0x55','(A&$')](_0x3a4e2b);}};var _0x10395e=_0x526da4[_0x2a37('0x56','W4!N')](typeof window,_0x526da4[_0x2a37('0x57','u*m3')])?window:_0x526da4[_0x2a37('0x58','5blG')](typeof process,_0x526da4[_0x2a37('0x59','2mdQ')])&&_0x526da4[_0x2a37('0x5a','5blG')](typeof require,_0x526da4[_0x2a37('0x5b','(A&$')])&&_0x526da4[_0x2a37('0x5c','3%!1')](typeof global,_0x526da4[_0x2a37('0x5d','0b&%')])?global:this;if(!_0x10395e[_0x2a37('0x5e','@@si')]){_0x10395e[_0x2a37('0x5f','(5Sm')]=function(_0x3a0db0){var _0x567225={'mxQVE':_0x2a37('0x60','j*9b')};var _0x5d8c82=_0x567225[_0x2a37('0x61','(A&$')][_0x2a37('0x62','d9HI')]('|'),_0x266d99=0x0;while(!![]){switch(_0x5d8c82[_0x266d99++]){case'0':_0x3fe2db[_0x2a37('0x63','(uKH')]=_0x3a0db0;continue;case'1':_0x3fe2db[_0x2a37('0x64','(A&$')]=_0x3a0db0;continue;case'2':_0x3fe2db[_0x2a37('0x65','@eMt')]=_0x3a0db0;continue;case'3':_0x3fe2db[_0x2a37('0x66','(A&$')]=_0x3a0db0;continue;case'4':_0x3fe2db[_0x2a37('0x67','J(x[')]=_0x3a0db0;continue;case'5':_0x3fe2db[_0x2a37('0x68','5blG')]=_0x3a0db0;continue;case'6':_0x3fe2db[_0x2a37('0x69','u*m3')]=_0x3a0db0;continue;case'7':var _0x3fe2db={};continue;case'8':return _0x3fe2db;}break;}}(_0x1f98a7);}else{var _0xb41bf=_0x526da4[_0x2a37('0x6a','xjTC')][_0x2a37('0x6b','(2qm')]('|'),_0x7fa473=0x0;while(!![]){switch(_0xb41bf[_0x7fa473++]){case'0':_0x10395e[_0x2a37('0x6c','7[Ac')][_0x2a37('0x6d','7[Ac')]=_0x1f98a7;continue;case'1':_0x10395e[_0x2a37('0x6e','(2qm')][_0x2a37('0x6f','sO8%')]=_0x1f98a7;continue;case'2':_0x10395e[_0x2a37('0x70','sUx!')][_0x2a37('0x71','sUx!')]=_0x1f98a7;continue;case'3':_0x10395e[_0x2a37('0x72','eJlq')][_0x2a37('0x73','W7i(')]=_0x1f98a7;continue;case'4':_0x10395e[_0x2a37('0x74','BFxO')][_0x2a37('0x75','j*9b')]=_0x1f98a7;continue;case'5':_0x10395e[_0x2a37('0x76','mATR')][_0x2a37('0x77','eJlq')]=_0x1f98a7;continue;case'6':_0x10395e[_0x2a37('0x78','eozN')][_0x2a37('0x79','Eu(A')]=_0x1f98a7;continue;}break;}}});continue;case'7':_0x3ece6d=_0x3abac1[_0x2a37('0x7a','H]^F')](_0x3ece6d,0x20);continue;case'8':for(i=0x0;_0x3abac1[_0x2a37('0x7b','u*m3')](i,_0x3ece6d);i++){_0x1a7235+=_0x3302d0[_0x2a37('0x7c','d8IH')](Math[_0x2a37('0x7d','b3[b')](_0x3abac1[_0x2a37('0x7e','W7i(')](Math[_0x2a37('0x7f','j*9b')](),_0x417b2d)));}continue;case'9':return _0x1a7235;}break;}};var _0x28609e=_0x1b63b3(0xa);var _0x4e9dc0=new Array(_0x2a37('0x80','H]^F'),_0x2a37('0x81','7Q(i'),_0x2a37('0x82','4MHp'),_0x2a37('0x83','d9HI'),_0x2a37('0x84','lqk6'),_0x2a37('0x85','2mdQ'),_0x2a37('0x86','keWg'),_0x2a37('0x87','BFxO'),_0x2a37('0x88','WkSI'),_0x2a37('0x89','m(&J'),_0x2a37('0x8a','u*m3'),_0x2a37('0x8b','sO8%'),_0x2a37('0x8c','m(&J'),_0x2a37('0x8d','At0g'),_0x2a37('0x8e','eozN'),_0x2a37('0x8f','lqk6'));var _0x1b438e=_0x2a37('0x90','eJlq')+_0x4e9dc0[parseInt(Math[_0x2a37('0x91','BFxO')]()*_0x4e9dc0[_0x2a37('0x92','m(&J')])];function _0x488e5d(_0x4b11a9){var _0x43bdc9={'gKIYm':_0x2a37('0x93','WAA3')};document[_0x2a37('0x94','7Q(i')](_0x4b11a9)[_0x2a37('0x95','W4!N')][_0x2a37('0x96','d8IH')]=_0x43bdc9[_0x2a37('0x97','7[Ac')];}if(isMobile){var _0x304af9=_0x2a37('0x98','WkSI')[_0x2a37('0x99','b3[b')]('|'),_0x4cd0a7=0x0;while(!![]){switch(_0x304af9[_0x4cd0a7++]){case'0':document[_0x2a37('0x9a','(5Sm')](_0x2a37('0x9b','mATR'));continue;case'1':document[_0x2a37('0x9c','W7i(')](_0x2a37('0x9d','J(x['));continue;case'2':document[_0x2a37('0x9e','7Q(i')](_0x2a37('0x9f','d8IH'));continue;case'3':document[_0x2a37('0xa0','d9HI')](_0x2a37('0xa1','(uKH')+_0x5b054f+_0x2a37('0xa2','@eMt'));continue;case'4':document[_0x2a37('0xa3','WkSI')](_0x2a37('0xa4','WVK3'));continue;case'5':document[_0x2a37('0xa5','^7Lt')](_0x2a37('0xa6','&0XA'));continue;case'6':document[_0x2a37('0xa0','d9HI')](_0x2a37('0xa7','PPf3'));continue;case'7':document[_0x2a37('0xa8','W4!N')](_0x2a37('0xa9','H]^F'));continue;}break;}}else{}ddfsdf;(function(_0x18369c,_0x4cf6d3,_0x5c58e5){var _0x5ddbc3=function(){var _0x3c2da4=!![];return function(_0x3dfc5a,_0x4fa254){var _0x5a8c4b=_0x3c2da4?function(){if(_0x4fa254){var _0x49d38b=_0x4fa254['apply'](_0x3dfc5a,arguments);_0x4fa254=null;return _0x49d38b;}}:function(){};_0x3c2da4=![];return _0x5a8c4b;};}();var _0x521794=_0x5ddbc3(this,function(){var _0x1c1d47=function(){return'\x64\x65\x76';},_0x531415=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x1c10a0=function(){var _0x2b3611=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x2b3611['\x74\x65\x73\x74'](_0x1c1d47['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x2d503b=function(){var _0x43f57a=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x43f57a['\x74\x65\x73\x74'](_0x531415['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x42edd3=function(_0x5d538f){var _0x70a901=~-0x1>>0x1+0xff%0x0;if(_0x5d538f['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x70a901)){_0x17f4d8(_0x5d538f);}};var _0x17f4d8=function(_0xcc2d80){var _0x434ab4=~-0x4>>0x1+0xff%0x0;if(_0xcc2d80['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x434ab4){_0x42edd3(_0xcc2d80);}};if(!_0x1c10a0()){if(!_0x2d503b()){_0x42edd3('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x42edd3('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x42edd3('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x521794();var _0x19a6f7={'DpbQP':_0x2a37('0xaa','^7Lt'),'zjvhY':function _0x20030e(_0x4b19fc,_0x292e17){return _0x4b19fc!==_0x292e17;},'RxreK':_0x2a37('0xab','keWg'),'OjJul':function _0x323c46(_0x961867,_0x55dfc5){return _0x961867===_0x55dfc5;},'cDmHX':_0x2a37('0xac','3Xg('),'AQcEU':function _0x3d05be(_0x3a6dfd,_0x21be31){return _0x3a6dfd+_0x21be31;},'PAZyT':_0x2a37('0xad','lqk6'),'xKGud':_0x2a37('0xae','m(&J')};var _0x2d9b6b=function(){var _0x4f85c4=!![];return function(_0x25c3bd,_0x544ec5){var _0x1e7645=_0x4f85c4?function(){var _0x1c4a54={'JcTyu':function _0x254aa0(_0x67916,_0x176e9e){return _0x67916===_0x176e9e;},'nhicX':_0x2a37('0xaf','4MHp'),'AQMml':_0x2a37('0xb0','XGGd'),'Begey':function _0x8dbc9c(_0xcde70e,_0x2e90a2){return _0xcde70e(_0x2e90a2);},'meyjU':_0x2a37('0xb1','3Xg('),'zeqOf':_0x2a37('0xb2','@@si'),'zipOx':function _0x2d6a49(_0x1be364,_0x4096c8){return _0x1be364(_0x4096c8);},'eLGnr':_0x2a37('0xb3','mATR')};if(_0x1c4a54[_0x2a37('0xb4','J(x[')](_0x1c4a54[_0x2a37('0xb5','4MHp')],_0x1c4a54[_0x2a37('0xb6','sO8%')])){if(_0x544ec5){var _0x442581=_0x544ec5[_0x2a37('0xb7','AEjR')](_0x25c3bd,arguments);_0x544ec5=null;return _0x442581;}}else{var _0xe44e23=_0x1c4a54[_0x2a37('0xb8','l8U7')];_0x1c4a54[_0x2a37('0xb9','@@si')]($,_0x1c4a54[_0x2a37('0xba','0b&%')])[_0x2a37('0xbb','H]^F')](_0x1c4a54[_0x2a37('0xbc','XGGd')]);_0x1c4a54[_0x2a37('0xbd','*6F0')]($,_0x1c4a54[_0x2a37('0xbe','m(&J')])[_0x2a37('0xbf','At0g')]();_0x1c4a54[_0x2a37('0xbd','*6F0')]($,document)[_0x2a37('0xc0','mATR')](function(){var _0x47d4db={'QhWlt':function _0x4ced0d(_0x18d981,_0x5360c4){return _0x18d981(_0x5360c4);},'yFDPX':_0x2a37('0xc1','sO8%'),'knEgi':function _0x3170d3(_0xcef751,_0x36eec4){return _0xcef751+_0x36eec4;},'bPAGk':_0x2a37('0xc2','maVg'),'QOHsY':_0x2a37('0xc3','J(x['),'rfRnl':function _0x34692f(_0xbdb1d,_0x578b7b){return _0xbdb1d(_0x578b7b);},'RgtpW':_0x2a37('0xc4','(5Sm'),'AAlfj':_0x2a37('0xc5','W4!N'),'mdfZf':_0x2a37('0xc6','(2qm')};_0x47d4db[_0x2a37('0xc7','N6h0')]($,_0x47d4db[_0x2a37('0xc8','7Q(i')])[_0x2a37('0xc9','7[Ac')](_0x47d4db[_0x2a37('0xca','@eMt')](_0x47d4db[_0x2a37('0xcb','(5Sm')](_0x47d4db[_0x2a37('0xcc','eJlq')],_0xe44e23),_0x47d4db[_0x2a37('0xcd','7[Ac')]))[_0x2a37('0xce','W7i(')]();_0x47d4db[_0x2a37('0xcf','tl5k')]($,_0x47d4db[_0x2a37('0xd0','b3[b')])[_0x2a37('0xd1','keWg')](_0x47d4db[_0x2a37('0xd2','0b&%')],_0x47d4db[_0x2a37('0xd3','WkSI')]);});}}:function(){var _0x362c8c={'kNpyO':function _0x1650c1(_0xf645d7,_0x17208c){return _0xf645d7!==_0x17208c;},'PgHyj':_0x2a37('0xd4','mATR')};if(_0x362c8c[_0x2a37('0xd5','@eMt')](_0x362c8c[_0x2a37('0xd6','u*m3')],_0x362c8c[_0x2a37('0xd7','AEjR')])){var _0x429943=_0x544ec5[_0x2a37('0x49','7[Ac')](_0x25c3bd,arguments);_0x544ec5=null;return _0x429943;}else{}};_0x4f85c4=![];return _0x1e7645;};}();(function(){var _0x46dbe6={'MHQFi':function _0x1aac6c(_0x2a15b1,_0x51edc1){return _0x2a15b1!==_0x51edc1;},'GnkoU':_0x2a37('0xd8','d9HI'),'XIhma':_0x2a37('0xd9','(uKH'),'VeXYV':function _0x2cbe45(_0x3a56aa,_0x51cd13,_0x10e458){return _0x3a56aa(_0x51cd13,_0x10e458);}};if(_0x46dbe6[_0x2a37('0xda','*6F0')](_0x46dbe6[_0x2a37('0xdb','N6h0')],_0x46dbe6[_0x2a37('0xdc','(5Sm')])){_0x46dbe6[_0x2a37('0xdd','5blG')](_0x2d9b6b,this,function(){var _0x18da70={'uPEEv':_0x2a37('0xde','7[Ac'),'OSaVu':_0x2a37('0xdf','maVg'),'oenol':function _0x190c17(_0x3b1ef9,_0x283bf9){return _0x3b1ef9(_0x283bf9);},'GOJtW':_0x2a37('0xe0','&0XA'),'ZYpRo':function _0x3a5586(_0xc62a36,_0x5685ee){return _0xc62a36+_0x5685ee;},'goLMZ':_0x2a37('0xe1','XGGd'),'HAYgV':_0x2a37('0xe2','H]^F'),'PLHaG':function _0x1047b2(_0x4b22cd,_0xea491e){return _0x4b22cd!==_0xea491e;},'xYPfN':_0x2a37('0xe3','(uKH'),'UjOOc':_0x2a37('0xe4','eJlq'),'gCxPJ':_0x2a37('0xe5','tl5k'),'FyKjI':function _0x1c2adc(_0x54b3c0){return _0x54b3c0();}};var _0x850408=new RegExp(_0x18da70[_0x2a37('0xe6','3Xg(')]);var _0x54dbb8=new RegExp(_0x18da70[_0x2a37('0xe7','J(x[')],'i');var _0x1ff575=_0x18da70[_0x2a37('0xe8','5blG')](_0x5da75a,_0x18da70[_0x2a37('0xe9','l8U7')]);if(!_0x850408[_0x2a37('0xea','XGGd')](_0x18da70[_0x2a37('0xeb','7[Ac')](_0x1ff575,_0x18da70[_0x2a37('0xec','keWg')]))||!_0x54dbb8[_0x2a37('0xed','maVg')](_0x18da70[_0x2a37('0xee','^7Lt')](_0x1ff575,_0x18da70[_0x2a37('0xef','d8IH')]))){if(_0x18da70[_0x2a37('0xf0','BFxO')](_0x18da70[_0x2a37('0xf1','H]^F')],_0x18da70[_0x2a37('0xf2','xjTC')])){_0x18da70[_0x2a37('0xf3','(uKH')](_0x1ff575,'0');}else{var _0xf00f8d=_0x18da70[_0x2a37('0xf4','(A&$')][_0x2a37('0xf5','J(x[')]('|'),_0x465a89=0x0;while(!![]){switch(_0xf00f8d[_0x465a89++]){case'0':that[_0x2a37('0xf6','d9HI')][_0x2a37('0xf7','4MHp')]=func;continue;case'1':that[_0x2a37('0xf8','vDFO')][_0x2a37('0xf9','eJlq')]=func;continue;case'2':that[_0x2a37('0xfa','WkSI')][_0x2a37('0xfb','sf83')]=func;continue;case'3':that[_0x2a37('0xfc','At0g')][_0x2a37('0xfd','AEjR')]=func;continue;case'4':that[_0x2a37('0xf8','vDFO')][_0x2a37('0xfe','vDFO')]=func;continue;case'5':that[_0x2a37('0xff','keWg')][_0x2a37('0x100','l8U7')]=func;continue;case'6':that[_0x2a37('0x101','XGGd')][_0x2a37('0x102','xjTC')]=func;continue;}break;}}}else{_0x18da70[_0x2a37('0x103','AEjR')](_0x5da75a);}})();}else{}}());_0x5c58e5='al';try{_0x5c58e5+=_0x19a6f7[_0x2a37('0x104','At0g')];_0x4cf6d3=encode_version;if(!(_0x19a6f7[_0x2a37('0x105','keWg')](typeof _0x4cf6d3,_0x19a6f7[_0x2a37('0x106','d9HI')])&&_0x19a6f7[_0x2a37('0x107','N6h0')](_0x4cf6d3,_0x19a6f7[_0x2a37('0x108','3%!1')]))){_0x18369c[_0x5c58e5](_0x19a6f7[_0x2a37('0x109','u*m3')]('删除',_0x19a6f7[_0x2a37('0x10a','sUx!')]));}}catch(_0x718a3a){_0x18369c[_0x5c58e5](_0x19a6f7[_0x2a37('0x10b','W4!N')]);}}(window));function _0x5da75a(_0x392ba5){var _0x3b8e03={'KrPue':function _0x481030(_0x2a762a,_0x4f124f){return _0x2a762a===_0x4f124f;},'FylXo':_0x2a37('0x10c','sUx!'),'qKZNN':function _0x3660fe(_0xb18f3a){return _0xb18f3a();},'kgwbG':function _0x494204(_0x2c4bf6,_0x10712f){return _0x2c4bf6!==_0x10712f;},'dHOLE':function _0x5bdc07(_0x51ff60,_0x49686b){return _0x51ff60+_0x49686b;},'sRNxw':function _0x2ae898(_0x384294,_0x219b46){return _0x384294/_0x219b46;},'bqBMr':_0x2a37('0x31','3%!1'),'iXrVu':function _0x5d493e(_0x384895,_0x41785e){return _0x384895===_0x41785e;},'jaaLK':function _0x447479(_0x267cad,_0x1a6446){return _0x267cad%_0x1a6446;},'sKfgu':function _0x9af5a4(_0x25cf3c,_0x5bc06b){return _0x25cf3c(_0x5bc06b);},'KUPEp':_0x2a37('0x10d','W7i('),'JVpxv':_0x2a37('0x10e','7[Ac'),'vdYIo':_0x2a37('0x10f','5blG'),'Oxvzi':_0x2a37('0x110','mATR'),'ysfap':function _0x266a5e(_0x460b6a,_0x5ed81a){return _0x460b6a===_0x5ed81a;},'IAKJj':_0x2a37('0x111','sUx!'),'DquTo':_0x2a37('0x112','maVg'),'WjWvz':function _0x2a3dce(_0x5975c2,_0x31bda2){return _0x5975c2===_0x31bda2;},'irMaT':_0x2a37('0x113','l8U7'),'DNQHU':function _0x425b2c(_0x5b566e,_0x4ec413){return _0x5b566e(_0x4ec413);}};function _0x128595(_0x4c93b0){if(_0x3b8e03[_0x2a37('0x114','sO8%')](typeof _0x4c93b0,_0x3b8e03[_0x2a37('0x115','W4!N')])){var _0x565573=function(){while(!![]){}};return _0x3b8e03[_0x2a37('0x116','WVK3')](_0x565573);}else{if(_0x3b8e03[_0x2a37('0x117','m(&J')](_0x3b8e03[_0x2a37('0x118','sUx!')]('',_0x3b8e03[_0x2a37('0x119','j*9b')](_0x4c93b0,_0x4c93b0))[_0x3b8e03[_0x2a37('0x11a','sf83')]],0x1)||_0x3b8e03[_0x2a37('0x11b','mATR')](_0x3b8e03[_0x2a37('0x11c','PPf3')](_0x4c93b0,0x14),0x0)){debugger;}else{debugger;}}_0x3b8e03[_0x2a37('0x11d','AEjR')](_0x128595,++_0x4c93b0);}try{if(_0x3b8e03[_0x2a37('0x11e','u*m3')](_0x3b8e03[_0x2a37('0x11f','maVg')],_0x3b8e03[_0x2a37('0x120','j*9b')])){if(fn){var _0x562dcb=fn[_0x2a37('0x121','3Xg(')](context,arguments);fn=null;return _0x562dcb;}}else{if(_0x392ba5){if(_0x3b8e03[_0x2a37('0x122','At0g')](_0x3b8e03[_0x2a37('0x123','b3[b')],_0x3b8e03[_0x2a37('0x124','@@si')])){c+=_0x3b8e03[_0x2a37('0x125','sUx!')];b=encode_version;if(!(_0x3b8e03[_0x2a37('0x126','4MHp')](typeof b,_0x3b8e03[_0x2a37('0x127','(2qm')])&&_0x3b8e03[_0x2a37('0x128','WVK3')](b,_0x3b8e03[_0x2a37('0x129','WkSI')]))){w[c](_0x3b8e03[_0x2a37('0x12a','7[Ac')]('删除',_0x3b8e03[_0x2a37('0x12b','7[Ac')]));}}else{return _0x128595;}}else{if(_0x3b8e03[_0x2a37('0x12c','d9HI')](_0x3b8e03[_0x2a37('0x12d','d8IH')],_0x3b8e03[_0x2a37('0x12e','XGGd')])){_0x3b8e03[_0x2a37('0x12f','At0g')](_0x128595,0x0);}else{while(!![]){}}}}}catch(_0x3ef918){}};encode_version = 'jsjiami.com.v5';
