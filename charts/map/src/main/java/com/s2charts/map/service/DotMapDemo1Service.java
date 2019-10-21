package com.s2charts.map.service;

        import com.s2charts.dao.entity.map.DotMapDemo1;
        import com.s2charts.dao.mapper.map.DotMapDemo1Mapper;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;

@Service
public class DotMapDemo1Service {
    @Autowired
    private DotMapDemo1Mapper dotMapDemo1Mapper;

    public List<DotMapDemo1> getDotMapData() {
        List<DotMapDemo1> dotMapDemo1s = dotMapDemo1Mapper.getInitDotMapData();
        return dotMapDemo1s;
    }
}

