package com.example.mcqprojectbackend.controller;

import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.model.Test;
import com.example.mcqprojectbackend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class TestController
{
    @Autowired
    TestService testService;

    @GetMapping("/user/getAllTest")
    public List<Test> userGetAllTest()
    {
        return testService.getAllActiveTest();
    }

    @GetMapping("/user/getTestById/{id}")
    public Test userGetTestById(@PathVariable Long id)
    {
        return testService.getTestById(id);
    }

    @GetMapping("/admin/getAllTest")
    public List<Test> adminGetAllTest()
    {
        return testService.getAllTest();
    }

    @GetMapping("/admin/getTestById/{id}")
    public Test adminGetTestById(@PathVariable Long id)
    {
        return testService.getTestById(id);
    }

    @GetMapping("/admin/getTestByQuestionId/{id}")
    public List<Test> getTestByQuestionId(@PathVariable Long id)
    {
        return testService.getTestByQuestionId(id);
    }

    @GetMapping("/admin/getTestWithoutQuestionId/{qid}")
    public List<Test> getTestWithoutQuestionId(@PathVariable Long qid)
    {
        return testService.getTestWithoutQuestionId(qid);
    }

    @PostMapping("/admin/addNewTest")
    public Test addNewTopic(@RequestBody Test test)
    {
        return testService.addNewTopic(test);
    }

    @PostMapping("/admin/addNewTestToQuestion/{qid}")
    public String addNewSetToQuestion(@PathVariable Long qid, @RequestBody Test test)
    {
        return testService.addNewSetToQuestion(qid,test);
    }


    @PutMapping("/admin/uptateTest/{id}")
    public String updateTest(@PathVariable Long id, @RequestBody Test test)
    {
        if(id.equals(test.getId()))
        {
            return testService.updateTest(test);
        }
        else
        {
            return "Illegal Request";
        }
    }

    @DeleteMapping("/admin/deleteTestById/{id}")
    public String deleteTopic(@PathVariable Long id)
    {
        return testService.deleteTestById(id);
    }
}
