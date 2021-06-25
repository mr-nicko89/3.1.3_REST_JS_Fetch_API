package my.app.config.handler;


import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

//    Вызывается при успешной аутентификации
    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {

        String role = authentication.getAuthorities().toString();

        httpServletResponse.sendRedirect("/");
//        if(role.contains("ROLE_ADMIN")){
//            httpServletResponse.sendRedirect("/rest/admin");
//        }
//        else if(role.contains("ROLE_USER")){
//            httpServletResponse.sendRedirect("/user");
//        }
    }
////    Вызывается, если аутентификация неуспешна.
//    @Override
//    public void start(){
//
//    }
}