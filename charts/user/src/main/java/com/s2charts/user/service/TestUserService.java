package com.s2charts.user.service;

import com.s2charts.dao.entity.user.SysUser;
import com.s2charts.dao.mapper.user.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TestUserService {
    @Autowired
    private SysUserMapper sysUserMapper;

    public List<SysUser> selectUser(String userName, String passWord){

        return sysUserMapper.selectUser(userName,passWord);
    }
}
