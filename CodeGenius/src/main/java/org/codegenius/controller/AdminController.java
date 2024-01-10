package org.codegenius.controller;

import jakarta.servlet.http.HttpSession;
import org.codegenius.model.User;
import org.codegenius.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @ModelAttribute
    public void currentUser(Principal principal, Model model) {
        if (principal != null) {
            String email = principal.getName();
            User user = userService.findUserByEmail(email);
            model.addAttribute("currentUser", user);
        }
    }

    @GetMapping("/adminPage")
    public String adminPage(Model model) {
        List<User> users = userService.registeredUsers();
        model.addAttribute("registeredUsers", users);
        return "admin-page";
    }

    @GetMapping("/removeUser/{userId}")
    public String deleteUser(@PathVariable Integer userId, HttpSession session) {
        try {
            userService.deleteUserById(userId);
            session.setAttribute("successMsg", "User (ID: " + userId + ") removed");

        } catch (Exception e) {
            session.setAttribute("failedMsg", e.getMessage());
        }
        return "redirect:/admin/adminPage";
    }
}