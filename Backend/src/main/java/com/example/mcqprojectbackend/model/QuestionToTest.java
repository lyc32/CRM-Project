package com.example.mcqprojectbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "question_to_tast_table")
public class QuestionToTest
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "test_id")
    private Long testId;

    public QuestionToTest() {
    }

    public QuestionToTest(Long id, Long questionId, Long testId) {
        this.id = id;
        this.questionId = questionId;
        this.testId = testId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }
}
