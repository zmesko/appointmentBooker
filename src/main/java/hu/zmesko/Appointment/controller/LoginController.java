package hu.zmesko.Appointment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String getDashboard(HttpSession session, Model model) {
        String userRole = (String) session.getAttribute("userRole");
        model.addAttribute("role", userRole);
        return "login";
    }
}
