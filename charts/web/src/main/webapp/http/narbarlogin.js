define(function (require, exports, module) {
//检查登录状态
    $(function () {
        $.ajax({
            type: "get",
            url: " /checklogin",
            success: function (data, textStatus) {
                if (data.code == 200) {
                    var username = data.username;
                    $("#go-login-btn>span").html(username);//改value
                    //$("ul li:eq(7)>a").attr("href", "#");//改属性
                    $("#go-login-btn").attr("data-toggle","dropdown")
                }
                else {
                    $("#go-login-btn").click(function () {
                        window.open("/login","_self")
                    })
                }
            }
        })
    })

})

