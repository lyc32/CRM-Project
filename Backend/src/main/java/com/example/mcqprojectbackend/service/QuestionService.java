package com.example.mcqprojectbackend.service;

import com.example.mcqprojectbackend.dao.QuestionRepository;
import com.example.mcqprojectbackend.dao.QuestionToTestRepository;
import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.model.QuestionToTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService
{
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuestionToTestRepository questionToTestRepository;

    @Transactional
    public List<Question> getAllQuestion()
    {
        return questionRepository.findAll();
    }

    @Transactional
    public Question addNewQuestion(Question question)
    {
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        question.setCreateTime(sdf.format(date));
        question.setUpdateTime(sdf.format(date));
        return questionRepository.save(question);
    }

    @Transactional
    public String addNewQuestionToSet(Long sid, Question question)
    {
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        question.setCreateTime(sdf.format(date));
        question.setUpdateTime(sdf.format(date));
        Question q = questionRepository.save(question);
        if(q.getId() > 0)
        {
            QuestionToTest questionToTest = new QuestionToTest();
            questionToTest.setQuestionId(q.getId());
            questionToTest.setTestId(sid);
            questionToTest = this.questionToTestRepository.save(questionToTest);
            if(questionToTest.getId() > 0)
            {
                return "success";
            }
            return "Can Not Add Question To Test";
        }
        return "Can Not Add Question To DB";
    }

    @Transactional
    public String addQuestionToSet(Long qid, Long sid)
    {
        QuestionToTest questionToTest = new QuestionToTest();
        questionToTest.setQuestionId(qid);
        questionToTest.setTestId(sid);
        questionToTest = this.questionToTestRepository.save(questionToTest);
        System.out.println(questionToTest.getId());
        if(questionToTest.getId() > 0)
        {
            return "success";
        }
        return "Can Not Add Question to Test";
    }

    @Transactional
    public String updateQuestion(Question question)
    {

        Optional<Question> optionalTopic = questionRepository.findById(question.getId());
        if(optionalTopic.isEmpty())
        {
            return "Question Does Not Exist";
        }
        else
        {
            Question tmp = optionalTopic.get();
            tmp.update(question);
            SimpleDateFormat sdf = new SimpleDateFormat();
            sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();
            question.setUpdateTime(sdf.format(date));
            questionRepository.save(tmp);
            return "success";
        }
    }

    @Transactional
    public String deleteQuestionById(Long id)
    {
        Optional<Question> optionalTopic = questionRepository.findById(id);
        if(optionalTopic.isEmpty())
        {
            questionToTestRepository.deleteQuestionToTestByQuestionId(id);
            return "Question Has Already Deleted";
        }
        else
        {
            questionRepository.delete(optionalTopic.get());
            questionToTestRepository.deleteQuestionToTestByQuestionId(id);
            return "success";
        }
    }

    @Transactional
    public List<Question> getQuestionByTestId(Long id)
    {
        return questionRepository.getQuestionByTestId(id);
    }

    @Transactional
    public List<Question> getQuestionListByTestIdWithoutAnswer(Long id)
    {
        List<Question> t = questionRepository.getQuestionByTestId(id);
        t.stream().forEach(e-> e.setAnswer(""));
        return t;
    }
}
