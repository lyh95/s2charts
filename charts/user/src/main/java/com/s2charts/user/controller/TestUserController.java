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
    @RequestMapping(value = {"/testuser"})
    @ResponseBody
    public String testuser(@RequestParam("userName")String userName,@RequestParam("passWord")String passWord, HttpServletRequest request){

        List<SysUser> user = testUserService.selectUser(userName,passWord);
        String s="";
        for(SysUser users:user)
        {
            s=s+users.getUserName()+users.getPassWord();
        }
        System.out.println(s);
        if(s == null || s.length()<=0){
            return "error";
        }
        else
            request.getSession().setAttribute("session_user",user);     //将用户信息放入session
            return "success";
    }


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
