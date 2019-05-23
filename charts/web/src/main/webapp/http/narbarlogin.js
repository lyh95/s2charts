define(function(require, exports, module) {

    $(function () {
        // console.log("checklogin")
        $.ajax({
            type: "get",
            url: " /checklogin",
            cache: false, //设置为 false 将不会从浏览器缓存中加载请求信息。
            async: true, //(默认: true)，所有请求均为异步请求。发送同步请求，请将此选项设置为 false。同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
            timeout: 150000, //设置请求超时时间（毫秒）。此设置将覆盖全局设置。
            // datatype: "json",
            success: function (data, textStatus) {

                if (data.code == "200") {
                    var username = data.username;
                    $("#go-login-btn").val(username);
                }
                if (data.code == "400"){
                    return false
                }
                else{
                    return false
                }
            },
            error:{

            }
        })
    });

})


