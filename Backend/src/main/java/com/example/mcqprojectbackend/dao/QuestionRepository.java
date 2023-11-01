package com.example.mcqprojectbackend.dao;

import com.example.mcqprojectbackend.model.Account;
import com.example.mcqprojectbackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>
{
    Optional<Question> findById(Long id);

    // SELECT q.id, q.question, q.style, q.body, q.answer, q.correct, q.wrong, q.point, q.create_time, q.update_time FROM question_table q, question_to_tast_table qt
    // WHERE q.id = qt.question_id AND qt.test_id = [`test_id`];
    @Query(value = "SELECT q.id, q.question, q.style, q.body, q.answer, q.correct, q.wrong, q.point, q.create_time, q.update_time, q.time FROM question_table q, question_to_tast_table qt WHERE q.id = qt.question_id AND qt.test_id = ?1",nativeQuery = true)
    List<Question>  getQuestionByTestId(Long id);

    @Query(value = "SELECT distinct q.id, q.question, q.style, q.body, q.answer, q.correct, q.wrong, q.point, q.create_time, q.update_time, q.time " +
            "FROM question_table q, question_to_tast_table qt, test_table t " +
            "WHERE qt.question_id = q.id " +
            "AND qt.test_id = t.id " +
            "AND if(IFNULL(?1,'') !=-1, q.id = ?1 ,1=1) " +
            "AND if(IFNULL(?2,'') !='', q.question Like CONCAT('%',?2,'%') ,1=1) " +
            "AND if(IFNULL(?3,'') !='', q.style = ?3, 1=1) " +
            "AND if(IFNULL(?4,'') !=-1, q.point = ?4 ,1=1) " +
            "AND if(IFNULL(?5,'') !=-1, t.topic Like CONCAT('%',?5,'%') ,1=1) "  +
            "AND if(IFNULL(?6,'') !=-1, t.name Like CONCAT('%',?6,'%') ,1=1) ", nativeQuery = true)
    List<Question>  searchQuestion(Long qid, String question, String style, Integer point, String topic, String testName);

    @Query(value = "SELECT distinct q.id, q.question, q.style, q.body, q.answer, q.correct, q.wrong, q.point, q.create_time, q.update_time, q.time " +
                    "FROM question_table q, question_to_tast_table qt, test_table t " +
                    "WHERE qt.question_id = q.id " +
            "AND qt.test_id = t.id " +
            "AND if(IFNULL(?1,'') !=-1, q.id = ?1 ,1=1) " +
            "AND if(IFNULL(?2,'') !='', q.question Like CONCAT('%',?2,'%') ,1=1) " +
            "AND if(IFNULL(?3,'') !='', q.style = ?3, 1=1) " +
            "AND if(IFNULL(?4,'') !=-1, q.point = ?4 ,1=1) " +
            "AND if(IFNULL(?5,'') !=-1, t.topic Like CONCAT('%',?5,'%') ,1=1) "  +
            "AND if(IFNULL(?6,'') !=-1, t.name Like CONCAT('%',?6,'%') ,1=1) "  +
            "AND q.id NOT IN (Select question_id FROM question_to_tast_table WHERE test_id=?7)", nativeQuery = true)
    List<Question> searchQuestionNotInTestId(Long qid, String question, String style, Integer point, String topic, String testName, Long tid);

    // Search for questions that are not belong to any test.
    // SELECT * FROM `question_table` WHERE id NOT IN (Select question_id FROM question_to_tast_table)
    @Query(value = "SELECT * FROM question_table WHERE if(IFNULL(?1,'') !=-1, id = ?1 ,1=1) AND if(IFNULL(?2,'') !='', question Like CONCAT('%',?2,'%') ,1=1) AND if(IFNULL(?3,'') !='', style = ?3, 1=1) AND if(IFNULL(?4,'') !=-1, point = ?4 ,1=1) AND id NOT IN (Select question_id FROM question_to_tast_table)",nativeQuery = true)
    List<Question> searchQuestionNotInALLTest(Long qid, String question, String style, Integer point);



}
