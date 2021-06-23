package com.example.StockMarketApplication.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.StockMarketApplication.model.Ipo;

@Repository
public interface IpoRepository extends MongoRepository<Ipo, String>{

}
