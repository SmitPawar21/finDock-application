package com.smit.finDock.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smit.finDock.dto.RegisterDTO;
import com.smit.finDock.entity.UserEntity;
import com.smit.finDock.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Transactional
	public UserEntity registerNewUser(RegisterDTO request) {
		if(userRepo.existsByUsername(request.getUsername())) {
			throw new RuntimeException("username already exists");
		}
		
		if(userRepo.existsByEmail(request.getEmail())) {
			throw new RuntimeException("email already exists");
		}
		
		try {
			UserEntity user = new UserEntity();
			user.setUsername(request.getUsername());
			user.setEmail(request.getEmail());
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			
			System.out.println("in user service: "+user);
			return userRepo.save(user);
		} catch (Exception e) {
			System.out.println("Error in userService. "+e);
			return null;
		}
	}
}
