
<!--取localStorage中的id-->
// var userPic = localStorage.getItem("IdName");
// console.log(userPic)


$.ajax({
    type: "post",
    async: "false",//把同步请求改成了异步请求，异步会立即执行，取不到option
    url: " /getoption",
    // dataType:"text",
    success: function (data, textStatus) {

        for (var i=0; i<data.length;i++){
            var mywork=data[i].userPic
            $("#TheTotalNode").append("<div class='col-md-5 col-sm-12'><div class='box' id="+mywork+" style='height:290px;width:500px'></div></div>")
            var te=document.getElementById(mywork)
            console.log(te)
            var myChart = echarts.init(te);
            var option =JSON.parse(data[i].picOption)
            myChart.setOption(option);
           var myWork=""
        }

    },error:function (e) {
        console.log("请求失败——没有登录")
        alert("请先登录")
    }
})
// $.ajax({
//     type: "get",
//     async: "false",//把同步请求改成了异步请求，异步会立即执行，取不到option
//     url: " /getDateOption",
//     success: function (data, textStatus) {
//         var myWork="my"+data[0].userPic
//         $("#TheTotalNode").append("<div class=\"col-md-8 col-sm-12\">\n" + "<div class=\"box\" id=\"myWork\" style=\"height:260px;width:460px;background-color: #fff;margin-top: 5px\">\n" +
//             "</div></div>")
//         // console.log(data[0].picOption)
//         var myChart = echarts.init(document.getElementById('myWork'));
//         var option =JSON.parse(data[0].picOption)
//         myChart.setOption(option);
//     }
// })





