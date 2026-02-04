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
    private String surname;  // ← отдельно
    
    @NotBlank
    private String name;     // ← отдельно
    
    private String patronymic; // ← необязательное

    private String role = "PARENT";
}