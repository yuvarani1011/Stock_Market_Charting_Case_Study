package com.example.StockMarketApplication.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StockMarketApplication.dao.IpoRepository;
import com.example.StockMarketApplication.dto.IpoDto;
import com.example.StockMarketApplication.mapper.IpoMapper;
import com.example.StockMarketApplication.model.Ipo;
import com.example.StockMarketApplication.service.IpoService;
@Service
public class IpoServiceImpl implements IpoService{
	
	@Autowired
	private IpoRepository ipoRepository;
	
	@Autowired
	private IpoMapper ipoMapper;
	
	@Override
	public List<IpoDto> getAllIpos() {
		List<Ipo> ipos = ipoRepository.findAll();
		return ipoMapper.toIpoDtos(ipos);
	}

	@Override
	public IpoDto getIpoById(String id) {
		Optional<Ipo> ipo = ipoRepository.findById(id);
		if(!ipo.isPresent()) {
			return null;
		}
		return ipoMapper.toIpoDto(ipo.get());
	}
	
	@Override
	public IpoDto addIpo(IpoDto ipoDto) {
		Ipo ipo = ipoMapper.toIpo(ipoDto);
		ipo = ipoRepository.save(ipo);
		return ipoMapper.toIpoDto(ipo);
	}

	@Override
	public IpoDto updateIpo(IpoDto ipoDto,String id) {
		if(id==null) {
			return null;
		}
		Ipo ipo = ipoMapper.toIpo(ipoDto);
		ipo.setId(id);
		ipo = ipoRepository.save(ipo);
		return ipoMapper.toIpoDto(ipo);
	}

	@Override
	public void deleteById(String id) {
		ipoRepository.deleteById(id);
		
	}

	

}
