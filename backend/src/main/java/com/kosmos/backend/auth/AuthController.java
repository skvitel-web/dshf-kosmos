package com.kosmos.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository; // Добавляем репозиторий, чтобы достать роль

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
            // Теперь здесь получаем токен
            String token = authService.login(request);
            
            // Находим пользователя в БД, чтобы узнать его роль
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            
            // Отправляем на фронтенд полный набор данных
            return ResponseEntity.ok(new LoginResponse(token, user.getRole().name(), user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // Обновленный класс ответа под нужды фронтенда
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