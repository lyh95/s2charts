package com.s2charts.dao.mapper;

import com.s2charts.dao.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface UserMapper {
    List<User> getAllUsers();
}
