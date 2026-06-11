package com.kosmos.backend.auth;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kosmos.backend.model.User;
import com.kosmos.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; // ← Добавляем утиль

    // Внедряем через конструктор
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setSurname(request.getSurname());
        user.setName(request.getName());
        user.setPatronymic(request.getPatronymic());

        userRepository.save(user);
    }

    // Изменяем возвращаемый тип с String (email) на String (JWT Токен)
    public String login(LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Неверный email или пароль"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Неверный email или пароль");
        }

        // Создаем объект UserDetails, который требует твой JwtUtil
        org.springframework.security.core.userdetails.User userDetails = 
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPasswordHash(),
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                );

        // Возвращаем сгенерированный JWT-токен
        return jwtUtil.generateToken(userDetails);
    }
}