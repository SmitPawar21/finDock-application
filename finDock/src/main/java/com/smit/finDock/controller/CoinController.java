package com.smit.finDock.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.entity.CoinEntity;
import com.smit.finDock.service.CoinService;

@RestController
@RequestMapping("/api/coins")
public class CoinController {
	private final CoinService coinService;
	
	public CoinController(CoinService coinService) {
		this.coinService = coinService;
	}
	
	@GetMapping
	public ResponseEntity<?> getAllCoinsByPage(
				@RequestParam(defaultValue = "0") int page
	) {
		try {
			Page<CoinEntity> response = coinService.getAllCoins(page, 20);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@GetMapping("/trending")
	public ResponseEntity<?> getAllTrendingCoins() {
		try {	
			Map<String, Object> response = coinService.getTrendingCoins();
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getOneCoinData(@PathVariable String id) {
		try {
			Map<String, Object> response = coinService.getCoinData(id);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());	
		}
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> searchCoins(@RequestParam String query) {
		try {
			ArrayList<CoinEntity> response = coinService.getSearchCoins(query);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());	
		}
	}
	
}
