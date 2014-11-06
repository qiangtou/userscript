// ==UserScript==
// @name         WeiboCleaner
// @description  去掉微博广告
// @namespace    http://weibo.com/qiangtoutou
// @include      http://*weibo.com/*
// @grant        unsafeWindow
// @version      2014-10-31 18:07:41
// ==/UserScript==

var $=function(selector){
	if(!(this instanceof $))return new $(selector);
	var list=document.querySelectorAll(selector)
	this.data= Array.prototype.slice.call(list);
	return this;
}
$.prototype={
	add:function(selector){
		this.data=this.data.concat($(selector).data);
		return this;
	},
	remove:function(){
		this.data.forEach(function(o){
			console.log(o,'被移除')
			o.remove();
		});
		return this;
	}
}

setInterval(function(){
$('#v6_pl_ad_bottomtip')
.add('#v6_pl_rightmod_updatev6')
.add('#v6_pl_content_biztips')
.add('#v6_pl_rightmod_recominfo')
.add('#v6_pl_rightmod_ads36')
.add('#WB_webim')
.add('[feedtype=ad]')
.add('#v6_pl_rightmod_noticeboard').remove();
},400);

