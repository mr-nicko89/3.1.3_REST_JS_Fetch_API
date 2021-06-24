package my.app.controllers;

import my.app.models.Role;
import my.app.models.User;
import my.app.service.RoleService;
import my.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/rest/", produces = MediaType.APPLICATION_JSON_VALUE)
public class RestPeopleController {

    private final UserService userService;
    private RoleService roleService;

    @Autowired
    public RestPeopleController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //Тестовые методы
    @GetMapping("/ajax")
    public ResponseEntity<?> getAjax() {
        List<String> messages = new ArrayList<>();
        messages.add("<p>1</p>");
        messages.add("<p>2</p>");
        messages.add("<p>3</p>");
        return !messages.isEmpty()
                ? new ResponseEntity<>(messages, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/getPrincipal")
    public ResponseEntity<User> getPrincipal(Principal principal) {
        User userRegistered = userService.loadUserByUsername(principal);
        return userRegistered != null
                ? new ResponseEntity<>(userRegistered, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //    Методы для работы с User
    @GetMapping("/listUsers")
    public ResponseEntity<List<User>> readAllUsers() {
        final List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/listRoles")
    public ResponseEntity<List<Role>> readAllRoles() {
        final List<Role> roles = roleService.getAllRoles();
        return roles != null && !roles.isEmpty()
                ? new ResponseEntity<>(roles, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/admin")
    public ResponseEntity<?> createNewUser(@RequestBody User user) {
        Long idNewUser = userService.addUser(user);
        return new ResponseEntity<>(idNewUser, HttpStatus.CREATED);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        final User user = userService.getUserById(id);

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/admin/edituser")
    public ResponseEntity<?> update(@RequestBody User user) {
        if (user.getPassword().isEmpty()) {
            User userInBase = userService.getUserById(user.getId());
            user.setPassword(userInBase.getPassword());
        }
        userService.updateUser(user);

        return new ResponseEntity<>(HttpStatus.OK);

        //TODO стоит добавить проверку на успешное редактирование user
        //https://javarush.ru/groups/posts/2488-obzor-rest-chastjh-3-sozdanie-restful-servisa-na-spring-boot
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);

        return new ResponseEntity<>(HttpStatus.OK);

        //TODO стоит добавить проверку на успешное удаление user
        //https://javarush.ru/groups/posts/2488-obzor-rest-chastjh-3-sozdanie-restful-servisa-na-spring-boot
    }
}
