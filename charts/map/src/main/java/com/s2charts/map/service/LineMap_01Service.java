package com.s2charts.map.service;

import com.s2charts.dao.entity.map.LineMap_01;
import com.s2charts.dao.mapper.map.LineMap_01Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineMap_01Service {
    @Autowired
    private LineMap_01Mapper lineMap_01Mapper;

    public List<LineMap_01> getLineMapData() {
        List<LineMap_01> LineMap_01s = lineMap_01Mapper.getInitLineMapData();
        return LineMap_01s;
    }
}

