package com.s2charts.map.controller;

import com.s2charts.dao.entity.User;
import com.s2charts.map.service.TestDaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestDaoController {
    @Autowired
    private TestDaoService testDaoService;
    @RequestMapping("/testdao")
    public String test(){
        List<User> users=testDaoService.getAllUsers();
        String re="";
        for (User user:users){
            re=re+user.getName()+user.getId();
        }
        return re;
    }
}
