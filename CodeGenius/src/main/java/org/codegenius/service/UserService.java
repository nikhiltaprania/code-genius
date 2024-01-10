package org.codegenius.service;

import org.codegenius.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    User findUserByEmail(String email);

    void deleteUserById(int id);

    List<User> registeredUsers();
}