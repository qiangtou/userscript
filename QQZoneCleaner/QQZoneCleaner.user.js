// ==UserScript==
// @name         QQZoneCleaner
// @description  清爽的qq空间
// @namespace    http://weibo.com/qiangtoutou
// @include      http://*.qzone.qq.com/*
// @updateURL    https://userscripts.org/scripts/source/153004.meta.js
// @downloadURL  https://userscripts.org/scripts/source/153004.user.js
// @grant        unsafeWindow
// @version      2013-11-28 17:30:28
// ==/UserScript==

(function(w){  
	//默认的需要删除的class数组，可自行添加，删除
	var classArr = ['fn_gdtads', 'fn_paipai', 'fn_mayKnow', 'fn_openvip','fn_guanxiquan','fn_fnrecm','fn_birthdayGuy'],
	idArr = ['div_corner_ad_container','QM_My_App_Container','idQbossHotbar'],
	filterStr=['我的空间积分','转载','QQ超市','QQ农场','和QQ好友一起玩游戏','设置背景音乐','官方Qzone','添加了应用','我要把所有的动物','我和好友们都在玩','赶紧送礼物祝他生日快乐吧','发起的投票','让自己的空间与众不同','我刚刚在QQ空间领到预约码'];

	//v8版
	classArr=classArr.contact(['mod-side-nav-recently-used','icenter-right-ad','']);
	idArr=idArr.contact(['QM_Container_100002','QM_Container_100003','QM_Container_333']);

	//class选择器
	var _class = function (name) {
		var arr= document.getElementsByClassName(name);
		return Array.prototype.slice.call(arr);
	}
	//id选择器
	var _id = function (id) {
		return document.getElementById(id);
	}
	var QQZoneCleaner = {
		//删除指定元素
		remove : function (elem) {
			elem && elem.parentNode && elem.parentNode.removeChild(elem);
		},

		_getArr:function(){
			var i,j,el,arr,cls;
			arr=[];
			//id
			for (var j = idArr.length; j--; ) {
				el = _id(idArr[j]);
				arr.push(el);
			}
			//class
			for (var i = classArr.length; i--; ) {
				cls=classArr[i];
				el=_class(cls);
				arr=arr.concat(el);
			}
			//过滤消息内容
			arr=arr.concat(this._fromContent());
			//过滤用户
			arr=arr.concat(this._fromUser());
			return arr;
		},
		//内容
		_fromContent:function(){
			var arr=[];
			arr=_class('f_info');
			arr=this._filter(arr); 
			return arr;
		},
		//用户名
		_fromUser:function(){
			var arr=[];
			arr=_class('f_nick');
			arr=this._filter(arr); 
			return arr;
		},
		//文本
		_text:function(obj){
			var t='';
			var arr=obj.childNodes;
			for(var i=0,len=arr.length;i<len;i++){
				t+=arr[i].textContent;
			}
			t=t.replace(/\s/g,'');
			return t;
		},
		_filter:function(arr){
			var html,item,i,j,retArr=[];
			for(i=arr.length;i--;){
				item=arr[i];
				html=this._text(item);
				for(j=filterStr.length;j--;){
					if(html.indexOf(filterStr[j])!=-1){
						var p=item.parentElement.parentElement.parentElement;
						retArr.push(p);break;
					}
				}
			}
			return retArr;
		},
		//执行删除操作
		doRemove : function () {
			var arrs = this._getArr();
			for (var j = 0, len = arrs.length; j < len; j++)
				this.remove(arrs[j]);
		}
	};

	QQZoneCleaner.doRemove();

	w.QZONE.qzEvent.addEventListener('QZ_SCROLL',function(){
		QQZoneCleaner.doRemove();
	});

})(unsafeWindow);

