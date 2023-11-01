package com.example.mcqprojectbackend.controller;


import com.example.mcqprojectbackend.mailService.MailClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test/")
class TmpController
{
    @Autowired
    private MailClient mailClient;

    @GetMapping("/sendMail")
    public void testTextMail(){
        mailClient.sendMail("liyc930826@gmail.com","TEST","hello, Yicheng Li.");
    }

}
