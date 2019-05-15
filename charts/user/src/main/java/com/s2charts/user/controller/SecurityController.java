package com.s2charts.user.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class SecurityController {

	@RequestMapping("/home")
	public ModelAndView home(String msg) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("home");
		mv.addObject("msg", msg);
		return mv;
	}

//	@GetMapping("/vip/test")
//	@Secured("MEMBER")         // 需要MEMBER权限可访问
//	public String vipPath() {
//		return "/admin";//只能MEMBER才能访问
//	}

//	假设当前你的权限只有 ROLE_USER。
//			1、直接访问 /vip/test 路径将会得到403的Response；
//			2、访问 /vip 获取 ROLE_VIP 授权，再访问 /vip/test 即可得到正确的Response。
//	@GetMapping("/vip")
//	public boolean updateToVIP() {
//		// 得到当前的认证信息
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		//  生成当前的所有授权
//		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());
//		// 添加 ROLE_VIP 授权
//		updatedAuthorities.add(new SimpleGrantedAuthority("MEMBER"));
//		// 生成新的认证信息
//		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);
//		// 重置认证信息
//		SecurityContextHolder.getContext().setAuthentication(newAuth);
//		return true;
//	}
}
