package com.s2charts.map.controller;


import com.s2charts.dao.entity.map.LineMap_01;
import com.s2charts.map.service.LineMap_01Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class LineMap_01Controller {
   @Autowired
    private LineMap_01Service lineMap_01Service;
    @RequestMapping("/getline")
    @ResponseBody
    public List<LineMap_01> test() throws IOException {
        List<LineMap_01> LineMap_01s=lineMap_01Service.getLineMapData();
        return  LineMap_01s;
////        String abc = "";
//        for(DotMapDemo1 dotMapDemo1 : dotMapDemo1s){
////          String data = dotMapDemo1.toString();
////          abc += "{"+data+"},";
//
//        }
//        //去逗号，加中括号
////        abc = "["+abc.substring(0,abc.length()-1)+"]";
//
//
//
//
//
//        JsonNode jsonNode=null;
////        String json = Arrays.toString();
//        String json ="{\"data\":\""+dotMapDemo1s+"\"}";
////        for (DotMapDemo1 dotMapDemo1:dotMapDemo1s){
////            json=json+dotMapDemo1.getDot();
////            ObjectMapper mapper = new ObjectMapper();
////            jsonNode = mapper.readTree(json);
////        }
//            ObjectMapper mapper = new ObjectMapper();
//            jsonNode = mapper.readTree(json);
//
//         return jsonNode;
    }
}


