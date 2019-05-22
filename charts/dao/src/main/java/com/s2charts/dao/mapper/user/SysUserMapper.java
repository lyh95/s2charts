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

    SysUser selectByUsername(String username);

    //通过用户名密码判断用户登录
    List<SysUser> selectUser(@Param("userName")String userName, @Param("passWord") String passWord);

}