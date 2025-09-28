package com.smit.finDock.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smit.finDock.dto.AssetDTO;
import com.smit.finDock.dto.GetAssetForPortDTO;
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
	
	@PostMapping("/get-all-assets")
	public ResponseEntity<?> getAllAssets(@RequestBody GetAssetForPortDTO request) {
		try {
			ArrayList<AssetsEntity> result = assetService.getAssets(request.getPort_id());
			
			if(result == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get assets, null is stored");
			}
			
			return ResponseEntity.status(HttpStatus.CREATED).body(result);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get Data. "+e);
		}
	}
	
	@PutMapping("/update/{asset_id}")
	public ResponseEntity<?> updateAsset(
	        @PathVariable long asset_id,
	        @Valid @RequestBody AssetDTO request) {
	    try {
	        AssetsEntity updatedAsset = assetService.updateAsset(asset_id, request);

	        if (updatedAsset == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Asset not found with ID " + asset_id);
	        }

	        return ResponseEntity.status(HttpStatus.OK).body(updatedAsset);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update asset. " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/delete/{asset_id}")
	public ResponseEntity<?> deleteAsset(@PathVariable long asset_id) {
		try {
			String response = assetService.deleteAsset(asset_id);
			
			if(response == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get assets, null is stored");
			}
			
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get Data. "+e);			
		}
	}
	
}
