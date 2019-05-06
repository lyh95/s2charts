package com.s2charts.map.service;

import com.s2charts.dao.entity.User;
import com.s2charts.dao.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestDaoService {
    @Autowired
    private UserMapper userMapper;

    public List<User> getAllUsers(){
        List<User> users=userMapper.getAllUsers();
        return users;
    }
}
