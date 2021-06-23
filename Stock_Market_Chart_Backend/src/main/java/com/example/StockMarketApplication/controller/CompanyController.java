package com.example.StockMarketApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.StockMarketApplication.dto.CompanyDto;
import com.example.StockMarketApplication.dto.IpoDto;
import com.example.StockMarketApplication.dto.StockPriceDto;
import com.example.StockMarketApplication.service.CompanyService;

@RestController
@RequestMapping("/company")
@CrossOrigin
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	@GetMapping("/companies")
	public ResponseEntity<List<CompanyDto>> getAllCompanies(){
		return ResponseEntity.ok(companyService.getAllCompanies());
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<List<CompanyDto>> getCompanyByName(@PathVariable String name){
		return ResponseEntity.ok(companyService.getCompanyByName(name));
	}
	
	@GetMapping("/code/{code}")
	public ResponseEntity<List<CompanyDto>> getCompanyByCode(@PathVariable String code){
		return ResponseEntity.ok(companyService.getCompanyByCode(code));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable String id){
		return ResponseEntity.ok(companyService.getCompanyById(id));
	}
	
	@PostMapping("/add")
	public ResponseEntity<CompanyDto> addCompany(@RequestBody CompanyDto companyDto){
		return ResponseEntity.ok(companyService.addCompany(companyDto));
	}
	
	@PutMapping("/update")
	public ResponseEntity<CompanyDto> editCompany(@RequestBody CompanyDto companyDto){
		return ResponseEntity.ok(companyService.updateCompany(companyDto));
	}
	
	@DeleteMapping("/{id}")
	public void deleteCompanyById(@PathVariable String id) {
		companyService.deleteById(id);
	}
	
	@GetMapping("/{id}/ipos")
	public ResponseEntity<List<IpoDto>> getCompanyIpoDetails(@PathVariable String id){
		List<IpoDto> ipoDtos = companyService.getCompanyIpoDetails(id);
		return ResponseEntity.ok(ipoDtos);
	}
	
	@GetMapping(path = "/{id}/stockPrices")
	public ResponseEntity<List<StockPriceDto>> getStockPrices(@PathVariable String id){
		List<StockPriceDto> stockPriceDtos = companyService.getStockPrices(id);
		return ResponseEntity.ok(stockPriceDtos);
	}
	
	@PostMapping(path = "/{companyName}/ipos")
	public void addIpoToCompany(@PathVariable String companyName, @RequestBody IpoDto ipoDto){
		CompanyDto companyDto = companyService.addIpoToCompany(companyName, ipoDto);
	}
	
	@PostMapping(path = "/{companyCode}/stockPrices")
	public void addStockPriceToCompany(@PathVariable String companyCode, @RequestBody StockPriceDto stockPriceDto) {
		CompanyDto companyDto = companyService.addStockPriceToCompany(companyCode, stockPriceDto);
	}
}
