package my.app.dao;

import my.app.models.User;

import java.util.List;

public interface UserDAO {
    List<User> listAllPeople();

    User getUserById(Long id);

    void save(User user);

    void update(User updatedUser);

    void delete(Long id);

    User getUserByName(String name);
}

