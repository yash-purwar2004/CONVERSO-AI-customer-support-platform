package com.example.conversoBackend.auth;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSignupEmail(String toEmail, String name) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome to Converso 🚀");
            message.setText(
                    "Hello " + name + ",\n\n" +
                    "Your tenant has been successfully created.\n\n" +
                    "Thank you for signing up!"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send signup email: " + e.getMessage());
        }
    }

    @Async
    public void sendLoginEmail(String toEmail, String name) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome Back to Converso");
            message.setText(
                    "Hello " + name + ",\n\n" +
                    "You have successfully logged in. If this wasn't you, please reset your password immediately."
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send login email: " + e.getMessage());
        }
    }
}
