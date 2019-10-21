function strip_tags(input, allowed) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    var escaped = Handsontable.helper.stringify(value);
    escaped = strip_tags(escaped, '<em><b><strong><a><big>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
    td.innerHTML = escaped;

    return td;
}

function coverRenderer (dot, value) {
    var escaped = Handsontable.helper.stringify(value),
        img;

    if (escaped.indexOf('http') === 0) {
        img = document.createElement('IMG');
        img.src = value;

        Handsontable.Dom.addEvent(img, 'mousedown', function (e){
            e.preventDefault(); // prevent selection quirk
        });

        Handsontable.Dom.empty(td);
        td.appendChild(img);
    }
    else {
        // render as text
        Handsontable.renderers.TextRenderer.apply(this, arguments);
    }

    return td;
}
function load_val2() {
    // data = null;
    var result;
    $.ajax({
        url:"/getdot",
        type : "get",
        //  dataType : "json",
        async:false,
        success: function (data,textStatus) {

            result = data;
            // re = data.data;
            // return re;
            // data = ret.data;
            // data = data.substring(1,data.length()-1)
            console.log(typeof data[0].dot);
// re = re.data;

}

});
return result;
}
 var data=load_val2();

function myF7Editor(dot, value){
    if(value){
        var escaped = Handsontable.helper.stringify(value);
        var myF7 = document.createElement('myF7');
        myF7.innerHTML = value;
        myF7.id = value;
        $(myF7).click(function(){
            alert($(this).text()+td+' col'+col);
        });

        Handsontable.Dom.empty(td);
        td.appendChild(myF7);
    }
    return td;
}
// function getCarData() {
//     return data = [
//         {'dot':'116.407394,39.904211',value:'3'},
//         {'dot':'117.200983,39.084158',value:'3'},
//     ];
// };
function dataSchema (){

}

var selection = [0,0,0,0];


// var HandsontableExcel = function(data){
// var HandsontableExcel = (function(){

//     var _handsontableObj = null;//handsontable对象
//
//     var _currentData = data;

    // var setCurrentData = function(_currentData){
        _currentData = data;
    //     return _currentData
    // };
// $(document).ready(function(data){
//     _currentData = $.extend([],data);
//
//     var excelData = _currentData;
    var container = document.getElementById('example1'),hot;
    hot = new Handsontable(container, {
        data: load_val2(),
        rowHeaders: true,
        //minSpareRows: 1,//初始化行
        //colHeaders: true,
        colHeaders: ['经纬度', '值'],
        columnSorting: true,sortIndicator:true,
        autoWrapCol:true,autoWrapRow:true,
        manualColumnResize: true,autoWrapRow: true,
        manualRowResize: true,//stretchH: 'all',
        //outsideClickDeselects: false,removeRowPlugin: true,
        contextMenu: true,
        comments: true,
        //autoColumnSize:true,
        colWidths:[80,80,],
        //



           // daodata : changes,
        // data : afterChange(changes),
        cell: [{row: 0, col: 1, comment: '实际工资'}],
        columns: [
            {data:'dot'},{data:'value'},



        ],

        afterSelectionEnd: function(x1, y1, x2, y2){
            selection = [x1,y1,x2,y2];
        },
    });

         var Nowdata ;

       console.log("bbb",Nowdata);


    console.log("arr",);

    $('#addRow').click(function(){
        hot.alter('insert_row',hot.countRows());
    });

    $('#removeRow').click(function(){
        var ridx = selection[0];
        var eidx = selection[2];
        hot.alter('remove_row',ridx,eidx-ridx+1);
        selection = [0,0,0,0];
    });


    console.log("hot",hot.getData());
      // return mapdata


    function tojson(_currentData){


        var i = 0,

        len = _currentData.length,

           array = [];

        for(;i<len;i++){

            array.push({dot:_currentData[i][0],value:_currentData[i][1]});

        }
             console.log(array);
        return JSON.stringify(array);

    }


function isEmpty(obj){
    for (var name in obj){
        return false;
    }
    return true;
}


//地图渲染
var map = new AMap.Map('hmc', {
    mapStyle:  'amap://styles/twilight',
    zoom: 4,
    center: [107.4976, 32.1697],
    features: ['bg', 'road'],
    viewMode: '3D'
});

map.on('click', function(e) {
    document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
});

var layer = new Loca.PointLayer({
    map: map,
    eventSupport: true,    // selectStyle 配置需要开启 eventSupport: true
});



layer.setData(_currentData, {
    lnglat: 'dot'
});


layer.on('mousemove', function(ev) {
    openInfoWin(map, ev.originalEvent, {
    '位置': ev.rawData.dot,
    '值': ev.rawData.value
});
});

console.log(_currentData);
layer.setOptions({
    style: {
        // radius: 10,
        radius: {
            key: 'value',       // 映射字段
            scale: 'linear',  // 比例尺
            value: [10, 30], // 输出范围
            input: [1, 30]    // 输入范围
        },
        color: "#4fc2ff",
        borderColor: '#ffffff',
        borderWidth: 1.5,
        opacity: 0.8
    },
    // 图层上元素被 mouseenter 或者 click 时会触发 selectStyle，
    // 同时 selectStyle 配置需要开启 eventSupport: true 才会生效，
    // 只有 selectStyle 设置的属性才会变化，其他属性不变，
    // 如果关闭 selectStyle，设置 selectStyle: false 即可。
    selectStyle: {
        // radius: 14,
        // radius: {
        //     key: 'value',       // 映射字段
        //     scale: 'linear',  // 比例尺
        //     value: [10, 50], // 输出范围
        //     input: [1, 8]    // 输入范围
        // },
        color: '#ffe30a'
    }

});



layer.render();


// 行政区域选择
var  district, polygons = [], citycode;
var citySelect = document.getElementById('city');
var districtSelect = document.getElementById('district');
var areaSelect = document.getElementById('street');
//行政区划查询
var opts = {
    subdistrict: 1,   //返回下一级行政区
    showbiz:false  //最后一级返回街道信息
};
district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
// map.plugin(["AMap.DistrictSearch"],function(){   //在地图中添加ToolBar插件
//     var districtSearch = new AMap.DistrictSearch({
//         // 关键字对应的行政区级别，country表示国家
//         level: 'country',
//         //  显示下级行政区级数，1表示返回下一级行政区
//         subdistrict: 1
//     });
//
//     // 搜索所有省/直辖市信息
//     districtSearch.search('中国', function(status, result) {
//         // 查询成功时，result即为对应的行政区信息
//     })
// });
district.search('中国', function(status, result) {
    if(status=='complete'){
        getData(result.districtList[0]);
    }
});
function getData(data,level) {
    var bounds = data.boundaries;
    if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
            var polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#0091ea',
                fillColor: '#80d8ff',
                fillOpacity: 0.2,
                path: bounds[i]
            });
            polygons.push(polygon);
        }
        map.setFitView();//地图自适应
    }

    //清空下一级别的下拉列表
    if (level === 'province') {
        citySelect.innerHTML = '';
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'city') {
        districtSelect.innerHTML = '';
        areaSelect.innerHTML = '';
    } else if (level === 'district') {
        areaSelect.innerHTML = '';
    }

    var subList = data.districtList;
    if (subList) {
        var contentSub = new Option('--请选择--');
        var curlevel = subList[0].level;
        var curList =  document.querySelector('#' + curlevel);
        curList.add(contentSub);
        for (var i = 0, l = subList.length; i < l; i++) {
            var name = subList[i].name;
            var levelSub = subList[i].level;
            var cityCode = subList[i].citycode;
            contentSub = new Option(name);
            contentSub.setAttribute("value", levelSub);
            contentSub.center = subList[i].center;
            contentSub.adcode = subList[i].adcode;
            curList.add(contentSub);
        }
    }

}
function search(obj) {
    //清除地图上所有覆盖物
    for (var i = 0, l = polygons.length; i < l; i++) {
        polygons[i].setMap(null);
    }
    var option = obj[obj.options.selectedIndex];
    var keyword = option.text; //关键字
    var adcode = option.adcode;
    district.setLevel(option.value); //行政区级别
    district.setExtensions('all');
    //行政区查询
    //按照adcode进行查询可以保证数据返回的唯一性
    district.search(adcode, function(status, result) {
        if(status === 'complete'){
            getData(result.districtList[0],obj.id);
        }
    });
}
function setCenter(obj){
    map.setCenter(obj[obj.options.selectedIndex].center)
}
if (typeof map !== 'undefined') {
    map.on('complete', function() {
        if (location.href.indexOf('guide=1') !== -1) {
            map.setStatus({
                scrollWheel: false
            });
            if (location.href.indexOf('litebar=0') === -1) {
                map.plugin(["AMap.ToolBar"], function() {
                    var options = {
                        liteStyle: true
                    };
                    if (location.href.indexOf('litebar=1') !== -1) {
                        options.position = 'LT';
                        options.offset = new AMap.Pixel(10, 40);
                    } else if (location.href.indexOf('litebar=2') !== -1) {
                        options.position = 'RT';
                        options.offset = new AMap.Pixel(20, 40);
                    } else if (location.href.indexOf('litebar=3') !== -1) {
                        options.position = 'LB';
                    } else if (location.href.indexOf('litebar=4') !== -1) {
                        options.position = 'RB';
                    }
                    map.addControl(new AMap.ToolBar(options));
                });
            }
        }
    });
}

//点内颜色渲染
var innerDotColor = document.getElementById("innerDotColor");
console.log(innerDotColor.value);
var innerDotColorInfo = innerDotColor.value;
innerDotColor.onchange = function() {
    console.log(this.value);
    innerDotColorInfo = innerDotColor.value;

    layer.setOptions({
        style: {
            // radius: 10,
            radius: {
                key: 'value',       // 映射字段
                scale: 'linear',  // 比例尺
                value: [10, 30], // 输出范围
                input: [1, 30]    // 输入范围
            },
            color: innerDotColorInfo,
            borderColor: borderDotColorInfo,
            borderWidth: 1.5,
            opacity: 0.8
        },
        // 图层上元素被 mouseenter 或者 click 时会触发 selectStyle，
        // 同时 selectStyle 配置需要开启 eventSupport: true 才会生效，
        // 只有 selectStyle 设置的属性才会变化，其他属性不变，
        // 如果关闭 selectStyle，设置 selectStyle: false 即可。
        selectStyle: {
            // radius: 14,
            // radius: {
            //     key: 'value',       // 映射字段
            //     scale: 'linear',  // 比例尺
            //     value: [10, 30], // 输出范围
            //     input: [1, 30]    // 输入范围
            // },
            color: selectDotColorInfo
        }
    });

    layer.render();

};
//点外圈颜色渲染
var borderDotColor = document.getElementById("borderDotColor");
console.log(borderDotColor.value);
var borderDotColorInfo = borderDotColor.value;
borderDotColor.onchange = function() {
    console.log(this.value);
    borderDotColorInfo = borderDotColor.value;

    layer.setOptions({
        style: {
            // radius: 10,
            radius: {
                key: 'value',       // 映射字段
                scale: 'linear',  // 比例尺
                value: [10, 30], // 输出范围
                input: [1, 30]    // 输入范围
            },
            color: innerDotColorInfo,
            borderColor: borderDotColorInfo,
            borderWidth: 1.5,
            opacity: 0.8
        },
        // 图层上元素被 mouseenter 或者 click 时会触发 selectStyle，
        // 同时 selectStyle 配置需要开启 eventSupport: true 才会生效，
        // 只有 selectStyle 设置的属性才会变化，其他属性不变，
        // 如果关闭 selectStyle，设置 selectStyle: false 即可。
        selectStyle: {
            // radius: 14,
            // radius: {
            //     key: 'value',       // 映射字段
            //     scale: 'linear',  // 比例尺
            //     value: [10, 50], // 输出范围
            //     input: [1, 8]    // 输入范围
            // },
            color: selectDotColorInfo
        }
    });

    layer.render();

};
//点改变颜色渲染
var selectDotColor = document.getElementById("selectDotColor");
console.log(selectDotColor.value);
var selectDotColorInfo = selectDotColor.value;
selectDotColor.onchange = function() {
    console.log(this.value);
    selectDotColorInfo = selectDotColor.value;

    layer.setOptions({
        style: {
            // radius: 10,
            radius: {
                key: 'value',       // 映射字段
                scale: 'linear',  // 比例尺
                value: [10, 30], // 输出范围
                input: [1, 30]    // 输入范围
            },
            color: innerDotColorInfo,
            borderColor: borderDotColorInfo,
            borderWidth: 1.5,
            opacity: 0.8
        },
        // 图层上元素被 mouseenter 或者 click 时会触发 selectStyle，
        // 同时 selectStyle 配置需要开启 eventSupport: true 才会生效，
        // 只有 selectStyle 设置的属性才会变化，其他属性不变，
        // 如果关闭 selectStyle，设置 selectStyle: false 即可。
        selectStyle: {
            // radius: 14,
            // radius: {
            //     key: 'value',       // 映射字段
            //     scale: 'linear',  // 比例尺
            //     value: [10, 50], // 输出范围
            //     input: [1, 8]    // 输入范围
            // },
            color: selectDotColorInfo
        }
    });

    layer.render();

};

//坐标提示框
var coordinatesDispaly = document.getElementById("coordinatesDispaly");
var selectCoordinates = document.getElementById("selectCoordinates");
console.log('selectCoordinates');
selectCoordinates.onclick = function(){
    if(selectCoordinates.checked == true){
        coordinatesDispaly.style.display = "block";

    }
    if (selectCoordinates.checked == false){

            coordinatesDispaly.style.display = "none";
            console.log(coordinatesDispaly.style.display);

    }

    };





//组件开关

var selecttool = document.getElementById("selectTool");
console.log('ddselect',selecttool);
// var selectToolInfo = selecttool;
selecttool.onchange = function(){

    if (selecttool.checked == true) {

        map.plugin(["AMap.ToolBar","AMap.Scale","AMap.MapType"],function(){   //在地图中添加ToolBar插件
            toolBar = new AMap.ToolBar();
            scale = new AMap.Scale();
            mapType = new AMap.MapType();
            map.addControl(toolBar);

            map.addControl(scale);

            map.addControl(mapType);
        });


    }
    if (selecttool.checked == false) {
        map.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.MapType","AMap.DistrictSearch"], function () {
            toolBar.hide();
            scale.hide();
            mapType.hide();

        });

    }

};

// 行政区划开关
var selectdistrict = document.getElementById("selectDistrict");
var districtchoose = document.getElementById("districtChoose");

// var selectToolInfo = selecttool;
console.log('selectdistrict');
selectdistrict.onclick = function () {
    if(selectdistrict.checked == true){
        selectdistrict.onchange = function () {
            districtchoose.style.display = "block";
            console.log(districtchoose.style.display);
        }
    }
    if (selectdistrict.checked == false){
        selectdistrict.onchange = function () {
            districtchoose.style.display = "none";
            console.log(districtchoose.style.display);
        }
    }
    // districtchoose.style.display = "block";
};

//鼠标事件应用（）
var infoWin;
var tableDom;
/**
 * 封装便捷的撞题
 * @param {AMap.Map} map
 * @param {Array} event
 * @param {Object} content
 */
function openInfoWin(map, event, content) {
    if (!infoWin) {
        infoWin = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            offset: new AMap.Pixel(130, 100)
        });
    }

    var x = event.offsetX;
    var y = event.offsetY;
    var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));

    if (!tableDom) {
        let infoDom = document.createElement('div');
        infoDom.className = 'info';
        tableDom = document.createElement('table');
        infoDom.appendChild(tableDom);
        infoWin.setContent(infoDom);
    }

    var trStr = '';
    for (var name in content) {
        var val = content[name];
        trStr +=
            '<tr>' +
            '<td class="label">' + name + '</td>' +
            '<td>&nbsp;</td>' +
            '<td class="content">' + val + '</td>' +
            '</tr>'
    }

    tableDom.innerHTML = trStr;
    infoWin.open(map, lngLat);
}

function closeInfoWin() {
    if (infoWin) {
        infoWin.close();
    }
}



//点击刷新数据

function demo(){

}

//handsontable的afterchange方法，在改变表格后立即执行操作
hot.addHook('afterChange',function (changedata,source) {
    // currentData = _currentData.tojson;
    // Nowdata = _currentData;
    // layer.setMap(null);
    // map.destroy( );
    _currentData = this.getSourceData();
    console.log("aaa",_currentData);

    // function againRenderMap(_currentData) {
    //
    // }
    layer.setData(_currentData, {
        lnglat: 'dot'
    });
    console.log(_currentData);
    layer.setOptions({
        style: {
            // radius: 10,
            radius: {
                key: 'value',       // 映射字段
                scale: 'linear',  // 比例尺
                value: [10, 30], // 输出范围
                input: [1, 30]    // 输入范围
            },
            color: innerDotColorInfo,
            borderColor: borderDotColorInfo,
            borderWidth: 1.5,
            opacity: 0.8
        },
        // 图层上元素被 mouseenter 或者 click 时会触发 selectStyle，
        // 同时 selectStyle 配置需要开启 eventSupport: true 才会生效，
        // 只有 selectStyle 设置的属性才会变化，其他属性不变，
        // 如果关闭 selectStyle，设置 selectStyle: false 即可。
        selectStyle: {
            // radius: 14,
            // radius: {
            //     key: 'value',       // 映射字段
            //     scale: 'linear',  // 比例尺
            //     value: [10, 50], // 输出范围
            //     input: [1, 8]    // 输入范围
            // },
            color: selectDotColorInfo
        }

    });



    layer.render();

});


//(主题颜色选择器)绑定radio点击事件
var radios = document.querySelectorAll("#map-styles input");
radios.forEach(function(ratio) {
    ratio.onclick = setMapStyle;
});

function setMapStyle() {
    var styleName = "amap://styles/" + this.value;
    map.setMapStyle(styleName);
}
// var citys = [
//     {"lnglat":'',"name":"","style":2},
//     {"lnglat":[116.286968,39.863642],"name":"丰台区","style":2},
//     {"lnglat":[116.195445,39.914601],"name":"石景山区","style":2},
//     {"lnglat":[116.310316,39.956074],"name":"海淀区","style":2},
//     {"lnglat":[116.105381,39.937183],"name":"门头沟区","style":2},
//     // ...
// ];
//主题颜色部分
window.onload = function () {
    /* window意思是窗口     onload是加载     意思是页面加载完毕后，才执行里面的js ，所以可以放在顶端*/
    var colorChange = document.getElementById("colorChange");
    /*获取图片img="id"给变量 img*/
    var colorChangeOpen = document.getElementById("colorChangeOpen");
    /*获取显示按钮id="btn_show"给变量 btn_show*/
    var colorchangeClose = document.getElementById("colorchangeClose");
    /*获取隐藏按钮id=“btn_show”给变量 btn_hidden */

    colorChangeOpen.onclick = function () {
        colorChange.style.display = "block";
    };
    /*点击显示按钮时，img的样式style的display属性赋值为“block”，下同理*/
    colorchangeClose.onclick = function () {
        colorChange.style.display = "none";
    };
    // var innerDotColor = document.getElementById("innerDotColor");
    //
    // var innerDotColorInfo;
    // innerDotColorInfo.style.color =  innerDotColor.value();
};

// 点图层 点颜色选择
// var innerDotColor = document.querySelector('#innerDotColor');
//获取颜色值
// var innerDotColorInfo;
// innerDotColorInfo.style.color = innerDotColor.value();
// innerDotColor.onchange = function() {
//     console.log(this.value);
// };