package com.example.StockMarketApplication.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StockMarketApplication.dao.CompanyRepository;
import com.example.StockMarketApplication.dto.CompanyDto;
import com.example.StockMarketApplication.dto.IpoDto;
import com.example.StockMarketApplication.dto.StockPriceDto;
import com.example.StockMarketApplication.mapper.CompanyMapper;
import com.example.StockMarketApplication.mapper.IpoMapper;
import com.example.StockMarketApplication.mapper.StockPriceMapper;
import com.example.StockMarketApplication.model.Company;
import com.example.StockMarketApplication.model.Ipo;
import com.example.StockMarketApplication.model.StockPrice;
import com.example.StockMarketApplication.service.CompanyService;
@Service
public class CompanyServiceImpl implements CompanyService{
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CompanyMapper companyMapper;
	@Autowired
	private IpoMapper ipoMapper;
	@Autowired
	private StockPriceMapper stockPriceMapper;
	@Override
	public List<CompanyDto> getAllCompanies() {
		List<Company> companies= companyRepository.findAll();
		return companyMapper.toCompanyDtos(companies);
	}

	@Override
	public CompanyDto addCompany(CompanyDto companyDto) {
		Company company = companyMapper.toCompany(companyDto);
		company = companyRepository.save(company);
		return companyMapper.toCompanyDto(company);
	}
	
	@Override
	public CompanyDto getCompanyById(String id) {
		Optional<Company> company = companyRepository.findById(id);
	//	if(company.isEmpty()) {
	//		return null;
	//	}
		return companyMapper.toCompanyDto(company.get());
	}

	@Override
	public CompanyDto updateCompany(CompanyDto companyDto) {
		if(getCompanyById(companyDto.getId())==null) {
			return null;
		}
		Company company =	companyMapper.toCompany(companyDto);
		company = companyRepository.save(company);
		return companyMapper.toCompanyDto(company);
	}

	@Override
	public void deleteById(String id) {
		companyRepository.deleteById(id);
	}

	@Override
	public CompanyDto addIpoToCompany(String companyName, IpoDto ipoDto) {
		List<Company> companies = companyRepository.findByName(companyName);
		Company company = companies.get(0);
		if(company==null) {
			return null;
		}
		Ipo ipo = ipoMapper.toIpo(ipoDto);
		company.getIpos().add(ipo);
		company = companyRepository.save(company);
		return companyMapper.toCompanyDto(company);
	}

	@Override
	public List<IpoDto> getCompanyIpoDetails(String id) {
		Optional<Company> company = companyRepository.findById(id);
	//	if(!company.isPresent()) {
	//		return null;
	//	}
		List<Ipo> ipos = company.get().getIpos();
		return ipoMapper.toIpoDtos(ipos);
	}

	@Override
	public CompanyDto addStockPriceToCompany(String companyCode, StockPriceDto stockPriceDto) {
		List<Company> companies = companyRepository.findByCode(companyCode);
		Company company = companies.get(0);
		if(company == null) {
			return null;
		}
		company.getStockPrices().add(stockPriceMapper.toStockPrice(stockPriceDto));
		company = companyRepository.save(company);
		return companyMapper.toCompanyDto(company);
	}

	@Override
	public List<StockPriceDto> getStockPrices(String id) {
		Optional<Company> company = companyRepository.findById(id);
	//	if(!company.isPresent()) {
	//		return null;
	//	}
		List<StockPrice> stockPrices = company.get().getStockPrices();
		return stockPriceMapper.toStockPriceDtos(stockPrices);
	}

	@Override
	public List<CompanyDto> getCompanyByName(String name) {
		List<Company> companies = companyRepository.findByName(name);
		return companyMapper.toCompanyDtos(companies);
	}
	
	@Override
	public List<CompanyDto> getCompanyByCode(String code) {
		List<Company> companies = companyRepository.findByCode(code);
		return companyMapper.toCompanyDtos(companies);
	}
	

}
