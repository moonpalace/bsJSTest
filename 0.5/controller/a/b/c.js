var file, virtual, args, method;
exports.controller = {
	index:function( v0, v1 ){
		bs.log( '/a/b/c.js :: index', v0, v1 );
		file = bs.router('file'),
		virtual = bs.router('virtual'),
		args = bs.router('arguments'),
		method = bs.router('method');
		bsTest( 'file', function(){
			return file;
		}, 'controller/a/b/c.js' );
		bsTest( 'virtual', function(){
			return virtual;
		}, '/a/b/' );
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
	d:function( v0, v1 ){
		bs.log( '/a/b/c.js :: d', v0, v1 );
		file = bs.router('file'),
		virtual = bs.router('virtual'),
		args = bs.router('arguments'),
		method = bs.router('method');
		bsTest( 'file', function(){
			return file;
		}, 'controller/a/b/c.js' );
		bsTest( 'virtual', function(){
			return virtual;
		}, '/a/b/' );
		bsTest( 'args1', function(){
			return args[0];
		}, v0 );
		bsTest( 'args2', function(){
			return args[1];
		}, v1 );
		bsTest( 'method', function(){
			return method;
		}, 'd' );
	}
};