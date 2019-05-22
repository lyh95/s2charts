package com.s2charts.user.service;


import com.s2charts.dao.entity.user.SysUser;
import com.s2charts.dao.mapper.user.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	 private SysUserMapper userMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SysUser sysUser= userMapper.selectByUsername(username);
		if(sysUser!=null) {
			List<GrantedAuthority> authority = new ArrayList<GrantedAuthority>();
			authority.add(new SimpleGrantedAuthority(sysUser.getRole().getRoleName()));
			return new User(sysUser.getUserName(),sysUser.getPassWord(),authority);
		}else {
			throw new UsernameNotFoundException("用户 [" + username + "] 不存在！");
		}
	}

}
