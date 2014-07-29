var file, virtual, args, method;
exports.controller = {
	index:function( v0, v1 ){
		bs.log( '/index.js :: index', v0, v1 );
		file = bs.router('file'),
		virtual = bs.router('virtual'),
		args = bs.router('arguments'),
		method = bs.router('method');
		bsTest( 'file', function(){
			return file;
		}, 'controller/index.js' );
		bsTest( 'virtual', function(){
			return virtual;
		}, '/' );
		bsTest( 'args1', function(){
			return args[0];
		}, v0 );
		bsTest( 'args2', function(){
			return args[1];
		}, v1 );
		bsTest( 'method', function(){
			return method;
		}, 'index' );
	},
	test:function( v0, v1 ){
		bs.log( '/index.js :: test', v0, v1 );
		file = bs.router('file'),
		virtual = bs.router('virtual'),
		args = bs.router('arguments'),
		method = bs.router('method');
		bsTest( 'file', function(){
			return file;
		}, 'controller/index.js' );
		bsTest( 'virtual', function(){
			return virtual;
		}, '/' );
		bsTest( 'args1', function(){
			return args[0];
		}, v0 );
		bsTest( 'args2', function(){
			return args[1];
		}, v1 );
		bsTest( 'method', function(){
			return method;
		}, 'test' );
	}
};