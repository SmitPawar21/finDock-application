package com.smit.finDock.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.smit.finDock.dto.PortfolioDTO;
import com.smit.finDock.entity.AssetsEntity;
import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.entity.UserEntity;
import com.smit.finDock.repository.AssetRepository;
import com.smit.finDock.repository.PortfolioRepository;
import com.smit.finDock.repository.UserRepository;

@Service
public class PortfolioService {
	private final PortfolioRepository portfolioRepo;
	private final UserRepository userRepo;
	private final AssetRepository assetRepo;
	
	public PortfolioService(PortfolioRepository portfolioRepo, UserRepository userRepo, AssetRepository assetRepo) {
		this.portfolioRepo = portfolioRepo;
		this.userRepo = userRepo;
		this.assetRepo = assetRepo;
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
	
	public HashMap<String, Double> getValueOfOnePortfolio(long port_id) {
		try {			
			HashMap<String, Double> response = new HashMap<>();
			PortfolioEntity portfolio = portfolioRepo.findById(port_id);
			ArrayList<AssetsEntity> assetList = assetRepo.findByPortfolio(portfolio);
			
			double portfolioValue = 0;
			for(AssetsEntity asset : assetList) {
				double pl = (asset.getQuantity()*asset.getCurrent_price()) - (asset.getQuantity()*asset.getBuy_price());
				response.put("Asset: "+asset.getAsset_id(), pl);
				portfolioValue += (double) asset.getQuantity() * asset.getCurrent_price();
			}
			
			response.put("value", portfolioValue);
			return response;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public HashMap<String, Double> getAssetAllocationForOnePortfolio(long port_id) {
		try {
			HashMap<String, Double> response = new HashMap<>();
			PortfolioEntity portfolio = portfolioRepo.findById(port_id);
			ArrayList<AssetsEntity> assetList = assetRepo.findByPortfolio(portfolio);
			
			double totalValue = 0;
			
			for(AssetsEntity asset : assetList) {
				if(response.containsKey(asset.getAsset_type())) {
					double value = response.get(asset.getAsset_type()) + ((double) asset.getQuantity() * asset.getCurrent_price());
					response.put(asset.getAsset_type(), value);
					totalValue += (double) asset.getQuantity() * asset.getCurrent_price();
				} else {
					response.put(asset.getAsset_type(), (double) asset.getQuantity() * asset.getCurrent_price());
					totalValue += (double) asset.getQuantity() * asset.getCurrent_price();
				}
			}
			
			for(String assetType : response.keySet()) {
				double value = response.get(assetType) / totalValue;
				response.put(assetType, value*100);
			}
			
			return response;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
}
