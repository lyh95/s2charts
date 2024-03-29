package com.s2charts.tool.util;

import java.util.ArrayList;

/**
 * json 格式化
 * 
 * @author Linhao
 *
 */
public class JsonFormatTool {
	/**
	 * 制表符
	 */
	public static String FILL_STRING_UNIT_TAB = "	";
	
	/**
     * json字符串的格式化
     * @param json 需要格式的json串
     * @param fillStringUnit每一层之前的占位符号比如空格 制表符 
     * @return
     */ 
    public static String formatJson(String json) {
    	return formatJson(json,FILL_STRING_UNIT_TAB);
    }
    
	 /**
     * json字符串的格式化
     * @param json 需要格式的json串
     * @param fillStringUnit每一层之前的占位符号比如空格 制表符 
     * @return
     */ 
    public static String formatJson(String json, String fillStringUnit) {
        if (json == null || json.trim().length() == 0) { 
            return json; 
        } 
        
        if(fillStringUnit == null){
        	fillStringUnit = FILL_STRING_UNIT_TAB;
        }
         
        int fixedLenth = 0; 
        ArrayList<String> tokenList = new ArrayList<String>();
        { 
            String jsonTemp = json;
            //预读取 
            while (jsonTemp.length() > 0) { 
                String token = getToken(jsonTemp);
                jsonTemp = jsonTemp.substring(token.length()); 
                token = token.trim(); 
                tokenList.add(token); 
            }            
        } 
         
        for (int i = 0; i < tokenList.size(); i++) { 
            String token = tokenList.get(i);
            int length = token.getBytes().length; 
            if (length > fixedLenth && i < tokenList.size() - 1 && tokenList.get(i + 1).equals(":")) { 
                fixedLenth = length; 
            } 
        } 
         
        StringBuilder buf = new StringBuilder();
        int count = 0; 
        for (int i = 0; i < tokenList.size(); i++) { 
             
            String token = tokenList.get(i);
             
            if (token.equals(",")) { 
                buf.append(token); 
                doFill(buf, count, fillStringUnit); 
                continue; 
            }else if (token.equals(":")) { 
                buf.append(" ").append(token).append(" "); 
                continue; 
            }else if (token.equals("{")) { 
                String nextToken = tokenList.get(i + 1);
                if (nextToken.equals("}")) { 
                    i++; 
                    buf.append("{ }"); 
                } else { 
                    count++; 
                    buf.append(token); 
                    doFill(buf, count, fillStringUnit); 
                } 
                continue; 
            }else if (token.equals("}")) { 
                count--; 
                doFill(buf, count, fillStringUnit); 
                buf.append(token); 
                continue; 
            }else if (token.equals("[")) { 
                String nextToken = tokenList.get(i + 1);
                if (nextToken.equals("]")) { 
                    i++; 
                    buf.append("[ ]"); 
                } else { 
                    count++; 
                    buf.append(token); 
                    doFill(buf, count, fillStringUnit); 
                } 
                continue; 
            } else if (token.equals("]")) { 
                count--; 
                doFill(buf, count, fillStringUnit); 
                buf.append(token); 
                continue; 
            } 
             
            buf.append(token); 
            
            //左对齐 
            if (i < tokenList.size() - 1 && tokenList.get(i + 1).equals(":")) { 
                int fillLength = fixedLenth - token.getBytes().length; 
                if (fillLength > 0) { 
                    for(int j = 0; j < fillLength; j++) { 
                        buf.append(" "); 
                    } 
                } 
            } 
        } 
        return buf.toString(); 
    } 
     
    /**
     * 
     * @param json
     * @return
     */
    private static String getToken(String json) {
        StringBuilder buf = new StringBuilder();
        boolean isInYinHao = false; 
        
        while (json.length() > 0) { 
            String token = json.substring(0, 1);
            json = json.substring(1); 
             
            if (!isInYinHao &&  
                    (token.equals(":") || token.equals("{") || token.equals("}")  
                            || token.equals("[") || token.equals("]") 
                            || token.equals(","))) { 
                if (buf.toString().trim().length() == 0) {                   
                    buf.append(token); 
                } 
                 
                break; 
            } 
 
            if (token.equals("\\")) { 
                buf.append(token); 
                buf.append(json.substring(0, 1)); 
                json = json.substring(1); 
                continue; 
            } 
            if (token.equals("\"")) { 
                buf.append(token); 
                if (isInYinHao) { 
                    break; 
                } else { 
                    isInYinHao = true; 
                    continue; 
                }                
            } 
            buf.append(token); 
        } 
        return buf.toString(); 
    } 
 
    /**
     * 填充字符串
     * @param buf
     * @param count
     * @param fillStringUnit
     */
    private static void doFill(StringBuilder buf, int count, String fillStringUnit) {
        buf.append("\n"); 
        for (int i = 0; i < count; i++) { 
            buf.append(fillStringUnit); 
        } 
    }
    
    
    public static void main(String[] args){
    	String j = "[{\"name\":\"法人单位\",\"value\":\"单位数(万个)\"},{\"name\":\"企业法人\",\"value\":59.2},{\"name\":\"机关、事业法人\",\"value\":1.4},{\"name\":\"社会团体和其他法人\",\"value\":2.5}]";
		System.out.println(formatJson(j));
    }
}
