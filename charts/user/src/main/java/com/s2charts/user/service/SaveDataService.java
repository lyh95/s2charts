package com.s2charts.user.service;

import com.s2charts.dao.entity.user.SysPic;
import com.s2charts.dao.mapper.user.SysPicMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaveDataService {
    @Autowired
    private SysPicMapper sysPicMapper;
    public SysPic insertUserPic(int userId, String userPic, String picOption){
        return sysPicMapper.insertUserPic(userId,userPic,picOption);
    }
//       <!--//取出图集编辑pic的所有内容-->
    public List<SysPic> getPicOption(int userId){
        return sysPicMapper.getPicOption(userId);
    }
//     <!--//取出最新option-->
    public List<SysPic> getdateOption(){
        return sysPicMapper.getdateOption();
    }
}
