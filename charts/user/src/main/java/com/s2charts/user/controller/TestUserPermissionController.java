package com.s2charts.user.controller;

import com.s2charts.dao.entity.user.SysUserPermission;
import com.s2charts.user.service.TestUserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//测试用户是否有某张图的权限controller
@RestController
public class TestUserPermissionController {
    @Autowired
    private TestUserPermissionService testUserPermissionService;

    @RequestMapping(value = {"/testuserper"})
    @ResponseBody
    public boolean test(@RequestParam("userId") Integer userId, @RequestParam("userPic") String userPic) {
        List<SysUserPermission> users = testUserPermissionService.selectPermissionById(userId, userPic);
        String s = "";
        for (SysUserPermission user : users) {
            s = s + user.getUserId() + user.getUserPic();
        }
        System.out.println(s);
        if (s == null || s.length() <= 0)
            return false;
        else
            return true;
    }
}
