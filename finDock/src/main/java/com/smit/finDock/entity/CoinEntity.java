package com.smit.finDock.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="coins")
public class CoinEntity {
	@Id
    private String id;

    private String symbol;

    private String name;

    @Column(columnDefinition = "jsonb")
    private String platforms;
    
    public CoinEntity() {
    	
    }

	public CoinEntity(String id, String symbol, String name, String platforms) {
		this.id = id;
		this.symbol = symbol;
		this.name = name;
		this.platforms = platforms;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPlatforms() {
		return platforms;
	}

	public void setPlatforms(String platforms) {
		this.platforms = platforms;
	}
}
