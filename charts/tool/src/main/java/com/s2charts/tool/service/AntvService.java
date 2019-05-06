package com.s2charts.tool.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.s2charts.tool.util.PropertiesConfigUtil;

import java.math.BigDecimal;

/**
 * Antv 服务
 * 
 * @author Linhao,Fan Weihua
 * 
 */
public abstract class AntvService extends Service {
	/**
	 * 判断参数是否正确
	 * 
	 * @param type
	 * @return
	 */
	public static final boolean isRightAntvType(String type){
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
	public abstract JSONObject AntvFormat(JSONArray jsonArray);

	/**
	 * 保留一位有效数字
	 */
	public double retainOne(double d) {
		BigDecimal b = new BigDecimal(d);
		double f1 = b.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();

		return f1;
	}
	/**
	 * 保留三位有效数字
	 */
	public double retainThree(double d) {
		BigDecimal b = new BigDecimal(d);
		double f1 = b.setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue();

		return f1;
	}


}
