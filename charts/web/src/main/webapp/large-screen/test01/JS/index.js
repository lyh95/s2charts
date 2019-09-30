// define(function (require, exports, module) {

// 大屏整体的编辑
    $("#screen-edit").click(function () {
        $('#screen-edit').css('display','none')
        //添加编辑功能
        //第一张图
        $("#pic-1").mouseenter(function () {
            //判断编辑框在不在，不在加id
         if ($('#control-panel').css("display") == 'none') {

             $('#screen-edit1').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
             //点编辑时，出现编辑框
             $("#screen-edit1 button").click(function () {
                 $("#control-panel").fadeIn()
             })
         }else {}
        })
        $("#screen-effect1").mouseleave(function () {
            //如果编辑框不在
            if ($("#control-panel").css("display") == 'none') {
                $("#edit-button").remove();
            }else {}
        })

        //第二张图
        $("#pic-2").mouseenter(function () {
            {
                //判断编辑框在不在，不在加id
                if ($('#control-panel').css("display") == 'none') {

                    $('#screen-edit2').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
                    //点编辑时，出现编辑框
                    $("#screen-edit2 button").click(function () {
                        $("#control-panel").fadeIn()
                    })
                }else {}
            }
        })
        $("#screen-effect2").mouseleave(function () {
            if ($("#control-panel").css("display") == 'none') {
                $("#edit-button").remove();
            }else {}
        })

        //第三张图
        $("#pic-3").mouseenter(function ()
            {
                if ($('#control-panel').css("display") == 'none') {
                    $('#screen-edit3 ').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
                    //点编辑时，出现编辑框
                    $("#screen-edit3 button").click(function () {
                        $("#control-panel").fadeIn()
                        $("#color-select").append( "<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' /><input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B' />"
                        )
                    })
                }else {}
            })
        $("#screen-effect3").mouseleave(function () {
            if ($("#control-panel").css("display") == 'none') {
                $("#edit-button").remove();
                $("#chart-bar-color-select-1").remove();
                $("#chart-bar-color-select-2").remove();
            }else {}

        })

        //第四张图
        $("#pic-4").mouseenter(function () {
            if ($('#control-panel').css("display") == 'none') {
                $('#screen-edit4').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
                  //点编辑时，出现编辑框
                $("#screen-edit4 button").click(function () {
                    $("#control-panel").fadeIn()
                    $("#color-select").append( "<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' />" +
                        "<input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B' />"+
                    "<input id='chart-bar-color-select-3' type='color' class='form-control' style='width:45px;' value='#37648B' />")})
            }else {}

        })
        $("#screen-effect4").mouseleave(function () {
            if ($("#control-panel").css("display") == 'none') {
                $("#edit-button").remove();
                $("#chart-bar-color-select-1").remove();
                $("#chart-bar-color-select-2").remove();
                $("#chart-bar-color-select-3").remove();
            }else {}
        })

        // 第五张图
        $("#pic-5").mouseenter(function () {
            if ($('#control-panel').css("display") == 'none') {

                $('#screen-edit5 ').append(" <button type='button' id='edit-button' value='编辑' style='z-index: 2;'>编辑</button>")
                //点编辑时，出现编辑框
                $("#screen-edit5 button").click(function () {
                    $("#control-panel").fadeIn()
                    $("#color-select").append( "<input id='chart-bar-color-select-1' type='color' class='form-control' style='width:45px;' value='#37648B' />" +
                        "<input id='chart-bar-color-select-2' type='color' class='form-control' style='width:45px;' value='#37648B'>")
                })
            }else {}
        })
        $("#screen-effect5").mouseleave(function () {
            if ($("#control-panel").css("display") == 'none') {
                $("#edit-button").remove();
                $("#chart-bar-color-select-1").remove();
                $("#chart-bar-color-select-2").remove();
            }else {}

        })
        //编辑框的事件
        //编辑框的保存按钮
        $('#screen-pic-save').click(function () {
            var color=$("#chart-bar-color-select-0").val();
            var color1=$("#chart-bar-color-select-1").val();
            var color2=$("#chart-bar-color-select-2").val();
            var color3=$("#chart-bar-color-select-3").val();

            var text = $("#chart-chart-title-text").val();
            var IDName=$('#edit-button').parent().attr('id');
            var IdLastNumber= IDName.substring(11);
            var x=IdLastNumber;
            alert(x)
            if (x=='1') {
               if (color&&text!="") {
                   option1.series[1].itemStyle.normal.color= color;
                   option1.title.text=text
                   myChart1.setOption(option1);
               }else if (color==""&&text=="") {
                   alert('没有改动')

               }else if (text==""&&color!=""){
                   option1.series[1].itemStyle.normal.color= color;
                   myChart1.setOption(option1);
               }else if (text!=""&&color=="") {
                   option1.title.text=text
                   myChart1.setOption(option1);
               }
        }
        else if (x=='2') {
                if (color&&text!="") {
                    option2.series[1].itemStyle.normal.color= color;
                    option2.title.text=text
                    myChart2.setOption(option2);
                }else if (color==""&&text=="") {
                    alert('没有改动')

                }else if (text==""&&color!=""){
                    option2.series[1].itemStyle.normal.color= color;
                    myChart2.setOption(option2);
                }else if (text!=""&&color=="") {
                    option2.title.text=text
                    myChart2.setOption(option2);
                }

            }
        else if(x=='3'){
                if (color&&text!="") {
                    option3.series[0].itemStyle.normal.color= color;
                    option3.series[1].itemStyle.normal.color= color1;
                    option3.series[2].itemStyle.normal.color= color2;
                    option3.title.text=text
                    myChart3.setOption(option3);
                }else if (color==""&&text=="") {
                    alert('没有改动')
                }else if (text==""&&color!=""){
                    option3.series[0].itemStyle.normal.color= color;
                    option3.series[1].itemStyle.normal.color= color1;
                    option3.series[2].itemStyle.normal.color= color2;
                    myChart3.setOption(option3);
                }else if (text!=""&&color=="") {
                    option3.title.text=text
                    myChart3.setOption(option3);
                }

        }
        else if (x=='4'){
                if (color&&text!="") {
                    option4.series[0].itemStyle.normal.color= color;
                    option4.series[1].itemStyle.normal.color= color1;
                    option4.series[2].itemStyle.normal.color= color2;
                    option4.series[3].itemStyle.normal.color= color3;
                    option4.title.text=text
                    myChart4.setOption(option4);
                }else if (color==""&&text=="") {
                    alert('没有改动')
                }else if (text==""&&color!=""){
                    option4.series[0].itemStyle.normal.color= color;
                    option4.series[1].itemStyle.normal.color= color1;
                    option4.series[2].itemStyle.normal.color= color2;
                    option4.series[3].itemStyle.normal.color= color3;
                    myChart4.setOption(option4);
                }else if (text!=""&&color=="") {
                    option4.title.text=text;
                    myChart4.setOption(option4);
                }

        }
        else if(x=='5'){
            console.log(option5)
                if (color&&text!="") {
                    option5.color[0]= color;
                    option5.color[1]= color1;
                    option5.color[2]= color2;
                    option5.title.text=text;
                    myChart5.setOption(option5);
                }else if (color==""&&text=="") {
                    alert('没有改动')
                }else if (text==""&&color!=""){
                    option5.color[0]= color;
                    option5.color[1]= color1;
                    option5.color[2]= color2;
                    myChart5.setOption(option5);
                }else if (text!=""&&color=="") {
                    option5.title.text=text;
                    myChart5.setOption(option5);
                }

        }
        })

        $("#screen-pic-close").click(function () {
            $("#edit-button").remove();
            $("#chart-bar-color-select-0").val('');
            $("#chart-chart-title-text").val('');
            $("#control-panel").fadeOut()
        })
    });
// })

