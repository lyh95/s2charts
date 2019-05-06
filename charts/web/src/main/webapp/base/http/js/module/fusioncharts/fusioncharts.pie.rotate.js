/**
 * fusionchart旋转饼图
 *
 * Created by LH on 2016/11/30.
 */
// document.write("<script src='/base2.1/http/lib/Fusioncharts/fusioncharts-3.5.1/fusioncharts.js' type='text/javascript'></script>");
define(function(require, exports, module) {

    var common = require("./fusioncharts.common");

    /**
     *
     * @constructor
     */

    var FusionChartPieRotate = function(){
        this.option = {
            type: 'pie2d',
            renderAt: 'content',
            width: '600',
            height: '500',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "2009-2014网络经济市场规模(亿元)",
                    //"subCaption": "Harry's SuperMart",
                    "pieRadius": "75",
                    "slicingDistance ": "20",
                    "showBorder": "0",
                    "xAxisName": "",
                    "yAxisName": "",
                    "showLegend": "1",
                    //"numberPrefix": ""
                    "theme": "fint"
                },
                "data": [{
                    "label": "Jan",
                    "value": "420000"
                },
                    {
                        "label": "Feb",
                        "value": "810000"
                    },
                    {
                        "label": "Mar",
                        "value": "720000"
                    },
                    {
                        "label": "Apr",
                        "value": "550000"
                    },
                    {
                        "label": "May",
                        "value": "910000"
                    },
                    {
                        "label": "Jun",
                        "value": "510000"
                    },
                    {
                        "label": "Jul",
                        "value": "680000"
                    },
                    {
                        "label": "Aug",
                        "value": "620000"
                    },
                    {
                        "label": "Sep",
                        "value": "610000"
                    },
                    {
                        "label": "Oct",
                        "value": "490000"
                    },
                    {
                        "label": "Nov",
                        "value": "900000"
                    },
                    {
                        "label": "Dec",
                        "value": "730000"
                    }
                ]
            }
        };
    };

    /**
     *
     * @type {{}}
     */
    FusionChartPieRotate.prototype = {
        init:function(config){
            var that = this;
            config = $.extend({},config);
            common.Util.setContainerWidAndHei($("#"+config.container),config.width,config.height);
            var myChart = common.myFusionCharts.getChart(config.container);
            if(myChart){
                this.getOptionFromConfig(config,function(){
                    if(config.option){
                        that.option = $.extend(true,that.option,config.option || {});
                    }
                    // var FusionCharts;
                    FusionCharts.ready(function(){
                        var fusionchart = new FusionCharts(that.option)
                        fusionchart.render();
                    });
                    //增加自定义x轴(必须放在getOptionFromConfig后面)
                    //that.appendXAxis($("#"+config.container),config,that.getRotateFromConfig(config));
                    //myChart.render();
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
                    that.option.dataSource =
                         {
                             "chart": {
                                 "caption": "2009-2014网络经济市场规模(亿元)",
                                 //"subCaption": "Harry's SuperMart",
                                 "xAxisName": re.xname,
                                 "yAxisName": re.yname,
                                 "showBorder": "0",
                                 "showPercentValues": "0",
                                 "showPercentInTooltip": "0",
                                 "startingAngle": "0",
                                 "pieRadius": "75",
                                 "showLegend": "0",
                                 "decimals": "1",
                                 "useDataPlotColorForLabels": "1",
                                 "enableSmartLabels": "1",
                                 //Smart line cosmetics
                                 "smartLineColor": "#d11b2d",
                                 "smartLineThickness": "2",
                                 "smartLineAlpha": "100",
                                 "use3DLighting": "0",
                                 "slicingDistance ": "20",
                                 "isSmartLineSlanted": "0",
                                 //"numberPrefix": re.unit
                                 "theme": "fint"
                             },
                             "data": [{
                                 "label": "Jan",
                                 "value": "420000"
                             },
                                 {
                                     "label": "Feb",
                                     "value": "810000"
                                 },
                                 {
                                     "label": "Mar",
                                     "value": "720000"
                                 },
                                 {
                                     "label": "Apr",
                                     "value": "550000"
                                 },
                                 {
                                     "label": "May",
                                     "value": "910000"
                                 },
                                 {
                                     "label": "Jun",
                                     "value": "510000"
                                 },
                                 {
                                     "label": "Jul",
                                     "value": "680000"
                                 },
                                 {
                                     "label": "Aug",
                                     "value": "620000"
                                 },
                                 {
                                     "label": "Sep",
                                     "value": "610000"
                                 },
                                 {
                                     "label": "Oct",
                                     "value": "490000"
                                 },
                                 {
                                     "label": "Nov",
                                     "value": "900000"
                                 },
                                 {
                                     "label": "Dec",
                                     "value": "730000"
                                 }
                             ]
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
            if(data && data != null){
                var seriesData = [];
                var xname = "";
                var yname = "";

                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].value)) {
                        seriesData.push({"label":data[i].name, "value":data[i].value});
                        //xAxisData.push(data[i].name);
                    }

                    //第一行为表头
                    if (i == 0) {
                        //数据指标名称
                        xname = data[i].name;
                        yname = data[i].value;
                    }//end if (i == 0)
                }

                var re = {
                     xname:xname,
                     yname:yname,
                    seriesData : seriesData
                };
                callback && callback(re);
            }else{
                callback && callback(null);
            }
        }
    };


    return FusionChartPieRotate;
});