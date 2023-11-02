package com.example.mcqprojectbackend.controller;

import com.example.mcqprojectbackend.model.Test;
import com.example.mcqprojectbackend.model.TestResult;
import com.example.mcqprojectbackend.model.UserAnswer;
import com.example.mcqprojectbackend.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class TestResultController
{
    @Autowired
    TestResultService testResultService;

    @PostMapping("/user/{uid}/submitAnswers")
    public TestResult addNewTopic(@PathVariable Long uid, @RequestBody UserAnswer[] userAnswers)
    {
        return testResultService.getResult(uid, userAnswers);
    }

    @GetMapping("/user/{uid}/getMyTestResult")
    public List<TestResult> getUserResult(@PathVariable Long uid)
    {
        return testResultService.getUserResult(uid);
    }
}
