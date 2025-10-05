package com.smit.finDock.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.entity.TransactionEntity;
import com.smit.finDock.repository.PortfolioRepository;
import com.smit.finDock.repository.TransactionRepository;

@Service
public class TransactionService {
	
	private final PortfolioRepository portfolioRepo;
	private final TransactionRepository transactionRepo;
	
	public TransactionService(PortfolioRepository portfolioRepo, TransactionRepository transactionRepo) {
		this.portfolioRepo = portfolioRepo;
		this.transactionRepo = transactionRepo;
	}

	public ArrayList<TransactionEntity> getAllTransactionsForOnePortfolio (long portfolio_id) {
		PortfolioEntity portfolio = portfolioRepo.findById(portfolio_id);
		
		if(portfolio == null) {
			return null;
		}
		
		ArrayList<TransactionEntity> responseList = transactionRepo.findByPortfolio(portfolio);
		return responseList;
	}
}
