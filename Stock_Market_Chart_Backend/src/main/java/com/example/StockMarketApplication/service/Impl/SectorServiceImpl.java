package com.example.StockMarketApplication.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.StockMarketApplication.dao.SectorRepository;
import com.example.StockMarketApplication.dto.CompanyDto;
import com.example.StockMarketApplication.dto.SectorDto;
import com.example.StockMarketApplication.mapper.CompanyMapper;
import com.example.StockMarketApplication.mapper.SectorMapper;
import com.example.StockMarketApplication.model.Sector;
import com.example.StockMarketApplication.service.SectorService;
@Service
public class SectorServiceImpl implements SectorService{
	@Autowired
	private SectorRepository sectorRepository;
	@Autowired
	private SectorMapper sectorMapper;
	@Autowired
	private CompanyMapper companyMapper;
	
	@Override
	public List<SectorDto> getAllSectors() {
		return sectorMapper.toSectorDtos(sectorRepository.findAll());
	}

	@Override
	public SectorDto getSectorById(String id) {
		Optional<Sector> sector = sectorRepository.findById(id);
		if(!sector.isPresent()) {
			return null;
		}
		return sectorMapper.toSectorDto(sector.get());
	}
	
	@Override
	public SectorDto addSector(SectorDto sectorDto) {
		Sector sector = sectorMapper.toSector(sectorDto);
		sector = sectorRepository.save(sector);
		return sectorMapper.toSectorDto(sector);
	}

	@Override
	public SectorDto updateSector(SectorDto sectorDto) {
		if(getSectorById(sectorDto.getId())==null) {
			return null;
		}
		Sector sector = sectorMapper.toSector(sectorDto);
		sector = sectorRepository.save(sector);
		return sectorMapper.toSectorDto(sector);
	}

	@Override
	public void deleteById(String id) {
		sectorRepository.deleteById(id);
	}

	@Override
	public SectorDto addCompanyToSector(String sectorName, CompanyDto companyDto) {
		List<Sector> sectors = sectorRepository.findByName(sectorName);
		Sector sector = sectors.get(0);
		sector.getCompanies().add(companyMapper.toCompany(companyDto));
		sector = sectorRepository.save(sector);
		return sectorMapper.toSectorDto(sector);
	}



}
