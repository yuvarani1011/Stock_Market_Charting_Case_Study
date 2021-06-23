package com.example.StockMarketApplication.service;

import java.util.List;

import com.example.StockMarketApplication.dto.CompanyDto;
import com.example.StockMarketApplication.dto.StockExchangeDto;

public interface StockExchangeService {
	public List<StockExchangeDto> getAllStockExchanges();
	public StockExchangeDto addStockExchange(StockExchangeDto stockExchangeDto);
	public StockExchangeDto updateStockExchange(StockExchangeDto stockExchangeDto);
	public void deleteById(String id);
	public StockExchangeDto getStockExchangeById(String id);
	public List<CompanyDto> getCompanies(String id);
	public StockExchangeDto addCompanyToStockExchange(String stockExchangeName, CompanyDto companyDto);
}
