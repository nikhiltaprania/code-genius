package org.codegenius.controller;

import jakarta.servlet.http.HttpSession;
import org.codegenius.dto.UserDTO;
import org.codegenius.model.Address;
import org.codegenius.model.User;
import org.codegenius.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;

@Controller
public class FrontController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public FrontController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @ModelAttribute
    public void currentUser(Principal principal, Model model) {
        if (principal != null) {
            String email = principal.getName();
            User user = userService.findUserByEmail(email);
            model.addAttribute("currentUser", user);
        }
    }

    @GetMapping("/")
    public String homePage() {
        return "home-page";
    }

    @GetMapping("/course-page")
    public String coursePage() {
        return "course-page";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login-page";
    }

    @GetMapping("/platform-page/{techStack}")
    public String platformPage(@PathVariable String techStack, Model model) {
        model.addAttribute("techStack", techStack);
        return "platform-page";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute UserDTO userDTO, HttpSession session) {
        String email = userDTO.getEmail();
        User existingUser = userService.findUserByEmail(email);
        System.out.println(userDTO);

        if (existingUser != null) {
            session.setAttribute("failedMsg", "Account already exists");

        } else {
            User user = new User();
            user.setName(userDTO.getFullName());
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setPhone(userDTO.getPhone());
            user.setAddress(new Address());
            user.setRole("ROLE_USER");

            User savedUser = userService.saveUser(user);
            if (savedUser != null) {
                session.setAttribute("successMsg", "Registered successfully");

            } else {
                session.setAttribute("failedMsg", "Something went wrong");
            }
        }

        return "redirect:/login";
    }
}