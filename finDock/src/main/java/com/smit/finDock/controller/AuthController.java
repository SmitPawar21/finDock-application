package com.smit.finDock.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.dto.JwtResponseDTO;
import com.smit.finDock.dto.LoginDTO;
import com.smit.finDock.dto.RegisterDTO;
import com.smit.finDock.entity.UserEntity;
import com.smit.finDock.repository.UserRepository;
import com.smit.finDock.security.JwtUtil;
import com.smit.finDock.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private UserRepository userRepo;
	private UserService userService;
	private AuthenticationManager authManager;
	private JwtUtil jwtUtil;
	
	public AuthController(UserRepository userRepo, UserService userService, AuthenticationManager authManager,
			JwtUtil jwtUtil) {
		this.userRepo = userRepo;
		this.userService = userService;
		this.authManager = authManager;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO request) {
		try {
			System.out.println("in user controller for this username: "+request.getUsername());
			UserEntity user = userService.registerNewUser(request);
			
			return ResponseEntity.status(HttpStatus.CREATED).body("User Registered Successfully"+ user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error"+e);
		}	
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginDTO request) {
		try {
			Authentication authentication = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
				);
			
			UserDetails principle = (UserDetails) authentication.getPrincipal();
			String jwt = jwtUtil.generateToken(principle.getUsername());	
			
			return ResponseEntity.status(HttpStatus.CREATED).body(new JwtResponseDTO(jwt, principle.getUsername()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}
}
