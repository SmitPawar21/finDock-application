package com.smit.finDock.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.dto.AssetDTO;
import com.smit.finDock.entity.AssetsEntity;
import com.smit.finDock.service.AssetService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/asset")
public class AssetController {
	private final AssetService assetService;
	
	public AssetController(AssetService assetService) {
		this.assetService = assetService;
	}

	@PostMapping("/add-asset")
	public ResponseEntity<?> addNewAsset(@Valid @RequestBody AssetDTO request) {
		try {
			AssetsEntity asset = assetService.addAsset(request);
			if(asset == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save asset, null is stored");
			}
			
			return ResponseEntity.status(HttpStatus.CREATED).body("Successfully Asset created");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save asset. "+e);
		}
	}
	
}
