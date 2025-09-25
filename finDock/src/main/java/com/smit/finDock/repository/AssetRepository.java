package com.smit.finDock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smit.finDock.entity.AssetsEntity;

public interface AssetRepository extends JpaRepository<AssetsEntity, Long> {
	
}
