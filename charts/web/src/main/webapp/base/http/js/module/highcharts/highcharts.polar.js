/**
 * highcharts 3d单柱形图
 *
 * Created by lmy 2016/4/10
 */
define(function(require, exports, module) {

    var common = require("./highcharts.common");

    /**
     *
     * @constructor
     */
    var HighChartsPolar = function(){
        this.option = {
            chart: {
                polar: true
            },
            title: {
                text: '极地图'
            },
            pane: {
                startAngle: 0,
                endAngle: 360
            },
            // xAxis: {
            //     tickInterval: 45,
            //     min: 0,
            //     max: 360,
            //     labels: {
            //         formatter: function () {
            //             return this.value + '°';
            //         }
            //     }
            // },
            // yAxis: {
            //     min: 0
            // },
            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },
            series: [{
                type: 'line',
                name: '线',
                data: []
            }]
        }
};
            // $('#plain').click(function () {
            //     chart.update({
            //         chart: {
            //             inverted: false,
            //             polar: false
            //         },
            //         subtitle: {
            //             text: '普通的'
            //         }
            //     });
            // });
            // $('#inverted').click(function () {
            //     // chart.update 支持全部属性动态更新
            //     chart.update({
            //         chart: {
            //             inverted: true,
            //             polar: false
            //         },
            //         subtitle: {
            //             text: '反转'
            //         }
            //     });
            // });
            // $('#polar').click(function () {
            //     chart.update({
            //         chart: {
            //             inverted: false,
            //             polar: true
            //         },
            //         subtitle: {
            //             text: '极地图'
            //         }
            //     });
            // });
        // };
    // });

    /**
     *
     * @type {{}}
     */
    HighChartsPolar.prototype = {
        init:function(config){
            var that = this;
            config = $.extend({},config);
            common.Util.setContainerWidAndHei($("#"+config.container),config.width,config.height);

            // 基于准备好的dom，初始化highcharts图表
            var myChart = common.myHighCharts.getChart(config.container);
            if(config.container!=null){
                this.getOptionFromConfig(config,function(){
                    if(config.option){
                        that.option = $.extend(true,that.option,config.option || {});
                    }
                    $(function () {
                        $(myChart).highcharts(that.option);
                        //$(myChart).highcharts(common.theme.gray);
                    });
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

                    $.extend(that.option.xAxis,{
                        categories : re.xAxisData
                    });
                    $.extend(that.option.yAxis,{
                        title:{
                            text:re.unit
                        }
                    });
                    $.extend(that.option.series,[
                        {
                             name:re.legendData,
                            "data":re.seriesData

                        }
                    ]);

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
            if(data && data != null){
                var xAxisData = [];
                var legendData = [];

                var seriesName = "";
                var seriesData = [];

                var unit = "";

                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].value)) {
                        seriesData.push(data[i].value);
                        xAxisData.push(data[i].name);
                    }

                    //第一行为表头
                    if (i == 0) {
                        //数据指标名称
                        seriesName = data[i].value || "";

                        var v = regex.exec(seriesName);
                        if(v && v[0]){
                            unit = v[0];
                            seriesName = seriesName.split(v)[0] || "";
                        }

                        //数据指标名称
                        legendData.push(seriesName);
                    }//end if (i == 0)
                }

                var re = {
                    xAxisData : xAxisData,
                    legendData : legendData,
                    seriesName : seriesName,
                    seriesData : seriesData,
                    unit : unit
                };
                callback && callback(re);
            }else{
                callback && callback(null);
            }
        },

    };


    return HighChartsPolar;
});