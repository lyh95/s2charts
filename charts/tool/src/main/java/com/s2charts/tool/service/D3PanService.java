package com.s2charts.tool.service;


import com.s2charts.tool.common.Result;

import java.io.File;

/**
 * 
 * @author Linhao
 *
 */
public class D3PanService extends D3BarDrillService {
	
	@Override
	public Result createJsonFileByExcel(File excelFile, File dir,
                                        String fileName) {
		return super.createJsonFileByExcel(excelFile, dir, fileName);
	}
}
