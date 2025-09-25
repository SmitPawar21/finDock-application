package com.smit.finDock.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smit.finDock.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByUsername(String username); 
	UserEntity findById(long user_id);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
}
