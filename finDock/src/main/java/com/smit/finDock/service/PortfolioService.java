package com.smit.finDock.service;

import org.springframework.stereotype.Service;

import com.smit.finDock.dto.PortfolioDTO;
import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.entity.UserEntity;
import com.smit.finDock.repository.PortfolioRepository;
import com.smit.finDock.repository.UserRepository;

@Service
public class PortfolioService {
	private final PortfolioRepository portfolioRepo;
	private final UserRepository userRepo;
	
	public PortfolioService(PortfolioRepository portfolioRepo, UserRepository userRepo) {
		this.portfolioRepo = portfolioRepo;
		this.userRepo = userRepo;
	}



	public PortfolioEntity addPortfolio(PortfolioDTO request) {
		PortfolioEntity portfolio = new PortfolioEntity();
		
		portfolio.setName(request.getName());
		
		UserEntity user = userRepo.findById(request.getUser_id());
		
		portfolio.setUser(user);
		
		try {
			PortfolioEntity saved = portfolioRepo.save(portfolio);
			return saved;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
}
