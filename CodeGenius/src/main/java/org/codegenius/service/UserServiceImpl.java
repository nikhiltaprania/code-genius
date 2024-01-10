package org.codegenius.service;

import jakarta.servlet.http.HttpSession;
import org.codegenius.model.User;
import org.codegenius.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElse(null);
    }

    @Transactional
    @Override
    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> registeredUsers() {
        return userRepository.findAll().stream().filter(user -> !user.getRole().equals("ROLE_ADMIN")).toList();
    }

    public void removeSuccessMsg() {
        HttpSession session = ((ServletRequestAttributes) (Objects.requireNonNull(RequestContextHolder.getRequestAttributes()))).getRequest().getSession();
        session.removeAttribute("successMsg");
    }

    public void removeFailedMsg() {
        HttpSession session = ((ServletRequestAttributes) (Objects.requireNonNull(RequestContextHolder.getRequestAttributes()))).getRequest().getSession();
        session.removeAttribute("failedMsg");
    }
}