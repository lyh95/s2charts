/**
 * echart单一条形图
 *
 * Created by Linhao on 2015/8/13.
 */
define(function(require, exports, module) {

    var common = require("./echarts.common");

    /**
     *
     * @constructor
     */
    var EChartBarHorizontalSingle = function(){
        this.currentColors = [];

        this.colors = ['#37648B','#228fbd',
            '#00a6de',
            "#7bbfea", "#87cefa", "#da70d6",
            "#32cd32", "#6495ed", "#ff69b4",
            "#ba55d3", "#cd5c5c", "#ffa500",
            "#40e0d0", "#1e90ff", "#ff6347",
            "#7b68ee", "#00fa9a", "#ffd700",
            "#6699FF", "#ff6666", "#3cb371",
            "#b8860b", "#30e0e0"];

        this.option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['利润', '支出', '收入']
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            title: {
                show: true,
                text: ''
            },
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            series : [
                {
                    "name":"",
                    "type":"bar",
                    "data":[]   //数据
                }
            ]
        };
    };

    /**
     *
     * @type {{}}
     */
    EChartBarHorizontalSingle.prototype = {
        init:function(config){
            var that = this;
            config = $.extend({},config);
            common.Util.setContainerWidAndHei($("#"+config.container),config.width,config.height);

            // 基于准备好的dom，初始化echarts图表
            var myChart = common.myECharts.getChart(config.container);
            if(myChart){
                this.getOptionFromConfig(config,function(){
                    if(config.option){
                        that.option = $.extend(true,that.option,config.option || {});
                    }
                    myChart.resize();
                    myChart.setOption(that.option);
                });
            }
        },
        getOptionFromConfig:function(config,callback){
            var that = this;
            if(typeof config.data == "object" && config.data != null){
                this.getDataFromData(config.data,function(re){
                    goTo(re);
                    callback && callback();
                });
            }else{
                this.getDataFromConfig(config.url,function(re){
                    goTo(re);
                    callback && callback();
                });
            }

            //
            function goTo(re){
                if(re && re != null){
                    that.option.legend.data = re.legendData;

                    //获取颜色参数
                    var color = [];
                    var colorLen = that.colors.length;
                    for(var j=0,len=re.series.length;j<len;j++){
                        color.push(that.colors[j%colorLen]);
                    }
                    //保存当前colors
                    that.currentColors = $.extend([],color);
                    that.option.color = color;

                    $.extend(that.option.xAxis[0],{
                        name : re.unit
                    });
                    $.extend(that.option.yAxis[0],{
                        type : 'category',
                        data : re.yAxisData
                    });
                    that.option.series = [];
                    for(var i=0; i< re.series.length;i++){

                        if("利润"===re.series[i].name){
                            that.option.series.push({
                                "name":re.series[i].name,
                                "type":"bar",
                                "data":re.series[i].data,
                                "itemStyle": {
                                    "normal": {
                                        "barBorderWidth": 0,
                                        "barBorderColor": "#37a2da",
                                        "barBorderRadius": [0,0,0,0],
                                        "label": {

                                            normal: {
                                                show: true,
                                                position: 'inside'

                                            }

                                        }
                                    }
                                }
                            });


                        }else if("收入"===re.series[i].name){
                            that.option.series.push({
                                "name":re.series[i].name,
                                "type":"bar",
                                "data":re.series[i].data,
                                "stack":"总量",
                                "itemStyle": {
                                    "normal": {
                                        "barBorderWidth": 0,
                                        "barBorderColor": "#67e0e3",
                                        "barBorderRadius": [0,0,0,0],
                                            "label": {
                                                normal: {
                                                    show: true
                                                }
                                            }
                                    }
                                }
                            });
                        }else {
                            that.option.series.push({
                                "name":re.series[i].name,
                                "stack":"总量",
                                "type":"bar",
                                "data":re.series[i].data,
                                "itemStyle": {
                                    "normal": {
                                        "barBorderWidth": 0,
                                        "barBorderColor": "#ffdb5c",
                                        "barBorderRadius": [0,0,0,0],
                                        "label": {
                                            normal: {
                                                show: true,
                                                position: 'left'
                                            }
                                        }
                                    }
                                }
                            });

                        }
                    }
                    that.option.title={
                        show: true,
                        text : "",
                        left : "center",
                        "top" : "0"
                    }
                }
            }
        },
        getDataFromConfig:function(url,callback){
            var that = this;
            common.Ajax.getJsonData(url,function(data){
                that.getDataFromData(data,callback);
            });
        },
        getDataFromData:function(data,callback){
            if(data && data != null && data[0]){
                var data2 = data[0].name;

                var heads = [];		//头部
                var bodys = [];		//同一年份不同指标分组

                var titleName = data.title;

                //数据转换
                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data2.length; i++) {
                    var rowData = data2[i];

                    for(var j=0;j<rowData.length;j++){
                        //如果是第一行，则为表头
                        if(i == 0){
                            heads.push(rowData[j]);
                        }else{
                            if(!bodys[j]){
                                var arr = [];
                                arr.push(rowData[j]);
                                bodys[j] = arr;
                            }else{
                                bodys[j].push(rowData[j]);
                            }
                        }
                    }
                }

                var xAxisData = [];
                var legendData = [];
                var series = [];
                var unit = "";
                if(heads.length > 1){
                    //1.取单位
                    unit = heads[1];
                    var v = regex.exec(unit);
                    if(v && v[0]){
                        unit = v[0];
                    }

                    //去掉头部单位
                    for(var b=0;b<heads.length;b++){
                        ///\([^\)]+\)/g 设置为局部，防止全局事件
                        var v = /\([^\)]+\)/g.exec(heads[b]);
                        if(v && v[0]){
                            heads[b] = heads[b].split(v)[0] || heads[b];
                        }
                    }


                    //2.取图例
                    for(var k=1;k<heads.length;k++){
                        legendData.push(heads[k]);
                    }

                    //3.取x轴
                    xAxisData = bodys[0];

                    //4.取数据
                    for(var m=1;m<bodys.length;m++){
                        series.push({
                            name:heads[m],		//取对比的年份
                            data:bodys[m]		//取指定年份对应的数据
                        });
                    }
                }//end if(heads.length > 1)


                var re = {
                    xAxisData : xAxisData,
                    legendData : legendData,
                    titleName : titleName,
                    series : series,
                    unit : unit
                };

                callback && callback(re);
            }else{
                callback && callback(null);
            }
        }
    };

    return EChartBarHorizontalSingle;
});