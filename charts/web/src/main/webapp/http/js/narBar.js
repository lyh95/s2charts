/**
 * Created by lmy on 2016/11/21.
 */
define(function(require, exports, module) {
    var narBar = require("/http/narBar.html.tpl");
    /**
     * 用户信息
     */
    var User = (function(){
        var userInfo = null;

        /**
         * 初始化数据
         */
        var init = function(){
            userInfo = null;

            //绑定事件
            bindEvent();
            //窗口拖拽
            dialogDrag();
        };

        /**
         * 获取用户登录信息
         */
        var getUserInfo =  function(callback){
            SGIS.API.get("user/is/login").json(function(re){
                userInfo = null;
                if(re && re.code == 0){
                    if(re.data){
                        //保存用户信息
                        userInfo = re.data;
                    }
                }
                if(userInfo == null){
                    //未登录
                    /*showLoginWindow();*/
                }else{
                    //已经登录
                    showUserInfo(userInfo.userName);
                }
                callback && callback(userInfo);
            });
        };

        /**
         * 展示登录窗口
         */
        var showLoginWindow = function(){
            //窗口高度
            $('#login-modal').modal("show");
            $('#login-span').removeClass("hide");
            $('#logout-span').addClass("hide");

            //删除登录名
            $("#login-name").html("");

            //判断是否保存用户名
            checkIsSaveUserLogin();
        };

        /**
         * 判断是否保存用户名
         */
        // var checkIsSaveUserLogin = function(){
        //     var cookie = Cookie.getCookies();
        //     if(cookie && cookie[0]){
        //         $("#login_form input[name='user_login']").val(cookie[0]);
        //         $("#login_form input[type='checkbox']").attr("checked",true);
        //     }else{
        //         $("#login_form input[name='user_login']").val("");
        //         $("#login_form input[name='user_password']").val("");
        //         $("#login_form input[type='checkbox']").attr("checked",false);
        //     }
        //     $("#login-modal input[name='user_login']").focus();
        // };

        /**
         * 设置是否保存用户名
         *
         * @param userLogin
         */


        /**
         * 展示用户信息
         */


        /**
         * 展示注销后
         */
        // var showLogouted = function(){
        //     $('#login-span').removeClass("hide");
        //     $('#register-span').removeClass("hide");
        //     $('#logout-span').addClass("hide");
        //
        //     //删除登录名
        //     $("#login-name").html("");
        //     $("#my-charts-btn").addClass("hide");
        // };

        /**
         * 绑定事件
         */
        var bindEvent = function(){
            //登录弹出


            // 回车事件
            // $("#login-modal input[name='user_login'],#login-modal input[name='user_password']")
            //     .on("keypress", function(e) {
            //         if (e.keyCode && e.keyCode == 13) {
            //             //登录
            //             login();
            //         }
            //     });

            //登录提交


            //注销

            //注册



        };

        /**
         * 判断是否登录
         */


        /**
         * 用户登录
         */
        //

        /**
         * 注销
         */



        //展示窗口拖拽
        var dialogDrag = function(){
            var mouseOffsetX=0;
            var mouseOffsetY=0;
            var isDraging=false;
            //  鼠标事件1 － 在标题栏上按下（要计算鼠标相对拖拽元素的左上角的坐标，并且标记元素为可拖动）
            $(".modal-header").mousedown(function(e){
                var e = e || window.event;
                mouseOffsetX = e.pageX -$(".modal-content").offsetLeft;
                mouseOffsetY = e.pageY - $(".modal-content").offsetTop;
                isDraging = true;
            });
            //  鼠标事件2 － 鼠标移动时（要检测，元素是否可标记为移动，如果是，则更新元素的位置，到当前鼠标的位置［ps：要减去第一步中获得的偏移］）
            document.onmousemove = function( e ){
                var e = e || window.event;

                var mouseX = e.pageX;   // 鼠标当前的位置
                var mouseY = e.pageY;

                var moveX = 0;  //  浮层元素的新位置
                var moveY = 0;

                if( isDraging === true ){

                    moveX = mouseX - mouseOffsetX;
                    moveY = mouseY - mouseOffsetY;

                    //  范围限定   moveX > 0 并且  moveX < (页面最大宽度 - 浮层的宽度)
                    //            moveY > 0 并且  movey < (页面最大高度 - 浮层的高度)

                    var pageWidth  = document.documentElement.clientWidth ;
                    var pageHeight = document.documentElement.clientHeight ;

                    var dialogWidth  = $(".modal-content").offsetWidth;
                    var dialogHeight = $(".modal-content").offsetHeight;

                    var maxX = pageWidth - dialogWidth;
                    var maxY = pageHeight- dialogHeight;

                    moveX = Math.min( maxX , Math.max(0,moveX) );
                    moveY = Math.min( maxY , Math.max(0,moveY) );

                    $(".modal-content").css("left",moveX + 'px')
                    $(".modal-content").css("top",moveY + 'px')
                }

            };

            //  鼠标事件3 － 鼠标松开的时候（标记元素为不可拖动即可）
            document.onmouseup = function(){
                isDraging = false;
            }

        };
        return {
            init:init,

        };
    })();

    /**
     * ui操作
     *
     */
    var UI = (function(){
        /**
         * 控制浏览器高度
         */
        var browerHeight = function() {

            //窗口高度
            $('#login-modal').css({
                'padding-top': function () {
                    var top = ($(window).height() / 2 - 250);
                    return top > 0 ? top : 0;
                }
            });
        };

        /**
         * 左侧的样式
         */
        var cssStyle = function(){
            var t = document.documentElement.scrollTop
                || document.body.scrollTop;
            //移除所有选中
            $(".row-left >div.title-name").removeClass("active");

            var activeIdIndex = 0;
            if($(window).width() > 770){
                $(".row-left").addClass("fixed-container");
                if($(window).scrollTop() >= ($(document).height()-$(window).height())){
                    activeIdIndex = 5;
                }else if (t < 260) {
                    activeIdIndex = 0;
                }else if (t >= 260 && t < 750) {
                    activeIdIndex = 1;
                }else if (t >= 750 && t < 998) {
                    activeIdIndex = 2;
                }else if (t >= 998 && t < 1234) {
                    activeIdIndex = 3;
                }else if (t >= 1234 && t < 1472) {
                    activeIdIndex = 4;
                }else if (t >= 1472 && t < 1982) {
                    activeIdIndex = 5;
                }else if (t >= 1982) {
                    activeIdIndex = 6;
                }
            }else{
                $(".row-left.fixed-container").removeClass("fixed-container");
                if (t < 288) {
                    activeIdIndex = 0;
                }else if (t >= 288 && t < 538) {
                    activeIdIndex = 1;
                }else if (t >= 538 && t < 782) {
                    activeIdIndex = 2;
                }else if (t >= 782 && t < 1038) {
                    activeIdIndex = 3;
                }else if (t >= 1038 && t < 1277) {
                    activeIdIndex = 4;
                }else if (t >= 1277 && t < 1782) {
                    activeIdIndex = 5;
                }else if (t >= 1782) {
                    activeIdIndex = 6;
                }
            }

            $("#name_"+activeIdIndex).addClass("active");
        };

        /**
         * 重置
         */
        var resize = SGIS.Util.throttle(cssStyle,100);

        /**
         * 绑定事件
         */
        var bindEvent = function(){
            //默认选中第一个
            $("#name_0").addClass("active");
            $("html,body").animate({scrollTop : 0}, 100);
            //绑定滚动样式
            window.onscroll = cssStyle;
        };


        return {
            resize:resize,
            browerHeight:browerHeight,
            bindEvent:bindEvent
        };
    })();

    var Index = (function(){
        /**
         * 初始化*
         * */
        var into = function(){
            //添加导航栏
            $("#navbar").html("").append($(narBar));
            //绑定事件
            bindEvent();

            UI.browerHeight();




        };
        var bindEvent = function(){


            //制图界面
            $("#go-tool-btn").click(function(){
                var url = SGIS.API.getToolURL("")+"http/";
                window.location=url;
            });


            //首页
            $("#go-cover-btn").click(function(){
                var url=SGIS.API.getToolURL("")+"cover.html";
                window.location=url;
            });




        };
        return {
            into : into
        };
    })();

    return Index;

})