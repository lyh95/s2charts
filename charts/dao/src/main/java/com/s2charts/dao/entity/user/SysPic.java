package com.s2charts.dao.entity.user;

import java.util.Date;

public class SysPic {
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    private Date createTime;
    private Integer userId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPicDataUrl() {
        return picDataUrl;
    }

    public void setPicDataUrl(String picDataUrl) {
        this.picDataUrl = picDataUrl;
    }





    private String picDataUrl;

    public String getUserPic() {
        return userPic;
    }

    public void setUserPic(String userPic) {
        this.userPic = userPic;
    }

    private String userPic;

    public String getPicOption() {
        return picOption;
    }

    public void setPicOption(String picOption) {
        this.picOption = picOption;
    }

    private String picOption;
}
