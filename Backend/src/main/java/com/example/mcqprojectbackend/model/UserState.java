package com.example.mcqprojectbackend.model;

// TODO
// This model is use to save user's State when the user taking test
// for No-Sql

public class UserState
{
    private String SystemTime;
    private String ClientTime;

    public UserState(String systemTime, String clientTime) {
        SystemTime = systemTime;
        ClientTime = clientTime;
    }

    @Override
    public String toString()
    {
        return "[SystemTime:" + SystemTime + "][ClientTime: " + ClientTime + "]\n";
    }
}
