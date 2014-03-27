bs['plugin+']('method', 'linklist', (function() {
    console.log('linkList');

    var result = function($target,$data, $W, $H, $directtionNavi, $directtionContents) {
        var idx=0
        var t0, t1, t2, i, j, data=$data.navi, width=$W ? $W : 400, height=$H ? $H : 400
        var directionNavi=$directtionNavi ? $directtionNavi : 0 // 0이면 가로
        var directionContents=$directtionContents ? $directtionContents : 0 // 0이면 가로
        var naviList=[], contentList=[]
        // 실제 컨테이너부분
        var container=bs.Dom('<div></div>').S('<',$target,'display', 'block', 'position', 'relative', 'background', '#eee', 'width', width, 'height', height,'this')
        // 메뉴 부분
        var controller=bs.Dom('<div></div>').S('position', 'absolute','this')
        container.S('>', controller)
        for(i=0, j=data.length; i < j; i++) {
            t1=bs.Dom('<div></div>').S(
                'html', data[i].title,
                'cursor', 'pointer',
                'padding', 5,
                'background', '#ee33ee',
                '@idx', i,
                'mousedown', directionContents ? function() {bs.ANI.tween(contents, 'margin-top', -this.idx * height, 'time', 0.6, 'ease', 'circleInOut')} : function() {console.log(this.idx),bs.ANI.tween(contents, 'margin-left', -this.idx * width, 'time', 0.6, 'ease', 'circleInOut')},
                'this'
            );
            naviList.push(t1)
            directionNavi ? t1.S() : t1.S('float', 'left');
            controller.S('>', t1)
        }
        container.S('>', bs.Dom('<div></div>').S('height', 1, 'clear', 'both','this'))
        var contentsBox=bs.Dom('<div></div>').S('overflow', 'hidden', 'width', width, 'height', height,'this')
        container.S('>', contentsBox)
        var contents=bs.Dom('<div></div>').S('margin-left', 0, 'margin-top', 0, 'width', j * width, 'display', 'block','this')
        contentsBox.S('>', contents)
        for(i=0, j=data.length; i < j; i++) {
            t1=bs.Dom('<div></div>').S(
                'width', width, 'height', height,
//                'html','<img src=' + data[i].bgImage+'>',
                'background-image','url('+data[i].bgImage+')',
                'background-size', 'cover',
                'this'
            )
            contentList.push(t1)
            directionContents ? t1.S() : t1.S('display', 'inline-block', 'float', 'left','this');
            contents.S('>', t1)
        }
        container.S('>', bs.Dom('<div></div>').S('height', 1, 'clear', 'both','this'))
        return {
            box: container, // 컨테이너 자체를 돌려받을수 있어야겠고..
            naviBox: controller, // 이놈은 css컨트롤 제어권을 줘야겠음
            naviList: naviList,
            contentsList: contentList // 컨텐츠 리스트를 받아야겠군
        }
    }
    return result
})(), 1.0);