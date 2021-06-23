package com.example.StockMarketApplication.dao;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.StockMarketApplication.model.Company;
@Repository
public interface CompanyRepository extends MongoRepository<Company, String>{

	List<Company> findByName(String companyName);

	List<Company> findByCode(String companyCode);
	
}
