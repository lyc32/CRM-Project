package com.example.mcqprojectbackend.model;

public class UserAnswer //TODO
{
   private Long qid;
   private String userAnswer;
   private String isCorrect;

    public UserAnswer()
    {
    }

    public UserAnswer(Long qid, String userAnswer, String isCorrect) {
        this.qid = qid;
        this.userAnswer = userAnswer;
        this.isCorrect = isCorrect;
    }

    public Long getQid() {
        return qid;
    }

    public void setQid(Long qid) {
        this.qid = qid;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public String getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(String isCorrect) {
        this.isCorrect = isCorrect;
    }

    @Override
    public String toString()
    {
        return "[ qid = " + qid + "] [userAnswer = " + userAnswer + "]\n";
    }
}
