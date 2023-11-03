package com.example.mcqprojectbackend.dao;

import com.example.mcqprojectbackend.model.QuestionToTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionToTestRepository extends JpaRepository<QuestionToTest, Long>
{
    // TODO
    Optional<QuestionToTest> findByQuestionIdAndTestId(Long questionId, Long testId);
    void deleteQuestionToTestByQuestionId(Long qid);
    void deleteQuestionToTestByTestId(Long tid);

}
