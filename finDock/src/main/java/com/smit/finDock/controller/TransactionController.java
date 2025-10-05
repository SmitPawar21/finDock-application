package com.smit.finDock.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.entity.TransactionEntity;
import com.smit.finDock.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	
	private final TransactionService transactionService;
	
	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@GetMapping("/{portfolio_id}")
	public ResponseEntity<?> getAllTxnsForPortId(@PathVariable long portfolio_id) {
		try {			
			ArrayList<TransactionEntity> response = transactionService.getAllTransactionsForOnePortfolio(portfolio_id);
			
			if(response == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Response is Null. Invalid portfolio id");
			}
			
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

}
