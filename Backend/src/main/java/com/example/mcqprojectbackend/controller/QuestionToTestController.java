package com.example.mcqprojectbackend.controller;


import com.example.mcqprojectbackend.model.QuestionToTest;
import com.example.mcqprojectbackend.service.QuestionToTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class QuestionToTestController
{
    @Autowired
    private QuestionToTestService questionToTestService;

    @GetMapping("/admin/get/QuestionId/{qid}/testId/{tid}")
    public QuestionToTest getQuestionToTest(@PathVariable Long qid, @PathVariable Long tid)
    {
        System.out.println(qid + " " + tid);
        return this.questionToTestService.getByQuestionIdAndTestId(qid,tid);
    }

    @DeleteMapping("/admin/removeQuestion/{qid}/fromTest/{tid}")
    public String removeQuestionFromTest(@PathVariable Long qid, @PathVariable Long tid)
    {
        return this.questionToTestService.deleteByQuestionIdAndTestId(qid,tid);
    }
}
