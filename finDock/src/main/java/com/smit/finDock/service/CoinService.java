package com.smit.finDock.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smit.finDock.entity.CoinEntity;
import com.smit.finDock.repository.CoinRepository;


@Service
public class CoinService {
	private final RestTemplate restTemplate = new RestTemplate();
	private final CoinRepository coinRepo;

	public CoinService(CoinRepository coinRepo) {
		this.coinRepo = coinRepo;
	}

	public Map<String, Object> getTrendingCoins () {
		String url = "https://api.coingecko.com/api/v3/search/trending";
		return restTemplate.getForObject(url, Map.class);
	}
	
	public Map<String, Object> getCoinData (String id) {
		String url = "https://api.coingecko.com/api/v3/coins/"+id;
		return restTemplate.getForObject(url, Map.class);
	}
	
	public Page<CoinEntity> getAllCoins(int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
		return coinRepo.findAll(pageable);
	}
	
	public ArrayList<CoinEntity> getSearchCoins (String query) {
		ArrayList<CoinEntity> response = coinRepo.findByNameContainingIgnoreCase(query);
		return response;
	}
	
}	
