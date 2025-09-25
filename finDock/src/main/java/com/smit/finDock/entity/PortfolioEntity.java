package com.smit.finDock.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="portfolios")
public class PortfolioEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long portfolio_id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable=false)
	private UserEntity user;
	
	@Column
	private String name;
	
	public PortfolioEntity() {
		
	}
	
	public PortfolioEntity(UserEntity user, String name) {
		this.user = user;
		this.name = name;
	}

	public long getPortfolio_id() {
		return portfolio_id;
	}

	public void setPortfolio_id(long portfolio_id) {
		this.portfolio_id = portfolio_id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
