/**
 * highcharts 3d饼图
 *
 * Created by HWLUO 2016/05/16
 */
define(function(require, exports, module) {

    var common = require("./highcharts.common");

    /**
     *
     * @constructor
     */
    Highcharts.getOptions().colors = Highcharts.map(['#005aa0', '#008b92', '#109333', '#94b204',
        '#e6c401', '#d8a402', '#d48100', '#cd5e02', '#c80024','#8f016f','#490e78'], function (color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
    var HighCharts3DCoulmn = function(){
        this.option = {
            chart: {
                type: 'pie',
                backgroundColor: '#FFFFFF'
            },
            title: {
                text: "移动互联网用户年龄占比",
                style:{
                    "color" : "#333333",
                    "fontsize" : "24px",
                    "fontfamily":"黑体",
                    "font-weight":"bold"
                }
            },
            credits:{
                enabled:false
            },
            plotOptions: {
                pie: {
                    innerSize:0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 45,
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        style:{
                            fontSize:'11px',
                            color: 'contrast'
                        }
                    }
                }
            },
            legend:{
                enabled:true,
                align:"center",
                itemStyle: {
                    color: '#000000'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#808080'
                }
            },
            series: [{
                type: 'pie',
                data:[]
            }]
        };
    };

    /**
     *
     * @type {{}}
     */
    HighCharts3DCoulmn.prototype = {
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
                    $.extend(that.option.tooltip,[
                        {
                            valueSuffix:'re.unit'
                        }
                    ]);
                    $.extend(that.option.series,[
                        {
                            name:re.seriesName,
                            data: re.seriesData
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
                //var xAxisData = [];
                var legendData = [];

                var seriesName = "";
                var seriesData = [];

                var unit = "";

                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].value)) {
                        seriesData.push({
                            name:data[i].name,
                            y:data[i].value
                        });
                        legendData.push(data[i].name);
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

                    }//end if (i == 0)
                }

                var re = {
                    //xAxisData : xAxisData,
                    legendData : legendData,
                    seriesName : seriesName,
                    seriesData : seriesData,
                    unit : unit
                };
                callback && callback(re);
            }else{
                callback && callback(null);
            }
        }

    };


    return HighCharts3DCoulmn;
});