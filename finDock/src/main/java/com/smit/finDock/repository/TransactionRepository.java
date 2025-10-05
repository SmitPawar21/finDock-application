package com.smit.finDock.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.entity.TransactionEntity;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
	ArrayList<TransactionEntity> findByPortfolio (PortfolioEntity portfolio);
}
