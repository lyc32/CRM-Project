package com.example.mcqprojectbackend.memoryDB;

import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.model.Test;
import com.example.mcqprojectbackend.model.UserState;

import java.util.concurrent.ConcurrentHashMap;
import java.util.*;

public class MemoryDB
{
    public static String adminEmail = "";
    public static ConcurrentHashMap<Long, List<Question>>  questionListSnapShot = new ConcurrentHashMap<>();
    public static ConcurrentHashMap<Long, Test>            testSnapShot         = new ConcurrentHashMap<>();
    public static ConcurrentHashMap<Long, List<UserState>> userStateMap         = new ConcurrentHashMap<>();

}
