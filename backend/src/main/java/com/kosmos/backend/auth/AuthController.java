package com.kosmos.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosmos.backend.model.User;
import com.kosmos.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // На время диплома разрешаем доступ отовсюду
public class AuthController {

    // Делаем поля final — это гарантирует, что они инициализируются один раз при старте
    private final AuthService authService;
    private final UserRepository userRepository;

    // Создаем конструктор вместо @Autowired над полями. Spring Boot сам подставит сюда бины!
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            return ResponseEntity.ok(new LoginResponse(token, user.getRole().name(), user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    public static class LoginResponse {
        private final String token;
        private final String role;
        private final String email;

        public LoginResponse(String token, String role, String email) {
            this.token = token;
            this.role = role;
            this.email = email;
        }

        public String getToken() { return token; }
        public String getRole() { return role; }
        public String getEmail() { return email; }
    }
}