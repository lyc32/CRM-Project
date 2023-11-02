package com.example.mcqprojectbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "test_table")
public class Test
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "topic")
    private String topic;
    @Column(name = "name")
    private String name;
    @Column(name = "level")
    private Integer level;
    @Column(name = "create_time")
    private String createTime;
    @Column(name = "update_time")
    private String updateTime;

    public Test()
    {
    }
    public Test(Long id, String topic, String name, Integer level, String createTime, String updateTime) {
        this.id = id;
        this.topic = topic;
        this.name = name;
        this.level = level;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public void update(Test test)
    {
        if(test.getTopic() != null)
        {
            this.topic = test.getTopic();
        }
        if(test.getName() != null)
        {
            this.name = test.getName();
        }
        if(test.getLevel() != null)
        {
            this.level = test.getLevel();
        }
    }

    @Override
    public String toString() {
        return "Test{" +
                "id=" + id +
                ", topic='" + topic + '\'' +
                ", name='" + name + '\'' +
                ", level=" + level +
                ", createTime='" + createTime + '\'' +
                ", updateTime='" + updateTime + '\'' +
                '}';
    }
}
