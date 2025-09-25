package com.smit.finDock.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "assets")
public class AssetsEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long asset_id;
	
	@ManyToOne
	@JoinColumn(name="portfolio_id", nullable=false)
	private PortfolioEntity portfolio;
	
	@Column
	private String asset_name;
	
	@Column
	private String asset_type;
	
	@Column
	private int quantity;
	
	@Column
	private double buy_price;
	
	@Column
	private double current_price;
	
	public AssetsEntity() {
		
	}
	
	public AssetsEntity(long portfolio_id, String asset_name, String asset_type, int quantity,
			double buy_price, double current_price) {
		this.asset_name = asset_name;
		this.asset_type = asset_type;
		this.quantity = quantity;
		this.buy_price = buy_price;
		this.current_price = current_price;
	}

	public long getAsset_id() {
		return asset_id;
	}

	public void setAsset_id(long asset_id) {
		this.asset_id = asset_id;
	}

	public PortfolioEntity getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(PortfolioEntity portfolio) {
		this.portfolio = portfolio;
	}

	public String getAsset_name() {
		return asset_name;
	}

	public void setAsset_name(String asset_name) {
		this.asset_name = asset_name;
	}

	public String getAsset_type() {
		return asset_type;
	}

	public void setAsset_type(String asset_type) {
		this.asset_type = asset_type;
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
}
