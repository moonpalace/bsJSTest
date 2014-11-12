/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14. 11. 12
 * Time: 오후 3:10
 * To change this template use File | Settings | File Templates.
 */
var resizeHandler = function(){
    console.log("resize~~~~!");
}

bs.Dom(this).S("resize", resizeHandler);
bs(function(){
    console.log("loaded!");
});