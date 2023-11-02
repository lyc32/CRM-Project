package com.example.mcqprojectbackend.dao;

import com.example.mcqprojectbackend.model.TestResult;
import com.example.mcqprojectbackend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface  TestResultRepository extends JpaRepository<TestResult, Long>
{
    List<TestResult> findByUserId(Long uid);
}
