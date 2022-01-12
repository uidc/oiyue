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
/*sale 2.1
 */
 
 var _0xodh='jsjiami.com.v6',_0xodh_=['‮_0xodh'],_0x571d=[_0xodh,'wp8ow40Yw58=','wpDCosKEWcOM','wrDCpcKybMOQ','wpETBcKkw4U=','w7TDs8KhAsOD','wqjCvsO0wps2','ccOjw6hZw5A=','b8K6w5DClGs=','wpvDsxQBGw==','w43ChRlpw5s=','wobDuMOTC3A=','wpDDjMOvJHA=','w5BiXBDCvw==','STLDhDoB','McKfAznDrw==','a8Kiw7TCsG8=','HcOiw4PCh1Y=','wq1MUMKzw6A=','XMKjw43CuX0=','w7Zfwod1Dg==','U8KJw5LCrls=','w6DDocOmYcOc','wrTDoicNOg==','wqfCkMKGXcOT','cMKDw5BnDA==','fxHCvk/Duw==','w7rDoAnDucKz','CcK5OynDsA==','KSjDocO+wqo=','woDClcOpwosJ','w6PChcKpw7vDnw==','wqvCjMKaDsOu','R2LCjsOTwrc=','RVIbQcOk','X8KVCSV1','w4PCgRJXw7Y=','wrNxw7nDrMOX','wqHDiMO8NUM=','w6TDs0wGaA==','wpLDtcO9C3I=','w5pnwrFQEQ==','a2oSXsOP','w6zDni/DtMKA','w4nCpMKRw5jDiw==','aVfCq8Ozwqs=','w4nDlsK8LcOU','HxJVTcKDRUg=','wo3CocOhwoc3','woDDpDgQJMOyBA==','RsO7w6BCw48=','w4vCu8KPw4fDncOLFw==','w543OsK1','BMKyHyLDpsOmJA==','NxjDucOp','w5TDjgTDn8KXwpVm','w63CmMOHbEA=','wqAWEcKjw4fCo0w=','TiZE','ajXCnFPDvD/Dgw==','W8KEAiJNwpjDhsOQwrk=','K2/DvwfCjA==','wqDDuMO3BcKn','fMKIw7TCr0M=','wphKw7PDvG0=','w6bDgg7DjsKE','wrHCr8OhwrU4','wrHDsRMyJQ==','w68LwoM4Kg==','wqx/w4XDiMOH','w5XDkF8+Vg==','w77DrsKXwrFx','ZxjDvSIz','RVzCscO1wpY=','wqHDmcOaK1I=','IxbDpcO0wpwNcw==','w6LCp8K0w6bDkA==','w7TDhkERaw==','bUHCjHLDvg==','acKhwrl0w6jDksO5w5QCMQfDs8OpOA==','w5BGTg7CqQ==','wo/Dh8OhGMKoWMOf','w5V9aMOcZw==','w5zCmcKiw6DDiA==','fcK0wqFYw7A=','Z8Kqwqte','EUfCocKJ','w71UeMOJZVTCs8OydA==','w47CrANOw5s=','ZFUU','w43Dt8Ozw60n','GQ9JUcKe','w43CpMONeW4=','Hi8HJsO0','EjHDgcORwoo=','K8KbHTXDgA==','MwnDp8Ouwoc=','CMOGw6HCm1HDvhU=','w6fDsU0NchHCjVPDnw==','BUnCvcKUw4XCn1g=','woHDocOZEw==','wonCp8KjN8OWwqNR','ElTCssKEw48=','w69VOMKANjde','a0nCvE3Dig==','wrlWw6TDs8Oyw7pM','w5h6wrc=','fB/DmCEIw7bCng==','w517wrZy','KAIvBcOq','LcKuJAPDqw==','QsKBw7NGFw==','QDXCglrDvg==','ZXjCn2DDnw==','wp/DlTdPw5M=','UsKZDyBJwoQ=','MsKxGQvDjQ==','w5PCs8OtaEw=','a8Oywr7CnDQ=','w7xKfsOUew==','QMKZw6JYL08=','w5HDjQXDg8KK','YMK1w5bCtno=','R8OdWsKzw74K','cMKWw4tNBg==','w4sRd0PDpg==','TDTCm1XDiQ==','w5vDmsKLwrRJ','wrUyM8K/w4A=','w7tOfcK8w5g=','wpplwr56','RcONw6DCiw==','DcOtw71Ow4U=','w4VWw6fDvA==','w4TCoMK5KQ==','ScKnGCE=','w4TCsMKhNw==','DDlTFQ==','wqAVbQ==','UhdLWQ==','IMKjwqRX','w4VSw6zDrA==','wpTDj8KzKw==','wpk7McKq','w5jDtMOCGw==','w4tGQxLDtn48G8KCWMOpwqHDvBPDm8K4w7pfTD4=','wqhYw6TDpMOyw7s=','YsKhwqNWw7DDnw==','w5TDicK+IQ==','X8K1w5PCuGHDkcKacinChXh+fMKO','woLCpsKNWcOQ','GBRITsKASFQ=','w6nCpsOHVkc=','PcK4w7pNwrbDi8Kiw41YOXXDtsKRIFs=','woLCosKYXMOB','wobDiDVDw7zCh8Kc','wp7DpB7DgsKmFsKwwpAyRsKMw73Cvhx5w6jClEXCkxVNw6bClzTCgMKfIxLCojsiwoRSJg==','w7/DmsKxwo1OwqHDvw==','NF4aUMKowrzDvw8Xwol9LcOaTEzCpRfCscOBLi3DvlMAdMK5GMOdCsOPGcOefsOyw4nDvsO7w5XDlcOhwqXCuMK9wpXChMKfJCxgITXCo8KnIMKBOT3DgcOCw5w+XQNXQcKdKcKcwrrDtCtRfA==','wp7Cu8KuwqEjwo5Aw7jDrcOjwolz','w4NnwrlpHcOSw4Q=','wovCp8KCwozDhsOSFMKwI8OAw51Dwpc5E8OVKsKLQMOTTMKbWwEiP8O6DQXCp0o/w5fCh8K2wpHCnQRvwrbDsMK8NBTDvsKBCcOmw6bCgTRNw79NwoQTL0LCjkQJw6fCocOFw5LDnSnDnTnDnmQNwqZMw4LCi8OiwoTDtsKFK2XCvsOawq3DgMK4eMOtw5LDi8KUJDLCncKDVAp3J8Oiwo7CkQ7DmAxHQwA0','w67CmMOPe0B0wqk=','NSnChlnDvzbCmA==','ZmDCs8O3wrhOwrY=','NBUAUsOxwrnDvgw=','wrQLFsKkw43Co0c=','w5fCgcOhDcKnTcOPw5ZUw4I=','w43DlMK5MMOFfMOw','w5LCocKXDcOBw7TClEPDsz3CksKtaXvCnkomPMO0P8ONNcOJEVoLMMOPe0XDvl3Dq8OODMO1wr3CnBTDkCvDqkHDnkbDiiDCiCgRw4TCr8OhGcOjA8Oyw6INw7xbeHQ3woLCjMKPRC7CjMOVWDDCsXDDscOOMg==','wpzDnMO7HMKhVcOI','AMO6w7EVw4lnHiDDgsOpP8KiJ8K8YWrClhc8w5tzw4cEwpBqCMOiwpZzSMOLwrrCmsKzwpLCuQdvw5FfUMK0AGJfRcOdU8Oqw5TDu8OhG8Oyw4sGYBEtwpfCn8Kgw7vDuj1Cwr48cR/CgMKQwrwpYGYrwoguQgcDWSQOwrlTw4nCl0PCvBzCpsKDVsOxwrTDuCfDqsO3w7HCpsOdw6hDwqg=','wqXDvjgAP8O3DnPDgzzCigELwqrDhMKcE8Oow4zDnwJ+wrI=','bk5lWQ==','wolXw7jDr3Bl','w7nDtsO5asO4','w5dfezbCpQ==','w5bDog3Do8KN','wqbDkjUVOw==','CcOZw7zCkEk=','wojDmsOgOMKTbMKqwqbDuw==','d2HCgj7DsEvDpBItM8O9','fMOwdsK4w7o=','w4HChSx6w4U=','w6EOwoI4','NFMVVMOpwrjDvhJDwpRpJsOeFUnDrELCtMKVLmXCqgUNdsOqTMOBH8KcUcKZfsKnwojCu8K5wpzDgMOywqTDpMK1wrPCncOXamJgMSHCqcK/aMOSA2TDgMOCw4AyE1NGRMKVKMOIw7PCtjgUYHDCvDLDucOxaRnDkcKvw4TDgMKFV2tvw69Cw6nDs8KewpIjwoTDiH1TLh58JsKgw7Jmw4h1ETTCucKxw6XDoiN3X8KHwr7DvsKLw6Zxw5nDpw==','w4kCw7nDunR6w6rCscK1M1fCgz9yZsOFYXZ7a2HDscOtwrLCsMObcMKcF8Oywqtvwp8qGcO2esKVY39KWQ==','CcOGw6vCkR7CuA==','w4zDj8KjLcOCecOywrPCvl8=','w5TDvgjDiMKwE8K6','w44zwoQrFA==','wr8ew7gWw5w=','woxlQsKGw4I=','w4nCu8Kpw7vDpw==','w7HDvVwBbAI=','B8OMw6HCj0rDug==','eBt8DMK/RMOVwrjDhQ==','w4XCpsKiKsOcw6FcP8KJNg==','wpnCt8KVUQ==','NFcWUsOpw7XDuFpRwpJjL8OPFUnDjn/ClsOMfn3CpQlQNsKlDcKJFMKUW8KUN8K/w4vDrsOvw5zCicOwwq7DpcO+w6fCl8OXaixkPSbDu8Oxc8OJSy3DiMOFw5cnCFgZCsOOcsOIwqDDsiQJZSnDrXTCvsK1J3LDjMKsw5HDmsOaVTMww7Jfw7zCqsOaw5hqwpHCjXVIYA4/csO3wrxrwoJ0HC3CscKsw6fDgW8qQcKWw6XCssKdwqpwwovCocKLw5/DrHlZbcKBRCQ5IQRtwoMew4DChW50w4IlZsKPQRU3w4jCtzUowpPCucOmwrYPb8KreQA4DlTDhWTDqsKJZHnCtW0Uw6LCsnI+w44rw44kOURSRygJwo0T','w60OaEXDmw==','D0rCpMKww7M=','TcKdw7PCs1g=','IhDDhMO2wrs=','w5VUwohTAQ==','UHwmdMOH','FyhhesKB','w5HDmzrDhcKk','w63DgA7DvMK8','aixgK24=','ecK0w5VJCA==','WBzCqHnDtQ==','D0jCscKow5A=','wqzDjMOZKlc=','w7jCvMKKw6XDvQ==','wqzCn8KEKMOU','LTthZ8KK','woJNbcKgw74=','w5PDr0UJTA==','U8KDw7pbAw==','e8KTLQtW','woLDig4tMg==','w7YGwrMxDw==','d8KIw6dnKg==','McOxw4zCmUQ=','S8K9w5N/KA==','RRHDkgIj','w5DCv8KLw5LDoA==','T8Kiwqdfw7w=','UcOwwpnCkRw=','WlYnTsOm','W8Kcwr5iw4k=','wrzDky1iw7A=','wrPCpcOnwqIU','wrnDnx99w60=','w5Q6SFXDmg==','CsO7w6TCn1c=','w5oxWnnDrA==','w6rCo8OEVX8=','wr/DoMOWJ8KU','w53Ch8Kpw6PDpw==','GcOrw6jCkkw=','wqpKw6/DrcOQ','XHQ3acOY','wr7DicOmAcKG','w4jDr3ojQQ==','ejLCqHDDlg==','wpjChsKNVsON','w6XDqcK/wrpO','RMKpw7NbCQ==','JMOTw4nCjUk=','XcKewqbCqsKP','w6p0Zg/CrQ==','HzMCEsO/','w6M+eXXDmQ==','QcODw4Row7w=','bsKIw6jCrXs=','AcKYEDDDpw==','wrLDrxcCHw==','w6nDi8KBwpxu','wofCiMK7bMOg','woUqKsKWw5g=','wojDmxZTw4s=','fSLCl1LDoA==','w67DvcO9w5g0','w73CsQ5tw4o=','w499QsOEYw==','WXPCmcOowq4=','W8OoTMKNw54=','VcKPwr7CicK9','TsOfwqnCtCE=','bMKnw6x+Jw==','w7jDtwXDuMKx','w4pEcg/Cvw==','Rl3CvcOBwo8=','w67Ds8O/d8O5','w6PDjxHDicK3','wqDDnh1Ww40=','w6PDk8KUKMOS','UC/CtkzDoQ==','w4/Dn8Odw5cX','wqXDmAMlOw==','w4YOwqQbAA==','wo4Iw4UHw7Q=','w7LDmsKVwq9M','w4QpMMKzw64=','w5p4Q8OOYQ==','wrtJw7rDrMOk','wqPDmMOYLks=','w5jDhMOKw4A7','wrvDuMOoBMKW','w7d+fjjCog==','ZFPCnkjDvg==','wpAPLsK0w64=','w61HTQ3Cvg==','wrMePMKWw6E=','w60twpcUPA==','cMKNLCtc','w4bDrMOwfsOD','w4/Dr3wkUw==','w6RXwpVwAg==','bMKtwo57w6k=','IhDDiMONwp4=','w5XDjsKgMcOH','wqDCncK+dMO8','w43DqsOmw7wu','wprDt8O6Kl4=','wpjCvsOswqEh','aAjCmVfDug==','w63DtcK1DcOj','w5ZxNcK8FA==','JMKsJBDDhA==','wplQw5nDjsOL','Q0gEQ8OE','X8Kxw6PCmmg=','a8OAw5x6w48=','bcOQw6B7w4U=','woMew70nw7k=','w4JLG8KfOA==','w49cUMOhcQ==','YcKswr1Ew6M=','N2nCmcKmw6M=','w5bCucOKRVM=','ImDCi8Kdw7M=','wrLDhsOzB18=','VMKhwq5zw54=','ecKfw7HCnm8=','UVMjbMOd','PsK0IRvDnA==','ecOsw7Fvw6c=','w7hRH8KEGw==','Sj1ODQ==','w6vDnmI+QQ==','w54OEMKMw5k=','RMKkIA9W','wpTDnyU5Hw==','WsOzwpzCgA==','w5tcVBfCgg==','RDXChVLDgQ==','wojDncOh','w63DhsKbwrNs','QMKGw7JeLQ==','wpHCqsOgwoce','woPCn8KBEsO6','SsKmw498LQ==','w4LDkMKUwptT','W8OZw4h4w74=','w7l+cMObfA==','woRgU8KIw5I=','AC0rF8OU','JBcGMsO6','wpnDihd1w64=','wqAdw60Xw4s=','w53CpcKGw7zDvA==','w5jCrABfw4U=','wpRAw6TDr8ON','wrvCv8KhFsOe','w6YLc1o=','wop0w5HDqnc=','QsKnw41IDA==','w7bDhcK8DMOJ','LnLDszrCqw==','w5HDvxTDlg==','w7vDm3c8YQ==','TsKbw4rCmEQ=','wrZVeg==','FjldVsK9','w7TDu30qTg==','w41iwqRNDQ==','acK3wrzChcKh','QcOvwp7Cmw==','wqYpw58Bw5o=','QFTCgMOawrs=','wrNXw6jDj8On','RsKcw7NeFw==','wrpkw4XDkXM=','w6HDhsK6wrZR','w5M3wpwtPA==','WFIYd8OH','wpNxQMK9w5k=','w4lxRQrCvQ==','wqbCucKQRMO/','csKXw6hLIA==','SMKiw57CjGA=','w4XDvsOGcMOgL8K5ZMOxw77CkA==','YkkZ','wqoYEg==','EsKzFTTDr8Oj','woXDi8O2','w6UUNcKcNHVN','JEHCi8Khw5s=','w4bDoEktQw==','w7N4RDbCmg==','wpvDuzZNw5U=','w5rCqcOjY1I=','w6DCl8KRw7/Dvw==','w5PDmQvDicKJ','UsKRw43Ch0E=','CwIEP8OL','w4zCocKjw47Dmg==','woA/w48Uw5E=','I8KKIgvDhw==','w7rDimgqYw==','RsOuw718w6w=','wpPDp8OELFc=','w4/Crg5qw60=','w6jDq8OCw58X','w5hwwr56DMOW','dzx2KEw=','wrJNSMKWw7k=','FcKxBTDDmQ==','w4PDvHc7cA==','wp3Ct8KaUsOBw6k=','wprCvcK+LA==','w7l8bMOPYQ==','CkPCvcKAw57Cmw==','CFLDnwPCkA==','EBhVWcKYQQ==','TsKJEi8=','worDvsOlC8Kw','wprDpcOFGnLCkg==','OzcBBsOF','wpvDgsOzHMKiVsOUw5Q=','w7lJM8KBGDxeRMKK','elTCgk3Dj2/CmyXDhMOWw4M=','w5/CvcKP','Z1XCqkfDgEXCjw==','w63Dj8K+','VcKxw4Q=','w7DChMOCal1XwqE=','w65TVA==','w6AdKg==','UAtC','w7FCf8OJbW/CvA==','w4IWcEPDhA==','w7QIwog=','w4fCqAI=','w7rDpUI=','wqwPwokvC8Ocwo4kwqnDgw==','w5LDg8KxIA==','w6rDvUME','WkvCtsKTw4vDk17CsEkZw6vDs1lKwp0JS8OKwo4uwpDDuMO0M2zDrMOYfMOZwo5tw493w4BEIx5Ow7IFwoMvw5/CmMKnwrvCjcKzHw0ewpbCjsKcbsOSwpsUBsKJNjnDusOrw6nDlSZhA8O4w4g4CDbCqsKzIyHDqMOZGxjClcK/w6JfRGADwrR6ZijDkCYdGsKnw7nDhMKjJlPDrz56YkQ3UkfDg8OOfsOVBsKWKjwrI8OIw5bDnAxtXXRSwqoFw4RRwp8RbMOkBMOlwqbCsThhBh3DkMOSw68gw7xYb33CnhzDrMKnchFYOHshwrPDnsKRGMKGI8Kqw5LCncKbEcOww71QD8OUO8Omwo8vw4HDjsO+f8O8woXCrMOpeA==','w4FdUxs=','XMKqwp/CiMKC','w6pJesOIbA==','LggpCQ==','enTDkDDColrCs05rO8K0E8OJFMOVPsOcwqRMwqN1EMKDBVXCjsOgJiHCnTDDocO1wrR8FsKcw5oPEsOMwqQvDX3Cp8KlfMOyRWtBwrnClEnDocOpw5bDjAbDpcOpw7V6wpjDnVnDtcK2d0fCg1XClEjDvT/ClSHCiV/DjArDpcKOw7vChHEweFjDgTfCm8OpcsKSY8KGE1fDvcKywqFGwr8mwpvDozc0EQwPwoLCkMK8w5chwoXDsx3DuMObEw==','LMOkwqtDw6XDmsOxw5MDNyHDr8OSYUwFw43DucOJwonDq8OjUS/DvQXCr8OSw73CnQPDh8KdwrhRw4PDgQTCtzhVwq8=','BEnCt8KeworDmQ==','fzPCgUnDsTrDisK4F3U=','w4zDj8KjLcOCfMO7','bsKsLCRn','BXfDmzTCkg==','wpnCpsKZWQ==','BcKTCzTDgw==','w5vDi8Oow6sI','wr3CssOlwocC','JAPDhcOwwrg=','w6tEdMOb','w7x7bsOBeg==','WlDCoFvDmQ==','wrlKw7k=','f8OYwprCszw=','woJBfMK2w7k=','VsO6w7dfw7x1HSHDjg==','w7bDpmIHdQDCln/DkMKVwr0=','NBzDuMOz','A8Odw7vCmE3CqF9XXsKQKE/CvcOKw53CuMO7w57Dv8K2w6DCtsK4wqc1wp7ChTlsYAnChsOVZMOOBEHCp8KxVcKBYMOKOg==','woLCvMK5NMOKw7UbZMKHPsOQIsO4e8KtwrxVw6lKdlpqdsO6w48CIsOeCCVnSzfDssK6AF8XwoIOBMOcwrrCscKm','YE4HVsO7w6/CtB1TwoR+ZMORWw/DvkfCucKXNHHDtVBJfMK2BMKGD8KcUsKSJcOuw5jDp8OswpbClsOmwqnCucK7wq7Ckg==','w5DDthXDhcK9Eg==','wq1Xw7HDq2F+w6DCvcOyIEHCgTgiIcKbNyVTOE7CtcKj','C8Kyw5vDng==','wowzPcKnw4c=','J8OFw77CuHM=','woHCvMKcNMO7','X8KywoHCn8KPTR3CnUnDqcKmwpR7wrXCqk0=','w7TDv8K9wp/CksKNWsOgYcKRwr0fwqM3SsOKaMO5G8OgQcKlbSorP8KjRFTCvV5jw5LDnMKfwofCjmNmw77DmcK6cADDtMKcQMOBwoDCnmwSwrdcw41VL3fCglQ8w63DrcOB','YDTCm1Q=','w6HDoU8BbA==','wrxIecKkw4A=','LztZacKh','FmzDgCbCrg==','wr3DlMOrwoUbwrHCo1bCicK/w4vCscOT','w4HDvMO1w5YP','w71jNcK3DQ==','IMOYw53Cv2s=','KsOHw4vCkHM=','w6czVkbDhQ==','EhJVWw==','TMKgw7FzHA==','wrRqTsKHw7o=','wrrDlMOtwoUawrHCpVbCiMK/w4rCscOUEwjCrcKU','woTCvMKQUMOTw6jCnEnDrw==','VsKlwoXCmcKYUA==','AFPCvcKEw57CmlLCtg==','DQp+SMK+','w53CuMKywo5mw6dyw4RzEcOLwp7Djg==','SMO5wpDCkyvDtjDCqHJfdH3CiMKaw4dAK8Osw7PCvi7DscKXwo4qDiU=','w6pGecOFWw==','bzfDjgsh','w6LCoMKAw7nDoA==','wpNWw4PDsMOl','TALDpR8F','EG3Cn8KIw4I=','VsO9cMK8w7s=','w5jDgsOiw7gp','D8KzMAHDsQ==','JMKlFDjDqg==','wr1Pw5jDssOU','wozDmMOAGsKN','w5HDsirDm8Ko','aMKrw7RmOA==','wqErMsKTw6A=','w4/DtTfDqcKA','bMKgwr/Cs8Ki','wqPCr8OHwqMT','wrxUW8KCw6Q=','V8KOMxRt','wplxZcKWw5w=','w6IRwpYtFw==','w5JZYAHCpA==','w4hTdC3CnQ==','fcK/w5XClWc=','TsKLwojCjcKN','w5EowoQoNg==','w6lGVCvCtg==','DAjDksOTwr0=','TcKsCjVO','MDDDoMOpwrk=','ISnDh8OOwpc=','w6VzN8KYFw==','LcOhw5fCkmw=','w4fDkwnDhMK6','woIow6c1w5I=','wodMc8Klw5k=','GcO/w5fCkVY=','LmnDojXCig==','wqFWw7zDgW8=','UwHDrwYp','Qy7Ck23DgQ==','w4cQN8K0w5A=','w4PDhBnDmA==','XlDCgsOxwq0=','w6vDgE8DTA==','wp9Hw6zDvA==','wpPCqsKjT8Ok','WTjDrig1','ZlXCj3LDgA==','KQwYIsOZ','w4PDocOCT8OD','Z1TConHDrQ==','KXnDpzTCjA==','w6JhwoNUGw==','w5FKfi/ClQ==','wpfDriUX','w5nCrMKSw6HDgA==','cGk7SsOs','CBhISg==','w78HbWPDjg==','OgA0BMOK','dD1wKHk=','wpt4w5PDl8Ot','RE/Cr2/Dqg==','jsjiKVamAZTHiMtY.cLom.vU6tkdL=='];if(function(_0x208a89,_0x4fbcd9,_0x487c52){function _0x1f54b3(_0x6ae337,_0x273d05,_0x2c32d9,_0x27d964,_0x42ac77,_0x562e06){_0x273d05=_0x273d05>>0x8,_0x42ac77='po';var _0x142d26='shift',_0x5e7831='push',_0x562e06='‮';if(_0x273d05<_0x6ae337){while(--_0x6ae337){_0x27d964=_0x208a89[_0x142d26]();if(_0x273d05===_0x6ae337&&_0x562e06==='‮'&&_0x562e06['length']===0x1){_0x273d05=_0x27d964,_0x2c32d9=_0x208a89[_0x42ac77+'p']();}else if(_0x273d05&&_0x2c32d9['replace'](/[KVAZTHMtYLUtkdL=]/g,'')===_0x273d05){_0x208a89[_0x5e7831](_0x27d964);}}_0x208a89[_0x5e7831](_0x208a89[_0x142d26]());}return 0xcab7b;};function _0x261d31(){var _0xaae015={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x1934ab,_0x2dd9b7,_0x5221bc,_0x2a2676){_0x2a2676=_0x2a2676||{};var _0x3296a6=_0x2dd9b7+'='+_0x5221bc;var _0xf11a08=0x0;for(var _0xf11a08=0x0,_0x45515d=_0x1934ab['length'];_0xf11a08<_0x45515d;_0xf11a08++){var _0x1cecd4=_0x1934ab[_0xf11a08];_0x3296a6+=';\x20'+_0x1cecd4;var _0x3184a3=_0x1934ab[_0x1cecd4];_0x1934ab['push'](_0x3184a3);_0x45515d=_0x1934ab['length'];if(_0x3184a3!==!![]){_0x3296a6+='='+_0x3184a3;}}_0x2a2676['cookie']=_0x3296a6;},'removeCookie':function(){return'dev';},'getCookie':function(_0x12db82,_0x2e8193){_0x12db82=_0x12db82||function(_0x315fe9){return _0x315fe9;};var _0x1d7121=_0x12db82(new RegExp('(?:^|;\x20)'+_0x2e8193['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x8e7aa0=typeof _0xodh=='undefined'?'undefined':_0xodh,_0x4225b9=_0x8e7aa0['split'](''),_0xecaa6f=_0x4225b9['length'],_0x3287f5=_0xecaa6f-0xe,_0x58a2f8;while(_0x58a2f8=_0x4225b9['pop']()){_0xecaa6f&&(_0x3287f5+=_0x58a2f8['charCodeAt']());}var _0x576ef9=function(_0x3c01cd,_0x497b8a,_0x11788d){_0x3c01cd(++_0x497b8a,_0x11788d);};_0x3287f5^-_0xecaa6f===-0x524&&(_0x58a2f8=_0x3287f5)&&_0x576ef9(_0x1f54b3,_0x4fbcd9,_0x487c52);return _0x58a2f8>>0x2===0x14b&&_0x1d7121?decodeURIComponent(_0x1d7121[0x1]):undefined;}};function _0x3d3a00(){var _0x532621=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x532621['test'](_0xaae015['removeCookie']['toString']());};_0xaae015['updateCookie']=_0x3d3a00;var _0x118380='';var _0x76b586=_0xaae015['updateCookie']();if(!_0x76b586){_0xaae015['setCookie'](['*'],'counter',0x1);}else if(_0x76b586){_0x118380=_0xaae015['getCookie'](null,'counter');}else{_0xaae015['removeCookie']();}};_0x261d31();}(_0x571d,0x17f,0x17f00),_0x571d){_0xodh_=_0x571d['length']^0x17f;};function _0x5863(_0x13a64a,_0x5efbff){_0x13a64a=~~'0x'['concat'](_0x13a64a['slice'](0x1));var _0x183c24=_0x571d[_0x13a64a];if(_0x5863['PgdlyS']===undefined){(function(){var _0x558111=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5759c3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x558111['atob']||(_0x558111['atob']=function(_0x154532){var _0x4384ba=String(_0x154532)['replace'](/=+$/,'');for(var _0x27b740=0x0,_0x1ccbb8,_0x3021e7,_0x4aeb8d=0x0,_0x1a35f8='';_0x3021e7=_0x4384ba['charAt'](_0x4aeb8d++);~_0x3021e7&&(_0x1ccbb8=_0x27b740%0x4?_0x1ccbb8*0x40+_0x3021e7:_0x3021e7,_0x27b740++%0x4)?_0x1a35f8+=String['fromCharCode'](0xff&_0x1ccbb8>>(-0x2*_0x27b740&0x6)):0x0){_0x3021e7=_0x5759c3['indexOf'](_0x3021e7);}return _0x1a35f8;});}());function _0x58d1be(_0x38e5cb,_0x5efbff){var _0xe73424=[],_0x3fd6df=0x0,_0x98ef74,_0x8999a3='',_0x1a224b='';_0x38e5cb=atob(_0x38e5cb);for(var _0x511181=0x0,_0x4259f4=_0x38e5cb['length'];_0x511181<_0x4259f4;_0x511181++){_0x1a224b+='%'+('00'+_0x38e5cb['charCodeAt'](_0x511181)['toString'](0x10))['slice'](-0x2);}_0x38e5cb=decodeURIComponent(_0x1a224b);for(var _0x2134fa=0x0;_0x2134fa<0x100;_0x2134fa++){_0xe73424[_0x2134fa]=_0x2134fa;}for(_0x2134fa=0x0;_0x2134fa<0x100;_0x2134fa++){_0x3fd6df=(_0x3fd6df+_0xe73424[_0x2134fa]+_0x5efbff['charCodeAt'](_0x2134fa%_0x5efbff['length']))%0x100;_0x98ef74=_0xe73424[_0x2134fa];_0xe73424[_0x2134fa]=_0xe73424[_0x3fd6df];_0xe73424[_0x3fd6df]=_0x98ef74;}_0x2134fa=0x0;_0x3fd6df=0x0;for(var _0xb77453=0x0;_0xb77453<_0x38e5cb['length'];_0xb77453++){_0x2134fa=(_0x2134fa+0x1)%0x100;_0x3fd6df=(_0x3fd6df+_0xe73424[_0x2134fa])%0x100;_0x98ef74=_0xe73424[_0x2134fa];_0xe73424[_0x2134fa]=_0xe73424[_0x3fd6df];_0xe73424[_0x3fd6df]=_0x98ef74;_0x8999a3+=String['fromCharCode'](_0x38e5cb['charCodeAt'](_0xb77453)^_0xe73424[(_0xe73424[_0x2134fa]+_0xe73424[_0x3fd6df])%0x100]);}return _0x8999a3;}_0x5863['gxLHcV']=_0x58d1be;_0x5863['ZZIvpR']={};_0x5863['PgdlyS']=!![];}var _0x24400a=_0x5863['ZZIvpR'][_0x13a64a];if(_0x24400a===undefined){if(_0x5863['UhjJYi']===undefined){var _0x118c2d=function(_0x5ba9c3){this['whSsHA']=_0x5ba9c3;this['cbMqeO']=[0x1,0x0,0x0];this['hUbtpy']=function(){return'newState';};this['ZRtXBP']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['icQntE']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x118c2d['prototype']['EwkSwE']=function(){var _0x503abb=new RegExp(this['ZRtXBP']+this['icQntE']);var _0x326b8b=_0x503abb['test'](this['hUbtpy']['toString']())?--this['cbMqeO'][0x1]:--this['cbMqeO'][0x0];return this['akfVnq'](_0x326b8b);};_0x118c2d['prototype']['akfVnq']=function(_0x306341){if(!Boolean(~_0x306341)){return _0x306341;}return this['iaDiDb'](this['whSsHA']);};_0x118c2d['prototype']['iaDiDb']=function(_0x43cf1a){for(var _0x54cbb5=0x0,_0x20102e=this['cbMqeO']['length'];_0x54cbb5<_0x20102e;_0x54cbb5++){this['cbMqeO']['push'](Math['round'](Math['random']()));_0x20102e=this['cbMqeO']['length'];}return _0x43cf1a(this['cbMqeO'][0x0]);};new _0x118c2d(_0x5863)['EwkSwE']();_0x5863['UhjJYi']=!![];}_0x183c24=_0x5863['gxLHcV'](_0x183c24,_0x5efbff);_0x5863['ZZIvpR'][_0x13a64a]=_0x183c24;}else{_0x183c24=_0x24400a;}return _0x183c24;};var _0x325e57={'win':![],'mac':![],'xll':![]};window[_0x5863('‫0','R2jq')](function(){var _0x2f0f9f={'PJsTV':function(_0xc5f396,_0x1cb8d2){return _0xc5f396+_0x1cb8d2;},'NOiAS':function(_0x5e2817,_0x544504){return _0x5e2817>_0x544504;},'aPwct':function(_0x35d8e8,_0x41105c){return _0x35d8e8^_0x41105c;},'jAjzL':function(_0x5cec9f,_0x2c1040,_0x484147){return _0x5cec9f(_0x2c1040,_0x484147);},'CCElw':_0x5863('‮1','NHkX'),'HCpKM':_0x5863('‮2','b#lZ'),'dxaeq':function(_0x1265a4,_0x468759){return _0x1265a4==_0x468759;},'GeIOF':_0x5863('‫3','Mx5%'),'duBzh':_0x5863('‮4','oM9d'),'oeadL':function(_0x583d54,_0x2ccf6f){return _0x583d54===_0x2ccf6f;},'DWSZN':function(_0x198b16,_0x6035b0){return _0x198b16!=_0x6035b0;},'xCFBa':function(_0xf13d57,_0x15096f,_0x595c34){return _0xf13d57(_0x15096f,_0x595c34);},'egoQQ':function(_0x1c01bf,_0x4dbf92,_0x370f4a){return _0x1c01bf(_0x4dbf92,_0x370f4a);},'QnPQU':_0x5863('‮5','8AfK'),'UuUIV':function(_0x4e8585,_0x4f4fbe){return _0x4e8585!==_0x4f4fbe;},'gkAGM':_0x5863('‫6','CwZG'),'rltaP':_0x5863('‮7','rFb%'),'AuYSr':function(_0x27afc7,_0x5a6ef1){return _0x27afc7>_0x5a6ef1;},'wPLvH':function(_0x18a50e){return _0x18a50e();}};function _0x32cfee(_0x18d924,_0x4d6642){return _0x2f0f9f[_0x5863('‮8','NNJ5')](_0x18d924,_0x4d6642);}var _0x3f30d5=_0x2f0f9f[_0x5863('‮9','c4yd')](_0x32cfee,_0x2f0f9f[_0x5863('‮a','7vns')],_0x2f0f9f[_0x5863('‮b','rdhI')]),_0x39eb02='‮';if(_0x2f0f9f[_0x5863('‫c','^akT')](typeof _0xodh,_0x2f0f9f[_0x5863('‮d','&[*Q')](_0x32cfee,_0x2f0f9f[_0x5863('‫e','$l]8')],_0x2f0f9f[_0x5863('‫f','rdhI')]))&&_0x2f0f9f[_0x5863('‮10','B^c$')](_0x39eb02,'‮')||_0x2f0f9f[_0x5863('‫11','Mx5%')](_0x2f0f9f[_0x5863('‮12','rFb%')](_0x32cfee,_0xodh,'‮'),_0x2f0f9f[_0x5863('‮13','oPG(')](_0x32cfee,_0x2f0f9f[_0x5863('‫14','#FsO')](_0x32cfee,_0x2f0f9f[_0x5863('‫15','HAYN')](_0x32cfee,_0x3f30d5,_0x2f0f9f[_0x5863('‫16',')fdI')]),_0x3f30d5[_0x5863('‫17','MI&0')]),'‮'))){if(_0x2f0f9f[_0x5863('‮18','9(rN')](_0x2f0f9f[_0x5863('‫19','BW4@')],_0x2f0f9f[_0x5863('‫1a','Mx5%')])){var _0x372abc=[];while(_0x2f0f9f[_0x5863('‫1b','rFb%')](_0x372abc[_0x5863('‫1c','XSOV')],-0x1)){_0x372abc[_0x5863('‫1d','ONU*')](_0x2f0f9f[_0x5863('‮1e','GRzm')](_0x372abc[_0x5863('‫1f','CwZG')],0x2));}}else{var _0x5bbdc6=[];while(_0x2f0f9f[_0x5863('‮20','1RMd')](_0x5bbdc6[_0x5863('‫21','38[Y')],-0x1)){_0x5bbdc6[_0x5863('‮22','IpSn')](_0x2f0f9f[_0x5863('‫23','oM9d')](_0x5bbdc6[_0x5863('‫24','#FsO')],0x2));}}}_0x2f0f9f[_0x5863('‮25','$l]8')](_0x3fd82b);},0x7d0);var _0x17b9b9=navigator[_0x5863('‫26','oM9d')];var _0xd64aec=navigator[_0x5863('‫27','8AfK')][_0x5863('‮28','#qZN')]();_0x325e57[_0x5863('‫29','rdhI')]=_0x17b9b9[_0x5863('‫2a','#qZN')](_0x5863('‮2b','@Jse'))==0x0;_0x325e57[_0x5863('‫2c','&[*Q')]=_0x17b9b9[_0x5863('‮2d','7vns')](_0x5863('‫2e','NNJ5'))==0x0;_0x325e57[_0x5863('‮2f','GRzm')]=_0x17b9b9==_0x5863('‮30','NHkX')||_0x17b9b9[_0x5863('‮31','GRzm')](_0x5863('‫32','jNh!'))==0x0;if(_0x325e57[_0x5863('‮33','PbKa')]||_0x325e57[_0x5863('‮34','HAYN')]||_0x325e57[_0x5863('‮35','rFb%')]){var _0x58f209=_0x5863('‮36','PbKa');$(_0x5863('‮37','@Jse'))[_0x5863('‮38','rFb%')](_0x5863('‮39','CwZG'));$(_0x5863('‮3a','NNJ5'))[_0x5863('‮3b','yMr9')]();$(document)[_0x5863('‫3c','GRzm')](function(){var _0x1d528c={'PPMcZ':function(_0x5b83a6,_0x4857d9){return _0x5b83a6(_0x4857d9);},'CjmvQ':_0x5863('‫3d','$l]8'),'bNzeJ':function(_0x5b2ec8,_0x749922){return _0x5b2ec8+_0x749922;},'TvfuR':_0x5863('‫3e','1RMd'),'dzNwK':_0x5863('‫3f','!Kuz'),'dWumo':function(_0xa35a21,_0x2587ba){return _0xa35a21(_0x2587ba);},'Tknya':_0x5863('‮40','CwZG'),'VCiDr':_0x5863('‫41','v]nL'),'WgugM':_0x5863('‮42','@Jse')};_0x1d528c[_0x5863('‮43','IpSn')]($,_0x1d528c[_0x5863('‮44','1RMd')])[_0x5863('‮45','XSOV')](_0x1d528c[_0x5863('‫46','Mx5%')](_0x1d528c[_0x5863('‮47',')fdI')](_0x1d528c[_0x5863('‮48','KFfT')],_0x58f209),_0x1d528c[_0x5863('‫49','H&XV')]))[_0x5863('‫4a','GRzm')]();_0x1d528c[_0x5863('‫4b','GRzm')]($,_0x1d528c[_0x5863('‮4c','#qZN')])[_0x5863('‮4d','R6Yx')](_0x1d528c[_0x5863('‫4e','V*Gm')],_0x1d528c[_0x5863('‮4f','BW4@')]);});}var _0x469185=navigator[_0x5863('‫50','oPG(')][_0x5863('‮51','rFb%')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x5863('‫52','H&XV')](_0x469185);var _0x3d25d2=new Array(_0x5863('‫53','UNjP'),_0x5863('‫54','ONU*'),_0x5863('‫53','UNjP'),_0x5863('‮55','NHkX'));var _0x47f37a;_0x47f37a=_0x3d25d2[parseInt(Math[_0x5863('‫56','FS0A')]()*_0x3d25d2[_0x5863('‫21','38[Y')])];function _0x16ad99(_0x444fe7){var _0x3cbeed=function(_0x127d68){var _0x49af7f=!![];return function(_0x3a858b,_0x389d8e){var _0x41ecdb='‮';var _0x4823c3=_0x49af7f?function(){if(_0x41ecdb==='‮'&&_0x389d8e){var _0x94a80c=_0x389d8e['apply'](_0x3a858b,arguments);_0x389d8e=null;return _0x94a80c;}}:function(_0x127d68){};_0x49af7f=![];var _0x127d68='‮';return _0x4823c3;};}();var _0x13911a=_0x3cbeed(this,function(){var _0x200af8=function(){return'\x64\x65\x76';},_0x5baa5b=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x4ccc7f=function(){var _0x41c92d=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x41c92d['\x74\x65\x73\x74'](_0x200af8['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x146354=function(){var _0x361ac4=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x361ac4['\x74\x65\x73\x74'](_0x5baa5b['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x3730cf=function(_0xed68e2){var _0xa170e=~-0x1>>0x1+0xff%0x0;if(_0xed68e2['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0xa170e)){_0x440b74(_0xed68e2);}};var _0x440b74=function(_0x1184e4){var _0x4eb49e=~-0x4>>0x1+0xff%0x0;if(_0x1184e4['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x4eb49e){_0x3730cf(_0x1184e4);}};if(!_0x4ccc7f()){if(!_0x146354()){_0x3730cf('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x3730cf('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x3730cf('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x13911a();var _0x4f0ec6={'JtaMR':function(_0x11b2ce,_0x3d8b0e){return _0x11b2ce(_0x3d8b0e);},'IoIpx':function(_0x5a364a,_0x3a14b2){return _0x5a364a+_0x3a14b2;},'SrSMb':_0x5863('‫57','4fH8'),'vKLoh':_0x5863('‮58','V*Gm'),'cADkj':function(_0x2e63c0,_0x11b819){return _0x2e63c0===_0x11b819;},'aGpvk':_0x5863('‮59','b#lZ'),'hnAPx':function(_0x452a87,_0x16d8e1){return _0x452a87===_0x16d8e1;},'Rjztm':function(_0x3c6a5e,_0x258226){return _0x3c6a5e!==_0x258226;},'rVXyh':_0x5863('‮5a','UNjP'),'htTwI':_0x5863('‮5b','ONU*'),'JtcIz':_0x5863('‫5c','yMr9'),'LqYTN':_0x5863('‫5d','rdhI'),'pIknJ':_0x5863('‫5e','v]nL'),'OBXrp':function(_0x27fda0,_0x259ed0){return _0x27fda0+_0x259ed0;},'iIakN':_0x5863('‮5f','rFb%'),'bxWzQ':function(_0x2f7398,_0x294897){return _0x2f7398+_0x294897;},'FHXzR':_0x5863('‮60','BW4@'),'ekURT':_0x5863('‫61','38[Y'),'uzpvM':_0x5863('‮62','1RMd'),'prchB':function(_0x16c8d8){return _0x16c8d8();},'sPkrs':function(_0x1ccd0d,_0x49b02e){return _0x1ccd0d(_0x49b02e);},'aPLId':function(_0x2464c7,_0x157b46){return _0x2464c7+_0x157b46;},'mrIEO':function(_0x2501bc,_0x1c31a9,_0x59fb90){return _0x2501bc(_0x1c31a9,_0x59fb90);},'VBrhf':function(_0x479812,_0x1f47c9){return _0x479812+_0x1f47c9;},'Wiqnq':function(_0x458330,_0x14ceaf){return _0x458330(_0x14ceaf);},'AwFYe':_0x5863('‮63','hIQD'),'NUqFc':_0x5863('‮64',')fdI'),'Azwif':function(_0x57a372,_0xde7797){return _0x57a372===_0xde7797;},'Wjwif':_0x5863('‮65','8AfK'),'xxBbP':_0x5863('‫66','UNjP'),'gLxRg':function(_0x584f5,_0x44d7df){return _0x584f5===_0x44d7df;},'pxxvv':_0x5863('‫67','UNjP'),'fLDYv':_0x5863('‫68','jNh!'),'KVemc':_0x5863('‫69','38[Y'),'DXSRN':function(_0x1fa50f,_0x459800){return _0x1fa50f===_0x459800;},'shltx':_0x5863('‫6a','p5UU'),'DUuoV':_0x5863('‫6b','BW4@'),'XkbGh':_0x5863('‫6c','hIQD'),'RzEQn':function(_0x4c7260,_0x377bba){return _0x4c7260!==_0x377bba;},'ljeyD':_0x5863('‮6d','XSOV'),'vFOHZ':function(_0x237b6d,_0x1394bb){return _0x237b6d===_0x1394bb;},'WYqVT':_0x5863('‫6e','yMr9'),'xhKpT':_0x5863('‮6f','CwZG'),'TNkvK':function(_0x319dca,_0x5fbf21){return _0x319dca===_0x5fbf21;},'RHJVy':_0x5863('‫70','38[Y'),'LFldI':_0x5863('‫71','KFfT'),'SgHgh':function(_0x4d6777,_0x3674e7){return _0x4d6777(_0x3674e7);},'EniuZ':function(_0x387ca9,_0x38c47e){return _0x387ca9+_0x38c47e;},'Iopzm':function(_0x59bcf6){return _0x59bcf6();},'kCQBg':function(_0x55b1e8,_0x57369d){return _0x55b1e8||_0x57369d;},'nokxJ':_0x5863('‫72','V*Gm'),'UlhZD':function(_0x2765ad,_0x3e7a02){return _0x2765ad<_0x3e7a02;},'JYKgi':function(_0x28f9ac,_0x436eb4){return _0x28f9ac!==_0x436eb4;},'BiMkz':_0x5863('‮73','GRzm'),'dfexn':_0x5863('‮74','4S$H'),'XeqKw':function(_0x4bed60,_0x51cfcd){return _0x4bed60*_0x51cfcd;}};var _0x44c115=function(_0x568ee5){var _0x3d28a3={'Cxeic':function(_0x5836f3,_0x12eff2){return _0x4f0ec6[_0x5863('‫75','rdhI')](_0x5836f3,_0x12eff2);},'gvRrI':function(_0x6b03d0,_0x29184e){return _0x4f0ec6[_0x5863('‮76','R6Yx')](_0x6b03d0,_0x29184e);},'seQzz':_0x4f0ec6[_0x5863('‮77','4S$H')],'KZwLV':_0x4f0ec6[_0x5863('‮78','CwZG')],'bRMCH':function(_0x5b7d6c,_0x57867b){return _0x4f0ec6[_0x5863('‫79','s[UB')](_0x5b7d6c,_0x57867b);},'mbLHR':_0x4f0ec6[_0x5863('‮7a',')fdI')],'UgPOY':function(_0x8dea0e,_0x495b81){return _0x4f0ec6[_0x5863('‮7b','Mx5%')](_0x8dea0e,_0x495b81);}};var _0x28616a=!![];return function(_0x1370ff,_0x4c577a){var _0x3229fe={'qkWch':function(_0x257568,_0x91f238){return _0x3d28a3[_0x5863('‮7c','Mx5%')](_0x257568,_0x91f238);},'kaCOQ':function(_0x3b3673,_0x4312a9){return _0x3d28a3[_0x5863('‮7d','R6Yx')](_0x3b3673,_0x4312a9);},'Eorhj':function(_0x3e2a0a,_0x25d5ca){return _0x3d28a3[_0x5863('‮7e','oM9d')](_0x3e2a0a,_0x25d5ca);},'wLgqv':_0x3d28a3[_0x5863('‫7f','FS0A')],'RIbiX':_0x3d28a3[_0x5863('‫80','p5UU')],'JkDQC':function(_0x54c915,_0x460940){return _0x3d28a3[_0x5863('‮81','b#lZ')](_0x54c915,_0x460940);},'irRSP':_0x3d28a3[_0x5863('‮82','FS0A')],'LWlGh':function(_0x449bce,_0x38a60d){return _0x3d28a3[_0x5863('‫83','yMr9')](_0x449bce,_0x38a60d);}};var _0x51a15b='‮';var _0x28dcae=_0x28616a?function(){if(_0x3229fe[_0x5863('‫84','KFfT')](_0x3229fe[_0x5863('‮85','BW4@')],_0x3229fe[_0x5863('‫86','IpSn')])){if(_0x3229fe[_0x5863('‫87','BW4@')](_0x51a15b,'‮')&&_0x4c577a){var _0x44134b=_0x4c577a[_0x5863('‮88','PbKa')](_0x1370ff,arguments);_0x4c577a=null;return _0x44134b;}}else{return _0x3229fe[_0x5863('‫89','NNJ5')](Function,_0x3229fe[_0x5863('‫8a','NNJ5')](_0x3229fe[_0x5863('‫8b','&[*Q')](_0x3229fe[_0x5863('‫8c','yMr9')],_0x444fe7),_0x3229fe[_0x5863('‫8d','PbKa')]));}}:function(_0x568ee5){};_0x28616a=![];var _0x568ee5='‮';return _0x28dcae;};}();(function(){var _0x486b65={'iolSU':_0x4f0ec6[_0x5863('‮8e','NNJ5')],'odQvO':_0x4f0ec6[_0x5863('‫8f','H&XV')],'VtSIc':function(_0x345a62,_0xb715e4){return _0x4f0ec6[_0x5863('‫90','IpSn')](_0x345a62,_0xb715e4);},'rxIMY':_0x4f0ec6[_0x5863('‮91','H&XV')],'qxsUr':function(_0x1d7659,_0x1ae274){return _0x4f0ec6[_0x5863('‮92','H&XV')](_0x1d7659,_0x1ae274);},'xSHld':_0x4f0ec6[_0x5863('‮93','8AfK')],'vgytG':_0x4f0ec6[_0x5863('‫94','UNjP')],'AAYWp':function(_0x471956){return _0x4f0ec6[_0x5863('‮95','^akT')](_0x471956);}};_0x4f0ec6[_0x5863('‮96','B^c$')](_0x44c115,this,function(){if(_0x4f0ec6[_0x5863('‫97','BW4@')](_0x4f0ec6[_0x5863('‫98','UNjP')],_0x4f0ec6[_0x5863('‮99','1RMd')])){var _0x4a708f=new RegExp(_0x4f0ec6[_0x5863('‮9a','4fH8')]);var _0x57bddf=new RegExp(_0x4f0ec6[_0x5863('‮9b','4S$H')],'i');var _0x16f315=_0x4f0ec6[_0x5863('‮9c','v]nL')](_0x3fd82b,_0x4f0ec6[_0x5863('‮9d','nM1K')]);if(!_0x4a708f[_0x5863('‮9e','^akT')](_0x4f0ec6[_0x5863('‮9f','hwFg')](_0x16f315,_0x4f0ec6[_0x5863('‮a0','rFb%')]))||!_0x57bddf[_0x5863('‮a1','4fH8')](_0x4f0ec6[_0x5863('‫a2','XSOV')](_0x16f315,_0x4f0ec6[_0x5863('‮a3','4S$H')]))){if(_0x4f0ec6[_0x5863('‫a4','#qZN')](_0x4f0ec6[_0x5863('‮a5','$l]8')],_0x4f0ec6[_0x5863('‮a6','R2jq')])){var _0x213139=new RegExp(_0x486b65[_0x5863('‮a7','#qZN')]);var _0x7c4df8=new RegExp(_0x486b65[_0x5863('‮a8','1RMd')],'i');var _0x5ca680=_0x486b65[_0x5863('‮a9','MI&0')](_0x3fd82b,_0x486b65[_0x5863('‫aa','NNJ5')]);if(!_0x213139[_0x5863('‫ab','N4pS')](_0x486b65[_0x5863('‮ac','rdhI')](_0x5ca680,_0x486b65[_0x5863('‮ad','NHkX')]))||!_0x7c4df8[_0x5863('‮ae','38[Y')](_0x486b65[_0x5863('‮af','jNh!')](_0x5ca680,_0x486b65[_0x5863('‫b0','$l]8')]))){_0x486b65[_0x5863('‮b1','9(rN')](_0x5ca680,'0');}else{_0x486b65[_0x5863('‫b2','R6Yx')](_0x3fd82b);}}else{_0x4f0ec6[_0x5863('‮b3','#qZN')](_0x16f315,'0');}}else{_0x4f0ec6[_0x5863('‮b4','B^c$')](_0x3fd82b);}}else{var _0x59effe=fn[_0x5863('‫b5','XSOV')](context,arguments);fn=null;return _0x59effe;}})();}());var _0x1956af=function(_0x3c172f){var _0xb8e427={'MAcUK':_0x4f0ec6[_0x5863('‮b6','XSOV')],'ndJxy':function(_0x4a2efc,_0x208b35){return _0x4f0ec6[_0x5863('‮b7','b#lZ')](_0x4a2efc,_0x208b35);},'iQjyY':_0x4f0ec6[_0x5863('‫b8','@Jse')],'duVvt':function(_0x4d9642,_0xb4bf74){return _0x4f0ec6[_0x5863('‮b9','KFfT')](_0x4d9642,_0xb4bf74);},'nraMi':function(_0x5020c4,_0xc46e53){return _0x4f0ec6[_0x5863('‫ba','oPG(')](_0x5020c4,_0xc46e53);},'cPaxG':_0x4f0ec6[_0x5863('‫bb','&[*Q')],'NITUR':_0x4f0ec6[_0x5863('‮bc','N4pS')]};if(_0x4f0ec6[_0x5863('‫bd','HAYN')](_0x4f0ec6[_0x5863('‫be','#FsO')],_0x4f0ec6[_0x5863('‮bf','#FsO')])){var _0x548a5b={'xjYbT':function(_0x4b33ba,_0x53d637){return _0x4f0ec6[_0x5863('‮c0','NNJ5')](_0x4b33ba,_0x53d637);},'dsjDp':function(_0x5507cd,_0x65bc81){return _0x4f0ec6[_0x5863('‮c1','4S$H')](_0x5507cd,_0x65bc81);},'BJWhv':function(_0x10b2a8,_0x4a7d8f){return _0x4f0ec6[_0x5863('‫c2','Mx5%')](_0x10b2a8,_0x4a7d8f);},'kYuSV':_0x4f0ec6[_0x5863('‫c3','&[*Q')],'VzTXR':_0x4f0ec6[_0x5863('‫c4','UNjP')]};return function(_0x53cb16){return _0x548a5b[_0x5863('‫c5','BW4@')](Function,_0x548a5b[_0x5863('‮c6','&[*Q')](_0x548a5b[_0x5863('‫c7','MI&0')](_0x548a5b[_0x5863('‮c8','&[*Q')],_0x53cb16),_0x548a5b[_0x5863('‮c9','R2jq')]));}(_0x444fe7);}else{var _0x55af72=!![];return function(_0x58e70a,_0x147471){var _0x1de2d2={'KQHOm':function(_0x453d96,_0x2b37a8){return _0x4f0ec6[_0x5863('‫ca','N4pS')](_0x453d96,_0x2b37a8);},'ADWJW':function(_0x3af1d8,_0x4850d5){return _0x4f0ec6[_0x5863('‮cb','XSOV')](_0x3af1d8,_0x4850d5);},'VpTPj':_0x4f0ec6[_0x5863('‮cc','p5UU')],'Mhhgl':_0x4f0ec6[_0x5863('‫cd','v]nL')]};var _0x55b092='‮';var _0x9c8952=_0x55af72?function(){var _0x47cb36={'xEqpv':_0xb8e427[_0x5863('‮ce','^akT')]};if(_0xb8e427[_0x5863('‮cf','Mx5%')](_0xb8e427[_0x5863('‮d0','H&XV')],_0xb8e427[_0x5863('‫d1','KFfT')])){var _0x172e98={'aihbH':function(_0x3a2509,_0x22b5e2){return _0x1de2d2[_0x5863('‮d2','rdhI')](_0x3a2509,_0x22b5e2);},'iHslJ':function(_0x54f652,_0x4ac69a){return _0x1de2d2[_0x5863('‫d3','ONU*')](_0x54f652,_0x4ac69a);},'WHWHE':_0x1de2d2[_0x5863('‫d4','hwFg')],'fzbnj':_0x1de2d2[_0x5863('‫d5','NHkX')]};return function(_0x48ba22){return _0x172e98[_0x5863('‫d6','IpSn')](Function,_0x172e98[_0x5863('‮d7','HAYN')](_0x172e98[_0x5863('‮d8','R6Yx')](_0x172e98[_0x5863('‮d9','#FsO')],_0x48ba22),_0x172e98[_0x5863('‫da','rFb%')]));}(_0x444fe7);}else{if(_0xb8e427[_0x5863('‫db','#FsO')](_0x55b092,'‮')&&_0x147471){if(_0xb8e427[_0x5863('‮dc','MI&0')](_0xb8e427[_0x5863('‫dd','NHkX')],_0xb8e427[_0x5863('‫de','FS0A')])){var _0x580685=_0x147471[_0x5863('‫df','rdhI')](_0x58e70a,arguments);_0x147471=null;return _0x580685;}else{var _0xdddf71=_0x47cb36[_0x5863('‮e0','hwFg')][_0x5863('‫e1','@Jse')]('|'),_0x1a9c47=0x0;while(!![]){switch(_0xdddf71[_0x1a9c47++]){case'0':that[_0x5863('‫e2','38[Y')][_0x5863('‮e3','KFfT')]=_00;continue;case'1':that[_0x5863('‫e4','N4pS')][_0x5863('‮e5','oPG(')]=_00;continue;case'2':that[_0x5863('‫e6','rdhI')][_0x5863('‮e7','nM1K')]=_00;continue;case'3':that[_0x5863('‫e8','Mx5%')][_0x5863('‫e9','H&XV')]=_00;continue;case'4':that[_0x5863('‮ea','^akT')][_0x5863('‫eb','7vns')]=_00;continue;case'5':that[_0x5863('‮ec','b#lZ')][_0x5863('‫ed','9(rN')]=_00;continue;case'6':that[_0x5863('‫ee','v]nL')][_0x5863('‫ef','IpSn')]=_00;continue;}break;}}}}}:function(_0x3c172f){};_0x55af72=![];var _0x3c172f='‮';return _0x9c8952;};}}();var _0x5c16d8=_0x4f0ec6[_0x5863('‫f0','1RMd')](_0x1956af,this,function(){var _0x871477={'MQspr':_0x4f0ec6[_0x5863('‮f1','oM9d')],'JsURb':function(_0x363548,_0x461361){return _0x4f0ec6[_0x5863('‮f2','&[*Q')](_0x363548,_0x461361);},'vOoyi':_0x4f0ec6[_0x5863('‮f3','4fH8')],'czBPF':_0x4f0ec6[_0x5863('‮f4','FS0A')],'tMCTz':_0x4f0ec6[_0x5863('‫f5','KFfT')]};var _0x13d2ae=function(){};var _0x311094=_0x4f0ec6[_0x5863('‮f6','N4pS')](typeof window,_0x4f0ec6[_0x5863('‫f7','PbKa')])?window:_0x4f0ec6[_0x5863('‮f8','R6Yx')](typeof process,_0x4f0ec6[_0x5863('‮f9','rFb%')])&&_0x4f0ec6[_0x5863('‮fa','hIQD')](typeof require,_0x4f0ec6[_0x5863('‫fb','4S$H')])&&_0x4f0ec6[_0x5863('‫fc','hwFg')](typeof global,_0x4f0ec6[_0x5863('‫fd','#FsO')])?global:this;if(!_0x311094[_0x5863('‫e6','rdhI')]){_0x311094[_0x5863('‮fe','H&XV')]=function(_0x13d2ae){if(_0x871477[_0x5863('‮ff','rdhI')](_0x871477[_0x5863('‮100','rFb%')],_0x871477[_0x5863('‫101','#qZN')])){document[_0x5863('‫102','!Kuz')](_0x444fe7)[_0x5863('‮103','NNJ5')][_0x5863('‮104','oM9d')]=_0x871477[_0x5863('‫105','GRzm')];}else{var _0x3d7b9f=_0x871477[_0x5863('‮106','rdhI')][_0x5863('‫107','!Kuz')]('|'),_0xec0dfe=0x0;while(!![]){switch(_0x3d7b9f[_0xec0dfe++]){case'0':_0x2c5077[_0x5863('‫108','!Kuz')]=_0x13d2ae;continue;case'1':_0x2c5077[_0x5863('‫109','CwZG')]=_0x13d2ae;continue;case'2':var _0x2c5077={};continue;case'3':_0x2c5077[_0x5863('‮10a','GRzm')]=_0x13d2ae;continue;case'4':_0x2c5077[_0x5863('‫10b','HAYN')]=_0x13d2ae;continue;case'5':_0x2c5077[_0x5863('‮10c','NHkX')]=_0x13d2ae;continue;case'6':_0x2c5077[_0x5863('‮10d',')fdI')]=_0x13d2ae;continue;case'7':_0x2c5077[_0x5863('‫10e','38[Y')]=_0x13d2ae;continue;case'8':return _0x2c5077;}break;}}}(_0x13d2ae);}else{if(_0x4f0ec6[_0x5863('‫10f','7vns')](_0x4f0ec6[_0x5863('‫110','$l]8')],_0x4f0ec6[_0x5863('‮111','H&XV')])){var _0x127ed3=_0x4f0ec6[_0x5863('‮112','Mx5%')][_0x5863('‫113','H&XV')]('|'),_0x161e68=0x0;while(!![]){switch(_0x127ed3[_0x161e68++]){case'0':_0x311094[_0x5863('‮114','UNjP')][_0x5863('‮115','rFb%')]=_0x13d2ae;continue;case'1':_0x311094[_0x5863('‮116','CwZG')][_0x5863('‮117','#FsO')]=_0x13d2ae;continue;case'2':_0x311094[_0x5863('‫118','ONU*')][_0x5863('‫119','CwZG')]=_0x13d2ae;continue;case'3':_0x311094[_0x5863('‫11a','8AfK')][_0x5863('‫11b','#qZN')]=_0x13d2ae;continue;case'4':_0x311094[_0x5863('‮11c','R6Yx')][_0x5863('‮11d','MI&0')]=_0x13d2ae;continue;case'5':_0x311094[_0x5863('‮11e','4S$H')][_0x5863('‫11f','MI&0')]=_0x13d2ae;continue;case'6':_0x311094[_0x5863('‮ea','^akT')][_0x5863('‮120','$l]8')]=_0x13d2ae;continue;}break;}}else{if(_0x871477[_0x5863('‮121','Mx5%')](kit,'‮')&&fn){var _0x2ca0d1=fn[_0x5863('‮122','p5UU')](context,arguments);fn=null;return _0x2ca0d1;}}}});_0x4f0ec6[_0x5863('‮123','v]nL')](_0x5c16d8);_0x444fe7=_0x4f0ec6[_0x5863('‮124','#qZN')](_0x444fe7,0x20);var _0x37b10a=_0x4f0ec6[_0x5863('‮125','c4yd')];var _0x84d5df=_0x37b10a[_0x5863('‫126','IpSn')];var _0x4a49ed='';for(i=0x0;_0x4f0ec6[_0x5863('‫127','Mx5%')](i,_0x444fe7);i++){if(_0x4f0ec6[_0x5863('‫128','7vns')](_0x4f0ec6[_0x5863('‫129','V*Gm')],_0x4f0ec6[_0x5863('‮12a','GRzm')])){_0x4a49ed+=_0x37b10a[_0x5863('‮12b','p5UU')](Math[_0x5863('‮12c','^akT')](_0x4f0ec6[_0x5863('‮12d','&[*Q')](Math[_0x5863('‫12e','s[UB')](),_0x84d5df)));}else{return _0x4f0ec6[_0x5863('‮12f','p5UU')](Function,_0x4f0ec6[_0x5863('‫130','jNh!')](_0x4f0ec6[_0x5863('‫131','v]nL')](_0x4f0ec6[_0x5863('‮132','hIQD')],_0x444fe7),_0x4f0ec6[_0x5863('‮133','b#lZ')]));}}return _0x4a49ed;};var _0x2b54e3=_0x16ad99(0xa);var _0x31fef2=new Array(_0x5863('‮134','BW4@'),_0x5863('‮135','MI&0'),_0x5863('‮136','UNjP'),_0x5863('‫137','oPG('),_0x5863('‮138','4fH8'),_0x5863('‫139','ONU*'),_0x5863('‮13a','Mx5%'),_0x5863('‫13b','ONU*'),_0x5863('‮13c','9(rN'),_0x5863('‫13d','jNh!'),_0x5863('‫13e','38[Y'),_0x5863('‫13f','!Kuz'),_0x5863('‫140','4fH8'),_0x5863('‮141','@Jse'),_0x5863('‫142','nM1K'),_0x5863('‮143','#FsO'));var _0x42592c=_0x5863('‮144','NNJ5')+_0x31fef2[parseInt(Math[_0x5863('‮145','R6Yx')]()*_0x31fef2[_0x5863('‮146','!Kuz')])];function _0x163443(_0x177bef){var _0x19c07c={'pLaYb':_0x5863('‮147','@Jse')};document[_0x5863('‫148','&[*Q')](_0x177bef)[_0x5863('‮149','XSOV')][_0x5863('‫14a','38[Y')]=_0x19c07c[_0x5863('‫14b','7vns')];}if(isMobile){var _0x482e02=_0x5863('‮14c','!Kuz')[_0x5863('‮14d','XSOV')]('|'),_0x42fd3f=0x0;while(!![]){switch(_0x482e02[_0x42fd3f++]){case'0':document[_0x5863('‫14e','c4yd')](_0x5863('‫14f','FS0A'));continue;case'1':document[_0x5863('‫150','hIQD')](_0x5863('‮151','NHkX')+_0x47f37a+_0x5863('‫152',')fdI'));continue;case'2':document[_0x5863('‫153','MI&0')](_0x5863('‫154','rdhI'));continue;case'3':document[_0x5863('‮155','7vns')](_0x5863('‫156','v]nL'));continue;case'4':document[_0x5863('‮157','hwFg')](_0x5863('‮158','NHkX'));continue;case'5':document[_0x5863('‮159','b#lZ')](_0x5863('‫15a','oM9d'));continue;case'6':document[_0x5863('‫15b','@Jse')](_0x5863('‫15c','XSOV'));continue;case'7':document[_0x5863('‮15d','oM9d')](_0x5863('‫15e','oPG('));continue;}break;}}else{}function _0x3fd82b(_0x130666){var _0x303de7={'ZadPD':function(_0x181f4c,_0x5a4cc6){return _0x181f4c+_0x5a4cc6;},'RlThn':function(_0x8d12ca,_0x11aa68){return _0x8d12ca(_0x11aa68);},'UXsSM':function(_0x56e457){return _0x56e457();},'MiqUi':function(_0x9bdd3,_0xce274f){return _0x9bdd3(_0xce274f);},'HeCJt':_0x5863('‫15f','N4pS'),'ZEVcf':_0x5863('‮160','$l]8'),'aRkwi':_0x5863('‫161','4fH8'),'TNDOP':function(_0x344fa5,_0x48e009){return _0x344fa5!==_0x48e009;},'sIbZZ':_0x5863('‮162','R2jq'),'uSHWU':_0x5863('‫163','NNJ5'),'rBgzr':_0x5863('‮164','^akT'),'psemM':function(_0x5d2933,_0x464c18){return _0x5d2933===_0x464c18;},'UgtiB':_0x5863('‫165','N4pS'),'JfTKC':_0x5863('‫166','UNjP'),'ilwWY':_0x5863('‫167','@Jse'),'uMTNU':_0x5863('‮168','1RMd'),'biOqH':function(_0x58a0b8,_0x486f77){return _0x58a0b8===_0x486f77;},'aAXNy':function(_0x3e9ed1,_0x2bbbfa){return _0x3e9ed1!==_0x2bbbfa;},'XFURO':_0x5863('‮169','s[UB'),'kUZDm':_0x5863('‮16a','HAYN'),'sLAdv':function(_0x53fc0d,_0x10944e){return _0x53fc0d(_0x10944e);},'QFZYf':function(_0xd06e70,_0x2a5941){return _0xd06e70(_0x2a5941);},'inbOz':_0x5863('‫16b','PbKa'),'ZLrWQ':function(_0x71d29a,_0x17355e){return _0x71d29a+_0x17355e;},'PhkQO':_0x5863('‫16c','NHkX'),'FWIlm':_0x5863('‫16d','4fH8'),'WkdqJ':_0x5863('‫16e','UNjP'),'QfkaN':_0x5863('‮16f','@Jse'),'pryqm':_0x5863('‮170','FS0A'),'EoLLk':_0x5863('‫171','PbKa'),'ugUpa':_0x5863('‫172','B^c$'),'TydMD':function(_0x4a673f,_0x35f53c){return _0x4a673f===_0x35f53c;},'ZXCqz':_0x5863('‮173','BW4@'),'hLPUF':_0x5863('‫174','rdhI'),'xkjfR':function(_0x52e004,_0x537c87){return _0x52e004===_0x537c87;},'Afjnx':_0x5863('‮175','rFb%'),'PVzlR':function(_0x30e15e,_0x405a46){return _0x30e15e+_0x405a46;},'TLIZn':function(_0x30f011,_0x29aaa7){return _0x30f011/_0x29aaa7;},'jhPjF':_0x5863('‮176','UNjP'),'SvQdF':function(_0x103d37,_0x49e2e4){return _0x103d37===_0x49e2e4;},'Nuzor':function(_0x2b47ab,_0x572c65){return _0x2b47ab%_0x572c65;},'uqgHN':_0x5863('‮177','$l]8'),'ywtPu':_0x5863('‫178','ONU*'),'PpSyZ':_0x5863('‫179','XSOV'),'IsqqG':_0x5863('‮17a','NHkX'),'jCrhq':function(_0x2ee105,_0x3c190d){return _0x2ee105(_0x3c190d);},'LJfgY':function(_0xaf791f,_0x4c5ba3){return _0xaf791f===_0x4c5ba3;},'hpKBw':_0x5863('‫17b','jNh!'),'OGCgV':function(_0x39d5e9,_0x2cb90b){return _0x39d5e9(_0x2cb90b);}};function _0x2593a7(_0x17d4b3){var _0x35fe0e={'zrMVg':_0x303de7[_0x5863('‫17c','CwZG')],'pgCFI':_0x303de7[_0x5863('‮17d','&[*Q')],'nLqUR':function(_0x3f5c87,_0x552857){return _0x303de7[_0x5863('‮17e','H&XV')](_0x3f5c87,_0x552857);},'NqMla':function(_0x1c1ab9,_0x56247e){return _0x303de7[_0x5863('‫17f','MI&0')](_0x1c1ab9,_0x56247e);},'pwBGM':_0x303de7[_0x5863('‮180','NHkX')],'MfRLQ':_0x303de7[_0x5863('‮181','38[Y')],'PBEmz':function(_0x5c4ea2,_0x55bdce){return _0x303de7[_0x5863('‮182','FS0A')](_0x5c4ea2,_0x55bdce);},'biCJm':function(_0xfb0e15,_0x4aafed){return _0x303de7[_0x5863('‮183','^akT')](_0xfb0e15,_0x4aafed);},'ohpug':_0x303de7[_0x5863('‫184','9(rN')],'QOJAI':_0x303de7[_0x5863('‫185','p5UU')],'WSeIC':function(_0x294165,_0x5cbce0){return _0x303de7[_0x5863('‮186','v]nL')](_0x294165,_0x5cbce0);},'ZKcOM':_0x303de7[_0x5863('‮187','CwZG')],'CqUAM':function(_0x576e1a,_0x1297e0){return _0x303de7[_0x5863('‫188','#FsO')](_0x576e1a,_0x1297e0);},'CiSNV':_0x303de7[_0x5863('‮189','rdhI')],'KrweL':_0x303de7[_0x5863('‮18a','ONU*')],'gaDge':function(_0x5d0ea8,_0x5e60f3){return _0x303de7[_0x5863('‫18b','38[Y')](_0x5d0ea8,_0x5e60f3);},'HINWr':_0x303de7[_0x5863('‫18c','BW4@')],'NYrVx':_0x303de7[_0x5863('‫18d','rFb%')],'lDSWd':_0x303de7[_0x5863('‮18e','p5UU')],'WpKMd':_0x303de7[_0x5863('‫18f','IpSn')],'OSlJv':function(_0xaaba08,_0x2d9e23){return _0x303de7[_0x5863('‮190','N4pS')](_0xaaba08,_0x2d9e23);},'DFXzY':_0x303de7[_0x5863('‮191','PbKa')]};if(_0x303de7[_0x5863('‫192','p5UU')](_0x303de7[_0x5863('‫193','UNjP')],_0x303de7[_0x5863('‫194','p5UU')])){return _0x303de7[_0x5863('‫195','4S$H')](a,b);}else{var _0x5e6c22='‮‮';if(_0x303de7[_0x5863('‮196','rdhI')](typeof _0x17d4b3,_0x303de7[_0x5863('‫197','!Kuz')])&&_0x303de7[_0x5863('‫198','V*Gm')](_0x5e6c22,'‮‮')){var _0x10b246=function(){var _0x5440d2={'EoBZn':function(_0x3c7336,_0x2bd5a8){return _0x303de7[_0x5863('‮199','NHkX')](_0x3c7336,_0x2bd5a8);},'shZPE':function(_0x5d2ac0){return _0x303de7[_0x5863('‫19a','!Kuz')](_0x5d2ac0);},'iTycx':function(_0xbab0b2,_0x208c3c){return _0x303de7[_0x5863('‫19b','c4yd')](_0xbab0b2,_0x208c3c);},'mAgCe':function(_0x3393d7,_0x240375){return _0x303de7[_0x5863('‮19c','KFfT')](_0x3393d7,_0x240375);},'gXpqg':_0x303de7[_0x5863('‮19d','c4yd')],'OzFew':_0x303de7[_0x5863('‫19e','jNh!')],'dYIVt':_0x303de7[_0x5863('‮19f','UNjP')],'IFQma':function(_0x50fe9b,_0x48b9b4){return _0x303de7[_0x5863('‫1a0','jNh!')](_0x50fe9b,_0x48b9b4);},'STObr':_0x303de7[_0x5863('‮1a1','7vns')],'bJVEA':function(_0x316d08,_0x2ed32e){return _0x303de7[_0x5863('‮1a2','oM9d')](_0x316d08,_0x2ed32e);},'VXOPv':_0x303de7[_0x5863('‫1a3','rdhI')],'fEaan':_0x303de7[_0x5863('‫1a4','UNjP')],'BTXbt':function(_0x1b6b7a,_0x447f19){return _0x303de7[_0x5863('‮1a5','R6Yx')](_0x1b6b7a,_0x447f19);}};if(_0x303de7[_0x5863('‮1a6','NHkX')](_0x303de7[_0x5863('‮1a7','oM9d')],_0x303de7[_0x5863('‮1a8','rFb%')])){(function(_0x1c944b){var _0x17184d={'AXjhe':function(_0x1117cc){return _0x5440d2[_0x5863('‮1a9','v]nL')](_0x1117cc);},'QdAaT':function(_0x9da88,_0x5d1ab8){return _0x5440d2[_0x5863('‫1aa','XSOV')](_0x9da88,_0x5d1ab8);},'acYeE':function(_0x5d0e16,_0x2388b3){return _0x5440d2[_0x5863('‮1ab','hIQD')](_0x5d0e16,_0x2388b3);},'vZOYU':_0x5440d2[_0x5863('‫1ac','p5UU')],'FSUFp':_0x5440d2[_0x5863('‮1ad','UNjP')],'yaJdR':_0x5440d2[_0x5863('‮1ae','yMr9')],'txers':function(_0x265f2d,_0x25cfcb){return _0x5440d2[_0x5863('‮1af','NNJ5')](_0x265f2d,_0x25cfcb);},'WxoVv':_0x5440d2[_0x5863('‫1b0','$l]8')],'YuDlr':function(_0x398253,_0x2216a7){return _0x5440d2[_0x5863('‫1b1','jNh!')](_0x398253,_0x2216a7);}};if(_0x5440d2[_0x5863('‫1b2','oPG(')](_0x5440d2[_0x5863('‫1b3','&[*Q')],_0x5440d2[_0x5863('‫1b4','Mx5%')])){return function(_0x1c944b){var _0x5f448a={'WQYhv':function(_0x16ee97,_0x386fa6){return _0x17184d[_0x5863('‫1b5','N4pS')](_0x16ee97,_0x386fa6);},'HaCks':function(_0x3e0350,_0xecaba4){return _0x17184d[_0x5863('‫1b6','hIQD')](_0x3e0350,_0xecaba4);},'nTxZO':_0x17184d[_0x5863('‫1b7','XSOV')],'lHQuF':_0x17184d[_0x5863('‮1b8','b#lZ')],'XhMNw':_0x17184d[_0x5863('‮1b9','c4yd')]};if(_0x17184d[_0x5863('‮1ba','v]nL')](_0x17184d[_0x5863('‮1bb',')fdI')],_0x17184d[_0x5863('‫1bc','HAYN')])){var _0x63921f=function(){var _0x2218ff={'gDZCo':function(_0x115223,_0x5e5c86){return _0x5f448a[_0x5863('‮1bd','GRzm')](_0x115223,_0x5e5c86);},'OVoTI':function(_0x56b899,_0x138f47){return _0x5f448a[_0x5863('‫1be','hwFg')](_0x56b899,_0x138f47);},'ivEms':_0x5f448a[_0x5863('‮1bf','s[UB')],'WOgBR':_0x5f448a[_0x5863('‫1c0','yMr9')]};(function(_0x111b27){return function(_0x111b27){return _0x2218ff[_0x5863('‮1c1','V*Gm')](Function,_0x2218ff[_0x5863('‫1c2','p5UU')](_0x2218ff[_0x5863('‫1c3','^akT')](_0x2218ff[_0x5863('‫1c4','NNJ5')],_0x111b27),_0x2218ff[_0x5863('‮1c5','hwFg')]));}(_0x111b27);}(_0x5f448a[_0x5863('‮1c6','R2jq')])('de'));};return _0x17184d[_0x5863('‮1c7','FS0A')](_0x63921f);}else{return _0x17184d[_0x5863('‫1c8','c4yd')](Function,_0x17184d[_0x5863('‫1c9','@Jse')](_0x17184d[_0x5863('‫1ca','v]nL')](_0x17184d[_0x5863('‫1cb',')fdI')],_0x1c944b),_0x17184d[_0x5863('‫1cc','N4pS')]));}}(_0x1c944b);}else{_0x5440d2[_0x5863('‫1cd','PbKa')](result,'0');}}(_0x303de7[_0x5863('‫1ce','B^c$')])('de'));}else{var _0x3f9bfd=_0x35fe0e[_0x5863('‮1cf','hIQD')][_0x5863('‫1d0','nM1K')]('|'),_0xc79382=0x0;while(!![]){switch(_0x3f9bfd[_0xc79382++]){case'0':var _0x5201db=firstCall?function(){if(_0x5440d2[_0x5863('‮1d1','GRzm')](_0x39ecf6,'‮')&&fn){var _0x341f39=fn[_0x5863('‮1d2','R6Yx')](context,arguments);fn=null;return _0x341f39;}}:function(_0x171f32){};continue;case'1':return _0x5201db;case'2':var _0x39ecf6='‮';continue;case'3':firstCall=![];continue;case'4':var _0x4d8d78='‮';continue;}break;}}};return _0x303de7[_0x5863('‫1d3','#FsO')](_0x10b246);}else{if(_0x303de7[_0x5863('‮1d4',')fdI')](_0x303de7[_0x5863('‮1d5','oM9d')]('',_0x303de7[_0x5863('‮1d6','NNJ5')](_0x17d4b3,_0x17d4b3))[_0x303de7[_0x5863('‫1d7','#qZN')]],0x1)||_0x303de7[_0x5863('‫1d8','b#lZ')](_0x303de7[_0x5863('‮1d9','NNJ5')](_0x17d4b3,0x14),0x0)){(function(_0x399381){return function(_0x399381){var _0x46559a={'totrl':_0x35fe0e[_0x5863('‫1da','b#lZ')],'lwQWX':function(_0xc7353f,_0x235f04){return _0x35fe0e[_0x5863('‮1db','PbKa')](_0xc7353f,_0x235f04);}};if(_0x35fe0e[_0x5863('‫1dc','IpSn')](_0x35fe0e[_0x5863('‫1dd','R2jq')],_0x35fe0e[_0x5863('‫1de','rFb%')])){return _0x35fe0e[_0x5863('‮1df','MI&0')](Function,_0x35fe0e[_0x5863('‮1e0','!Kuz')](_0x35fe0e[_0x5863('‫1e1','H&XV')](_0x35fe0e[_0x5863('‫1e2','@Jse')],_0x399381),_0x35fe0e[_0x5863('‫1e3','XSOV')]));}else{var _0x4c3378=_0x46559a[_0x5863('‮1e4',')fdI')][_0x5863('‫e1','@Jse')]('|'),_0x22c8c8=0x0;while(!![]){switch(_0x4c3378[_0x22c8c8++]){case'0':return _0x32b57f;case'1':var _0x58920d={'qzoSq':function(_0x103d53,_0x4c1a56){return _0x46559a[_0x5863('‫1e5','#FsO')](_0x103d53,_0x4c1a56);}};continue;case'2':firstCall=![];continue;case'3':var _0x32b57f=firstCall?function(){if(_0x58920d[_0x5863('‮1e6','KFfT')](_0x5429b0,'‮')&&fn){var _0x49420d=fn[_0x5863('‮88','PbKa')](context,arguments);fn=null;return _0x49420d;}}:function(_0x13fb8){};continue;case'4':var _0x5429b0='‮';continue;case'5':var _0xdceb70='‮';continue;}break;}}}(_0x399381);}(_0x303de7[_0x5863('‮1e7','v]nL')])('de'));;}else{(function(_0x190e2f){var _0x32531b={'ZecBZ':function(_0x3016a0,_0x5045e7){return _0x35fe0e[_0x5863('‫1e8','@Jse')](_0x3016a0,_0x5045e7);},'tkIwB':_0x35fe0e[_0x5863('‫1e9','8AfK')],'iWLVC':function(_0x477964,_0x17c843){return _0x35fe0e[_0x5863('‫1ea','Mx5%')](_0x477964,_0x17c843);},'zXAHk':_0x35fe0e[_0x5863('‮1eb','R6Yx')],'wTsZT':_0x35fe0e[_0x5863('‮1ec','NHkX')],'xncuN':function(_0x48fbf9,_0x21b996){return _0x35fe0e[_0x5863('‫1ed','&[*Q')](_0x48fbf9,_0x21b996);},'MowrR':_0x35fe0e[_0x5863('‮1ee','oPG(')],'enCJG':_0x35fe0e[_0x5863('‮1ef','oPG(')],'cwqtC':_0x35fe0e[_0x5863('‫1f0','B^c$')],'AOVcb':function(_0x20f59a,_0x33252e){return _0x35fe0e[_0x5863('‫1f1','8AfK')](_0x20f59a,_0x33252e);},'YiPJU':_0x35fe0e[_0x5863('‫1f2','GRzm')],'JxLbx':_0x35fe0e[_0x5863('‮1f3','!Kuz')],'xPZUC':_0x35fe0e[_0x5863('‫1f4','CwZG')]};if(_0x35fe0e[_0x5863('‫1f5','7vns')](_0x35fe0e[_0x5863('‮1f6','CwZG')],_0x35fe0e[_0x5863('‮1f7','#FsO')])){if(_0x130666){return _0x2593a7;}else{_0x32531b[_0x5863('‫1f8','!Kuz')](_0x2593a7,0x0);}}else{return function(_0x190e2f){if(_0x32531b[_0x5863('‫1f9','&[*Q')](_0x32531b[_0x5863('‫1fa','NHkX')],_0x32531b[_0x5863('‮1fb','Mx5%')])){_0x32531b[_0x5863('‮1fc','oPG(')]($,_0x32531b[_0x5863('‮1fd','8AfK')])[_0x5863('‮1fe','9(rN')](_0x32531b[_0x5863('‮1ff','rFb%')](_0x32531b[_0x5863('‮200','nM1K')](_0x32531b[_0x5863('‮201','IpSn')],_0x58f209),_0x32531b[_0x5863('‮202','N4pS')]))[_0x5863('‫203','V*Gm')]();_0x32531b[_0x5863('‫204','NNJ5')]($,_0x32531b[_0x5863('‮205','v]nL')])[_0x5863('‮206','oM9d')](_0x32531b[_0x5863('‮207','hIQD')],_0x32531b[_0x5863('‫208','p5UU')]);}else{return _0x32531b[_0x5863('‮209','KFfT')](Function,_0x32531b[_0x5863('‫20a','ONU*')](_0x32531b[_0x5863('‮20b','p5UU')](_0x32531b[_0x5863('‫20c','hIQD')],_0x190e2f),_0x32531b[_0x5863('‮20d','oPG(')]));}}(_0x190e2f);}}(_0x303de7[_0x5863('‮20e','GRzm')])('de'));;}}_0x303de7[_0x5863('‫20f','BW4@')](_0x2593a7,++_0x17d4b3);}}try{if(_0x303de7[_0x5863('‫210','$l]8')](_0x303de7[_0x5863('‫211','$l]8')],_0x303de7[_0x5863('‮212','c4yd')])){if(_0x130666){return _0x2593a7;}else{_0x303de7[_0x5863('‫213','B^c$')](_0x2593a7,0x0);}}else{var _0x2e30c4=_0x303de7[_0x5863('‮214','rdhI')][_0x5863('‫107','!Kuz')]('|'),_0x46d4f7=0x0;while(!![]){switch(_0x2e30c4[_0x46d4f7++]){case'0':_0x303de7[_0x5863('‫20f','BW4@')]($,document)[_0x5863('‮215','HAYN')](function(){_0x2f3fec[_0x5863('‫216','R6Yx')]($,_0x2f3fec[_0x5863('‮217','ONU*')])[_0x5863('‮218','jNh!')](_0x2f3fec[_0x5863('‮219','4fH8')](_0x2f3fec[_0x5863('‮21a','p5UU')](_0x2f3fec[_0x5863('‫21b','@Jse')],_0x482054),_0x2f3fec[_0x5863('‮21c','1RMd')]))[_0x5863('‫21d','FS0A')]();_0x2f3fec[_0x5863('‫21e','rFb%')]($,_0x2f3fec[_0x5863('‫21f','&[*Q')])[_0x5863('‮220','BW4@')](_0x2f3fec[_0x5863('‫221','38[Y')],_0x2f3fec[_0x5863('‫222','rFb%')]);});continue;case'1':var _0x482054=_0x303de7[_0x5863('‫223','MI&0')];continue;case'2':_0x303de7[_0x5863('‮186','v]nL')]($,_0x303de7[_0x5863('‮224','yMr9')])[_0x5863('‮225','V*Gm')](_0x303de7[_0x5863('‫226','B^c$')]);continue;case'3':_0x303de7[_0x5863('‮227','hwFg')]($,_0x303de7[_0x5863('‮228','R6Yx')])[_0x5863('‮229','p5UU')]();continue;case'4':var _0x2f3fec={'NynoP':function(_0x13fb1d,_0x362102){return _0x303de7[_0x5863('‫22a','4fH8')](_0x13fb1d,_0x362102);},'QwlRg':_0x303de7[_0x5863('‮22b','hIQD')],'aVNbb':function(_0x3fbff5,_0x1f3150){return _0x303de7[_0x5863('‫22c','PbKa')](_0x3fbff5,_0x1f3150);},'LclHi':_0x303de7[_0x5863('‫22d','NHkX')],'hoExh':_0x303de7[_0x5863('‮22e','BW4@')],'yRYTc':function(_0x1198aa,_0x30311f){return _0x303de7[_0x5863('‮22f','NNJ5')](_0x1198aa,_0x30311f);},'vKmeI':_0x303de7[_0x5863('‮230','XSOV')],'jDfhQ':_0x303de7[_0x5863('‫231','p5UU')],'vrSBL':_0x303de7[_0x5863('‮232','&[*Q')]};continue;}break;}}}catch(_0x308f71){}};_0xodh='jsjiami.com.v6';