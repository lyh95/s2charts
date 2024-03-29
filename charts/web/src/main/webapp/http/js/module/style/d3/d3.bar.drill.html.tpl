<h4 style="font-family:微软雅黑;">
	<small>
		可以调整参数后动态改变可视化图样式
	</small>
</h4>
<ul class="nav nav-list bs-docs-sidenav pull-left">
  <li class="active"><a href="#panel-common" data-toggle="tab">通用</a></li>
</ul>		
<div class="tab-content bs-docs-sidenav-content pull-left">
  <div class="tab-pane active" id="panel-common">
    <div class="panel panel-default">
    	<div class="panel-body">
    		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	图高度
		      	</span>
		       	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-d3-height-range" type="range" value="200" min="200" max="800">
		       	</span>
		      	<input id="chart-d3-height-text" type="text" class="form-control"  disabled="disabled" value="200" style="width:60px;" >
		       	<span class="input-group-addon" style="width:auto;">
		       		px
		       	</span>
		    </div><!-- /input-group -->
		    <br/>
			<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	图宽度
		      	</span>
		       	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-d3-width-range" type="range" value="1105" min="800" max="1500">
		       	</span>
				<input id="chart-d3-width-text" type="text" class="form-control"  disabled="disabled" value="1105" style="width:60px;" >
		       	<span class="input-group-addon" style="width:auto;">
		       		px
		       	</span>
			</div><!-- /input-group -->
			<br/>
	  		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	文本宽度
		      	</span>
		       	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-d3-text-width-range" type="range" value="400" min="0" max="500">
		       	</span>
		      	<input id="chart-d3-text-width-text" type="text" class="form-control" disabled="disabled" value="400" style="width:60px;" >
		       	<span class="input-group-addon" style="width:auto;">
		       		px
		       	</span>
		    </div><!-- /input-group -->
		    <br/>
		    <div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	文本旋转角度
		      	</span>
		       	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-d3-textRotate-range" type="range" value="0" min="-90" max="90">
		       	</span>
		      	<input id="chart-d3-textRotate-text" type="text" class="form-control" disabled="disabled" value="0" style="width:60px;" >
		       	<span class="input-group-addon" style="width:auto;">
		       		度（°）
		       	</span>
		    </div><!-- /input-group -->
    	</div>
    </div>
  </div>
</div>
<div class="clearfix"></div>