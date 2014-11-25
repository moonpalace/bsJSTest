/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14. 11. 12
 * Time: 오후 3:10
 * To change this template use File | Settings | File Templates.
 */
var resizeHandler = function(){
    var w = bs.WIN.size().w - 30;
    bs.Dom("#t1").S("width", w);
    bs.Dom("#t2").S("width", w);
    bs.Dom("#t3").S("width", w);
    bs.Dom("#t4").S("width", w);
    bs.Dom("#t5").S("width", w);
}
bs(function(){
        bs.WIN.on("resize", resizeHandler);

        console.log(bs.Dom("#t0").length);

        resizeHandler();

        bs.Dom("body").S(">", "<div id='t1'></div>");
        bs.Dom("body").S(">", "<div id='t2'></div>");
        bs.Dom("body").S(">", "<div id='t3'></div>");
        bs.Dom("body").S(">", "<div id='t4'></div>");
        bs.Dom("body").S(">", "<div id='t5'></div>");

        console.log(bs.Dom("#t1").length);
        console.log(bs.Dom("#t2").length);
        console.log(bs.Dom("#t3").length);
        console.log(bs.Dom("#t4").length);
        console.log(bs.Dom("#t5").length);
    }
);