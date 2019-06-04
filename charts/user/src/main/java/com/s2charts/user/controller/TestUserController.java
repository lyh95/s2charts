package com.s2charts.user.controller;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.s2charts.dao.entity.user.SysUser;
import com.s2charts.user.service.TestUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.List;


//测试用户的登录controller
@RestController
public class TestUserController {
    @Autowired
    private TestUserService testUserService;

    //检验当前登录状态，并且获取当前用户名
    @RequestMapping(value = {"/checklogin"})
    @ResponseBody
    public JsonNode getCurrentUsername() throws Exception{
        JsonNode jsonNode=null;
        if(SecurityContextHolder.getContext().getAuthentication().getName()!="anonymousUser"){
            String user = SecurityContextHolder.getContext().getAuthentication().getName();
            String json ="{\"code\":200,\"username\":\""+user+"\"}";
            ObjectMapper mapper = new ObjectMapper();
             jsonNode =mapper.readTree(json);
//            objectNode = (ObjectNode) jsonNode;
//            objectNode.put("username",user);
        }
        else{
            String json ="{\"username\":\"null\",\"code\":400}";
            ObjectMapper mapper = new ObjectMapper();
            jsonNode = mapper.readTree(json);
        }
        return jsonNode ;
    }



}
