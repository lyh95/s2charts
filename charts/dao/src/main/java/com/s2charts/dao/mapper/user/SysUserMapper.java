package com.s2charts.dao.mapper.user;


import com.s2charts.dao.entity.user.SysUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysUserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    //spring security 校验登录判断
    SysUser selectByUsername(String username);

    //通过用户名获取用户id
    int selectIdByUsername(String username);

    //通过用户名密码判断用户登录
    List<SysUser> selectUser(@Param("userName")String userName, @Param("passWord") String passWord);

    //注册功能
    int adduser(@Param("username") String username, @Param("password") String password);

}