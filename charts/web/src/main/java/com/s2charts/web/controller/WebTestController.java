package com.s2charts.web.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebTestController {


    @RequestMapping("/web")
    public ModelAndView test(){
        System.out.println("webtest");
        return new ModelAndView("webtest.html");
    }
}
