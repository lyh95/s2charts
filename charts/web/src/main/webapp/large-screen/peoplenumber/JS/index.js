// define(function (require, exports, module) {
//定义表格
var container = document.getElementById('data-edit');
var hot=new Handsontable(container,{
    data:[],
    width:400,
    contextMenu: true,
    manualRowResize: true,
    manualColumnResize: true,
    afterChange:function(changes,source) {
        if (source==='loadData'){
            return;
        }
        if (changes!=null) {
// console.log(123456)
            var dateList = this.getSourceData()
            var updateList=JSON.parse(JSON.stringify(dateList))
            console.log(updateList)
            var IDName=$('#edit-button').parent().attr('id');
            var IdLastNumber= IDName.substring(11);
            var x=IdLastNumber;
            if (x=='1') {
                var option1 = myChart1.getOption();
                option1.series[1].data =updateList[1];
                option1.xAxis[0].data =updateList[0];
                myChart1.setOption(option1);
            }else if (x=='2') {
                var option2 = myChart2.getOption();
                option2.series[1].data =updateList[1];
                option2.xAxis[0].data =updateList[0];
                myChart2.setOption(option2);
            }else if (x=='3') {
                var option3 = myChart3.getOption();
                option3.xAxis[0].data =updateList[0];
                updateList[0].splice(0,1)
                updateList[1].splice(0,1)
                updateList[2].splice(0,1)
                updateList[3].splice(0,1)
                option3.series[0].data =updateList[1];
                option3.series[1].data =updateList[2];
                option3.series[2].data =updateList[3];
                myChart3.setOption(option3);

            }else if (x=='4') {
                var option4 = myChart4.getOption();
                // console.log(updateList)
                updateList[0].splice(0,1)
                updateList[1].splice(0,1)
                updateList[2].splice(0,1)
                updateList[3].splice(0,1)
                updateList[4].splice(0,1)
                option4.xAxis[0].data =updateList[0];
                option4.series[0].name ='总数';
                option4.series[1].name ='教授';
                option4.series[2].name ='副教授';
                option4.series[3].name ='讲师';
                option4.series[0].data =updateList[1];
                option4.series[1].data =updateList[2];
                option4.series[2].data =updateList[3];
                option4.series[3].data =updateList[4];
                myChart4.setOption(option4);
            }else if (x=='5') {
                var option5 = myChart5.getOption();
                // updateList[0].splice(0,1)
                updateList[1].splice(0,1)
                option5.series[0].data =updateList[1];
                myChart5.setOption(option5);
            }
        }
    }
})
// 大屏整体的编辑
$("#screen-edit").click(function () {
    $("#screen-edit").css('display','none')
    //添加编辑功能
    //第一张图
    $("#screen-effect1").mouseenter(function () {
        //判断编辑框在不在，不在加id
        if ($('#control-panel').css("display") == 'none') {
            $('#screen-edit1').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
            //点编辑时，出现编辑框
            $("#screen-edit1 button").click(function () {
                $("#control-panel").fadeIn()
                //加载数据
                $.getJSON("./json/1.json", function (data){
                    hot.loadData(data.data0);})
                console.log('加载数据1')


            })
        }else {}
    })
    $("#screen-effect1").mouseleave(function () {
        //如果编辑框不在
        if ($("#control-panel").css("display") == 'none') {
            $("#edit-button").remove();

            //     hot.loadData(null);
            // console.log('清空数据1')

        }else {}
    })

    //第二张图
    $("#screen-effect2").mouseenter(function () {
        {
            //判断编辑框在不在，不在加id
            if ($('#control-panel').css("display") == 'none') {

                $('#screen-edit2').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
                //点编辑时，出现编辑框
                $("#screen-edit2 button").click(function () {
                    $("#control-panel").fadeIn()
                    $.getJSON("./json/2.json", function (data){
                        hot.loadData(data.data0);})
                    console.log('加载数据2')
                })
            }else {}
        }
    })
    $("#screen-effect2").mouseleave(function () {
        if ($("#control-panel").css("display") == 'none') {
            $("#edit-button").remove();
            // hot.loadData(null);
            // console.log('清空数据1')

        }else {}
    })

    //第三张图
    $("#screen-effect3").mouseenter(function ()
    {
        if ($('#control-panel').css("display") == 'none') {
            $('#screen-edit3 ').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
            //点编辑时，出现编辑框
            $("#screen-edit3 button").click(function () {
                $("#control-panel").fadeIn()
                $.getJSON("./json/3.json", function (data){
                    hot.loadData(data.data0);})
                console.log('加载数据3')
                if ($('#chart-bar-color-select-1').length>0) {}else {
                    $("#color-select").append( "<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' /><input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B' />"
                    )
                }

            })
        }else {}
    })
    $("#screen-effect3").mouseleave(function () {
        if ($("#control-panel").css("display") == 'none') {
            $("#edit-button").remove();
            // hot.loadData(null);
            // console.log('清空数据1')

            $("#chart-bar-color-select-1").remove();
            $("#chart-bar-color-select-2").remove();
        }else {}

    })

    //第四张图
    $("#screen-effect4").mouseenter(function () {
        if ($('#control-panel').css("display") == 'none') {
            $('#screen-edit4').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
            //点编辑时，出现编辑框
            $("#screen-edit4 button").click(function () {
                $("#control-panel").fadeIn();
                $.getJSON("./json/4.json", function (data){
                    hot.loadData(data.data0);})
                console.log('加载数据4')
                if ($('#chart-bar-color-select-1').length>0) {}else {
                    $("#color-select").append( "<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' />" +
                        "<input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B' />"+
                        "<input id='chart-bar-color-select-3' type='color' class='form-control' style='width:45px;' value='#37648B' />")
                }
            })
        }else {}

    })
    $("#screen-effect4").mouseleave(function () {
        if ($("#control-panel").css("display") == 'none') {
            $("#edit-button").remove();
            // hot.loadData(null);
            // console.log('清空数据1')
            $("#chart-bar-color-select-1").remove();
            $("#chart-bar-color-select-2").remove();
            $("#chart-bar-color-select-3").remove();
        }else {}
    })

    // 第五张图
    $("#screen-effect5").mouseenter(function () {
        if ($('#control-panel').css("display") == 'none') {

            $('#screen-edit5 ').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
            //点编辑时，出现编辑框
            $("#screen-edit5 button").click(function () {
                $("#control-panel").fadeIn();
                $.getJSON("./json/5.json", function (data){
                    console.log(data.data1)
                    hot.loadData(data.data1)
                    ;})
                console.log('加载数据5')
                if ($('#chart-bar-color-select-1').length>0) {}else {
                    $("#color-select").append("<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' />" +
                        "<input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B'>")
                }
            })
        }else {}
    })
    $("#screen-effect5").mouseleave(function () {
        if ($("#control-panel").css("display") == 'none') {
            $("#edit-button").remove();
            // hot.loadData(null);
            // console.log('清空数据1')

            $("#chart-bar-color-select-1").remove();
            $("#chart-bar-color-select-2").remove();
        }else {}

    })
    function CloseBtn(){
        $("#edit-button").remove();
        $("#chart-bar-color-select-1").remove();
        $("#chart-bar-color-select-2").remove();
        $("#chart-bar-color-select-3").remove();
        $("#chart-chart-title-text").val('');
        $("#control-panel").fadeOut()
        hot.loadData(null);
        console.log('清除数据')
    }
    //参数编辑-编辑框的事件
    //编辑框的保存按钮

    $("#screen-pic-save").click(function () {
        var color=$("#chart-bar-color-select-0").val();
        var color1=$("#chart-bar-color-select-1").val();
        var color2=$("#chart-bar-color-select-2").val();
        var color3=$("#chart-bar-color-select-3").val();

        var text = $("#chart-chart-title-text").val();
        var IDName=$('#edit-button').parent().attr('id');
        var IdLastNumber= IDName.substring(11);
        var x=IdLastNumber;
        if (x=='1') {
            Render1(1);


            if (color!="#37648b"&&text!="") {
                option1.series[1].itemStyle.normal.color= color;
                option1.title.text=text
                myChart1.setOption(option1);
            }else if (color=="#37648b"&&text=="") {
                alert('没有改动')

            }else if (text==""&&color!="#37648b"){
                option1.series[1].itemStyle.normal.color= color;
                myChart1.setOption(option1);
            }else if (text!=""&&color=="#37648b") {
                option1.title.text=text
                myChart1.setOption(option1);
            }
        }
        else if (x=='2') {
            Render2(2);

            if (color!="#37648b"&&text!="") {
                option2.series[1].itemStyle.normal.color= color;
                option2.title.text=text
                myChart2.setOption(option2);
            }else if (color=="#37648b"&&text=="") {
                alert('没有改动')

            }else if (text==""&&color!="#37648b"){
                option2.series[1].itemStyle.normal.color= color;
                myChart2.setOption(option2);
            }else if (text!=""&&color=="#37648b") {
                option2.title.text=text
                myChart2.setOption(option2);
            }

        }
        else if(x=='3'){
            Render3(3);

            if (color!="#37648b"&&text!="") {
                option3.series[0].itemStyle.normal.color= color;
                option3.series[1].itemStyle.normal.color= color1;
                option3.series[2].itemStyle.normal.color= color2;
                option3.title.text=text
                myChart3.setOption(option3);
            }else if (color=="#37648b"&&text=="") {
                alert('没有改动')
            }else if (text==""&&color!="#37648b"){
                option3.series[0].itemStyle.normal.color= color;
                option3.series[1].itemStyle.normal.color= color1;
                option3.series[2].itemStyle.normal.color= color2;
                myChart3.setOption(option3);
            }else if (text!=""&&color=="#37648b") {
                option3.title.text=text
                myChart3.setOption(option3);
            }

        }
        else if (x=='4'){
            Render4(4);

            if (color!="#37648b"&&text!="") {
                option4.series[0].itemStyle.normal.color= color;
                option4.series[1].itemStyle.normal.color= color1;
                option4.series[2].itemStyle.normal.color= color2;
                option4.series[3].itemStyle.normal.color= color3;
                option4.title.text=text
                myChart4.setOption(option4);
            }else if (color=="#37648b"&&text=="") {
                alert('没有改动')
            }else if (text==""&&color!="#37648b"){
                option4.series[0].itemStyle.normal.color= color;
                option4.series[1].itemStyle.normal.color= color1;
                option4.series[2].itemStyle.normal.color= color2;
                option4.series[3].itemStyle.normal.color= color3;
                myChart4.setOption(option4);
            }else if (text!=""&&color=="#37648b") {
                option4.title.text=text;
                myChart4.setOption(option4);
            }

        }
        else if(x=='5'){
            Render5(5);
            console.log(option5)
            if (color!="#37648b"&&text!="") {
                option5.color[0]= color;
                option5.color[1]= color1;
                option5.color[2]= color2;
                option5.title.text=text;
                myChart5.setOption(option5);
            }else if (color=="#37648b"&&text=="") {
                alert('没有改动')
            }else if (text==""&&color!="#37648b"){
                option5.color[0]= color;
                option5.color[1]= color1;
                option5.color[2]= color2;
                myChart5.setOption(option5);
            }else if (text!=""&&color=="#37648b") {
                option5.title.text=text;
                myChart5.setOption(option5);
            }

        }
    })
    //编辑框的关闭按钮
    $("#screen-pic-close").click(function () {
        CloseBtn()
    })
    $('#screen-data-close').click(function () { //数据编辑的关闭按钮
        CloseBtn()
    })
});

//引入表格
function Render1(x) {
    var path=x,
        baseurl="./json/"
    $.getJSON(baseurl+path+".json", function (data){
        // hot.loadData(data.data0);
        console.log(data)
        var option1 = myChart1.getOption();
        option1.series[1].data =data.data0[1];
        option1.xAxis[0].data =data.data0[0];
        myChart1.setOption(option1);
    })
}
function Render2(x) {
    var path=x,
        baseurl="./json/"
    $.getJSON(baseurl+path+".json", function (data){
        var option2 = myChart2.getOption();
        option2.series[1].data =data.data0[1];
        option2.xAxis[0].data =data.data0[0];
        myChart2.setOption(option2);
    })
}

function Render3(x) {
    var path=x,
        baseurl="./json/"
    $.getJSON(baseurl+path+".json", function (res){
        var option3 = myChart3.getOption();
        option3.legend[0].data =res.legenddata;
        res.data0[0].splice(0,1)
        option3.xAxis[0].data =res.data0[0];
        res.data0[1].splice(0,1)
        res.data0[2].splice(0,1)
        res.data0[3].splice(0,1)
        option3.series[0].data =res.data0[1];
        option3.series[1].data =res.data0[2];
        option3.series[2].data =res.data0[3];
        option3.series[0].name =res.legenddata[0];
        option3.series[1].name =res.legenddata[1];
        option3.series[2].name =res.legenddata[2];
        myChart3.setOption(option3);
    })
}
function Render4(x) {
    var path=x,
        baseurl="./json/"
    $.getJSON(baseurl+path+".json", function (res){
        var option4 = myChart4.getOption();
        option4.legend[0].data =res.legenddata;
        // res.data0[0].splice(0,1)
        // res.data0[1].splice(0,1)
        // res.data0[2].splice(0,1)
        // res.data0[3].splice(0,1)
        // res.data0[4].splice(0,1)
        option4.xAxis[0].data =res.data0[0];
        option4.series[0].data =res.data0[1];
        option4.series[1].data =res.data0[2];
        option4.series[2].data =res.data0[3];
        option4.series[3].data =res.data0[4];
        option4.series[0].name =res.legenddata[0];
        option4.series[1].name =res.legenddata[1];
        option4.series[2].name =res.legenddata[2];
        option4.series[3].name =res.legenddata[3];

        myChart4.setOption(option4);
    })
}
function Render5(x) {
    var path=x,
        baseurl="./json/"
    $.getJSON(baseurl+path+".json", function (res){
        var option5 = myChart5.getOption();
        res.data1[0].splice(0,1)
        res.data1[1].splice(0,1)
        option5.series[0].data =res.data1[1];

        myChart5.setOption(option5);
    })
}
Render1(1);
Render2(2);
Render3(3);
Render4(4);
Render5(5);

// })

