package com.kosmos.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @Email @NotBlank
    private String email;
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String fullName;
    
    private String role = "PARENT"; // по умолчанию
}