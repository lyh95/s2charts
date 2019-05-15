package com.s2charts.dao.mapper.user;


import com.s2charts.dao.entity.user.SysUser;

public interface SysUserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    SysUser selectByUsername(String username);
}