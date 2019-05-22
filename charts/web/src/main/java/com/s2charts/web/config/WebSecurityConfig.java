package com.s2charts.web.config;
import com.s2charts.user.service.CustomUserDetailsService;
import com.s2charts.user.service.MyPasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


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
                .authorizeRequests()	//定义权限配置
                .antMatchers("/admin").hasRole("MEMBER")	//角色为ROLE_ADMIN才能访问，可省略prefix
                //	.antMatchers("/orders/**").hasAnyRole("USER", "ADMIN")    //用户权限，管理员权限

//				.anyRequest().authenticated()	//任何请求都必须经过认证才能访问
                .antMatchers("/needpermission").authenticated() //设置需要认证的请求
//                .antMatchers(HttpMethod.POST,"/tests").authenticated()对/tests路径的HTTP POST请求必须要经过认证

//                .antMatchers("/**/**").permitAll()
                .and()
                .formLogin()	//定制登录表单
                .loginPage("/login")	//设置登录url
                .defaultSuccessUrl("/home")	//设置登录成功默认跳转url
                .permitAll()	//允许任何人访问登录url
                .and()
                .logout().permitAll();	//允许任何人访问登出url
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
