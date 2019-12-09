function line_data() {
    var result;
    $.ajax({
        url:"/getline",
        type : "get",
        dataType : "json",
        async:false,
        success: function (data) {

            result = data;
            console.log(data)
        }

    });
    return result;
}
var container = document.getElementById('example1');
var hot = new Handsontable(container, {
    data: line_data(),
    colWidths: 100,
    width: '100%',
    height: 800,
    rowHeights: 30,
    rowHeaders: true,
    colHeaders: ['起始点','终止点','地区']
});

data=line_data();
console.log('tempDatatempDatatempDatatempData',data);
var tempData = data.map(function (item) {
    return {
        name: item.name,
        line: [item.line_from,item.line_to]
    }
});
console.log('tempData',tempData);

for(var i=0; i<data.length; i++){
    var params = [];
    params.push()

}

_currentData = data;
































//线条颜色渲染
var lineColor = document.getElementById("lineColor");
console.log(lineColor.value);
var lineColorInfo = lineColor.value;
lineColor.onchange = function() {
    console.log(this.value);
    lineColorInfo = lineColor.value;
    layer.setOptions({
        style: {
            // 曲率 [-1, 1] 区间
            curveness: curvenessValue,
            opacity: opacityValue,
            color: lineColorInfo
        }
    });

    layer.render();

};



//地图渲染
var map = new AMap.Map('hmc', {
    resizeEnable: true,
    mapStyle: 'amap://styles/midnight',
    features: ['bg', 'road'],
    center: [108.149185, 33.663153],
    zoom: 3,
    pitch: 40,
    viewMode: '3D'
});
map.on('click', function(e) {
    document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
});

var layer = new Loca.LinkLayer({
    map: map,
    fitView: true
});


console.log('tempData',tempData);
layer.setData(tempData, {
    lnglat: 'line'
});

layer.setOptions({
    style: {
        // 曲率 [-1, 1] 区间
        curveness: 0,
        opacity: 0.5,
        color: lineColorInfo
    }
});
layer.render();





// 行政区划选择
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

// 曲率设置

var curvenenss = 0;
var curvenessValue = curvenenss;

var plusIconOnclick = document.getElementById("plus-icon-onclick");
plusIconOnclick.onclick = function (){
    if (curvenessValue < 0.998){
        curvenessValue = curvenessValue + 0.1;
        console.log(curvenessValue);
        layer.setOptions({
            style: {
                // 曲率 [-1, 1] 区间
                curveness: curvenessValue,
                opacity: opacityValue,
                color: lineColorInfo
            }
        });

        layer.render();
    }
};
var minusIconOnclick = document.getElementById("minus-icon-onclick");
minusIconOnclick.onclick = function () {
    if(curvenessValue > - 0.998){
        curvenessValue = curvenessValue - 0.1;
        console.log(curvenessValue);
        layer.setOptions({
            style: {
                // 曲率 [-1, 1] 区间
                curveness: curvenessValue,
                opacity: opacityValue,
                color: lineColorInfo
            }
        });

        layer.render();

    }
};


//透明度变化
var opacity = 0.5;
var opacityValue = opacity;
var plusIconOnclick02 = document.getElementById("plus-icon-onclick02");
plusIconOnclick02.onclick = function (){
    if (opacityValue < 0.998){
        opacityValue = opacityValue + 0.1;
        console.log(opacityValue);
        layer.setOptions({
            style: {
                // 曲率 [-1, 1] 区间
                curveness: curvenessValue,
                opacity: opacityValue,
                color: lineColorInfo
            }
        });

        layer.render();
    }
};
var minusIconOnclick02 = document.getElementById("minus-icon-onclick02");
minusIconOnclick02.onclick = function () {
    if(opacityValue > 0.102){
        opacityValue = opacityValue - 0.1;
        console.log(opacityValue);
        layer.setOptions({
            style: {
                // 曲率 [-1, 1] 区间
                curveness: curvenessValue,
                opacity: opacityValue,
                color: lineColorInfo
            }
        });

        layer.render();

    }
};

//点击刷新数据

function demo(){

}

//鼠标事件应用（棱柱）
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
        var infoDom = document.createElement('div');
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

//组件开关

var selecttool = document.getElementById("selectTool");
// var selectToolInfo = selecttool;
console.log('selectchoice');
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

        map.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.MapType"], function () {
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
/*点击显示按钮时，img的样式style的display属性赋值为“block”，下同理*/

// selectdistrict.onclick = function(){
//     if (selectdistrict.checked == true) {
//         districtchoose.style.display = "block";
//
//     }
//     if (selecttool.checked == false) {
//         districtchoose.style.display = "none";
//
//     }
//
// };

//handsontable的afterchange方法，在改变表格后立即执行操作
hot.addHook('afterChange',function (changedata,source) {
    tempData = this.getSourceData();

    var NowData = tempData.map(function (item) {
        return {
            name: item.name,
            line: [item.line_from,item.line_to]
        }
    });
    console.log("aaa",NowData);

    layer.setData(NowData, {
        lnglat: 'line'
    });

    layer.setOptions({
        style: {
            curveness: 0,
            opacity: 0.5,
            color: lineColorInfo
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


//主题颜色部分

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


var coordinatesDispaly = document.getElementById("coordinatesDispaly");
var selectCoordinates = document.getElementById("selectCoordinates");
var selectCoordinatesInfo = selectCoordinates;
selectCoordinates.onclick = function () {
    console.log(selectCoordinates);
    if(selectCoordinates.checked == true){
        selectCoordinates.onchange = function () {
            coordinatesDispaly.style.display = "block";
            console.log(coordinatesDispaly.style.display);
        }
    }
    if (selectCoordinates.checked == false){
        selectCoordinates.onchange = function () {
            coordinatesDispaly.style.display = "none";
            console.log(coordinatesDispaly.style.display);
        }
    }
};


