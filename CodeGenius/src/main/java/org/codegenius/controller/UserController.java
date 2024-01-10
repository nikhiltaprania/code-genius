package org.codegenius.controller;

import jakarta.servlet.http.HttpSession;
import org.codegenius.dto.AddressDTO;
import org.codegenius.model.Address;
import org.codegenius.model.User;
import org.codegenius.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
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

    @GetMapping("/userPage")
    public String userPage() {
        return "course-page";
    }

    @GetMapping("/address")
    public String addressPage() {
        return "update-address";
    }

    @PostMapping("/updateUser/{email}")
    public String updateAddress(@ModelAttribute AddressDTO addressDTO, @PathVariable String email, HttpSession session) {
        User user = userService.findUserByEmail(email);

        if (user != null) {
            Address address = new Address();
            address.setCity(addressDTO.getCity());
            address.setState(addressDTO.getState());
            address.setPinCode(addressDTO.getPinCode());

            user.setAddress(address);
            userService.saveUser(user);

            session.setAttribute("successMsg", "Address updated successfully");

        } else {
            session.setAttribute("failedMsg", "Something went wrong");
        }

        return "redirect:/user/address";
    }
}