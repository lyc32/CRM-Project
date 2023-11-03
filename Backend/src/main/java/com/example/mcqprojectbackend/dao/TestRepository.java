package com.example.mcqprojectbackend.dao;

import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.model.Test;
import com.example.mcqprojectbackend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test, Long>
{
    Optional<Test> findById(Long id);

    @Query(value = "select * FROM test_table where state = 'active'",nativeQuery = true)
    List<Test> findAllActiveTest();

    @Query(value = "select t.id, t.topic, t.name, t.level, t.create_time, t.update_time, t.state FROM test_table t, question_to_tast_table qt where t.id = qt.test_id AND qt.question_id = ?1",nativeQuery = true)
    List<Test> getTestByQuestionId(Long id);

    @Query(value = "select * FROM test_table where id NOT IN (select t.id FROM test_table t, question_to_tast_table qt where t.id = qt.test_id AND qt.question_id = ?1 )",nativeQuery = true)
    List<Test> getTestWithoutQuestionId(Long id);

}
