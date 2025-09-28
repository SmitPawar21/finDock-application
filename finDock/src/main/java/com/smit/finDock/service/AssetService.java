package com.smit.finDock.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.smit.finDock.dto.AssetDTO;
import com.smit.finDock.entity.AssetsEntity;
import com.smit.finDock.entity.PortfolioEntity;
import com.smit.finDock.repository.AssetRepository;
import com.smit.finDock.repository.PortfolioRepository;

@Service
public class AssetService {
	private final AssetRepository assetRepo;
	private final PortfolioRepository portRepo;
	
	public AssetService(AssetRepository assetRepo, PortfolioRepository portRepo) {
		super();
		this.assetRepo = assetRepo;
		this.portRepo = portRepo;
	}

	public AssetsEntity addAsset(AssetDTO request) {
		AssetsEntity asset = new AssetsEntity();
		asset.setAsset_name(request.getAsset_name());
		asset.setAsset_type(request.getAsset_type());
		asset.setQuantity(request.getQuantity());
		asset.setBuy_price(request.getBuy_price());
		asset.setCurrent_price(request.getCurrent_price());
		
		PortfolioEntity portfolio = portRepo.findById(request.getPortfolio_id());
		asset.setPortfolio(portfolio);
		
		try {
			AssetsEntity saved = assetRepo.save(asset);
			return saved;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public ArrayList<AssetsEntity> getAssets(long port_id) {
		try {			
			PortfolioEntity portfolio = portRepo.findById(port_id);
			ArrayList<AssetsEntity> list = assetRepo.findByPortfolio(portfolio);
			return list;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public AssetsEntity updateAsset(long asset_id, AssetDTO request) {
		try {
			AssetsEntity asset = assetRepo.findById(asset_id);

		        asset.setAsset_name(request.getAsset_name());
		        asset.setAsset_type(request.getAsset_type());
		        asset.setQuantity(request.getQuantity());
		        asset.setBuy_price(request.getBuy_price());
		        asset.setCurrent_price(request.getCurrent_price());

		    return assetRepo.save(asset);
		    
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	public String deleteAsset(long asset_id) {
		try {
			AssetsEntity asset = assetRepo.findById(asset_id);
			
			assetRepo.delete(asset);
			return "deleted";
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
}
