package com.smit.finDock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AssetDTO {
	@NotBlank
	private String asset_name;
	
	@NotNull
	private long portfolio_id;
	
	@NotBlank
	private String asset_type;
	
	@NotNull
	private int quantity;
	
	@NotNull
	private double buy_price;
	
	@NotNull
	private double current_price;

	public AssetDTO(@NotBlank String asset_name, @NotBlank long portfolio_id, @NotBlank String asset_type,
			@NotBlank int quantity, @NotBlank double buy_price, @NotBlank double current_price) {
		super();
		this.asset_name = asset_name;
		this.portfolio_id = portfolio_id;
		this.asset_type = asset_type;
		this.quantity = quantity;
		this.buy_price = buy_price;
		this.current_price = current_price;
	}

	public String getAsset_name() {
		return asset_name;
	}

	public void setAsset_name(String asset_name) {
		this.asset_name = asset_name;
	}

	public long getPortfolio_id() {
		return portfolio_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getBuy_price() {
		return buy_price;
	}

	public void setBuy_price(double buy_price) {
		this.buy_price = buy_price;
	}

	public double getCurrent_price() {
		return current_price;
	}

	public void setCurrent_price(double current_price) {
		this.current_price = current_price;
	}

	public void setPortfolio_id(long portfolio_id) {
		this.portfolio_id = portfolio_id;
	}

	public String getAsset_type() {
		return asset_type;
	}

	public void setAsset_type(String asset_type) {
		this.asset_type = asset_type;
	}
	
}
