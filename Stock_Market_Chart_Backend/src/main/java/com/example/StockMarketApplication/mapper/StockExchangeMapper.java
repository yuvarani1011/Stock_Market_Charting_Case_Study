package com.example.StockMarketApplication.mapper;

import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import com.example.StockMarketApplication.dto.StockExchangeDto;
import com.example.StockMarketApplication.model.StockExchange;

@Component
public class StockExchangeMapper {

	public StockExchangeDto toStockExchangeDto(StockExchange stockExchange) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return mapper.map(stockExchange, StockExchangeDto.class);
	}
	
	public StockExchange toStockExchange(StockExchangeDto stockExchangeDto) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return mapper.map(stockExchangeDto,StockExchange.class);
	}
	
	public List<StockExchangeDto> toStockExchangeDtos(List<StockExchange> stockExchanges){
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return Arrays.asList(mapper.map(stockExchanges, StockExchangeDto[].class));
	}
}
