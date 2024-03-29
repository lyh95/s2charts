package com.s2charts.web.config;
import com.s2charts.user.service.CustomUserDetailsService;
import com.s2charts.user.service.MyPasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public UserDetailsService customUserDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()//关闭csrf保护
                .authorizeRequests()    //定义权限配置
                .antMatchers("/admin").hasRole("MEMBER")    //角色为ROLE_ADMIN才能访问，可省略prefix
                //	.antMatchers("/orders/**").hasAnyRole("USER", "ADMIN")    //用户权限，管理员权限

//				.anyRequest().authenticated()	//任何请求都必须经过认证才能访问
                .antMatchers("/needpermission").authenticated() //设置需要认证的请求
               // .antMatchers("/tologin").authenticated() //设置需要认证的请求
//                .antMatchers(HttpMethod.POST,"/tests").authenticated()对/tests路径的HTTP POST请求必须要经过认证

//                .antMatchers("/**/**").permitAll()
                .and()
                .formLogin()    //定制登录表单
                .loginPage("/login")    //设置登录url
                .defaultSuccessUrl("/http/index.html")    //设置登录成功默认跳转url
                //成功跳转到登陆前的页面
//                .successHandler(new AuthenticationSuccessHandler() {
//            @Override
//            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                                Authentication authentication) throws IOException, ServletException {
//                response.setContentType("application/json;charset=utf-8");
//                RequestCache cache = new HttpSessionRequestCache();
//                SavedRequest savedRequest = cache.getRequest(request, response);
//                String url = null;
//                if(savedRequest != null){
//                    url = savedRequest.getRedirectUrl();
//                    response.sendRedirect(url);
////                            response.sendRedirect(savedRequest.getRedirectUrl());
//                }
//                else{
//                    response.getWriter().write("登陆成功");
//                }
//            }
//        })

                .permitAll()    //允许任何人访问登录url
                .and()
                .logout()
                    .permitAll()
                //触发注销操作的url
                    .logoutUrl("/logout")
                //注销成功后跳转的url
                    .logoutSuccessUrl("/http/index.html")
                //指定在注销时让HttpSession无效
                    .invalidateHttpSession(true)
                    ;    //允许任何人访问登出url

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(customUserDetailsService())

                .passwordEncoder(new MyPasswordEncoder());
//			.inMemoryAuthentication()
//				.withUser("admin").password("123456").roles("ADMIN");	//在内存中添加admin账号
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/http/**");
//		web.ignoring().antMatchers("/base/http/**");
//		web.ignoring().antMatchers("/http/js/**");
        //可以仿照上面一句忽略静态资源

    }



}