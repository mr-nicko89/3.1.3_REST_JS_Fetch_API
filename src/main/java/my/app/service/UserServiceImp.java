package my.app.service;

import my.app.dao.UserDAO;
import my.app.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;

@Service
@Transactional()
public class UserServiceImp implements UserService {

    @Qualifier("userDAOImp")
    @Autowired
    private UserDAO userDao;

    @Override
    public List<User> getAllUsers() {
        return userDao.listAllPeople();
    }

    @Override
    public User getUserById(Long id) {
        return userDao.getUserById(id);
    }

    @Override
    public Long addUser(User user) {
        return userDao.save(user);
    }

    @Override
    public void updateUser(User user) {
        if (user.getPassword().isEmpty()) {
            User userInBase = userDao.getUserById(user.getId());
            user.setPassword(userInBase.getPassword());
        }
        userDao.update(user);
    }

    @Override
    public void deleteUser(Long id) {
        userDao.delete(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getUserByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Override
    public User loadUserByUsername(Principal principal) throws UsernameNotFoundException {
        User user = userDao.getUserByName(principal.getName());
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}
