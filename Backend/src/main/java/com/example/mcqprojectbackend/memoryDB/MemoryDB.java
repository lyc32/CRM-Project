package com.example.mcqprojectbackend.memoryDB;

import com.example.mcqprojectbackend.model.Question;
import com.example.mcqprojectbackend.model.UserState;

import java.util.concurrent.ConcurrentHashMap;
import java.util.*;

public class MemoryDB
{
    public static String adminEmail = "";
    public static ConcurrentHashMap<Integer, List<Question>>  testSnapShot = new ConcurrentHashMap<>();
    public static ConcurrentHashMap<Integer, List<UserState>> userStateMap = new ConcurrentHashMap<>();

}
