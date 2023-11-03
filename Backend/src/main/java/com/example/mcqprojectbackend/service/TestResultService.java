package com.example.mcqprojectbackend.service;

import com.example.mcqprojectbackend.dao.AccountRepository;
import com.example.mcqprojectbackend.dao.TestResultRepository;
import com.example.mcqprojectbackend.mailService.MailClient;
import com.example.mcqprojectbackend.memoryDB.MemoryDB;
import com.example.mcqprojectbackend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@Service
public class TestResultService
{
    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private MailClient mailClient = new MailClient();

    @Autowired
    private AccountRepository accountRepository;

    private MemoryDB memoryDB = new MemoryDB();

    @Transactional
    public TestResult getResult(Long uid, UserAnswer[] userAnswers)
    {
        Test testSnapShot = memoryDB.testSnapShot.get(uid);
        List<Question> questionSnapShot = memoryDB.questionListSnapShot.get(uid);
        Integer point = 0;
        Integer totalPoint = 0;
        if(testSnapShot == null || questionSnapShot == null)
        {
            return null;
        }
        else
        {
            for(int i = 0; i<questionSnapShot.size(); i++) //TODO change to Lambda
            {
                for(int j=0; j< userAnswers.length; j++)
                {
                    if(questionSnapShot.get(i).getId() == userAnswers[j].getQid())
                    {
                        totalPoint = totalPoint + questionSnapShot.get(i).getPoint();
                        if(questionSnapShot.get(i).getAnswer().equals(userAnswers[i].getUserAnswer())) //TODO add Check Answer Method
                        {
                            point = point + questionSnapShot.get(i).getPoint();
                            userAnswers[j].setIsCorrect("yes");
                        }
                        else
                        {
                            userAnswers[j].setIsCorrect("No");
                        }
                        break;
                    }
                }
            }
            TestResult testResult= new TestResult();
            testResult.setUserId(uid);
            testResult.setTest(testSnapShot);
            testResult.setPoints(point);
            testResult.setTotalPoints(totalPoint);
            testResult.setStartTime(memoryDB.userStateMap.get(uid).get(0).toString());
            testResult.setEndTime(memoryDB.userStateMap.get(uid).get(memoryDB.userStateMap.get(uid).size()-1).toString());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            try
            {
                testResult.setQuestionlist(ow.writeValueAsString(questionSnapShot));
                testResult.setUserAnswerList(ow.writeValueAsString(userAnswers));
                testResultRepository.save(testResult);

                String testName = testSnapShot.getName();
                String testTopic = testSnapShot.getTopic();
                String content = "The Test Result For ID:" + uid + "\n\r" + testTopic + "\n\r"+ testName + "\n\rGrade: "+ point + "/" + totalPoint;

                mailClient.sendMail(memoryDB.adminEmail,"[TestResult]["+testName+"]",content);
            }
            catch (Exception e)
            {
                System.out.println(e);
                return null;
            }
            if(  ((float)point/(float)totalPoint) > 0.7 )
            {
                Optional<Account> optionalAccount = accountRepository.findById(uid);
                if(optionalAccount.isEmpty())
                {
                    return null;
                }
                else
                {
                    Account tmp = optionalAccount.get();
                    if(tmp.getLevel() < testSnapShot.getLevel())
                    {
                        tmp.setLevel(testSnapShot.getLevel());
                        accountRepository.save(tmp);
                    }
                }
            }
            memoryDB.testSnapShot.remove(uid);
            memoryDB.questionListSnapShot.remove(uid);
            memoryDB.userStateMap.remove(uid);
            return testResult;
        }
    }

    @Transactional
    public List<TestResult> getUserResult(Long uid)
    {
        return this.testResultRepository.findByUserId(uid);
    }
}
