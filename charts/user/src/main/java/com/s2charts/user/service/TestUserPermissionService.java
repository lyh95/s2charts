package com.s2charts.user.service;

import com.s2charts.dao.entity.user.SysUserPermission;
import com.s2charts.dao.mapper.user.SysUserPermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestUserPermissionService {
    @Autowired
    private SysUserPermissionMapper sysUserPermissionMapper;

    public List<SysUserPermission> selectPermissionById(String userPic){
        List<SysUserPermission> users=sysUserPermissionMapper.selectPermissionById(userPic);
        return users;
    }
}
