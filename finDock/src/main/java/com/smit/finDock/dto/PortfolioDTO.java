package com.smit.finDock.dto;

public class PortfolioDTO {
	private long user_id;
	private String name;
	
	public PortfolioDTO() {
		
	}

	public PortfolioDTO(long user_id, String name) {
		this.user_id = user_id;
		this.name = name;
	}

	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
