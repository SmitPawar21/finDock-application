package com.smit.finDock.dto;

public class GetAssetForPortDTO {
	
	private long port_id;
	
	public GetAssetForPortDTO() {
		
	}

	public GetAssetForPortDTO(long port_id) {
		this.port_id = port_id;
	}

	public long getPort_id() {
		return port_id;
	}

	public void setPort_id(long port_id) {
		this.port_id = port_id;
	}

}
