package com.s2charts.dao.mapper.user;

import com.s2charts.dao.entity.user.SysPic;
import org.apache.ibatis.annotations.Param;

public interface SysPicMapper {
    //插入用户保存图的信息
    SysPic insertUserPic(@Param("userId") int userId, @Param("userPic") String userPic, @Param("picOption") String picOption);
}
