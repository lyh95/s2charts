package com.s2charts.user.service;

import com.s2charts.dao.entity.user.SysUser;
import com.s2charts.dao.mapper.user.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
//通过用户名查询出用户的role_id
public class TestUserService {
    @Autowired
    private SysUserMapper sysUserMapper;

    public int selectIdByUsername(String username){

        return sysUserMapper.selectIdByUsername(username);
    }
    //注册
    public int adduser(String username,String password){
        return sysUserMapper.adduser(username,password);
    }
}
