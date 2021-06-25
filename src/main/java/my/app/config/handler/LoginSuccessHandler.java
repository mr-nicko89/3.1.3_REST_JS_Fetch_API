package my.app.config.handler;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

        System.out.println(authentication);
        String auth = authentication.getAuthorities().stream().findFirst().get().toString();
        String roleAdmin = "ROLE_ADMIN";
        System.out.println(auth);
        System.out.println(auth.equals("ROLE_ADMIN"));

        if (auth.equals(roleAdmin)) {
            httpServletResponse.sendRedirect("admin/index");
        } else {
            httpServletResponse.sendRedirect("user/index");
        }

//        if (principal == null) {
//            return "login";
//        } else if (auth.equals(role)) {
//            return "admin/index";
//        } else {
//            return "user/index";
//        }


//        httpServletResponse.sendRedirect("/");


    }
}