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


//测试用户的登录/注册的controller
@RestController
public class CheckLoginController {
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

    //注册
    @ResponseBody
    @RequestMapping(value = {"/doRegister"})
    public Integer addUser(@RequestParam("username") String username,
                          @RequestParam("password1") String password1,
                          @RequestParam("password2") String password2){

        if (!password1.equals(password2)) {

           // return "两次密码不相同，注册失败！！";
            return 401;
        }
        if(username==null||"".equals(username)||password1==null||"".equals(password1)||password2==null||"".equals(password2))
        {
           // return"用户名或者密码并不能为空";
            return 402;
        }
        else {
            int res = testUserService.adduser(username, password1);
            if (res == 0) {
               // return "注册失败！";
                return 404;
            } else {
               // return "注册成功！";
                return 200;
            }
        }
    }
}
