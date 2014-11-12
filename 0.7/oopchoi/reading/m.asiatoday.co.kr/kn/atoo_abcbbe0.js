var _v_abc_week = "5";	
var _v_abc_hours = "9";	
var _v_org = "4D564D32303132303038";		
var _today = new Date();					
var _week =_today.getDay(); 				
var _hours =_today.getHours();			
var _time =_today.getTime();				

if (typeof _abc_memberKey == 'undefined') {
	var _abc_memberKey = "57454232303132303731";	
	var _abc_siteType = "W";	
	
	
	var _abcnet_ls = "http://abc.seetoc.com/logging/log.do";		
	var _v_abcnet_ls = "http://211.115.110.128/dataCollection.do";
	
	var _abcnet_click_logging_max = 1;
	var _abcnet_click_logging_num = 0;
	var _abcnet_click_images = new Object();
	var _v_abcnet_click_images = new Object();
	
	if (document.location.protocol == "https:") {
		_abcnet_ls = "https://abc-ssl.seetoc.com/logging/log.do";
		_v_abcnet_ls = "https://211.115.110.128/dataCollection.do";	
	}
	
	
	var _abcnet_verification_images = new Object();
	
	
	for (var i=0; i < _abcnet_click_logging_max; i++) {
		_abcnet_click_images[i] = new Image();
		_v_abcnet_click_images[i] = new Image();		
	}
	
	function trim(str) {
	        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	
	function abc_click_logging(url) {
		var _abcnet_request = url;						
		var _abcnet_referrer = abc_getReferrer();		
		var _abcnet_pcid = abc_getCookieStr("ABCPCID");	
		var _abcnet_sid = abc_getCookieStr("ABCSID");	
		var _abcnet_agent = navigator.userAgent;		
		var binfo = abc_getBI();
		var now = new Date();
	
	    if ( typeof(_abc_memberKey) == 'undefined' ) {
	        return;
	    }
	    
	    if ( typeof(_abc_siteType) == 'undefined' ) {
	    	_abc_siteType = "undefined";   	
	    }
	    
	    _abc_memberKey = trim(_abc_memberKey);
	    _abc_siteType = trim(_abc_siteType);
	                
		var _abcnet_target_url = _abcnet_ls +
							"?" +
							"MEMBERKEY=" + _abc_memberKey +
							"&SITETP=" + _abc_siteType +
							"&URI=" + abc_encodeStr(_abcnet_request) +
							"&REFERRER=" + abc_encodeStr(_abcnet_referrer) + 
							"&" + abc_encodeStr(_abcnet_pcid) + 
							"&" + abc_encodeStr(_abcnet_sid) + 
							"&BINFO=" + abc_encodeStr(binfo) + 
							"&WD=" + _week +
							"&HOUR=" + _hours +
							"&CTIME=" + _time;
		
	
		_abcnet_click_logging_num++;
		_abcnet_click_images[_abcnet_click_logging_num % _abcnet_click_logging_max].src = _abcnet_target_url;
	
		
		if (_v_abc_week == _week && _v_abc_hours == _hours) {
			var _v_abcnet_target_url = _v_abcnet_ls +
							"?" +
							"AUID=" + _abc_memberKey +
							"&SITETYPE=" + _abc_siteType +
							"&URL=" + abc_encodeStr(_abcnet_request) +
							"&REFERRER=" + abc_encodeStr(_abcnet_referrer) +
							"&" + abc_encodeStr(_abcnet_pcid) +
							"&" + abc_encodeStr(_abcnet_sid) +
							"&BINFO=" + abc_encodeStr(binfo) +
							"&CURWEEK=" + _week +
							"&CURHOUR=" + _hours +
							"&CURTIME=" + _time +
							"&ORG=" + _v_org; 
	
			_v_abcnet_click_images[_abcnet_click_logging_num % _abcnet_click_logging_max].src = _v_abcnet_target_url;
		}
	
	}
	
	
	
	function abc_getReferrer() {
		var my_ref = self.document.referrer;
	
		var parent_href = "";
		var parent_ref = "";
	
		try {
			parent_href = top.document.location.href;
			parent_ref = top.document.referrer;
		} catch(e) {
			return my_ref;
		}
	
		if (my_ref == parent_href)
			return parent_ref;
	
		return my_ref;
	}
	
	function abc_getCookieStr(name) {
		var values = "";
	
		var domain = "";
		
		if ((typeof _abc_domain) != "undefined" && _abc_domain != "" && abc_checkDomainSuffix(_abc_domain)) {
			domain = _abc_domain;
		} else {
			domain = document.domain;
		}
		
		values = abc_makeCookie(name, 10, "/", domain);
		
		if (values != null && values != "") {
			var cookies = "";
			
			cookies += name + "=" + values;
	
			return cookies;
		} else {
			return document.cookie;
		}
	}
	
	function abc_makeCookie(name, length, path, domain) {
		var today = new Date();
		var expiredDate = new Date(2100, 1, 1); 
		var cookie;
		var value;
	
		cookie = abc_getCookie(name);
		
		if (cookie != null) {
			return cookie;
		}
	
		var values = new Array();
	
		for (var i = 0; i < length; i++) {
			values[i] = "" + Math.random();
		}
	
		value = today.getTime();
	
		for (var i = 0; i < length; i++) {
			value += values[i].charAt(2);
		}
		
		abc_setCookie(name, value, expiredDate, path, domain);
	
		return value;
	}
	
	
	function abc_getBI() {
		var str = "";	
		var strScreenSize = "";
	
		var ws = window.screen;													
	
		if ( ws != null && ws != "undefined" ) {
			strScreenSize = screen.width + "x" + screen.height;
		}
		str += "n_ss=" + strScreenSize + "; ";				
	
		var cs = "-";
		var nv = navigator;
	
		if (nv.language) {  
			cs = nv.language.toLowerCase();				
		} else if (nv.userLanguage) {
			cs = nv.userLanguage.toLowerCase();
		}
	
		str +="n_cs=" + cs + "; ";	
	
		return str;					
	}
	
	function abc_getCookie(name) {
		var dc = document.cookie;
		var arg = name + "=";
		var alen = arg.length;
		var clen = dc.length;
		var i = 0;
		
		while (i < clen) {
			var j = i + alen;
	
			if (dc.substring(i, j) == arg) {
				var endstr = dc.indexOf(";", j);
				if (endstr == -1) endstr = dc.length;
				return unescape(dc.substring(j, endstr));
			}
	
			i = dc.indexOf(" ", i) + 1;
	
			if (i == 0)
				break;
		}
	
		return null;
	}
	
	function abc_setCookie(name, value, expires, path, domain) {
		
		if(name == "ABCPCID"){
			document.cookie = 
				name + "=" + escape(value)
				+ "; expires="+expires.toGMTString()
				+ "; path=" + path
				+ "; domain=" + domain ;
		} else {
			document.cookie = 
				name + "=" + escape(value)
				+ "; path=" + path
				+ "; domain=" + domain;
		}
		
	}
	
	function abc_encodeStr(s) {
		if (typeof(encodeURI) == 'function') {
			s = encodeURI(s);
			s = s.split("#").join("%23");
			return s;
		} else
			return escape(s);
	}
	
	function abc_checkDomainSuffix(domain) {
		var _host   = document.domain;
		var _hosts = _host.split('.');
		var _domains = domain.split('.');
	
		var diff = _hosts.length - _domains.length;
	
		_host = "";
		
		for(var i = diff; i < _hosts.length; i++ ){
			_host += _hosts[i];
			if(i != _hosts.length - 1)
				_host += ".";
		}
		
		if(_host != domain){
			return false;
		}
	
		return true;
	}
	
	abc_click_logging(document.location.href);
}