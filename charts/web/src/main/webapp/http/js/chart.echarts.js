/***********************************************************************/
/**
 * 制图
 */
define(function(require, exports, module) {
	var _isIe = false;

	/**
	 * 修改IE样式
	 * @constructor
	 */
	var IEStyle = function(){
		$("input[type='range']").parent("span.input-group-addon").css({"width":"200px"});
		$("input.form-control[type='text']").css({"height":"75px"});
		$("input.form-control[type='color']").css({"width":"75px"});
	};

	/**
	 * 浏览器判断
	 */
	var browerHanlder = function() {
		var agent = navigator.userAgent.toLowerCase();
		var regStr_ie = /msie [\d.]+;/gi;
		var regStr_ff = /firefox\/[\d.]+/gi;
		var regStr_chrome = /chrome\/[\d.]+/gi;
		var regStr_saf = /safari\/[\d.]+/gi;
		// IE
		var userAgent = navigator.userAgent.toLowerCase();
		jQuery.browser = {
			version : (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			safari : /webkit/.test(userAgent),
			opera : /opera/.test(userAgent),
			msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla : /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
		};
		
		$("#remove-top-btn").click(function() {
			$("#top-alert-container").hide();
		});
		//IE 不支持
		if (agent.indexOf("msie") > 0) {
			var test = jQuery.browser.version;
			var version = parseInt(test);

			_isIe = true;

			$("#top-alert-container").show();
			return version;
		}
		
		//edge不支持
		if(agent.indexOf("edge") > 0){
			$("#top-alert-container").show();
			return "edge";
		}
		
		// Chrome
		if (agent.indexOf("chrome") > 0) {
			$("#top-alert-container").hide();
			return agent.match(regStr_chrome);
		}
		// firefox
		if (agent.indexOf("firefox") > 0) {
			$("#top-alert-container").hide();
			return agent.match(regStr_ff);
		}
		
		// Safari
		if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
			$("#top-alert-container").hide();
			return agent.match(regStr_saf);
		}
		
		//默认不支持
		_isIe = true;
		$("#top-alert-container").show();
	};
	
	/**
	 * 表格处理
	 */
	var HandsontableExcel = (function(){

		var _handsontableObj = null;//handsontable对象
		var _currentData = null;
		var _isExcelInit = false;
		var _isEditedData = false;	//是否编辑过数据
		var _isRightData = true;	//是否数据正常
		
		var init = function(){

			_handsontableObj = null;
	        _isEditedData = false;
	        _isRightData = true;
	  
		};
		
		/**
		 * 取得当前的数据
		 */
		var getCurrentData = function(callback){
			var data = removeNullData(_currentData);
			if(data != null){
				toChartData(data,callback);
			}else{
				callback && callback(null);
			}
		};
		
		/**
		 * 移除空数据
		 */
		var removeNullData = function(data){
			data = $.extend([],data || _currentData);
			
			//获取数据
			var dataLen = data.length;
			if(dataLen > 0){
				//1.去掉所有null行
				var tempData = [];
				for(var h=0,len0=data.length;h<len0;h++){
					var row = data[h];
					
					var colNullCount = 0;
					var len1=row.length;
					for(var c=0; c<len1; c++){
						var item = row[c];
						if(item === null || item === "null" || item === ""){
							colNullCount++;
						}
					}
					//当前行全列为null
					if(colNullCount == len1){
						continue;
					}
					
					tempData.push(row);
				}
				data = tempData;
				dataLen = data.length;
				
				if(dataLen > 0){
					//列宽
					var colLen = data[0].length;
					
					//2.去掉所有的null列
					var noColIndexs = [];
					for(var i=0;i<colLen;i++){
						var rowNullCount = 0;
						for(var j=0;j<dataLen;j++){
							var item = data[j][i];
							if(item === null || item === "null" || item === ""){
								rowNullCount ++; 
							}
						}
						//当前列全行为null
						if(rowNullCount == dataLen){
							//存储列号
							noColIndexs.push(i);
						}
					}
					
					//3.填充数据
					if(noColIndexs.length > 0){
						var newData = [];
						for(var m=0;m<dataLen;m++){
							if(!newData[m]){
								newData[m] = [];
							}
							for(var n=0,nLen=data[m].length;n<nLen;n++){
								//不存在的
								if(noColIndexs.indexOf(n) == -1){
									newData[m].push(data[m][n]);
								}
							}
						}
						data = newData;
						dataLen = data.length;
					}
				}
			}
	
			//校验数据
			for(var a=0;a<dataLen;a++){
				var row = data[a];
				for(var b=0,len3=row.length;b<len3;b++){
					var item = row[b];
					if(item === null || item === "null" || item === ""){
						SGIS.UI.alert("请输入正确的数据！<br/><br/>提示：检查是否有空单元格!",
							null,false,function(modal){
							modal.css({
								"top":"40%",
								"height":"90px",
								"width":"300px",
								"margin-left":"-20px",
								"overflow":"hidden",
								"background-color":"transparent",
								"border":"none"
							});

							modal.find(".content>.ui.label").css({
								"font-size":"16px"
							});
						});

						//标记数据正确
						_isRightData = false;
						return null;
					}
				}
			}
			//标记数据正确
			_isRightData = true;
			
			return data;
		};
		
		/**
		 * 转换为图表数据
		 */
		var toChartData = function(data,callback){
			$.ajax({
				url:"excelformat",
	            type : "POST",
	            data : {
	            	action:'echarts.format',
					type:Hanlder.getChartTypeChart(),
	            	data:encodeURI(JSON.stringify(data))
	            },
	            dataType : "json",
	            success: function (re) {
					if(Hanlder.getChartTypeChart()=="echarts.parallel"){
						if(re && re.code == 0){
							var result = {
								chartData:re.data,
								excelData:data			//注意此处，与d3的差别（此处保存为chartData一样，因为会转换）
							};
							callback && callback(result);
						}else{
							SGIS.UI.alert(re.message,
								null,false,function(modal){
									modal.css({
										"top":"40%",
										"height":"60px",
										"width":"300px",
										"margin-left":"-20px",
										"overflow":"hidden",
										"background-color":"transparent",
										"border":"none"
									});

									modal.find(".content>.ui.label").css({
										"font-size":"16px"
									});
								});
							callback && callback(null);
						}
					}else{
						if(re && re.code == 0){
							var result = {
								chartData:re.data,
								excelData:re.data			//注意此处，与d3的差别（此处保存为chartData一样，因为会转换）
							};
							callback && callback(result);
						}else{
							SGIS.UI.alert(re.message,
								null,false,function(modal){
									modal.css({
										"top":"40%",
										"height":"60px",
										"width":"300px",
										"margin-left":"-20px",
										"overflow":"hidden",
										"background-color":"transparent",
										"border":"none"
									});

									modal.find(".content>.ui.label").css({
										"font-size":"16px"
									});
								});
							callback && callback(null);
						}
					}

	            },
	            error : function(re){
	            	
	            }
			});
		};
		
		/**
	    * 转换为handsontable数据
	    */
		var jsonToHandsontableExcel = function(data){
			var excelData = [];	
			
			if(data.length >1){
				for(var i=0,len=data.length;i<len;i++){
					excelData.push([data[i].name,data[i].value]);
				}
		   	}
			else{
		   		if(data.length ==1 && data[0].name instanceof Array){
					var cData = data[0].name;
					for(var i=0,len=cData.length;i<len;i++){
						var excelRow = [];
						for ( var j = 0,len2=cData[i].length; j < len2; j++) {
							excelRow.push(cData[i][j]);
						}
						excelData.push(excelRow);
					}
		   		}else{
	 		   		for(var i=0,len=data.length;i<len;i++){
						excelData.push([data[i].name,data[i].value]);
					}
		   		}
		   	}
			
			//得到表格数据
			_currentData = $.extend([],excelData);
			var height = $(window).height()-670;
			if(height < 100){
				height = 100;
			}

			$("#excel-data").attr("data-height",$(window).height()/3);
			if(_isExcelInit){
				//初始化后
				$("#excel-data").handsontable("loadData",excelData);  
			}else{
				//初始化数据表格
		        $("#excel-data").handsontable({
		        	fixedRowsTop:1,			//头部不动
		        	fixedColumnsLeft:1,		//第一列不动
		        	startRows : 20,
					startCols : 12,
					height : height,
					width : '90%',
					colHeaders : true,
					rowHeaders : true,
					stretchH:'all',
					columnSorting : true,
					contextMenu : true,
		        	minSpareRows: 1,
		        	autoWrapRow: true,
		        	contextMenu: true,
		        	data:excelData,
					afterChange : function(change, source) {
						if(_handsontableObj == null){
							_handsontableObj = this;
						}
						if(source == 'edit'){
							_isEditedData = true;
							
							//得到表格数据
							_currentData = this.getData();	
						}
					}
		        });
		        
		        _isExcelInit = true;
			}
		};

		/**
		 *
		 *
		 * json中的chartData转换成handsontable数据
		 */
		var jsonchartDataToHandsontableExcel=function(data){
			//得到表格数据
			_currentData = $.extend([],data);

			var excelData = _currentData;

			var height = $(window).height()-670;
			if(height < 100){
				height = 100;
			}
			$("#excel-data").attr("data-height",$(window).height()/3);
			if(_isExcelInit){
				//初始化后
				$("#excel-data").handsontable("loadData",excelData);
			}else{
				//初始化数据表格
				$("#excel-data").handsontable({
					fixedRowsTop:1,			//头部不动
					fixedColumnsLeft:1,		//第一列不动
					startRows : 20,
					startCols : 12,
					height : height,
					width : '90%',
					colHeaders : true,
					rowHeaders : true,
					stretchH:'all',
					columnSorting : true,
					contextMenu : true,
					minSpareRows: 1,
					autoWrapRow: true,
					contextMenu: true,
					data:excelData,
					afterChange : function(change, source) {
						if(_handsontableObj == null){
							_handsontableObj = this;
						}
						if(source == 'edit'){
							_isEditedData = true;

							//得到表格数据
							_currentData = this.getData();
						}
					}
				});

				_isExcelInit = true;
			}
		}
		
		var isRightData = function(){
			return _isRightData;
		};
		
		var isEditedData = function(){
			return _isEditedData;
		};
		
		var setCurrentData = function(data){
			_currentData = data;
		};

		var getHandsontableObj = function(){
			return _handsontableObj;
		};
		
		return {
			init:init,
			jsonToHandsontableExcel:jsonToHandsontableExcel,
			getCurrentData:getCurrentData,
			isRightData:isRightData,
			isEditedData:isEditedData,
			setCurrentData:setCurrentData,
			getHandsontableObj:getHandsontableObj,
			jsonchartDataToHandsontableExcel:jsonchartDataToHandsontableExcel
		};
	})();
	
	
	/**
	 * 登录信息*/

	

	/**
	 * 上传文件
	 */
	var Upload = (function() {
		
		/**
		 * 初始化
		 */
		var init = function(){
			//绑定事件
			bindUploadEvent(false);
			
			//校验是否可以选择
			$("#form input[name=file]").click(function(){
				var dataLoading = $("#infont_inmput_name").attr("data-loading");
				if(dataLoading === "1"){
					return false;
				}
				return true;
			});
		};
		
		/**
		 * 绑定上传事件
		 */
		var bindUploadEvent = function(reBind){
			if(reBind){
				//重置上传文件空间
				
				var file = "<span id='infont_inmput_name' data-loading='0'>导入excel数据</span>";
				file += "<input name='file' type='file' accept='.xls,.xlsx' style='cursor: pointer;'>";
				$("#infont_inmput").html(file);
				
				//重置绑定iframe
				var index = "-"+(new Date()).getTime()+"-"+(Math.floor(Math.random()*10000));
				var iframeId = "upload-frame"+index;

				$("form#form").attr("target",iframeId);
				var $iframe =  $("<iframe id='"+iframeId+"' name='"+iframeId+"' style='display:none;'></iframe>").appendTo($("#iframe-container").html(""));
				$iframe.one("load", function(){
		            var c = $(this).contents().find("body");
		            var re = $.trim(c.text());

					$("#infont_inmput_name").html("导入excel数据").attr("data-loading","0");
		            if (re){
		                getUploadResult(re);
		            }else{
						SGIS.UI.alert("文件上传失败！",
							null,false,function(modal){
								modal.css({
									"top":"40%",
									"height":"60px",
									"width":"300px",
									"margin-left":"-20px",
									"overflow":"hidden",
									"background-color":"transparent",
									"border":"none"
								});

								modal.find(".content>.ui.label").css({
									"font-size":"16px"
								});
							});
		            }
		            //重置一下
		            reset();	
		            c.empty();
		            
		            //重新绑定
		            bindUploadEvent(true);
				});
			}else{
				$("#upload-frame").one("load", function(){
		            var c = $(this).contents().find("body");
		            var re = $.trim(c.text());

					$("#infont_inmput_name").html("导入excel数据").attr("data-loading","0");
		            if (re){
		                getUploadResult(re);
		            }else{
						SGIS.UI.alert("文件上传失败！",
							null,false,function(modal){
								modal.css({
									"top":"40%",
									"height":"60px",
									"width":"300px",
									"margin-left":"-20px",
									"overflow":"hidden",
									"background-color":"transparent",
									"border":"none"
								});

								modal.find(".content>.ui.label").css({
									"font-size":"16px"
								});
							});
		            }
		            //重置一下
		            reset();	
		            c.empty();
		            
		            //重新绑定
		            bindUploadEvent(true);
				});
			}
			
			//选择文件
			$("#form input[name=file]").off("change");
			$("#form input[name=file]").change(function() {	
				var $this = $(this);
				var file = $this.val();
				var isOk = valiation();
				if(isOk){
					$("#infont_inmput_name").html("请稍后...").attr("data-loading","1");
					var dom =document.getElementById("form");
					if(dom){
						dom.submit();
					}else{
						$("#infont_inmput_name").html("导入excel数据").attr("data-loading","0");
					}
				}else{
					$("#infont_inmput_name").html("导入excel数据").attr("data-loading","0");
				}
			});
		};
		
		/**
		 * 重置表单
		 */
		var reset = function(){
			var dom =document.getElementById("form");
			if(dom){
				dom.reset();
			}
			$("#form input[name=file]").val("");
		};
		
		/**
		 * 取得上传结果
		 */
		var getUploadResult = function(re){
			var re = JSON.parse(re);
			if(re){
				SGIS.UI.alert(re.message,
					null,false,function(modal){
						modal.css({
							"top":"40%",
							"height":"60px",
							"width":"300px",
							"margin-left":"-20px",
							"overflow":"hidden",
							"background-color":"transparent",
							"border":"none"
						});

						modal.find(".content>.ui.label").css({
							"font-size":"16px"
						});
					});
				if(re.code == 0){
					if(re.excelFileName){
						var data = $.extend([],re.excelFileName);
						
						//保存数据
						HandsontableExcel.setCurrentData(data);
						//初始化后
						$("#excel-data").handsontable("loadData",data); 
						//刷新数据
						$("#refresh_json").click();
					}else{
						var url = require.resolve("/uploads/json/"+re.fileName);
						$.getJSON(url,function(data){
							//excel数据
				      	   	HandsontableExcel.jsonToHandsontableExcel(data);
							//刷新数据
							$("#refresh_json").click();
						});
					}
				}
			}else{
				SGIS.UI.alert("文件上传失败！",
					null,false,function(modal){
						modal.css({
							"top":"40%",
							"height":"60px",
							"width":"300px",
							"margin-left":"-20px",
							"overflow":"hidden",
							"background-color":"transparent",
							"border":"none"
						});

						modal.find(".content>.ui.label").css({
							"font-size":"16px"
						});
					});
			}
		};
		
		/**
		 * 验证
		 */
		var valiation = function(){
			var file =  $("#form input[name=file]").val();
			if(!file || file == ""){
				SGIS.UI.alert("请先选择文件！",
					null,false,function(modal){
						modal.css({
							"top":"40%",
							"height":"60px",
							"width":"300px",
							"margin-left":"-20px",
							"overflow":"hidden",
							"background-color":"transparent",
							"border":"none"
						});

						modal.find(".content>.ui.label").css({
							"font-size":"16px"
						});
					});
				return false;
			}
			var suffix = file.substr(file.lastIndexOf(".")).toLowerCase();
			if(suffix != ".xls" && suffix != ".xlsx"){
				SGIS.UI.alert("请选择excel文件！",
					null,false,function(modal){
						modal.css({
							"top":"40%",
							"height":"60px",
							"width":"300px",
							"margin-left":"-20px",
							"overflow":"hidden",
							"background-color":"transparent",
							"border":"none"
						});

						modal.find(".content>.ui.label").css({
							"font-size":"16px"
						});
					});
				return false;
			}
			
			return true;
		};
		
		
		return {
			init:init
		};
	})();
	
	
	/**
	 * 接口
	 */
	var Hanlder = (function() {
		//当前的图形类型
		var _chartTypeChart = null;
		var _chartObj = null;
		var _chartConfig = null;
		
		/**
		 * 上传图标初始化
		 */
		var init = function(isCanInit) {
			browerHanlder();
			beforeInit();
			if(!isCanInit)
                return ;

			_chartTypeChart = $("#form input[name=chart-type-chart]").val();

			setNameAndMemoAndImg(function(){
				bindEvent();

                //获取模板数据
                getTemplateData(function(){
                    if(_isIe){
                        //修改样式
                        IEStyle();
                    }
                });


			});
		};
		
		/**
		 * 设置填写的提示信息
		 * @param callback
		 */
		var setNameAndMemoAndImg = function(callback){
			var configUrl = "js/config/chart.name.config.json";
			$.getJSON(configUrl,function(config){
				var name  = null;
				if(config && config.echarts){
					name = config.echarts[_chartTypeChart];
				}
				if(!name || name == null){
					name = "";
				}

				$("input#chart-name").val(name+$("input#chart-name").val());
				$("input#chart-name").attr("placeholder",$("input#chart-name").val());
				$("textarea#chart-memo").attr("placeholder",name+$("textarea#chart-memo").attr("placeholder"));

				$("<img style='max-width:100%' src='./image/echarts/"+_chartTypeChart+".excel.png' />").appendTo($("#code-api"));

				callback && callback();
			});
		};
		
		/**
		 * 初始化之前
		 */
		var beforeInit = function(){
			$("#change_image").click(function() {
				UserInfo.getUserInfo(function(userInfo){

					SGIS.UI.alert(alertMsg,
						null,true,function(modal,close){
							modal.css({
								"top":"40%",
								"width":"300px",
								"margin-left":"-20px",
								"height":"100px",
								"overflow":"hidden"
							});

						});
				});
			});
			
			$("#go_gallery").click(function() {
				var url = SGIS.API.getURL("")+"http/";
				window.open(url, "_blank");
			});

			$("#my_images").click(function() {
				var alertMsg = "<a class='ui blue button save' type='button' style='margin-right: 8px;' >保存</a>"+
					"<a class='ui blue button un-save' type='button' style='margin-right: 8px;' >不保存</a>"+
					"<a class='ui button cancle' type='button'>取消</a>";
				SGIS.UI.alert(alertMsg,
					null,true,function(modal,close){
						modal.css({
							"top":"40%",
							"height":"60px",
							"width":"300px",
							"margin-left":"-20px",
							"height":"100px",
							"overflow":"hidden"
						});







					});
			});
		};
		
		/**
		 * 绑定事件
		 */
		var bindEvent = function(){
			/**
			 * 绑定事件
			 */
			$("input#chart-name,textarea#chart-memo").on("click",function(){
				var $this = $(this);
				
				$this.attr("readonly",false);
				$this.removeClass("read-only");
			}).on("blur",function(){
				var $this = $(this);
				
				$this.attr("readonly",true);
				$this.addClass("read-only");
			});
			
			$("#download_excel_template_btn").click(function(){
				var url = "excelTemplate/echarts/"+_chartTypeChart+".template.xlsx";
				window.open(url,"_blank");
			});

			$("#code-api-switch").change(function(){
				var height = $(window).height()-670;
				var isCheck = $(this).is(":checked");
				if(isCheck){
					$("#code-api-panel").fadeIn(100);
					var dataHeight = $("#excel-data").attr("data-height");
					if(dataHeight && dataHeight != "" && parseFloat(dataHeight) > 0){
						height = parseFloat(dataHeight);
					}
				}else{
					$("#code-api-panel").fadeOut(100);
				}

				//修改样式
				var handsontableObj = HandsontableExcel.getHandsontableObj();
				if(handsontableObj != null && typeof handsontableObj.updateSettings == "function"){
					if(height < 100){
						height = 100;
					}

					handsontableObj.updateSettings({"height":height});
				}
			});
		};
		
		/**
		 * 取得模板数据
		 */
		var getTemplateData = function(callback){
			var url = SGIS.Config.BASE_MODULE_URL + "js/module/echarts/"
				+_chartTypeChart+".text.json";
				//excel数据
				//复杂json格式，可在json中设置chartData模式
				$.getJSON(url,function(data){
					if(_chartTypeChart=="echarts.parallel"){
						HandsontableExcel.jsonchartDataToHandsontableExcel(data.excelData);
						//出图
						var jsUrl = "base/js/module/echarts/"+_chartTypeChart;
						var styleUrl = "tool/js/module/style/echarts/"+_chartTypeChart+".style";
						seajs.use([jsUrl,styleUrl],function(re,style){
							if(re){
								var obj = new re();
								var height = $(window).height()-290;

								var objConfig = {
									container:'content',
									width:$("#content").parent().width()-46,	//36->46
									height:(height < 400) ? 400 : height,
									data:data.chartData
								};

								obj.init(objConfig);

								$("#refresh_json").click(function(){
									//获取当前数据
									HandsontableExcel.getCurrentData(function(newData){
										if(newData != null){
											if(newData.chartData){
												objConfig["data"] = newData.chartData;
											}else{
												objConfig["data"] = newData;
											}
											obj.init(objConfig);

											if(style && typeof style.reBindColorSelect == "function"){
												//重新绑定颜色选择器
												style.reBindColorSelect(obj,objConfig);
											}
										}
									});
								});



								if(style){
									//注意style的init方法必须放在【_chartObj，_chartConfig】被初始化以后
									style.init(Hanlder,null,function(){
										console.log("消息提示：初始化完成！");

										//设置图形的高度
										var height = objConfig.height;
										$("#chart-chart-height-range").val(height);
										$("#chart-chart-height-text").val(height);

										style.setHeight(height);


										//地图模块初始化数据值域
										if(style.initDataRangeControll &&
											typeof style.initDataRangeControll == "function"){
											if(_chartObj.option && _chartObj.option.dataRange){
												var dataRange = $.extend(true,{},_chartObj.option.dataRange);
												if(typeof dataRange.min != "undefined" &&
													typeof dataRange.max != "undefined"){
													style.initDataRangeControll(Hanlder,dataRange.min,dataRange.max);
												}//end if(typeof dataRange.min
											}//end if(_chartObj.option
										}//end if(style.initDataRangeControll

										//响应式刷新图
										$(window).resize(SGIS.Util.throttle(function(){
											_chartConfig["width"]= $("#content").parent().width()-46;	//36->46
											_chartObj.init(_chartConfig);
										},2000));
									});
								}
							}else{
								SGIS.UI.alert("未找到数据！该图无法显示！",
									null,false,function(modal){
										modal.css({
											"top":"40%",
											"height":"60px",
											"width":"300px",
											"margin-left":"-20px",
											"overflow":"hidden",
											"background-color":"transparent",
											"border":"none"
										});

										modal.find(".content>.ui.label").css({
											"font-size":"16px"
										});
									});
							}

							callback && callback();
						});
					}
					else{
							HandsontableExcel.jsonToHandsontableExcel(data);
						//出图
						var jsUrl = "base/js/module/echarts/"+_chartTypeChart;
						var styleUrl = "tool/js/module/style/echarts/"+_chartTypeChart+".style";
						seajs.use([jsUrl,styleUrl],function(re,style){
							if(re){

								var obj = new re();
								var height = $(window).height()-290;

								var objConfig = {
									container:'content',
									width:$("#content").parent().width()-46,	//36->46
									height:(height < 400) ? 400 : height,
									data:data
								};

								//（三视图）暂时支持北京地图
								if(_chartTypeChart == "echarts.three.view"){
									objConfig["map"] = {
										type:"map_110000000000",
										url:style.MapDataHanlder.getJsonFilePath(2,"110000000000"),
										level:2,
										regioncode:"110000000000",				//当前的行政区划(北京)
										snregioncode:"000000000000",			//省级的上一级是全国
										snType:"北京"							//标记当前选择：北京
									};
								}else if(_chartTypeChart == "echarts.three.pie"){
									//3饼 高度不一致
									objConfig.height = 300;
								}
								obj.init(objConfig);

								$("#refresh_json").click(function(){
									//获取当前数据
									HandsontableExcel.getCurrentData(function(newData){
										if(newData != null){
											if(newData.chartData){
												objConfig["data"] = newData.chartData;
											}else{
												objConfig["data"] = newData;
											}
											obj.init(objConfig);

											if(style && typeof style.reBindColorSelect == "function"){
												//重新绑定颜色选择器
												style.reBindColorSelect(obj,objConfig);
											}
										}
									});
								});

								//保存信息
								_chartObj = obj;
								_chartConfig = objConfig;

								if(style){
									//注意style的init方法必须放在【_chartObj，_chartConfig】被初始化以后
									style.init(Hanlder,null,function(){
										console.log("消息提示：初始化完成！");

										//设置图形的高度
										var height = objConfig.height;
										$("#chart-chart-height-range").val(height);
										$("#chart-chart-height-text").val(height);

										style.setHeight(height);

										//获取三视图
										if(_chartTypeChart == "echarts.three.view"){
											style.getContainer().map = {
												type:"map_110000000000",
												url:style.MapDataHanlder.getJsonFilePath(2,"110000000000"),
												level:2,
												regioncode:"110000000000",				//当前的行政区划(北京)
												snregioncode:"000000000000",			//省级的上一级是全国
												snType:"北京"							//标记当前选择：北京
											};
										}

										//地图模块初始化数据值域
										if(style.initDataRangeControll &&
											typeof style.initDataRangeControll == "function"){
											if(_chartObj.option && _chartObj.option.dataRange){
												var dataRange = $.extend(true,{},_chartObj.option.dataRange);
												if(typeof dataRange.min != "undefined" &&
													typeof dataRange.max != "undefined"){
													style.initDataRangeControll(Hanlder,dataRange.min,dataRange.max);
												}//end if(typeof dataRange.min
											}//end if(_chartObj.option
										}//end if(style.initDataRangeControll

										//响应式刷新图
										$(window).resize(SGIS.Util.throttle(function(){
											_chartConfig["width"]= $("#content").parent().width()-46;	//36->46
											_chartObj.init(_chartConfig);
										},2000));
									});
								}
							}else{
								SGIS.UI.alert("未找到数据！该图无法显示！",
									null,false,function(modal){
										modal.css({
											"top":"40%",
											"height":"60px",
											"width":"300px",
											"margin-left":"-20px",
											"overflow":"hidden",
											"background-color":"transparent",
											"border":"none"
										});

										modal.find(".content>.ui.label").css({
											"font-size":"16px"
										});
									});
							}

							callback && callback();
						});
					}




				});


		};
		/**
		 * 取得当前图类型
		 */
		var getChartTypeChart = function(){
			return _chartTypeChart;
		};
		
		/**
		 * 取得出图对象
		 */
		var getChartObj = function(){
			return _chartObj;
		};
		
		/**
		 * 取得出图对象配置参数
		 */
		var getChartConfig = function(){
			return _chartConfig;
		};
	
		return {
			init : init,
			getChartObj:getChartObj,
			getChartConfig:getChartConfig,
			getChartTypeChart:getChartTypeChart
		};
	})();
	
	
	return Hanlder;
});









