package com.example.mcqprojectbackend.controller;

import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class QuestionController
{
    @Autowired
    QuestionService questionService;

    @GetMapping("/user/getQuestionListByTestId/{tid}")
    public List<Question> getQuestionListByTestIdWithoutAnswer(@PathVariable Long tid)
    {
        return questionService.getQuestionListByTestIdWithoutAnswer(tid);
    }

    @GetMapping("/admin/getAllQuestion")
    public List<Question> getAllQuestion()
    {
        return questionService.getAllQuestion();
    }

    @GetMapping("/admin/addQuestion/{qid}/toTest/{sid}")
    public String addQuestionToSet(@PathVariable Long qid, @PathVariable Long sid)
    {
        return questionService.addQuestionToSet(qid,sid);
    }

    @PostMapping("/admin/addNewQuestion")
    public Question addNewQuestion(@RequestBody Question question)
    {
        return questionService.addNewQuestion(question);
    }

    @PostMapping("/admin/addNewQuestionToSet/{sid}")
    public String addNewQuestionToSet(@PathVariable Long sid, @RequestBody Question question)
    {
        return questionService.addNewQuestionToSet(sid,question);
    }

    @PutMapping("/admin/uptateQuestion/{id}")
    public String updateQuestion(@PathVariable Long id, @RequestBody Question question)
    {
        if(id == question.getId())
        {
            return questionService.updateQuestion(question);
        }
        else
        {
            return "Illegal Request";
        }
    }

    @DeleteMapping("/admin/deleteQuestionById/{id}")
    public String deleteQuestion(@PathVariable Long id) // TODO
    {
        return questionService.deleteQuestionById(id);
    }

    @GetMapping("/admin/getQuestionListByTestId/{tid}")
    public List<Question> getQuestionListByTestId(@PathVariable Long tid)
    {
        return questionService.getQuestionByTestId(tid);
    }

}
