package com.s2charts.user.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		//前面是url路径，后面是视图路径，添加thymeleaf后自动配置prefix为/templates,suffix为.html
		registry.addViewController("/login").setViewName("/login");
		registry.addViewController("/home").setViewName("/home");
		registry.addViewController("/admin").setViewName("/admin");
		registry.addViewController("/needpermission").setViewName("/needpermission");
//		registry.addViewController("/index").setViewName("../../../../../web/src/main/webapp/http/index");



}


}
