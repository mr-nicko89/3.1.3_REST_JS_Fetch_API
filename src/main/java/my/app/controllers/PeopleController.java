package my.app.controllers;

import my.app.service.RoleService;
import my.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/")
public class PeopleController {

    private final UserService userService;
    private RoleService roleService;

    @Autowired
    public PeopleController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String loginPage() {
        return "login";
    }

    @GetMapping("/")
    public String indexRest(Principal principal) {
        return "login";
    }

    @GetMapping("admin")
    public String indexAdmin() {
        return "admin/index";
    }

    @GetMapping("user")
    public String indexUser() {
        return "user/index";
    }


    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String printWelcome(Principal principal, ModelMap model) {
// чтобы посмотреть аутентифицированного пользователя через дебаггер
        String str = "You are anonymous";
        String auth = "You are anonymous";
        if (principal != null) {
            Authentication a = SecurityContextHolder.getContext().getAuthentication();
            str = "You are logged in as a user: " + principal.getName();
            auth = "You authentication role:" + a.getAuthorities();
        }
        List<String> messages = new ArrayList<>();
        messages.add("Hello!");
        messages.add(str);
        messages.add(auth);
        messages.add("I'm Spring MVC-SECURITY application");
        messages.add("5.2.0 version by sep'19 ");
        model.addAttribute("messages", messages);
        return "hello";
    }

}
