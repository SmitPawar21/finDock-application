package com.smit.finDock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smit.finDock.entity.PortfolioEntity;

@Repository
public interface PortfolioRepository extends JpaRepository<PortfolioEntity, Long> {

	PortfolioEntity findById(long portfolio_id);
}
