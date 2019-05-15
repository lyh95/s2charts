package com.s2charts.dao.entity.user;

public class SysUser {
    private Integer userId;

    private Integer roleId;

    private String userName;

    private String passWord;
    //one-to-one
    private SysRole role;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username == null ? null : username.trim();
    }

    public String getPassword() {
        return passWord;
    }

    public void setPassword(String password) {
        this.passWord = password == null ? null : password.trim();
    }

	public SysRole getRole() {
		return role;
	}

	public void setRole(SysRole role) {
		this.role = role;
	}
}