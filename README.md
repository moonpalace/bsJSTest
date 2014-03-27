﻿bsJS
===

JavaScript lib for DOM, CORE, utility and so on

## 시작하기

1. 문서의 아무 곳이나 스크립트태그를 통해 bs를 삽입합니다.
    ```
    <script src="http://projectbs.github.io/bsJS/bs/bsjs.js"></script>
    ```

2. 삽입한 이 후에는 다음과 같은 형식으로 bs를 사용합니다.
    ```
    <script>
    bs( function(){
    	// 여기에 소스
    } );
    </script>
    ```

3. 간단히 dom을 생성하고 스타일과 내용, 이벤트 리스너를 일시에 지정해 봅니다.
    ```
    <script>
    bs( function(){
    	bs.Dom( '<div></div>' ).S( 
    		'<', 'body', // 부모를 body로
    		'html', '안녕', // html을 넣어준다
    		'width', 300, // 스타일을 지정한다.
    		'click', function( $e ){alert(1);} // 이벤트를 지정한다.
    	);
    } );
    </script>
    ```

## Documents
### Wiki
[bsJS Wiki](https://github.com/projectBS/bsJS/wiki)
### APIs
* bs core [[ko](https://github.com/projectBS/bsJS/wiki/doc1-core)][[ja](https://github.com/projectBS/bsJS/wiki/doc1-core-ja)]  
* bs base function [[ko](https://github.com/projectBS/bsJS/wiki/doc2-base-function)][[ja](https://github.com/projectBS/bsJS/wiki/doc2-base-function-ja)]  
* bs Dom [[ko](https://github.com/projectBS/bsJS/wiki/doc3-Dom)][[ja](https://github.com/projectBS/bsJS/wiki/doc3-Dom-ja)]  
* bs Unit Test [[ko](https://github.com/projectBS/bsJS/wiki/Unit-Test-of-BS-ko)][[ja](https://github.com/projectBS/bsJS/wiki/Unit-Test-of-BS-ja)]  
* Structure of BS [[ko](https://github.com/projectBS/bsJS/wiki/Structure-of-BS)][[ja](https://github.com/projectBS/bsJS/wiki/Structure-of-BS-ja)]  

### [showcase page](http://projectbs.github.io/bsShowCase/)  

### [demo(test) page](http://projectbs.github.io/bsTest/test/)

## License
Dual licensed under the MIT or GPL Version 2 licenses.  

## Contact us
#### [facebook group](https://www.facebook.com/groups/bs5js/?hc_location=stream)  

Copyright 2013.10 projectBS committee.
