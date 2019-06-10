package com.s2charts.user.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.s2charts.dao.entity.user.SysUserPermission;
import com.s2charts.user.service.SaveDataService;
import com.s2charts.user.service.TestUserPermissionService;
import com.s2charts.user.service.TestUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//用户下载：测试用户是否有某张图的权限controller
@RestController
public class ToolUserController {
    @Autowired
    private TestUserPermissionService testUserPermissionService;
    @Autowired
    private TestUserService testUserService;
    @Autowired
    private SaveDataService saveDataService;

    @RequestMapping(value = {"/checkdownload"})
    @ResponseBody
    public JsonNode test(@RequestParam("userPic") String userPic) throws Exception{
        JsonNode jsonNode=null;
        String currentuser =SecurityContextHolder.getContext().getAuthentication().getName();
        if(currentuser=="anonymousUser"){
            String json ="{\"code\":400,\"userpermission\":\"null\"}";
            ObjectMapper mapper = new ObjectMapper();
            jsonNode =mapper.readTree(json);
        }
        else{
            int userId = testUserService.selectIdByUsername(currentuser);
            String id = userId+"";
            List<SysUserPermission> users = testUserPermissionService.selectPermissionById(userPic);
                        String s = "";
            for (SysUserPermission user : users) {
                s = s + user.getUserId();
            }
            if(s.contains(id)){
                String json ="{\"code\":200,\"userpermission\":\"yes\"}";
                ObjectMapper mapper = new ObjectMapper();
                jsonNode =mapper.readTree(json);
            }else{
            String json ="{\"code\":300,\"userpermission\":\"no\"}";
            ObjectMapper mapper = new ObjectMapper();
            jsonNode =mapper.readTree(json);}
        }
        return jsonNode ;
    }
//        else{
//            int userId = testUserService.selectIdByUsername(currentuser);
//            //userId查不出来
//            List<SysUserPermission> users = testUserPermissionService.selectPermissionById(userPic,userId);
//            String s = "";
//            for (SysUserPermission user : users) {
//                s = s + user.getUserId() + user.getUserPic();
//            }
//            System.out.println(s);
//           if(s==null){
//               String json ="{\"code\":300,\"userpermission\":\"no\"}";
//               ObjectMapper mapper = new ObjectMapper();
//               jsonNode =mapper.readTree(json);
//           }
//            String json ="{\"code\":200,\"userpermission\":\"yes\"}";
//            ObjectMapper mapper = new ObjectMapper();
//            jsonNode =mapper.readTree(json);
//
//        }

    //用户保存：把数据存进数据库
    @RequestMapping(value = {"/savejson"})
    @ResponseBody
    public void save(@RequestParam("userPic") String userPic,@RequestParam("picOption")
            String picOption)
                         {

                             System.out.println("用户标识："+userPic);
                             System.out.println("参数编辑："+picOption);

                             String currentuser =SecurityContextHolder.getContext().getAuthentication().getName();
                             int userId = testUserService.selectIdByUsername(currentuser);
                             String user_pic =userPic;
                             String pic_option=picOption;
                             saveDataService.insertUserPic(userId,user_pic,pic_option);

    }

}
