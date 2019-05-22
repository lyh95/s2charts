package com.s2charts.user.controller;

import com.s2charts.dao.entity.user.SysUser;
import com.s2charts.user.service.CustomUserDetailsService;
import com.s2charts.user.service.TestUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
    /**
//     * 服务器端获取所有用户信息
//     */
//
////    @RequestMapping("/findAll")
////    public ModelAndView findAll(
////            @RequestParam("userName")String userName,@RequestParam("passWord")String passWord){
////
////        // 测试代码
////
////        //1. 获取绑定到当然线程上的SecurityContext
////
////        SecurityContext securityContext = SecurityContextHolder.getContext();
////
////        //2. 获取认证器对象
////
////        Authentication authentication = securityContext.getAuthentication();
////
////        //3. 获取认证身份信息. 注意这里的user是
////// org.springframework.security.core.userdetails.User
////        SysUser users = (SysUser) authentication.getPrincipal();
////
////        //4. 获取用户名
////        System.out.println(users.getUserName());
////        // 调用service查询
////        List<SysUser> userList = testUserService.selectUser(userName,passWord);
////        ModelAndView mv = new ModelAndView();
////        mv.setViewName("user-list");
////        mv.addObject("pageInfo",userList);
////        return mv;
//    }

    //获取当前用户名
    @RequestMapping(value = {"/getusername"})
    @ResponseBody
    public String getCurrentUsername() {

        return SecurityContextHolder.getContext().getAuthentication().getName();

    }
}
