package com.s2charts.tool.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ToolTestContoller {

    @RequestMapping("/tool")
    public ModelAndView test(){
        System.out.println("tooltest");
        return new ModelAndView("tooltest.html");
    }
}
