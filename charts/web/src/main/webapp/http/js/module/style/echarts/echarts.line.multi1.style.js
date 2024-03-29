/**
 * echart单一折线图样式调整
 *
 * Created by Linhao on 2015/9/14.
 */
define(function(require, exports, module) {
	
	var templateHtml = require("/http/js/module/style/echarts/echarts.line.multi1.html.tpl");
	
    /**
     *
     */
    var EChartLineMultiStyle = (function(){
        var _isInit = false;
    	var _style = {};
    	var _container = {};

		/**
		 * 初始化数据
		 * @param currentHanlder
		 * 			当前处理的对象（chart.echarts.js
		 * 			或者chart.echarts.edit.js的对象）
		 * @param chartParam
		 * 			当为图编辑时传入的初始化参数，新建时为null
		 * @param callback
		 * 			回调方法
		 */
		var init = function(currentHanlder,chartParam,callback){
        	if(_isInit){
        		callback && callback();
        		return 
        	}
        	_style = {};
        	_container = {};
        	
        	//添加内容
        	$("#param-pane").html("").append($(templateHtml));
			//初始化样式参数时必须放在【添加内容】后面
			if(chartParam != null){
				//设置参数并初始化数据
				setChartParam(chartParam);
			}

			_isInit = true;
			initEventBind(currentHanlder,callback);
        };

		/**
		 * 初始化绑定事件
		 * @param currentHanlder
		 * @param callback
		 */
		var initEventBind = function(currentHanlder,callback){
			if(currentHanlder && currentHanlder != null){
				eventBind(currentHanlder,callback);
			}else{
				//默认选择（chart.echarts）
				seajs.use("chart.echarts",function(hanlder){
					eventBind(hanlder,callback);
				});
			}
		};

		/**
		 * 绑定事件
		 * @param hanlder
		 * @param callback
		 */
		var eventBind = function(hanlder,callback){
			if(hanlder){
				var chartObj = hanlder.getChartObj();
				var objConfig = hanlder.getChartConfig();
				if(chartObj && objConfig){
					//修改图的高度
					$("#chart-chart-height-range").change(function(){
						var height = $(this).val();
						//设置值
						$("#chart-chart-height-text").val(height);

						_container["height"] = height;
						objConfig["height"] = height;
						chartObj.init(objConfig);
					});

					//折线1是否为平滑曲线
					$("#chart1-show-smooth-check").change(function(){
						var isShow = $(this).is(":checked");
						var isShow2 = $("#chart2-show-smooth-check").is(":checked");

						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									smooth:isShow
								},{
									smooth:isShow2
								}
							]
						});
						chartObj.init(objConfig);
					});

					//折线1是否为平滑曲线
					$("#chart2-show-smooth-check").change(function(){
						var isShow = $(this).is(":checked");
						var isShow1 = $("#chart1-show-smooth-check").is(":checked");

						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									smooth:isShow1
								},{
									smooth:isShow
								}
							]
						});
						chartObj.init(objConfig);
					});

					//折线1颜色
					$("#chart1-line-color-select").change(function(){
						var color = $(this).val();
						var color2 = $("#chart2-line-color-select").val();
						//注意：修改折线颜色，文字颜色也被改
						$("#chart1-font-color-select").val(color);
						$("#chart2-font-color-select").val(color2);
						objConfig["option"] = _style = $.extend(true,_style,{
							color:[color,color2]
						});
						chartObj.init(objConfig);
					});

					//折线2颜色
					$("#chart2-line-color-select").change(function(){
						var color = $(this).val();
						var color1 = $("#chart1-line-color-select").val();

						//注意：修改折线颜色，文字颜色也被改
						$("#chart1-font-color-select").val(color1);
						$("#chart2-font-color-select").val(color);
						objConfig["option"] = _style = $.extend(true,_style,{
							color:[color1,color]
						});
						chartObj.init(objConfig);
					});

					//折线1宽度
					$("#chart1-line-width-range").change(function(){
						var width = $(this).val();
						var width2 = $("#chart2-line-width-range").val();
						$("#chart1-line-width-text").val(width);
						$("#chart2-line-width-text").val(width2);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"lineStyle": {
												width:width
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"lineStyle": {
												width:width2
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//折线2宽度
					$("#chart2-line-width-range").change(function(){
						var width = $(this).val();
						var width1 = $("#chart1-line-width-range").val();
						$("#chart2-line-width-text").val(width);
						$("#chart1-line-width-text").val(width1);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"lineStyle": {
												width:width1
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"lineStyle": {
												width:width
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//是否显示图列
					$("#chart-show-legend-check").change(function(){
						var isShow = $(this).is(":checked");
						//控制是否可以修改图例文字颜色
						$("#chart-legend-color-select").attr("disabled",!isShow);

						objConfig["option"] = _style = $.extend(true,_style,{
							legend:{
								show:isShow
							}
						});
						chartObj.init(objConfig);
					});

					//图列文字颜色
					$("#chart-legend-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							legend:{
								textStyle:{
									color:color
								}
							}
						});
						chartObj.init(objConfig);
					});

					//是否显示标签
					$("#chart-show-label-check").change(function(){
						var isShow = $(this).is(":checked");

						//控制是否可以修改
						$("#chart1-font-color-select").attr("disabled",!isShow);
						$("#chart2-font-color-select").attr("disabled",!isShow);
						$("#chart1-font-size-range").attr("disabled",!isShow);
						$("#chart2-font-size-range").attr("disabled",!isShow);
						$("input[name='chart1-font-position-radio']").attr("disabled",!isShow);
						$("input[name='chart2-font-position-radio']").attr("disabled",!isShow);

						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"show":isShow
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"show":isShow
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体1颜色
					$("#chart1-font-color-select").change(function(){
						var color = $(this).val();
						var color2 = $("#chart2-font-color-select").val();
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"color":color
												}
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"color":color2
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体2颜色
					$("#chart2-font-color-select").change(function(){
						var color = $(this).val();
						var color1 = $("#chart1-font-color-select").val();
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"color":color1
												}
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"color":color
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体1大小
					$("#chart1-font-size-range").change(function(){
						var size = $(this).val();
						var size2 = $("#chart2-font-size-range").val();

						//设置值
						$("#chart1-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"fontSize": size
												}
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"fontSize": size2
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体2大小
					$("#chart2-font-size-range").change(function(){
						var size = $(this).val();
						var size1 = $("#chart1-font-size-range").val();

						//设置值
						$("#chart2-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"fontSize": size1
												}
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"fontSize": size
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体1位置
					$("input[name='chart1-font-position-radio']").click(function(){
						var position = $(this).val();
						var position2 = $("input[name='chart2-font-position-radio']:checked").val();
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"position": position
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"position": position2
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体2位置
					$("input[name='chart2-font-position-radio']").click(function(){
						var position = $(this).val();
						var position1 = $("input[name='chart1-font-position-radio']:checked").val();
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"position": position1
											}
										}
									}
								},{
									"itemStyle": {
										"normal": {
											"label": {
												"position": position
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴位置
					$("input[name='chart-x-position-radio']").click(function(){
						var position = $(this).val();

						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis: [
								{
									position: position
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴颜色
					$("#chart-x-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLine": {
										"lineStyle": {
											"color": color
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴字体颜色
					$("#chart-x-font-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"color": color
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴字体大小
					$("#chart-x-font-size-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-x-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"fontSize": size
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});
					//改变标题
					$("input[id='chart-name']").change(function(){
						var val=$(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							"title" :{
								text : val
							}
						});
						chartObj.init(objConfig);

					});

					//x轴字体旋转角度
					$("#chart-x-text-rotate-range").change(function(){
						var angle = $(this).val();

						//设置值
						$("#chart-x-text-rotate-text").val(angle);
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"rotate": angle		//保存当前的x轴文字旋转角度
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//调整x轴字段高度
					$("#chart-textxy-color-container>.form-controlx").change(function(){
						var xmove = $(this).val();
						if(xmove != ""){
							objConfig["option"] = _style = $.extend(true,_style,{
								xAxis: [
									{
										positionOffset: {
											x:xmove
										}
									}
								]
							});
							chartObj.init(objConfig);
						}
					});

					$("#chart-textxy-color-container>.form-controly").change(function() {
						var ymove = $(this).val();
						if(ymove != ""){
							objConfig["option"] = _style = $.extend(true,_style,{
								xAxis: [
									{
										positionOffset: {
											y:ymove
										}
									}
								]
							});
							chartObj.init(objConfig);
						}
					});

					//y轴位置
					$("input[name='chart-y-position-radio']").click(function(){
						var position = $(this).val();

						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis: [
								{
									position: position
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴颜色
					$("#chart-y-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLine": {
										"lineStyle": {
											"color": color
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体颜色
					$("#chart-y-font-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"color": color
										}
									},
									"nameTextStyle": {
										"color": color
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体大小
					$("#chart-y-font-size-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-y-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"fontSize": size
										}
									},
									"nameTextStyle": {
										"fontSize": size
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体旋转角度
					$("#chart-y-text-rotate-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-y-text-rotate-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"rotate": size
									}
								}
							]
						});
						chartObj.init(objConfig);
					});
				}//end if(chartObj && objConfig)
			}//end if(hanlder)

			callback && callback();
        };
        
        /**
         * 取得style
         */
        var getStyle = function(){
        	return _style;
        };
        
        /**
         * 取得container
         */
    	var getContainer = function(){
    		return _container;
    	};
    	
    	var setHeight = function(height){
    		if(height && height > 0){
    			_container["height"] = height;
    		}
    	};

		/**
		 * 设置参数（编辑时使用）
		 *
		 * @param chartParam
		 * 			设置参数
		 */
		var setChartParam = function(chartParam){
			if(chartParam && typeof chartParam == "object"){
				if(chartParam.container){
					_container = $.extend(true,_container || {},chartParam.container);
				}

				if(chartParam.style){
					_style = $.extend(true,_style || {},chartParam.style);
				}
			}

			//初始化控件的值
			initControlStyle();
		};

		/**
		 * 初始化控件的值（编辑时使用）
		 */
		var initControlStyle = function(){
			var series = _style.series;
			if(series){
				//折线是否为平滑曲线
				var seriesStyle= $.extend(true,{},{series:[
					{
						smooth:false,
						"itemStyle": {
							"normal": {
								"lineStyle": {
									width:-1
								},
								"label": {
									"show":true,
									"position": null,
									"textStyle": {
										"color":null,
										"fontSize": -1
									}
								}
							}
						}
					},{
						smooth:false,
						"itemStyle": {
							"normal": {
								"lineStyle": {
									width:-1
								},
								"label": {
									"show":true,
									"position": null,
									"textStyle": {
										"color":null,
										"fontSize": -1
									}
								}
							}
						}
					}
				]},{
					series:series
				});
				var smoothStyle1 = seriesStyle.series[0].smooth;
				if(smoothStyle1 === true){
					$("#chart1-show-smooth-check").attr("checked",true);
				}
				var smoothStyle2 = seriesStyle.series[1].smooth;
				if(smoothStyle2 === true){
					$("#chart2-show-smooth-check").attr("checked",true);
				}
				var lineWidthStyle1 = seriesStyle.series[0].itemStyle.normal.lineStyle.width;
				if(lineWidthStyle1 > -1){
					$("#chart1-line-width-range").attr("value",lineWidthStyle1).val(lineWidthStyle1);
					$("#chart1-line-width-text").attr("value",lineWidthStyle1).val(lineWidthStyle1);
				}
				var lineWidthStyle2 = seriesStyle.series[1].itemStyle.normal.lineStyle.width;
				if(lineWidthStyle2 > -1){
					$("#chart2-line-width-range").attr("value",lineWidthStyle2).val(lineWidthStyle2);
					$("#chart2-line-width-text").attr("value",lineWidthStyle2).val(lineWidthStyle2);
				}

				//是否显示标签
				var textShowStyle = seriesStyle.series[0].itemStyle.normal.label.show === false;
				if(textShowStyle){
					$("#chart-show-label-check").attr("checked",false);

					//控制是否可以修改
					$("#chart1-font-color-select").attr("disabled",true);
					$("#chart2-font-color-select").attr("disabled",true);
					$("#chart1-font-size-range").attr("disabled",true);
					$("#chart2-font-size-range").attr("disabled",true);
					$("input[name='chart1-font-position-radio']").attr("disabled",true);
					$("input[name='chart2-font-position-radio']").attr("disabled",true);
				}
				var textStylePosition1 = seriesStyle.series[0].itemStyle.normal.label.position;
				if(textStylePosition1 != null){
					var radioId = "chart1-font-position-radio-";
					switch(textStylePosition1){
						case "top":
							radioId = radioId + "1";
							break;
						case "bottom":
							radioId = radioId + "2";
							break;
						case "left":
							radioId = radioId + "3";
							break;
						case "right":
							radioId = radioId + "4";
							break;
					}
					$("input[name='chart1-font-position-radio']").removeAttr("checked");
					$("input#"+radioId).attr("checked",true);
					var $span = $("input#"+radioId).parent(".input-group-addon");
					$span.html($span.html());
				}
				var textStylePosition2 = seriesStyle.series[1].itemStyle.normal.label.position;
				if(textStylePosition2 != null){
					var radioId = "chart2-font-position-radio-";
					switch(textStylePosition2){
						case "top":
							radioId = radioId + "1";
							break;
						case "bottom":
							radioId = radioId + "2";
							break;
						case "left":
							radioId = radioId + "3";
							break;
						case "right":
							radioId = radioId + "4";
							break;
					}
					$("input[name='chart2-font-position-radio']").removeAttr("checked");
					$("input#"+radioId).attr("checked",true);
					var $span = $("input#"+radioId).parent(".input-group-addon");
					$span.html($span.html());
				}
				var textStyleColor1 = seriesStyle.series[0].itemStyle.normal.label.textStyle.color;
				if(textStyleColor1 != null){
					$("#chart1-font-color-select").attr("value",textStyleColor1).val(textStyleColor1);
					var $textStyleColorParent =  $("#chart1-font-color-select").parent("div");
					//保证控件刷新
					$textStyleColorParent.html($textStyleColorParent.html());
				}
				var textStyleColor2 = seriesStyle.series[1].itemStyle.normal.label.textStyle.color;
				if(textStyleColor2 != null){
					$("#chart2-font-color-select").attr("value",textStyleColor2).val(textStyleColor2);
					var $textStyleColorParent =  $("#chart2-font-color-select").parent("div");
					//保证控件刷新
					$textStyleColorParent.html($textStyleColorParent.html());
				}
				var textStyleFontSize1 = seriesStyle.series[0].itemStyle.normal.label.textStyle.fontSize;
				if(textStyleFontSize1 > -1){
					$("#chart1-font-size-range").attr("value",textStyleFontSize1).val(textStyleFontSize1);
					$("#chart1-font-size-text").attr("value",textStyleFontSize1).val(textStyleFontSize1);
				}
				var textStyleFontSize2 = seriesStyle.series[1].itemStyle.normal.label.textStyle.fontSize;
				if(textStyleFontSize2 > -1){
					$("#chart2-font-size-range").attr("value",textStyleFontSize2).val(textStyleFontSize2);
					$("#chart2-font-size-text").attr("value",textStyleFontSize2).val(textStyleFontSize2);
				}

			}//end if(series && series[0])

			//折线颜色
			var lineColorStyle = $.extend(true,{},{
				color:[null,null]
			},{
				color:_style.color
			});
			if(lineColorStyle.color[0] != null){
				$("#chart1-line-color-select").attr("value",lineColorStyle.color[0]);
				var $parent =  $("#chart1-line-color-select").parent("div");
				//保证控件刷新
				$parent.html($parent.html());
			}
			if(lineColorStyle.color[1] != null){
				$("#chart2-line-color-select").attr("value",lineColorStyle.color[1]);
				var $parent =  $("#chart2-line-color-select").parent("div");
				//保证控件刷新
				$parent.html($parent.html());
			}
			//是否显示图列
			var legendShow = (_style.legend && _style.legend.show === false) ? false :true;
			if(!legendShow){
				//控制是否可以修改图例文字颜色
				$("#chart-show-legend-check").attr("checked",false);
				$("#chart-legend-color-select").attr("disabled",true);
			}

			//图列颜色
			var legendColor = $.extend(true,{},{
				legend:{
					textStyle:{
						color:null
					}
				}
			},{
				legend : _style.legend || {}
			});
			if(legendColor.legend.textStyle.color != null){
				$("#chart-legend-color-select").attr("value",legendColor.legend.textStyle.color);
				var $parent =  $("#chart-legend-color-select").parent("div");
				//保证控件刷新
				$parent.html($parent.html());
			}


			//x轴
			var xAxisStyle = $.extend(true,{},{
				xAxis: [
					{
						"position": null,
						"axisLine": {
							"lineStyle": {
								"color": null
							}
						},
						"axisLabel": {
							"textStyle": {
								"color": null,
								"fontSize": -1
							},
							"rotate": -1
						},
                        positionOffset: {
                            x:0,
                            y:0
                        }
					}
				]
			},{
				xAxis:_style.xAxis || []
			});
			var xAxisStylePosition = xAxisStyle.xAxis[0].position;
			if(xAxisStylePosition != null){
				var radioId = "chart-x-position-radio-";
				switch(xAxisStylePosition){
					case "bottom":
						radioId = radioId +"1";
						break;
					case "top":
						radioId = radioId +"2";
						break;
				}
				$("input[name='chart-x-position-radio']").removeAttr("checked");
				$("input#"+radioId).attr("checked",true);
				var $span = $("input#"+radioId).parent(".input-group-addon");
				$span.html($span.html());
			}//end if(xAxisStylePosition != null)
			var xAxisStyleLineColor = xAxisStyle.xAxis[0].axisLine.lineStyle.color;
			if(xAxisStyleLineColor != null){
				$("#chart-x-color-select").attr("value",xAxisStyleLineColor);
				var $xAxisStyleLineColorParent =  $("#chart-x-color-select").parent("div");
				//保证控件刷新
				$xAxisStyleLineColorParent.html($xAxisStyleLineColorParent.html());
			}//end if(xAxisStyleLineColor != null)
			var xAxisStyleTextColor = xAxisStyle.xAxis[0].axisLabel.textStyle.color;
			if(xAxisStyleTextColor != null){
				$("#chart-x-font-color-select").attr("value",xAxisStyleTextColor);
				var $xAxisStyleTextColorParent =  $("#chart-x-font-color-select").parent("div");
				//保证控件刷新
				$xAxisStyleTextColorParent.html($xAxisStyleTextColorParent.html());
			}//end if(xAxisStyleTextColor != null)
			var xAxisStyleTextSize = xAxisStyle.xAxis[0].axisLabel.textStyle.fontSize;
			if(xAxisStyleTextSize > -1){
				$("#chart-x-font-size-range").attr("value",xAxisStyleTextSize).val(xAxisStyleTextSize);
				$("#chart-x-font-size-text").attr("value",xAxisStyleTextSize).val(xAxisStyleTextSize);
			}//end if(xAxisStyleTextSize != null)
			var xAxisStyleTextRotate = xAxisStyle.xAxis[0].axisLabel.rotate;
			if(xAxisStyleTextRotate > -1){
				$("#chart-x-text-rotate-range").attr("value",xAxisStyleTextRotate).val(xAxisStyleTextRotate);
				$("#chart-x-text-rotate-text").attr("value",xAxisStyleTextRotate).val(xAxisStyleTextRotate);
			}//end if(xAxisStyleTextRotate != null)
			var xAistTylePositionOffset = xAxisStyle.xAxis[0].positionOffset;
			if(xAistTylePositionOffset.x != ""){
				$("#chart-textxy-color-container>.form-controlx").attr("value",xAistTylePositionOffset.x).val(xAistTylePositionOffset.x);
			}
			if(xAistTylePositionOffset.y != ""){
				$("#chart-textxy-color-container>.form-controly").attr("value",xAistTylePositionOffset.y).val(xAistTylePositionOffset.y);
			}
			//y轴
			var yAxisStyle = $.extend(true,{},{
				yAxis: [
					{
						"position": null,
						"axisLine": {
							"lineStyle": {
								"color": null
							}
						},
						"axisLabel": {
							"textStyle": {
								"color": null,
								"fontSize": -1
							},
							"rotate": -1
						}
					}
				]
			},{
				yAxis:_style.yAxis || []
			});
			var yAxisStylePosition = yAxisStyle.yAxis[0].position;
			if(yAxisStylePosition != null){
				var radioId = "chart-y-position-radio-";
				switch(yAxisStylePosition){
					case "left":
						radioId = radioId +"1";
						break;
					case "right":
						radioId = radioId +"2";
						break;
				}
				$("input[name='chart-y-position-radio']").removeAttr("checked");
				$("input#"+radioId).attr("checked",true);
				var $span = $("input#"+radioId).parent(".input-group-addon");
				$span.html($span.html());
			}//end if(yAxisStylePosition != null)
			var yAxisStyleLineColor = yAxisStyle.yAxis[0].axisLine.lineStyle.color;
			if(yAxisStyleLineColor != null){
				$("#chart-y-color-select").attr("value",yAxisStyleLineColor);
				var $yAxisStyleLineColorParent =  $("#chart-y-color-select").parent("div");
				//保证控件刷新
				$yAxisStyleLineColorParent.html($yAxisStyleLineColorParent.html());
			}//end if(yAxisStyleLineColor != null)
			var yAxisStyleTextColor = yAxisStyle.yAxis[0].axisLabel.textStyle.color;
			if(yAxisStyleTextColor != null){
				$("#chart-y-font-color-select").attr("value",yAxisStyleTextColor);
				var $yAxisStyleTextColorParent =  $("#chart-y-font-color-select").parent("div");
				//保证控件刷新
				$yAxisStyleTextColorParent.html($yAxisStyleTextColorParent.html());
			}//end if(yAxisStyleTextColor != null)
			var yAxisStyleTextSize = yAxisStyle.yAxis[0].axisLabel.textStyle.fontSize;
			if(yAxisStyleTextSize > -1){
				$("#chart-y-font-size-range").attr("value",yAxisStyleTextSize).val(yAxisStyleTextSize);
				$("#chart-y-font-size-text").attr("value",yAxisStyleTextSize).val(yAxisStyleTextSize);
			}//end if(yAxisStyleTextSize != null)
			var yAxisStyleTextRotate = yAxisStyle.yAxis[0].axisLabel.rotate;
			if(yAxisStyleTextRotate > -1){
				$("#chart-y-text-rotate-range").attr("value",yAxisStyleTextRotate).val(yAxisStyleTextRotate);
				$("#chart-y-text-rotate-text").attr("value",yAxisStyleTextRotate).val(yAxisStyleTextRotate);
			}//end if(yAxisStyleTextRotate != null)
		};

        return {
        	init:init,
        	getStyle:getStyle,
        	getContainer:getContainer,
        	setHeight:setHeight
        };
    })();


    return EChartLineMultiStyle;
});