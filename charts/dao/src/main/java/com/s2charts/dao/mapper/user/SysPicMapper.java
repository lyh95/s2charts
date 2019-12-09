package com.s2charts.dao.mapper.user;

import com.s2charts.dao.entity.user.SysPic;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysPicMapper {
    //插入用户保存图的信息
    SysPic insertUserPic(@Param("userId") int userId, @Param("userPic") String userPic, @Param("picOption") String picOption);
    //取出图集编辑pic的所有内容
    List<SysPic> getPicOption(@Param("userId") int userId);
    //取出最新option
    List<SysPic> getdateOption();
}
