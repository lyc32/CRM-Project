package com.example.mcqprojectbackend.controller;


import com.example.mcqprojectbackend.mailService.MailClient;
import com.example.mcqprojectbackend.memoryDB.MemoryDB;
import com.example.mcqprojectbackend.model.UserState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@RequestMapping("/test/")
class TmpController
{
    @Autowired
    private MailClient mailClient;

    private MemoryDB memoryDB = new MemoryDB();

    @GetMapping("/sendMail")
    public void testTextMail()
    {
        String testName = "core Java Test 1";
        String testTopic = "core Java";
        Long uid = 2l;
        Integer point = 5;
        Integer totalPoint = 7;

        mailClient.sendMail(memoryDB.adminEmail,"[TestResult]["+testName+"]","The Test Result For ID:" + uid + "\n" + testTopic + "\n"+ testName + "\nGrade: "+ point + "/" + totalPoint);

        //mailClient.sendMail(memoryDB.adminEmail,"TEST","hello, Yicheng Li.");
    }

    @GetMapping("/seeUserState/{uid}")
    public List<UserState> seeUserState(@PathVariable Long uid)
    {
        return memoryDB.userStateMap.get(uid);
    }
}
