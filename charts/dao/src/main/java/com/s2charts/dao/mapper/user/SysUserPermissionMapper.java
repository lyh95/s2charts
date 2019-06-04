package com.s2charts.dao.mapper.user;

import com.s2charts.dao.entity.user.SysUserPermission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysUserPermissionMapper {

     List<SysUserPermission> selectPermissionById(@Param("userPic") String userPic);
}
