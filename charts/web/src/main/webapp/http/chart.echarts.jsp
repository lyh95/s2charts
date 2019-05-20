<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ page import="com.s2charts.tool.http.Parameters" %>
<%@ page import="com.s2charts.tool.service.EchartsService" %>

<%
    Parameters parameters = new Parameters(request);
    String chartTypeChart = parameters.getParameter("chart-type-chart");
%>
<!DOCTYPE html>
<html>
<head>
    <title>在线工具制图</title>
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="/http/lib/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/http/lib/semantic/css/semantic.css" rel="stylesheet">
    <link href="/http/lib/handsontable/handsontable.full.min.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <link href="css/chart.css" rel="stylesheet">
    <link href='/http/lib/spectrum-master/spectrum.css' rel='stylesheet'/>
    <link href='/http/lib/jquery.range.css' rel='stylesheet'/>

    <script type="text/javascript" src="/http/lib/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="/http/lib/jquery.range.js"></script>
    <script type="text/javascript" src="/http/lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/http/lib/json2.js"></script>
    <script type="text/javascript" src="/http/lib/html2canvas.js"></script>
    <script type="text/javascript" src="/http/lib/json.show.format.js"></script>
    <script type="text/javascript" src="/http/lib/handsontable/handsontable.min.js"></script>
    <script type="text/javascript" src='/http/lib/spectrum-master/spectrum.js'></script>
    <script type="text/javascript" src="/base/http/lib/Echarts/echarts-4.2.1/echarts.js"></script>
    <script type="text/javascript" src="/http/lib/Echarts/echarts-liquidfill.js"></script>
    <script type="text/javascript" src="/base/http/js/common/SGIS.Base.js"></script>
    <style>
        #excel-data {
            height: 100%;
            width: 100%;
        }

        .leftbarstyle {
            margin-top: 10px;
            margin-bottom: 10px;
            align-items: center;
            display: inline-block;
            width: 100%;
        }

        .btnstyle {
            background-color: #333333;
            border-color: #333333;
        }

        .astyle {
            color: #EEEEEE;
            font-size: 16px;
            font-family: 微软雅黑;
        }

        .glyphicon {
            padding-right: 2px;
            font-size: 16px;
            color: #EEEEEE;
        }

        .nav-pills > li > a {
            border-radius: 0;
        }

        .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {
            color: #800000;
            background-color: #D8BFD8;
        }

        .nav-pills > li > a:hover {
            color: #800000;
            background-color: #D8BFD8;
        }

        .buttonstyle {
            background-color: #D8BFD8;
            color: #800000;
        }
        li{
            list-style: none;
        }

    </style>
</head>
<body>
<div id="top-alert-container" class="IEindecl"
     style="display:none;position: fixed;top:0px;z-index:100000;width: 100%;height: 50px;background: #FFC125;font-family: 微软雅黑;font-size: 1.3em;">
    <div style="padding-top:15px;padding-left:10px;float:left;">
        <p>
            您正在使用的浏览器可能不能得到很好的体验，为了得到更好的体检，建议您安装
            <a target="_blank" href="../browers/ChromeStandalone_V45.0.2454.101_Setup.1443151805.exe"
               style="text-decoration: none;">谷歌浏览器(Chrome)</a>
            / <a target="_blank" href="../browers/Firefox_V39.0.0.5659_setup.1435906049.exe"
                 style="text-decoration: none;">火狐浏览器(FireFox)</a>
            等主流浏览器
        </p>
    </div>
    <div style="float:right;padding-top:15px;padding-right:20px;cursor: pointer;">
        <a id="remove-top-btn" title="点击关闭" href="javascript:;">
            <i id="remove_cion" class="remove icon"></i>
        </a>
    </div>
    <div class="clearfix"></div>
</div>
<!--顶部导航-->
<nav class="navbar navbar-inverse navbar-fixed-top" id="navbar" role="navigation">
</nav>
<%
    if (chartTypeChart == null || chartTypeChart.isEmpty()) {
%>
<!-- #container-1 -->
<div class="container" style="padding-top: 60px;width:1000px;">
    <div class="form_up">
        <h1>参数错误！</h1>
    </div>
</div>
<%
} else if (!EchartsService.isRightEchartsType(chartTypeChart)) {
%>
<div class="container" style="padding-top: 60px;width:1000px;">
    <div class="form_up container" style="margin:auto;width:1000px;">
        <h1>请选择正确的图集！</h1>
    </div>
</div>
<%
} else {
%>
<div class="container-fluid" style="padding-top: 65px;">
    <!-- 左右 -->
    <div class="row">
        <div class="col-xs-12 col-md-1"
             style="background-color:#333333;height: 400px;margin-top: 40px;width: 90px;padding-left: 0;padding-right: 0; ">
            <ul class="nav nav-pills nav-stacked" style="display: block;margin-top: 110%;">
                <li class="active leftbarstyle">
                    <a href="#data-pane" data-toggle="tab" class="astyle"><span class="glyphicon glyphicon-th-list "
                                                                                style="padding-right: 4px"></span>数据</a>
                </li>
                <li class="leftbarstyle">
                    <%--没做--%>
                    <a href="#figure-pane " data-toggle="tab" class="astyle"> <span class="glyphicon glyphicon-picture"
                                                                                    style="padding-right: 4px"></span>图型</a>
                </li>
                <li class="leftbarstyle">
                    <a href="#param-pane" data-toggle="tab" class="astyle"> <span class="glyphicon glyphicon-edit"
                                                                                  style="padding-right: 4px"></span>编辑</a>
                </li>
            </ul>
        </div>
        <div class="col-xs-12 col-md-5" style="margin-top: 3%">
            <!-- 选项卡 -->
            <li class="pull-right">
                <div class="pull-left">
                    <button type="button" class="btn btnstyle" style='margin-right: 8px;' id="refresh_json">
                        <span class="glyphicon glyphicon-refresh" class="astyle">刷新数据</span>
                    </button>
                </div>
                <div class="pull-left">

                    <button type="button" class="btn btnstyle" id="infont_inmput" style='margin-right: 8px;'>

                        <form id="form" name="form" target="upload-frame" method="post" enctype="multipart/form-data"
                              action="upload" style="height: 20px">

                            <span id="infont_inmput_name" data-loading='0' class="astyle">导入excel数据</span>
                            <input name="file" type="file" accept=".xls,.xlsx" style="cursor: pointer;">

                            <input type="hidden" name="chart-type-chart" value="<%=chartTypeChart %>">
                            <input type="hidden" name="action" value="echarts">
                        </form>
                    </button>

                    <div id="iframe-container">
                        <iframe name="upload-frame" id="upload-frame" style="display: none;"></iframe>
                    </div>

                </div>
            </li>
            <div class="tab-content" style="margin-top: 10%">
                <div class="tab-pane active" id="data-pane">
                    <h4 style="font-family:微软雅黑;">
                        <small>
                            可以编辑正确的数据后点击【刷新数据】按钮绘图
                            <a id="download_excel_template_btn" href="javascript:;">下载EXCEL模板</a>
                        </small>
                    </h4>
                    <div id="excel-data"></div>
                    <br/>
                </div>
                <div class="tab-pane" id="param-pane"></div>
                <!-- .tab-content -->
            </div><!-- .col-xs-5 -->
        </div>
        <div class="col-xs-12 col-md-6" style="margin-top: 3%">
            <li class="pull-right" style="width: 300px">
                <div class="pull-left">
                    <button type="button" class="btn btnstyle" style="background-color: #333333">
                      <span class="glyphicon glyphicon-download-alt">下载
                      <a href="./image/echarts/<%=chartTypeChart %>.png" ; download="11111.jpg" style="color: #EEEEEE"></a>
                      </span>

                    </button>
                </div>
                <div class="pull-left" style="margin-left: 1%">

                    <button type="button" value="提交" class="btn btnstyle" style="background-color: #333333">
                        <span class="glyphicon glyphicon-check"><a href="#"></a>保存</span>
                    </button>

                </div>
                <div class="pull-left" style="margin-left: 1%">
                    <button type="button" class="btn btnstyle" style="background-color: #333333"><span
                            class="glyphicon glyphicon-heart"><a href="#"></a>收藏</span></button>
                </div>
            </li>
            <div style="padding-right:20%;margin-top:2%;">
                <!-- 图 -->
                <div id="content" style="width:100%;/*top:150px;*/" class="imageID"></div>
            </div>

        </div><!-- .col-xs-7 -->

    </div>
    <script>
        $(":button").click(function () {
            $(":button").css("background", "#333333")
            $(this).css("background", "#D8BFD8");
        })

        // $ (":button").click(function(){
        //     $(this).addClass("buttonstyle")})
    </script>

        <%
	}
%>
</body>
<link href="/http/css/navBar.css" rel="stylesheet">
<script type="text/javascript" src='/base/http/lib/icon/iconfont.js'></script>
<script type="text/javascript" src="/http/js/narBar.js"></script>

<script type="text/javascript" src="/http/js/cookie.js"></script>

<script type="text/javascript">
    //是否初始化
    var IS_CAN_INIT = <%= !(chartTypeChart == null || chartTypeChart.isEmpty()) ? true : false %>;
</script>
<script type="text/javascript" src="/base/http/lib/seajs/sea.js"></script>
<script type="text/javascript" src="/base/http/lib/seajs/seajs-text.js"></script>
<script>
    seajs.config({
        base: SGIS.Config.TOOL_MODULE_URL,			//基础路径
        paths: {
            base: SGIS.Config.BASE_MODULE_URL,		//跨目录的base路径
            tool: SGIS.Config.TOOL_MODULE_URL,		//跨目录的tool路径

        },
        map: [['.json', '.json?t=' + new Date().getTime()],
//				[ '.js', '.js?t=' + new Date().getTime() ],
//				[ '.tpl', '.tpl?t=' + new Date().getTime() ],
            ['.css', '.css?t=' + new Date().getTime()]]
    });
    seajs.use('/http/js/chart.echarts', function (obj) {
        obj.init(IS_CAN_INIT);
    });
    seajs.use('/http/js/narBar', function (obj) {
        obj.into();
    });
</script>
</html>
