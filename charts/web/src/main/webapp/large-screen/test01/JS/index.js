// 大屏整体的编辑
$("#screen-edit").click(function () {
    //小屏的图形添加编辑功能
       // 给图片添加鼠标进入事件：进入显示编辑和其他效果
        $("#pic-1").mouseenter(function () {
            if ($("#screen-edit1 button").val()==undefined) {
                //添加编辑
                $("#screen-edit1").append("<button type='button' value='编辑'>编辑</button>")
                //添加鼠标放上去的效果
                $(this).parent().addClass("screen-effect")
                console.log($(this).parent())
                //点编辑时，出现编辑框
                $("#screen-edit1 button").click(function () {
                    $("#control-panel").fadeIn()
                })
            }
        })
    //鼠标移出时,如果没有点击编辑，效果去掉，如果点过编辑
    $("#screen-effect1").mouseleave(function () {
        //编辑框未被触发，效果收起来！！定时，鼠标没有触发任何图片和按钮，就清楚所有的触发效果
        // console.log($("#control-panel").css("display"))
        if ($("#control-panel").css("display")=='none'){
            $("#screen-edit1 button").remove();
            $("#screen-effect").removeClass("screen-effect");
        }
    })
        //编辑框的保存按钮可以关闭编辑框
        $("#screen-pic-save").click(function () {
            $("#screen-edit1 button").remove();
            $("#screen-effect1").removeClass("screen-effect");

            $("#control-panel").fadeOut()
})
//
//     screenEdit:function f() {
//     var picbuttontext =$("#screen-editx button").val()
// $("#pic-x").mouseenter(function () {
//     if (picbuttontext==undefined) {
//         $("#screen-editx").append("<button type='button' value='编辑'>编辑</button>")
//         //添加鼠标放上去的效果
//         $(this).parent().addClass("screen-effect")
//         //点编辑时，出现编辑框
//         $("#screen-editx button").click(function () {
//             $("#control-panel").fadeIn()
//         })
//     }
// })
//         $("#screen-effectx").mouseleave(function () {
//             var PanelStatus = $("#control-panel").css("display")
//             //编辑框未被触发，效果收起来！！定时，鼠标没有触发任何图片和按钮，就清楚所有的触发效果
//             if (PanelStatus=='none'){
//                 $("#screen-editx button").remove();
//                 $("#screen-effect1").removeClass("screen-effect");
//             }
//         })
//         $("#screen-pic-save").click(function () {
//             $("#screen-editx button").remove();
//             $("#screen-effectx").removeClass("screen-effect");
//             $("#control-panel").fadeOut()
//         })
//     }
// $("#screen-edit").click(function () {
//     var pic-x=pic-1
//     var screen-editx =screen-edit1
//     var screen-effectx = screen-effect1
//     $.screenEdit();
})

