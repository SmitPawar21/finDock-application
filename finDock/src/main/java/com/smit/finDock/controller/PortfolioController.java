package com.smit.finDock.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.dto.PortfolioDTO;
import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.service.PortfolioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
	private final PortfolioService portfolioService;
	
	public PortfolioController(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}

	@PostMapping("/add-portfolio")
	public ResponseEntity<?> createNewPortfolio(@Valid @RequestBody PortfolioDTO request) {
		try {			
			PortfolioEntity portfolio = portfolioService.addPortfolio(request);
			if(portfolio == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save portfolio. Portfolio is returning null.");
			}
			
			return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created Portfolio. "+portfolio.getName());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save portfolio. "+e);
		}
	}
}
