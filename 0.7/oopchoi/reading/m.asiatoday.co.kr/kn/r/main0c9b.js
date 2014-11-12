'use strict';
/*
window.atoo = {
	settingOpen:function(){console.log('settingOpen')},
	__alarmClosed:function(){U.alarmClosed('0')},
	alarm:function(){setTimeout(window.atoo.__alarmClosed,1000), console.log('alarm');},
	splashOff:function(){console.log('splashOff')},
	share:function(txt){alert('share txt = ' + txt);},
	alarmCount:function(){return '3';},
	autoPlayStart:function(){
		var idx = 0;
		if( location.href.indexOf('/atootalk') != -1 ){
			setTimeout(function(){
				U.autoPlayNext(++idx);
				setTimeout(function(){
					U.autoPlayEnd();
				},5000);
			}, 5000);
			return 3000;
		}		
		return -1;
	},
};*/
var menu = [
	'0,news,realtimenews,실시간뉴스',	
	'0,news,ranknews,많이 본 뉴스',
	'0,news,issueview,이슈&amp;뷰',
	'0,news,atootv,아투TV,이슈:1,뷰티.패션:2,문화·연예:3,대학:4,스포츠.관광:5,포럼.인터뷰:6',
	'0,news,alife,A기자라이프,비밀레시피:1,한 뼘 다이어트:2,연애학개론:3,엣지남녀:4',
	'1,news,world,국제',
//	'1,news,news,뉴스,정치:1,사회:2',
	'1,news,politics,정치',
	'1,news,society,사회',
	'1,news,economy,경제,산업:1,IT:2,부동산:3,유통·중기:4,증시:5,오토:6',
	'1,news,entersport,연예·스포츠,연예·문화:1,스포츠:2',
	'1,news,hope100,희망100세',
	'1,news,opinion,오피니언', 
	'0,news,why,Why와이',
	'0,news,photonews,포토뉴스',
	'0,i:myatoo,,My아투',
	'0,o:login,,로그인',
	'0,i:login,,로그아웃',
	'0,d:settingOpen,,푸시 및 WIFI 설정',
],
_gaq = [], 
U = {
	isApp:function(){return window.atoo ? 1 : 0;},
	//js -> native 
	splashOff:function(){!U.state.splashOff && window.atoo && window.atoo.splashOff && window.atoo.splashOff(), U.state.splashOff = 1;}, //스플래쉬를 제거함, 다음 3개에 적용(알람으로부터 아투톡톡, 노티피케이션으로 부터 아티클스,원래 메인의 인덱스)
	settingOpen:function(){window.atoo && window.atoo.settingOpen && window.atoo.settingOpen();},
	alarm:function(){window.atoo && window.atoo.alarm && window.atoo.alarm();}, //네이티브 알람설정창을 띄움
	alarmCount:function(){ if(window.atoo && window.atoo.alarmCount ) return parseInt(window.atoo.alarmCount()); else return 0; }, //등록된 알람수가져오기, 최초 아투톡톡 상단 아이콘을 뭘로 뿌릴지 결정할때 사용. '1'이면 활성화된 알람 있음!
	share:function( sns, txt, path ){
		var t0, t1, t2, t3;
		if( !sns || !txt || !path ) return;
		t2 = window.location;
		if( t2.pathname.indexOf('/view.php') == -1 ) t0 = t2.origin + ( t1 = t2.pathname.replace( /(.*)\/[a-zA-Z0-9]*\.html$/, '$1' ), t1.length > 0 ? t1 : '');
		else t0 = ( t1 = t2.href.replace( /(.*)\/view\.php\?r=(.*)$/, '$1' ), t1.length ) > 0 ? t1 : '';
		t0 = t0 + '/view.php?r=' + encodeURIComponent(path);
		if( window.atoo && window.atoo.share ){window.atoo.share( txt + ' ' + t0 ); return;}
		t0 = encodeURIComponent(t0), t3 = encodeURIComponent(txt), t1  = encodeURIComponent('\r\n');
		switch(sns){
		case 'facebook': t2 = { method:'popup', url:'http://www.facebook.com/sharer/sharer.php?u=' + t0, newwin:1 }; break;
		case 'twitter':	t2 = { method:'popup', url:'http://twitter.com/intent/tweet?text=' + t3 + '&url=' + t0, newwin:1 }; break;
		case 'kakaotalk': t2 = { 
			method:'web2app', 
			param:'sendurl?msg=' + t3 + '&url=' + t0 + '&type=link&apiver=2.0.1&appver=' + U.cst.appver + '&appid=' + U.cst.appid + '&appname=' + encodeURIComponent(U.cst.appname),
			a_store:'itms-apps://itunes.apple.com/app/id362057947?mt=8',
			g_store:'market://details?id=com.kakao.talk',
			a_proto:'kakaolink://',
			g_proto:'scheme=kakaolink;package=com.kakao.talk'
		}; break;
		case 'kakaostory': t2 = {
			method:'web2app',
			param:'posting?post=' + t3 + t1 + t0 + '&apiver=1.0&appver=' + U.cst.appver + '&appid=' + U.cst.appid + '&appname=' + encodeURIComponent(U.cst.appname),
			a_store:'itms-apps://itunes.apple.com/app/id486244601?mt=8',
			g_store:'market://details?id=com.kakao.story',
			a_proto:'storylink://',
			g_proto:'scheme=kakaolink;package=com.kakao.story'
		}; break;
		case 'band': t2 = {
			method:'web2app',
			param:'create/post?text=' + t3 + t1 + t0,
			a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
			g_store:'market://details?id=com.nhn.android.band',
			a_proto:'bandapp://',
			g_proto:'scheme=bandapp;package=com.nhn.android.band'
		}; break;
		case 'line': t2 = {method:'popup', url:'http://line.me/R/msg/text/?' + t3 + t1 + t0, newwin:0}; break;
		default: return false;
		}
		switch(t2.method){
		case 'popup': t2.newwin ? window.open(t2.url) : location.href = t2.url; break;
		case 'web2app':
			if(navigator.userAgent.match(/android/i)) setTimeout(function(){ location.href = 'intent://' + t2.param + '#Intent;' + t2.g_proto + ';end'}, 100);
			else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) setTimeout(function(){ location.href = t2.a_store; }, 200), setTimeout(function(){ location.href = t2.a_proto + t2.param }, 100); 
			else U.toast('이 기능은 모바일에서만 사용할 수 있습니다.');
			break;
		}
	},	
	autoPlayOff:function(){ //알람으로 아투톡톡에 와서 자동실행인 경우 플레이를 시작하는데, 중간에 유저가 웹의 컨트롤을 건드리면 백그라운드에서 자동실행중인 플레이어가 정지해야하므로 이때 필요. 결론적으로 모든 컨트롤이 항상 호출하면 됨.
		U.state.autoPlayStarted = 0;
		window.atoo && window.atoo.autoPlayOff && window.atoo.autoPlayOff();
	}, 
    autoPlayStart:function(){
		var t0;
		if( U.state.autoPlayStarted ) return false;
		U.state.autoPlayIdx = window.atoo && window.atoo.autoPlayTrack ? parseInt( window.atoo.autoPlayTrack() ) - 1 : 0;
		if( window.atoo && window.atoo.autoPlayStart ){
			t0 = parseInt( window.atoo.autoPlayStart() );
			//bs.log( 'autoPlayStart android time=' + t0 );
			if( t0 == -1 ) return false;
			U.state.autoPlayTime = Date.now() - ( t0 = parseInt(t0) ),
			U.state.autoPlayStarted = 1;
			return true;
		}else return false;
	},
	appver:function(){ 
        if( window.atoo ){
                if( window.atoo.appver ) return window.atoo.appver();
                else return '';
        }else return 'web';
	},
	apiver:function(){
        var t0 = U.appver(), t1;
        if( t0 == 'web' ) return 2;
        else if( t0 == '' ) return 1;
        else{
            t1 = t0.split('.');
            return t1[0] == '1' && t1[1] == '0' && parseInt( t1[2], 10 ) < 5 ? 1 : 2;
        }
	},
	//native -> js 
	addCallback:function( key, func ){
		if( !U[key] ) return alert('wrong key');
		if( typeof func == 'function' ) U.state.callbacks[key] = func;
	},
	alarmClosed:function(v){
		if( U.state.callbacks.alarmClosed ) U.state.callbacks.alarmClosed(parseInt(v));
	}, 
	autoPlayNext:function(idx){
		if( !U.state.autoPlayStarted ) return;
		U.state.autoPlayIdx = idx = parseInt(idx);
		U.state.autoPlayTime = Date.now();
		if( U.state.callbacks.autoPlayNext ) U.state.callbacks.autoPlayNext(idx);
	}, 
    autoPlayEnd:function(){
		if( !U.state.autoPlayStarted ) return;
		U.state.autoPlayStarted = 0;
		if( U.state.callbacks.autoPlayEnd ) U.state.callbacks.autoPlayEnd();
	}, 
	autoPlayStop:function(){
		if( !U.state.autoPlayStarted ) return;
		U.state.autoPlayStarted = 0;
		if( U.state.callbacks.autoPlayStop ) U.state.callbacks.autoPlayStop();
	},
	onPause:function(){
	    location.reload();
	},
	   
	cst:{
		apiBase:'http://m.asiatoday.co.kr/api',  //http://m.asiatoday.co.kr/kn/api
		newsStand:'http://newsstand.naver.com/?pcode=920',
		appver:1.0, appid:'kr.asiatodaymobile.android', appname:'아시아투데이',
		docCacheTime:4*60000,
		androidAppLink:'market://details?id=kr.asiatodaymobile.android',
	},
	state:{
		btmTopMode:0,
		searchBackurl:0, splashOff:0, appver:0,
		downCover:0, downCoverFixed:0, downCoverX:0, downCoverY:0,
		callbacks:{}, autoPlayStarted:0, autoPlayIdx:0, autoPlayTime:Date.now(),
	},
	start:function( url, start ){
		bs( function(){
			if( window.atoo && bs.local('guide') != '1'&& bs.ck('guide') != '1'){
				location.href = 'guide.html';
			}else{
				bs.get( function(data){U.contents(data), start();}, url );
			}
		} );
	},
	data:(function(){
		var data = { 
			main_top:[],
			main_news:['page', 'string'],
			hotkeyword:[],
			search:['page', 'number', 'keyword', 'string'],
			realtimenews:['page', 'string'],
			ranknews:['page', 'number'],
			issueview:['page', 'string'],
			atootv:['page', 'string', '@category', 'string'],
			alife:['page', 'string', '@category', 'string'],
//			news:['page', 'string', '@category', 'string'],
			politics:['page', 'string', '@category', 'string'],
			society:['page', 'string', '@category', 'string'],
			economy:['page', 'string', '@category', 'string'],
			world:['page', 'string', '@category', 'string'],
			entersport:['page', 'string', '@category', 'string'],
			hope100:['page', 'string'],
			opinion:['page', 'string'],
			why:['page', 'string', '@category', 'string'],
			photonews:['page', 'string', '@category', 'string'],
			atooday:['date', 'string'],
			atooday_date:[],
			timeline_main:['page', 'number'],
			timeline_sub:['seq', 'string'],
			girl_main:['page', 'string'],
			girl_sub:['seq', 'number'],
			girl_another:['seq', 'number'],
			view_content:['newskey', 'string', 'category', 'string', 'app', 'string', '@swipeType', 'number'],
			view_ranknews:[],
			view_timeline:['newskey', 'string'],
			view_timeline_rel:['newskey', 'string'],
			view_girl:[],
			memlogin:['i', 'string', 'p', 'string'], 
			memlogout:[],
			myatoo_list:['page', 'number'],
			myatoo_ins:['newskey', 'string'],
			myatoo_del:['newskeys', 'string'],
		}, arg = [];
		return function( group, end ){
			var t0, t1, i, j, k;
			if( typeof end != 'function' || !( t0 = data[group] ) ) return;
			for( arg.length = 0, arg[1] = U.cst.apiBase + '/' + group, i = 0, j = t0.length ; i < j ; i += 2 ){
				t1 = t0[i].charAt(0) == '@' ? ( k = t0[i].substr(1), 1 ) : ( k = t0[i], 0 );
				if( t1 == 1 && i > arguments.length - 3 ) break;
				if( k != arguments[i + 2] || typeof arguments[i + 3] != t0[i + 1] ) return console.log( arguments, t0 ), alert('통신요청시 key 또는 value형태가 맞지 않음 group='+group);
				arg.push( arguments[i + 2], arguments[i + 3] );
			}
			arg[0] = function( data, err ){
				var i;
				if( !data ) return end( null, err );
				try{data = JSON.parse(data);}catch(e){console.log('json parse error!'),i = 1;}
				if( i || data.status !== '200' ) return end(null);
				end(data);
			};
			if( !U.state.appver ) U.state.appver = U.appver();
	        arg[arg.length] = '@appver', arg[arg.length] = U.state.appver,
			arg[arg.length] = '@api_key', arg[arg.length] = 'dktldkxnepdl!@#45',
			bs.local('session') && ( arg[arg.length] = '@crossCookie', arg[arg.length] = 'PHPSESSID=' + bs.local('session') );
			if( group == 'atooday' ) arg[arg.length] = 'apiver', arg[arg.length] = U.apiver();
			bs.post.apply( null, arg );
		};
	})(),
	title:function( v, main, mode ){
		bs.Dom('[data-id=title]').S( 'html', v ),
		bs.Dom('[data-id=mode]').S( 'display', mode ? 'block' : 'none' );
		if( main ){
			bs.Dom('[data-id=gnb]').S( 'background-color', '#FFF', '*bgcolor', '#FFF' ),
			bs.Dom('[data-id=gnb0]').S( '@src', 'i/gnb0.png' ),
			bs.Dom('[data-id=gnb1]').S( '@src', 'i/gnb1.png', '*src0', 'i/gnb1.png', '*src1', 'i/gnb3.png' ),
			bs.Dom('[data-id=gnb2]').S( 'color', '#363636', 'border-left', '1 solid #dd322b' );
			bs.Dom('[data-id=home]').S( 'display', 'none' );
		}else{
			bs.Dom('[data-id=gnb]').S( 'background-color', '#dd322b', '*bgcolor', '#dd322b', 'border-top', '5px solid #000' ),
			bs.Dom('[data-id=gnb0]').S( '@src', 'i/gnb0r.png' ),
			bs.Dom('[data-id=gnb1]').S( '@src', 'i/gnb1r.png', '*src0', 'i/gnb1r.png', '*src1', 'i/gnb3r.png' ),
			bs.Dom('[data-id=gnb2]').S( 'color', '#FFF', 'border-left', '1px solid #FFF' );
			bs.Dom('[data-id=home]').S( 'display', 'block' );
		}
	},
	contents:function( v, isAdd ){bs.Dom('#contents').S( 'html' + ( isAdd ? '+' : '' ), v );},
	thumb:(function(){
		var err = function(e){
			var t0 = bs.Dom(this), t1 = parseInt(t0.S('*trycnt')) + 1;
			t1 == 2 ? t0.S( '@src', 'i/02_.jpg', 'up', null, 'cursor', null, '*trycnt', null ) : t0.S( '@src', 'i/02.png',  'isCapture', 1, 'up', re, 'cursor', 'pointer', '*trycnt', t1 );
		},
		re = function(e){
			var t0 = bs.Dom(this);
			t0.S( '@src', t0.S('*src') );
			U.downCover(t0);
			if( e ) e.prevent();
		},
		loaded = function(e){
			var t0 = bs.Dom(this), i; 
			if( t0.S('@src') == t0.S('*src') ){
				if( i = t0.S('*loaded') ) i(t0);
				t0.S( '*loaded', null, 'error', null, 'load', null, 'up', null, 'cursor', 'default' );
			}
		};
		return function( src, load, datakey ){return bs.Dom('<img/>').S( '*loaded', load ? load : null, '*src', src, '*trycnt', '0', '@src', src, '*id', datakey ? datakey : 'thumb' , 'error', err, 'load', loaded, 'this' );};
	})(),
	localUsable:function(){
		bs.local( 'test', 'test' );
		bs.log( '741', bs.local('test') == 'test' );
		return bs.local('test') == 'test' ? 1 : 0;
	},
	none:function(success){
		if( success ){
			bs.local( 'isNone', null );
			return false;			
		}else{
			if( bs.local('isNone') == '1' ){
				bs.local( 'isNone', null ), history.back();
			}else{
				location.href = 'none.html';
			}
			return true;
		}
	},	
	menuOpened:function(){
		return bs.Dom('[data-id=body]').S('position') == 'fixed' ? true : false;
	},
	loading:function( show, center ){
		var d = bs.Dom('[data-id=loading]');
		show ? d.S( 'display', 'block', 'bottom', center ? '50%' : '20px', '<', 'body' ) : d.S( 'display', 'none' );
	},
	gnbH:75,
	gnbVisible:0,
	gnbAddList:[],
	gnbAdd:function( h ){
		var t0 = bs.Dom('body'), t1, i, j; 
		for( i = 1, j = arguments.length ; i < j ; i++ ) 
			( t1 = arguments[i], t1 = typeof t1 == 'string' ? bs.Dom(t1) : t1 ).S( '<', t0, 'left', +t1.S('left'), '*left', +t1.S('left') ), U.gnbAddList.push( t1 );
		bs.Dom('[data-id=body]').S( 'top', U.gnbH = 70 + h + 5 );
		U.gnbVisible = 1;
	},
	gnbHide:function(){
		var t0, i, j;
		bs.Dom('[data-id=body]').S( 'top', 75 ), U.gnbVisible = 0;
		for( i = 0, j = U.gnbAddList.length; i < j ; i++ ) t0 = U.gnbAddList[i], t0.S( 'display', 'none' ); 
	},
	gnbShow:function(){
		var t0, i, j;
		bs.Dom('[data-id=body]').S( 'top', U.gnbH ), U.gnbVisible = 1;
		for( i = 0, j = U.gnbAddList.length; i < j ; i++ ) t0 = U.gnbAddList[i], t0.S( 'display', 'block' ); 
	},
	btmH:0,
	btmAdd:function( h, d ){
		var t;
		( typeof d == 'string' ? bs.Dom(d) : d ).S( '<', t = bs.Dom('[data-id=btmAdd]') ),
		( t = bs.Dom('[data-id=btm]') ).S( 'height', ( U.btmH = h ) ),
		bs.Dom('[data-id=body]').S( 'margin-bottom', U.btmH ), 
		bs.Dom('[data-id=btmTop]').S( 'bottom', U.btmH + 5 );
	},
	w:0,
	h:0,
	sizer:(function(){
		var f = [], isRegist;
		return function(v){
			if( v && f.indexOf(v) == -1 && typeof v == 'function' ) f[f.length] = v;
			if( !isRegist ){
				isRegist = 1,
				bs.WIN.sizer( function( w, h ){
					var i, j;
					try{
						U.w = w, U.h = h; 
						for( i = 0, j = f.length ; i < j ; i++ ) f[i]( w, h );
					}catch(e){
						
					}
				} );
			}
		};
	})(),
	bodyFix:(function(){
		var scrollTop = 0, fixed = 0, 
		repaint = function(){U.loading( 1, 0 ), setTimeout( repaintTimeount, 0.01 );}, 
		repaintTimeount = function(){U.loading(0);};
		bs( function(){
			U.sizer( function( w, h ){
				if( !fixed ) return;
				bs.Dom('[data-id=content]').S( 'height', U.h ),
//				bs.WIN.scroll( 0, 0 ),
				scrollTop = 0;
			} );
		} );
		return function( fix ){
			if( fix ){
				bs.Dom('[data-id=body]').S( 'position', 'fixed', 'top', ( U.gnbVisible ? U.gnbH : 75 ) - ( scrollTop = bs.WIN.scroll('t') )  ),
				bs.Dom('[data-id=content]').S( 'height', U.h - ( U.gnbVisible ? U.gnbH : 75 ) ),
				bs.WIN.scroll( 0, 0 );
			}else{
				bs.Dom('[data-id=body]').S( 'position', 'absolute', 'top', ( U.gnbVisible ? U.gnbH : 75 ) ),
				bs.Dom('[data-id=content]').S( 'height', 'auto' ),
				bs.WIN.scroll( 0, scrollTop ),
				repaint(); //안드로이드 4.3이하에서 position이 바뀔때 repaint가 안되는 버그 있음 
			}
			fixed = fix;
		};
	})(), 
	downCover:(function(){
		var timeout = function(){
			U.state.downCover && U.state.downCover.S( 'display', 'none' ), dom = 0;
			if( typeof end == 'string' ) location.href = end;
			else if( typeof end == 'function' ) end();
			end = 0;
		}, dom = 0, end = 0;
		return function( d, e, f ){ //bs.Dom, end(string=url, function=callback), fixed 화면인 경우는 1
			if(dom) return;
			end = typeof e == 'string' || typeof e == 'function' ? e : 0;
			if(!d) return timeout();
			dom = d = d.S ? d : bs.Dom(d),  
			U.state.downCover = U.state.downCover || bs.Dom('[data-id=downCover]') 
			U.state.downCoverFixed = f, 
			U.state.downCover.S( 'display', 'block', 'opacity', 0.5, 'left', ( U.state.downCoverX = +d.S('x') )- ( f ? 0 : bs.WIN.scroll('l') ), 'top', ( U.state.downCoverY = d.S('y') ) - ( f ? 0 : bs.WIN.scroll('t') ), 'width', d.S('w'), 'height', d.S('h') ),
			setTimeout( timeout, 0.1 );
		};
	})(),
	toast:(function(){
		var fade = function(){bs.ANI.style( d, 'opacity', 0, 'time', 0.2, 'ease', 'linear', 'delay', 2, 'end', fadeEnd );}, 
		fadeEnd = function(){d.S( 'display', 'none' ), hold = 0;}, d = 0, hold = 0;
		return function(text){
			if( hold || !text ) return;
			hold = 1, d = d || bs.Dom('[data-id=toast]'), 
			d.S( 'display', 'block', 'opacity', 0, 'html', text );
			bs.ANI.style( d, 'opacity', 1, 'time', 0.2, 'ease', 'linear', 'end', fade );
 		};
	})(),
	Audio:function( k, src ){
		bs.Audio || bs.cls( 'Audio', function( fn, clsFn, bs ){
			fn.NEW = function( id, src ){
				this.audio = new Audio(), this.S( 'src', src );
				bs.ANI.ani(this);
			},
			fn.loop = 1, fn._seek = 0, fn.loopCnt = 0,
			fn.play = function(seek){
				return this.isPause || this.isPlay ? 0 : ( this.stop(), this.isPlay = 1, this._seek = seek || 0, this.audio.play(), 1 );
			},
			fn.stop = function(){
				var a;
				if( this.isPlay || this.isPause ){
					if( this.isLoaded ){
						( a = this.audio ).pause(), a.currentTime = 0;
						if( this.progress ) this.progress( this, 0, a.duration );
					}
					return this.loopCnt = this.isPause = this.isPlay = 0, 1;
				}
			},
			fn.ANI = function(){
				var a = this.audio;
				if( !this.isLoaded ){
					if( a.readyState > 2 ) this.isLoaded = 1, this.load && this.load( this, a.currentTime, a.duration );
				}else if( this.isPlay ){
					if( this._seek ){
						if( this._seek >= a.duration ) this.stop();
						else a.currentTime = this._seek, this._seek = 0;
					}
					if( a.duration && a.currentTime > a.duration - .05 ){
						if( ++this.loopCnt == this.loop ) this.stop(), this.end && this.end(this);
						else a.pause(), a.currentTime = 0, a.play();
					}else if( this.progress ) this.progress( this, a.currentTime, a.duration );
				}
			},
			fn.seek = function(seek){
				if( this.isLoaded ) this.stop(), this.play(seek);
				else this.play(seek);
			},
			fn.pause = function(){if( !this.isPause && this.isPlay ) this.isPlay = 0, this.isPause = 1, this.pauseTime = this.audio.currentTime, this.audio.pause();},
			fn.resume = function(){if( this.isPause && !this.isPlay ) this.isPlay = 1, this.isPause = 0, this.audio.play();},
			fn.toggle = function(){this.isPause ? this.resume() : this.pause();},
			fn.S = function(){
				var t0, i = 0, j = arguments.length, k, v;
				while( i < j ){
					switch(k = arguments[i++]){
						case'src':case'currentTime':case'duration':t0 = this.audio; break;
						default:t0 = this;
					}
					if( i == j ) return t0[k];
					if( ( v = arguments[i++] ) === null ) delete t0[k];
					else switch(k){
						case'src':t0.src = v, this.isLoaded = 0; break;
						default:t0[k] = v;
					}
				}
				return v;
			};
		} );
		return bs.Audio( k, src );
	},
	ga:(function(){ //Google Analytics
		var load = function(){
			var ga, s;
			loaded = 1;
			ga = document.createElement('script'), ga.type = 'text/javascript', ga.async = true,
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js',
			s = document.getElementsByTagName('script')[0], s.parentNode.insertBefore(ga, s);
		}, loaded = 0;
		return function(){
			var i, j;
			_gaq.length = 0;
			_gaq.push(['_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']),
			_gaq.push(['_setAccount', 'UA-28730320-1']),
			_gaq.push(['_setDomainName', 'asiatoday.co.kr']);
			if( arguments.length % 4 == 0 ) for( i = 0, j = arguments.length ; i < j; i += 4 ){
				_gaq.push(['_setCustomVar', arguments[i], arguments[i+1], arguments[i+2], arguments[i+3]]);
			}
			_gaq.push(['_trackPageview', location.pathname.replace( '0.html', '.html' ) + location.hash]);
			if( !loaded ) load();
		};
	})(),
	ga_app:(function(){ //Google Analytics for App
		return function(){
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('require', 'displayfeatures');
			ga('require', 'linkid', 'linkid.js');
			var dimensionValue = arguments[0];
			ga('set', 'dimension1', dimensionValue);
			var dimensionValue = arguments[1];
			ga('set', 'dimension2', dimensionValue);
			var dimensionValue = arguments[2];
			ga('set', 'dimension3', dimensionValue);
			ga('create', 'UA-28730320-2', 'auto');
			ga('send', 'pageview');
		};
	})(),
	docCacheGet:function( k ){
		var t0, t1, t2, t3, t4, t5, v, i, j; 
		for( t0 = Date.now(), t1 = [], t2 = ( bs.local('docCacheKeys') || '' ).split(','), i = 0, j = t2.length ; i < j ; i++ ){
			t3 = t2[i].split('/'), t4 = decodeURIComponent(t3[0]), t5 = parseFloat(t3[1]);			
			if( k == t4 && t0 - t5 < U.cst.docCacheTime  ) {
				t0 = bs.local( k );
				if( !t0 || t0.length == 0 ) return 0;
				return {key:t4, time:t5, scrollTop:parseInt(t3[2]), html:t0, page: decodeURIComponent(t3[3])};	
			}
		}
		return 0;
	},
	docCacheSet:function( k, scrollTop, html, page ){
		var t0, t1, t2, t3, t4, t5, t6, i, j, maxCnt = 20; 
		if( !k || !html ) return 0;
		for( t0 = Date.now(), t1 = [], t2 = 0, t3 = ( bs.local('docCacheKeys') || '' ).split(','), i = 0, j = t3.length ; i < j ; i++ ){
			t4 = t3[i].split('/'), t5 = decodeURIComponent(t4[0]), t6 = parseFloat(t4[1]); //키/시간/스크롤위치/페이지 
			if( t0 - t6 > U.cst.docCacheTime || k == t5 ) bs.local( t5, null ); 
			else t1[t1.length] = t3[i];
		}
		if( t1.length + 1 > maxCnt ) t1.splice( 0, maxCnt - t1.length - 1 );
		t1[t1.length] = encodeURIComponent(k) + '/' + Date.now() + '/' + ( scrollTop ? scrollTop : 0 ) + '/' + encodeURIComponent(page);
		bs.local( 'docCacheKeys', t1.join(',') );
		if( html ) bs.local( k, html );
		return 1;
	},
	docCacheDel:function( k ){
		var t0, t1, t2, t3, i, j; 
		if(!k) return;
		for( t0 = [], t1 = ( bs.local('docCacheKeys') || '' ).split(','), i = 0, j = t1.length ; i < j ; i++ ){
			t2 = t1[i].split('/');		
			if( decodeURIComponent(t2[0]).indexOf(k) != -1 ) bs.local( k, null ); //경로가 있는지 확인 앞에 [..]접두어가 붙은것일 수 있으므로...
			else t0[t0.length] = t1[i];
		}
		bs.local( 'docCacheKeys', t0.join(',') );
	},
	blur:(function(){
		var callback = 0,
		init = function(){
			var t0, time = Date.now(), prevTime = 0, isUnactive = 0,
			unactive = function(type){ 
				if( isUnactive ) return;
				isUnactive = 1;
				if( callback ) callback(type);
			};
			bs.ANI.ani({
				ANI:function(t){isUnactive = 0, time = t;}
			});
			setInterval( function(){
				if( isUnactive ) return;
				if( time == prevTime ) unactive('setInterval');
				else prevTime = time;
			}, 500 );
			bs.WIN.on( 'blur', function(){if(isUnactive) return; unactive('blur');} );
			bs.WIN.on( 'unload', function(){if(isUnactive) return; unactive('unload');} );
			t0 = 0;
			if( typeof document.hidden != 'undefined' ) t0 = 'visibilitychange';
			else if( typeof document.mozHidden != 'undefined' ) t0 = 'mozvisibilitychange';
			else if( typeof document.msHidden != 'undefined' ) t0 = 'msvisibilitychange';
			else if( typeof document.webkitHidden != 'undefined' ) t0 = 'webkitvisibilitychange';
			t0 && document.addEventListener( t0, function(){
				if( isUnactive ) return;
				if( document.visibilityState != 'visible' ) unactive('visibilitychange');
			});				
		};
		return function( func ){
			if( typeof func != 'function') return;
			if( !callback ) init();
			callback = func;
		};
	})(),
	bsSignRemove:function( html ){
		return html.replace(/ data[-]bs[=]["][^"]*["]/g, '');
	},
	fontSizeIdx:function(fontSizeIdx){
        var t;
        if( fontSizeIdx >= 0 && fontSizeIdx <= 2 ) bs.local('fontSizeIdx', '' + fontSizeIdx );
        else{
            t = bs.local('fontSizeIdx');
            if( t == '0' || t == '1' || t == '2' ) return +t;
            else return 1;
        } 
	},
};
bs( function(){
	bs.Dom('body').S( 'html', bs.get( null, 'r/main.html' ) );
	var state = {
		isScroll:0,
		gnbHold:0, gnbOn:0, 
		menuOpened:0, menuH:0,
		mHold:0, mOpened:0, mDom:0, mTid:0,
		mLinkHold:0, mLinkDom:0, mLinkTid:0, mLinkUrl:0,
		btmTop:1,btmTopHold:0,btmTopTid:0,
		hotTid:0, hotSelected:0, hotMove:0, hotLeft:0, hotHold:0,
		searchOpend:0, searchEnded:0, searchLoading:0, searchFocusReq:0,
		searchKw:0,
	},
	cst = {
		menuLeft:285, menuOpacity:.5, menuTime:.35, menuEase:'quadraticOut',
		searchTime:.3, searchEase:'linear',
		
		mLogoH:39, 
		mW:285, mTime:.1, mEase:'linear',
		mTopW:280, mTopH:83, mFootW:150, mFootH:30, mCopyRH:25, 
		mItemW0:285, mItemW1:270, mItemW2:15, mItemW3:225, mItemW4:45, mItemH:40, 
		mSubItemW0:265, mSubItemW1:20, mSubItemH:32,
		hotTime:.34, hotEase:'quadraticOut',
	},
	ev = {
		mDown:function(e){
			if( state.mHold ) return;
			state.mHold = 1, state.mDom = bs.Dom(this),
			state.mTid = setTimeout( ev.mTimeout, 200 ); 
			if( e ) e.prevent();
		},
		mTimeout:function(){
			state.mHold = 0, state.mTid = 0, state.mDom = 0;
		},
		mUp:function(e){
			if( !state.mTid ) return;
			var i;
			clearInterval( state.mTid ), state.mTid = 0;
			if( -7 > ( i = e.dy ) || i > 7 ) return state.mHold = 0, state.mDom = 0;
			if( state.mOpened ){
				bs.Dom(state.mOpened.S('>0')).S( '@src', 'i/menu111.png' ),
				bs.ANI.style( state.mOpened.S('*sub'),
					'margin-top', function( v, d ){return +bs.Dom(d).S('*h');},
					'time', cst.mTime, 'ease', cst.mEase, 'end', ev.mEnd 
				);
				if( state.mOpened.S('*id') == state.mDom.S('*id') ) return state.mOpened = 0;
			}
			U.downCover( state.mDom ),
			state.mOpened = state.mDom,
			bs.Dom(state.mOpened.S('>0')).S( '@src', 'i/menu110.png' ),
			bs.ANI.style( state.mOpened.S('*sub'), 'margin-top', 0, 'time', cst.mTime, 'ease', cst.mEase, 'end', ev.mEnd );
		},
		mEnd:function(e){state.mHold = 0;},
		mLinkDown:function(e){
			if( state.mLinkHold ) return;
			state.mLinkDom = bs.Dom(this);
			state.mLinkHold = 1,
			state.mLinkTid = setTimeout( ev.mLinkTimeout, 200 ); 	
		},
		mLinkTimeout:function(){
			state.mLinkHold = 0, state.mLinkTid = 0, state.mLinkDom = 0;
		},
		mLinkUp:function(e){
			if( !state.mLinkTid ) return;		
			var t0, t1, i, j;
			clearInterval(state.mLinkTid), state.mLinkTid = 0;
			if( -7 > ( i = e.dy ) || i > 7 ) return state.mLinkHold = 0, state.mLinkDom = 0;
			t0 = decodeURIComponent(state.mLinkDom.S('*id')), t1 = bs.trim(t0.split('_')), t1 = t1.slice(1);
			if( window.atoo && window.atoo[t1[0]] && U[t1[0]] ) U.downCover( state.mLinkDom ), state.mLinkUrl = 0, state.mLinkHold = 0, state.mLinkDom = 0, U[t1[0]]();
			else {
				state.mLinkHold = 0, U.downCover( state.mLinkDom, ev.menuClose ), state.mLinkDom = 0;	
				if( t1[0].substring( 0, 4 ) == 'http' ) return window.open(t1.join('_'));
				else state.mLinkUrl = t1[0] + '.html' + ( t1[1] == '' || !t1[1] ? '' : '#' + t1[1] ) + ( ( t0 = t1[2] ) ? '/' + t0 : '' );
			}
		},
		btmTopDown:function(e){
			if( state.btmTopHold ) return;
			state.btmTopHold = 1, state.btmTopTid = setTimeout( ev.btmTopTimeout, 200 );
		},
		btmTopTimeout:function(){
			state.btmTopHold = 0, state.btmTopTid = 0;
		},
		btmTopUp:function(e){
			if( !state.btmTopTid ) return;
			var i;
			state.btmTopHold = 0, clearInterval( state.btmTopTid ), state.btmTopTid = 0;
			if( -7 > ( i = e.dy ) || i > 7 ) return;
			bs.WIN.scroll( 0, 0 );
		},
		menuOpen:function(e){
			if( state.gnbHold || state.gnbOn ) return;
			state.gnbHold = 1,
			bs.ANI.style( d.menuTop, 'left', 0, 'time', cst.menuTime, 'ease', cst.menuEase, 'end', ev.menuOpened ),
			bs.ANI.style( d.menu, 'left', 0, 'time', cst.menuTime, 'ease', cst.menuEase ),
			d.cover.S( 'display', 'block', 'opacity', cst.menuOpacity );		
			U.bodyFix(1);
		},
		menuOpened:function(){
			var t0, i, j;
			state.gnbHold = 0, state.gnbOn = state.menuOpened = 1,
			d.cover.S( 'cursor', 'pointer' ),
			d.gnb.S( 'left', cst.menuLeft ), d.btm.S( 'left', cst.menuLeft ), d.body0.S( 'margin-left', cst.menuLeft );
			for( i = 0, j = U.gnbAddList.length ; i < j ; i++ ) ( t0 = U.gnbAddList[i] ).S( 'left', parseFloat( t0.S('*left')) + cst.menuLeft );
		},
		menuClose:function(e){
			if( state.gnbHold || !state.gnbOn ) return;
			var t0, i, j;
			state.gnbHold = 1,
			bs.ANI.style( d.menuTop, 'left', -cst.menuLeft, 'time', cst.menuTime, 'ease', cst.menuEase, 'end', ev.menuClosed ),
			bs.ANI.style( d.menu, 'left', -cst.menuLeft, 'time', cst.menuTime, 'ease', cst.menuEase ),
			d.cover.S( 'display', 'none' ),
			d.gnb.S( 'left', 0 ), d.btm.S( 'left', 0 ), d.body0.S( 'margin-left', 0 );
			for( i = 0, j = U.gnbAddList.length ; i < j ; i++ ) ( t0 = U.gnbAddList[i] ).S( 'left', +t0.S('*left') );
			if( e ) e.prevent();
		},
		menuClosed:function( e, v ){
			state.gnbOn = state.gnbHold = state.menuOpened = 0,
			d.cover.S( 'display', 'none' ),
			U.bodyFix(0);
			if( state.mLinkUrl ) U.docCacheDel(state.mLinkUrl), location.href = state.mLinkUrl, state.mLinkUrl = 0;
		},
		searchDown:function(e){
			if( state.searchOpend ) ev.search();
			else state.searchFocusReq = 1, ev.searchOpen(), bs.WIN.scroll(0,0);
			if(e) e.prevent();
		},
		searchOpen:function(e){
			if( state.gnbHold ) return;
			state.gnbHold = 1, state.searchOpend = 1,
			bs.ANI.style( d.mode, 'opacity', 0, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnb, 'background-color', '#fff', 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS0.S( '@src', d.gnbS0.S( '*src1' ), 'this' ), 'right', 44, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS1, 'opacity', 1, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS2, 'opacity', 1, 'top', 5, 'time', cst.searchTime, 'ease', cst.searchEase, 'end', ev.searchOpened ),
			bs.ANI.style( d.gnbM, 'opacity', 0, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.title, 'opacity', 0, 'time', cst.searchTime, 'ease', cst.searchEase );
			if(e) e.prevent();
		},
		searchOpened:function(){
			state.gnbHold = 0;
			state.searchFocusReq ? ( d.gnbS3.S('f'), /*iOS에서 이상하게 동작!,*/ state.searchFocusReq = 0 ): 0;
		},
		searchClose:function(e){
			if( state.gnbHold ) return;
			if( U.state.searchBackurl ) return location.href = U.state.searchBackurl;
			state.gnbHold = 1, state.searchOpend = 0,
			bs.ANI.style( d.mode, 'opacity', 1, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS0.S( '@src', d.gnbS0.S( '*src0' ), 'this' ), 'right', 0, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS1, 'opacity', 0, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.gnbS2, 'opacity', 0, 'top', 40, 'time', cst.searchTime, 'ease', cst.searchEase, 'end', ev.searchClosed ),
			bs.ANI.style( d.gnbM, 'opacity', 1, 'time', cst.searchTime, 'ease', cst.searchEase ),
			bs.ANI.style( d.title, 'opacity', 1, 'time', cst.searchTime, 'ease', cst.searchEase ),
			d.gnbS3.S('b');
			if(e) e.prevent();
		},
		searchClosed:function(){
			state.gnbHold = 0;
		},
		searchClear:function(e){
			d.gnbS3.S( '@value', '' );
			if(e) e.prevent();
		},
		searchKeyDown:function(e){
			e.key('enter') && ev.search();
		},
		search:function(){
			var t0 = bs.trim(d.gnbS3.S('@value'));
			if( !t0 || t0.length == 0 ) return U.toast('검색어 입력하세요');
			t0 = bs.local('searchDocName') || 'search.html';
			t0 = t0 == 'search.html' ? 'search0.html' : 'search.html';
			bs.local('searchDocName', t0 )
			location.href = t0 + '#' + encodeURIComponent(bs.trim(d.gnbS3.S('@value'))) + ( location.href.indexOf('search.html') == -1 && location.href.indexOf('search0.html') == -1 ? '/' + encodeURIComponent(location.href) : '' );
		},
		hotDown:function(e){
			if( state.hotTid || state.hotHold || state.hotMove ) return;
			var t0, t1 = ( t0 = bs.Dom(e.domPoint()) ).S('*keyword');
			if( t1 && t1.length > 0 ){}else return;
			state.isScroll = 1, state.hotMove = 1, state.hotLeft = +d.hot.S('left'),
			state.hotSelected = t0, state.hotTid = setTimeout( ev.hotTimeout, 200 );
		},
		hotMove:function(e){
			if( state.hotHold || !state.hotMove ) return;
			var t0 = e.dy, t1 = e.dx;
			if( state.isScroll && ( -15 > t1 || t1 > 15 ) ) state.isScroll = 0;
			if( !state.isScroll && e ) e.prevent();
			if( state.isScroll && ( -15 > t0 || t0 > 15 ) ) state.hotMove = 0, t1 = 0;
			d.hot.S( 'left', state.hotLeft + t1 );
		},
		hotTimeout:function(e){
			state.hotTid = 0, state.hotSelected = 0;
		},
		hotUp:function(e){
			if( state.hotHold || !state.hotMove ) return;
			var t0, t1, t2;
		
			state.hotMove = 0, state.hotHold;
			t0 = +d.hot.S('left'), t1 = +d.hot.S('w');
			if( t0 > 50 || U.w - 50 > t1) t0 = 50;
			else if( t2 = ( U.w - 50 ) - t1, t0 < t2 ) t0 = t2; 
			bs.ANI.style( d.hot, 'left', t0, 'time', cst.hotTime, 'ease', cst.hotEase, 'end', ev.hotEnd );
			if( e ) e.prevent();
			
			if( !state.hotTid ) return;
			clearInterval(state.hotTid), state.hotTid = 0;
			if( -7 > ( t0 = e.dy ) || t0 > 7 ) return state.hotSelected = 0;
			if( !state.searchOpend ) ev.searchOpen();
			U.searchOpen( state.hotSelected.S('*keyword'), 0 );
			d.gnbS3.S( '@value', state.hotSelected.S('*keyword') ),
			state.hotSelected = 0, ev.search();
		},
		hotEnd:function(e){
			state.hotHold = 0;
		}, 
		homeDown:function(e){
			U.docCacheDel('index.html'), location.href = 'index.html', ev.menuClose();
			if( e ) e.prevent();
		},
	},
	d = {
		gnb:bs.Dom('[data-id=gnb]').S( 'left', 0, 'background-color', '#fff', 'this' ),
		gnbM:bs.Dom('[data-id=gnb0]').S( 'isCapture', 1, 'down', ev.menuOpen, 'opacity', 1, 'this' ),
		gnbS0:bs.Dom('[data-id=gnb1]').S( 'down', ev.searchDown, 'right', 0, 'this' ),
		gnbS1:bs.Dom('[data-id=gnb2]').S( 'down', ev.searchClose, 'opacity', 0, 'display', 'block', 'this' ),
		gnbS2:bs.Dom('[data-id=gnb3]').S( 'opacity', 0, 'top', 40, 'this' ),
		gnbS3:bs.Dom('[data-id=gnb4]').S( 'keydown', ev.searchKeyDown, 'this' ),
		gnbS4:bs.Dom('[data-id=gnb5]').S( 'down', ev.searchClear, 'this' ),
		gnbHome:bs.Dom('[data-id=home]').S( 'down', ev.homeDown, 'this' ),
		mode:bs.Dom('[data-id=mode]').S( 'opacity', 1, 'this' ),
		cover:bs.Dom('[data-id=cover]').S( 'transform', 'rotateZ(0)', 'opacity', 0, 'isCapture', 1, 'down', ev.menuClose, 'this' ),
		menu:bs.Dom('[data-id=menu]').S( 'transform', 'rotateZ(0)', 'left', -cst.menuLeft, 'this' ),
		menuTop:bs.Dom('[data-id=menuTop]').S( 'cursor', 'pointer', 'transform', 'rotateZ(0)', 'left', -cst.menuLeft, 'down', function(e){U.docCacheDel('index.html'), location.href = 'index.html', ev.menuClose();}, 'this' ),
		mList:bs.Dom('[data-id=mList]'),
		body:bs.Dom('[data-id=body]'),
		body0:bs.Dom('[data-id=body0]').S( 'transform', 'rotateZ(0)', 'margin-left', 0, 'this' ),
		content:bs.Dom('[data-id=content]'),
		title:bs.Dom('[data-id=title]').S( 'opacity', 1, 'this' ),
		btm:bs.Dom('[data-id=btm]').S( 'left', 0, 'this' ),
		btmTop:bs.Dom('[data-id=btmTop]').S( 'down', ev.btmTopDown, 'up', ev.btmTopUp, 'this' ),
		hot:bs.Dom('[data-id=hot]').S( 'left', 50, 'down', ev.hotDown, 'move', ev.hotMove, 'up', ev.hotUp, 'this' ),
	};
	window.atoo && ( bs.Dom('[data-id=mFoot]').S( 'height',3 ), bs.Dom('[data-id=mFoot] img').S( null ) );
	bs.css(bs.tmpl( bs.Dom('[data-id=mCss]').S('@text'), cst ));
	(function(){
		var arr = [], t0, t1, t2, t3, i, j, k, l, tmpl = {};
		t0 = bs.trim(bs.Dom('[data-id=mTmpl]').S('@text').split(',')), i = 0, j = t0.length; 
		while( i < j ) tmpl[t0[i++]] = t0[i++];
		for( t0 = '', i = 0, j = menu.length ; i < j ; i++ ){
			t1 = menu[i].split(','),
			t1['bgcolor'] = t1[0] == 0 ? '#FFF' : '#E9E9E9',
			t1['bgcolor2'] = t1[0] == 0 ? '#F2F2F2' : '#BABABA',
			t1[0] = 'mItemC' + t1[0];
			if( t1[1].indexOf(':') > -1 ){
				t3 = t1[1].split(':'), t1[1] = t3[1];
				if( t3[0] == 'd' && !window.atoo ) continue;
				t2 = bs.local('session');
				if( t3[0] == 'i' && !t2 ) continue;
				if( t3[0] == 'o' && t2 ) continue;
			}
			if( t1.length == 4 ) t0 += bs.tmpl( tmpl.i0, t1 );
			else{
				t0 += bs.tmpl( tmpl.i1, t1 );
				for( t2 = '', k = 4, l = t1.length; k < l ; k++ ) t3 = t1[k].split(':'), t2 += bs.tmpl( tmpl.s1, ( arr[0] = t1[1], arr[1] = t1[2], arr[2] = t3[0], arr[3] = t3[1], arr ) );
				t0 += bs.tmpl( tmpl.s0, ( arr[0] = t1[1] + '_' + t1[2], arr[1] = (-( l - 4 ) * (cst.mSubItemH + 1) ), arr[2] = t2, arr[3] = j - i, arr ) );
			}
		}
		d.mList.S( 'html', t0 ),
		bs.Dom('[data-id^=mIBtn_]').S( 'isCapture', 1, 'down', ev.mDown, 'up', ev.mUp ),
		bs.Dom('[data-id^=mItem_],[data-id^=mSubItem_],[data-id^=mTop_],[data-id^=mFoot_]').S( 'down', ev.mLinkDown, 'up', ev.mLinkUp );
		for( t0 = bs.Dom('[data-id^=mSub_]'), i = 0, j = t0.length ; i < j ; i++ )
			( t1 = bs.Dom( t0[i] ) ).S( 'margin-top', function( v, d ){
				return +bs.Dom(d).S('*h');
			}, 'display', 'block' ),
			bs.Dom('[data-id=mIBtn_' + t1.S('*id').substr('mSub_'.length) + ']').S( '*sub', t1 );
	})(),
	(function(){
		var loaded = function(data){
			var t0, t1, i, j;
			if( data && data.body && data.body.keyword && data.body.keyword.length > 0 ){
				bs.local( 'hotkeyword', data.body.keyword );
				data = bs.trim(data.body.keyword.split('|'));
			}else{
				if( t0 = bs.local('hotkeyword') ) data = bs.trim(t0.split('|'));
				else return d.hot.S( 'html', '' );
			}
			for( t0 = '', i = 0, j = data.length ; i < j ; i++ )
				t0 += '<span data-keyword="' + data[i] + '">' + data[i] + '</span> | ';														
			d.hot.S( 'html', t0.substr( 0, t0.length - 2 ) ), bs.js( function(){}, 'http://js2.keywordsconnect.com/m_asiatoday_kwd.js');//광고 
			
			if( state.searchKw ){
				t0 = d.hot.S('>');
				if( t0.length == 0 ) return;
				for( t0 = bs.Dom(t0), i = 0, j = t0.length ; i < j ; i++ ){
					( ( t1 = bs.Dom(t0[i]) ).S('*keyword') == state.searchKw ) ? t1.S( 'color', '#ed2729' ) : t1.S( 'color', null );
				}
			}
		};
		U.data( 'hotkeyword', loaded );
	})(),
	bs.WIN.on( 'scroll', function(){
    	if( U.state.btmTopMode == 1 ) return d.btmTop.S( 'display', 'block' );
    	if( state.btmTop != ( state.btmTop = bs.WIN.scroll('t') > 0 ? 0 : 1 ) )
    		d.btmTop.S( 'display', state.btmTop ? 'none' : 'block' );
	} ),
	U.btmTopMode = (function(mode){
		U.state.btmTopMode = mode; //1이면 항상보임!
		if( mode == 1 ) d.btmTop.S( 'display', 'block' );
    }),
	U.menuChange = (function(){
		var prev = 0;
		return function( d0, d1, d2 ){
			var t0, t1;
			if( prev ) prev.S( 'background-color', prev.S('*bgcolor') );
			if( state.mOpened ) 
				bs.Dom(state.mOpened.S('>0')).S( '@src', 'i/menu111.png' ),
				bs.Dom(state.mOpened.S('*sub')).S( 'margin-top', function( v, d ){return +bs.Dom(d).S('*h');} ),
				state.mOpened = 0;
			t0 = '[data-id=' + ( d1 && d2 ? 'mSubItem_' : 'mItem_' ) + d0 + ( d1 ? '_' + d1 : '' ) + ( d1 && d2 ? '_' + d2 : '' ) + ']',
			t1 = bs.Dom(t0);
			if( t1.length == 0 ) return prev = 0;
			if( t1.S('*has-sub') == '1' || ( d1 && d2 && !state.mOpened ) )
				state.mOpened = bs.Dom( '[data-id=mIBtn_' + d0 + '_' + d1 + ']' ),
				bs.Dom(state.mOpened.S('>0')).S( '@src', 'i/menu110.png' ),
				bs.Dom(state.mOpened.S('*sub')).S( 'margin-top', 0 );
			prev = t1.S( 'background-color', t1.S('*bgcolor2'), 'this' );
			U.menuOpened() && ev.menuClose();
		};
	})();
	U.searchOpen = function( keyword, focus ){keyword && d.gnbS3.S( '@value', bs.trim(keyword) ), state.searchFocusReq = focus ? 1 : 0, ev.searchOpen();}
	U.searchKeyword = function( keyword ){
		var t0, t1, i, j;
		state.searchKw = keyword;
		t0 = d.hot.S('>');
		if( t0.length == 0 ) return;
		for( t0 = bs.Dom(t0), i = 0, j = t0.length ; i < j ; i++ ){
			( ( t1 = bs.Dom(t0[i]) ).S('*keyword') == state.searchKw ) ? t1.S( 'color', '#ed2729' ) : t1.S( 'color', null );
		}
	};
	var topHold  = 0;
	U.sizer( function(){ //옵티머스 기본브라우저에서 fixed top 문제가 발생 
		if( topHold == 0 ){
			topHold = 1;
			setTimeout( function(){
				topHold = 0, d.gnb.S( 'top', 0 ), d.cover.S( 'top', 0 ), d.menuTop.S( 'top', 0 ), d.btm.S( 'bottom', 0 );
			}, 100 );
		}
	} );
});


