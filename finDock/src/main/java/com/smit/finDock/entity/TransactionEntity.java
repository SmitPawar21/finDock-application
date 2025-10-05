package com.smit.finDock.entity;

import java.time.LocalDate;

import com.smit.finDock.enums.TransactionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class TransactionEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long transaction_id;
	
	@ManyToOne
	@JoinColumn(name="portfolio_id", nullable=false)
	private PortfolioEntity portfolio;
	
	@ManyToOne
	@JoinColumn(name="asset_id", nullable=false)
	private AssetsEntity asset;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TransactionType transaction_type;
	
	private int quantity;
	
	private double price_per_unit;
	
	private LocalDate transaction_date;
	
	private double transaction_value;

	public TransactionEntity(PortfolioEntity portfolio, AssetsEntity asset,
			TransactionType transaction_type, int quantity, double price_per_unit, LocalDate transaction_date,
			double transaction_value) {
		this.portfolio = portfolio;
		this.asset = asset;
		this.transaction_type = transaction_type;
		this.quantity = quantity;
		this.price_per_unit = price_per_unit;
		this.transaction_date = transaction_date;
		this.transaction_value = transaction_value;
	}

	public long getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(long transaction_id) {
		this.transaction_id = transaction_id;
	}

	public PortfolioEntity getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(PortfolioEntity portfolio) {
		this.portfolio = portfolio;
	}

	public AssetsEntity getAsset() {
		return asset;
	}

	public void setAsset(AssetsEntity asset) {
		this.asset = asset;
	}

	public TransactionType getTransaction_type() {
		return transaction_type;
	}

	public void setTransaction_type(TransactionType transaction_type) {
		this.transaction_type = transaction_type;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice_per_unit() {
		return price_per_unit;
	}

	public void setPrice_per_unit(double price_per_unit) {
		this.price_per_unit = price_per_unit;
	}

	public LocalDate getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(LocalDate transaction_date) {
		this.transaction_date = transaction_date;
	}

	public double getTransaction_value() {
		return transaction_value;
	}

	public void setTransaction_value(double transaction_value) {
		this.transaction_value = transaction_value;
	}
	
	
}