package com.smit.finDock.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smit.finDock.entity.AssetsEntity;
import com.smit.finDock.entity.PortfolioEntity;

public interface AssetRepository extends JpaRepository<AssetsEntity, Long> {
	ArrayList<AssetsEntity> findByPortfolio(PortfolioEntity portfolio);
	AssetsEntity findById(long asset_id);
}
