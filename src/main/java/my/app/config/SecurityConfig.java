package my.app.config;

import my.app.config.handler.LoginSuccessHandler;
import my.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserService userService;

    @Autowired
    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                // указываем страницу с формой логина
                .loginPage("/login")
                //указываем логику обработки при логине
                .successHandler(new LoginSuccessHandler())

                // указываем action с формы логина
                .loginProcessingUrl("/login")
                // Указываем параметры логина и пароля с формы логина
                .usernameParameter("j_username")
                .passwordParameter("j_password")
                // даем доступ к форме логина всем
                .permitAll();

        http.logout()
                // разрешаем делать логаут всем
                .permitAll()
                // указываем URL логаута
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                // указываем URL при удачном логауте
                .logoutSuccessUrl("/login?logout")
                //выклчаем кроссдоменную секьюрность (на этапе обучения неважна)
                .and().csrf().disable();

        http
                // делаем страницу регистрации недоступной для авторизированных пользователей
                .csrf().disable()
                .authorizeRequests()
                //страницы аутентификаци доступна всем
                .antMatchers("/login").anonymous()
                .antMatchers("/hello").permitAll()

//               Убрать когда будет настроен rest контроллер ->
                .antMatchers("/rest").permitAll() // Убрать когда будет настроен rest контроллер
                .antMatchers("/rest/**").permitAll() // Убрать когда будет настроен rest контроллер
                .antMatchers("/rest/admin").permitAll() // Убрать когда будет настроен rest контроллер
                .antMatchers("/rest/admin/**").permitAll() // Убрать когда будет настроен rest контроллер

                .antMatchers(HttpMethod.GET, "/rest/**").permitAll() // Убрать когда будет настроен rest контроллер
                .antMatchers(HttpMethod.POST, "/rest/**").permitAll() // Убрать когда будет настроен rest контроллер
                .antMatchers(HttpMethod.DELETE, "/rest/**").permitAll() // Убрать когда будет настроен rest контроллер

                                .antMatchers("/user/**").permitAll()

                .antMatchers("/admin").permitAll()
                .antMatchers("/admin/new").permitAll()
                .antMatchers("/admin/{id}").permitAll()

                .antMatchers(HttpMethod.GET, "/people/**").permitAll()
                .antMatchers(HttpMethod.POST, "/people/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/people/**").permitAll()
//<- Убрать когда будет настроен rest контроллер

                .antMatchers("/creatDefaultUsers").permitAll()

                // защищенные URL

//                .antMatchers("/user/**").hasAnyRole("ADMIN","USER")

//                .antMatchers("/admin").hasAnyRole("ADMIN")
//                .antMatchers("/admin/new").hasAnyRole("ADMIN")
//                .antMatchers("/admin/{id}").hasAnyRole("ADMIN")
//
//                .antMatchers(HttpMethod.GET, "/people/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/people/**").hasAnyRole("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/people/**").hasAnyRole("ADMIN")

//Доступ на основе permission
//                .antMatchers(HttpMethod.GET, "/people/**").hasAuthority(Permission.USER_READ.getPermission())
//                .antMatchers(HttpMethod.POST, "/people/**").hasAuthority(Permission.USER_WRITE.getPermission())
//                .antMatchers(HttpMethod.DELETE, "/people/**").hasAuthority(Permission.USER_WRITE.getPermission())

                .anyRequest()
                .authenticated();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }


}

