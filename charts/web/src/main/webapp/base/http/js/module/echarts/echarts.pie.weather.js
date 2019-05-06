/**
 * echart 饼图
 *
 * Created by weifeng on 2018/4/24.
 */
define(function(require, exports, module) {
    var flag=true;
    var common = require("./echarts.common");
    var weatherIcons = {
        'Sunny': './ECharts_files/sunny.png',
        'Cloudy': './ECharts_files/cloudy.png',
        'Showers': './ECharts_files/showers.png'
    };

    /**
     *
     * @constructor
     */
    var EChartPieWeather = function(){
        this.currentColors = [];

        this.colors = ["#59ADF3","#FF999A","#FFCC67","#ff7f50", "#87cefa", "#da70d6",
            "#32cd32", "#6495ed", "#ff69b4",
            "#ba55d3", "#cd5c5c", "#ffa500",
            "#40e0d0", "#1e90ff", "#ff6347",
            "#7b68ee", "#00fa9a", "#ffd700",
            "#6699FF", "#ff6666", "#3cb371",
            "#b8860b", "#30e0e0"
        ];
        this.option = {
            title:{
                show: true,
                text : ''

            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data:[''],
                x : 'left',
                top:'10%',
                "textStyle": {
                    "fontSize": 12,
                    "fontFamily": "微软雅黑",
                    "color": "#26C0C0",
                    "fontWeight": "bold"
                },
                "show": true
            },
            series : [
                {
                    "name":"",
                    "type":"pie",
                    "radius" : ['50%', '70%'],
                    "data":[]   //数据
                }
            ]
        };

    };

    /**
     *
     * @type {{}}
     */
    EChartPieWeather.prototype = {
        init:function(config){
            var that = this;
            config = $.extend({},config);
            common.Util.setContainerWidAndHei($("#"+config.container),config.width,config.height);

            if(typeof config.isShowLegend == "boolean" && config.isShowLegend == false){
                that.option.legend.show = false;
            }

            // 基于准备好的dom，初始化echarts图表
            var myChart = common.myECharts.getChart(config.container);
            if(myChart){
                this.getOptionFromConfig(config,function(){
                    //是否设置点击事件
                    if(config.isClick){
                        that.setClickEvent(myChart,config.clickEvent);
                    }
                    if(config.option){
                        that.option = $.extend(true,that.option,config.option || {});
                    }
                    myChart.setOption(that.option);
                });
            }
        },
        //设置点击事件
        setClickEvent:function(myChart,callback){
            var ecConfig = echarts.config;
            myChart.on(ecConfig.EVENT.CLICK, function(param) {
                callback && $.isFunction(callback) && callback(param);
            });
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
                    for(var i=0,len=re.seriesData.length;i<len;i++){
                        color.push(that.colors[i%colorLen]);
                    }
                    //保存当前colors
                    that.currentColors = $.extend([],color);
                    that.option.color = color;
                    that.option.title={
                        show: true,
                        text : "天气情况统计" ,
                        left : "center",
                        "top" : "0"
                    };

                    that.option.series = [
                        {
                            "name":re.seriesName,
                            "type":"pie",
                            "radius" : ['25%', '50%'],
                            "data":re.seriesData,
                            "label": {
                                normal: {
                                    formatter: function(params) {
                                        console.log(flag);
                                        if(flag){
                                            flag=false;

                                            return formatter = [
                                                '{title|荆州}{abg|}',
                                                '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                                '{hr|}',
                                                '  {Sunny|晴天}{value|202}{rate|55.3%}',
                                                '  {Cloudy|阴天}{value|142}{rate|38.9%}',
                                                '  {Showers|雨天}{value|21}{rate|5.8%}'
                                            ].join('\n');
                                        }else {
                                            flag = true;
                                        }

                                    },

                                    backgroundColor: '#eee',
                                    borderColor: '#777',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        title: {
                                            color: '#eee',
                                            align: 'center'
                                        },
                                        abg: {
                                            backgroundColor: '#333',
                                            width: '100%',
                                            align: 'right',
                                            height: 25,
                                            borderRadius: [4, 4, 0, 0]
                                        },
                                        Sunny: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Sunny
                                            }
                                        },
                                        Cloudy: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Cloudy
                                            }
                                        },
                                        Showers: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Showers
                                            }
                                        },
                                        weatherHead: {
                                            color: '#333',
                                            height: 24,
                                            align: 'left'
                                        },
                                        hr: {
                                            borderColor: '#777',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        value: {
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'left'
                                        },
                                        valueHead: {
                                            color: '#333',
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'center'
                                        },
                                        rate: {
                                            width: 40,
                                            align: 'right',
                                            padding: [0, 10, 0, 0]
                                        },
                                        rateHead: {
                                            color: '#333',
                                            width: 40,
                                            align: 'center',
                                            padding: [0, 10, 0, 0]
                                        }
                                    }
                                }
                            },

                            "itemStyle" : {
                                normal : {
                                    label : {
                                        show : true,	//显示指标文字
                                        textStyle : {
                                            fontSize : '12',
                                            fontWeight : 'bold',
                                            "fontFamily": "微软雅黑"
                                        },
                                    },
                                    labelLine : {
                                        show : true	//显示指标线
                                    }
                                },
                                emphasis : {
                                    label : {
                                        show : true,
                                        distance:1,
                                        //position : 'center',
                                        textStyle : {
                                            fontSize : '16',
                                            fontWeight : 'bold',
                                            "fontFamily": "微软雅黑",
                                            /*"color": color,*/
                                        }
                                    }
                                }
                            }
                        }
                    ];
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
                var legendData = [];

                var seriesName = "";
                var seriesData = [];
                var titleName=data.title;
                var unit = "";

                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].value)) {
                        seriesData.push({
                            name:data[i].name,
                            value:data[i].value
                        });

                        //数据指标名称
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
                    legendData : legendData,
                    seriesName : seriesName,
                    titleName :titleName,
                    seriesData : seriesData,
                    unit : unit
                };
                callback && callback(re);
            }else{
                callback && callback(null);
            }
        }
    };


    return EChartPieWeather;
});