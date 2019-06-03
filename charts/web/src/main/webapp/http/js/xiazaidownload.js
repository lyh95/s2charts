define(function (require, exports, module) {

    var common = require("/base/http/js/module/echarts/echarts.common.js");
    var userPic = $("input[name=chart-type-chart]").val() //name=chart-type-chart的值给userPic
    $("#download-pic").click(function () {
        $.ajax({
            type: "POST",
            url: "/checkdownload",
            data: {
                userPic:userPic   //json形式
            },
            success: function (data, textStatus) {
                console.log(data)
                if (data.code == 200) {
                    var $canvas = $("#content canvas")      //找到Echarts自己画的canvas
                    var canvas = $canvas[0];                 //jquery对象转换为dom对象
                    // console.log(canvas)
                    var img = new Image();      //定义新的img存放canvas数据
                    img.src = canvas.toDataURL("image/png");    //把canvas画布里的图案转变成base64编码格式的png，然后返回 Data URL数据。
                    console.log(img);
                    var a = document.createElement('a')    //添加a标签
                    var event = new MouseEvent('click')  //a标签的鼠标点击事件
                    a.download = '图片'   //a标签的download时的文件名
                    a.href = img.src    //a标签的下载链接为存放的canvas数据
                    a.dispatchEvent(event); //当鼠标点击时，通知a开始执行

                }
                if (data.code == 300) {
                    alert("没有权限")
                }
                if (data.code == 400){
                    alert("未登录")
                }
            }
        });
    })
})