package com.smit.finDock.repository;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smit.finDock.entity.CoinEntity;

@Repository
public interface CoinRepository extends JpaRepository<CoinEntity, String> {
	ArrayList<CoinEntity> findByNameContainingIgnoreCase(String query);
}
