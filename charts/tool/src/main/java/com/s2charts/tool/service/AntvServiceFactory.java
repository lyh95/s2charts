package com.s2charts.tool.service;

import com.s2charts.tool.system.SGISClassLoader;
import com.s2charts.tool.util.PropertiesConfigUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by LH on 2016/11/30.
 * Antv 服务工厂
 */
public class AntvServiceFactory {
    /****/
    private static Map<String, AntvService> map = new HashMap<String, AntvService>();

    /**
     * 获取Antv服务实例
     *
     * @param type
     * 			Antv 类型
     */
    public static AntvService getServiceInstance(String type) {
        if(type == null)
            return null;

        AntvService service = map.get(type);
        if(service != null)
            return service;

        //服务对应的key
        String serverKey = type+ PropertiesConfigUtil.DEFAULT_SUFFIX_SERVICE;
        //取得服务名称
        String serverValue = PropertiesConfigUtil.getValue(serverKey);
        if(serverValue != null && !"".equals(serverValue)){
            //创建类加载器
            SGISClassLoader sgisClassLoader = new SGISClassLoader();
            String className = Service.SERVICE_PACKAGE_NAME+"."+serverValue;
            Object object = sgisClassLoader.getObject(className);
            if(object != null && object instanceof AntvService){
                service = (AntvService)object;
                //保存当前服务
                map.put(type,service);
                return service;
            }else{
                System.out.println("\n");
                System.out.println("****************************************************");
                System.out.println("系统错误：【可视化制图工具】无法初始化服务【"+serverValue+"】！");
                System.out.println("****************************************************");
                System.out.println("\n");
            }
        }else{
            System.out.println("\n");
            System.out.println("****************************************************");
            System.out.println("系统错误：【可视化制图工具】配置文件chart.name.config.properties中");
            System.out.println("\t无法找到【"+serverKey+"】对应的配置！");
            System.out.println("****************************************************");
            System.out.println("\n");
        }

        return service;
    }

}
