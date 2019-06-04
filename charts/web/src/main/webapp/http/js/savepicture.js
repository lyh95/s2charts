define(function(require, exports, module) {
    var common = require("/base/http/js/module/echarts/echarts.common.js");
    var mychart = common.myECharts.getChart("content")   //getchart的API，用getchart来找图片的id content
    // var mychart = common.myECharts.getChart(document.getElementById('content.image'))  //getchart的API，用getchart来找图片的id content

    console.log(mychart.getOption())  //取option数据,是对象
    //验证数据能不能画图，重新画个容器，把option数据导进去，看能不能出图
    // var option = mychart.getOption();
    // $("#save-pic").click(function (){
    // console.log("savejson")
    //     $.ajax({
    //         type: "post",
    //         url: " /savejson",
    //         data:{
    //             option:option
    //         },
    //         // cache: false, //设置为 false 将不会从浏览器缓存中加载请求信息。
    //         // async: true, //(默认: true)，所有请求均为异步请求。发送同步请求，请将此选项设置为 false。同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    //         // timeout: 150000, //设置请求超时时间（毫秒）。此设置将覆盖全局设置。
    //         // datatype: "json",
    //         success: function (data, textStatus) {
    //             if (data == true){
    //                 // console.log(data)
    //                 {
    //                     alert(保存成功)
    //                 }
    //             }
    //        else (data == false)
    //             {
    //                alert(保存失败)
    //             }
    //             }
    // })
    // });
})