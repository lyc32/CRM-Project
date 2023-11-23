package com.example.mcqprojectbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "test_Result_table")
public class TestResult
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "test_id")
    private Long testId;
    @Column(name = "test_name")
    private String testName;
    @Column(name = "test_topic")
    private String testTopic;
    @Column(name = "test_Level")
    private Integer testLevel;
    @Column(name = "user_answer_list") // TODO
    private String userAnswerList; // json
    @Column(name = "question_list") // TODO
    private String questionlist; // json
    @Column(name = "total_points")
    private Integer totalPoints;
    @Column(name = "points")
    private Integer points;
    @Column(name = "start_time")
    private String startTime;
    @Column(name = "end_time")
    private String endTime;

    public TestResult() {
    }

    public TestResult(Long id, Long userId, Long testId, String testName, String testTopic, Integer testLevel, String userAnswerList, String questionlist, Integer totalPoints, Integer points, String startTime, String endTime) {
        this.id = id;
        this.userId = userId;
        this.testId = testId;
        this.testName = testName;
        this.testTopic = testTopic;
        this.testLevel = testLevel;
        this.userAnswerList = userAnswerList;
        this.questionlist = questionlist;
        this.totalPoints = totalPoints;
        this.points = points;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String tstName) {
        this.testName = tstName;
    }

    public String getTestTopic() {
        return testTopic;
    }

    public void setTestTopic(String taskTopic) {
        this.testTopic = taskTopic;
    }

    public String getUserAnswerList() {
        return userAnswerList;
    }

    public void setUserAnswerList(String userAnswerList) {
        this.userAnswerList = userAnswerList;
    }

    public String getQuestionlist() {
        return questionlist;
    }

    public void setQuestionlist(String questionlist) {
        this.questionlist = questionlist;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getTestLevel() {
        return testLevel;
    }

    public void setTestLevel(Integer testLevel) {
        this.testLevel = testLevel;
    }

    public void setTest(Test test)
    {
        this.testId = test.getId();
        this.testName = test.getName();
        this.testTopic = test.getTopic();
        this.testLevel = test.getLevel();
    }
}
