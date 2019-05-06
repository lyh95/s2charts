package com.s2charts.tool.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.s2charts.tool.util.PropertiesConfigUtil;

/**
 * 
 * d3 服务
 * 
 * @author Linhao,Fan Weihua
 *
 */
public abstract class D3Service extends Service {
	
	/**
	 * 判断参数是否正确
	 * 
	 * @param type
	 * @return
	 */
	public static final boolean isRightD3Type(String type){
		if(type == null || type.isEmpty())
			return false;
		
		type = type.toLowerCase();

		String key = type+ PropertiesConfigUtil.DEFAULT_SUFFIX_NAME;
		return PropertiesConfigUtil.contains(key);
	}

	/**
	 * excel数据格式化
	 * @param jsonArray
	 * @return
	 */
	public abstract JSONObject d3Format(JSONArray jsonArray);
}
